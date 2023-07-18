const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {v4 : uuidv4} = require("uuid")

const auth = require('../../Authen/auth');
const sendMail = require('../../sendMail/sendMail')
const userService = require('../../Service/User/UserService')
const userModels = require('../User/UserController')
const router = express.Router();

router.post('/api/login', login);
router.post('/api/register', register);
router.post('/api/confirm', confirm);
router.post('/api/logout', logout);

auth.initialize(
    passport,
    id => userModels.find(user => user.userId === id),
    email => userModels.find(user => user.userEmail === email)
)

async function register(req, res, next){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        userModels.userId = uuidv4();
        userModels.userEmail = req.body.email;
        userModels.userPassword = hashedPassword;
        userModels.userRole = req.body.role;
        existingEmail = await  userService.getUserByEmail(userModels.userEmail);
        if (existingEmail.length > 0){
            return res.json({ message: "Email đã được sử dụng" });
        }else {
            const mailOptions = {
                from: 'thienndde150182@gmail.com', // Địa chỉ email người gửi
                to: userModels.userEmail, // Địa chỉ email người nhận
                subject: 'OTP for Registration', // Tiêu đề email
                text: `Your OTP for registration is: ${sendMail.otp}` // Nội dung email
            };
            sendMail.sendMailToUser(mailOptions)
            .then(() => {
                // Xử lý khi gửi email thành công
                res.json({ message: sendMail.otp });
            })
            .catch((error) => {
                // Xử lý khi gửi email gặp lỗi
                res.json({ message: error });
            });
        }
    }catch (err){
        res.json({ message: "Lỗi ", err });
    }
}

async function confirm(req, res, next){
    try{
        const sessionId = req.sessionID;
        const maxAge = req.session.cookie.maxAge; 
        const expiry = new Date(Date.now() + maxAge); 
        const otp = req.body.otp;
        const infoUser = await userService.getDataForUser(userModels.userEmail);
        if(otp === sendMail.otp){
            result = userService.insertInfoUser(userModels.userId,userModels.userRole,userModels.userEmail,userModels.userPassword);
            if(result){
                passport.authenticate("local",async (err, user, info) => {
                    if (err) {
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    if (!user) {
                        return res.status(401).json({ message: "Sai email hoặc sai mật khẩu" });
                    }

                    req.logIn(user,async (err) => {
                        if (err){
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        const result = await userService.insertSessionUser(sessionId,userModels.userId,maxAge.toString(),expiry.toString());
                        if(!result){
                            console.log('fails add session');
                            return res.json({message :'Fails Add Session'});
                        }
                        return res.status(200).json({
                            message: "Them session vao db thanh cong",
                            data : user 
                        });
                    });
        
                })(req, res, next);
            }else{
                console.log('Dữ liệu đã được thêm Fails');
                return res.json({ message: "Dữ liệu add Fails" });
            }
        }
    }catch(err){
        console.log(err);
        return res.json({ message: "Lỗi ", err });
    }
}

async function login(req,res,next){
    try{
        const sessionId = req.sessionID;
        const maxAge = req.session.cookie.maxAge; // Thời gian tồn tại của session (đơn vị tính bằng mili giây)
        const expiry = new Date(Date.now() + maxAge); // Thời gian hết hạn của session
        const email = req.body.email;
        const user = await userService.getUserByEmail(email);
        const userId = user[0].User_ID;
        const existedUserId = await userService.getSessionUserById(userId);

        const infoUser = await userService.getDataForUser(email);
        
        passport.authenticate("local",async (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!user) {
                return res.status(401).json({ message: "Sai email hoặc sai mật khẩu" });
            }
            
            if(existedUserId.length > 0){
                return res.status(200).json({ 
                    message: "User Id tồn tại",
                    data: infoUser
                });
            }
            req.logIn(user,async (err) => {
                console.log('Giá trị ' + err);
                if (err){
                    return res.status(500).json({ message: "Internal server error" });
                }
                const result = await userService.insertSessionUser(sessionId,userId,maxAge.toString(),expiry.toString());
                if(!result){
                    console.log('fails add session');
                    return res.json({message :'Fails Add Session'});
                }
                const infoUser = await userService.getDataForUser(email);
                return res.status(200).json({
                    message: "Them session vao db thanh cong",
                    data : infoUser 
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
        const userId = user[0].User_ID;
        const result = await userService.deleteSessionUserById(userId);
        if (result.rowsAffected[0] === 1) {
            req.logout(() =>{
                return res.json({ message: "Xóa session khỏi db thành công" });
            })
        }else if (result.rowsAffected[0] === 0) {
            console.log('User đang không đăng nhập');
            return res.json({ message: 'User đang không đăng nhập' });
        }else{
            console.log('Fails Delete Session');
            return res.json({ message: 'Fails Delete Session' });
        }
    }catch(err){
        return res.json({message : ' ' + err});
    }
}

module.exports = router;
