const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const config = require("../../Config/dbConfig");
const sql = require("mssql");
const influService = require("../../Service/Influencer/InfluencerService");
const clientService = require("../../Service/Client/clientService");
const userService = require("../../Service/User/UserService");
const common = require("../../../../common/common");
const clientModel = require("../../Model/MogooseSchema/clientModel");
const influModel = require("../../Model/MogooseSchema/influModel");
const { getUserByEmail } = require("../../Service/User/UserService");

async function addProfileClient(req, res, next) {
  try {
    const image = req.body.image[0];
    const uploadedImages = [];
    if (image.thumbUrl) {
      const img = await cloudinary.uploader.upload(image.thumbUrl, {
        public_id: image.uid,
        resource_type: "auto",
      });
      uploadedImages.push({
        userId: image.userId,
        id: image.uid,
        url: img.url,
      });
    } else
      uploadedImages.push({
        userId: image.userId,
        id: image.uid,
        url: image.url,
      });

    const {
      location,
      fullName,
      emailContact,
      phoneNumber,
      brandName,
      idClient,
    } = req.body;

    if (!(await InsertPointRemained())) {
      return res.json({
        status: "False",
        message: "Insert PointRemained Fails",
      });
    }
    const { name, email } = req.body.clientDetail;
    const user = await userService.getUserByEmail(email);
    if (
      !(await InsertClient(
        user.userId,
        location,
        fullName,
        emailContact,
        uploadedImages[0].url,
        phoneNumber,
        brandName
      ))
    ) {
      return res.json({ status: "False", message: "Insert Client Fails" });
    }

    if (!(await InsertInvoice())) {
      return res.json({ status: "False", message: "Insert Invoice Fails" });
    }

    await clientModel.findByIdAndUpdate(idClient, {
      avatarImage: uploadedImages.url,
      username: fullName,
    });
    // Nếu tất cả các thao tác trước đó thành công, gửi phản hồi thành công
    return res.json({
      status: "True",
      message: "Insert Success Client",
      dataImage: uploadedImages[0].url,
    });
  } catch (err) {
    // Xử lý lỗi
    console.error(err);
    res.json({ status: "False", message: "Lỗi" });
  }
}

