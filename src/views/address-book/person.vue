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
                <button @click="chat(personInfo)">留言</button>
                <button  v-clipboard:success="onCopy" v-clipboard:copy="personInfo.nikeName" >复制昵称</button>
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                备注
            </div>
            <div class="setin">
                <input type="text" v-model="personInfo.remark" placeholder="点击添加备注名" maxlength="10" @focus="inputFocus($event)" @blur="inputBlur($event)">
            </div>
        </div>
        <div class="person-item">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                客户标签
            </div>
            <div class="tag-block">
                <div class="tag-item" v-for="(label,index) in personInfo.clientLabelVOList" :key="index">{{label.labelName}}</div>
                <div class="tag-item add" @click="$router.push('/address-book/addTags/'+personInfo.id)"><i class="iconfont iconcard_edit_add"></i></div>
            </div>
        </div>
        <div class="person-item" v-if="goods.length>0">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                最关注的商品
            </div>
            <div class="att-good">
                <div class="good-item" v-for="(product,index) in goods" :key="index">
                    <img :src="product.imgUrl" alt="">
                    <div class="good-detial">
                        <div class="info">
                            <span class="name">{{product.name}}<span v-if="product.isDelete==1" style="font-size: 24px; color: #ccc;">（已下架）</span></span>
                            <span class="money">￥{{product.price}}</span>
                        </div>
                        <div class="record">
                            <span>浏览次数 {{product.browseCount || 0}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>浏览时长 {{product.duration || 0}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="person-item">-->

        <!--<div class="push-list" v-for="(behavior,index) in personInfo.behaviorVOList" :key="index">-->
            <!--<div class="push-item">-->
                <!--<span class="content">{{behavior.operateDesc}}</span>-->
                <!--<span class="time">{{behavior.createTime | formatDate('hh:mm')}}</span>-->
            <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="person-item"  v-if="personInfo.behaviorVOList.length>0">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                客户行为
            </div>
            <div class="push-box">
                <!--<div class="pushornot">-->
                <!--<span>推送到AI雷达和公众号</span>-->
                <!--<cube-switch v-model="value"></cube-switch>-->
                <!--</div>-->
                <div class="push-list">
                    <div class="push-item" v-for="(behavior,index) in personInfo.behaviorVOList" :key="index">
                        <span class="content">{{behavior.operateDesc}}</span>
                        <span class="time">{{behavior.createTime | formatDate('MM-dd hh:mm:ss')}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="person-item" v-show="browseGroup.length>0">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                客户行为统计
            </div>
            <div class="charts-box" >
                <div class="lenged">
                <div v-for="(item,index) in browseGroup" :key="index">
                    <span :style="{background: item.color}"></span>
                    {{item.name}}
                </div>
                <!--<div><span style="background: bla"></span>名片</div>-->
                </div>
                <div class="charts" id="container"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard';

let Highcharts = require("highcharts");
export default {
    data(){
        return {
            id:0,
            value: true,
            goods:[],
            personInfo:{
                behaviorVOList:[]
            },
            browseGroup: [],
            colors: ["#1ED29A", "#EFCA08", "#60AFFF", "#7E7EFF"],
        }
    },
    created(){
        this.id = this.$route.params.id;
        axios.get(this.$apiConfig.getPersonInfo+this.id,{}).then(res=>{
           if(res.data.code==0){
               this.personInfo = res.data.data;
               document.title = this.personInfo.nikeName;;
               this.browseGroup = this.personInfo.userBrowseList;
               this.goods = this.personInfo.userAttentionList;
               this.loadMapData();
           }
        });
    },
    mounted() {

    },
    methods: {
        loadMapData(){
            if (this.browseGroup.length > 0) {
                this.browseGroup.forEach((e, i) => {
                    this.$set(e, "color", this.colors[i]);
                });
                this.styleObj = {
                    background: this.browseGroup[0].color,
                    color: "white"
                }
                this.loadmap1(this.browseGroup);
            }
        },
        loadmap1(data) {
            Highcharts.chart("container", {
                chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie"
                },
                title: {
                text: ""
                },
                tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}</b>"
                },
                //colors: this.colors,
                plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                    enabled: true,
                    format: "{y}",
                    style: {
                        width: "100px",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        fontSize: ".3rem",
                        useHTML: true
                    }
                    }
                }
                },
                tooltip: {
                enabled: false
                },
                credits: {
                enabled: false
                },
                series: [
                {
                    name: "Brands",
                    colorByPoint: true,
                    data: data
                }
                ]
            });
            },
        chat(item) {
            let params = {
                card: item
            }
            this.$router.push({ path: '/chat', query: { user: params }});
        },
        onCopy() {
            this.$createToast({
                txt: '复制成功',
                type: 'correct'
            }).show()
        },
        inputFocus(e) {
            e.target.setAttribute('placeholder', '备注名称最长10个字')
        },
        inputBlur(e) {
            e.target.setAttribute('placeholder', '点击添加备注名')
            axios.post(this.$apiConfig.editRemark,{
                id:this.id,
                remark:this.personInfo.remark
            }).then();
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
                    margin-right: 10px;
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
        .att-good{
            .good-item{
                display: flex;
                padding: 15px 15px 0;
                img{
                    height: 60px;
                    width: 60px;
                }
                .good-detial{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .info{
                    padding: 5px 10px;
                    .name{
                        font-size: 16px;
                        margin-right: 20px;
                    }
                    .money{
                        color: red;
                    }
                }
                .record{
                    padding: 5px 10px;
                    color: #949494;
                }
            }
        }
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
        .charts-box {
            position: relative;
            .lenged {
            position: absolute;
            top: 15px;
            right: 15px;
            //   width: 50px;
            z-index: 1;
            > div {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                span {
                margin-right: 5px;
                display: inline-block;
                width: 20px;
                height: 10px;
                }
            }
            }
        }
        .charts {
            padding: 15px 0;
            height: 470px/2;
            background: white;
        }
        .tab-box {
            margin-top: 15px;
            height: 60px;
            background: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .tab {
            text-align: center;
            min-width: 70px;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
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
                border: 1px dashed #949494;
                text-align: center;
                i{
                    color: #949494;
                }
            }
        }
    }
    .push-box{
        padding: 0px 15px 0;
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
                    width: 90%;
                }
                .time{
                    color: #6F6F76;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>


