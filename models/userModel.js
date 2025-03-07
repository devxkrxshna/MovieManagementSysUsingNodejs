const mongoose = require("mongoose");

//mongoose object for objectdata modelling
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, "please add user name"]
    },
    email:{
        type:String,
        required:[true,"please add the user email address"],
        unique:[true, "Email Address already taken"]
    },
    password:{
        type: String,
        required:[true,"please add the password"],
        
    }
},
{timestamps: true,});

module.exports = mongoose.model("User", userSchema);