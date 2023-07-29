const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const routes = express.Router();

routes.route("/register").post(registerUser);

routes.route("/login").post(loginUser);

routes.get("/current", validateToken, currentUser);

module.exports = routes;


