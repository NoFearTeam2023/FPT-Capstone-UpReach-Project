const express = require('express');
const router = express.Router();

const influencerController = require('../Controller/Influencer/InfluencerController')
const clientController = require('../Controller/Client/clientController')
const userController = require('../Controller/User/UserController')
const listInfluencerController = require('../Controller/ListInfluencer/ListInfluencerController')


router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/confirm', userController.confirmRegister);
router.post('/logout', userController.logout);

router.put("/influ/update", influencerController.updateInfo);
router.post("/influ/search", influencerController.searchInfluencer);
router.get("/influ/get", influencerController.getAllInfluencer);
router.post("/influ/reportInfluencer", influencerController.reportInfluencer);
router.post("/influ/dataReportInfluencer", influencerController.dataReportInfluencer);
router.post("/influ/addInfluencer", influencerController.addInfluencer);

router.post('/client/updateClientProfile', clientController.addProfileClient);
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

router.post('/createClient', userController.createClient);
router.post('/createInflu', influencerController.createInflu);


module.exports = router