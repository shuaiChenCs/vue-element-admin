<template>
    <div class="sp-scroll" v-scroll="loadmore">
        <no-data v-if="browseGroup.length==0"></no-data>
        <div class="search-user"  v-show="browseGroup.length>0">
            <div class="charts-box">
                <div class="lenged">
                    <div v-for="(item,index) in browseGroup" :key="index">
                        <span :style="{background: item.color}"></span>
                        {{item.name}}
                    </div>
                    <!--<div><span style="background: bla"></span>名片</div>-->
                </div>
                <div class="charts" id="container"></div>
            </div>
            <div class="tab-box">
                <div
                        class="tab"
                        v-for="(item, index) in browseGroup"
                        @click="showPicker(item,index)"
                        :key="index"
                        :style="[{border: `1Px solid ${item.color}`, color: item.color}, active == item.name ? styleObj : {}]"
                >{{item.name}}
                </div>
            </div>
            <div class="scview-list">
                <div class="title">
                    <span class="base">基本信息</span>
                    <span class="stimes">浏览次数</span>
                    <span class="stime">浏览时长(秒)</span>
                </div>
                <div class="custom-item" v-for="(user, index) in users" :key="index" @click="$router.push('/address-book/person/'+user.directoryId)">
                    <div class="base">
                        <img
                                :src="user.userHeadImg"
                                alt
                        >
                        <span>{{user.userName}}</span>
                    </div>
                    <div class="stimes" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">{{user.browseCount}}
                    </div>
                    <div class="stime" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">{{user.duration}}</div>
                </div>
            </div>
        </div>
        <no-more v-if=""></no-more>
    </div>
</template>
<script>
    let Highcharts = require("highcharts");
    export default {
        data() {
            return {
                browseGroup: [],
                colors: ["#1ED29A", "#EFCA08", "#60AFFF", "#7E7EFF"],
                active: "卡片",
                goods: [],
                users: [],
                current: 1,
                size: 5,
                operateCode: 1,
                objectId: 0,
            };
        },
        created() {
            axios.post(this.$apiConfig.searchUser, {}).then(res => {
                if (res.data.code == 0) {
                    this.browseGroup = res.data.data;
                    if (this.browseGroup.length > 0) {
                        this.browseGroup.forEach((e, i) => {
                            this.$set(e, "color", this.colors[i]);
                        });
                        this.operateCode = this.browseGroup[0].code;
                        this.browseGroup[0].selected=true;
                        this.browseGroup[0].sliced=true;
                        this.active = this.browseGroup[0].name;
                        this.styleObj = {
                            background: this.browseGroup[0].color,
                            color: "white"
                        }
                        this.loadmap1(this.browseGroup);
                    }
                }
            });

            axios.post(this.$apiConfig.goodsHeat, {}).then(res => {
                if (res.data.code == 0) {
                    res.data.data.forEach(e => {
                        e.text = e.name;
                        e.value = e.id
                    })
                    this.goods = res.data.data
                }
            })
            this.loadUser();
        },
        methods: {
            loadUser() {
                axios.post(this.$apiConfig.potential, {
                    current: this.current,
                    size: this.size,
                    operateCode: this.operateCode,
                    objectId: this.objectId
                }).then(res => {
                    if (res.data.code == 0) {
                        this.users = this.users.concat(res.data.data.records)
                        if (res.data.data.records.length == 0) {
                            this.current--;
                        }
                    }
                })
            },
            loadmore() {
                this.current++;
                this.loadUser();
            },
            showPicker(item,index) {
                this.browseGroup.forEach(e=>{
                    e.selected=false
                    e.sliced=false;
                });
                this.browseGroup[index].selected=true;
                this.browseGroup[index].sliced=true;
                this.loadmap1(this.browseGroup);
                this.current = 1;
                this.operateCode = item.code;
                this.objectId=0;
                this.active = item.name;
                this.styleObj = {
                    background: item.color,
                    color: "white"
                };
                if (item.name == "商城") {
                    let picker = this.$createPicker({
                        title: "商品列表",
                        data: [this.goods],
                        onSelect: this.selectHandle
                    });
                    picker.show();
                } else {
                    this.users = [];
                    this.loadUser();
                }
            },
            selectHandle(selectedVal, selectedIndex, selectedText) {
                this.users = [];
                this.objectId=this.goods[selectedIndex].id;
                this.loadUser();
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
                        text: "热度分析"
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
                            data: data,
                            events: {
                                click: (event) => {
                                    console.log(event);
                                    let item = {
                                        name: event.point.name,
                                        color: event.point.color,
                                        code: event.point.code
                                    }
                                    this.showPicker(item,event.point.index);
                                }
                            }
                        }
                    ]
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .search-user {
        min-height: 100%;
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
        .scview-list {
            .title {
                color: rgba(151, 160, 177, 1);
                display: flex;
                padding: 5px 15px;
            }
            .title,
            .custom-item {
                .base {
                    flex: 1;
                }
                .stime,
                .stimes {
                    text-align: center;
                    width: 20%;
                    &.n1 {
                        font-weight: bold;
                        color: #f4cc13;
                    }
                    &.n2 {
                        font-weight: bold;
                        color: #d4d6d3;
                    }
                    &.n3 {
                        font-weight: bold;
                        color: #b47943;
                    }
                }
                .stimes {
                    text-align: center;
                    width: 15%;
                    margin-right: 10px;
                }
            }
            .custom-item {
                .base {
                    display: flex;
                    align-items: center;
                    span {
                        flex: 1;
                    }
                }
                &:last-child {
                    border: none;
                }
                .record {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    span {
                        padding: 5px 0;
                    }
                }
            }
            background: white;
        }
    }
</style>


