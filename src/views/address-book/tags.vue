<template>
    <div class="tags">
        <no-data v-if="tags.length==0"></no-data>
        <div v-for="(item, index) in tags" :key="index">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                {{item.labelName}}
            </div>
            <div class="tag-block">
                <div class="tag-item" @click="$router.push('/address-book/tag-type/' + tag.labelId)" v-for="(tag, subindex) in item.childClientLabelGroupVO" :key="subindex" :style="{background: tag.backgroundImg}">{{tag.labelName}}({{tag.amount}})</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tags: []
        }
    },
    created(){
        axios.get(this.$apiConfig.labelLibrary,{}).then(res=>{
            if(res.data.code==0){
                this.tags = res.data.data;
            }
        });
    }
}
</script>
<style lang="less" scoped>
.tags{
    height:100vh;
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


