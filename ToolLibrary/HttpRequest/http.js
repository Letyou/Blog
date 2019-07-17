/*
 * Common configuration
 * BASE_URL = 服务器地址
 */
const BASE_URL = "https://baidu.com";
let version = "2.0.0";

/*
* Request header configuration
* @params:{x-app-Version} 程序版本
  @params:{x-platform}  平台来源
  @params:{Accept}  请求头并非实体头
*/
const HEADER_OPTIONS = {
  "X-App-Version": version,
  "x-platform": "Alipay",
  Accept: "application/json"
};
// Network request
const http = ({ url = "", params = {}, ...other }) => {
  // The polling interface is hidden separately
  if (url === "xxxx") {
    my.hideLoading();
  } else {
    my.showLoading({
      content: "载入中..."
    });
  }
  return new Promise((resolve, reject) => {
    my.request({
      url: getUrl(url),
      data: params,
      headers: HEADER_OPTIONS,
      ...other,
      timeout: 5000,
      complete: res => {
        my.hideLoading();
        if (res.data.return) {
          resolve(res.data);
        } else {
          reject(res.data);
          switch (res.status) {
            case 404:
              my.showToast({
                content: "网络请求不存在",
                type: "fail",
                duration: 2000
              });
              break;
            case 502:
              my.showToast({
                content: "服务器错误",
                type: "fail",
                duration: 2000
              });
              break;
            case 504:
              my.showToast({
                content: "请求服务器超时",
                type: "fail",
                duration: 2000
              });
              break;
          }
          // 接口返回通用异常处理
          if (res.data.ecode === -9999) {
            my.alert({
              title: "温馨提示",
              content: res.data.message
            });
          }
        }
      }
    });
  });
};
const getUrl = url => {
  if (url.indexOf("://") == -1) {
    url = BASE_URL + url;
  }
  return url;
};
module.exports = {
  BASE_URL,
  get(url, params = {}) {
    return http({
      url,
      params
    });
  },
  post(url, params = {}) {
    return http({
      url,
      params,
      method: "post"
    });
  }
};
