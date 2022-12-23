const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const auth=Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    timespamns:{
        type:Date,
        default:Date.now,

    },
    
})
const AuthModel=mongoose.model("auth",auth);
module.exports=AuthModel