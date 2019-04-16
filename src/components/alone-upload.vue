<template>
  <div class="alone-upload">
    <cube-upload 
    ref="upload" 
    :accept="accept" 
    class="alone-upload" 
    v-model="list" 
    :action="url"
    :max="max"
    @file-success="fileSuccess"
    :simultaneous-uploads="1">
    </cube-upload>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    accept: {
      type: String,
      default: "image/*"
    },
    max: {
      type: Number,
      default: 1
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    url() {
      let v = this.accept.indexOf("video");
      console.log(this.accept);
      if (v == -1) {
        return `https://c.api.msspay.com/fileUpload?type=${this.type}`;
      } else {
        return `https://c.api.msspay.com/mp4/fileUpload?type=${this.type}`;
      }
    }
  },
  methods: {
      fileSuccess(file) {
          let obj = {
              realpath: file.response.data[0].destPath,
              type: this.accept
          }
          this.$emit('success', obj);
      }
  }
};
</script>
<style lang="less">
.alone-upload {
  .cube-upload-btn-def {
    background: none;
  }
  .cube-upload-file{
      display: none;
  }
}
</style>

