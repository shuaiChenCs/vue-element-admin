<template>
    <div class="dynamic-add">
        <div class="block">
            <textarea placeholder="说点什么吧..."></textarea>
        </div>
        <div class="imgs">
            <dynamic-upload @success="bannerSuccess" v-model="fileList" :type="'dynamic'" :max="10"></dynamic-upload>
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
                {
                    
                    url: 'https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png',
                    status: 'success',
                    progress: 1
                }
            ]
        }
    },
    methods: {
        bannerSuccess(obj) {
            console.log(obj)
        },
        save() {}
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


