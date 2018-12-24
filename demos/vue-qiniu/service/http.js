'use strict'
import axios from 'axios'
import {
  Indicator
} from 'mint-ui';
import {
  MessageBox
} from 'mint-ui';
import router from '../router'

const URL = 'https://cloud.zjbaitu.cn/repair-server/api';
// const URL = 'http://192.168.0.111:8080/api';

// 请求拦截器
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});
// 请求响应拦截器
axios.interceptors.response.use(response => {
  Indicator.close();
  if (!response.data.success) {
    MessageBox({
      title: '提示',
      message: response.data.msg,
    })
  }
  return response;
}, error => {
  Indicator.close();
  // 当状态码返回其他的时候
  MessageBox({
    title: '提示',
    message: error.response.data.msg,
  })
  // 当状态码返回400
  switch (error.response.status) {
    case 400:
      router.replace({
        name: "Login",
      })
      localStorage.removeItem('token')
      break;
  }
  return Promise.reject(error);
});

export default {
  post(url, params) {
    Indicator.open({
      text: '载入中...',
      spinnerType: 'fading-circle'
    });
    params['token'] = localStorage.getItem('token')
    return axios({
        method: 'POST',
        baseURL: URL,
        url: url,
        data: params,
        timeout: 10000,
        headers: {
          'X-Platform': 'H5',
        }
      })
      .then(res => {
        Indicator.close();
        return res.data;
      })
      .catch(error => {
        Indicator.close();
      })
  },
  get(url, params) {
    Indicator.open({
      text: '载入中...',
      spinnerType: 'fading-circle'
    });
    params['token'] = localStorage.getItem('token')
    return axios({
        method: 'GET',
        baseURL: URL,
        url: url,
        data: params,
        timeout: 10000,
        headers: {
          'x-Platform': 'H5'
        }
      })
      .then(res => {
        Indicator.close();
        return res.data;
      }).catch(err => {
        Indicator.close();
      });
  }
}
