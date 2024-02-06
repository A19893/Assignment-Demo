const { user_model } = require("../models")
const jwt = require("jsonwebtoken");
exports.existing_session = async(req,res,next)=>{
    const {email}= req.body;
    let isActiveCount=0;
    try{
         const activeUser= await user_model.findOne({email:email})
         if(!activeUser) throw new Error("Email not found")
        const activeToken= activeUser.tokens.filter((item)=>{
            const verifyUser = jwt.decode(item.token);
            if (verifyUser.exp > Math.floor(Date.now() / 1000) && item.isActive) {
              isActiveCount++;
              return item;
            }
         })
        //  console.log(activeToken,isActiveCount)
         if(isActiveCount>=2){
           throw new Error("You are currently having 2 active sessions")
         }
         else{
           req.tokens= activeToken;
           next();
         }
    }
    catch(error){
        return res.status(400).json({ error:error.message });
    }
}