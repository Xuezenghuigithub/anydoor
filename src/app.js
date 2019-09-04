const http = require('http');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const open = require('./helper/openURL');

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config); // 合并用户配置和默认配置
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url); // 拿到文件夹的路径
            route(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostName, () => {
            const addr = `http://${this.conf.hostName}:${this.conf.port}`;
            console.info(addr);
            open(addr);
        });
    }
}

module.exports = Server;