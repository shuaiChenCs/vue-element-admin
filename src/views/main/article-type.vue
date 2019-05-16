<template>
  <div class="article-type">
    <div v-for="(item, index) in tags" :key="index">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        {{item.labelName}}
      </div>
      <div class="tag-block">
        <div
          class="tag-item"
          :style="{background: tag.isCheck   ? tag.backgroundImg : ''}"
          @click="select(item.labelName, tag, item.childList)"
          v-for="(tag, subindex) in item.childList"
          :key="subindex"
        >
          {{tag.labelName}}
          <i class="iconfont iconpopup_close" v-if="item.labelName == '自定义标签'" @click.self.stop="del(tag.id,subindex,item.childList)"></i>
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
        id :0,
      tags: [],
      selectTags: {},
      dialog: null
    };
  },
  methods: {
    save() {
        let lables = [];
        this.tags.forEach(item => {
            item.childList.forEach(subitem => {
                if(subitem.isCheck){
                    lables.push(subitem.id)
                }
            })
        });
        let params = {
            id:this.id,
            labelId:lables
        }
        axios.post(this.$apiConfig.addLabel,params).then(res=>{
           if(res.data.code==0){
               this.$router.go(-1);
           }
        });
    },
      del(id,subindex,childList){
          let vm = this;
          this.$createDialog({
              type: 'confirm',
              content: '确认是否删除',
              onConfirm(e){
                  axios.post(vm.$apiConfig.delLabel+'/'+id,{}).then((res)=>{
                      if(res.data.code==0) {
                          childList.splice(subindex,1)
                          vm.$createToast({
                              time: 100
                          }).show();
                      }else{
                          console.log(1)
                          this.$createDialog({
                              content: res.data.message
                          }).show()
                      }
                  });
              }
          }).show()
      },
    addTag(name) {
        let vm = this;
      this.dialog = this.$createDialog({
        type: "prompt",
        title: "编辑自定义标签",
        showClose: true,
        prompt: {
            ref: "hiddenInput",
          autofocus: true,  
          value: "",
            maxlength:10,
          placeholder: "请输入",

        },
        onConfirm: (e, promptValue) => {
            axios.post(vm.$apiConfig.addUserTag,{
                "backgroundImg": "#EFF7FF",
                "labelName": promptValue,
                "parentId":27
            }).then(res=>{
                if(res.data.code==0){
                    vm.tags[vm.tags.length -1].childList.push({
                        id:res.data.data.id,
                        labelName: promptValue,
                        backgroundImg: '#EFF7FF',
                        isCheck: false
                    })
                }
            });

            this.dialog.promptValue = '';
        },
        onClose: () => {
            this.dialog.promptValue = '';
        },
        onCancel: () => {
            this.dialog.promptValue = '';
        }
      }).show();
    },
    select(name, tag, childs) {
        if(name == '自定义标签') {
            if(!this.selectTags[name]) {
                this.$set(this.selectTags, name, []);
                this.selectTags[name].push(tag.id);
                tag.isCheck = true;
            }else{
                let i = this.selectTags[name].findIndex(item => {
                    return item == tag.id;
                });
                if(i != -1) {
                    tag.isCheck = false;
                    this.selectTags[name].splice(i, 1);
                }else{
                    tag.isCheck = true;
                    this.selectTags[name].push(tag.id);
                }
            }
        }else{
            childs.map(item => item.isCheck = false);
            if(this.selectTags[name] == tag.id) {
                tag.isCheck = false;
                this.$delete(this.selectTags, name);
            }else{
                tag.isCheck = true;
                this.$set(this.selectTags, name, tag.id);
            }
        }
    }
  },
  created() {
      this.id = this.$route.params.id
      axios.get(this.$apiConfig.userLabelLibrary+this.id,{}).then(res=>{
          if(res.data.code==0){
              this.tags = res.data.data;
          }
      });
  }
};
</script>
<style lang="less" scoped>
.article-type {
    padding-bottom: 80px;
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


