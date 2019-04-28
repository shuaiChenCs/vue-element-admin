<template>
    <div class="chat">
        <div class="content" ref="content">
			<div class="msg-item" v-for="(msg, index) in historyMsgObj.msgs" :key="index">
				<div :class="{to: toUser.to == msg.fromNick}" v-if="toUser.to == msg.fromNick">
					<img :src="toUser.card.headImg" alt="">
					<div v-if="msg.type == 'text'" class="text" v-html="msg.strings"></div>
					<div v-if="msg.type == 'image'" class="image">
						<img @click="previewImg(msg.file.url)" :src="msg.file.url" :style="{width: msg.file.w + 'px', height: msg.file.h + 'px'}">
					</div>
				</div>
				<div :class="{from: account == msg.fromNick}" v-if="account == msg.fromNick">
					<div v-if="msg.type == 'text'" class="text" v-html="msg.strings"></div>
					<div v-if="msg.type == 'image'" class="image">
						<img @click="previewImg(msg.file.url)" :src="msg.file.url" :style="{width: msg.file.w + 'px', height: msg.file.h + 'px'}">
					</div>
					<img :src="self.headImg" alt="">
				</div>
			</div>
		</div>
		<div class="input-warp">
			<div class="input-box">
                <img :src="$imageUrl+'/chat_add.png'" @click="setFlag = !setFlag; emojiFlag = false;">
				<input  @blur="inputBlur" @focus="inputFocus" ref="input" type="text" placeholder="请输入..." v-model="inputVal" />
				<img :src="$imageUrl+'/chat_face.png'" @click="emojiFlag = !emojiFlag; setFlag = false;">
				<img style="margin-right: 0;" :src="$imageUrl+'/moment_send.png'" alt="" @click="send">
			</div>
			<div class="emojis" v-if="emojiFlag">
				<div v-for="(value, key) in emoji" :key="key" @click="inputEmoji(key, value)">
					<img :src="$emojiUrl + '/' + value.file" mode="">
				</div>
			</div>
			<div class="set" v-if="setFlag">
				<div>
					<input type="file" accept="image/*" id="file" class="file" value="" @change="fileInput">
					<img :src="$imageUrl + '/chat_photograph.png'" alt="">
					<div>相册</div>
				</div>
				<div>
					<img :src="$imageUrl + '/chat_reply.png'" alt="">
					<div>话术库</div>
				</div>
				<div @click="$router.push('/my/chat')">
					<img :src="$imageUrl + '/chat_settings.png'" alt="">
					<div>设置</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import emoji from '@/lib/emoji.js';
