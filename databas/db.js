
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db=async()=> {
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/Api');
        console.log("connected");
    }catch(err){
      console.log(err);
    }
    

  }

  module.exports=db