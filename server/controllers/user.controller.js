import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { AuthToken, schema } from "../config.js";
import otpGenerator from "otp-generator";
import Mail from "./mail.controller.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = {
      username,
      email,
      password,
      phoneNumber,
    };
    const { error, value } = schema.validate(user);
    if (error) throw error;
    const newUser = new User({ ...user, password: hashPassword });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.details[0].message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Wrong credential!" });

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(400).json({ message: "Wrong credential!" });
  } else {
    res.status(200).json({ data: user, token: AuthToken(user) });
  }
};

export const getEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw err;
    res.status(200).json({ data: user, token: AuthToken(user) });
  } catch (err) {
    res.status(403).json({ message: "User does not exist!" });
  }
};

export const sendOTP = (req, res) => {
  req.app.locals.otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(200).json({ otp: req.app.locals.otp });
};

export const sendMail = async (req, res) => {
  const { email } = req.body;
  const emailExist = await User.findOne({ email });
  if (!emailExist) return res.status(400).json({ message: "Email not found." });
  const mail = await Mail(email, req.app.locals.otp);
  res.status(200).json({ message: "sent an otp to your mail." });
};

export const verifyOTP = (req, res) => {
  const { otp } = req.body;
  if (req.app.locals.otp === otp) {
    req.app.locals.otp = null;
    req.app.locals.resetSession = true;
    res.status(200).json({ message: "otp verify" });
  } else {
    res.status(400).json({ message: "invalid otp" });
  }
};

export const updateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).json({ message: "OTP expired" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashPassword,
      },
      { new: true }
    );
    req.app.locals.resetPassword = false;
    res.status(200).json({ data: user, token: AuthToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted" });
};
