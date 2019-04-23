<template>
    <div class="scview">
        <div>
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                浏览总量 23
            </div>
            <div class="scview-list">
                <div class="custom-item" v-for="i in 10" :key="i">
                    <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
                    <span>李海燕</span>
                    <span class="time">2019.04.29 12:09:01</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.scview{
    .scview-list{
        .custom-item {
            &:last-child {
                border: none;
            }
        }
        background: white;
    }
}
</style>


