<template>
    <div class="tags">
        <div v-for="(item, index) in tags" :key="index">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                {{item.title}}
            </div>
            <div class="tag-block">
                <div class="tag-item" v-for="tag in item.data" :key="tag">{{tag}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tags: [
                {title: '客户类型', data: ['新客户', '亲戚', '朋友']},
                {title: '客户级别', data: ['一般客户', '核心客户']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
                {title: '关注点', data: ['关注商品', '关注动态', '关注官网','关注商品', '关注动态', '关注官网']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
                {title: '关注点', data: ['关注商品', '关注动态', '关注官网','关注商品', '关注动态', '关注官网']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
                {title: '关注点', data: ['关注商品', '关注动态', '关注官网','关注商品', '关注动态', '关注官网']},
                {title: '客户来源', data: ['名片来源', '客户介绍', '朋友']},
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.tags{
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
        }
    }
}
</style>


