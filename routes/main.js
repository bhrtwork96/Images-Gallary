const express = require("express");
const { home, gallary, logout } = require("../controller/main");
const { authontication } = require("../middleware/auth");
const router = express.Router();


router.get("/", home)
router.get('/gallary',[authontication],gallary)
router.get('/logout',logout)


module.exports = router