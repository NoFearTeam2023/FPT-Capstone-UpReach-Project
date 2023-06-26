if(process.env.NODE_ENV !== "production") require("dotenv").config()

const express = require('express');
// Declare param was install from npm
const bycrypt = require('bcrypt');
const bodyParser = require('body-parser');
const {v4 : uuidv4} = require("uuid")
const passport = require('passport');
const methodOverride = require("method-override")

const userLogin = require('./Router/userLogin');
const auth = require('./Authen/auth');
const flash = require('express-flash');
const session = require('express-session');

const app = express();

auth.initialize(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const PORT = process.env.PORT || 5000;
const users = []

// for parsing application/json
// for parsing application/xwww-
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))


// Function : register 
app.post("/register", async (req,res) => {
    // console.log(req.body)
    try{
        const hashedPassword = await bycrypt.hash(req.body.password,10)
        users.push({
            id : uuidv4(),
            email : req.body.email,
            password: hashedPassword,
        })
        console.log(users);
        res.redirect("/login");
    }catch (e){
        console.log(e)
        res.redirect('/register');
    }
})

// Function : register 
app.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

app.use('/',userLogin);
//Connect DB
// const pool = new sql.ConnectionPool(config);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

