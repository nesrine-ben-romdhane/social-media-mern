const express = require("express")
const route = express.Router()
const user_controller = require("../controllers/user.controlers")
route.post("/signup",user_controller.signup)
route.post("/signin",user_controller.signin)
module.exports = route