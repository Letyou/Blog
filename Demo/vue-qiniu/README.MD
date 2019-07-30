# vue 对接七牛云上传图片实例

## 描述

- 考虑到 Input-type = file 的样式问题做了隐藏处理,相较于用定位做省了不少代码量
- 通过点击"上传"的图片 触发 triggerUpload 事件，用 triggerUpload 事件触发隐藏 input 的 uploadImg 事件
- 与此同时获取后台返回的七牛云 Token(因为每次上传都需要验证 token)

- 触发 uploadImg 事件以后，获取上传文件的数据流，因为一次只能上传一个，所以获取下标为[0]的流。
- 拿到后台返回的 token，获取数据流的文件名字。
- 声明一个 formData 对象，将数据流 = file，文件名 = key 七牛云 token = token
- 声明一个 axios 方法，发起 post 请求,现将 input[type=file]的 value 值清空，以免不能重复上传一张图
- 拼接自己域名的地址和七牛云返回的 key，绑定在 img:src 属性上就可以了。

## tips

- 域名拼接的话，就是例如 https://www.baidu.com.1.png; (因为目前七牛云需要绑定自己的域名才可以使用，用七牛云的域名，就需要收费。)
- 如果是数组的情况下，可能需要在代码中一样，进行 push 操作。
- X5 内核浏览器需要将 Input[file] accept 修改成 image/\*

## 勘误及提问

如果有疑问或者发现错误，可以在相应的 issues 进行提问或勘误。

如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。

## License

所有文章采用[知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/)进行许可。
