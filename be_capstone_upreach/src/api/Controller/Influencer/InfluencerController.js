const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const config = require("../../Config/dbConfig");
const sql = require("mssql");

const auth = require("../../Authen/auth");
const userModels = require("../User/UserController");
const influService = require("../../Service/Influencer/InfluencerService");
const { getUserByEmail } = require("../../Service/User/UserService");
const router = express.Router();
// let influ;
router.put("/api/influ/update", updateInfo);
router.post("/api/influ/search", searchInfluencer);
router.get("/api/influ/get", getAllInfluencer);
router.post("/api/influ/reportInfluencer", reportInfluencer);
router.get("/api/influ/get-jobs-influencer", getJobsInfluencer);
router.get("/api/influ/get-images-influencer", getImagesInfluencer);
router.get("/api/influ/get-audience-influencer", getAudienceInfluencer);
router.get("/api/influ/get-profile-update", getProfileInfluencer);
router.get("/api/influ/get-profile-update", getProfileInfluencer);


auth.initialize(
  passport,
  (id) => userModels.find((user) => user.userId === id),
  (email) => userModels.find((user) => user.userEmail === email)
);

async function updateInfo(req, res, next) {
  try {
    const influ = JSON.parse(req.body.influ);
    const booking = JSON.parse(req.body.booking);
    // console.log(booking);
    const chart = JSON.parse(req.body.chart);
    // console.log(chart);
    const idRemoveArray = JSON.parse(req.body.idRemove);
    const editDate = JSON.parse(req.body.editDate);
    console.log(editDate);
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
        async (error, response) => {
          if (error) {
            console.log(error);
            return res.json({ message: " " + err });
          }
          const influs = [...response.recordset];

          const filteredData = influs.find(
            (item) => item.User_ID === influ.userId
          );

          // console.log(filteredData);

          const kolsId = Math.floor(Math.random() * 100000).toString();
          const platformId = Math.floor(Math.random() * 100000).toString();
          const profileId = Math.floor(Math.random() * 100000).toString();

          await request.query(`
          BEGIN
          INSERT INTO [UpReachDB].[dbo].[PlatformInformation]
          (Platform_ID, Follow_FB, Interaction_FB, Follow_Insta, Interaction_Insta, Follow_Youtube, Interaction_Youtube, Follow_Tiktok, Interaction_Tiktok, Engagement, Postsperweek)
          VALUES ('${platformId}', '${influ.influencerFollowFb}', '${influ.influencerInteractionFb}', '${influ.influencerFollowInsta}', '${influ.influencerInteractionInsta}', '${influ.influencerFollowYoutube}', '${influ.influencerInteractionYoutube}', '${influ.influencerFollowTikTok}', '${influ.influencerInteractionTiktok}', '${influ.influencerEngagement}', '${influ.influencerPostsPerWeek}')
          END
          `);

          await request.query(`
          BEGIN
          INSERT INTO [UpReachDB].[dbo].[Profile]
          (Profile_ID, fullName, NickName, Email, Age, Phone, Gender, Bio, Address, Relationship, CostEstimateFrom, CostEstimateTo, Followers)
          VALUES ('${profileId}', N'${influ.influencerfullName}', N'${influ.influencerNickName}', '${influ.influencerEmail}', '${influ.influencerAge}', '${influ.influencerPhone}', '${influ.influencerGender}', N'${influ.influencerBio}', N'${influ.influencerAddress}', N'${influ.influencerRelationship}', '${influ.influencerCostEstimateFrom}', '${influ.influencerCostEstimateTo}', '${influ.influencerFollowers}')
          END
          `);

                    await request.query(`
            BEGIN
              INSERT INTO [UpReachDB].[dbo].[KOLs]
              (KOLs_ID, Profile_ID, Platform_ID, User_ID, isPublish, Date_edit )
              VALUES ('${kolsId}', '${profileId}', '${platformId}', '${filteredData.User_ID}', '0', '${editDate}')
            END
          `);


                    for (let i = 0; i < uploadedImages.length; i++) {
                      const imageObject = uploadedImages[i];
                      const imageId = imageObject.id;
                      const imageUrl = imageObject.url;

                      await request.query(`
              BEGIN
                INSERT INTO [UpReachDB].[dbo].[ImageKOLs]
                (Image_ID, Profile_ID, Image )
                VALUES ('${imageId}', '${profileId}', '${imageUrl}')
              END
            `);
                    }

          if (chart.dataFollower && Array.isArray(chart.dataFollower)) {
                      
                      for (let i = 0; i < chart.dataFollower.length; i++) {
                        const followerListId = Math.floor(
                          Math.random() * 100000
                        ).toString();
                        const dataFollowerObject = chart.dataFollower[i];
                        const date = dataFollowerObject.date;
                        const quantity = dataFollowerObject.value;
                        await request.query(`
          BEGIN
            INSERT INTO [UpReachDB].[dbo].[AudienceFollowerMonthList]
            (AudienceFollowerMonthList_ID, AudienceFollowerMonth, Platform_ID, Quantity )
            VALUES ('${followerListId}', '${date}', '${platformId}', '${quantity}')
          END
          `);
                      }
                    }

                    if (chart.dataGender && Array.isArray(chart.dataGender)) {
                      
                      const genderIdConvert = new Map([
                        ["Male", "AG001"],
                        ["Female", "AG002"],
                      ]);
                      for (let i = 0; i < chart.dataGender.length; i++) {
                        const genderListId = Math.floor(
                          Math.random() * 100000
                        ).toString();
                        const dataGenderObject = chart.dataGender[i];
                        const genderId = genderIdConvert.get(dataGenderObject.sex);
                        const quantity = dataGenderObject.value;

                        await request.query(`
          BEGIN
            INSERT INTO [UpReachDB].[dbo].[AudienceGenderList]
            (AudienceGenderList_ID, AudienceGenderId, Platform_ID, Quantity )
            VALUES ('${genderListId}', '${genderId}', '${platformId}', '${quantity}')
          END
          `);
                      }
                    }

                    if (chart.dataAge && Array.isArray(chart.dataAge)) {
                     
                      const ageIdConvert = new Map([
                        ["0-18", "AAI001"],
                        ["19-25", "AAI002"],
                        ["26-40", "AAI003"],
                        ["41-60", "AAI004"],
                      ]);
                      for (let i = 0; i < chart.dataAge.length; i++) {
                        const ageListId = Math.floor(Math.random() * 100000).toString();
                        const dataAgeObject = chart.dataAge[i];
                        const ageId = ageIdConvert.get(dataAgeObject.age);
                        const quantity = dataAgeObject.value;

                        await request.query(`
          BEGIN
            INSERT INTO [UpReachDB].[dbo].[AudienceAgeRangeList]
            (AudienceAgeList_ID, AudienceAge_ID, Platform_ID, Quantity )
            VALUES ('${ageListId}', '${ageId}', '${platformId}', '${quantity}')
          END
          `);
                      }
                    }

                    if (chart.dataLocation && Array.isArray(chart.dataLocation)) {
                     
                      for (let i = 0; i < chart.dataLocation.length; i++) {
                        const locationListId = Math.floor(
                          Math.random() * 100000
                        ).toString();
                        const dataLocationObject = chart.dataLocation[i];
                        const location = dataLocationObject.location;
                        const quantity = dataLocationObject.value;
                        await request.query(`
          BEGIN
            INSERT INTO [UpReachDB].[dbo].[AudienceLocationList]
            (AudienceLocationList_ID, AudienceLocation, Platform_ID, Quantity )
            VALUES ('${locationListId}', N'${location}', '${platformId}', '${quantity}')
          END
          `);
                      }
                    }

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
                       
                        BEGIN
                          INSERT INTO [UpReachDB].[dbo].[InfluencerJob]
                          (Job_Id, Name_Job, Platform_Job, CostEstimate_From_Job, CostEstimate_To_Job, Quantity, Link)
                          VALUES (@jobId${i}, @jobName${i}, @platform${i}, @costEstimateFrom${i}, @costEstimateTo${i}, @quantity${i}, @jobLink${i})
                        END
                      `);
                      if (bookingItem?.jobId) {
                        for (let j = 0; j < booking[i].formatContent?.length; j++) {
                          const formatListId = Math.floor(Math.random() * 100000).toString();

                          await request.query(`
                          BEGIN
                            INSERT INTO [UpReachDB].[dbo].[JobContentFormatList]
                            (FormatListJob_ID, Job_ID, Format_Id )
                            VALUES ('${formatListId}', '${bookingItem?.jobId}', '${booking[i].formatContent[j]}')
                          END
                        `);
                          // }
                        }
                      }
                    }

                    for (let i = 0; i < jobIds.length; i++) {
                      
                      const jobId = jobIds[i];
                      const jobListId = Math.floor(Math.random() * 100000).toString();

                      request.input("jobListId" + i, sql.VarChar, jobListId);

                      request.query(`
                        
                        BEGIN
                            INSERT INTO [UpReachDB].[dbo].[InfluencerJobList]
                            (JobList_ID, Job_ID, Profile_ID)
                            VALUES (@jobListId${i}, '${jobId}', '${profileId}')
                            END
                            `);
                    }
                    
                    for (const jobIdToRemove of idRemoveArray) {
                      request.query(`
                            DELETE FROM [UpReachDB].[dbo].[InfluencerJob]
                            WHERE Job_ID = '${jobIdToRemove}'
                          `);
                      request.query(`
                          DELETE FROM [UpReachDB].[dbo].[InfluencerJobList]
                          WHERE Job_ID = '${jobIdToRemove}'
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
    return res.status(500).json({ message: "Lỗi", err });
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

async function getJobsInfluencer(req, res, next) {
  try {
    const user = await getUserByEmail(req.query.email);
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
            (item) => item.User_ID === user.userId
          );
          request.query(
            `SELECT Job_Id FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Profile_ID = '${filteredData.Profile_ID}'`,
            async (error, queryResult) => {
              if (error) {
                console.log(error);
                return res.json({ message: " " + err });
              }
              const selectedJobs = [];
              const jobIds = queryResult.recordset;

              for (const job_Id of jobIds) {
                const jobIdToFind = job_Id.Job_Id;
                const queryResultJob = await request.query(
                  `SELECT * FROM [UpReachDB].[dbo].[InfluencerJob] WHERE Job_Id = '${jobIdToFind}'`
                );
                selectedJobs.push(queryResultJob.recordset[0]);
              }

              const selectedFormats = [];
              for (const job_Id of jobIds) {
                const jobIdToFind = job_Id.Job_Id;
                const queryResultFormat = await request.query(
                  `SELECT Format_Id FROM [UpReachDB].[dbo].[JobContentFormatList] WHERE Job_ID = '${jobIdToFind}'`
                );
                // console.log(queryResultFormat);
                selectedFormats.push({
                  Format_Id: queryResultFormat.recordset,
                  Job_Id: jobIdToFind,
                });
              }
              const result = {};

              selectedJobs.forEach((job) => {
                result[job.Job_ID] = {
                  ...job,
                  Format_Id:
                    selectedFormats
                      .find((format) => format.Job_Id === job.Job_ID)
                      ?.Format_Id?.map((item) => item.Format_Id) || [],
                };
              });

              const mergedArray = Object.values(result);
              // console.log(mergedArray);
              // console.log(selectedFormats);

              return res.status(200).json({
                message: "Get Successfully",
                data: mergedArray,
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

async function getImagesInfluencer(req, res, next) {
  try {
    const user = await getUserByEmail(req.query.email);
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
            (item) => item.User_ID === user.userId
          );

          request.query(
            `SELECT Image_ID FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Profile_ID = '${filteredData.Profile_ID}'`,
            async (error, queryResult) => {
              if (error) {
                console.log(error);
                return res.json({ message: " " + err });
              }
              // console.log('run',queryResult.recordset);
              const selectedImages = [];
              const imageIds = queryResult.recordset;

              for (const ImageId of imageIds) {
                const ImageIdToFind = ImageId.Image_ID;
                const queryResultImage = await request.query(
                  `SELECT * FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Image_ID = '${ImageIdToFind}'`
                );
                selectedImages.push(queryResultImage.recordset[0]);
              }
              return res.status(200).json({
                message: "Get Successfully",
                data: selectedImages,
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

async function getAudienceInfluencer(req, res, next) {
  try {
    const user = await getUserByEmail(req.query.email);
    sql.connect(config, async (err) => {
      if (err) {
        console.log(err);
        return res.json({ message: " " + err });
      }

      const request = new sql.Request();
      request.query(
        "SELECT * FROM [UpReachDB].[dbo].[KOLs]",
        async (error, response) => {
          if (error) {
            console.log(error);
            return res.json({ message: " " + err });
          }
          const influs = [...response.recordset];
          const filteredData = influs.find(
            (item) => item.User_ID === user.userId
          );

          const selectedFollowers = await getSelectedFollowers(
            request,
            filteredData
          );
          const selectedGenders = await getSelectedGenders(
            request,
            filteredData
          );
          const selectedAges = await getSelectedAges(request, filteredData);
          const selectedLocations = await getSelectedLocations(
            request,
            filteredData
          );

          const responseData = {
            selectedFollowers: selectedFollowers,
            selectedGenders: selectedGenders,
            selectedAges: selectedAges,
            selectedLocations: selectedLocations,
          };

          return res.status(200).json({
            message: "Get Successfully",
            data: responseData,
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: " " + err });
  }
}

async function getSelectedFollowers(request, filteredData) {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT AudienceFollowerMonth FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE Platform_ID = '${filteredData.Platform_ID}'`,
      async (error, queryResult) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        const selectedFollowers = [];
        const followers = queryResult.recordset;

        for (const follower of followers) {
          const followerToFind = follower.AudienceFollowerMonth;
          const queryResultfollower = await request.query(
            `SELECT * FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE AudienceFollowerMonth = '${followerToFind}'`
          );
          selectedFollowers.push(queryResultfollower.recordset[0]);
        }
        resolve(selectedFollowers);
      }
    );
  });
}

async function getSelectedGenders(request, filteredData) {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT AudienceGenderList.AudienceGenderList_ID, AudienceGenderList.AudienceGenderId, AudienceGender.Gender, AudienceGenderList.Platform_ID, AudienceGenderList.Quantity 
      FROM [UpReachDB].[dbo].[AudienceGenderList]
      INNER JOIN [UpReachDB].[dbo].[AudienceGender] ON AudienceGenderList.AudienceGenderId = AudienceGender.AudienceGenderId
      WHERE AudienceGenderList.Platform_ID = '${filteredData.Platform_ID}'`,
      async (error, queryResult) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        const selectedGenders = queryResult.recordset;
        resolve(selectedGenders);
      }
    );
  });
}

async function getSelectedAges(request, filteredData) {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT AudienceAgeRangeList.AudienceAgeList_ID, AudienceAgeRangeList.AudienceAge_ID, AudienceAgeRange.AgeRange, AudienceAgeRangeList.Platform_ID, AudienceAgeRangeList.Quantity 
      FROM [UpReachDB].[dbo].[AudienceAgeRangeList]
      INNER JOIN [UpReachDB].[dbo].[AudienceAgeRange] ON AudienceAgeRangeList.AudienceAge_ID = AudienceAgeRange.AudienceAge_ID
      WHERE AudienceAgeRangeList.Platform_ID = '${filteredData.Platform_ID}'`,
      async (error, queryResult) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        const selectedAges = queryResult.recordset;
        resolve(selectedAges);
      }
    );
  });
}

async function getSelectedFollowers(request, filteredData) {
  return new Promise((resolve, reject) => {
    request.query(
      `SELECT AudienceLocation FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE Platform_ID = '${filteredData.Platform_ID}'`,
      async (error, queryResult) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        const selectedLocations = [];
        const locations = queryResult.recordset;

        for (const location of locations) {
          const locationToFind = location.AudienceLocation;
          const queryResultLocation = await request.query(
            `SELECT * FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE AudienceLocation = N'${locationToFind}'`
          );
          selectedLocations.push(queryResultLocation.recordset[0]);
        }
        resolve(selectedLocations);
      }
    );
  });
}

async function getProfileInfluencer(req, res, next) {
  try {
    const user = await getUserByEmail(req.query.email);
    sql.connect(config, (err) => {
      if (err) {
        console.log(err);
        return res.json({ message: " " + err });
      }

      const request = new sql.Request();

      request.query(
        `SELECT * FROM [UpReachDB].[dbo].[KOLs] WHERE User_ID = '${user.userId}'`,
        async (error, response) => {
          if (error) {
            console.log(error);
            return res.json({ message: " " + err });
          }
          const influs = [...response.recordset];
          let dataReturn = []
          for (let influ of influs) {
            const  selectedPlatforms = await request.query(
              `BEGIN
              SELECT * FROM [UpReachDB].[dbo].[PlatformInformation] WHERE Platform_ID = '${influ.Platform_ID}'
            END`
            );
            const selectedProfiles = await request.query(
              `BEGIN
              SELECT * FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${influ.Profile_ID}'
            END`
            );
            // console.log(selectedProfiles.recordsets[0][0], selectedPlatforms.recordsets[0][0]);
            dataReturn = [...dataReturn,  {id: influ.User_ID , ...selectedProfiles.recordsets[0][0], ...selectedPlatforms.recordsets[0][0]}];

          }
          return res.status(200).json({
            message: "Get Successfully",
            data: dataReturn,
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: " " + err });
  }
}


module.exports = router;

          //           request.query(
          //             `
          //       UPDATE [UpReachDB].[dbo].[Profile]
          //       SET CostEstimateFrom = ${influ.influencerCostEstimateFrom},
          //           CostEstimateTo = ${influ.influencerCostEstimateTo},
          //       Followers = ${influ.influencerFollowers}

          //       WHERE Profile_ID = '${filteredData.Profile_ID}'
          //     `
          //           );

          //           request.query(
          //             `
          //       UPDATE [UpReachDB].[dbo].[PlatformInformation]
          //       SET Follow_FB = ${influ.influencerFollowFb},
          //     Interaction_FB = ${influ.influencerInteractionFb},
          //     Follow_Insta = ${influ.influencerFollowInsta},
          //     Interaction_Insta = ${influ.influencerInteractionInsta},
          //     Follow_Youtube = ${influ.influencerFollowYoutube},
          //     Interaction_Youtube = ${influ.influencerInteractionYoutube},
          //     Follow_TikTok = ${influ.influencerFollowTikTok},
          //     Interaction_Tiktok = ${influ.influencerInteractionTiktok},
          //     Engagement = ${influ.influencerEngagement},
          //     PostsPerWeek = ${influ.influencerPostsPerWeek}
          //       WHERE Platform_ID = '${filteredData.Platform_ID}'
          //     `
          //           );

          //           // console.log('run',uploadedImages);

          //           await request.query(`
          //   DELETE FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Profile_ID = '${filteredData.Profile_ID}'
          // `);

          //           for (let i = 0; i < uploadedImages.length; i++) {
          //             const imageObject = uploadedImages[i];
          //             const imageId = imageObject.id;
          //             const imageUrl = imageObject.url;

          //             await request.query(`
          //     BEGIN
          //       INSERT INTO [UpReachDB].[dbo].[ImageKOLs]
          //       (Image_ID, Profile_ID, Image )
          //       VALUES ('${imageId}', '${filteredData.Profile_ID}', '${imageUrl}')
          //     END
          //   `);
          //           }

          //           if (chart.dataFollower && Array.isArray(chart.dataFollower)) {
          //             await request.query(`
          //           DELETE FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE Platform_ID = '${filteredData.Platform_ID}'
          //           `);
          //             for (let i = 0; i < chart.dataFollower.length; i++) {
          //               const followerListId = Math.floor(
          //                 Math.random() * 100000
          //               ).toString();
          //               const dataFollowerObject = chart.dataFollower[i];
          //               const date = dataFollowerObject.date;
          //               const quantity = dataFollowerObject.value;
          //               await request.query(`
          // BEGIN
          //   INSERT INTO [UpReachDB].[dbo].[AudienceFollowerMonthList]
          //   (AudienceFollowerMonthList_ID, AudienceFollowerMonth, Platform_ID, Quantity )
          //   VALUES ('${followerListId}', '${date}', '${filteredData.Platform_ID}', '${quantity}')
          // END
          // `);
          //             }
          //           }

          //           if (chart.dataGender && Array.isArray(chart.dataGender)) {
          //             await request.query(`
          //           DELETE FROM [UpReachDB].[dbo].[AudienceGenderList] WHERE Platform_ID = '${filteredData.Platform_ID}'
          //           `);
          //             const genderIdConvert = new Map([
          //               ["Male", "AG001"],
          //               ["Female", "AG002"],
          //             ]);
          //             for (let i = 0; i < chart.dataGender.length; i++) {
          //               const genderListId = Math.floor(
          //                 Math.random() * 100000
          //               ).toString();
          //               const dataGenderObject = chart.dataGender[i];
          //               const genderId = genderIdConvert.get(dataGenderObject.sex);
          //               const quantity = dataGenderObject.value;

          //               await request.query(`
          // BEGIN
          //   INSERT INTO [UpReachDB].[dbo].[AudienceGenderList]
          //   (AudienceGenderList_ID, AudienceGenderId, Platform_ID, Quantity )
          //   VALUES ('${genderListId}', '${genderId}', '${filteredData.Platform_ID}', '${quantity}')
          // END
          // `);
          //             }
          //           }

          //           if (chart.dataAge && Array.isArray(chart.dataAge)) {
          //             await request.query(`
          //           DELETE FROM [UpReachDB].[dbo].[AudienceAgeRangeList] WHERE Platform_ID = '${filteredData.Platform_ID}'
          //           `);
          //             const ageIdConvert = new Map([
          //               ["0-18", "AAI001"],
          //               ["19-25", "AAI002"],
          //               ["26-40", "AAI003"],
          //               ["41-60", "AAI004"],
          //             ]);
          //             for (let i = 0; i < chart.dataAge.length; i++) {
          //               const ageListId = Math.floor(Math.random() * 100000).toString();
          //               const dataAgeObject = chart.dataAge[i];
          //               const ageId = ageIdConvert.get(dataAgeObject.age);
          //               const quantity = dataAgeObject.value;

          //               await request.query(`
          // BEGIN
          //   INSERT INTO [UpReachDB].[dbo].[AudienceAgeRangeList]
          //   (AudienceAgeList_ID, AudienceAge_ID, Platform_ID, Quantity )
          //   VALUES ('${ageListId}', '${ageId}', '${filteredData.Platform_ID}', '${quantity}')
          // END
          // `);
          //             }
          //           }

          //           if (chart.dataLocation && Array.isArray(chart.dataLocation)) {
          //             await request.query(`
          //           DELETE FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE Platform_ID = '${filteredData.Platform_ID}'
          //           `);
          //             for (let i = 0; i < chart.dataLocation.length; i++) {
          //               const locationListId = Math.floor(
          //                 Math.random() * 100000
          //               ).toString();
          //               const dataLocationObject = chart.dataLocation[i];
          //               const location = dataLocationObject.location;
          //               const quantity = dataLocationObject.value;
          //               await request.query(`
          // BEGIN
          //   INSERT INTO [UpReachDB].[dbo].[AudienceLocationList]
          //   (AudienceLocationList_ID, AudienceLocation, Platform_ID, Quantity )
          //   VALUES ('${locationListId}', N'${location}', '${filteredData.Platform_ID}', '${quantity}')
          // END
          // `);
          //             }
          //           }

          //           const jobIds = [];
          //           for (let i = 0; i < booking.length; i++) {
          //             const bookingItem = booking[i];
          //             const jobId = Math.floor(Math.random() * 100000).toString();
          //             jobIds.push(jobId);

          //             request.input("jobId" + i, sql.VarChar, jobId);
          //             request.input("jobName" + i, sql.VarChar, bookingItem.jobName);
          //             request.input("platform" + i, sql.VarChar, bookingItem.platform);
          //             request.input(
          //               "costEstimateFrom" + i,
          //               sql.Float,
          //               bookingItem.costEstimateFrom
          //             );
          //             request.input(
          //               "costEstimateTo" + i,
          //               sql.Float,
          //               bookingItem.costEstimateTo
          //             );
          //             request.input("quantity" + i, sql.Int, bookingItem.quantity);
          //             request.input("jobLink" + i, sql.VarChar, bookingItem.jobLink);

          //             request.query(`
          //               IF NOT EXISTS (SELECT 1 FROM [UpReachDB].[dbo].[InfluencerJob] WHERE Job_ID = ${
          //                 bookingItem?.jobId || null
          //               })
          //               BEGIN
          //                 INSERT INTO [UpReachDB].[dbo].[InfluencerJob]
          //                 (Job_Id, Name_Job, Platform_Job, CostEstimate_From_Job, CostEstimate_To_Job, Quantity, Link)
          //                 VALUES (@jobId${i}, @jobName${i}, @platform${i}, @costEstimateFrom${i}, @costEstimateTo${i}, @quantity${i}, @jobLink${i})
          //               END
          //               ELSE
          //               BEGIN
          //                 UPDATE [UpReachDB].[dbo].[InfluencerJob]
          //                 SET Name_Job = @jobName${i}, Platform_Job = @platform${i}, CostEstimate_From_Job = @costEstimateFrom${i}, CostEstimate_To_Job = @costEstimateTo${i}, Quantity = @quantity${i}, Link = @jobLink${i}
          //                 WHERE Job_ID = ${bookingItem?.jobId || null}
          //               END
          //             `);
          //             if (bookingItem?.jobId) {
          //               await request.query(`
          //             DELETE FROM [UpReachDB].[dbo].[JobContentFormatList] WHERE Job_ID = '${bookingItem?.jobId}'
          //                 `);
          //               for (let j = 0; j < booking[i].formatContent?.length; j++) {
          //                 const formatListId = Math.floor(
          //                   Math.random() * 100000
          //                 ).toString();

          //                 await request.query(`
          //                 BEGIN
          //                   INSERT INTO [UpReachDB].[dbo].[JobContentFormatList]
          //                   (FormatListJob_ID, Job_ID, Format_Id )
          //                   VALUES ('${formatListId}', '${bookingItem?.jobId}', '${booking[i].formatContent[j]}')
          //                 END
          //               `);
          //                 // }
          //               }
          //             }
          //           }

          //           for (let i = 0; i < jobIds.length; i++) {
          //             const bookingItem = booking[i];
          //             const jobId = jobIds[i];
          //             const jobListId = Math.floor(Math.random() * 100000).toString();

          //             request.input("jobListId" + i, sql.VarChar, jobListId);

          //             request.query(`
          //               IF NOT EXISTS (SELECT 1 FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Job_ID = ${
          //                 bookingItem?.jobId || null
          //               })
          //               BEGIN
          //                   INSERT INTO [UpReachDB].[dbo].[InfluencerJobList]
          //                   (JobList_ID, Job_ID, Profile_ID)
          //                   VALUES (@jobListId${i}, '${jobId}', '${
          //               filteredData.Profile_ID
          //             }')
          //                   END
          //                   `);
          //           }
          //           for (const jobIdToRemove of idRemoveArray) {
          //             request.query(`
          //                   DELETE FROM [UpReachDB].[dbo].[InfluencerJob]
          //                   WHERE Job_ID = '${jobIdToRemove}'
          //                 `);
          //             request.query(`
          //                 DELETE FROM [UpReachDB].[dbo].[InfluencerJobList]
          //                 WHERE Job_ID = '${jobIdToRemove}'
          //               `);
          //           }
