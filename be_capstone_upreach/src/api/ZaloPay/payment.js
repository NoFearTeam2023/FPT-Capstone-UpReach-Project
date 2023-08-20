// const sql = require('mssql')
// const config = require("../Config/configZalo");
// const express =require('express')

// const axios = require('axios').default; // npm install axios
// const CryptoJS = require('crypto-js'); // npm install crypto-js
// // const uuid = require('uuid/v4'); // npm install uuid
// const { v4: uuidv4 } = require("uuid")
// const moment = require('moment'); // npm install moment

// const router = express.Router();


// async function createPaymentZalo(req,res,next){

//     const embeddata = {
//     };

//     const items = [{
//         itemid: "knb",
//         itemname: "kim nguyen bao",
//         itemprice: 3000,
//         itemquantity: 1
//       }];
      
    
//     const order = {
//         appid: config.appid, 
//         apptransid: `${moment().format('YYMMDD')}_${uuidv4()}`, // mã giao dich có định dạng yyMMdd_xxxx
//         appuser: "0343619061", 
//         apptime: Date.now(), // miliseconds
//         item: JSON.stringify(items), 
//         embeddata: JSON.stringify(embeddata), 
//         amount: 3000, 
//         description: "ZaloPay Integration Demo",
//         bankcode: "zalopayapp", 
//       };
//       console.log(order)
//       // appid|apptransid|appuser|amount|apptime|embeddata|item
//       const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
//       order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      
//       axios.post(config.endpoint, null, { params: order })
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(err => console.log(err));

// }
// createPaymentZalo()
// module.exports = { createPaymentZalo }

const config = require("../Config/configZalo");
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

const embed_data = {};

const items = [{}];
const transID = Math.floor(Math.random() * 1000000);
const order = {
    app_id: config.appid,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "0903775482",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 1000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "zalopayapp",
};

// appid|app_trans_id|appuser|amount|apptime|embeddata|item
const data = config.appid + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


console.log('order', order);
axios.post(config.endpoint, null, { params: order })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log(err));