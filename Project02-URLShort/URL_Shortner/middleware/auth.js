const {getUser} = require("../URL_Shortner/service/auth")

function checkForAuthentication(req,res,next){
        // const authorizationHeaderValue = req.header("Authorization");
        const tokenCookie = req.cookies?.token;
        req.user = null;

        if(!tokenCookie){
            return next();
        }

        const token = tokenCookie
        const user = getUser(token);

        req.user = user;
        return next()
}


function restrictTo(roles){
    return function(req,res,next){
        if(!req.user){
            return res.redirect("/login");
        }
        if(!roles.includes(req.user.role)){
            return res.end("Unauthorized");
        }

        return next();
    }
}

// async function restrictToLoggedinUserOnly(req,res,next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.header("Authorization");

//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split('Bearer ')[1];
//     // const user = getUser(userUid);
//     const user = getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.get("Authorization");

//     if (!userUid || !userUid.startsWith("Bearer ")) {
//         req.user = null;
//         return next();
//     }

//     const token = userUid.split('Bearer ')[1];
//     // const user = getUser(userUid);
//     const user = getUser(token);
    
//     req.user = user || null;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
    // restrictToLoggedinUserOnly,
    // checkAuth,
}