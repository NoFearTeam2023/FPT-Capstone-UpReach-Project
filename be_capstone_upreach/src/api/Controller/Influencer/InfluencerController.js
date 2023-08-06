const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const influService = require("../../Service/Influencer/InfluencerService")
const common = require("../../../../common/common")
const router = express.Router();

router.put("/api/influ/update", updateInfo);
router.post("/api/influ/search",searchInfluencer)
router.get("/api/influ/get",getAllInfluencer)
router.post("/api/influ/reportInfluencer",reportInfluencer)
router.post("/api/influ/dataReportInfluencer",dataReportInfluencer) // get data for Report Page for user is influencer

auth.initialize(
	passport,
	(id) => userModels.find((user) => user.userId === id),
	(email) => userModels.find((user) => user.userEmail === email)
);

async function updateInfo(req, res, next) {
	try {
        const influ = JSON.parse(req.body.influ);
		const uploadedImages = [];
		for (const image of influ.Image) {
            if (image.thumbUrl) {
				const img = await cloudinary.uploader.upload(image.thumbUrl, {
					public_id: image.uid,
					resource_type: "auto",
				});
                uploadedImages.push({userId: influ.userId, id:image.uid, url: img.url});
			}else uploadedImages.push({userId: influ.userId,id:image.uid, url: image.url}); 
		}
		influ.Image = uploadedImages
		console.log(influ);

		return res.status(201).json({
			message: "Update Successfully",
			data: influ,
		});
	} catch (err) {
		return res.json({ message: " " + err });
	}
}

async function getAllInfluencer(req,res,next) {
	try{
		const result = await influService.getAllInfluencer()
		if(!result){
			console.log('FAILS');
			return res.json({message :'Fails '});
		}
		return res.status(200).json({ 
			message: "Search thành công",
			data: result
		});
	}catch(err){
        console.log(err);
        return res.json({ message: "Lỗi ", err });
    }
}

async function searchInfluencer(req, res, next) {
	try {
	const { clientId, pointSearch, costEstimateFrom, costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation } = req.body;

	const updatePointSearch = await influService.updatePointSearch(clientId, pointSearch);
	if (updatePointSearch.rowsAffected) {
		const result = await influService.searchInfluencer(costEstimateFrom, costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation);
			return res.status(200).json({
			message: "Search thành công",
			data: result
		});
	} else {
		return res.json({ message: "Update Thất bại" });
	}
	} catch (err) {
	console.log(err);
	return res.status(500).json({ message: "Lỗi", err }); // Sending an error response with status 500
	}
}

async function reportInfluencer(req, res, next) {
	try {
		const {email,clientId,pointReport} = req.body;
		const updatePointReport = await influService.updatePointReport(clientId, pointReport);
		if (updatePointReport.rowsAffected) {
			const infoInfluencer = await influService.getAllInfluencerByEmail(email);
			const data = common.formatResponseInfluencerToObject(infoInfluencer)
				return res.status(200).json({
				message: "Search thành công",
				data: data
			});
		} else {
			return res.json({ message: "Update Thất bại" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Lỗi", err }); // Sending an error response with status 500
	}
}

async function dataReportInfluencer(req,res, next){
	try {
        const {userId, email,role} = req.body
        const infoInfluencer = await influService.getAllInfluencerByEmail(email);
		const data = common.formatResponseInfluencerToArray(infoInfluencer)
        return res.json({ 
            Influencer : data
            })
    } catch (error) {
        return res.json({message : 'Lỗi ' + error});
    }
}

async function addInfluencer(req,res, next){
	try {
		const {} = req.body.contentDetails
		const {nickname,location, gender,age,intro,type,relationship} = req.body.informationDetails
		const {email,phone,engagement,post,costfrom,costTo} = req.body.overviewDetails
		const {instagramLink,instagramFollower,facebookLink, facebookFollower,youtubeLink,youtubeFollower,tiktokLink,tiktokFollower} = req.body.socialDetails

		const {contentDetails,informationDetails,overviewDetails,socialDetails} = req.body
		return res.json({data : req.body})

        const {  } = req.body;

        if (!await addInfluencerProfile(fullName,nickName,email,age,phone,gender,bio,address,relationship,costEstimateFrom,costEstimateTo,followers,topicsId,formatId,typeId)) {
            return res.json({ status: 'False', message: 'Insert Data Profile Fails' });
        }
        
        if (!await addInfluencerPlatformInfomation(linkFB,linkInsta,linkTiktok,linkYoutube,followFB,followInsta,followTikTok,followYoutube,InteractionFB,InteractionInsta,InteractionTiktok,InteractionYoutube,engagement,postsPerWeek,audienceAgeId,quantityAudienceAgeRange,audienceGenderId,quantityGenderList,audienceFollowerMonthId,quantityFollowerMonth,audienceLocationId,quantityLocationList)) {
            return res.json({ status: 'False', message: 'Insert Data PlatformInfomation Fails' });
        }

        if (!await addInfluencerKols(userId,isPublish,dateEdit)) {
            return res.json({ status: 'False', message: 'Insert Data Kols Fails' });
        }
        
        // Nếu tất cả các thao tác trước đó thành công, gửi phản hồi thành công
        return res.json({ status: 'True', message: 'Insert Success Influencer' });

    } catch (err) {
        // Xử lý lỗi
        console.error(err);
        res.json({ status: 'False', message: 'Lỗi' });
    }
}

async function addInfluencerProfile(req,res, next){
	try{
        
        // Thực hiện insert
        const checkAddInfluencerProfile = await influService.insertInfluencerProfile(fullName,nickName,email,age,phone,gender,bio,address,relationship,costEstimateFrom,costEstimateTo,followers,topicsId,formatId,typeId)
        if(checkAddInfluencerProfile.rowsAffected[0]){
            return true;
        } else {
            return false;
        }
        
    }catch(e){
        return res.json({status : 'False', message: "Lỗi chạy lệnh InsertPointRemained ", err });
    }
}

async function addInfluencerPlatformInfomation(req,res, next){
	try{
        
        // Thực hiện insert
        const checkAddInfluencerPlatformInfomation = await influService.insertInfluencerPlatformInformation(linkFB,linkInsta,linkTiktok,linkYoutube,followFB,followInsta,followTikTok,followYoutube,InteractionFB,InteractionInsta,InteractionTiktok,InteractionYoutube,engagement,postsPerWeek,audienceAgeId,quantityAudienceAgeRange,audienceGenderId,quantityGenderList,audienceFollowerMonthId,quantityFollowerMonth,audienceLocationId,quantityLocationList)
        if(checkAddInfluencerPlatformInfomation.rowsAffected[0]){
            return true;
        } else {
            return false;
        }
        
    }catch(e){
        return res.json({status : 'False', message: "Lỗi chạy lệnh InsertPointRemained ", err });
    }
}

async function addInfluencerKols(req,res,next){
	try{
        
        // Thực hiện insert
        const checkAddInfluencerKols = await influService.insertKols(userId,isPublish,dateEdit)
        if(checkAddInfluencerKols.rowsAffected[0]){
            return true;
        } else {
            return false;
        }
        
    }catch(e){
        return res.json({status : 'False', message: "Lỗi chạy lệnh InsertPointRemained ", err });
    }
}



// module.exports = router;
module.exports ={updateInfo, searchInfluencer, getAllInfluencer, reportInfluencer, dataReportInfluencer,addInfluencer}
