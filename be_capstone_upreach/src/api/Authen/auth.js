const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const sql = require('mssql');

const config = require('../Config/dbConfig');
const userService = require('../Service/User/UserService')
const pool = new sql.ConnectionPool(config);

function initialize(passport, getUserById, getUserByEmail){

    const authenticateUser = async (userEmail, userPassword, done) => {
        try {
            const result = await userService.getUserByEmail(userEmail)
            if (!result) {
                return done(null, false, { message: "No user found with that email" });
            }
            
            const passwordMatch = await bcrypt.compare(userPassword, result.Password);
            if (passwordMatch) {
                return done(null, result);
            } else {
                
                return done(null, false, { message: "Incorrect password" });
            }
            
        } catch (err) {
            return done(err);
        }
    };

    passport.use( new LocalStrategy({usernameField: 'email'}, authenticateUser) )

    passport.serializeUser((user, done) => {
        done(null, user.User_ID);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const result = await  userService.getUserById(id)
            return done(null, result);
        } catch (e) {
            done(e);
        }
    });
}

function checkRole (){
    return (req, res,next) =>{
        if(req.isAuthenticated() && req.user.role === role){
            return next(); 
        }
        res.json({message: "Bạn không có quyền truy cập vào trang này"})
    }
}


module.exports = {initialize,checkRole}