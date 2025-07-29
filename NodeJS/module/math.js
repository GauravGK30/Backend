function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}

// module.exports = add;
module.exports = {
    addFn :add,
    subFn :sub,
}

// exports.add = (a,b)=>a+b;
// exports.sub = (a,b)=>a-b;



//if many functions   module.export={}