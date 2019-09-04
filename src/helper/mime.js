const path = require('path')
const mimeTypes = {
    'css': 'text/css',
    'git': 'image/git',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpg': 'image/ipeg',
    'jpeg': 'image/ipeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'txt': 'text/plain',
    'xml': 'text/xml',
    'png': 'image/png',
    'pdf': 'application/pdf',
    'md': 'text/x-markdown'
}

module.exports = (filePath) => {
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase();
    if(!ext){
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt']
}