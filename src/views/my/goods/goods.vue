<template>
    <div class="goods">
        <div class="scroll-list-wrap">
            <cube-scroll
                    ref="scroll"
                    :data="data"
                    :options="options"
                    @pulling-up="onPullingUp">
                <ul>
                    <li v-for="food in data">
                        <div>
                            <img :src="food.imgUrl">
                            <p>{{food.name}}</p>
                            <p><span>￥</span>{{food.price}}<i class="cubeic-more" style="float:right"
                                                              @click="showDefault"></i></p>
                        </div>
                    </li>
                </ul>
            </cube-scroll>
        </div>
        <div class="addbutton">
            <cube-button @click="addGoods">添加商品</cube-button>
        </div>
    </div>
</template>
<script>

    const foods = [
        {
            "name": "A衣服",
            // ...
            "imgUrl": "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
            // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            "price": 100,
        },
        {
            "name": "B衣服",
            // ...
            "imgUrl": "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
            // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            "price": 99,
        },
        {
            "name": "C衣服",
            // ...
            "imgUrl": "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
            // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            "price": 88,
        },
        {
            "name": "D衣服",
            // ...
            "imgUrl": "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
            // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            "price": 88,
        },
        {
            "name": "E衣服",
            // ...
            "imgUrl": "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
            // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            "price": 88,
        },
        {
            "name": "A裤子",
            "imgUrl": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            "price": 88
        }
    ];

    export default {
        data() {
            return {
                data: foods
            }
        },
        computed: {
            options() {
                return {
                    pullUpLoad: {
                        threshold: 40,
                        txt: {
                            more: '',
                            noMore: '我也是有底线的'
                        }
                    },
                    scrollbar: true
                }
            }
        },
        mounted(){
            this.data.splice(6,this.data.length);
            // console.log(this.data);

        },
        methods: {
            // 触发上拉加载
            onPullingUp() {
                if (this.data.length < 10) {
                    this.data.push({
                        "name": "B裤子",
                        "imgUrl": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                        "price": 88
                    });
                } else {
                    this.$refs.scroll.forceUpdate();
                }

            },
            addGoods() {
                this.$router.push('goods/edit');
            },
            showDefault() {

                this.$createActionSheet({
                    // title: '置顶',
                    active: 2,  //高亮
                    data: [
                        {
                            content: '置顶'
                        },
                        {
                            content: '编辑',
                        },
                        {
                            content: '删除',
                            // class: 'color:#ff0000'    //颜色红色
                        }
                    ],
                    onSelect: (item, index) => {
                        switch (index) {
                            case 0:
                                this.$createToast({
                                    txt: `Clicked ${item.content}`,
                                    time: 1000
                                }).show();
                                break;
                            case 1:
                                this.$router.push('goods/edit');
                                break;
                            case 2:
                                this.$createToast({
                                    txt: `Clicked ${item.content}`,
                                    time: 1000
                                }).show();
                                break;
                        }

                    }
                }).show()
            }
        }
    }
</script>
<style lang="less" scoped>
    .goods {
        background: #f3f3f3;
    }

    img {
        width: 100%
    }

    ul {
        // padding: 0rem /* 0/16 */ .3125rem /* 5/16 */;
        padding-bottom: 3.75rem /* 60/16 */;
    }

    li {
        display: inline-block;
        width: 50%;
    }

    li > div {
        background: #ffffff;
        margin: .3125rem /* 5/16 */ .3125rem /* 5/16 */;
        border-radius: .3125rem /* 5/16 */ .3125rem /* 5/16 */;
    }

    li > div > p {
        padding: 1.25rem /* 20/16 */ .625rem /* 10/16 */;
    }

    li > div > p > span {
        font-weight: bold;
    }

    .addbutton {
        position: fixed;
        bottom: 0rem /* 0/16 */;
        width: 95%;
        padding: 0rem /* 0/16 */ .625rem /* 10/16 */;
        background: #ffffff;
        height: 5.125rem /* 82/16 */;
        padding-top: .3125rem /* 5/16 */;
    }

    .deleteFont {
        color: #ff0000;
    }

    .scroll-list-wrap {
        height: 46.875rem /* 750/16 */;
        transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题;
        overflow: hidden;
    }
</style>
