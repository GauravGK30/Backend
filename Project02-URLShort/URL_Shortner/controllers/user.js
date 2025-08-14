
// const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser,getUser} =require('../service/auth')


async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}


async function handleUserLogin(req,res){
    const {email,password} = req.body;

    const user = await User.findOne({
        email,
        password,
    });

    if(!user){
        return res.render("login",{
            error: "Invalid username or password",
        })
    }

    // const sessionId = uuidv4();
    // setUser(sessionId,user);

    const token = setUser(user)
    res.cookie("token", token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    return res.redirect("/");
    // return res.json({token});

}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}