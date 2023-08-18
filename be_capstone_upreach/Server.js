if (process.env.NODE_ENV !== "production") require("dotenv").config()

// Declare param was install from npm
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const sql = require('mssql');
const config = require("./src/api/Config/dbConfig");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose")

const controllerInflu = require("./src/api/Controller/Influencer/InfluencerController");
const router = require('./src/api/Router/userRouter')

const app = express();
const PORT = process.env.PORT || 4000;
const cloudconfig = require('./src/api/Config/cloudConfig')

app.use(cors());
app.use(express.json())
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

app.use(
    fileUpload(
        {
            useTempFiles: true,
            limits: { fileSize: 50 * 2024 * 1024 },
        },
        controllerInflu
    )
);
cloudinary.config(cloudconfig)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use(async (req, res, next) => {
    try {
      await next(); // Tiếp tục xử lý các middleware và tuyến đường
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Something went wrong!');
    }
});
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successfull");
}).catch((err) => {
    console.log(err.message)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));