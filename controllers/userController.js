const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// @desc register user
// @route POST api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser is running ...");
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    res.status(400);
    throw new Error("Có trường còn thiếu");
  }
  const usernameExisted = await User.findOne({ username });
  if (usernameExisted) {
    res.status(400);
    throw new Error("Username bị trùng");
  }
  // const emailExisted = await User.findOne({ email });
  // if (emailExisted) {
  //   res.status(400);
  //   throw new Error("email bị trùng");
  // }
  //   hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    password: hashedPassword,
    role,
  });
  if (user) {
    res.status(201).json({
      message: "Đăng ký user thành công!",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid value user");
  }
});

// @desc login user
// @route POST api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Có trường còn thiếu");
  }
  // json web token
  const userExisted = await User.findOne({ username });
  if (!userExisted) {
    res.status(401);
    throw new Error("User không tồn tại");
  } else {
    if (await bcrypt.compare(password, userExisted.password)) {
      // tạo accessToken
      const accessToken = jwt.sign(
        {
          user: {
            username: userExisted.username,
            role: userExisted.role,
            id: userExisted.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        message:"Đăng nhập thành công",
        accessToken,
        user: {
          username: userExisted.username,
          role: userExisted.role,
          id: userExisted.id,
        },
      });
    } else {
      res.status(401);
      throw new Error("Sai mật khẩu");
    }
  }
});

// @desc get current user
// @route GET api/user/current
// @access public
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Lấy thành công thông tin user hiện tại!", user: req.user });
});

// @desc get infor user
// @route GET api/user/:id
// @access public
const getUserById = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error(`Không tìm thấy người dùng có id = ${id}!`);
  }
  const result = {
    id: user.id,
    username: user.username,
    role: user.role,
  }
  res.status(200).json({
    message: ` Lấy thành công thông tin của ${user.username}!`,
    user: result
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getUserById,
};
