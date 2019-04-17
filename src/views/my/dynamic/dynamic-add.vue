<template>
    <div class="dynamic-add">
        <div class="block">
            <textarea placeholder="说点什么吧..." v-model="content"></textarea>
        </div>
        <div class="imgs">
            <dynamic-upload @success="bannerSuccess" :type="'dynamic'" :max="9"></dynamic-upload>
        </div>
        <fixed-button :title="'保存'" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
import dynamicUpload from '@/components/dynamic-upload.vue';
export default {
    data() {
        return {
            fileList: [

            ],
            content:''
        }
    },
    methods: {
        bannerSuccess(obj) {
            let type="";
            if(obj.type=='image/*'){
                type=1;
            }else if(obj.type=='video/*'){
                type=2;
            }
            let mul = {
                multimediaType:type,
                multimediaUrl:obj.realpath
            }
            this.fileList.push(mul);
            console.log(this.fileList)
        },
        save() {
            axios.post(this.$apiConfig.addDynamic,{
                content:this.content,
                multimediaList:this.fileList
            }).then(res=>{
                if(res.data.code==0){
                    this.$router.go(-1);
                }
            })
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


