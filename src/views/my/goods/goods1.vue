<template>
    <div class="goods" v-scroll="loadmore">
        <div class="goods-header">
            <img :src="card.headImg" alt="">
            <span>欢迎来到「{{card.cardName}}」的商品库</span>
        </div>
        <div class="goods-box">
             <div class="goods-item" v-for="(item,index) in data" :key="index">
                 <div class="img">
                     <img :src="item.imgUrl" alt="">
                 </div>
                 <div class="name">{{item.name}}</div>
                 <div class="handler">
                     <span>￥{{item.price}}</span>
                     <i class="cubeic-more"></i>
                 </div>
             </div>
        </div>
        <fixed-button></fixed-button>
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
            card:JSON.parse(sessionStorage.getItem('card')),
            data: [],
            current:1,
            size:10
        }
    },
    created(){
        this.loadData();
    },
    methods: {
        loadData(){
            let card = JSON.parse(sessionStorage.getItem('card'));
            this.$post(this.$apiConfig.getGoodsList,{current:this.current,size:this.size,cardId:card.id}).then((res)=>{
                if(res.code=='0'){
                    this.data = this.data.concat(res.data.records);
                }
            });
        },
        loadmore() {
            this.current++;
            this.loadData();
        }
    }
}
</script>
<style lang="less" scoped>
.goods{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling : touch;
    .goods-header{
        margin: .9375rem /* 15/16 */;
        border-radius: .3125rem /* 5/16 */;
        height: 5rem /* 80/16 */;
        background:linear-gradient(45deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%);
        display: flex;
        padding: 0 .9375rem /* 15/16 */;
        align-items: center;
        color: white;
        img{
            height: 3.125rem /* 50/16 */;
            width: 3.125rem /* 50/16 */;
            border-radius: 50%;
            margin-right: 1.25rem /* 20/16 */;
        }
    }
    .goods-box{
        padding-bottom: 3.75rem /* 60/16 */;
        margin: .9375rem /* 15/16 */;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            overflow: hidden;
            background: white;
            border-radius: .3125rem /* 5/16 */;
            width: 48%;
            margin-bottom: .9375rem /* 15/16 */;
            img{
                width: 100%;
            }
            .name,.handler{
                padding: 0 .625rem /* 10/16 */;
                height: 3.125rem /* 50/16 */;
                line-height: 3.125rem /* 50/16 */;
            }
            .handler{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>

