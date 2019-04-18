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
            id:0,
            content:'',
            request:true
        }
    },
    created(){
       this.id =  this.$route.params.id;
       if(this.id==0){
           return;
       }
       this.load();
    },
    methods: {
        load(){
            axios.get(this.$apiConfig.getVerbal+this.id,{}).then(res=>{
                if(res.data.code==0){
                    this.content = res.data.data.content;
                }
            });
        },
        save() {
            if(this.request) {
                this.request = false;
                let vm = this;
                if (this.id == 0) {
                    axios.post(this.$apiConfig.addVerbal, {
                        content: this.content
                    }).then(res => {
                        vm.request = true;
                        if (res.data.code == 0) {
                            this.$router.go(-1);
                        }
                    });
                } else {
                    axios.post(this.$apiConfig.editVerbal, {
                        id: this.id,
                        content: this.content
                    }).then(res => {
                        vm.request = true;
                        if (res.data.code == 0) {
                            this.$router.go(-1);
                        }
                    });
                }
            }
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


