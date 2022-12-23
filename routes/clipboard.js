const express= require('express');
const router= express.Router();
const ClipboardModel=require('../models/clipboard')
const { body, validationResult } = require('express-validator');
const fetchUser=require('../middlewares/fetchuser')
router.post('/createclipboard',[
    body('copiedmaal',"Your Copied text must be more than three letters or Please fill the input field").isLength({ max: 3000 }),


],async (req,res) =>{


    try {
        
        const {copiedmaal} =req.body;
         const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       const savedClipboard=await  ClipboardModel.create({
            copiedmaal:copiedmaal
        })
      return  res.json({ data:savedClipboard})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }
})

router.get('/getclipboard', (req,res) =>{
    
    ClipboardModel.find({}, (err,result)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    });
    });
    
  
    
 ;

module.exports=router