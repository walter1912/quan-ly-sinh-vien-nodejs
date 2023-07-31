const asyncHandler = require("express-async-handler");

const checkAdmin = asyncHandler(async (req, res, next) => {
  console.log("checkAdmin", req.user);
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if (req.user.role === 1912 && req.user.username === "eimron") {
    next();
  } else {
    res.status(401);
    throw new Error("Hành động nguy hiểm, bạn không truy cập được");
  }
});

const checkAuthen = asyncHandler(async (req, res, next) => {
  console.log("checkAuthen");
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if (req.user.role === 1 || req.user.role === 1912) {
    next();
  } else {
    res.status(401);
    throw new Error("Bạn không có quyền truy cập vào mục này");
  }
});

const checkSameUser = asyncHandler(async (req, res, next) => {
  console.log("checkSameUser");
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if (req.user.role === 1912 && req.user.username == "eimron") {
    next();
  }
  else if (req.user.id === req.params.id) {
    next();
  } else {
    res.status(401);
    throw new Error("Bạn không được thay đổi thông tin này");
  }
});

module.exports = { checkAuthen, checkAdmin, checkSameUser };
