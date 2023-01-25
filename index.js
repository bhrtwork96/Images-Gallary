const express = require('express');
const {gallary } = require('./controller/main');
const { mainRoutes, authRoutes, gallaryRoutes } = require('./routes/routes');
const session = require('express-session')
const app = express();
const port = process.env.PORT || 2301

const layout = require('express-ejs-layouts')

const mongoose = require('mongoose');
const { authontication } = require('./middleware/auth');

// setting template engine
app.use(layout)
app.set('view engine','ejs')




// dotenve configration
require('dotenv').config()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// session middleware
// app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000}
}))


//routes
app.use(mainRoutes)
app.use(authRoutes)
app.use(authontication, express.static('./uploads'))
app.use(gallaryRoutes)






//listening

app.listen(port, () => {
  console.log("Server started as", port)
  
  const DBconncet = async()=>{
    try{
      await mongoose.connect(process.env.DB);
      console.log("DB connected")
    }
    catch(err){
      console.log(err)
    }
  }
  DBconncet();
})