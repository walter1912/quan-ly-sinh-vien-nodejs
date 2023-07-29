const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");

const routes = express.Router();

routes.route("/register").post(registerUser);

routes.route("/login").post(loginUser);

routes.route("/current").get(currentUser);

module.exports = routes;


