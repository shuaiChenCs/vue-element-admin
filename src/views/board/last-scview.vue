<template>
  <div class="last-scview">
      <div class="charts-box">
          <div class="lenged">
              <div><span style="background: rgb(67, 67, 72);"></span>其他</div>
              <div><span style="background: rgb(124, 181, 236);"></span>名片</div>
          </div>
          <div class="charts" id="container"></div>
      </div>
    <div class="ai-list">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        昨日新增客户（共1位）
      </div>
      <div class="ai-item">
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
let Highcharts = require("highcharts");
export default {
  mounted() {
    this.loadmap1();
  },
  methods: {
    loadmap1() {
      Highcharts.chart("container", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: ""
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "{y}%",
              style: {
                  width: "100px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                fontSize: ".3rem",
                useHTML: true
              },
            }
          }
        },
        tooltip: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "其他",
                y: 61.41,
                sliced: true,
                selected: true
              },
              {
                name: "名片",
                y: 11.84
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.last-scview {
  min-height: 100%;
  .charts-box{
      position: relative;
      .lenged{
          position: absolute;
          top: 15px;
          right: 15px;
        //   width: 50px;
          z-index: 1;
          >div {
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              span{
                  margin-right: 5px;
                  display: inline-block;
                  width: 20px;
                  height: 10px;
              }
          } 
      }
  }
  .charts {
      padding: 15px 0;
    height: 470px/2;
    background: white;
  }
  .ai-list {
    .block-item-title {
      margin-bottom: 15px;
    }
    .ai-item {
      padding: 15px;
      margin-bottom: 15px;
      text-align: center;
      .ai-card {
        height: 100px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        text-align: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #1ed29a;
          margin-top: -20px;
          margin-bottom: 9px;
        }
        h1 {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 9px;
        }
        p {
          color: rgba(151, 160, 177, 1);
          font-size: 12px;
          margin-bottom: 15px;
          span {
            color: #1ed29a;
          }
        }
      }
    }
  }
}
</style>


