const http = require('http');
// const fs = require('fs');
// const url = require('url');

const express = require('express');
const app = express();

// app.Method(Path,HANDLER);    syntax
app.get('/',(req,res)=>{
    return res.send("hello from home page " );
})

app.get('/about',(req,res)=>{
    // return res.send("hello from about page" + "hii " + req.query.name);
    return res.send(`Hello ${req.query.name}`);
})

app.get('/Signup',(req,res)=>{
    return res.send("fill signup form");
})

app.listen(8002,()=>console.log("server started at 8002"));

// function myHandler(req,res){
    
//     if(req.url==='/favicon.ico') return res.end();

//     const log = ` ${Date.now()}: ${req.method} ${req.url} new request received\n `;
//     const myUrl = url.parse(req.url,true);

//     // console.log(myUrl);
    
//     fs.appendFile('./HTTP/log3.txt',log,(err,data)=>{

//         switch(myUrl.pathname){

//             case '/':
//                 if(req.method==="GET"){
//                     res.end("Home page");
//                 }
//                 break;
            
//             case '/about': 
//                 const username = myUrl.query.myName 
//                 res.end(`hi,${username}`);
//                 break;

//             case '/Signup':
//                 if(req.method==='GET'){ //get method
//                     res.end("signup form");
//                 } 
//                 else if(req.method==='POST'){//post method
//                     //DB 
//                     res.end("Success");
//                 }
//                 break;
//             default:
//                 res.end("404 not found");

//         }

//     })
// }

// const myServer = http.createServer(myHandler);


// const myServer = http.createServer(app);


// myServer.listen(8002, () => {console.log(" Server started ")});