<template>
  <div class="sp-scroll" v-scroll="loadmore">
  <div class="last-scview">
      <div class="charts-box"  v-show="browseGroup.length>0" >
          <div class="lenged">
              <div  v-for="(item,index) in browseGroup" :key="index"><span :style="{background: item.color}"></span>{{item.name}}</div>
              <!--<div><span style="background: bla"></span>名片</div>-->
          </div>
            <div class="charts" id="container"></div>
      </div>
    <div class="ai-list">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        昨日浏览客户（共{{page.total}}位）
      </div>
      <!--<div class="ai-item">-->
        <!--<div class="ai-card">-->
          <!--<img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>-->
          <!--<h1>陈雨涵</h1>-->
          <!--<p>正在看你的名片，快抓住时机，主动出击</p>-->
        <!--</div>-->
      <!--</div>-->
        <no-data v-if="page.total==0"></no-data>
      <div class="ai-item" v-for="(user,index) in browseUser" :key="index">
        <div class="ai-card" @click="$router.push('/address-book/person/'+user.directoryId)">
          <img :src="user.userHeadImg" alt>
          <h1>{{user.userName}}</h1>
          <p>
            看了你的名片，快抓住时机，主动出击
            <!--<span>[北欧风转椅]</span>-->
          </p>
        </div>
      </div>
        <no-more v-if="page.total!=0 && page.total==browseUser.length"></no-more>
    </div>
    </div>
  </div>
</template>
<script>
let Highcharts = require("highcharts");
export default {
    data(){
        return{
            current:1,
            size:6,
            browseGroup:[],
            page:{},
            browseUser:[],
            colors:['#1ED29A','#EFCA08','#60AFFF','#7E7EFF']
        }
    },
    created(){
        axios.get(this.$apiConfig.yesterdayBrowseGroup,{}).then(res=>{
            if(res.data.code==0){
                this.browseGroup = res.data.data;
                if(this.browseGroup.length>0){
                    this.browseGroup.forEach((e,i)=>{
                        this.$set(e,'color',this.colors[i]);
                    })
                    this.loadmap1(this.browseGroup);
                }

            }
        });
       this.loadBrowseList();
    },
  methods: {
      loadmore(){
        this.current++;
        this.loadBrowseList();
      },
      loadBrowseList(){
          axios.get(this.$apiConfig.yesterdayBrowseUser+"?current="+this.current+"&size="+this.size,{}).then(res=>{
              if(res.data.code==0){
                  this.page = res.data.data;
                  this.browseUser = this.browseUser.concat(this.page.records);
              }
          })
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
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
          //colors: this.colors,
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
            data:data
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


