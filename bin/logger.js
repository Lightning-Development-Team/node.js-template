const morgan = require('morgan')
const fs = require('fs')
const {join} = require("path")


function logger() {
    // 保存原始的 console.log() 方法
    const originalConsoleLog = console.log;
    // 创建输出日志文件
    const logFile = fs.createWriteStream(join("log/consoleOutput.log"), {flags: 'a'});

    // 重写 console.log() 方法
    console.log = (...args) => {

        const format = `${new Date().toLocaleString().replaceAll("/", "-")}: ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}\n`
        // 将输出写入日志文件
        logFile.write(format);

        // 调用原始的 console.log() 方法，以在控制台显示输出
        originalConsoleLog.apply(console, args);
    };

    const date = new Date().toLocaleDateString().replaceAll("/", "-")
    const file = "log/" + date + ".log"
    fs.access(file, fs.constants.F_OK, (errnoException) => {
        errnoException && fs.writeFile(file, 'hello', (error) => {
            if (error) throw new Error(file + "文件创建失败")
        })
    });

    // 创建http日志文件
    const accessLogStream = fs.createWriteStream(join(file), {flags: 'a'})

    // 自定义format
    morgan.format('combined', ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
    return morgan("combined", {
        stream: accessLogStream
    })

}



module.exports = logger
