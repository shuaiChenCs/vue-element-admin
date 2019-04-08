<template>
    <div class="board">
        <cube-index-list
        :data="cityData"
        :title="title"
        @select="selectItem"
        @title-click="clickTitle">
        </cube-index-list>
    </div>
</template>
<script>
const cityData = [
  {
    "name": "★Hot City",
    "items": [
      {
        "name": "BEIJING",
        "value": 1
      },
      {
        "name": "SHANGHAI",
        "value": 2
      }
    ]
  },
  {
    "name": "A",
    "items": [
      {
        "name": "ANSHAN",
        "value": 3
      },
      {
        "name": "ANQING",
        "value": 4
      }
    ]
  }
]

export default {
  data() {
    return {
      title: 'Current City: BEIJING',
      cityData: cityData
    }
  },
  methods: {
    selectItem(item) {
      console.log(item.name)
    },
    clickTitle(title) {
      console.log(title)
    }
  }
}
</script>
<style lang="less" scoped>
.board{
    height: 100%;
    >div{
        // height: 1000px;
        background: #ccc;
    }
}
</style>
