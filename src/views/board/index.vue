<template>
  <div class="board">
    <div class="board-header">
      <div class="header-back">
        <div class="top" @click="$router.push('/board/last-add')">
          <span class="num">{{yesterdayCount.users || 0}}</span>
          <span class="title">昨日新增</span>
        </div>
        <div class="bottom">
          <div class="left" @click="$router.push('/board/last-scview')">
            <span class="num">{{yesterdayCount.browse || 0}}</span>
            <span class="title">昨日浏览</span>
          </div>
          <div class="right" @click="$router.push('/address-book')">
            <span class="num">{{yesterdayCount.count || 0}}</span>
            <span class="title">累计客户</span>
          </div>
        </div>
        <div class="header">
          <div @click="$router.push('/board/AI')">
            <img :src="$imageUrl + '/board_ radar@3x.png'" alt>
            AI雷达
          </div>
          <div @click="$router.push('/board/search-user')">
            <img :src="$imageUrl + '/board_search@3x.png'" alt>
            找客户
          </div>
          <div @click="$router.push('/board/card')">
            <img :src="$imageUrl + '/board_ card@3x.png'" alt>
            名片
          </div>
        </div>
      </div>
      <div class="scview">
        <div class="block-item-title">
          <div class="left">
            <i class="iconfont iconcard_pause"></i>
            最新留言
          </div>
          <!--<div class="more">-->
            <!--查看全部-->
            <!--<i class="iconfont iconlist_more"></i>-->
          <!--</div>-->
        </div>
        <div class="scview-list">
          <div class="message-item"  v-for="se in sessions.slice(0, 10)" :key="se.id" @click="goTo(se)">
                <img :src="se.card.headImg" alt="">
                <div class="message-info">
                    <div class="top">
                        <span class="name">{{se.card.nikeName}}</span>
                        <span class="time">{{se.updateTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                    </div>
                    <div class="bottom">
                        {{se.lastMsg.type == 'text' ? se.lastMsg.text : '[图片消息]'  | substr}}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import eventBus from '@/lib/eventBus.js'
    export default {
        data(){
            return {
              yesterdayCount:{
                  users:0,
                  browse:0,
                  count:0
              }
            }
        },
        computed: {
          sessions() {
            return this.$store.state.sessions
          }
        },
        created(){
            if(sessionStorage.token) {
                this.getData();
            }else{
                let vm = this;
                eventBus.$once('setToken',function(){
                    vm.getData()
                });
            }
        },
        methods: {
            getData() {
                axios.get(this.$apiConfig.yesterdayBrowseCount,{}).then(res=>{
                    if(res.data.code==0){
                        this.yesterdayCount = res.data.data;
                    }
                })
            },
          goTo(item) {
            this.$router.push({ path: '/chat', query: { user: item }});
          }
        }
    }
</script>

<style lang="less" scoped>
.board {
  height: 100%;
  .block-item-title {
    color: black;
  }
  > div {
    background: white;
    // margin-bottom: 15px;
  }
  .num {
    font-size: 30px;
    font-weight: bold;
    color: white;
  }
  .title {
    font-size: 12px;
    color: white;
  }
  .header-back {
    position: relative;
    height: 355px/2;
    background: linear-gradient(
      30deg,
      rgba(11, 196, 183, 1) 0%,
      rgba(43, 217, 144, 1) 100%
    );
    display: flex;
    flex-direction: column;
    text-align: center;
    // padding: 285px/2 15px 0;
    margin-bottom: 50px;
    .top {
      height: 167px/2;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 17px 0;
    }
    .bottom {
      flex: 1;
      display: flex;
      > div {
        .num {
          font-size: 25px;
          margin-bottom: 8px;
        }
        text-align: center;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    }
    .header {
      width: 690px/2;
      top: 285px/2;
      left: 15px;
      position: absolute;
      height: 70px;
      background: white;
      box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      display: flex;
      align-items: center;
      > div {
        flex: 1;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }
    }
  }
  .scview {
    background: #F8F8F8;
    padding-bottom: 50px;
    .scview-list{
      background: white;
    }
    .message-item{
        &:last-child{
            // border-bottom: none;
        }
        padding: 0 15px;
        height: 70px;
        border-bottom: 1Px solid rgba(237, 238, 241, 1);
        display: flex;
        align-items: center;
        img{
            margin-right: 15px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
        .message-info{
            flex: 1;
        }
        .top{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .name{
                font-size: 15px;
            }
            .time{
                font-size: 11px;
                color: #97A0B1;
            }
        }
        .bottom{
            font-size: 12px;
            color: #97A0B1;
        }
    }
    .block-item-title {
      background: white;
      > div {
        display: flex;
        align-items: center;
      }
      display: flex;
      justify-content: space-between;
      .more {
        color: #97a0b1;
        i {
          margin-right: 0;
          color: #97a0b1;
        }
      }
    }
  }
}
</style>
