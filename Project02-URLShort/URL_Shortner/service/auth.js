// const sessionIdToUserMap = new Map();

const {jwtSecret} = require('../../config/secrets');
const jwt = require('jsonwebtoken');

function setUser(user){
    return jwt.sign({

        _id: user._id,
        email: user.email,
        role: user.role,

    },jwtSecret);
}

function getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token,jwtSecret);
    } catch (error) {
        return null;
    }

}


// function setUser(sessionId,user){
//     sessionIdToUserMap.set(sessionId,user);
// }

// function getUser(sessionId){
//     return sessionIdToUserMap.get(sessionId);
// }

module.exports ={
    setUser,
    getUser,
}