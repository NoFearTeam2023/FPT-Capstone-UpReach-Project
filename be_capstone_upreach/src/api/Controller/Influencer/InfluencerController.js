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
        const influ = JSON.parse(req.body.influ);
		const uploadedImages = [];
		for (const image of influ.image) {
            if (image.thumbUrl) {
				const img = await cloudinary.uploader.upload(image.thumbUrl, {
					public_id: image.uid,
					resource_type: "auto",
				});
                uploadedImages.push({id:image.uid,url: img.url});
			}else uploadedImages.push({id:image.uid,url: image.url}); 
		}
		influ.image = uploadedImages


		return res.status(201).json({
			message: "Update Successfully",
			data: influ,
		});
	} catch (err) {
		return res.json({ message: " " + err });
	}
}

module.exports = router;