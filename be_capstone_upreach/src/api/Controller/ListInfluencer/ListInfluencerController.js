const sql = require('mssql')
const config = require("../../Config/dbConfig");
const express =require('express')

const router = express.Router();


// router.post('/api/addtotablekols', AddToTableKOLs);
//get all list
async function GetAllList(req,res) {
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
    
        const request = new sql.Request();
        request.query("SELECT [ClientLists_ID],[Client_ID],[Name_list]FROM [UpReachDB].[dbo].[ClientListsKols]", (err, response) => {
            if(err){
                return;
            }
            return res.json({
                data : response.recordset
            });
        });
    })
}

async function GetAllListByUser(req,res) {
    const ClientID = req.body.ClientID;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`SELECT a.Name_list, b.KOLs_ID  FROM [dbo].[ClientListsKols] a
        JOIN [dbo].[ListKOLs] b ON a.ClientLists_ID = b.ClientLists_ID
        WHERE a.Client_ID = '${ClientID}'`,(err, response) => {
            if(err){
                return;
            }
            console.log(ClientID)
            return res.json({
                data: response.recordset
            });
        });
    })
}

// async function GetDataMale(req,res,next) {
//     const IdList = req.body.IdList;
//     sql.connect(config,(err) =>{
//         if(err){
//             console.log("ERR")
//             return;
//         }
//         const request = new sql.Request();
//         request.query(`SELECT COUNT(d.Gender) AS dataMale
// 		FROM [dbo].[ClientListsKols] a
//         JOIN [dbo].[ListKOLs] b ON a.ClientLists_ID = b.ClientLists_ID
// 		JOIN [dbo].[KOLs] c ON b.KOLs_ID = c.KOLs_ID
// 		JOIN [dbo].[Profile] d ON c.Profile_ID = d.Profile_ID
//         WHERE a.ClientLists_ID = '${IdList}'
// 		AND d.Gender = 'Male'
//         GROUP BY d.Gender`,(err, response) => {
//             if(err){
//                 return;
//             }
//             console.log(IdList)
//             return res.json(
//                 response.recordset[0]
//             );
//         });

//     })
// }

async function GetTableKOLs(req,res,next) {
    const IdList = req.body.IdList;
    const ClientID = req.body.ClientID;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`SELECT d.Profile_ID as 'key',
		d.Fullname as 'influencer',
		d.Followers as 'followers',
		(e.Interaction_FB + e.Interaction_Insta + e.Interaction_Tiktok + e.Interaction_Youtube) as 'interactions',
		(CONVERT(nvarchar,d.CostEstimateFrom) +'-'+ CONVERT(nvarchar,d.CostEstimateTo)) as costestimate
		FROM [dbo].[ClientListsKols] a
        LEFT JOIN [dbo].[ListKOLs] b ON a.ClientLists_ID = b.ClientLists_ID
		JOIN [dbo].[KOLs] c ON b.KOLs_ID = c.KOLs_ID
		JOIN [dbo].[Profile] d ON c.Profile_ID = d.Profile_ID
		JOIN [dbo].[PlatformInformation] e ON c.Platform_ID = e.Platform_ID
        WHERE a.ClientLists_ID = '${IdList}' AND a.Client_ID ='${ClientID}'`,(err, response) => {
            if(err){
                return;
            }
            console.log(IdList)
            return res.json({
                Table : response.recordset
            });
        });

    })
}

async function AddListClient(req,res,next) {
    const IdList = req.body.IdList;
    const ClientID = req.body.ClientID;
    const NameList = req.body.NameList;

    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`INSERT INTO [dbo].[ClientListsKols] ([ClientLists_ID], [Client_ID], [Name_list])
        VALUES ('${IdList}', '${ClientID}', '${NameList}') `,(err, response) => {
            if(err){
                return;
            }
            console.log("Add Success full !!!");
            return res.json({
                Status : "Success"
            });
        });

    })
}

async function DeleteListClient(req,res,next) {
    const IdList = req.body.IdList;

    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`DELETE FROM [dbo].[ClientListsKols]
        WHERE ClientLists_ID = '${IdList}'`,(err, response) => {
            if(err){
                return;
            }
            return res.json({
                Status : "Success"
            });
        });

    })
}

async function DeleteAllTable(req,res,next) {
    const IdList = req.body.IdList;

    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`DELETE FROM [dbo].[ListKOLs]
        WHERE ClientLists_ID = '${IdList}'`,(err, response) => {
            if(err){
                return;
            }
            return res.json({
                Status : "Success"
            });
        });

    })
}

async function GetListByUserId(req,res) {
    const ClientID = req.body.ClientID;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`SELECT  a.ClientLists_ID,
		a.Name_list
		FROM [dbo].[ClientListsKols] a
        WHERE a.Client_ID = '${ClientID}'
        GROUP BY a.ClientLists_ID,a.Name_list`,(err, response) => {
            if(err){
                return;
            }
            const data = res.json({
                data: response.recordset
            });
        });

    })
}

async function EditNameList(req,res) {
    const ClientID = req.body.ClientID;
    const ListID = req.body.ListID;
    const UpdateNameList = req.body.UpdateNameList;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`UPDATE [dbo].[ClientListsKols]
        SET [Name_list] = '${UpdateNameList}'
        WHERE [ClientLists_ID] = '${ListID}'AND [Client_ID] = '${ClientID}';`,(err, response) => {
            if(err){
                return;
            }
            return res.json({
                Status : "Success"
            });
        });

    })
}

async function DeleteTableKOLs(req,res) {
    const IdProfile = req.body.IdProfile;
    const IdList = req.body.IdList;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(`DELETE FROM [dbo].[ListKOLs]
        WHERE KOLs_ID IN (SELECT KOLs_ID FROM [dbo].[KOLs] WHERE Profile_ID = '${IdProfile}' AND ClientLists_ID = '${IdList}');`,(err, response) => {
            if(err){
                return;
            }
            return res.json({
                Status : "Success"
            });
        });

    })
}



async function AddToTableKOLs(req,res) {
    const ListKOLsID = req.body.ListKOLsID;
    const KOLsID = req.body.KOLsID;
    const ClientListID = req.body.ClientListID;
    sql.connect(config,(err) =>{
        if(err){
            console.log("ERR")
            return;
        }
        const request = new sql.Request();
        request.query(` INSERT INTO [dbo].[ListKOLs] (ListKOls_ID, ClientLists_ID, KOLs_ID )
        VALUES ('${ListKOLsID}', '${ClientListID}','${KOLsID}' )`,(err, response) => {
            if(err){
                return;
            }
            const data = res.json({
                data: response.recordset
            });
        });

    })
}

module.exports = {GetAllList,GetAllListByUser,GetListByUserId,AddListClient,GetTableKOLs,DeleteListClient,EditNameList,DeleteTableKOLs,AddToTableKOLs,DeleteAllTable};