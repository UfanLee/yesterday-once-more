const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 默认提供neon-drowning.html
    let filePath = req.url === '/' ? './neon-drowning.html' : '.' + req.url;
    
    // 获取文件扩展名
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    // 设置不同文件类型的Content-Type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.webm':
            contentType = 'video/webm';
            break;
        case '.ogg':
            contentType = 'video/ogg';
            break;
    }
    
    // 处理视频文件的特殊情况
    if (extname === '.mp4' || extname === '.webm' || extname === '.ogg') {
        // 检查文件是否存在
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404);
                res.end(`File not found: ${filePath}`);
                return;
            }
            
            // 设置范围请求的头信息
            const fileSize = stats.size;
            const range = req.headers.range;
            
            if (range) {
                // 解析范围请求
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;
                
                // 创建文件流
                const file = fs.createReadStream(filePath, { start, end });
                
                // 设置响应头
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': contentType
                });
                
                // 流式传输文件
                file.pipe(res);
            } else {
                // 整个文件的响应头
                res.writeHead(200, {
                    'Content-Length': fileSize,
                    'Content-Type': contentType
                });
                
                // 流式传输整个文件
                fs.createReadStream(filePath).pipe(res);
            }
        });
    } else {
        // 对于非视频文件，使用原来的方法
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // 页面不存在
                    fs.readFile('./404.html', (err, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    // 服务器错误
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                // 成功响应
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
