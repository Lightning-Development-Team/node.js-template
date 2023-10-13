# node.js-template

包含express和nodemon和axios，跨域配置http配置自定义日志配置

### 使用:

推荐将此模板以下载方式下载到本地，而不是克隆！  

[下载模板](https://github.com/Lightning-Development-team/node.js-template/archive/refs/heads/main.zip)  

然后

```shell
npm i
```

### 目录:

```
/bin
存放模块

/log
日志文件

/wwwroot
静态资源根目录

/app.js
入口文件
```

### 运行:

生产环境

```shell
node app.js
```

```shell
npm run start
```

开发环境

```shell
nodemon babel-node ./app.js
```

```shell
npm run serve
```
