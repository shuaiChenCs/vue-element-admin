<template>
  <div class="board-card">
    <div class="board-header">
      <div class="header-back">
        <div class="header">
          <div class="top">
            <span class="num">13</span>
            <span class="title">新增客户</span>
          </div>
          <div class="bottom">
            <div class="left" @click="$router.push('/board/scview')">
              <span class="num">45</span>
              <span class="title">浏览量</span>
            </div>
            <div class="right">
              <span class="num">3</span>
              <span class="title">转发次数</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scview">
        <div class="block-item-title">
          <div class="left">
            <i class="iconfont iconcard_pause"></i>
            最近浏览
          </div>
          <div class="more">
            查看全部
            <i class="iconfont iconlist_more"></i>
          </div>
        </div>
        <div class="scview-list">
          <div class="custom-item">
            <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
            <span>李海燕</span>
            <span class="time">2019.04.29 12:09:01</span>
          </div>
          <div class="custom-item">
            <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
            <span>李海燕</span>
            <span class="time">2019.04.29 12:09:01</span>
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        近一周流量趋势
      </div>
      <div id="container" class="charts-box"></div>
    </div>
    <div class="charts">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        互动次数
      </div>
    </div>
  </div>
</template>
<script>
let Highcharts = require("highcharts");
export default {
  mounted() {
      var chart = Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: ''
    },
      colors: ["#1ED29A", "#62C3FF"],
    xAxis: {
        title: {
          text: ""
        },
        labels: {
          style: {
            fontSize: "30px",
            whiteSpace: "nowrap"
          }
        },
        categories: ['04-03', '04-10', '04-13', '04-15', '04-17', '04-18', '04-19']
      },
    yAxis: {
        title: {
          text: ""
        },
        labels: {
          style: {
            fontSize: "30px"
          }
        },
        step: 1,
        tickPixelInterval: 100
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 0,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: '浏览量',
        data: [12, 22, 33, 64, 445, 162, 237]
    }, {
        name: '客户量',
        data: [2, 3, 4, 1, 16,41, 32]
    }]
});

    
  }
};
</script>

<style lang="less" scoped>
.board-card {
  .block-item-title {
    color: black;
  }
  > div {
    background: white;
    margin-bottom: 15px;
  }
  .charts-box {
    height: 542px/2;
    padding: 15px;
  }
  .num {
    font-size: 30px;
    font-weight: bold;
  }
  .title {
    font-size: 12px;
    color: rgba(151, 160, 177, 1);
  }
  .header-back {
    height: 306px/2;
    background: linear-gradient(
      30deg,
      rgba(11, 196, 183, 1) 0%,
      rgba(43, 217, 144, 1) 100%
    );
    padding: 30px 15px 0;
    margin-bottom: 45px;
    .header {
      height: 306px/2;
      background: white;
      box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      .top {
        height: 167px/2;
        border-bottom: 1Px solid rgba(237, 238, 241, 1);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0;
      }
      .bottom {
        flex: 1;
        display: flex;
        > div {
          &.left {
            border-right: 1Px solid rgba(237, 238, 241, 1);
          }
          text-align: center;
          padding: 10px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
