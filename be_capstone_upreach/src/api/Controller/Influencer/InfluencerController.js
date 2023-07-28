const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const influService = require("../../Service/Influencer/InfluencerService")
const router = express.Router();

router.put("/api/influ/update", updateInfo);
router.post("/api/influ/search",searchInfluencer)
router.get("/api/influ/get",getAllInfluencer)
router.post("/api/influ/reportInfluencer",reportInfluencer)
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
				return res.status(200).json({
				message: "Search thành công",
				data: infoInfluencer
			});
		} else {
			return res.json({ message: "Update Thất bại" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Lỗi", err }); // Sending an error response with status 500
	}
}



module.exports = router;