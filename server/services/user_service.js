const { default: mongoose } = require("mongoose");
const { io_Manager } = require("../config");
const { ValidationError } = require("../libs/errors");
const { waitUntilTimeoutCompletes } = require("../libs/serviceFunction");
const {
  generateAuthToken,
  generateOtp,
  modified_response,
} = require("../libs/utils");
const { user_model } = require("../models");
const bcrypt = require("bcrypt");
const users_model = require("../models/user_model");
exports.create_user = async (req, res) => {
  const { username, password, email } = req.body;
  const existing_User = await user_model.findOne({ email: email });
  if (existing_User) throw new ValidationError("Email already Exists!");
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );
  const new_User = new user_model({
    username,
    password: hashedPassword,
    email,
  });
  await new_User.save();
  // const modified_user= modified_response(user_model,token)
  return new_User;
};

exports.login_user = async (req, res) => {
  const { password, email, expires = 60 * 60 * 1000, loggedinId } = req.body;
  const exisitng_user = await user_model.findOne({ email: email });
  if (!exisitng_user) throw new ValidationError("Email not Exists!");
  const validPassword = await bcrypt.compare(password, exisitng_user.password);
  if (!validPassword) throw new ValidationError("Password InCorrect!");
  if (req.tokens.length > 0) {
    const io = io_Manager.getIo();
    const otp = generateOtp();
    io.emit(req.tokens[0]._id);
    io.emit(loggedinId, otp);
    const response = await waitUntilTimeoutCompletes(email, res, otp, expires);
    return response;
  } else {
    const token = generateAuthToken(exisitng_user, expires);
    exisitng_user.tokens.push({ token: token });
    await exisitng_user.save();
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + expires),
    //   httpOnly: true,
    // });
    const modified_user = await modified_response(user_model, token);
    return { ...modified_user, token: token };
  }
};

exports.get_sessions = async (req, res) => {
  const existing_token = req.token;
  const expires = 60 * 60 * 1000;
  const existing_user = await user_model.findById({ _id: req.params.id });
  const token = generateAuthToken(existing_user, expires);
  // res.cookie("jwt", token, {
  //   expires: new Date(Date.now() + expires),
  //   httpOnly: true,
  // });
  await user_model.findOneAndUpdate(
    { _id: existing_user._id, "tokens.token": existing_token }, // Find the user by ID and the existing token
    { $set: { "tokens.$.token": token } } // Update the existing token with the new token
    // { new: true } // Return the updated document
  );
  const sessions = await user_model.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    {
      $project: {
        tokens: {
          $map: {
            input: "$tokens",
            as: "token",
            in: {
              isActive: "$$token.isActive",
              _id: "$$token._id",
              ip: "$$token.ip",
              // Include any other fields you want from the tokens objects here
              // Explicitly exclude the 'token' field to not return it
            },
          },
        },
        _id: 0, // Exclude the _id of the user document from the output
      },
    },
  ]);
  return { sessions: sessions[0].tokens, token: token };
};

exports.submit_otp = async (req) => {
  const { id } = req.params;
  const { otp } = req.body;
  const response = await user_model.findByIdAndUpdate(
    { _id: id },
    { otp: otp },
    { new: true }
  );
  return response;
};

exports.logout_user = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.map((item) => {
      if (item.token === req.token) {
        return { ...item, isActive: false };
      }
      return item;
    });
    res.clearCookie("jwt");
    await req.user.save();
    return { message: "Logout Successfully" };
  } catch (err) {
    throw err;
  }
};
/* Session {
  cookie: {
    path: '/',
    _expires: 2024-01-23T08:53:02.611Z,
    originalMaxAge: 600000,
    httpOnly: true
  }, 
  user: '9e46721e'
}
*/
