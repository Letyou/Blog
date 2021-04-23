# 内存溢出问题

设备

- MacBook Pro (13-inch, M1, 2020)
- 系统：macOS Big Sur 11.1 版本
- node 版本：14.16.1
- npm 版本：6.14.12

基于 create-react-app 项目生成的项目，npm run dev 后 显示报错

<p style="color:red;font-weight:600;">FATAL ERROR: wasm code commit Allocation failed - process out of memory</p>

# 尝试过方式

1. package.json script 编译内存增加 `react-script --max_old_space_size=4096`
2. 环境变量配置编译内存增加 `export NODE_OPTIONS=--max_old_space_size=4096`
3. 升级 node 版本 15.3 以上
4. 重新安装 node 版本，替换 node 运行节点
   > $ nvm uninstall 14
   > $ arch -x86_64 zsh
   > $ nvm install 14
   > $ nvm alias default 14

因为依赖项需要 14 版本，故而不做升级，在我的设备上，使用第四点的方法，可以解决这个问题，增加内存尝试过，没有效果。

# 参考链接

- [stackoverflow](https://stackoverflow.com/questions/65856300/wasm-code-commit-allocation-failed-process-out-of-memory)
