const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const influService = require("../../Service/Influencer/InfluencerService")
const router = express.Router();

router.put("/api/influ/update", updateInfo);
router.get("/api/influ/search",searchInfluencer)
router.get("/api/influ/get",getAllInfluencer)
auth.initialize(
	passport,
	(id) => userModels.find((user) => user.userId === id),
	(email) => userModels.find((user) => user.userEmail === email)
);

async function updateInfo(req, res, next) {
	try {
        const images = JSON.parse(req.body.image);
		const uploadedImages = [];
		for (const image of images) {
            if (image.thumbUrl) {
				const img = await cloudinary.uploader.upload(image.thumbUrl, {
					public_id: image.uid,
					resource_type: "auto",
				});
                uploadedImages.push(img.url);
			}else uploadedImages.push(img.url); 
		}
		console.log(uploadedImages);
		return res.status(200).json({
			message: "Ok",
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

async function searchInfluencer(req,res,next) {
	try{
		const {costEstimateFrom ,costEstimateTo ,ageFrom ,ageTo ,contentTopic ,nameType ,contentFormats ,audienceGender	,audienceLocation} = req.body;
		const result = await influService.searchInfluecer(costEstimateFrom ,costEstimateTo ,ageFrom ,ageTo ,contentTopic ,nameType ,contentFormats ,audienceGender	,audienceLocation)
		// console.log("DATA "+  result)
		return res.status(200).json({ 
			message: "Search thành công",
			data: result
		});
	}catch(err){
        console.log(err);
        return res.json({ message: "Lỗi ", err });
    }
}

module.exports = router;