async function InsertPointRemained() {
  try {
    const lastIdPointRemained = await clientService.getLastIdPointRemained();
    var newIdPointRemained = common.increaseID(
      lastIdPointRemained.Remaining_ID
    ); // Lấy last Id của Remaining_ID cuối trong db

    // Thực hiện insert
    const checkInsertPointRemained = await clientService.insertPointRemained(
      newIdPointRemained,
      "P04",
      10,
      100
    );
    if (checkInsertPointRemained.rowsAffected[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function InsertInvoice() {
  try {
    const now = "" + Date.now();
    const lastIdClient = await clientService.getLastIdClients();
    const lastIdInvoices = await clientService.getLastIdInvoices();
    var newIdInvoices = common.increaseID(lastIdInvoices.Invoice_ID); // Lấy last Id của Invoice_ID cuối trong db
    var newIdClient = lastIdClient.Client_ID; // Lấy last Id của Client_ID cuối trong db

    // Thực hiện insert
    const checkInsertInvoice = await clientService.insertInvoice(
      newIdInvoices,
      newIdClient,
      "P04",
      1,
      now
    );
    if (checkInsertInvoice.rowsAffected[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function InsertClient(
  userId,
  address,
  fullName,
  emailClient,
  imageClient,
  phoneClient,
  brandClient
) {
  try {
    const lastIdClient = await clientService.getLastIdClients();
    var newIdClient = common.increaseID(lastIdClient.Client_ID); // Lấy last Id của Client_ID cuối trong db
    const lastIdPointRemained = await clientService.getLastIdPointRemained();
    var newIdPointRemained = lastIdPointRemained.Remaining_ID; // Lấy last Id của Remaining_ID cuối trong db

    // Thực hiện insert
    const checkInsertClient = await clientService.insertClient(
      newIdClient,
      newIdPointRemained,
      userId,
      address,
      fullName,
      emailClient,
      imageClient,
      phoneClient,
      brandClient
    );
    if (checkInsertClient.rowsAffected[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function dataHomePageClient(req, res, next) {
  try {
    const { userId, email, role } = req.body;
    if (role === "2") {
      const infoClient = await clientService.getClientByEmail(email);
      const infoInfluencer = await influService.getAllInfluencerByPublish();
      return res.json({ Client: infoClient, Influencer: infoInfluencer });
    }
    return res.json({ message: "Bạn không có quyền truy cập vào" });
  } catch (error) {
    return res.json({ message: " " + error });
  }
}

// Check if an influe is already in the Client booking array
const isInflueInArray = (client, idInflue) => {
  return client.booking.some((existingInflueId) =>
    existingInflueId.equals(idInflue)
  );
};

// Add Influe to booking in client array
async function addInflueToBookingInClient(req, res, next) {
  try {
    const { _idClient, _idInflue } = req.body;
    const client = await clientModel.findById(_idClient);
    if (!client) {
      return res.json({ msg: "Client don't already", status: false });
    }
    const influe = await influModel.findById(_idInflue);
    if (!influe) {
      return res.json({ msg: "Influenecer don't already", status: false });
    }

    if (isInflueInArray(client, influe._id)) {
      return res.json({
        msg: "Influenecer have already in the Client booking array",
        status: false,
      });
    } else {
      client.booking.push(influe._id);
      await client.save();
      return res.status(200).json({
        status: true,
        data: client,
      });
    }
  } catch (error) {
    return res.json({ message: " " + error });
  }
}

async function bookingJob(req, res, next) {
  try {
    const bookingJob = JSON.parse(req.body.bookingJob);
    
    sql.connect(config, (err) => {
      if (err) {
        console.log(err);
        return res.json({ message: " " + err });
      }
      const request = new sql.Request();
      const randomNumber = Math.floor(Math.random() * 10000);
      const formattedNumber = randomNumber.toString().padStart(4, "0");
      const bookingId = "CB" + formattedNumber;
      request.query(`
      BEGIN
      INSERT INTO [UpReachDB].[dbo].[ClientBooking]
      (clientBooking_ID, Job_ID, Client_ID, Start_Date, End_Date, Describes, Status)
      VALUES ('${bookingId}', '${bookingJob.jobId}', '${bookingJob.clientId}', '${bookingJob.startDate}', '${bookingJob.endDate}', '${bookingJob.describes}', 'Pending')
      END
      `);
      return res.status(201).json({
        message: "Send booking successful!",
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Lỗi ", err });
  }
}

async function getHistoryBooking(req, res, next) {
  try {
    const user = await getUserByEmail(req.query.email);
    console.log(user);
    sql.connect(config, async (err) => {
      if (err) {
        console.log(err);
        return res.json({ message: " " + err });
      }
      const request = new sql.Request();
      
      const selectedClients = await request.query(
        `SELECT * FROM [UpReachDB].[dbo].[Clients] WHERE User_ID = '${user.userId}'`
      );
      const queryResultBooking = await request.query(
        `SELECT * FROM [UpReachDB].[dbo].[ClientBooking] WHERE Client_ID = '${selectedClients.recordset[0].Client_ID}'`
      );
      const mergedBookings = [];
      if (queryResultBooking.recordset.length > 0) {
        for (const booking of queryResultBooking.recordset) {
                const jobIdToFind = booking.Job_ID;
                const queryResultJob = await request.query(
                    `SELECT * FROM [UpReachDB].[dbo].[InfluencerJob] WHERE Job_ID = '${jobIdToFind}'`)
                const queryResultKol = await request.query(
                `SELECT Profile_ID FROM [UpReachDB].[dbo].[InfluencerJobList] WHERE Job_ID = '${jobIdToFind}'`)
                const queryResultFormat = await request.query(
                    `SELECT Format_Id FROM [UpReachDB].[dbo].[JobContentFormatList] WHERE Job_ID = '${jobIdToFind}'`)

                const profileId = queryResultKol.recordset[0].Profile_ID;
                const formatId = queryResultFormat.recordset[0].Format_Id;
        const queryResultProfile = await request.query(
            `SELECT fullName FROM [UpReachDB].[dbo].[Profile] WHERE Profile_ID = '${profileId}'`);
            
                const mergedObject = {
                    booking: booking,
                    kolName: queryResultProfile.recordset[0].fullName,
                    job: queryResultJob.recordset[0],
                    formatId: formatId
                  };
              
                  mergedBookings.push(mergedObject);
            }
      }
          return res.status(200).json({
            message: "Get history booking successful!",
            data: mergedBookings,
          });
        
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: " " + err });
  }
}

async function checkDone(req, res, next) {
    try {
      const bookingDetail = JSON.parse(req.body.booking);
      
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        await request.input('status', sql.NVarChar, bookingDetail.status)
        await request.input('bookingId', sql.NVarChar, bookingDetail.bookingId)
        .query(`
            BEGIN
            UPDATE [UpReachDB].[dbo].[ClientBooking]
            SET         
               Status = @status
            WHERE clientBooking_ID = @bookingId
            END
        `);
  
            return res.status(201).json({
              message: "Check done booking successfully!",
              // data: ,
            });
          }
        );
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

  async function sendFeedback(req, res, next) {
    try {
      const bookingDetail = JSON.parse(req.body.booking);
      
      sql.connect(config, async (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: " " + err });
        }
        const request = new sql.Request();
        await request.input('feedback', sql.NVarChar, JSON.stringify(bookingDetail.feedback))
        await request.input('bookingId', sql.NVarChar, bookingDetail.bookingId)
        .query(`
            BEGIN
            UPDATE [UpReachDB].[dbo].[ClientBooking]
            SET         
            Feedback = @feedback
            WHERE clientBooking_ID = @bookingId
            END
        `);
  
            return res.status(201).json({
              message: "Send feedback successfully!",
              // data: ,
            });
          }
        );
    } catch (err) {
      console.log(err);
      return res.json({ message: " " + err });
    }
  }

module.exports = {
  addProfileClient,
  dataHomePageClient,
  addInflueToBookingInClient,
  bookingJob,
  getHistoryBooking,
  checkDone,
  sendFeedback
};
