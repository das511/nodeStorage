const http = require('http')
const fs = require('fs')
const port = 3000
const url = require('url')


const server = http.createServer((req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept,, cache-control');
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathName = url.parse(req.url,true).pathname;
    const splitter = pathName.split('/');
    if(splitter.length === 3 && splitter[0] === '' && splitter[1] === 'set') {
        fs.writeFile("nodeStorage.json", JSON.stringify({thumbprint: splitter[2]}), (error)=>{
        if(error) throw(error) });
        res.end(JSON.stringify({state: "writted", value: splitter[2]})) 
    }
    else if(splitter.length === 2 && splitter[0] === '' && splitter[1] === 'get'){
        fs.readFile("nodeStorage.json", "utf8", (error,data) => {
            if(error) throw error;
            res.end(JSON.stringify(data))
        })
    }
    else res.end(JSON.stringify({error: "no url"})) 
}).listen(port);







