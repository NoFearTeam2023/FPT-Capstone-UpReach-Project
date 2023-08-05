const express = require("express");
const passport = require("passport");
const config = require("../../Config/dbConfig");
const sql = require("mssql");

const { getUserByEmail } = require("../../Service/User/UserService");
const router = express.Router();

router.get("/api/admin/get-aprrove-report", getApproveReport);

// auth.initialize(
//     passport,
//     (id) => userModels.find((user) => user.userId === id),
//     (email) => userModels.find((user) => user.userEmail === email)
//   );

  async function getApproveReport(req, res, next) {
    try {
    //   const user = await getUserByEmail(req.query.email);
      sql.connect(config, (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
  
        // request.input('currentDateTime', sql.VarChar, currentDateTime);
        // request.input('isPublish', sql.Bit, false);
        const request = new sql.Request();

        request.query(`
            SELECT *
            FROM [UpReachDB].[dbo].[KOLs] AS k1
            WHERE k1.isPublish = 0
            AND k1.dateEdit = (
                SELECT TOP 1 dateEdit
                FROM [UpReachDB].[dbo].[KOLs] AS k2
                WHERE k2.User_ID = k1.User_ID
                ORDER BY dateEdit DESC
            )
        `,
          (error, response) => {
            if (error) {
              console.log(error);
              return res.json({ message: " " + err });
            }
            console.log(response.recordset);
            // const influs = [...response.recordset];
            // const filteredData = influs.find(
            //   (item) => item.User_ID === user.userId
            // );
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

  module.exports = router;