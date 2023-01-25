const User = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//rendering register form
const register = (req, res) => {
    res.render('auth/register', { title: "Register", error: "", data: { fname: '', email: "", password1: "", password2: "" } })
}

//register any user
const registerUser = async (req, res) => {
    const { fname, email, password1, password2 } = req.body;
    if (password1 != password2) {
        res.render('auth/register', { title: "Register", error: "Password not same", data: { fname: fname, email: email, password1: "", password2: "" } })
    }
    else {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password1, salt);
            const user = await User.create({ fname: fname, email: email, password: hash })
            user.save();
            res.render('./auth/welcome', { title: "Login", error: "", data: { fname: fname } })
        }
        catch (err) {
            console.log(err)
            res.render('auth/register', { title: "Register", error: "Some Intenal Server error", data: { fname: '', email: "", password1: "", password2: "" } })
        }
    }

}

// render login form
const login = (req, res) => {
    res.render('./auth/login', { title: "Login", error: "" })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const session = req.session;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                token = jwt.sign({user:user.fname, email:user.email}, process.env.SECRATE_KEY)
                session.token = token;
                res.redirect("/gallary")
            }
            else {
                res.render('./auth/login', { title: "Login", error: "password not valid" })
            }
        }
        else {
            res.render('auth/register', { title: "Register", error: "Email Id not register Kindly register", data: { fname: '', email: "", password1: "", password2: "" } })
        }
    }
    catch (err) {
        console.log(err)
        res.render('./auth/login', { title: "Login", error: "some intenal error" })
    }

}


module.exports = { register, login, registerUser, loginUser }