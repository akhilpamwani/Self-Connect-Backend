const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Contact=Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    subject:{
        type:String,
        required:true,
    },
    detail:{
        type:String,
        required:true,
    },
    timespamns:{
        type:Date,
        default:Date.now,

    },
    
})
const ContactModel=mongoose.model("Contact",Contact);
module.exports=ContactModel