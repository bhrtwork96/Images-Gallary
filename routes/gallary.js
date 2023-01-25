const express = require("express");
const { upload, uploadFile, showPhoto, deletePhoto } = require("../controller/gallary");
const { authontication } = require("../middleware/auth");

const router = express.Router();


router.post("/upload", [authontication],upload.single('file'), uploadFile)
router.get("/view/:id",[authontication],showPhoto)
router.get("/photo/delete/:id",[authontication],deletePhoto)



module.exports = router