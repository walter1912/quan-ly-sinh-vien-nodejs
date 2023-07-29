const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// @desc register user
// @route POST api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role, email } = req.body;
  if (!username || !password || !role || !email) {
    res.status(400);
    throw new Error("Có trường còn thiếu");
  }
  const usernameExisted = await User.findOne({ username });
  if (usernameExisted) {
    res.status(400);
    throw new Error("Username bị trùng");
  }
  const emailExisted = await User.findOne({ email });
  if (emailExisted) {
    res.status(400);
    throw new Error("email bị trùng");
  }
  //   hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    password: hashedPassword,
    email,
    role,
  });
  if (user) {
    res
      .status(201)
      .json({ message: "register user", _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid value user");
  }
});

// @desc register user
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
            email: userExisted.email,
            id: userExisted.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {
          expiresIn: "5m",
        }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Sai mật khẩu");
    }
  }
});

// @desc register user
// @route GET api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "current user" , user: req.user});
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
