<template>
    <div class="tags">
        <div v-for="(item, index) in tags" :key="index">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                {{item.labelName}}
            </div>
            <div class="tag-block">
                <div class="tag-item" v-for="(tag, subindex) in item.childList" :key="subindex" :style="{background: tag.backgroundImg}">{{tag.labelName}}</div>
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
                console.log(this.tags)
            }
        });
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


