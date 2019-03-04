# vue对接七牛云上传图片实例

## 描述
- 考虑到Input-type = file的样式问题做了隐藏处理,相较于用定位做省了不少代码量
- 通过点击"上传"的图片 触发triggerUpload事件，用triggerUpload事件触发隐藏input的uploadImg事件
- 与此同时获取后台返回的七牛云Token(因为每次上传都需要验证token)

- 触发uploadImg事件以后，获取上传文件的数据流，因为一次只能上传一个，所以获取下标为[0]的流。
- 拿到后台返回的token，获取数据流的文件名字。
- 声明一个formData对象，将数据流 = file，文件名 = key 七牛云token = token
- 声明一个axios方法，发起post请求,现将input[type=file]的value值清空，以免不能重复上传一张图
- 拼接自己域名的地址和七牛云返回的key，绑定在img:src属性上就可以了。

## tips
- 域名拼接的话，就是例如 https://www.baidu.com.1.png; (因为目前七牛云需要绑定自己的域名才可以使用，用七牛云的域名，就需要收费。)
- 如果是数组的情况下，可能需要在代码中一样，进行push操作。
- X5内核浏览器需要将Input[file] accept修改成 image/*