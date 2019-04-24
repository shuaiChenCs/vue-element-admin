<template>
  <div class="tag-type">
    <div class="search-type">
      <div class="custom-item" v-for="(person,index) in persons" :key="person.id">
        <img :src="person.headImg" alt>
        <span>{{person.nikeName}}</span>
      </div>
    </div>
    <fixed-button :title="'群发消息'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
    data(){
        return {
            id:0,
            persons:[]
        }
    },
    created(){
        let vm = this;
        this.id = this.$route.params.id;
        axios.get(this.$apiConfig.labelList+this.id,{}).then(res=>{
          if(res.data.code==0) {
              console.log(res.data.data)
              vm.persons = res.data.data || [];
          }
        });
    },
    methods: {
        save() {}
    }
}
</script>

<style lang="less" scoped>
.tag-type {
    padding-bottom: 64px;
    .search-type{
        background: white;
    }
}
</style>
