<template></template>

<script>
export default {
  mounted() {
    this.getWechatCode();
  },
  methods: {
    /**
     * @description: 获取微信授权code
     */
    getWechatCode() {
      let wechatCode = this.getQueryString("code");
      let local = window.location.href;
      if (!wechatCode) {
        window.location.href = local;
      } else {
        // 方式自选 也可以采用Vuex管理获取的code
        localStorage.setItem("code", wechatCode);
      }
    },
    /**
     * @description:查询url中的code
     */
    getQueryString(code) {
      //寻找&+url参数名字=值+& 地址符(&)可以不存在。
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      // 查询url ?之后的部分，查询以后匹配正则表达式
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
};
</script>

<style>
</style>
