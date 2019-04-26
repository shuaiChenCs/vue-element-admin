<template>
    <div class="playbill">
        <div class="img">
            <img :src="image" alt="">
        </div>
        <fixed-button :title="'长按图片保存到相册'" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            image:'',
        }
    },
    created(){
        this.image = this.$store.state.card.poster;
    },
    methods: {
        save() {

        }
    }
}
</script>

<style lang="less" scoped>
.playbill{
    height: 100vh;
    background: white;
    .img{
        padding: 25px 40px 0;
        img{
            box-shadow:0px 0px 18px 2px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            width: 590px/2;
            height: 856px/2;
        }
    }
}
</style>

