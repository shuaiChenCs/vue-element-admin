<template>
    <div class="last-add">
        <div class="ai-list">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                昨日新增客户（共1位）
            </div>
            <div class="ai-item" v-for="i in 2" :key="i">
                <div class="ai-card">
                    <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
                    <h1>陈雨涵</h1>
                    <p>正在看你的名片，快抓住时机，主动出击</p>
                </div>
            </div>
            <div class="ai-item" v-for="i in 2" :key="i">
                <div class="ai-card">
                    <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
                    <h1>陈雨涵</h1>
                    <p>
                        查看了商品
                        <span>[北欧风转椅]</span>
                    </p>
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
.last-add{
    min-height: 100%;
    .ai-list{
        .block-item-title{
            margin-bottom: 15px;
        }
        .ai-item{
            padding: 15px;
            margin-bottom: 15px;
            text-align: center;
            .ai-card{
                height:100px;
                background:rgba(255,255,255,1);
                border-radius:5px;
                text-align: center;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 1Px solid #1ED29A;
                    margin-top: -20px;
                    margin-bottom: 9px;
                }
                h1{
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 9px;
                }
                p{
                    color:rgba(151,160,177,1);
                    font-size: 12px;
                    margin-bottom: 15px;
                    span{
                        color: #1ED29A;
                    }
                }
            }
        }
    }
}
</style>


