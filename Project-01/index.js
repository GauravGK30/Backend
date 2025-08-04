const express = require('express')

const users = require('./MOCK_DATA.json');

const app= express();
const PORT = 8000;

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
    return res.json({status: "pending"});
})
.delete((req,res)=>{
    return res.json({status: "pending"});
})



// app.post('/api/users',(req,res)=>{
//     return res.json({status: "pending"});
// })
// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status: "pending"});
// })
// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status: "pending"});
// })

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`))