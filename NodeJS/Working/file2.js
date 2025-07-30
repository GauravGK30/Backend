const fs = require('fs');
const os = require('os');

//sync...Blocking request
fs.writeFileSync('./test2.txt',"hello world");

//async... Non-Blocking request
fs.writeFile('.test2.txt',"hello world async ",(err)=>{});

//blocking  1-->contact.txt-->2

console.log("1");

const result = fs.readFileSync('./contact.txt',"utf-8");
console.log(result);

console.log("2");



// Non Blocking  --> 1 ---> 2 --> contact.txt

console.log("1");

fs.readFile('./contact.txt',"utf-8",(err,result)=>{
    console.log(result);
});

console.log("2");


//by default thread pool size=4
//max-->16 core cpu= 16 threads

console.log(os.cpus().length);
