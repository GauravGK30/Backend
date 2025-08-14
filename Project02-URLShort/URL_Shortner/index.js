const express = require('express');

const path = require('path');
const {connectToMongoDB} = require("./connect");
const cookieParser = require("cookie-parser");
const URL = require('./models/url');
const { checkForAuthentication, restrictTo,} = require("./middleware/auth")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const app = express();
const PORT = 8001;

//connection
connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("mongodb connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cookieParser()); 
app.use(checkForAuthentication);


// app.get("/test",async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//         // name:
//     })
// });


app.use("/url",restrictTo(["NORMAL","ADMIN"]) ,urlRoute);
app.use("/user", userRoute);
app.use("/",staticRoute);

app.get('/url/:shortID',async(req,res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID
    },{$push:{
        visitHistory:{
            timestamp: Date.now(),
        },
    },
    },
    { new: true }
    );
    if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log(`Server started at ${PORT}`));