const sql = require('mssql');

const config = require('../../Config/dbConfig');
const common = require('../../../../common/common')
const pool = new sql.ConnectionPool(config);




async function getAllClient(){
    try {
        const getAllClient = "getAllClient";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getAllClient);
        const data = common.formatResponseClientToArray(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getAllClient:', err);
        throw err;
    }
}


async function getClientByEmail(email){
    try {
        const getClientByEmail = "getClientByEmail";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('email', sql.NVarChar, email );
        const result = await request.execute(getClientByEmail);
        const data = common.formatResponseClientToObject(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getClientByEmail:', err);
        throw err;
    }
}

async function getLastIdClients(){
    try {
        const getlastIdClients = "getlastIdClients";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getlastIdClients);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getlastIdClients:', err);
        throw err;
    }
}

async function getLastIdPointRemained(){
    try {
        const getLastIdPointRemained = "getLastIdPointRemained";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastIdPointRemained);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastIdPointRemained:', err);
        throw err;
    }
}

async function getLastIdInvoices(){
    try {
        const getLastIdInvoices = "getLastIdInvoices";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastIdInvoices);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastIdInvoices:', err);
        throw err;
    }
}

async function insertInvoice(
    invoiceId,
	clientId,
	planId,
	paymentStatus,
	transactionDate){
        try {
            const insertInvoice = "insertInvoice";
            const connection = await pool.connect();
            const request = connection.request();
            request.input('invoiceId', sql.NVarChar, invoiceId );
            request.input('clientId', sql.NVarChar, clientId );
            request.input('planId', sql.NVarChar, planId );
            request.input('paymentStatus', sql.Bit, paymentStatus );
            request.input('transactionDate', sql.NVarChar, transactionDate );
            
            const result = await request.execute(insertInvoice);
            connection.close();
            return result;
        } catch (err) {
            console.log('Lỗi thực thi insertInvoice:', err);
            throw err;
        }
}

async function insertPointRemained(
    remainingId ,
	planId ,
	usageReports,
	usageResultSearching
    ){
        try {
            const insertPointRemained = "insertPointRemained";
            const connection = await pool.connect();
            const request = connection.request();
            request.input('remainingId', sql.NVarChar, remainingId );
            request.input('planId', sql.NVarChar, planId );
            request.input('usageReports', sql.Int, usageReports );
            request.input('usageResultSearching', sql.Int, usageResultSearching );
            
            const result = await request.execute(insertPointRemained);
            connection.close();
            return result;
        } catch (err) {
            console.log('Lỗi thực thi insertInvoice:', err);
            throw err;
        }
}

async function insertClient(
    clientId,
    remained,
    userId,
    address,
    fullName,
    emailClient,
    imageClient,
    phoneClient,
    brandClient
    ){
    try {
        const insertClient = "insertClient";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('clientId', sql.NVarChar, clientId );
        request.input('remained', sql.NVarChar, remained );
        request.input('userId', sql.NVarChar, userId );
        request.input('address', sql.NVarChar, address );
        request.input('fullName', sql.NVarChar, fullName );
        request.input('emailClient', sql.NVarChar, emailClient );
        request.input('imageClient', sql.NVarChar, imageClient );
        request.input('phoneClient', sql.NVarChar, phoneClient );
        request.input('brandClient', sql.NVarChar, brandClient );
        const result = await request.execute(insertClient);
        
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi getLastIdPointRemained:', err);
        throw err;
    }
}

module.exports = {getAllClient,getClientByEmail,getLastIdClients,getLastIdPointRemained,getLastIdInvoices,insertClient,insertInvoice,insertPointRemained}