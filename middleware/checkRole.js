const asyncHandler = require("express-async-handler");

const checkAuthen = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if (req.user.role === 1) {
    next();
  }
  else {
    res.status(401);
    throw new Error("Bạn không có quyền truy cập vào mục này");
  }
 
});


const checkAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if (req.user.role === 1912 && req.user.username === "eimron") {
    next();
  }
  else {
    res.status(401);
    throw new Error("Hành động nguy hiểm, bạn không truy cập được");
  }
 
});
const checkSameUser = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Bạn chưa đăng nhập");
  }
  if ( req.user.role === 1912 && req.user.username === "eimron" ) {
    next();
  }
  if(req.user.id === res.params.id) {
    next();
  }
  else {
    res.status(401);
    throw new Error("Bạn không được thay đổi thông tin này");
  }
});


module.exports = {checkAuthen, checkAdmin, checkSameUser};

