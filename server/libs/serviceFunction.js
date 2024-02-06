const { user_model } = require("../models");
const { generateAuthToken, modified_response } = require("./utils");

exports.waitUntilTimeoutCompletes = async(email,res,otp,expires)=>{
    const response= await new Promise((resolve, reject) => {
        setTimeout(async () => {
            const updated_user = await user_model.findOne({ email: email });
            if (updated_user.otp == otp) {
              const token = generateAuthToken(updated_user, expires);
              updated_user.tokens.push({ token: token });
              await updated_user.save();
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + expires),
                httpOnly: true,
              });
              console.log("Function execution completed");
              const modified_user = await modified_response(user_model, token);
              resolve(modified_user);
            } else {
              console.log("Function execution rejected");
              reject(new Error("You are an unauthenticated user!!"));
            }
        }, 2 * 60 * 1000);
      });
      return response;
}