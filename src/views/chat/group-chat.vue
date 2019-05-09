<template>
    <div class="chat">
		<div class="content" ref="content" v-if="true">
			<div class="title">你将发消息给{{group.length}}位客户</div>
			<div class="list">
				{{groupStr}}
			</div>
		</div>
        
		<div class="input-warp">
			<div class="input-box">
                <img :src="$imageUrl+'/chat_add.png'" @click="plusHandler">
				<textarea  @blur="inputBlur" @focus="inputFocus" ref="input" type="text" placeholder="请输入..." v-model="inputVal" ></textarea>
				<img :src="$imageUrl+'/chat_face.png'" @click="emojiFlag = !emojiFlag; setFlag = false;">
				<img style="margin-right: 0;" :src="$imageUrl+'/moment_send.png'" alt="" @click="send">
			</div>
			<div class="emojis" v-if="emojiFlag">
				<div v-for="(value, key) in emoji" :key="key" @click="inputEmoji(key, value)">
					<img :src="$emojiUrl + '/' + value.file" mode="">
				</div>
			</div>
			<div class="set" v-if="setFlag">
				<div class="flag-box" v-if="!showhuashu">
					<div>
						<input type="file" accept="image/*" id="file" class="file" value="" @change="fileInput">
						<img :src="$imageUrl + '/chat_photograph.png'" alt="">
						<div>相册</div>
					</div>
					<div @click="showhuashu = !showhuashu">
						<img :src="$imageUrl + '/chat_reply.png'" alt="">
						<div>话术库</div>
					</div>
					<div @click="$router.push('/my/chat')">
						<img :src="$imageUrl + '/chat_settings.png'" alt="">
						<div>设置</div>
					</div>
				</div>
				<div class="huashu" v-if="showhuashu">
					<div class="huashu-box">
						<div class="huashu-item" @click="gethuas(item.content)" v-for="item in verbalList" :key="item.id">
							{{item.content}}
						</div>
					</div>
					<div class="huashu-back" @click="showhuashu = false">
						关闭
					</div>
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
			group: [],
			groupStr: '',
			showhuashu: false,
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
			verbalList: []
        }
    },
    created() {
		this.getSpeechcraft();
		this.getGroup();
		event.$on('onmsg', this.onmsg);
    },
    mounted() {
    },
    methods: {
		plusHandler() {
			this.setFlag = !this.setFlag;
			this.emojiFlag = false;
			if(!this.setFlag) {
				this.showhuashu = false;
			}
		},
		getGroup() {
			this.group = this.$store.state.group;
			let strArr = this.group.map(item => item.nikeName);
			this.groupStr = strArr.join('、');
		},
		gethuas(content) {
			let _this = this;
			this.group.forEach(item => {
				_this.nim.sendText({
					scene: 'p2p',
					to: item.imAccount,
					text: content,
					done: sendMsgDone
				});
				_this.messageNotity(item.clientId);
			})
			function sendMsgDone(error, msg) {
				_this.pushMsg(msg);
			}
			this.$router.replace('/address-book/message');
		},
		getSpeechcraft() {
			axios.post(this.$apiConfig.verbalList, {content: ''}).then(res=>{
                if(res.data.code==0){
                    this.verbalList=res.data.data;
                }
            });
		},
		messageNotity(id) {
			let params = {
				"formUserId": this.self.id,
				"toUserId": id
			};
			axios.post(this.$apiConfig.messageNotity, params).then(res=>{
				if(res.data.code==0){
					console.log('推送成功')
				}
			});
		},
		fileInput() {
			let _this = this;
			this.group.forEach(item => {
				this.nim.sendFile({
					scene: 'p2p',
					to: item.imAccount,
					type: 'image',
					fileInput: 'file',
					done: sendMsgDone
				});
				this.messageNotity(item.clientId);
			})
			this.$router.replace('/address-book/message');
			function sendMsgDone(err, obj) {
				_this.pushMsg(obj);
				_this.setFlag = false;
			}
		},
		onmsg(msg) {
			if((msg.from == this.account && msg.to == this.toUser.to) || (msg.to == this.account && msg.from == this.toUser.to)){
				// this.inputFcous = false;
				this.pushMsg(msg);
			}
		},
		inputEmoji(key, value) {
			this.inputVal = this.inputVal + key;
		},
		inputFocus() {
			this.emojiFlag = false;
			this.setFlag = false;
			setTimeout(() => {
				document.body.scrollTop = 999999;
			},100)
			let obj = this.$refs.input;
			let len = this.inputVal.length;
			if (document.selection) {
				let sel = obj.createTextRange();
				sel.moveStart('character', len);
				sel.collapse();
				sel.select();
			} else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number'){
				obj.selectionStart = obj.selectionEnd = len;
			}
		},
		scrollToBottom() {
			// setTimeout(() => {
			// 	this.$refs.content.scrollTop = 9999999;
			// }, 200);
		},
        send() {
			this.$refs.input.blur();
			this.emojiFlag = false;
			let _this = this;
			this.group.forEach(item => {
				_this.nim.sendText({
					scene: 'p2p',
					to: item.imAccount,
					text: this.inputVal,
					done: sendMsgDone
				});
				_this.messageNotity(item.clientId);
			})
			this.$router.replace('/address-book/message');
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
		},
        inputBlur() {
			document.body.scrollTop = 0;
			// this.send();
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
		background: white;
		.list{
			margin-top: 20px;
			box-shadow:0px 0px 18px 2px rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			padding: 10px;
			font-size: 13px;
			line-height: 1.5;
			word-break: normal;
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
			padding: 5px 15px;
			display: flex;
			align-items: center;
			img{
				width: 25px;
				height: 25px;
				margin-right: 15px;
			}
			textarea{
				padding-top: 13px;
				height: 100%;
				flex: 1;
				font-size: 15px;
        		-webkit-overflow-scrolling : touch;
			}
		}
		.emojis{
        	-webkit-overflow-scrolling : touch;
			border-top: 1Px solid rgba(237,238,241,1);
			height: 250px;
			padding: 15px/2;
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			>div{
				width: 35px;
				height: 35px;
				display: flex;
				justify-content: center;
				align-content: center;
				img{
					width: 25px;
					height: 25px;
				}
			}
		}
		.set{
			border-top: 1Px solid rgba(237,238,241,1);
			.flag-box{
				height: 235px/2;
				padding: 20px 25px;
				display: flex;
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
			.huashu{
				display: flex;
				flex-direction: column;
				.huashu-box{
    				-webkit-overflow-scrolling : touch;
					height: 225px;
					overflow-y: auto;
					.huashu-item{
						line-height: 1.3;
						// height: 35px;
						// line-height: 35px;
						font-size: 15px;
						border-bottom: 1Px solid rgba(237,238,241,1);
						padding: 10px 10px;
					}
				}
				.huashu-back{
					font-size: 15px;
					color: rgba(30, 210, 154, 1);
					text-align: center;
					line-height: 35px;
					height: 70px/2;
					background:rgba(243,245,247,1);
				}
			}
		}
	}
}
</style>


