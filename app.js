const express = require("express")
const {join} = require("path")
const cors = require("cors")
const logger = require("./bin/logger");
const axios = require("axios");

const app = express()
const port = 8000

// 创建一个用于解析 JSON 请求体的中间件，限制请求体大小不超过 300kb
const json = express.json({"limit": "300kb"})

// 创建一个用于提供静态资源的中间件，指定资源目录为当前文件所在目录下的 "wwwroot" 目录
const resource = express.static(join(__dirname, "wwwroot"))

// 使用中间件
// Express.use,get,post等都是按定义的顺序以异步执行的
// 依次为 JSON 请求体解析中间件、静态资源中间件、日志中间件、跨域中间件
app.use(json, resource, logger(), cors())

// 处理post
app.post("/hello", (request, response, next) => {
    // todo
    response.send({
        message: "hello"
    })
})

// 处理get
// 如果你只单纯搭建web后端服务器, 一般不会用到Express.get
app.get("/", async (request, response, next) => {
    // todo
    // 如果你想在服务器发起http请求, 一般使用Axios
    response.send((await axios.get("https://nano71.com/error")).data)
})

// 如果前面的use,get或者post都没命中的, 或调用了next()的, 会到这里
app.use((request, response, next) => {
    // todo
    console.log(404);

    // 如果后面还定义有处理程序, 你可以继续后续处理
    next()

    // 也可以到此为止, 即本次处理流程走完了
    response.send(`<pre>Cannot GET ${request.path}</pre>`)
});

// 启动 Express应用程序, 监听指定的端口号
app.listen(port, undefined, () => {
    console.log("\n");
    console.log("----------------------START----------------------\n");
    console.log(`Service listening on port ${port}`)
})
