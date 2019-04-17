<template>
    <div class="speechcraft-add">
        <div class="eidt-box">
            <span class="count">{{content.length}}/255</span>
            <textarea maxlength="255" placeholder="请输入话术内容，不超过255字" v-model="content"></textarea>
        </div>
        <fixed-button :title="'保存'" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content:''
        }
    },
    methods: {
        save() {
            axios.post(this.$apiConfig.addVerbal,{
                content:this.content
            }).then(res=>{
               if(res.data.code==0){
                   this.$router.go(-1);
               }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.speechcraft-add{
    height: 100%;
    .eidt-box{
        position: relative;
        padding: 15px;
        background: white;
        height: 100%;
        .count{
            position: absolute;
            top: 240px;
            right: 30px;
        }
        textarea{
            padding: 10px;
            font-size: 15px;
            width: 100%;
            height: 250px;
            border-radius: 5px;
            background:rgba(243,245,247,1);
        }
    }
}
</style>


