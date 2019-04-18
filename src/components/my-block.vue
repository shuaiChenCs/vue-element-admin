<template>
    <div class="my-block">
        <div class="title">{{title}}</div>
        <div class="block-box">
            <div class="block-item" v-for="item in blockData" :key="item.title" @click="goto(item)">
                <img :src="item.icon" alt="">
                {{item.title}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        blockData: {
            type: Array,
            default: () => []
        },
        title: String
    },
    methods: {
        goto(item) {
            if(item.click) {
                item.click();
            }else{
                this.$router.push(item.url);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.my-block{
    padding: 20px 0;
    .title{
        font-size: 15px;
    }
    .block-box{
        padding: 15px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .block-item{
            color: rgba(151,160,177,1);
            font-size: 12px;
            justify-content: space-between;
            padding: 15px 0;
            margin-right: 15px;
            width: 70px;
            height: 70px;
            background:rgba(243,245,247,.5);
            border-radius:5px;
            img{
                width: 20px;
                height: 20px;
            }
            align-items: center;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>


