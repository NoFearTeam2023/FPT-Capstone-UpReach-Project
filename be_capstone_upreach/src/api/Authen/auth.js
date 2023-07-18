const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const sql = require('mssql');

const config = require('../Config/dbConfig');
const userService = require('../Service/User/UserService')
const pool = new sql.ConnectionPool(config);

function initialize(passport, getUserById, getUserByEmail){
    // Function : Authenticate users

    const authenticateUser = async (userEmail, userPassword, done) => {
        try {
            const result = await userService.getUserByEmail(userEmail)
            const user = result[0];
            let infoUser;
            if (!user) {
                return done(null, false, { message: "No user found with that email" });
            }
            
            const passwordMatch = await bcrypt.compare(userPassword, user.Password);
            if (passwordMatch) {
                infoUser = await userService.getDataForUser()
                return done(null, user);
            } else {
                
                return done(null, false, { message: "Incorrect password" });
            }
            
        } catch (err) {
            return done(err);
        }
    };

    passport.use( new LocalStrategy({usernameField: 'email'}, authenticateUser) )
    // passport.use(new LocalStrategy((username, password, done) => {})
    // );
    // save infor user into session
    passport.serializeUser((user, done) => {
        done(null, user.User_ID);
    });
    // save infor user into session
    // use data in session to get data of users
    passport.deserializeUser(async (id, done) => {
        try {
            const infoUser = await userService.getDataForUser(email)
            const result = infoUser[0]
            if (id === result.User_ID){
                return done(null, result);
            }
        } catch (e) {
            done(e);
        }
    });
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