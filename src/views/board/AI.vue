<template>
    <div class="ai">
        <div class="ai-list">
            <div class="ai-item" v-for="i in 10" :key="i">
                <div class="time">
                    2019.04.02  14:00
                </div>
                <div class="ai-card">
                    <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
                    <h1>陈雨涵</h1>
                    <p>正在看你的名片，快抓住时机，主动出击</p>
                    <div class="tags">
                        <div class="tag-item">彬彬有礼</div>
                        <div class="tag-item">彬彬有礼</div>
                        <div class="tag-item">彬彬有礼</div>
                        <div class="tag-item">彬彬有礼</div>
                        <div class="tag-item add">添加标签</div>
                    </div>
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
.ai{
    min-height: 100%;
    padding: 15px;
    .ai-list{
        .ai-item{
            margin-bottom: 15px;
            text-align: center;
            .time{
                margin: 0 auto;
                text-align: center;
                width:263px/2;
                height:60px/2;
                background:rgba(237,238,241,1);
                border-radius:30px/2;
                line-height: 30px;
                margin-bottom: 35px;
            }
            .ai-card{
                // height:277px/2;
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
                }
                .tags{
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    .tag-item{
                        height: 24px;
                        line-height: 24px;
                        color: #1ED29A;
                        border-radius: 5px;
                        border: 1Px solid #1ED29A;
                        padding: 0 10px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        &:nth-child(4n) {
                            margin-right: 0;
                        }
                        &.add{
                            margin-right: 0;
                            color:rgba(151,160,177,1);
                            border: none;
                            background:rgba(243,245,247,1);
                        }
                    }
                }
            }
        }
    }
}
</style>


