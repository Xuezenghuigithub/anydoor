module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    if (!range) { // 请求中没有设置范围则直接返回
        return {
            code: 200
        };
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/); // 范围为bytes=xxx-xxx的格式
    // match匹配到的结果sizes为一个数组，长度为3，第一个为匹配到的内容，第二个为第一个分组，第三个为第二个分组
    const end = sizes[2] || totalSize - 1;
    const start = sizes[1] || totalSize - end;

    if (start > end || start < 0 || end > totalSize) { // 非法条件
        return {
            code: 200
        }
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length', end - start)
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}