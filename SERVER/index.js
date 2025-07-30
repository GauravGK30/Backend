const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req,res)=>{
    // console.log(req.headers);

    const log = ` ${Date.now()}: ${req.url} new request received\n `;
    
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(req.url){
            case '/':
                res.end("Home page");
                break;
            case '/about': 
                res.end("Hii i am GK");
                break;

            default:
                res.end("404 not found");

        }
        // res.end("Hello From server again");
    })
    // res.end("Hello From server again");
});


myServer.listen(8000, () => {console.log(" Server started ")});