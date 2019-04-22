<template>
    <div class="person">
        <div class="header">
            <div class="avatar">
                <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmyicbqKNRhXNXkw9V61ficiczicdSOYLO6g8Xf7CDYfrNHeu9p5eCGvhFWvUHiaCLSRW9kFfibiahiaiawHw/132" alt="">
            </div>
            <div class="info">
                <div class="top">
                    <span class="name">常杰</span>
                </div>
                <div class="bottom">互动次数1</div>
            </div>
            <div class="copy">
                <button>留言</button>
                <button>复制昵称</button>
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                备注名称
            </div>
            <div class="setin">
                <input type="text" placeholder="点击添加备注名" @focus="inputFocus($event)" @blur="inputBlur($event)">
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                客户标签
            </div>
            <div class="tag-block">
                <div class="tag-item" v-for="item in 17" :key="item">大傻逼</div>
                <div class="tag-item add"><i class="iconfont iconcard_edit_add"></i></div>
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                互动轨迹
            </div>
            <div class="push-box">
                dsfds
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        let name = '张三';
        document.title = name;
    },
    methods: {
        inputFocus(e) {
            e.target.setAttribute('placeholder', '备注名称最长16个字')
        },
        inputBlur(e) {
            e.target.setAttribute('placeholder', '点击添加备注名')
        }
    }
}
</script>
<style lang="less" scoped>
.person{
    >div{
        padding: 10px 0;
        background: white;
        margin-bottom: 15px;
    }
    .header{
        padding: 0 15px;
        height: 100px;
        display: flex;
        align-items: center;
        .avatar{
            margin-right: 15px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            flex: 1;
            .top{
                margin-bottom: 10px;
                .name{
                    font-weight: bold;
                    font-size: 18px;
                    margin-right: 30px;
                }
            }
        }
        .copy{
            button{
                &:first-child{
                    margin-right: 10px;
                }
                background:#1ED29A;
                border-radius:22px;
                color: white;
                font-size: 15px;
                text-align: center;
                border: none;
                padding: 5px 10px;
            }
        }
    }
    .person-item{
        .block-item-title{
            color: black;
            font-size: 16px;
            i{
                font-size: 14px;
            }
        }
        .setin{
            padding: 10px 15px;
            input{
                padding-left: 18px;
                font-size: 16px;
                width: 100%;
            }
        }
    }
    .tag-block{
        background: white;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 15px 0;
        .tag-item{
            padding: 10px 15px;
            background: #FFEFF0;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 20px;
            &.add{
                padding: 8px 15px;
                width: 100px;
                background: none;
                border: 1Px dashed #949494;
                text-align: center;
                i{
                    color: #949494;
                }
            }
        }
    }
    .push-box{
        padding: 10px 15px 0;
    }
}
</style>


