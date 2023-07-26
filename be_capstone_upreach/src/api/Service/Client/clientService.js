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
        console.log(result)
        const data = common.convertDataClient(result.recordset)
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
        request.input('email', sql.NVarChar, email);
        const result = await request.execute(getClientByEmail);
        const data = common.convertDataClient(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getClientByEmail:', err);
        throw err;
    }
}

module.exports = {getAllClient,getClientByEmail}