import event from '@/lib/eventBus.js';
export default {
    data() {
        return {
            self: this.$store.state.user,
            nim: this.$store.state.nim,
            inputVal: '',
            toUser: {},
            historyMsgObj: {},
			emojiFlag: false,
			setFlag: false,
            emoji: emoji,
            inputFcous: false,
            account: this.$store.state.user.imAccount,
        }
    },
    created() {
		event.$on('onmsg', this.onmsg);
    },
    mounted() {
		let toUser = this.$route.query.user;
		if(typeof(toUser) == 'string'){
			this.toUser = this.$store.state.toUser;
		}else{
			this.$store.commit('setToUser', toUser);
			this.toUser = toUser;
		}
		this.getHistoryMsgs();
    },
    methods: {
		fileInput() {
			let _this = this;
			this.nim.sendFile({
				scene: 'p2p',
				to: _this.toUser.to,
				type: 'image',
				fileInput: 'file',
				done: sendMsgDone
			});
			function sendMsgDone(err, obj) {
				console.log(obj)
				_this.pushMsg(obj);
				_this.setFlag = false;
			}
		},
		onmsg(msg) {
			if((msg.from == this.account && msg.to == this.toUser.to) || (msg.to == this.account && msg.from == this.toUser.to)){
				this.inputFcous = false;
				this.pushMsg(msg);
			}
		},
		inputEmoji(key, value) {
			this.inputVal = this.inputVal + key;
		},
		inputFocus() {
			this.emojiFlag = false;
			this.setFlag = false;
			document.body.scrollTop = 999999;
		},
		scrollToBottom() {
			setTimeout(() => {
				this.$refs.content.scrollTop = 9999999;
			}, 50);
		},
        getHistoryMsgs() {
            let _this = this;
            _this.nim.getHistoryMsgs({
                scene: 'p2p',
                to: this.toUser.to,
                asc: true,
                done: getHistoryMsgsDone
            })
            function getHistoryMsgsDone(err, obj) {
                if(obj) {
                    obj.msgs.map(msg => {
                        if(msg.type == 'text') {
                            msg.strings = _this.buildEmoji(msg.text);
                        }
                    });
					_this.historyMsgObj = obj;
					_this.$nextTick(() => {
						_this.scrollToBottom();
					})
                }
            }
        },
        send() {
			this.$refs.input.blur();
			this.emojiFlag = false;
			let _this = this;
			let msg = _this.nim.sendText({
				scene: 'p2p',
				to: this.toUser.to,
				text: this.inputVal,
				done: sendMsgDone
			});
			function sendMsgDone(error, msg) {
				_this.pushMsg(msg);
				_this.inputVal = '';
			}
		},
		pushMsg(msgs) {
			if (!Array.isArray(msgs)) { msgs = [msgs]; }
			msgs.map(msg => {
				if(msg.type == 'text') {
					msg.strings = this.buildEmoji(msg.text);
				}
			});
			this.historyMsgObj.msgs = this.nim.mergeMsgs(this.historyMsgObj.msgs, msgs);
			this.$nextTick(()=> {
				this.scrollToBottom();
			});
		},
        inputBlur() {
			document.body.scrollTop = 0;
			this.send();
        },
        buildEmoji(text) {
            var re = /\[([^\]\[]*)\]/g;
            var matches = text.match(re) || [];
            for (var j = 0, len = matches.length; j < len; ++j) {
                if(emoji[matches[j]]){
                    text = text.replace(matches[j], `<img class="emoji" style="width: .66667rem;height: .66667rem;" src="${this.$emojiUrl}/${emoji[matches[j]].file}" />`);
                }		
            }
            return text;
        },
        previewImg(url) {
			this.$createImagePreview({
				imgs: [url]
			}).show()
        }
    }
}
</script>
<style lang="less" scoped>
.chat{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
	background: white;
	height: 100vh;
	.content{
        -webkit-overflow-scrolling : touch;
        overflow-y: auto;
        flex: 1;
		padding: 15px;
		.msg-item{
			.from, .to{
				margin-bottom: 15px;
				
			}
			.from{
				display: flex;
				justify-content: flex-end;
				.text{
					overflow: hidden;
					white-space: pre-wrap;
					word-break: break-all;
					max-width: 200px;
					background: #1ED29A;
					color: white;
					font-size: 14px;
					padding: 14px 19px 14px 19px;
					line-height: 1.5;
                    border-radius: 20px 0 20px 20px;
				}
				>img{
					border: 1Px solid #1ED29A;
					width: 35px;
					height: 35px;
					border-radius: 50%;
					margin-left: 13px;
				}
				.image{
					max-width: 200px;
					max-height: 250px;
					img{
					    max-width: 100% !important;
						height: 100% !important;
					}
				}
			}
			.to{
				display: flex;
				>img{
					border: 1Px solid #1ED29A;
					width: 35px;
					height: 35px;
					border-radius: 50%;
					margin-right: 13px;
				}
				.image{
					width: 200px;
					height: 250px;
					img{
					    width: 100% !important;
						height: 100% !important;
					}
				}
				.text{
					overflow: hidden;
					white-space: pre-wrap;
					word-break: break-all;
					max-width: 200px;
					background: rgba(243,245,247,1);
					color: #323643;
					font-size: 14px;
					padding: 14px 15px;
					line-height: 1.5;
                    border-radius: 0 20px 20px 20px;
				}
			}
		}
	}
	.input-warp{
		background: white;
        z-index: 111;
		// min-height: 100upx;
		box-shadow:0px 0px 18px 2px rgba(0, 0, 0, 0.1);
		.input-box{
			height: 60px;
			box-sizing: border-box;
			padding: 0 15px;
			display: flex;
			align-items: center;
			img{
				width: 25px;
				height: 25px;
				margin-right: 15px;
			}
			input{
				height: 100%;
				flex: 1;
				font-size: 15px;
			}
		}
		.emojis{
			border-top: 1Px solid rgba(237,238,241,1);
			height: 250px;
			padding: 15px/2;
			display: flex;
			flex-wrap: wrap;
			>div{
				width: 25px;
				height: 25px;
				img{
					width: 25px;
					height: 25px;
				}
			}
		}
		.set{
			border-top: 1Px solid rgba(237,238,241,1);
			height: 235px/2;
			display: flex;
			padding: 20px 25px;
			>div{
				position: relative;
				border-radius: 3px;
				width: 60px;
				height: 60px;
				margin-right: 15px;
				display: flex;
				flex-direction: column;
				font-size: 13px;
				text-align: center;
				img{
					width: 100%;
					height: 100%;
					margin-bottom: 5px;
				}
				.file{
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					font-size: 0;
				}
			}
		}
	}
}
</style>


