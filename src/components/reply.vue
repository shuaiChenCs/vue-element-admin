<template>
    <div class="sp-reply">
        <div class="header" v-if="title" :class="{haspadding: !value}">
            [{{title}}]
            <i class="iconfont iconlist_more"></i>
        </div>
        <div class="content">
            <textarea maxlength="50" placeholder="请输入...(非必填)" v-model="content"></textarea>
            <!-- {{content}} -->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: String,
        title: String
    },
    data() {
        return {
            content: ''
        }
    },
    watch: {
        content(val) {
            this.$emit('input', val);
        }
    }
}
</script>
<style lang="less" scoped>
.sp-reply{
    box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 0 15px 15px 15px;
    padding: 0 15px 0 15px;
    background: white;
    .header{
        &.haspadding{
            padding-bottom: 15px;
        }
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
        color:rgba(151,160,177,1);
        font-size: 12px;
        i{
            font-size: 11px;
            margin-left: 5px;
        }
    }
    .content{
        padding: 15px 0;
        textarea{
            color:rgba(50,54,67,1);
            line-height: 1.3;
            font-size: 15px;
            width: 100%;
            height: 60px;
        }
    }
}
</style>


