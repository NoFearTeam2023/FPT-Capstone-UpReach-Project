const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const influService = require("../../Service/Influencer/InfluencerService")
const userService = require("../../Service/User/UserService")
const common = require("../../../../common/common");
const influModel = require("../../Model/MogooseSchema/influModel");
const router = express.Router();


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
				uploadedImages.push({ userId: influ.userId, id: image.uid, url: img.url });
			} else uploadedImages.push({ userId: influ.userId, id: image.uid, url: image.url });
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

async function getAllInfluencer(req, res, next) {
	try {
		const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)
		console.log("page " + page)
		console.log("limit " + limit)
		const startIndex = (page - 1) * limit
		const endIndex = page * limit
		const result = await influService.getAllInfluencer()
		if (!result) {
			return res.json({ message: 'Fails ' });
		}
		const JsonData = {}
		JsonData.data = result.slice(startIndex, endIndex)
		JsonData.TotalPage = result.length / 12 > parseInt(result.length / 12) ? parseInt(result.length / 12) + 1 : parseInt(result.length / 12)
		if (endIndex < result.length) {
			JsonData.next = {
				page: page + 1,
				limit: limit
			}
		}
		if (startIndex > 0) {
			JsonData.previous = {
				page: page - 1,
				limit: limit
			}
		}
		return res.json({ JsonData: JsonData })
	} catch (err) {
		console.log(err);
		return res.json({ message: "Lỗi ", err });
	}
}

