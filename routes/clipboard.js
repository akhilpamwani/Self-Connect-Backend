const express= require('express');
const router= express.Router();
const ClipboardModel=require('../models/clipboard')
// const { body, validationResult } = require('express-validator');
const fetchUser=require('../middlewares/fetchuser')
router.post('/createclipboard',[
   
],fetchUser, async (req,res) =>{


    try {
        
        const {copiedmaal} =req.body;
      
       const savedClipboard=await  ClipboardModel.create({
            copiedmaal
        })
      return  res.json({ data:savedClipboard})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }
})

router.get('/getclipboard',fetchUser,async (req,res) =>{
    try {
     const Notes= await ClipboardModel.find({user:req.user.id});
     res.json({Notes})
    } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
    }
 });

module.exports=router