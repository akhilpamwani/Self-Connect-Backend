const mongoose=require('mongoose');
require('dotenv').config({path:'../config.env'})
const connectToMongoose=()=>{
  mongoose.connect(
    
    process.env.MONGO_URL  )
  .then(async() => {
   await console.log("Connected to Database");
})
.catch(async(err) => {
    await console.log("Not Connected to Database ERROR! ", err);
});
}
mongoose.set('strictQuery', false);
module.exports=connectToMongoose