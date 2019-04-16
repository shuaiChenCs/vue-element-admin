<template>
  <div class="dynamic sp-scroll" v-scroll="loadmore">
    <div class="dynamic-item" v-for="item in count" :key="item">
      <div class="header">
        <img src="https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png" alt>
        <span>zhangsan</span>
      </div>
	  <div class="sigle-content">
		  吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗吴晗
	  </div>
	  <div class="sigle-image-video">
		  <img src="https://img.hrsugaphre.com/userHead/T1.jpg" alt>
		  <sp-video :src="'https://img.hrsugaphre.com/userHead/CE7D4871C61F456E8DEFCAF0D189424D.mp4'"></sp-video>
	  </div>
      <!-- <div class="goods-type">
        <div class="goods-item">
          <div class="img">
            <img src="https://img.hrsugaphre.com/userHead/T1.jpg" alt>
          </div>
          <div class="name">新品</div>
          <div class="handler">
            <span>￥15</span>
          </div>
        </div>
      </div> -->
	  <div class="multi-image">
		  <div v-for="i in 4" :key="i">
			  <img src="https://img.hrsugaphre.com/userHead/T1.jpg" alt>
		  </div>
	  </div>
      <div class="dynamic-handler">
        <div>
          <span class="time">刚刚</span>
          <span class="delete">删除</span>
        </div>
        <!-- <div class="btn">
          <div class="btn-box">
            <span>
              <i class="iconfont iconmoment_like"></i>
              赞
            </span>
            <span>
              <i type class="iconfont iconmoment_message"></i>
              评论
            </span>
          </div>
          <i class="iconfont iconmoment_interact"></i>
        </div> -->
      </div>
      <div class="commet-box">
        <div class="like-list">
			<i type="" class="iconfont iconmoment_like"></i>
			吴晗
		</div>
		<div class="commet-list">
			<div class="commet-item" v-for="item in 5" :key="item">
				<span class="name">吴晗</span>
				<span>&nbsp;回复&nbsp;</span>
				<span class="name">张三：</span>
				<span>123465789</span>
			</div>
		</div>
      </div>
    </div>
    <fixed-button :title="'发布动态'" @clickHandler="addDynamic"></fixed-button>
  </div>
</template>
<script>
export default {
	data() {
		return {
			count: 2
		}
	},
	methods: {
		loadmore() {
			this.count += 2;
		},
		addDynamic() {
            this.$router.push('/my/dynamic/add');
        }
	}
}
</script>

<style lang="less">
.dynamic {
  	background: white !important;
	padding-bottom: 64px;
  .dynamic-item {
	  padding: 15px;
    .header {
      display: flex;
      align-items: center;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 15px;
      }
      span {
        font-size: 15px;
        font-weight: bold;
      }
    }
    .dynamic-handler {
		margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .btn {
        position: relative;
        .btn-box {
          display: flex;
          position: absolute;
          background: rgba(50, 54, 67, 0.8);
          height: 78px/2;
          width: 175px;
          border-radius: 4px;
          left: -354px/2;
          top: -23px/2;
          align-items: center;
          > span {
            &:first-child {
              border-right: 1px solid rgba(50, 54, 67, 1);
            }
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex: 1;
            text-align: center;
            i {
              margin-right: 5px;
            }
          }
        }
      }
      .time {
        font-size: 12px;
        color: rgba(151, 160, 177, 1);
        margin-right: 15px;
      }
      .delete {
        font-size: 12px;
        color: #1ed29a;
      }
    }
    .goods-item {
      box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      overflow: hidden;
      background: white;
      margin: 15px 0;
      .img {
        text-align: center;
      }
      .name,
      .handler {
        font-size: 13px;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
      }
      .handler {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 15px;
          color: #ff6f59;
        }
      }
    }
    .commet-box {
      &::after {
        position: absolute;
        content: "";
        top: -6px;
        left: 10px;
        border-top: -10px transparent dashed;
        border-left: 10px transparent dashed;
        border-right:10px transparent dashed;
        border-bottom: 10px rgba(243, 245, 247, 1) solid;
	  }
	  position: relative;
      margin-top: 20px;
      padding: 10px;
      background: rgba(243, 245, 247, 1);
	  border-radius: 5px;
	  .commet-list{
		  margin-top: 15px;
		  .commet-item{
			  padding: 3px 0;
			  .name{
				font-size: 13px;
				font-weight: bold;
			  }
		  }
	  }
	  .like-list{
		  font-size: 13px;
		  font-weight: bold;
		  i{
			  font-size: 12px;
			  color: #97A0B1;
		  }
	  }
	}
	.sigle-content{
		margin-top: 15px;
		font-size: 13px;
		white-space: normal;
		word-break: break-all;
		line-height: 1.3;
	}
	.sigle-image-video{
		margin-top: 15px;
		text-align: center;
      box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
	  border-radius: 5px;
	//   height: 345px/2;
	  overflow: hidden;
	}
	.multi-image{
		margin-top: 15px;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		>div{
			width: calc((100% - 20px) / 3);
			height: 110px;
			margin: 0 10px 10px 0; 
			border-radius: 5px;
			overflow: hidden;
			img{
				height: 100%;
				width: 100%;
			}
			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}
  }
}
</style>

