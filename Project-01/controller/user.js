const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbusers = await User.find({});
    return res.json(allDbusers);
} 

async function handleGetUserbyID(req,res){
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
} 

async function handleUpdateUserbyID(req,res){
    const id = req.params.id;
    const updatedFields = req.body;
    const userIndex = await User.findByIdAndUpdate(req.params.id,{last_name:"pinkman"});

    if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    User[userIndex] = { ...User[userIndex], ...updatedFields };
    return res.json({staus: "success"});
} 

async function handleDeleteUserbyID(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({staus:"SUCCESS"});
}

async function handleCreateNewUser(req,res){
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle){
        return res.status(400).json({msg: "all feild required"});
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
    })
    // console.log("Body:",body);
    console.log(result);
    return res.status(201).json({msg: "success", id: result._id});
    
}

module.exports = {
    handleGetAllUsers,
    handleGetUserbyID,
    handleUpdateUserbyID,
    handleDeleteUserbyID,
    handleCreateNewUser,
    
};