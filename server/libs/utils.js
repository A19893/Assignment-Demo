const ShortUniqueId= require('short-unique-id');
const jwt = require('jsonwebtoken');
exports.generateShortUuid = () => {
    const uid = new ShortUniqueId({ length: 8, dictionary: "hex" });  
    return uid.rnd(); 
};

exports.generateAuthToken= function(user,expires){
const token = jwt.sign({userId:user._id,email:user.email},process.env.SECRET_KEY,{
    expiresIn:`${expires}ms`,
})
return token
}

exports.generateOtp= function(){
    const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        OTP += charset[randomIndex];
    }
    return OTP;
}


exports.modified_response= async(model,token)=>{
    const modifed_user= await model.aggregate([
        {
          $match: {
            "tokens.token": token
          }
        },
        {
          $project: {
            username:1,
            email:1,
            password:1,
            uuid:1,
            tokens: {
              $filter: {
                input: "$tokens",
                as: "token",
                cond: { $eq: ["$$token.token",token] }
              }
            }
          }
        }
      ])

      return modifed_user[0]
}