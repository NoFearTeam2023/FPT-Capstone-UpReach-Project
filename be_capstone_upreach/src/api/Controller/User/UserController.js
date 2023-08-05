const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {v4 : uuidv4} = require("uuid")

const auth = require('../../Authen/auth');
const sendMail = require('../../sendMail/sendMail')
const userService = require('../../Service/User/UserService')
const influService = require("../../Service/Influencer/InfluencerService")
const clientService = require("../../Service/Client/clientService")
const userModels = require('../User/UserController')

const router = express.Router();
router.post('/api/login', login);
router.post('/api/register', register);
router.post('/api/confirm', confirmRegister);
router.post('/api/logout', logout);

auth.initialize(
    passport,
    id => userModels.find(user => user.userId === id),
    email => userModels.find(user => user.userEmail === email),
    password => userModels.find(user => user.userPassword === password),
)

function changeCheckExist() {
    userModels.checkExist = false;
    console.log('Giá trị của checkExist đã thay đổi thành:', userModels.checkExist);
}

async function register(req, res, next){
    try {
        const otpData = sendMail.generateOTP()
        const {email, password, role,name} = req.body.Data
        const hashedPassword = await bcrypt.hash(password, 10);
        userModels.userId = uuidv4();
        userModels.userEmail = email;
        userModels.userPassword = hashedPassword;
        userModels.userRole = role;
        userModels.otpData = otpData.otp;
        userModels.checkExist = otpData.checkExist;
        existingEmail = await  userService.getUserByEmail(userModels.userEmail);
        if (Object.keys(existingEmail).length > 0){
            return res.json({status : 'False', message: "Email đã được sử dụng" });
        }else {
            const mailOptions = {
                from: 'thienndde150182@gmail.com', 
                to: userModels.userEmail, 
                subject: 'OTP for Registration', 
                text: `Your OTP for registration is: ${userModels.otpData}` 
            };
            // Set tồn tại của OTP sau 30s
            setTimeout(changeCheckExist, 600 * 1000);
            sendMail.sendMailToUser(mailOptions).then(() => {
                res.json({ otpData: userModels.otpData });
            }).catch((error) => {
                res.json({ message: error });
            });
        }
    }catch (err){
        res.json({status : 'False', message: "Lỗi ", err });
    }
}

async function confirmRegister(req, res, next){
    try{
        // return res.json({ message: req.body });
        const sessionId = req.sessionID;
        const maxAge = req.session.cookie.maxAge; 
        const expiry = new Date(Date.now() + maxAge);
        const {otp, email, password, role} = req.body
        // const {Data} = req.body || {} 
        // const {otp, email, password, role} = Data || {}
        // console.log(userModels.userPassword, password)
        const passwordMatch = await bcrypt.compare(password, userModels.userPassword);
        
        const existingEmail = await  userService.getUserByEmail(email);
        if (Object.keys(existingEmail).length > 0){
            return res.json({ status : 'False',message: "Email đã được sử dụng" });
        }
        if(!userModels.checkExist){
            return res.json({ status : 'False',message: "OTP hết hạn" });
        }
        if(otp === userModels.otpData && email === userModels.userEmail && passwordMatch){
            result = await userService.insertInfoUser(userModels.userId,role,email,userModels.userPassword);
            if(result.rowsAffected){
                passport.authenticate("local",async (err, user, info) => {
                    if (err) {
                        return res.status(500).json({ status : 'False',message: "Internal server error at confirm" });
                    }
                    if (!user) {
                        return res.status(401).json({ status : 'False',message: "Sai email hoặc sai mật khẩu" });
                    }
                    req.logIn(user,async (err) => {
                        if (err){
                            return res.status(500).json({ status : 'False',message: "Internal server error" });
                        }
                        const result = await userService.insertSessionUser(sessionId,userModels.userId,maxAge.toString(),expiry.toString());
                        if(!result){
                            console.log('fails add session');
                            return res.json({status : 'False',message :'Fails Add Session'});
                        }
                        return res.status(200).json({
                            status : 'True',
                            message: "Them session vao db thanh cong",
                            data : user
                        });
                    });
        
                })(req, res, next);
            }else{
                return res.json({ status : 'False',message: "Dữ liệu Add Fail" });
            }
        }else{
            return res.json({
                status : 'False',
                message : "Sai Dữ liệu truyền vào để confirm"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({ message: "Lỗi ", err });
    }
}

async function login(req,res,next){
    try{
        const sessionId = req.sessionID;
        const maxAge = req.session.cookie.maxAge; 
        const expiry = new Date(Date.now() + maxAge); 
        const email = req.body.email;

        const userSearch = await userService.getUserByEmail(email);
        console.log(userSearch);
        const userId = userSearch.userId;
        const roleUser = userSearch.userRole
        const existedUserId = await userService.getSessionUserById(userId);

        passport.authenticate("local",async (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: "Error Authenticate User" });
            }
            if (!user) {
                return res.status(401).json({ message: "Sai email hoặc sai mật khẩu" });
            }
            if(existedUserId.length > 0){
                const infoClient = await clientService.getClientByEmail(email);
                const infoInfluencer = await influService.getAllInfluencerByEmail(email);
                return res.status(200).json({ 
                    message: "User Id tồn tại",
                    data: {
                        "User" : roleUser === '3' ? infoInfluencer: infoClient
                    }
                });
            }
            
            req.logIn(user,async (err) => {
                if (err){
                    return res.status(500).json({ message: "Internal server error at Login" });
                }
                const result = await userService.insertSessionUser(sessionId,userId,maxAge.toString(),expiry.toString());
                if(!result){
                    return res.json({message :'Fails Add Session'});
                }

                const infoClient = await clientService.getClientByEmail(email);
                const infoInfluencer = await influService.getAllInfluencerByEmail(email);
                return res.status(200).json({
                    message: "Them session vao db thanh cong",
                    data: {
                        
                        "User" : roleUser === '3' ? infoInfluencer : infoClient
                    }
                });
            });
        })(req, res, next);
    }catch(err){
        res.json({message : err});
    }
}

async function logout(req,res,next){
    try{
        const email = req.body.email;
        const user = await userService.getUserByEmail(email);
        const userId = user.userId;
        const result = await userService.deleteSessionUserById(userId);
        if (result.rowsAffected > 0) {
            req.logout(() =>{
                return res.json({ message: "Xóa session khỏi db thành công" });
            })
        }else if (result.rowsAffected === 0) {
            return res.json({ message: 'User đang không đăng nhập' });
        }else{
            return res.json({ message: 'Fails Delete Session' });
        }
    }catch(err){
        return res.json({message : ' ' + err});
    }
}

async function forgotPassword(req,res,next){
    try{

    }
    catch(err){
        return res.json({message : ' ' + err});
    }
}

async function confirmForgotPassword(req,res,next){
    try{

    }
    catch(err){
        return res.json({message : ' ' + err});
    }
}


module.exports = router;
