const express = require('express');
const router = express.Router();
const multer = require("multer");
const influencerController = require('../Controller/Influencer/InfluencerController')
const clientController = require('../Controller/Client/clientController')
const userController = require('../Controller/User/UserController')
const listInfluencerController = require('../Controller/ListInfluencer/ListInfluencerController')
const adminController = require('../Controller/Admin/AdminController')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/confirm', userController.confirmRegister);
router.post('/logout', userController.logout);


router.get("/admin/get-approve-report", adminController.getApproveReport);
router.post("/admin/approve-report", adminController.postApproveReport);
router.get("/admin/get-influencer-account", adminController.getInfluencerAccount);
router.put("/admin/edit-influ", adminController.editInflu);
router.put("/admin/lock-influ", adminController.lockInflu);
router.put("/admin/unlock-influ", adminController.unlockInflu);
router.get("/admin/get-client-account", adminController.getClientAccount);
router.put("/admin/edit-client", adminController.editClient);
router.put("/admin/lock-client", adminController.lockClient);
router.put("/admin/unlock-client", adminController.unlockClient);


router.put("/influ/update", influencerController.updateInfo);
router.post("/influ/search",influencerController.searchInfluencer);
router.get("/influ/get",influencerController.getAllInfluencer);
router.post("/influ/search-minus-point",influencerController.searchPoint);
router.post("/influ/report-influencer",influencerController.reportOfInfluencer);
router.post("/influ/get-data-history-report",influencerController.getAllHistoryReportByClient);
router.post("/influ/insert-data-history-report",influencerController.insertDataToHistoryReport);
router.post("/influ/dataReportInfluencer",influencerController.dataReportInfluencer);  
router.post("/influ/addInfluencer", influencerController.addInfluencer);
router.post("/influ/data-chart", influencerController.getDataForChart);
router.post("/influ/data-version", influencerController.getDataVersion);
router.get("/influ/get-jobs-influencer", influencerController.getJobsInfluencer);
router.get("/influ/get-images-influencer", influencerController.getImagesInfluencer);
router.get("/influ/get-booking-jobs", influencerController.getBookingJob);
router.put("/influ/accept-booking", influencerController.acceptBooking);
router.put("/influ/reject-booking", influencerController.rejectBooking);
router.post("/influ/updateAvatar", influencerController.updateAvatarInfluencer);

router.post('/client/updateClientProfile', clientController.addProfileClient);
router.post('/client/homePage', clientController.dataHomePageClient);
router.post('/client/addInflueToBooking', clientController.addInflueToBookingInClient);
router.put("/client/bookingJob", clientController.bookingJob);
router.get("/client/get-history-booking", clientController.getHistoryBooking);
router.put("/client/check-done", clientController.checkDone);
router.put("/client/send-feedback", clientController.sendFeedback);


router.get('/getalllist', listInfluencerController.GetAllList);
router.post('/getalllistbyuser', listInfluencerController.GetAllListByUser);
router.post('/getlistbyuserid', listInfluencerController.GetListByUserId);
router.post('/addlistclient', listInfluencerController.AddListClient);
router.post('/gettablekols', listInfluencerController.GetTableKOLs);
router.post('/deletelistclient', listInfluencerController.DeleteListClient);
router.post('/editnamelist', listInfluencerController.EditNameList);
router.post('/deletetablekols', listInfluencerController.DeleteTableKOLs);
router.post('/addtotablekols', listInfluencerController.AddToTableKOLs);
router.post('/deletealltable', listInfluencerController.DeleteAllTable);

//Api for MongoDB
router.post('/createClient', userController.createClient);
router.post('/createInflu', influencerController.createInflu);
router.post('/influ/getIdInfluencer', influencerController.getIdOfInflu);


module.exports = router