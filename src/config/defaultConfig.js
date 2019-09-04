module.exports = {
    root: process.cwd(),
    hostName: '127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600, // 缓存有效时间
        expires: true, // 绝对时间
        cacheControl: true, // 相对时间
        lastModified: true, // 新的修改时间
        etag: true // 校验方式
    }
}