const multer = require('multer');
const fs = require('fs')
const path = require('path')
const Gallary = require('../models/gallary')
const jwt = require('jsonwebtoken')


//multer setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        const length = fs.readdirSync('./uploads').length
        cb(null, `image-${Date.now().toString()}${path.extname(file.originalname)}`)
    }
})

const filter = (req, file, cb) => {
    if (['.jpeg', '.png', '.jpg', '.jfif','.webp'].includes(path.extname(file.originalname))) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filter })

// upload image
const uploadFile = async (req, res) => {
    try {
        const session = req.session;
        const decoded = jwt.verify(session.token, process.env.SECRATE_KEY);
        const gallaryData = await Gallary.find({ email: decoded.email })

        if (req.file) {

            const gallary = await Gallary.create({ email: decoded.email, imgurl: `/${req.file.filename}` })
            gallary.save();
            res.redirect('/gallary')

        }
        else {
            res.render('gallary', { title: "Gallary", error: "file not suported", data: gallaryData })
        }
    }
    catch (err) {
        console.log(err);
        res.send("Some internal server error")
    }

}

// show photo
const showPhoto = async (req, res) => {
    const id = req.params.id;
    try {
        const session = req.session;
        const decoded = jwt.verify(session.token, process.env.SECRATE_KEY);
        const photo = await Gallary.findOne({ _id: id })
        const nextPhoto = await Gallary.find({ _id: { $gt: id }, email: decoded.email }).sort({ _id: 1 }).limit(1);
        const pervPhoto= await Gallary.find({ _id: { $lt: id }, email: decoded.email }).sort({ _id: -1 }).limit(1);
        let nextId, pervId
        console.log(nextPhoto);
        console.log(pervPhoto)
        if(nextPhoto.length!=0){
            nextId = nextPhoto[0]._id
        }
        else{
            nextId = ""
        }
        if(pervPhoto.length!=0){
            pervId = pervPhoto[0]._id
        }
        else{
            pervId = ""
        }
        res.render('photo', { title: "Gallary", photo: photo, pevId: pervId, nextId: nextId })
    }
    catch (err) {
        console.log(err)
        res.send("internal err")
    }
}

// for deleting image

const deletePhoto = async (req,res)=>{
    const id = req.params.id;
    try{
        const photo = await Gallary.findOneAndDelete({_id:id});
        const filePath = path.join(__dirname,`../uploads/${photo.imgurl}`)
        fs.unlinkSync(filePath)
        res.redirect('/gallary')
    }
    catch(err){
        console.log(err)
        res.send("intenal error")
    }

}


module.exports = { upload, uploadFile, showPhoto, deletePhoto}