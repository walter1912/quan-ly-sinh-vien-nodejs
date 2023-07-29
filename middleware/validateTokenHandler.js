const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authorHeader = req.headers.authorization || req.headers.Authorization;
  if (authorHeader && authorHeader.startsWith("Bearer")) {
    token = authorHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("UNAUTHORIZED user");
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("UNAUTHORIZED or missing token");
  }
});
module.exports = validateToken;
