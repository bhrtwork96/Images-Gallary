const path = require('path')
const Gallary = require('../models/gallary')
const jwt = require('jsonwebtoken')
const home=(req,res)=>{

    res.render('home',{title:"Image Gallary"})
    
}

const gallary = async(req, res)=>{
    try{
        const session = req.session;
        const decoded = jwt.verify(session.token, process.env.SECRATE_KEY);
        const gallaryData = await Gallary.find({email:decoded.email})
        res.render('gallary', {title:"Gallary",error:"", data:gallaryData} )
    }
    catch{
        res.send("some intenal error")
    }
  
}

const logout = (req, res)=>{
    req.session.destroy(function(err) {
        res.redirect('/')
      })
}




module.exports = {home, gallary, logout}