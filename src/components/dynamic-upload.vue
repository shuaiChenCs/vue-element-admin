<template>
  <div class="dynamic-upload">
    <cube-upload
    ref="dynamicUpload"
      v-model="files"
      :action="url"
      :simultaneous-uploads="1"
      @files-added="filesAdded"
      :max="max"
      :accept="accept"
      @file-success="fileSuccess"
      @file-removed="fileRemove"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: String,
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      max: 1,
      accept: 'image/*,video/*'
    };
  },
  computed: {
    list() {},
    url() {
      let v = this.accept.indexOf("video");
      if (v == -1) {
        return `https://c.api.msspay.com/fileUpload?type=${this.type}`;
      } else {
        return `https://c.api.msspay.com/mp4/fileUpload?type=${this.type}`;
      }
    }
  },
  methods: {
    buildArr(files) {
      let arr = [];
      files.forEach(item => {
        let obj = {
            realpath: item.response && item.response.data[0].destPath,
            type: this.accept
        }
        arr.push(obj);
      });
      return arr;
    },
    fileRemove(file) {
      this.$nextTick(() => {
        this.$emit('success', this.buildArr(this.files));
        if(this.files.length == 0) {
          this.accept = 'image/*,video/*';
        }
      })
      
    },
    fileSuccess(file) {
      this.$emit('success', this.buildArr(this.files));
    },
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 5 * 1024 * 1024; // 1M
      let firstFile = files[0];
      if(firstFile.type.indexOf('image') >= 0) {
        this.max = 9;
        this.accept = 'image/*';
      }
      if(firstFile.type.indexOf('video') >= 0) {
        this.max = 1;
        this.accept = 'video/*';
      }
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore &&
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "大小不能超过5M"
        }).show();
    }
  }
};
</script>
<style lang="less">
.dynamic-upload {
  padding: 15px 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  .cube-upload-file-status.cubeic-right {
    color: #1ed29a;
  }
  .cube-upload-def {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .cube-upload-file,
  .cube-upload-btn {
      width: calc((100% - 39px) / 4);
      &:nth-child(4n){
          margin-right: 0 !important;
      }
  }
  .cube-upload-btn {
    overflow: visible !important;
  }
  .cube-upload-file-def,.cube-upload-btn-def {
      width: 100%;
    box-shadow: none !important;
  }
}
</style>


