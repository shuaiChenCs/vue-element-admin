<template>
  <div class="sp-scroll" v-scroll="loadmore">
    <div class="search-user">
      <div class="charts-box" v-show="browseGroup.length>0">
        <div class="lenged">
          <div v-for="(item,index) in browseGroup" :key="index">
            <span :style="{background: item.color}"></span>
            {{item.name}}
          </div>
          <!--<div><span style="background: bla"></span>名片</div>-->
        </div>
        <div class="charts" id="container"></div>
      </div>
      <div class="tab-box">
        <div
          class="tab"
          v-for="(item, index) in browseGroup"
          @click="showPicker(item)"
          :key="index"
          :style="[{border: `1Px solid ${item.color}`, color: item.color}, active == item.name ? styleObj : {}]"
        >{{item.name}}</div>
      </div>
      <div class="scview-list">
        <div class="title">
          <span class="base">基本信息</span>
          <span class="stimes">浏览次数</span>
          <span class="stime">浏览时长(秒)</span>
        </div>
        <div class="custom-item" v-for="(i, index) in 4" :key="index">
          <div class="base">
            <img
              src="https://wx.qlogo.cn/mmopen/vi_32/ACyukd6bJz9ic1lXWquc2kpfA8nAqw6hvu1V9icNNWgzhSR48NypAE1rFkFMNibFxJicv4l3gBlQprQaPs51GFiaStQ/132"
              alt
            >
            <span>Marco</span>
          </div>
          <div class="stimes" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">200</div>
          <div class="stime" :class="{n1: index == 0, n2: index == 1, n3: index == 2}">200</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let Highcharts = require("highcharts");
export default {
  data() {
    return {
      browseGroup: [],
      colors: ["#1ED29A", "#EFCA08", "#60AFFF", "#7E7EFF"],
      active: "卡片",
      goods: [
        {
          text: "iponex",
          value: "iponex"
        },
        {
          text: "ipone6",
          value: "ipone6"
        },
        {
          text: "ipone7",
          value: "ipone7"
        }
      ],
      styleObj: {

      }
    };
  },
  created() {
    axios.get(this.$apiConfig.yesterdayBrowseGroup, {}).then(res => {
      if (res.data.code == 0) {
        this.browseGroup = res.data.data;
        if (this.browseGroup.length > 0) {
          this.browseGroup.forEach((e, i) => {
            this.$set(e, "color", this.colors[i]);
          });
          this.styleObj = {
            background: this.browseGroup[0].color,
            color: "white"
          }
          this.loadmap1(this.browseGroup);
        }
      }
    });
  },
  methods: {
    loadmore() {},
    showPicker(item) {
      this.active = item.name;
      this.styleObj = {
        background: item.color,
        color: "white"
      };
      if (item.name == "商城") {
        let picker = this.$createPicker({
          title: "商品列表",
          data: [this.goods],
          onSelect: this.selectHandle
        });

        picker.show();
      }
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText);
    },
    loadmap1(data) {
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
          pointFormat: "{series.name}: <b>{point.percentage:.1f}</b>"
        },
        //colors: this.colors,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "{y}",
              style: {
                width: "100px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                fontSize: ".3rem",
                useHTML: true
              }
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
            data: data,
            events: {
                click: (event)=> {
                    let item = {
                        name: event.point.name,
                        color: event.point.color
                    }
                    this.showPicker(item);
                }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search-user {
  min-height: 100%;
  .charts-box {
    position: relative;
    .lenged {
      position: absolute;
      top: 15px;
      right: 15px;
      //   width: 50px;
      z-index: 1;
      > div {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        span {
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
  .tab-box {
    margin-top: 15px;
    height: 60px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab {
      text-align: center;
      min-width: 70px;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
    }
  }
  .scview-list {
    .title {
      color: rgba(151, 160, 177, 1);
      display: flex;
      padding: 5px 15px;
    }
    .title,
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
        span {
          padding: 5px 0;
        }
      }
    }
    background: white;
  }
}
</style>


