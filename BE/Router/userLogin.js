const express = require('express');
const userLogin = express.Router();

const auth = require('../Authen/auth');

// userLogin.get('/',auth.checkAuthenticated,(req,res) =>{
//     res.render("../View/index.ejs");
// })

// userLogin.get('/register',auth.checkNotAuthenticated,(req,res) =>{
//     res.render("../View/register.ejs");
// })

// userLogin.get('/login',auth.checkNotAuthenticated,(req,res) =>{
//     res.render("../View/login.ejs");
// })

userLogin.get('/',(req,res) =>{
    res.render("../View/index.ejs");
})

userLogin.get('/register',(req,res) =>{
    res.render("../View/register.ejs");
})

userLogin.get('/login',(req,res) =>{
    res.render("../View/login.ejs");
})

module.exports = userLogin;