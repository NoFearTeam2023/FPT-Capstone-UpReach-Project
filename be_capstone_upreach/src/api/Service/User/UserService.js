const sql = require('mssql');

const config = require('../../Config/dbConfig');
const common = require('../../../../common/common')
const pool = new sql.ConnectionPool(config);

async function getAll(){
    const getUsers = "getAllUser";
    pool.connect().then(() => {
        const request = pool.request();
        request.execute(getUsers).then((result) => {
            return result.recordset;
        }).catch((err) => {
            console.log('Lỗi thực thi stored procedure:', err);
            pool.close();
        })
    }).catch((err) => {
        console.log('Lỗi kết nối:', err);
    });
}

async function getUserById(id){
    try {
        const searchUserById = "getInfoUserById";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('EmailId', sql.NVarChar, id);
        const result = await request.execute(searchUserById);
        const data = common.formatResponseUser(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getInfoUserByEmail:', err);
        throw err;
    }
}

async function getUserByEmail(email){
    try {
        const searchUserByEmail = "getInfoUserByEmail";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('EmailUser', sql.NVarChar, email);
        const result = await request.execute(searchUserByEmail);
        const data = common.formatResponseUser(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getInfoUserByEmail:', err);
        throw err;
    }
}

async function getDataForUser(email){
    try {
        const getDataForUser = "getDataForUser";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('emailUser', sql.NVarChar, email);
        const result = await request.execute(getDataForUser);
        const data = common.formatResponseUser(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getDataForUser:', err);
        throw err;
    }
}

async function insertInfoUser(id, role, email, password){
    
    try {
        const connection = await pool.connect();
        const insertQuery = "InsertInfoUser";
        const request = connection.request();
        request.input('UserId', sql.NVarChar, id);
        request.input('UserRole', sql.NVarChar, role);
        request.input('UserEmail', sql.NVarChar, email);
        request.input('UserPassword', sql.NVarChar, password);
        const result = await request.execute(insertQuery);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi InsertInfoUser:', err);
        throw err;
    }
}

async function insertInfoClient(Client_ID, Remaining_ID, User_ID, Address,FullName,Email_Client,Image_Client,Phone_Client,Brand_Client){
    
    try {
        const connection = await pool.connect();
        const insertQuery = "insertInfoClient";
        const request = connection.request();
        request.input('Client_ID', sql.NVarChar, Client_ID);
        request.input('Remaining_ID', sql.NVarChar, Remaining_ID);
        request.input('User_ID', sql.NVarChar, User_ID);
        request.input('Address', sql.NVarChar, Address);
        request.input('FullName', sql.NVarChar, FullName);
        request.input('Email_Client', sql.NVarChar, Email_Client);
        request.input('Image_Client', sql.NVarChar, Image_Client);
        request.input('Phone_Client', sql.NVarChar, Phone_Client);
        request.input('Brand_Client', sql.NVarChar, Brand_Client);
        const result = await request.execute(insertQuery);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi InsertInfoUser:', err);
        throw err;
    }
}

async function insertInfoKols(id, role, email, password){
    
    try {
        const connection = await pool.connect();
        const insertQuery = "insertInfoKols";
        const request = connection.request();
        request.input('UserId', sql.NVarChar, id);
        request.input('UserRole', sql.NVarChar, role);
        request.input('UserEmail', sql.NVarChar, email);
        request.input('UserPassword', sql.NVarChar, password);
        const result = await request.execute(insertQuery);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi InsertInfoUser:', err);
        throw err;
    }
}

async function insertSessionUser(sessionId, userID, maxAge, expired) {
    try {
        const insertSession = "insertSessionQuery";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('sessionId', sql.NVarChar, sessionId);
        request.input('userID', sql.NVarChar, userID);
        request.input('duration', sql.NVarChar, maxAge);
        request.input('expired', sql.NVarChar, expired);
    
        const result = await request.execute(insertSession);
        console.log('Đã Thêm thành công session')
        connection.close();
        return true;
    } catch (err) {
        console.log('Lỗi thực thi insertSessionQuery:', err);
        return false;
    }
}

async function deleteSessionUser(sessionId){
    try {
        const deleteSessionUser = "deleteSessionUserBySessionId"
        const connection = await pool.connect();
        const request = connection.request();
        request.input('sessionId', sql.NVarChar, sessionId);
    
        const result = await request.execute(deleteSessionUser);
        connection.close();
        return result;
        
    } catch (err) {
        console.log('Lỗi thực thi deleteSessionUserBySessionId:', err);
        throw err;
    }

}

async function deleteSessionUserById(userId){
    try {
        const deleteSessionUser = "deleteSessionUserById"
        const connection = await pool.connect();
        const request = connection.request();
        request.input('userID', sql.NVarChar, userId);
        const result = await request.execute(deleteSessionUser);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi deleteSessionUserById:', err);
        throw err;
    }
}

async function getSessionUserById(userId){
    try {
        const getSessionUser = "getSessionUserId"
        const connection = await pool.connect();
        const request = connection.request();
        request.input('userID', sql.NVarChar, userId);

        const result = await request.execute(getSessionUser);
        const data = result.recordset;
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getSessionUserId:', err);
        throw err;
    }
}



module.exports ={getAll,getUserById,getUserByEmail,getDataForUser,getSessionUserById,insertInfoUser,insertSessionUser,deleteSessionUser,deleteSessionUserById};
