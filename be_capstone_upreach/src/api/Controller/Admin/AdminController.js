const express = require("express");
const passport = require("passport");
const config = require("../../Config/dbConfig");
const sql = require("mssql");
const influService = require("../../Service/Influencer/InfluencerService")
const userService = require('../../Service/User/UserService')
const common = require('../../../../common/common')
const { getAllInfluencer } = require("../../Service/Influencer/InfluencerService");
const router = express.Router();

// router.get("/api/admin/get-approve-report", getApproveReport);
// router.post("/api/admin/approve-report", postApproveReport);

// auth.initialize(
//     passport,
//     (id) => userModels.find((user) => user.userId === id),
//     (email) => userModels.find((user) => user.userEmail === email)
//   );


//----------------------------------Report Approved-------------------------


async function getInfluReport(req, res, next) {
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
      const approvedInfos = []
      for (let userId of uniqueIds) {

        const approvedInfluInfo = await  request.query(`
        SELECT Top 1 * FROM [UpReachDB].[dbo].[KOLs] WHERE User_ID = '${userId}' AND isPublish = 1
        
        `)
        if(approvedInfluInfo.recordset.length > 0 )
        approvedInfos.push(approvedInfluInfo.recordset[0])
    }

    const approvedReports = []
    const filteredInfoSidebar = []
    for(let approvedInfo of approvedInfos ) {
      const infoUser = await userService.getUserById(approvedInfo.User_ID);
      const infoInfluencer = await influService.getAllInfluencerByEmail(infoUser.Email);
      const data = common.formatResponseInfluencerToArray(infoInfluencer)
      const filteredInfo =  data.find((item) =>item.isPublish)
      filteredInfoSidebar.push(filteredInfo)
    
      const influUserApprove = await  request.query(`
      SELECT * FROM [UpReachDB].[dbo].[KOLs] WHERE Platform_ID = '${approvedInfo.Platform_ID}' 
      `)
      const influPlatformApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[PlatformInformation] WHERE Platform_ID = '${approvedInfo.Platform_ID}' 
        `)

        const influProfileApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${approvedInfo.Profile_ID}' 
        `)

        const influImageApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[ImageKOLs] WHERE Profile_ID = '${approvedInfo.Profile_ID}' 
        `)
        const influAudienceFollowerApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[AudienceFollowerMonthList] WHERE Platform_ID = '${approvedInfo.Platform_ID}' 
        `)

        const influAudienceLocationApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[AudienceLocationList] WHERE Platform_ID = '${approvedInfo.Platform_ID}' 
        `)

        const influAudienceGenderApprove = await  request.query(`
        SELECT AudienceGenderList.AudienceGenderList_ID, AudienceGenderList.AudienceGenderId, AudienceGender.Gender, AudienceGenderList.Platform_ID, AudienceGenderList.Quantity 
    FROM [UpReachDB].[dbo].[AudienceGenderList]
    INNER JOIN [UpReachDB].[dbo].[AudienceGender] ON AudienceGenderList.AudienceGenderId = AudienceGender.AudienceGenderId
    WHERE AudienceGenderList.Platform_ID = '${approvedInfo.Platform_ID}'
        `)

        const influAudienceAgeApprove = await  request.query(`
        SELECT AudienceAgeRangeList.AudienceAgeList_ID, AudienceAgeRangeList.AudienceAge_ID, AudienceAgeRange.AgeRange, AudienceAgeRangeList.Platform_ID, AudienceAgeRangeList.Quantity 
    FROM [UpReachDB].[dbo].[AudienceAgeRangeList]
    INNER JOIN [UpReachDB].[dbo].[AudienceAgeRange] ON AudienceAgeRangeList.AudienceAge_ID = AudienceAgeRange.AudienceAge_ID
    WHERE AudienceAgeRangeList.Platform_ID = '${approvedInfo.Platform_ID}'
        `)



      const jobIds = await request.query(
          `SELECT Job_Id FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Profile_ID = '${approvedInfo.Profile_ID}'`,
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
              result[job.Job_ID] = {
                ...job,
                Format_Id:
                  selectedFormats
                    .find((format) => format.Job_Id === job.Job_ID)
                    ?.Format_Id?.map((item) => item.Format_Id) || [],
              };
            });

            const influJobsApprove = Object.values(result);

            const sidebarData = filteredInfoSidebar.find((item)=> item.userId === approvedInfo.User_ID)
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
          approvedReports.push(reportApprove)
        }
        return res.status(200).json({
          message: "Get influencer report successfully!",
          data: approvedReports
        });
        
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: " " + err });
  }
}


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
                result[job.Job_ID] = {
                  ...job,
                  Format_Id:
                    selectedFormats
                      .find((format) => format.Job_Id === job.Job_ID)
                      ?.Format_Id?.map((item) => item.Format_Id) || [],
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

  async function postApproveReport(req, res, next) {
    try {
      const { userId,kolsId, isPublish } = req.body;
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        const adminApprove = await  request.query(`
        SELECT * FROM [UpReachDB].[dbo].[KOLs] WHERE KOLs_ID = '${kolsId}' 
        `)
          return res.status(200).json({
            message: "Search thành công",
            // data: 
          });
          
      });
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  module.exports = {getInfluReport, getApproveReport, postApproveReport }