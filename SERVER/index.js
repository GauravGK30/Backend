const http = require('http');
const fs = require('fs');
const url = require('url');


//always use non blocking request
const myServer = http.createServer((req,res)=>{
    // console.log(req.headers);

    if(req.url==='/favicon.ico') return res.end();

    const log = ` ${Date.now()}: ${req.url} new request received\n `;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':
                res.end("Home page");
                break;
            case '/about': 
                const username = myUrl.query.myName 
                res.end(`hi,${username}`);
                // res.end("Hii i am GK");
                break;

            default:
                res.end("404 not found");

        }
        // res.end("Hello From server again");
    })
    // res.end("Hello From server again");
});


myServer.listen(8000, () => {console.log(" Server started ")});