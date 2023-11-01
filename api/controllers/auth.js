import asyncHandler from "express-async-handler";
import User from "../models/StudentModel.js";
import { generateToken } from "../config/genrateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// const JWT_SECRET=process.env.JWT_SECRET;
export const registerUser = asyncHandler(async (req, res) => {
  const { Student_ID, Student_Name, Department, Password, Email } = req.body;
  if (!Student_ID || !Student_Name || !Password || !Department || !Email) {
    return res.status(400).json({ msg: "Please fill all required field" });
    // throw new Error( "Please fill all required field")
  }
  const userExist = await User.findOne({ Email });
  if (userExist) {
    return res.status(401).json({ msg: "User with this email already exist." });
    // throw new Error("User with this email already exist.")
  }
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(Password, salt);

  const user = await User.create({
    Student_ID,
    Email,
    Student_Name,
    Password: secpass,
    Department,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      Student_ID: user.Student_ID,
      Student_Name: user.Student_Name,
      Department: user.Department,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "failed to create user." });
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });
  const passwordCompare = await bcrypt.compare(Password, user.Password);
  if (user && passwordCompare) {
    res.status(200).json({
      _id: user._id,
      Student_ID: user.Student_ID,
      Student_Name: user.Student_Name,
      Department: user.Department,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "Invalid credentials." });
    //    throw new Error("Invalid credentials.");
  }
});
