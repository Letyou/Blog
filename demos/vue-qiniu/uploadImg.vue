<template>
  <div>
    <section>
      <div class="previewList">
        <div class="previewAvatar" v-for="(item,index) in uploadList" :key="index">
          <img class="picImg" :src="item" alt>
          <img
            @click="deleteImg(index)"
            class="delPic"
            src="../../assets/Images/delete_pic.png"
            alt
          >
        </div>

        <input
          style="display:none;"
          @change="uploadImg"
          ref="file"
          type="file"
          id="upload"
          accept="image/jpeg, image/png"
        >
        <img
          v-if="uploadList.length < 3"
          @click="triggerUpload"
          class="picImg"
          src="../../assets/img/add_pic.png"
          alt
        >
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uploadList: [],
      uploadToken: ""
    };
  },
  methods: {
    /**
     * @description: 触发隐藏Input事件且获取后台返回的token
     */
    triggerUpload() {
      document.getElementById("upload").click();
      Http.post("/qiniu/getToken", {})
        .then(res => {
          this.uploadToken = res.data.token;
        })
        .catch(err => {});
    },
    /**
     * @description:上传图片
     * @param {type}
     * @return:
     */
    uploadImg(e) {
      let file = document.getElementById("upload").files[0];
      let fileName = document.getElementById("upload").files[0].name;
      let token = this.uploadToken;
      let key = fileName;
      let url = "http://upload.qiniu.com/";
      var data = new FormData();
      data.append("file", file);
      data.append("key", key);
      data.append("token", token);
      const instance = axios.create();
      instance({
        method: "POST",
        url: url,
        data: data
      })
        .then(res => {
          document.getElementById("upload").value = "";
          let uploadUrl = "https://" + "cdn.*******.cn/" + res.data.key;
          this.uploadList.push(uploadUrl);
        })
        .catch(err => {});
    },
    /**
     * @description:删除图片
     */
    deleteImg(index) {
      this.uploadList.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
