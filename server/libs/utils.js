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
