const express = require("express");
const { register, login, registerUser, loginUser } = require("../controller/auth/auth");
const { registerValidation } = require("../middleware/auth");
const router = express.Router();


router.get("/register", register)
router.post('/register',[registerValidation],registerUser)
router.get('/login',login)
router.post('/login',loginUser)


module.exports = router