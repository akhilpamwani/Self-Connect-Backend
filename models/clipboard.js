const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const clipboard=Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    copiedmaal:{
        type:String,
        required:true,
    },timespamns:{
        type:Date,
        default:Date.now,

    },
    
})
const ClipboardModel=mongoose.model("clipboard",clipboard);
module.exports=ClipboardModel