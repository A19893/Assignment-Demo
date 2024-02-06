const ShortUniqueId= require('short-unique-id');

export const checkValidaData = ( email, password) =>{
    const isEmailValid= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";
    return null;
}
export const generateShortUuid = () => {
    const uid = new ShortUniqueId({ length: 8, dictionary: "hex" });  
    return uid.rnd(); 
};

export const  showAlert= function(otp){
    alert(`Your otp is ${otp}`);
  }