const { log } = require('console');
const fs = require('fs');


//sync
fs.writeFileSync('./test.txt',"hii GK");

//async
fs.writeFile('./test.txt',"Hello World",(err)=>{});

//sync
const result = fs.readFileSync('./contact.txt','utf-8');
console.log(result);

//async --->callback function needed
fs.readFile('./contact.txt','utf-8',(err,result)=>{
    if(err){
        console.log("error",err);
        
    }else{
        console.log(result);
    }

})

//sync
fs.appendFileSync('./test.txt'," HII gaurav \n")


//copy
fs.cpSync('./test.txt',"./Copy.txt");


//delete
fs.unlinkSync('./Copy.txt');

//stats
console.log(fs.statSync("./test.txt"));


//make directory
fs.mkdirSync('myDocs/a/abcd.txt',{recursive: true});

fs.rmdirSync('./myDocs',{recursive:true});
// The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.