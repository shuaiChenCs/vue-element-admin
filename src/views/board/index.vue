<template>
  <div class="board">
    <div class="board-header">
      <div class="header-back">
        <div class="top" @click="$router.push('/board/last-add')">
          <span class="num">13</span>
          <span class="title">昨日新增</span>
        </div>
        <div class="bottom">
          <div class="left" @click="$router.push('/board/last-scview')">
            <span class="num">45</span>
            <span class="title">昨日浏览</span>
          </div>
          <div class="right" @click="$router.push('/address-book')">
            <span class="num">3</span>
            <span class="title">累计客户</span>
          </div>
        </div>
        <div class="header">
          <div @click="$router.push('/board/AI')">
            <img :src="$imageUrl + '/board_ radar@3x.png'" alt>
            AI雷达
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
          <div class="more">
            查看全部
            <i class="iconfont iconlist_more"></i>
          </div>
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
  </div>
</template>

<style lang="less" scoped>
.board {
  padding-bottom: 35px;
  .block-item-title {
    color: black;
  }
  > div {
    background: white;
    margin-bottom: 15px;
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
        &:first-child {
          border-right: 1Px solid rgba(237, 238, 241, 1);
        }
        flex: 1;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
        }
      }
    }
  }
  .scview {
    .custom-item {
      &:last-child {
        border: none;
      }
    }
    .block-item-title {
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
