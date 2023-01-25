const mongoose = require('mongoose');

const gallarySchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports= mongoose.model('gallary',gallarySchema)