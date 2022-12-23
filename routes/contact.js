const express= require('express');
const router= express.Router();

const { body, validationResult } = require('express-validator');
const ContactModel = require('../models/contact');

router.post('/contact',[
    body('name',"Your Name must be more than three letters or Please fill the input field").isLength({ min: 3 }),
body('detail',"Your Detail must be more than twenty letters and check the input field again !").isLength({ min: 2 }),
body('subject',"Your Password wih more than 5 Leter").isLength({ min: 5 }),
body('email',"Your Email must be Unique and check the input field again !").isEmail(),
body('name',"Name field is empty !").exists(),
body('subject',"Subject field is empty !").exists(),
body('detail',"Description field is empty !").exists(),
body('email',"Email field is empty !").exists(),

],async ( req,res)=>{
    try {
        
        const {name,email,subject,detail} =req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       const savedContact=await  ContactModel.create({
            name,subject,detail,email
        })
      return  res.json({ data:savedContact})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }

}
)
module.exports=router