const sql = require('mssql');

const config = require('../../Config/dbConfig');
const common = require('../../../../common/common')
const pool = new sql.ConnectionPool(config);


async function getAllInfluencer(){
    try {
        const getAllInfluencer = "getAllInfluence";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getAllInfluencer);
        console.log(result)
        const data = common.formatResponseInfluencerToArray(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getAllInfluencer:', err);
        throw err;
    }
}

async function getAllInfluencerByEmail(email){
    try {
        const getAllInfluencerByEmail = "getAllInfluencerByEmail";
        const connection = await pool.connect();
        const request = connection.request();
        request.input('email', sql.NVarChar, email );
        const result = await request.execute(getAllInfluencerByEmail);
        connection.close();
        return result.recordset;
    } catch (err) {
        console.log('Lỗi thực thi getAllInfluencerByEmail:', err);
        throw err;
    }
}
// contentTopic name is category
async function searchInfluencer(costEstimateFrom, costEstimateTo,ageFrom, ageTo, contentTopic,nameType, contentFormats, audienceGender, audienceLocation){
    try {
        const searchInfluencer = "searchInfluencer";
        const connection = await pool.connect();
        const request = connection.request();
        
        const contentTopicStr = Array.isArray(contentTopic) ? contentTopic.join(',') : contentTopic;
        const nameTypeStr =  Array.isArray(nameType) ? nameType.join(',') : nameType;;
        const contentFormatsStr = Array.isArray(contentFormats) ? contentFormats.join(',') : contentFormats;
        const audienceGenderStr = Array.isArray(audienceGender) ? audienceGender.join(',') : audienceGender;
        const audienceLocationStr = Array.isArray(audienceLocation) ? audienceLocation.join(',') : audienceLocation;

        request.input('costEstimateFrom', sql.Int, costEstimateFrom );
        request.input('costEstimateTo', sql.Int, costEstimateTo );
        request.input('ageFrom', sql.Int, ageFrom );
        request.input('ageTo', sql.Int, ageTo );
        request.input('contentTopic', sql.NVarChar, contentTopicStr );
        request.input('nameType', sql.NVarChar, nameTypeStr );
        request.input('contentFormats', sql.NVarChar, contentFormatsStr);
        request.input('audienceGender', sql.NVarChar, audienceGenderStr);
        request.input('audienceLocation', sql.NVarChar, audienceLocationStr);
        
        const result = await request.execute(searchInfluencer);
        console.log(result)
        connection.close();
        const data = common.formatResponseInfluencerToArray(result.recordset)
        return data;
    } catch (err) {
        console.log('Lỗi thực thi searchInfluencer:', err);
        throw err;
    }
}

async function updatePointSearch(clientId, pointSearch){
    try {
        const updatePointSearch = "updatePointSearch";
        const connection = await pool.connect();
        const request = connection.request();

        request.input('clientId', sql.NVarChar, clientId );
        request.input('pointSearch', sql.Int, pointSearch );

        const result = await request.execute(updatePointSearch);
        connection.close();
        return result;
    }
    catch (err) {
        console.log('Lỗi thực thi updatePointSearch:', err);
        throw err;
    }
}

async function updatePointReport(clientId, pointReport){
    try {
    const updatePointReport = "updatePointReport";
    const connection = await pool.connect();
    const request = connection.request();

    request.input('clientId', sql.NVarChar, clientId );
    request.input('pointReport', sql.Int, pointReport );

    const result = await request.execute(updatePointReport);
    connection.close();
    return result;
    }
    catch (err) {
        console.log('Lỗi thực thi updatePointReport:', err);
        throw err;
    }
}

module.exports = {getAllInfluencer,searchInfluencer,getAllInfluencerByEmail,updatePointSearch,updatePointReport}