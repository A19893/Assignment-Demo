const { io_Manager } = require("../config");
const { ValidationError } = require("../libs/errors");
const { generateAuthToken, generateOtp, modified_response } = require("../libs/utils");
const { user_model } = require("../models");
const bcrypt = require("bcrypt");
exports.create_user = async (req, res) => {
  const { username, password, email, expires = 60 * 60 * 1000 } = req.body;
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
  const token = generateAuthToken(new_User, expires);
  new_User.tokens.push({ token: token });
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + expires),
    httpOnly: true,
  });
  await new_User.save();
  const modified_user= modified_response(user_model,token)
  return modified_user;
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
    await new Promise((resolve, reject) => {
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
          console.log("hua khtm function")
          const modified_user = await modified_response(user_model, token);
          resolve(modified_user);
        } else {
          console.log("reject hua function")
          reject(new Error("You are an unauthenticated user!!"));
        }
      }, 2 * 60 * 1000);
    });
  } else {
    const token = generateAuthToken(exisitng_user, expires);
    exisitng_user.tokens.push({ token: token });
    await exisitng_user.save();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + expires),
      httpOnly: true,
    });
    const modified_user= await modified_response(user_model,token)
    return modified_user;
  }
};

exports.get_sessions = async () => {
  return { message: "hogya fetch" };
};

exports.submit_otp = async (req) => {
  const { id } = req.params;
  const { otp } = req.body;
  console.log(otp,id)
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
