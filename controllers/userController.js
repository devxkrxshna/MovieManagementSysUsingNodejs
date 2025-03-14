const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Userdb = require("../models/userModel");


 //@description: Register a user
 //@route POST /api/users/register
 // @access public
 const registerUser = asyncHandler(async(req,res)=>{ //async is used because mongo db returns a promise
    const {username,email,password}= req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }

    const userAvailable = await Userdb.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed password",hashedPassword);
    const user= await Userdb.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.status(200).json({message:"Register the user"});
});

 //@description: Register a user
 //@route POST /api/users/login
 // @access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email,!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await Userdb.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id: user.id,
        },
            

            },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1m"}
        
        );
            res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("password not valid");

    }

});
 //@description: Register a user
 //@route GET /api/users/current
 // @access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser}