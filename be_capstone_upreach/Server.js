if(process.env.NODE_ENV !== "production") require("dotenv").config()

// Declare param was install from npm
const express = require('express');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// const {v4 : uuidv4} = require("uuid")
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
// const sql = require('mssql');

// const config = require('./Config/dbConfig')
// const userLogin = require('./Router/userLogin');
// const auth = require('./Authen/auth');
const controllerUser = require('./src/api/Controller/User/UserController')
const userService = require('./src/api/Service/User/UserService')
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    }
}))
app.use(passport.initialize()) 
app.use(passport.session())

app.use('', controllerUser);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

