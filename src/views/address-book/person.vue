<template>
    <div class="person">
        <div class="header">
            <div class="avatar">
                <img :src="personInfo.headImg" alt="">
            </div>
            <div class="info">
                <div class="top">
                    <span class="name">{{personInfo.nikeName}}</span>
                </div>
                <div class="bottom">互动次数{{personInfo.interact}}</div>
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
                <input type="text" v-model="personInfo.remark" placeholder="点击添加备注名" @focus="inputFocus($event)" @blur="inputBlur($event)">
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                客户标签
            </div>
            <div class="tag-block">
                <div class="tag-item" v-for="(label,index) in personInfo.clientLabelVOList" :key="index">大傻逼</div>
                <div class="tag-item add" @click="$router.push('/address-book/addTags')"><i class="iconfont iconcard_edit_add"></i></div>
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                互动轨迹
            </div>
            <div class="push-box">
                <!--<div class="pushornot">-->
                    <!--<span>推送到AI雷达和公众号</span>-->
                    <!--<cube-switch v-model="value"></cube-switch>-->
                <!--</div>-->
                <div class="push-list" v-for="(group,index) in personInfo.behaviorGroupVOList" :key="group.date">
                   {{group.date}}
                    <div class="push-item" v-for="(behavior,index) in group.behaviorVOList">
                        <span class="content">{{behavior.operateDesc}}</span>
                        <span class="time">{{behavior.createTime | formatTime}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {formatDate} from '@/common/date.js';
export default {
    data(){
        return {
            value: true,
            personInfo:{},
        }
    },
    created(){
        axios.get(this.$apiConfig.getPersonInfo+this.$route.params.id,{}).then(res=>{
           if(res.data.code==0){
               console.log(res.data.data);
               this.personInfo = res.data.data;
           }
        });
    },
    mounted() {
        let name = '张三';
        document.title = name;
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        formatTime(time){
            let date = new Date(time);
            return formatDate(date,'hh:mm');
        }
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
        .pushornot{
            margin-bottom: 15px;
            padding-left: 15px;
            font-size: 16px;
            align-items: center;
            display: flex;
            justify-content: space-between;
        }
        .push-list{
            color: #6F6F76;
            margin-bottom:18px;
            .push-item{
                margin-top: 15px;
                padding: 15px;
                box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                .content{
                    font-size: 16px;
                    color: black;
                }
                .time{
                    color: #6F6F76;
                }
            }
        }
    }
}
</style>


