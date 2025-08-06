const express = require('express')

let users = require('./MOCK_DATA.json');
const fs = require('fs');
const app= express();
const PORT = 8000;

//middleware plugin
app.use(express.json());
// app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("hello from middleware 1 ");
    req.myUserName = "gauravgk" ;
    // return res.json({msg: "hello from middleware 1 "});
    next();
})


app.use((req,res,next)=>{
    fs.appendFile('./Project-01/log11.txt',`${Date.now()}: ${req.method}: ${req.path} \n`,
    (err,data)=>{
        next();
    }
    );
    console.log("hello from middleware 2 ",req.myUserName); 
    // return res.end("heyy bro");
    // next();   //to go for next middleware
})

//html 
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
    </ul>
    `

    res.send(html);
})

//Routes
//rest api
app.get('/api/users',(req,res)=>{
    res.setHeader("x-MyName","gaurav gk");
    //always add x to custom header
    // console.log(req.headers);
    return res.json(users);
})


app.post('/api/users',(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle){
        return res.status(400).json({msg: "all feild required"});
    }
    console.log("Body:",body);
    users.push({...body, id:`${users.length+13}`});
    try {
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users));
        res.status(201).json({ status: "success" });
    } catch (err) {
        console.error("File write error:", err);
        res.status(500).json({ status: "error", message: "Could not write to file" });
    }

});


///api/users/:id
app.get('/api/users/:id',(req,res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
})


app.route('/api/users/:id')
.get(
    (req,res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
})
.patch((req,res)=>{

    const id = req.params.id;
    const updatedFields = req.body;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    users[userIndex] = { ...users[userIndex], ...updatedFields };

    try {
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
        res.json({ status: "success", user: users[userIndex] });
    } catch (err) {
        console.error("File write error:", err);
        res.status(500).json({ status: "error", message: "Could not write to file" });
    }

})
.delete((req,res)=>{
    const id = req.params.id;
    const updatedUsers = users.filter(user => user.id !== id);

    if (updatedUsers.length === users.length) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    try {
        users = updatedUsers; 
        fs.writeFileSync('.MOCK_DATA.json', JSON.stringify(users, null, 2));
        res.json({ status: "success", message: `User ${id} deleted` });
    } catch (err) {
        console.error("File write error:", err);
        res.status(500).json({ status: "error", message: "Could not write to file" });
    }
})



// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status: "pending"});
// })
// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status: "pending"});
// })

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`))