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
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// Tạo một mã OTP
const otp = generateOTP();

// Định nghĩa thông tin về email



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

module.exports = {sendMailToUser,otp}
