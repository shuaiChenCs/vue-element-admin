<template>
  <div class="sp-upload">
    <cube-upload
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
    type: String,
    accept: {
      type: String,
      default: "image/*"
    },
    max: {
      type: Number,
      default: 10
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
        files: []
    };
  },
    watch: {
        fileList(val) {
          val.forEach(item => {
              let t = {
                  url: item,
                  status: 'success',
                  progress: 1
              }
              this.files.push(t);
          });
      }
    },
  computed: {
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
            realpath: item.response && item.response.data[0].destPath || item.url,
            type: this.accept
        }
        arr.push(obj);
      });
      return arr;
    },
    fileRemove(file) {
      this.$nextTick(() => {
        this.$emit('success', this.buildArr(this.files));
      })
      
    },
    fileSuccess(file) {
      this.$nextTick(() => {
        this.$emit('success', this.buildArr(this.files));
      })
    },
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 5 * 1024 * 1024; // 1M
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
          txt: "You selected >5M files"
        }).show();
    }
  }
};
</script>
<style lang="less">
.sp-upload {
  padding: 15px 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  .cube-upload-file-status.cubeic-right {
    color: #1ed29a;
  }
  .cube-upload-def {
    margin: 0;
    display: flex;
  }
  .cube-upload-file,
  .cube-upload-btn {
    margin-bottom: 0 !important;
  }
  .cube-upload-btn {
    overflow: visible !important;
  }
  .cube-upload-btn-def {
    box-shadow: none !important;
  }
}
</style>


