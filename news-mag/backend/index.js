const port =5001;
const express = require("express");
const app =express();
const mongoose = require("mongoose");
const jwt =require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Nikita:Nikita@cluster0.eg3bszk.mongodb.net/news platform");


app.get("/",(req,res)=>{
res.send("Express App is running")
})


// Schema creating for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating  endpoint for register the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email Id"})
    }

    let cart ={};
    for (let i = 0;i < 300; i++) {
        cart[i]=0;  
    }
    const user = new Users({
       name:req.body.username, 
       email:req.body.email,
       password:req.body.password,
       cartData:cart,
    })
    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token =jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

//cretaing endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token =jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"wrong email id"});
    }
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port"+port)
    }
    else{
        console.log("Error:"+error)
    }
})