const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { v4: uuidv4 } = require("uuid")

const router = express.Router();

const influService = require("../../Service/Influencer/InfluencerService")
const clientService = require('../../Service/Client/clientService')
const common = require('../../../../common/common');
const clientModel = require('../../Model/MogooseSchema/clientModel');

async function addProfileClient(req, res, next) {
    try {
        const { location, fullname, email, phonenumber, brandname, idClient } = req.body;

        if (!await InsertPointRemained()) {
            return res.json({ status: 'False', message: 'Insert PointRemained Fails' });
        }

        if (!await InsertClient('0f276419-2912-4e70-91a9-f5838c0680eb', location, fullname, email, 'hình thiện', phonenumber, brandname)) {
            return res.json({ status: 'False', message: 'Insert Client Fails' });
        }

        if (!await InsertInvoice()) {
            return res.json({ status: 'False', message: 'Insert Invoice Fails' });
        }

        await clientModel.findByIdAndUpdate(idClient, {
            username: fullname
        })
        // Nếu tất cả các thao tác trước đó thành công, gửi phản hồi thành công
        return res.json({ status: 'True', message: 'Insert Success Client' });

    } catch (err) {
        // Xử lý lỗi
        console.error(err);
        res.json({ status: 'False', message: 'Lỗi' });
    }
    
    // try {
    //     return res.json({data : req.body})
    //     const { location, fullname, email, phonenumber, brandname } = req.body;

    //     if (!await InsertPointRemained()) {
    //         return res.json({ status: 'False', message: 'Insert PointRemained Fails' });
    //     }
        
    //     if (!await InsertClient('0f276419-2912-4e70-91a9-f5838c0680eb', location, fullname, email, 'hình thiện', phonenumber, brandname)) {
    //         return res.json({ status: 'False', message: 'Insert Client Fails' });
    //     }

    //     if (!await InsertInvoice()) {
    //         return res.json({ status: 'False', message: 'Insert Invoice Fails' });
    //     }
        
    //     // Nếu tất cả các thao tác trước đó thành công, gửi phản hồi thành công
    //     return res.json({ status: 'True', message: 'Insert Success Client' });

    // } catch (err) {
    //     // Xử lý lỗi
    //     console.error(err);
    //     res.json({ status: 'False', message: 'Lỗi' });
    // }
}

async function InsertPointRemained() {
    try {

        const lastIdPointRemained = await clientService.getLastIdPointRemained()
        var newIdPointRemained = common.increaseID(lastIdPointRemained.Remaining_ID)// Lấy last Id của Remaining_ID cuối trong db

        // Thực hiện insert
        const checkInsertPointRemained = await clientService.insertPointRemained(newIdPointRemained, 'P04', 10, 100)
        if (checkInsertPointRemained.rowsAffected[0]) {
            return true;
        } else {
            return false;
        }

    } catch (e) {
        console.log(e)
        return false;
    }
}

async function InsertInvoice() {
    try {
        const now = '' + Date.now();
        const lastIdClient = await clientService.getLastIdClients()
        const lastIdInvoices = await clientService.getLastIdInvoices()
        var newIdInvoices = common.increaseID(lastIdInvoices.Invoice_ID) // Lấy last Id của Invoice_ID cuối trong db
        var newIdClient = lastIdClient.Client_ID // Lấy last Id của Client_ID cuối trong db

        // Thực hiện insert
        const checkInsertInvoice = await clientService.insertInvoice(newIdInvoices, newIdClient, 'P04', 1, now)
        if (checkInsertInvoice.rowsAffected[0]) {
            return true;
        } else {
            return false;
        }

    } catch (e) {
        console.log(e)
        return false;
    }
}

async function InsertClient(userId, address, fullName, emailClient, imageClient, phoneClient, brandClient) {
    try {

        const lastIdClient = await clientService.getLastIdClients()
        var newIdClient = common.increaseID(lastIdClient.Client_ID) // Lấy last Id của Client_ID cuối trong db
        const lastIdPointRemained = await clientService.getLastIdPointRemained()
        var newIdPointRemained = lastIdPointRemained.Remaining_ID // Lấy last Id của Remaining_ID cuối trong db

        // Thực hiện insert
        const checkInsertClient = await clientService.insertClient(newIdClient, newIdPointRemained, userId, address, fullName, emailClient, imageClient, phoneClient, brandClient);
        if (checkInsertClient.rowsAffected[0]) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function dataHomePageClient(req, res, next) {
    try {
        const { userId, email, role } = req.body
        if (role === '2') {
            const infoClient = await clientService.getClientByEmail(email);
            const infoInfluencer = await influService.getAllInfluencerByPublish();
            return res.json({ Client: infoClient, Influencer1: infoInfluencer })
        }
        return res.json({ message: "Bạn không có quyền truy cập vào" })
    } catch (error) {
        return res.json({ message: ' ' + error });
    }
}

// module.exports = router;
module.exports = { addProfileClient, dataHomePageClient };
