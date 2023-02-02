const jwt=require("jsonwebtoken")


const fetchuser=async(req,res,next)=>{
  
    let token=req.header("auth-token")
    try{
        if(!token){
            res.status(404).json({"token":"plz enter valid token"})
        }
        // verify a token symmetric
       let data= jwt.verify(token, process.env.PRIVET_KEY)
       req.user=data.user
       next()
       console.log("user verify")

    }
    catch(err){
        console.log(err);
    }
  
}

module.exports=fetchuser