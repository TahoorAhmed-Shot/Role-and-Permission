
const express=require("express")
const app=express()
const router = express.Router()
const User=require("../models/user")
const CryptoJS = require("crypto-js");
const SECRET_KEY="#####%%%%12345"
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");





// SIGN UP API 
router.post("/signup",[
    body('name',"min length require 2").isLength({min:2}),
    body('email',"Invalid email").isEmail(),
    body('password',"min length require 6").isLength({min:6})
],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //   CREATE DATABAS
    try{     
       const {name,email,password}=req.body
       let user = new User({
           name,
           email,
           password:  CryptoJS.AES.encrypt(password, SECRET_KEY).toString()
           
          })
          await user.save()


          let data={
            user:{
                id:user.id
            }
          }
          const token = jwt.sign(data, process.env.PRIVET_KEY);
          res.status(200).json({ "authentication":token})
    }catch(err){
        console.log(err);
    }
})


// LOGIN API
router.post("/login",[ 
    body('email',"Invalid email").isEmail(),
    body('password',"min length require 6").isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   

    try{

        const {email}=req.body
        let user=await User.findOne({email})
        const bytes  = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
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
           
           res.status(200).json({user:user})           
    }catch(err){
        console.log(err);
    }
   


     

})




module.exports=router