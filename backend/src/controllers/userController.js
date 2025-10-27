import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

//@desc RegisterUser
//@route POST: api/users
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Vui lòng điền đầy đủ thông tin");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Người dùng đã tồn tại");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      //token ở đây không lưu vào database
      token: generateToken(user.id),
      message: "Đăng kí thành công",
    });
  } else {
    res.status(400);
    throw new Error("Đăng kí thất bại");
  }
});

//@desc PloginUser
//@route POST: api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error(`Không tìm thấy người dùng`);
  } else if (bcrypt.compare(password, user.password)) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      message: "Đăng nhập thành công",
    });
  }
});

//@desc Getme
//@route GET: api/users/me

export const getMe = asyncHandler(async (req, res) => {
  return res.status(201).json(req.user);
});

//jwt
//const generateToken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
