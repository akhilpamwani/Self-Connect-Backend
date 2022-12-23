const express= require('express');
const router= express.Router();
const fetchuser=require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');
const NotesModel=require('../models/notes')

router.get('/viewnotes',fetchuser,async (req,res) =>{
   try {
    const Notes= await NotesModel.find({user:req.user.id});
    res.json({Notes})
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
});



router.post('/createnotes',[
    body('title',"Your Title must be more than three letters or Please fill the input field").isLength({ min: 3 }),
body('description',"Your Description must be more than twenty letters and check the input field again !").isLength({ min: 20 }),
body('tags',"Your Password wih more than 5 Leter").isLength({ min: 5 }),

body('title',"Title field is empty !").exists(),
body('description',"Description field is empty !").exists(),

],fetchuser,async ( req,res)=>{
    try {
        
        const {title,description,tags} =req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const savedNote=NotesModel.create({
            title,description,tags,user:req.user.id,
        })
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }

}
)

module.exports=router