import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { AuthToken } from "../config.js";
import { Mail } from "./mail.controller.js";

// register
export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(404).json({ message: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Email or password do not match" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res
        .status(404)
        .json({ message: "Email or password do not match" });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: AuthToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// send OTP
export const SendOTP = (req, res) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(200).json({ code: req.app.locals.OTP });
};

// send Mail
export const SendMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) res.status(404).json({ message: "Email not found" });

    Mail(email, req.app.locals.OTP);
    res.status(200).json({ message: "OTP send" + req.app.locals.OTP });
  } catch (err) {
    res.status(500).json({ message: "OTP not found" });
  }
};

// verify OTP
export const verifyOTP = (req, res) => {
  const { code } = req.body;
  if (req.app.locals.OTP === code) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    res.status(200).json({ message: "OTP verify" });
  }
  return res.status(400).json({ message: "Invalid OTP" });
};

// reset password
export const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).json({ message: "OTP expired" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashPassword,
      },
      { new: true }
    );
    req.app.locals.resetPassword = false;
    res.status(200).json({ message: "updated password", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user
export const getUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUser = await User.findById(id);
    const hashPassword = await bcrypt.hash(
      req.body.password,
      currentUser.password
    );
    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: hashPassword },
      { new: true }
    );
    const result = { ...user._doc, token: AuthToken(user) };
    const { password, ...rest } = result;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
