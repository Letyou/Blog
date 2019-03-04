<template></template>

<script>
export default {
  data() {
    return {
      ws: null
    };
  },
  created() {
    if ("window" in window) {
      this.initSocket();
    } else {
      alert("your browser not support socket!");
    }
  },
  methods: {
    initSocket() {
      let _this = this;
      const wsName = "ws://********/api/webSocket/";
      this.ws = new WebSocket(wsName);
      this.ws.onopen = function(evt) {};
      this.ws.onmessage = function(evt) {
        // 获取服务端的推送的消息
        console.log(evt);
        _this.ws.send("我收到消息了");
      };
    }
  },
  beforeDestroy() {
    this.ws.send("我要断开连接了");
  },
  destroyed() {
    this.ws.onclose = function(evt) {};
  }
};
</script>

<style>
</style>
