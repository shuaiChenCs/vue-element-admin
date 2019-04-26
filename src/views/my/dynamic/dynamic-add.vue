<template>
    <div class="dynamic-add">
        <div class="block">
            <textarea placeholder="说点什么吧..." v-model="content"></textarea>
        </div>
        <div class="imgs">
            <dynamic-upload @success="bannerSuccess" :type="'dynamic'"></dynamic-upload>
        </div>
        <fixed-button :title="'保存'" :disabled="content.length==0 && fileList.length==0" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
import dynamicUpload from '@/components/dynamic-upload.vue';
export default {
    data() {
        return {
            fileList: [

            ],
            content:'',
            addRequest:true
        }
    },
    methods: {
        bannerSuccess(arr) {
            console.log(arr);
            this.fileList = [];
            arr.forEach(item=>{
                let type="";
                if(item.type=='image/*'){
                    type=1;
                }else if(item.type=='video/*'){
                    type=2;
                }
                let mul = {
                    multimediaType:type,
                    multimediaUrl:item.realpath
                };
                this.fileList.push(mul);
            });
        },
        save() {
            if(this.addRequest) {
                this.addRequest = false;
                let vm = this;
                axios.post(this.$apiConfig.addDynamic, {
                    content: this.content,
                    multimediaList: this.fileList
                }).then(res => {
                    vm.addRequest = true;
                    if (res.data.code == 0) {
                        this.$router.push('/my/dynamic');
                    }
                })
            }
        }
    },
    components: {
        dynamicUpload
    }
}
</script>
<style lang="less" scoped>
.dynamic-add{
    .block{
        background: white;
        padding: 15px;
        textarea{
            font-size: 15px;
            border: none;
            background: white;
            width: 100%;
            height: 150px;
            padding: 5px;
        }
    }
    .imgs{
        padding: 0 15px;
    }
}
</style>


