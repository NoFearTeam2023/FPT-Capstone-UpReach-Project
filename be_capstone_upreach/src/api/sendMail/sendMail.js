const nodemailer = require('nodemailer');
// Tạo một transporter để gửi email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'thienndde150182@fpt.edu.vn', // Địa chỉ email của bạn
    pass: 'jxjjsbmdqksfgcuk' // Mật khẩu email của bạn
    }
});

// Hàm tạo mã OTP
function generateOTP() {
    const digits = '0123456789';
    const timeCreatedOtp = new Date().getTime();
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return {
        otp : OTP,
        otpTimeCreated : timeCreatedOtp
    };
}

function isOTPValid(otp,otpUser, createdTime, validityPeriodInSeconds = 100) {
    const currentTime = new Date().getTime();
    const createdTimeInMillis = new Date(createdTime).getTime();
    const elapsedTimeInSeconds = (currentTime - createdTimeInMillis) / 1000;
    return otp === otpUser && elapsedTimeInSeconds <= validityPeriodInSeconds;
}

// Tạo một mã OTP và thời gian otp được tạo
const otp = generateOTP();

// Gửi email
function sendMailToUser(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
}

module.exports = {sendMailToUser,otp,isOTPValid}