async function searchInfluencer(req, res, next) {
	try {
		const { clientId, pointSearch, costEstimateFrom, costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation, followerFrom, followerTo, postsPerWeekFrom, postsPerWeekTo, engagementTo, engagementFrom, audienceAge } = req.body;
		// Update lại điểm khi search thông tin Influencer
		// const updatePointSearch = await influService.updatePointSearch(clientId, pointSearch);
		// if (updatePointSearch.rowsAffected) {
		// const result = await influService.searchInfluencer(costEstimateFrom, costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation,followerFrom,followerTo,postsPerWeekFrom,postsPerWeekTo,engagementTo,engagementFrom);
		// 	return res.status(200).json({
		// 	message: "Search thành công",
		// 	data: result
		// });
		// } else {
		// 	return res.json({ message: "Update Thất bại" });
		// }
		const result = await influService.searchInfluencer(costEstimateFrom, costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation, followerFrom, followerTo, postsPerWeekFrom, postsPerWeekTo, engagementTo, engagementFrom, audienceAge);
		return res.status(200).json({
			message: "Search thành công",
			data: result
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Lỗi", err }); // Sending an error response with status 500
	}
}
// Trừ điểm khi xem Thông tin của Influencer tại HomePage
async function reportInfluencer(req, res, next) {
	try {
		const { email, clientId, pointReport } = req.body;
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
		return res.status(500).json({ message: "Lỗi", err });
	}
}

async function dataReportInfluencer(req, res, next) {
	try {
		const { userId, email, role } = req.body
		const infoInfluencer = await influService.getAllInfluencerByEmail(email);
		const data = common.formatResponseInfluencerToArray(infoInfluencer)
		return res.json({
			Influencer: data
		})
	} catch (error) {
		return res.json({ message: 'Lỗi ' + error });
	}
}


async function addInfluencer(req, res, next) {
	try {
		const image = req.body.image[0]
		const uploadedImages = [];
		if (image.thumbUrl) {
			const img = await cloudinary.uploader.upload(image.thumbUrl, {
				public_id: image.uid,
				resource_type: "auto",
			});
			uploadedImages.push({ userId: image.userId, id: image.uid, url: img.url });
		} else uploadedImages.push({ userId: image.userId, id: image.uid, url: image.url });
		const { nickname, location, gender, age, intro, typeId, relationship } = req.body.informationDetails
		const { emailContact, phone, engagement, post, costfrom, costTo } = req.body.overviewDetails
		const { instagramLink, instagramFollower, facebookLink, facebookFollower, youtubeLink, youtubeFollower, tiktokLink, tiktokFollower } = req.body.socialDetails
		const idInflu = req.body.idInflu;
		const followers = instagramFollower + facebookFollower + youtubeFollower + tiktokFollower
		const { name, email } = req.body.influencerDetail
		const user = await userService.getUserByEmail(email);
		const now = new Date();
		const dateNow = now.toISOString();
		if (!await addInfluencerProfile(name, nickname, emailContact, age, phone, gender, intro, location, uploadedImages.url, relationship, costfrom, costTo, followers, typeId)) {
			return res.json({ status: 'False', message: 'Insert Data Profile Fails' });
		}
		if (!await addDataToContentTopic(req.body.contentDetails)) {
			return res.json({ status: 'False', message: 'Insert Data To TopicContent Fails' });
		}
		if (!await addInfluencerPlatformInfomation(facebookLink, instagramLink, tiktokLink, youtubeLink, facebookFollower, instagramFollower, tiktokFollower, youtubeFollower, engagement, post)) {
			return res.json({ status: 'False', message: 'Insert Data PlatformInfomation Fails' });
		}

		if (!await addInfluencerKols(user.userId, 0, dateNow)) {
			return res.json({ status: 'False', message: 'Insert Data Kols Fails' });
		}

		await influModel.findByIdAndUpdate(idInflu, {
			avatarImage: uploadedImages.url,
			nickname: nickname
		})
		// Nếu tất cả các thao tác trước đó thành công, gửi phản hồi thành công
		return res.json({
			status: 'True',
			message: 'Insert Success Influencer'
		});

	} catch (err) {
		// Xử lý lỗi
		res.json({ status: 'False', message: 'Lỗi' });
	}
}

async function addInfluencerProfile(fullName, nickName, email, age, phone, gender, bio, address, avatar, relationship, costEstimateFrom, costEstimateTo, followers, typeId) {
	try {

		// Thực hiện insert
		const checkAddInfluencerProfile = await influService.insertInfluencerProfile(fullName, nickName, email, age, phone, gender, bio, address, avatar, relationship, costEstimateFrom, costEstimateTo, followers, typeId)
		if (checkAddInfluencerProfile.rowsAffected[0]) {
			return true;
		} else {
			return false;
		}

	} catch (e) {
		console.log(e)
		return false;
	}
}

async function addDataToContentTopic(dataArray) {
	try {
		const checkAddDataToContentTopic = await influService.insertDatatoContentTopic(dataArray)
		if (checkAddDataToContentTopic.rowsAffected[0]) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error)
		return false;
	}
}

async function addInfluencerPlatformInfomation(linkFB, linkInsta, linkTiktok, linkYoutube, followFB, followInsta, followTikTok, followYoutube, engagement, postsPerWeek) {
	try {

		// Thực hiện insert
		const checkAddInfluencerPlatformInfomation = await influService.insertInfluencerPlatformInformation(linkFB, linkInsta, linkTiktok, linkYoutube, followFB, followInsta, followTikTok, followYoutube, engagement, postsPerWeek)
		if (checkAddInfluencerPlatformInfomation.rowsAffected[0]) {
			return true;
		} else {
			return false;
		}

	} catch (e) {
		console.log(e)
		return false;
	}
}

async function addInfluencerKols(userId, isPublish, dateEdit) {
	try {

		// Thực hiện insert
		const checkAddInfluencerKols = await influService.insertKols(userId, isPublish, dateEdit)
		if (checkAddInfluencerKols.rowsAffected[0]) {
			return true;
		} else {
			return false;
		}

	} catch (e) {
		console.log(e)
		return false;
	}
}


async function createInflu(req, res, next) {
	try {
		const { nickname, email } = req.body;
		const usernameCheck = await influModel.findOne({ nickname })
		const emailCheck = await influModel.findOne({ email })
		if (usernameCheck) {
			return res.json({ msg: "Nick name already used", status: false });
		}
		if (emailCheck) {
			return res.json({ msg: "Email already used", status: false });
		}
		const influ = await influModel.create({
			email: email,
			nickname: nickname
		});
		return res.json({ status: true, data: influ })
	}
	catch (err) {
		return res.json({ message: ' ' + err });
	}
}

async function getDataForChart(req, res, next) {
	try {
		const { influencerId } = req.body
		const response = await influService.getChartDataInfluencer(influencerId)
		const result = common.formatChartDataInfluencer(response)
		if (!response) {
			return res.json({ message: 'Fails ' });
		}
		return res.status(200).json({
			message: "get data getAllInfluencer success",
			data: result
		});
	} catch (error) {
		return res.json({ message: ' ' + error });
	}
}

async function getIdOfInflu(req, res, next) {
	try {
		const { email } = req.body
		const emailCheck = await influModel.findOne({ email })
		if (!emailCheck) {
			return res.json({ msg: "Influencer don't already", status: false });
		}
		return res.status(200).json({
			status: true,
			data: emailCheck,
		})
	} catch (error) {
		return res.json({ message: ' ' + error });
	}
}



// module.exports = router;
module.exports = { getDataForChart, updateInfo, searchInfluencer, getAllInfluencer, reportInfluencer, dataReportInfluencer, addInfluencer, createInflu, getIdOfInflu }
