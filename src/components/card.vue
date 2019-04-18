<template>
    <div class="card">
        <div class="header">{{title}}</div>
        <div class="code">
            <img src="@/assets/123.jpg" alt="">
            <div>长按图片识别小程序码</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        url: String
    }
}
</script>

<style lang="less" scoped>
.card{
    height: 624px/2;
    width: 510px/2;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header{
        text-align: center;
        line-height: 114px/2;
        height: 114px/2;
        font-size: 18px;
        color: white;
        background:linear-gradient(30deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%);
    }
    .code{
        background: white;
        flex: 1;
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        img{
            height: 155px;
            width: 155px;
        }
        >div{
            width: 155px;
            line-height: 30px;
            color: #1ED29A;
            height: 30px;
            border-radius: 15px;
            border: 1Px solid #1ED29A;
            text-align: center;
            font-size: 11px;
        }
    }
}
</style>

