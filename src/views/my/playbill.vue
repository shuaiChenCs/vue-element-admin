<template>
    <div class="playbill">
        <div class="img">
            <img src="@/assets/images/article_bg01.png" alt="">
        </div>
        <fixed-button :title="'保存到本地相册'" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
export default {
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

