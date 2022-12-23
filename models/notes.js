const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const notes=Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    tags:{
        type:String,
        default:"General"
    },
    timespamns:{
        type:Date,
        default:Date.now,

    },
    
})

const NotesModel=mongoose.model("note",notes);
module.exports=NotesModel