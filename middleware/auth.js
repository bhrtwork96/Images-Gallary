const User = require('../models/user');
const jwt = require('jsonwebtoken')

const registerValidation = async (req, res, next) => {
    const { fname, email, password1, password2 } = req.body;

    if (fname && email && password1 && password2) {
        try {
            const user = await User.findOne({ email: email })
            if (user) {
                res.render('auth/login', { title: "Register", error: "Email id already registered kindly login" })

            } else {
                next();
            }
        }
        catch (err) {
            console.log(err)
            res.render('auth/register', { title: "Register", error: "Some inernal server issue", data: { fname: fname, email: email, password1: "", password2: "" } })

        }
    }
    else {
        res.render('auth/register', { title: "Register", error: "Name, email or password mandotory", data: { fname: fname, email: email, password1: "", password2: "" } })

    }

}

const authontication = async (req, res, next) => {
    const session = req.session;
    
    if (session.token) {
        const decoded = jwt.verify(session.token, process.env.SECRATE_KEY)

        if (decoded) {
            next()
        }
        else {
            res.redirect('/login')
        }
    }
    else{
        res.redirect('/login')
    }

}

module.exports = { registerValidation, authontication }


