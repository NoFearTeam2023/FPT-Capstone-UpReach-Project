const express = require("express");
const passport = require("passport");
const config = require("../../Config/dbConfig");
const sql = require("mssql");
const influService = require("../../Service/Influencer/InfluencerService")
const userService = require('../../Service/User/UserService')
const common = require('../../../../common/common')
const { getAllInfluencer } = require("../../Service/Influencer/InfluencerService");
const router = express.Router();

// auth.initialize(
//     passport,
//     (id) => userModels.find((user) => user.userId === id),
//     (email) => userModels.find((user) => user.userEmail === email)
//   );

//----------------------------------Report Waiting Approve-------------------------


  async function getApproveReport(req, res, next) {
    try {
      const users = await getAllInfluencer();
      const userIds = users.map((item)=>item.userId)
      const uniqueIds = [...new Set(userIds)];
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        
        const request = new sql.Request();
        const approveInfos = []
        for (let userId of uniqueIds) {

          const influInfoApprove = await  request.query(`
          SELECT Top 1 * FROM [UpReachDB].[dbo].[KOLs] WHERE User_ID = '${userId}' AND isPublish = 0 ORDER BY Date_edit DESC
          `)
          if(influInfoApprove.recordset.length > 0 )
          approveInfos.push(influInfoApprove.recordset[0])
      }
      
      const filteredInfoSidebar = []
      const reportApproves = []
      for(let approveInfo of approveInfos ) {
        const infoUser = await userService.getUserById(approveInfo.User_ID);
        const infoInfluencer = await influService.getAllInfluencerByEmail(infoUser.Email);
        const data = common.formatResponseInfluencerToArray(infoInfluencer)
        const filteredInfo =  data.find((item) =>item.isPublish)
        filteredInfoSidebar.push(filteredInfo)
      
        const influUserApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[KOLs] WHERE Platform_ID = '${approveInfo.Platform_ID}' 
        `)  
        const influPlatformApprove = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[PlatformInformation] WHERE Platform_ID = '${approveInfo.Platform_ID}' 
          `)

          const influProfileApprove = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${approveInfo.Profile_ID}' 
          `)

          const influImageApprove = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Profile_ID = '${approveInfo.Profile_ID}' 
          `)
          const influAudienceFollowerApprove = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE Platform_ID = '${approveInfo.Platform_ID}' 
          `)

          const influAudienceLocationApprove = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE Platform_ID = '${approveInfo.Platform_ID}' 
          `)

          const influAudienceGenderApprove = await  request.query(`
          SELECT AudienceGenderList.AudienceGenderList_ID, AudienceGenderList.AudienceGenderId, AudienceGender.Gender, AudienceGenderList.Platform_ID, AudienceGenderList.Quantity 
      FROM [UpReachDB].[dbo].[AudienceGenderList]
      INNER JOIN [UpReachDB].[dbo].[AudienceGender] ON AudienceGenderList.AudienceGenderId = AudienceGender.AudienceGenderId
      WHERE AudienceGenderList.Platform_ID = '${approveInfo.Platform_ID}'
          `)

          const influAudienceAgeApprove = await  request.query(`
          SELECT AudienceAgeRangeList.AudienceAgeList_ID, AudienceAgeRangeList.AudienceAge_ID, AudienceAgeRange.AgeRange, AudienceAgeRangeList.Platform_ID, AudienceAgeRangeList.Quantity 
      FROM [UpReachDB].[dbo].[AudienceAgeRangeList]
      INNER JOIN [UpReachDB].[dbo].[AudienceAgeRange] ON AudienceAgeRangeList.AudienceAge_ID = AudienceAgeRange.AudienceAge_ID
      WHERE AudienceAgeRangeList.Platform_ID = '${approveInfo.Platform_ID}'
          `)



        const jobIds = await request.query(
            `SELECT Job_Id FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Profile_ID = '${approveInfo.Profile_ID}'`,
            );


            const selectedJobs = [];

              for (const job_Id of jobIds.recordset) {
                const jobIdToFind = job_Id.Job_Id;
                const queryResultJob = await request.query(
                  `SELECT * FROM [UpReachDB].[dbo].[InfluencerJob] WHERE Job_Id = '${jobIdToFind}'`
                );
                selectedJobs.push(queryResultJob.recordset[0]);
              }

              const selectedFormats = [];
              for (const job_Id of jobIds.recordset) {
                const jobIdToFind = job_Id.Job_Id;
                const queryResultFormat = await request.query(
                  `
                  SELECT * FROM [UpReachDB].[dbo].[JobContentFormatList] WHERE Job_ID = '${jobIdToFind}'
          `
                );
               
                selectedFormats.push({
                  Format_Id: queryResultFormat.recordset,
                  Job_Id: jobIdToFind,
                });
              }
              const result = {};

              selectedJobs.forEach((job) => {
                result[job?.Job_ID] = {
                  ...job,
                  Format_Id:
                    selectedFormats
                      .find((format) => format?.Job_Id === job?.Job_ID)
                      ?.Format_Id?.map((item) => item?.Format_Id) || [],
                };
              });
              
              const influJobsApprove = Object.values(result);

              const sidebarData = filteredInfoSidebar.find((item)=> item.userId === approveInfo.User_ID)
            const reportApprove = { 
              user: influUserApprove.recordset[0],
              profile:  influProfileApprove.recordset[0],
              platform: influPlatformApprove.recordset[0],
              image: influImageApprove.recordset,
              audienceFollower: influAudienceFollowerApprove.recordset,
              audienceAge:influAudienceAgeApprove.recordset,
              audienceGender:influAudienceGenderApprove.recordset,
              audienceLocation: influAudienceLocationApprove.recordset,
              jobs: influJobsApprove,
              type: sidebarData.influencerTypeName,
              topics: sidebarData.influencerContentTopicName
            }  
            reportApproves.push(reportApprove)
          }
          return res.status(200).json({
            message: "Get approve report successfully!",
            data: reportApproves
          });
          
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

