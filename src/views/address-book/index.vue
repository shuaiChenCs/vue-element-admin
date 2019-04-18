<template>
  <div class="address-book">
    <cube-index-list :data="cityData">
      <cube-index-list-group v-for="(group, index) in cityData" :key="index" :group="group">
        <cube-index-list-item
          class="sp-list-item"
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem"
        >
          <div class="custom-item">
            <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt="">
            {{item.name}}
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>
<script>
const cityData = [
  
  {
    name: "",
    items: [
      {
        name: "BEIJING",
        value: 1
      },
      {
        name: "SHANGHAI",
        value: 2
      }
    ]
  },
  {
    name: "★Hot City",
    items: [
      {
        name: "BEIJING",
        value: 1
      },
      {
        name: "SHANGHAI",
        value: 2
      }
    ]
  },
  {
    name: "A",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  }
];

export default {
  data() {
    return {
      title: "Current City: BEIJING",
      cityData: cityData
    };
  },
  methods: {
    selectItem(item) {
      console.log(item.name);
    }
  }
};
</script>
<style lang="less" scoped>
.address-book {
  height: 100%;
  .sp-list-item {
    &:last-child {
      .custom-item {
        border: none;
      }
    }
  }
  .custom-item {
    margin-left: 15px;
    display: flex;
    height: 50px;
    border-bottom: 1Px solid rgba(237, 238, 241, 1);
    align-items: center;
    img{
      height: 30px;
      width: 30px;
      border-radius: 5px;
      margin-right: 15px;
    }
  }
}
</style>
