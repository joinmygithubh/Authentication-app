const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const authMiddleware = require("./authMiddleware");

const app = express();
app.use(express.json())
app.use(cors())

const SECRET = "masai-secret";

let blacklist = [];

const user = {
    username : "admin",
    password : " admin123"
};

app.post("/api/login", (req, res)=>{
    const {username, password} = req.body;

    if(username !== user.username || password !== user.password){
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({username}, SECRET, {expiresIn: "1h"});

    res.json({
        token,
        loginTime : new Date()
    })
})



app.get("/api/profile", authMiddleware, (req, res)=>{
    res.status(200).json({
        username : req.user.username,
        message : "welcome to dashboard",
        loginTime : req.user.iat
    })
})

app.post("/api/logout", (req, res)=>{
    const token = req.headers.authorization?.split(" ")[1];

    blacklist.push(token);

    res.json({
        message: "Logged out successfully"
    })
})

app.listen(3000, ()=>{
    console.log("server running on port 3000");
})