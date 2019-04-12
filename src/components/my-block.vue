<template>
    <div class="my-block">
        <div>{{title}}</div>
        <div class="block-box">
            <div class="block-item" v-for="item in blockData" :key="item.title" @click="$router.push(item.url)">
                <i class="cubeic-alert"></i>
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
    }
}
</script>
<style lang="less" scoped>
.my-block{
    margin-bottom: .9375rem /* 15/16 */;
    background: white;
    padding: .9375rem /* 15/16 */;
    .block-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .block-item{
            padding: .625rem 0 0 0 /* 10/16 */;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 5rem /* 80/16 */;
            width: 25%;
            text-align: center;
        }
    }
}
</style>


