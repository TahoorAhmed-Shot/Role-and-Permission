
const express=require("express")
const app=express()
const router = express.Router()
const User=require("../models/user")
const CryptoJS = require("crypto-js");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");





// SIGN UP API 
router.post("/signup",[
    // body('name',"min length require 2").isLength({min:2}),
    // body('email',"Invalid email").isEmail(),
    // body('password',"min length require 6").isLength({min:6})
],async(req,res)=>{

 


    //   CREATE DATABAS
    try{     
       const {name,email,password}=req.body
       let user = new User({
           name,
           email,
           password:  CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString()
           
          })
      let userdata=    await user.save()
 console.log(userdata);

          let data={
            user:{
                id:user.id
            }
          }
          const token = jwt.sign(data, process.env.PRIVET_KEY);
          res.status(200).json({user:userdata.name ,userEmail:userdata.email, "authentication":token})
    }catch(err){
        console.log(err);
    }
})


// LOGIN API
router.post("/login",async(req,res)=>{
   

    try{

        const {email}=req.body
        let user=await User.findOne({email})
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(user){      
            if(req.body.email == user.email && req.body.password == userPassword){

                let data={
                    user:{
                        id:user.id
                    }
                  }
                  const token = jwt.sign(data,process.env.PRIVET_KEY);
                  res.status(200).json({user:user,"auth":token})

            }else{
                res.status(404).json({user:"Invalid Credentials"})
            }

        }else{
          res.status(404).json({user:"Invalid User"})
        }

    }catch(err){
        console.log(err);
    }
})



// GET USER API

router.post("/getUser/:id",fetchuser,async(req,res)=>{

    try{

        let user = await User.findById(req.params.id).select("-password")
        if (!user) {
            return  res.status(404).send("Not found")
           }
           
           res.status(200).json({user:user.email,userEmail:user.name})           
    }catch(err){
        console.log(err);
    }
   


     

})




module.exports=router