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

userLogin.get('/api/register',(req,res) =>{
    res.render("../View/register.ejs");
})

userLogin.get('/api/login',(req,res) =>{
    res.render("../View/login.ejs");
})

module.exports = userLogin;