const express= require('express');
const AuthModel = require('../models/auth');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middlewares/fetchuser');
const Jwt_Secret=process.env.Jwt_Secret;


router.post('/createuser',async (req,res) =>{
    try {
        
       
    
    const User=await AuthModel.findOne({email:req.body.email});
    const SALT= await bcrypt.genSalt(10);
    const genpass=await bcrypt.hash(req.body.password,SALT);

    if (!User) {
      
    
       const user= new AuthModel({
          name: req.body.name,
          email:req.body.email,
          password: genpass,
        }); 
       await user.save()
        const data={
            user:{
                id:user.id
            }
        }
        const AuthToken= jwt.sign(data,Jwt_Secret);

    return   await res.send({message:"User Registered Successfully ",data:AuthToken})
    }  
   
       
    if (User) {
        return await res.send({message:"Sorry! user already exist with this email "});
    }
    } 
    catch (error) {
       console.log(error) 
    }
}
);

router.post('/login',[

body('email',"Your Email must be Unique and check the input field again !").isEmail(),
body('email',"Email field is empty!").exists(),

body('password',"Password field is empty! ").exists(),
],
async (req,res) =>{
    try {
      
        const User=await AuthModel.findOne({email:req.body.email});

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });


        }

    
        if (!User) {
          success=false
         res.json({Message:"Please type right credentials"});   
}
if (User) {
const passwordCompare= await bcrypt.compare(req.body.password,User.password);
if (!passwordCompare) {
    res.json({Message:"Please type right credentials"}); 
}
       const data={
            User:{
                id:User.id
            }
        }
        
        const AuthToken= await jwt.sign(data,Jwt_Secret);
        return   await res.json({message:"User Logined Successfully ",data:AuthToken})
    
}
}
    catch (error) {
        console.log(error) 
     }
}
)

router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      id= req.user.id;
      const user = await AuthModel.findById(id).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports=router