<template>
  <div class="tags">
    <div v-for="(item, index) in tags" :key="index">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        {{item.labelName}}
      </div>
      <div class="tag-block">
        <div
          class="tag-item"
          :style="{background: selectTags[item.labelName] == tag.labelName ? tag.backgroundImg : ''}"
          @click="select(item.labelName, tag)"
          v-for="(tag, subindex) in item.childList"
          :key="subindex"
        >
          {{tag.labelName}}
          <i class="iconfont iconpopup_close" v-if="item.labelName == '自定义标签'"></i>
        </div>
        <div class="tag-item add" @click="addTag(item.labelName)" v-if="item.labelName == '自定义标签'">
          <i class="iconfont iconcard_edit_add"></i>
        </div>
      </div>
      <!-- :style="{background: tag.backgroundImg}" -->
    </div>
    <fixed-button :title="'保存'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [],
      selectTags: {}
    };
  },
  methods: {
    save() {},
    addTag(name) {
      let dialog = this.$createDialog({
        type: "prompt",
        title: "编辑自定义标签",
        showClose: true,
        prompt: {
          autofocus: true,  
          value: "",
          placeholder: "请输入"
        },
        onConfirm: (e, promptValue) => {
          console.log(this.tags);
            dialog.promptValue = '';
        },
        onClose: () => {
            dialog.promptValue = '';
        },
        onCancel: () => {
            dialog.promptValue = '';
        }
      }).show();
    },
    select(name, tag) {
      this.$set(this.selectTags, name, tag.labelName);
      console.log(this.selectTags);
    }
  },
  created() {
    axios.get(this.$apiConfig.labelLibrary, {}).then(res => {
      if (res.data.code == 0) {
        this.tags = res.data.data;
        console.log(this.tags);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.tags {
  .tag-block {
    background: white;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 15px 0;
    .tag-item {
      position: relative;
      padding: 10px 15px;
      background: #f8f8f8;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      .iconpopup_close {
        position: absolute;
        top: -5px;
        right: -5px;
      }
      &.add {
        padding: 8px 15px;
        width: 100px;
        background: none;
        border: 1px dashed #949494;
        text-align: center;
        i {
          color: #949494;
        }
      }
    }
  }
}
</style>


