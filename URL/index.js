const http = require('http');
const url = require('url');
const fs = require('fs');
const { log } = require('console');


const newServer= http.createServer((req,res)=>{
    if(req.url==='/favicon.ico') return res.end();

    const log = `${Date.now()}: ${req.url} new request \n`;
    const newUrl = url.parse(req.url,true);

    fs.appendFile('./URL/log2.txt',log,(err,data)=>{
        switch(newUrl.pathname){
            case '/':
                res.end("Home page");
                break;

            case '/about': 
                const username = newUrl.query.myName 
                res.end(`hi,${username}`);

                break;

            default:
                res.end("404 not found");

        }
    })
})

newServer.listen(8001,()=>{console.log("new server")});