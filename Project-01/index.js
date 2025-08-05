const express = require('express')

let users = require('./MOCK_DATA.json');
const fs = require('fs');
const app= express();
const PORT = 8000;

//middleware plugin
app.use(express.json());
app.use(express.urlencoded({extended:false}))

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
    return res.json(users);
})


app.post('/api/users',(req,res)=>{
    const body = req.body;
    console.log("Body:",body);
    users.push({...body, id:`${users.length+13}`});
    try {
        fs.writeFileSync('./Project-01/MOCK_DATA.json', JSON.stringify(users));
        res.json({ status: "success" });
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
        fs.writeFileSync('./Project-01/MOCK_DATA.json', JSON.stringify(users, null, 2));
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
        fs.writeFileSync('./Project-01/MOCK_DATA.json', JSON.stringify(users, null, 2));
        res.json({ status: "success", message: `User ${userId} deleted` });
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