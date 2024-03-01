const jwt = require("jsonwebtoken");
const { user_model } = require("../models");
const auth_checker = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedUser = jwt.decode(token);
    if(token){ 
      if (decodedUser.exp < Math.floor(Date.now() / 1000)) {
      await user_model.findOneAndUpdate(
        {
          _id: decodedUser.userId,
          tokens: { $elemMatch: { token: token } },
        },
        { $set: { "tokens.$.isActive": false } },
        { new: true }
      );
      throw new Error();
    }
  }
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await user_model.findOne({ _id: verifyUser.userId });
    const userToken = user.tokens.filter((item) => item.token === token);
    if (!userToken[0].isActive) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unauthorized User", error });
  }
};

module.exports = auth_checker;
