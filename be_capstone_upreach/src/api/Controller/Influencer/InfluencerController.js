  const express = require("express");
  const passport = require("passport");
  const cloudinary = require("cloudinary").v2;
  const config = require("../../Config/dbConfig");
  const sql = require("mssql");

  const auth = require("../../Authen/auth");
  const userModels = require("../User/UserController");
  const influService = require("../../Service/Influencer/InfluencerService");
  const router = express.Router();
  let influ;
  router.put("/api/influ/update", updateInfo);
  router.post("/api/influ/search", searchInfluencer);
  router.get("/api/influ/get", getAllInfluencer);
  router.post("/api/influ/reportInfluencer", reportInfluencer);
  router.get("/api/influ/get-jobs-influencer", getJobsInfluencer);

  auth.initialize(
    passport,
    (id) => userModels.find((user) => user.userId === id),
    (email) => userModels.find((user) => user.userEmail === email)
  );

  async function updateInfo(req, res, next) {
    try {
      const influ = JSON.parse(req.body.influ);
      const booking = JSON.parse(req.body.booking);
      const uploadedImages = [];
      if (influ.Image) {
        for (const image of influ.Image) {
          if (image.thumbUrl) {
            const img = await cloudinary.uploader.upload(image.thumbUrl, {
              public_id: image.uid,
              resource_type: "auto",
            });
            uploadedImages.push({
              userId: influ.userId,
              id: image.uid,
              url: img.url,
            });
          } else
            uploadedImages.push({
              userId: influ.userId,
              id: image.uid,
              url: image.url,
            });
        }
        influ.Image = uploadedImages;
      }

      sql.connect(config, (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        request.query(
          "SELECT * FROM [UpReachDB].[dbo].[KOLs]",
          (error, response) => {
            if (error) {
              console.log(error);
              return res.json({ message: " " + err });
            }
            const influs = [...response.recordset];

            const filteredData = influs.find(
              (item) => item.User_ID === influ.userId
            );

            console.log(filteredData);
            request.query(
              `
      UPDATE [UpReachDB].[dbo].[Profile] 
      SET CostEstimateFrom = ${influ.influencerCostEstimateFrom}, 
          CostEstimateTo = ${influ.influencerCostEstimateTo},
      Followers = ${influ.influencerFollowers}

      WHERE Profile_ID = '${filteredData.Profile_ID}'
    `
            );

            request.query(
              `
      UPDATE [UpReachDB].[dbo].[PlatformInformation] 
      SET Follow_FB = ${influ.influencerFollowFb}, 
    Interaction_FB = ${influ.influencerInteractionFb},
    Follow_Insta = ${influ.influencerFollowInsta},
    Interaction_Insta = ${influ.influencerInteractionInsta},
    Follow_Youtube = ${influ.influencerFollowYoutube},
    Interaction_Youtube = ${influ.influencerInteractionYoutube},
    Follow_TikTok = ${influ.influencerFollowTikTok},
    Interaction_Tiktok = ${influ.influencerInteractionTiktok},
    Engagement = ${influ.influencerEngagement},
    PostsPerWeek = ${influ.influencerPostsPerWeek}	
      WHERE Platform_ID = '${filteredData.Platform_ID}'
    `
            );

            const jobIds = [];

            for (let i = 0; i < booking.length; i++) {
              const bookingItem = booking[i];
              const jobId = Math.floor(Math.random() * 100000).toString();

              jobIds.push(jobId);

              request.input("jobId" + i, sql.VarChar, jobId);
              request.input("jobName" + i, sql.VarChar, bookingItem.jobName);
              request.input("platform" + i, sql.VarChar, bookingItem.platform);
              request.input(
                "costEstimateFrom" + i,
                sql.Float,
                bookingItem.costEstimateFrom
              );
              request.input(
                "costEstimateTo" + i,
                sql.Float,
                bookingItem.costEstimateTo
              );
              request.input("quantity" + i, sql.Int, bookingItem.quantity);
              request.input("jobLink" + i, sql.VarChar, bookingItem.jobLink);

              request.query(`
              IF NOT EXISTS (SELECT 1 FROM [UpReachDB].[dbo].[InfluencerJob] WHERE Job_Id = @jobId${i})
              BEGIN
                INSERT INTO [UpReachDB].[dbo].[InfluencerJob]
                (Job_Id, Name_Job, Platform_Job, CostEstimate_From_Job, CostEstimate_To_Job, Quantity, Link)
                VALUES (@jobId${i}, @jobName${i}, @platform${i}, @costEstimateFrom${i}, @costEstimateTo${i}, @quantity${i}, @jobLink${i})
              END
              ELSE
              BEGIN
                UPDATE [UpReachDB].[dbo].[InfluencerJob]
                SET Name_Job = @jobName${i}, Platform_Job = @platform${i}, CostEstimate_From_Job = @costEstimateFrom${i}, CostEstimate_To_Job = @costEstimateTo${i}, Quantity = @quantity${i}, Link = @jobLink${i}
                WHERE Job_Id = @jobId${i}
              END
            `);
            }

            for (let i = 0; i < jobIds.length; i++) {
              const jobId = jobIds[i];
              const jobListId = Math.floor(Math.random() * 100000).toString();

              request.input("jobListId" + i, sql.VarChar, jobListId);

              request.query(`
                  INSERT INTO [UpReachDB].[dbo].[InfluencerJobList]
                  (JobList_ID, Job_ID, Profile_ID)
                  VALUES (@jobListId${i}, '${jobId}', '${filteredData.Profile_ID}')
                `);
            }

            return res.status(201).json({
              message: "Update Successfully",
              data: influs,
            });
          }
        );
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function getAllInfluencer(req, res, next) {
    try {
      const result = await influService.getAllInfluencer();
      if (!result) {
        console.log("FAILS");
        return res.json({ message: "Fails " });
      }
      return res.status(200).json({
        message: "Search thành công",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: "Lỗi ", err });
    }
  }

  async function searchInfluencer(req, res, next) {
    try {
      const {
        clientId,
        pointSearch,
        costEstimateFrom,
        costEstimateTo,
        ageFrom,
        ageTo,
        contentTopic,
        nameType,
        contentFormats,
        audienceGender,
        audienceLocation,
      } = req.body;

      const updatePointSearch = await influService.updatePointSearch(
        clientId,
        pointSearch
      );
      if (updatePointSearch.rowsAffected) {
        const result = await influService.searchInfluencer(
          costEstimateFrom,
          costEstimateTo,
          ageFrom,
          ageTo,
          contentTopic,
          nameType,
          contentFormats,
          audienceGender,
          audienceLocation
        );
        return res.status(200).json({
          message: "Search thành công",
          data: result,
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
      const { email, clientId, pointReport } = req.body;
      const updatePointReport = await influService.updatePointReport(
        clientId,
        pointReport
      );
      if (updatePointReport.rowsAffected) {
        const infoInfluencer = await influService.getAllInfluencerByEmail(email);
        return res.status(200).json({
          message: "Search thành công",
          data: infoInfluencer,
        });
      } else {
        return res.json({ message: "Update Thất bại" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Lỗi", err });
    }
  }

  // async function checkJobExistsInList(request, profileId, jobId) {
  //   return new Promise((resolve, reject) => {
  //     console.log(profileId);
  //     request.query(
  //       `
  //       SELECT COUNT(*) AS JobCount
  //       FROM [UpReachDB].[dbo].[InfluencerJobList]
  //       WHERE Profile_ID = '${profileId}' AND Job_ID = '${jobId}'
  //       `,
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           resolve(false); // Assume the job doesn't exist if there's an error
  //         } else {
  //           const jobCount = result.recordset[0].JobCount;
  //           resolve(jobCount > 0);
  //         }
  //       }
  //     );
  //   });
  // }

  async function getJobsInfluencer(req, res, next) {
    try {
      const {influencerId} = req.body;
      console.log(influencerId);
      sql.connect(config, (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        request.query(
          "SELECT * FROM [UpReachDB].[dbo].[KOLs]",
          (error, response) => {
            if (error) {
              console.log(error);
              return res.json({ message: " " + err });
            }
            const influs = [...response.recordset];
            const filteredData = influs.find(
              (item) => item.User_ID === influ.userId
            );
            console.log(filteredData);
            request.query(
              `SELECT Job_Id FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Profile_ID = '${filteredData.Profile_ID}'`,
              (error, queryResult) => {
                if (error) {
                  console.log(error);
                  return res.json({ message: " " + err });
                }
                const jobs = queryResult.recordset;
                return res.status(201).json({
                  message: "Update Successfully",
                  data: jobs,
                });
              }
            );
          }
        );
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  module.exports = router;
