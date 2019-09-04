// 压缩方法
const {
    createGzip,
    createDeflate
} = require('zlib')
module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding']; // 获取浏览器支持的压缩方式
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { // 判断是哪种压缩方式
        return rs;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        return rs.pipe(createGzip());
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return rs.pipe(createDeflate());
    }
};