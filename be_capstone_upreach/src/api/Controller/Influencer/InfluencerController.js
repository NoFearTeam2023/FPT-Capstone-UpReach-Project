const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const router = express.Router();

router.put("/api/influ/update", updateInfo);

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

module.exports = router;