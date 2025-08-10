const fs = require('fs');

function logReqRes(filename){
    return (req,res,next)=>{
         fs.appendFile('./Project-01/log11.txt',`\n${Date.now()}: ${req.method}: ${req.path} \n`,
            (err,data)=>{
                next();
            }
        );
    };
}

module.exports = {
    logReqRes,
}