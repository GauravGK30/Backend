const express = require('express')
const fs = require('fs');
const {logReqRes} = require("./middleware");
const {connectMongoDB} = require("./connection");
const userRouter = require("./routes/user");

const app= express();
const PORT = 8000;

//connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>{
    console.log("mongoDB connected")
});

//middleware plugin
app.use(express.json());
app.use(logReqRes("log11.txt"));

//router
app.use("/api/users",userRouter);

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`))