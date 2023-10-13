const express = require("express")
const {join} = require("path")
const history = require('connect-history-api-fallback')
const cors = require("cors")
const logger = require("./bin/logger");

const app = express()
const port = 8000
const json = express.json({"limit": "300kb"}) // 创建一个用于解析 JSON 请求体的中间件，限制请求体大小不超过 300kb
const resource = express.static(join(__dirname, "wwwroot")) // 创建一个用于提供静态资源的中间件，指定资源目录为当前文件所在目录下的 "wwwroot" 目录

// 使用中间件
app.use(json, resource, history(), cors(), logger()) // 注册中间件到 Express 应用程序，依次为 JSON 请求体解析中间件、静态资源中间件、前端路由中间件、日志中间件

// 任何请求都将先走这里
app.all("*", (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*") // 允许任何来源的跨域请求
    response.header("Access-Control-Allow-Headers", "Content-Type") // 允许 "Content-Type" 请求头
    response.header("Access-Control-Allow-Methods", "*") // 允许所有的 HTTP 方法logger.js
    response.header("Content-Type", "application/jsoncharset=utf-8") // 设置响应的内容类型为 JSON
    next()
})

// 解析post
app.post("/api/login", (request, response, next) => {
    // todo
    next()
})


// 解析get
app.get("/login", (request, response, next) => {
    // todo
    next()
})


// 启动 Express 应用程序，监听指定的端口号
app.listen(port, undefined, () => {
    console.log("\n");
    console.log("----------------------START----------------------");
    console.log("\n");
    console.log(`Service listening on port ${port}`)
})
