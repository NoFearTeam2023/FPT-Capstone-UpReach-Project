const passport = require('passport');
const bycrypt = require('bcrypt');
const e = require('express');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById){
    // Function : Authenticate users
    const authenticateUser = async (email,password,done) =>{
        const user = getUserByEmail(email);
        if(user == null){
            return done (null,false,{message : "No user found with that email"})
        }
        try{
            if(await bycrypt.compare(password,user.password)){
                return done (null, user)
            }else{
                return dont (null, false, {message : "Password Incorrect"})
            }
        }catch (e){
            console.log(e)
            return done(e);
        }
    }

    passport.use( new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user,done)=> done (null, user.id)) // save infor user into session
    
    // save infor user into session
    // use data in session to get data of users
    passport.deserializeUser((id,done)=> {
        return done(null, getUserById(id))
    })
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

module.exports = {initialize,checkAuthenticated,checkNotAuthenticated}