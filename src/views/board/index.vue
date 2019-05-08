<template>
  <div class="sp-scroll" v-scroll="loadmore">
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
          <div class="right" @click="$router.push('/board/share-count')">
            <span class="num">{{yesterdayCount.forward|| 0}}</span>
            <span class="title">昨日转发</span>
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
            近7日潜在客戶
          </div>
          <!--<div class="more">-->
            <!--查看全部-->
            <!--<i class="iconfont iconlist_more"></i>-->
          <!--</div>-->
        </div>
        <no-data v-if="users.length==0"></no-data>
        <div class="scview-list">

          <div class="custom-item"  v-for="(user,index) in users" :key="index" @click="$router.push('/address-book/person/'+user.directoryId)">
            <div class="base">
              <img
                      :src="user.userHeadImg"
                      alt
              >
              <span>{{user.userName}}</span>
            </div>
            <div class="record">
              <span>浏览次数 {{user.browseCount || 0}}</span>
              <span>浏览时长 {{user.duration || 0}}</span>
            </div>
            <!--<div class="stimes" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">{{user.browseCount}}-->
            <!--</div>-->
            <!--<div class="stime" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">{{user.duration}}</div>-->
            </div>
        </div>
        <no-more v-if="users.length==page.total"></no-more>
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
                page:{},
                users:[],
                current:1,
                size:10,
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
            loadmore(){
                this.current++;
                this.loadWeek();
            },
            loadWeek(){
                axios.post(this.$apiConfig.potentialWeek,{
                    current: this.current,
                    size: this.size
                }).then(res=>{
                    if(res.data.code==0){
                        this.page = res.data.data;
                        this.users = this.users.concat(res.data.data.records);
                        if(res.data.data.records.length==0){
                            this.current--;
                        }
                    }
                });
            },
            getData() {
                axios.get(this.$apiConfig.yesterdayBrowseCount,{}).then(res=>{
                    if(res.data.code==0){
                        this.yesterdayCount = res.data.data;
                    }
                })
                this.loadWeek();
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
      .custom-item {
        .base {
          flex: 1;
        }
        .stime,
        .stimes {
          text-align: center;
          width: 20%;
          &.n1 {
            font-weight: bold;
            color: #f4cc13;
          }
          &.n2 {
            font-weight: bold;
            color: #d4d6d3;
          }
          &.n3 {
            font-weight: bold;
            color: #b47943;
          }
        }
        .stimes {
          text-align: center;
          width: 15%;
          margin-right: 10px;
        }
      }
      .custom-item {
        .base {
          display: flex;
          align-items: center;
          span {
            flex: 1;
          }
        }
        &:last-child {
          border: none;
        }
        .record {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size:12px;
          span {
            padding: 5px 0;
          }
        }
      }

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
