const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars'); // 引入模板引擎
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const config = require('../config/defaultConfig'); //读不到用户输入的配置
const mime = require('./mime'); // 引入判断消息内容类型
const compress = require('./compress'); // 引入处理压缩文件
const range = require('./range'); // 引入范围处理函数
const isFresh = require('./cache'); // 引入缓存处理

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) { // 如果是文件类型
            const contentType = mime(filePath)
            res.setHeader('Content-Type', contentType);
            
            // if (isFresh(stats, req, res)) { // 如果缓存可用
            //     res.statusCode = 304;
            //     res.end();
            //     return;
            // }
            
            let rs;
            const {
                code,
                start,
                end
            } = range(stats.size, req, res); // 拿到range.js中的返回值
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            } else {
                res.statusCode = 206;
                rs = fs.createReadStream(filePath, {
                    start,
                    end
                })
            }
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res); // 拿到文件内容
        } else if (stats.isDirectory()) { // 如果是个文件夹
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath); //取一个路径相对于另一个路径的相对路径地址
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            }
            res.end(template(data));
        }
    } catch (ex) {
        console.log(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directortory or file!\n ${ex}`)
    }
}