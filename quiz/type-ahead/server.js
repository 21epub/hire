let fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许跨域
})

server.on('request', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.end(err)
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
            return
        }
        res.writeHead(500);
        res.end('500 server error...');
    })
});

// 在端口 3001 监听:
const listener = server.listen(3001, () => {
    console.log(`server started at port 3001...`)
})