//   async function dataReportAdmin(req,res,next){
//     try {
//         const {userId, email, role} = req.body
//         if(role === '2'){
//             const infoClient = await clientService.getClientByEmail(email);
//             const infoInfluencer = await influService.getAllInfluencerByPublish();
//             return res.json({ Client : infoClient, Influencer1 : infoInfluencer})
//         }
//         return res.json({ message : "Bạn không có quyền truy cập vào"})
//     } catch (error) {
//         return res.json({message : ' ' + error});
//     }
// }

  async function postApproveReport(req, res, next) {
    try {
      const {userId,kolsId,profilesId, platformsId, profile } = req.body;
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }

        const request = new sql.Request();
       

        const selectedKOLsID = await  request.query(`
        BEGIN
        SELECT KOLs_ID FROM [UpReachDB].[dbo].[KOLs] 
        WHERE User_ID = '${userId}' AND isPublish = 1
        END
        `)

        const selectedProfileID = await  request.query(`
        BEGIN
        SELECT Profile_ID FROM [UpReachDB].[dbo].[KOLs] 
        WHERE User_ID = '${userId}' AND isPublish = 1
        END
        `)
        const selectedPlatformID = await  request.query(`
        BEGIN
        SELECT Platform_ID FROM [UpReachDB].[dbo].[KOLs] 
        WHERE User_ID = '${userId}' AND isPublish = 1
        END
        `)
        const kolObject = selectedKOLsID.recordset[0];
        const kolIdObject = {...kolObject}
        const kolId = kolIdObject.KOLs_ID;
        const profileObject = selectedProfileID.recordset[0];
        const profileIdObject = {...profileObject}
        const profileId = profileIdObject.Profile_ID;
        const platformObject = selectedPlatformID.recordset[0];
        const platformIdObject = {...platformObject}
        const platformId = platformIdObject.Platform_ID;
        
        await request.query(`
        BEGIN
        UPDATE [UpReachDB].[dbo].[HistoryViewInfluencerReport] 
        SET KOLs_ID = '${kolsId}'
        WHERE KOLs_ID = '${kolId}'
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[InfluencerContentFormatsList] 
        SET Profile_ID = '${profilesId}'
        WHERE Profile_ID = '${profileId}'
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[InfluencerContentTopicsLists] 
        SET Profile_ID = '${profilesId}'
        WHERE Profile_ID = '${profileId}'
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[InfluencerTypeList] 
        SET Profile_ID = '${profilesId}'
        WHERE Profile_ID = '${profileId}'
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[ListKOLs] 
        SET KOLs_ID = '${kolsId}'
        WHERE KOLs_ID = '${kolId}'
        END

        BEGIN
        SELECT * FROM [UpReachDB].[dbo].[KOLs] 
        WHERE User_ID = '${userId}' AND isPublish = 1
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[KOLs]
        SET isPublish = 0
        WHERE User_ID = '${userId}'
        END

        BEGIN
        UPDATE [UpReachDB].[dbo].[KOLs]
        SET isPublish = 1
        WHERE KOLs_ID = '${kolsId}'
        END 
`)

        const selectedJobID = await  request.query(`
        BEGIN
        SELECT JOB_ID FROM [UpReachDB].[dbo].[InfluencerJobList] 
        WHERE Profile_ID = '${profileId}'
        END
        `)

        const jobIdObjects = selectedJobID.recordset;
        for (let jobIdObject of jobIdObjects) {
          const jobId = jobIdObject.JOB_ID;
      
          const checkQuery = `SELECT * FROM [UpReachDB].[dbo].[ClientBooking] WHERE JOB_ID = '${jobId}'`;
          const checkResult = await request.query(checkQuery);
      
          if (checkResult.recordset.length === 0) {
              const deleteQuery = `
                  BEGIN
                      DELETE FROM [UpReachDB].[dbo].[JobContentFormatList] 
                      WHERE JOB_ID = '${jobId}'
                  END
                  BEGIN
                      DELETE FROM [UpReachDB].[dbo].[InfluencerJob] 
                      WHERE JOB_ID = '${jobId}'
                  END
                  BEGIN
                      DELETE FROM [UpReachDB].[dbo].[InfluencerJobList] 
                      WHERE JOB_ID = '${jobId}'
                  END
              `;
              const deleteJobID = await request.query(deleteQuery);
              
          } else {
            const deleteQuery = `
                  BEGIN
                      DELETE FROM [UpReachDB].[dbo].[InfluencerJobList] 
                      WHERE JOB_ID = '${jobId}'
                  END
              `;
              const deleteJobID = await request.query(deleteQuery);
          }
      }
      

        const adminApprove = await  request.query(`
        
        BEGIN
        DELETE FROM [UpReachDB].[dbo].[AudienceAgeRangeList] WHERE Platform_ID = '${platformId}';
        DELETE FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE Platform_ID = '${platformId}';
        DELETE FROM [UpReachDB].[dbo].[AudienceGenderList] WHERE Platform_ID = '${platformId}';
        DELETE FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE Platform_ID = '${platformId}';
        END

        BEGIN
        DELETE FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Profile_ID = '${profileId}';
        END

        BEGIN
        DELETE FROM [UpReachDB].[dbo].[KOLs] WHERE User_ID = '${userId}' AND isPublish = 0;
        END
        
        `)
        await request.query(`
        BEGIN
        DELETE FROM [UpReachDB].[dbo].[PlatformInformation] WHERE Platform_ID = '${platformId}';
        END

        BEGIN
        DELETE FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${profileId}';
        END`)
          return res.status(200).json({
            message: "Approve successful!",
            // data: 
          });
          
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function getInfluencerAccount(req, res, next) {
    try {
      const users = await getAllInfluencer();
      const userIds = users.map((item)=>item.userId)
      const uniqueIds = [...new Set(userIds)];
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        
        const request = new sql.Request();
        const influsInfo = []
        for (let userId of uniqueIds) {

          const influInfo = await  request.query(`
          SELECT * FROM [UpReachDB].[dbo].[KOLs] WHERE User_ID = '${userId}' AND isPublish = 1
          `)
          influsInfo.push(influInfo.recordset[0])
         
      }
      
      const profileInfos = []

      for(let influInfo of influsInfo ) {
        
        const profileInfo = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${influInfo.Profile_ID}' 
        `)
        profileInfos.push(profileInfo.recordset[0])

          }
          return res.status(200).json({
            message: "Get approve report successfully!",
            data: profileInfos
          });
          
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function editInflu(req, res, next) {
    try {
      const influ = JSON.parse(req.body.influ);
      const influId = JSON.parse(req.body.influId);

      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        await request.input('fullName', sql.NVarChar, influ.fullName)
        .input('age', sql.Int, influ.Age)
        .input('gender', sql.NVarChar, influ.Gender)
        .input('relationship', sql.NVarChar, influ.Relationship)
        .input('email', sql.NVarChar, influ.Email)
        .input('phone', sql.NVarChar, influ.Phone)
        .input('address', sql.NVarChar, influ.Address)
        .input('profileId', sql.NVarChar, influId)
        .query(`
            BEGIN
            UPDATE [UpReachDB].[dbo].[Profile]
            SET       
               fullName = @fullName,
               Age = @age,
               Gender = @gender,
               Relationship = @relationship,
               Email = @email,
               Phone = @phone,
               Address = @address
            WHERE Profile_ID = @profileId
            END
        `);
  
            return res.status(201).json({
              message: "Update Successfully",
              // data: ,
            });
          }
        );
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function lockInflu(req, res, next) {
    try {
      const influId = JSON.parse(req.body.influId);
      
      console.log(influId);
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        await request.input('profileId', sql.NVarChar, influId)
        .query(`
            BEGIN
            UPDATE [UpReachDB].[dbo].[Profile]
            SET       
               isAccepted = 0
            WHERE Profile_ID = @profileId
            END
        `);
  
            return res.status(201).json({
              message: "Lock Influencer Successfully!",
              // data: ,
            });
          }
        );
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function unlockInflu(req, res, next) {
    try {
      const influId = JSON.parse(req.body.influId);
      
      console.log(influId);
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        await request.input('profileId', sql.NVarChar, influId)
        .query(`
            BEGIN
            UPDATE [UpReachDB].[dbo].[Profile]
            SET       
               isAccepted = 1
            WHERE Profile_ID = @profileId
            END
        `);
  
            return res.status(201).json({
              message: "Unlock Influencer Successfully!",
              // data: ,
            });
          }
        );
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }
  module.exports = { getApproveReport, postApproveReport, getInfluencerAccount,editInflu,lockInflu, unlockInflu }