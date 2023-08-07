const express = require('express');
const router = express.Router();

const influencerController = require('../Controller/Influencer/InfluencerController')
const clientController = require('../Controller/Client/clientController')
const userController = require('../Controller/User/UserController')
const listInfluencerController = require('../Controller/ListInfluencer/ListInfluencerController')
const adminController = require('../Controller/Admin/AdminController')


router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/confirm', userController.confirmRegister);
router.post('/logout', userController.logout);


router.get("/admin/get-influ-report", adminController.getInfluReport);
router.get("/admin/get-approve-report", adminController.getApproveReport);
router.post("/admin/approve-report", adminController.postApproveReport);


router.put("/influ/update", influencerController.updateInfo);
router.post("/influ/search",influencerController.searchInfluencer);
router.get("/influ/get",influencerController.getAllInfluencer);
router.post("/influ/reportInfluencer",influencerController.reportInfluencer);
router.post("/influ/dataReportInfluencer",influencerController.dataReportInfluencer);
// router.get("/influ/get-jobs-influencer", influencerController.getJobsInfluencer);
// router.get("/influ/get-images-influencer", influencerController.getImagesInfluencer);
// router.get("/influ/get-audience-influencer", influencerController.getAudienceInfluencer);

router.post('/client/updateClientProfile', clientController.updateProfileClient);
router.post('/client/homePage', clientController.dataHomePageClient)

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

module.exports = router