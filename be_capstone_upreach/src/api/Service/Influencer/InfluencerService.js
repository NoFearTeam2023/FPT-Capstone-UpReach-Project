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
        const data = common.formatResponse(result.recordset)
        connection.close();
        return data;
    } catch (err) {
        console.log('Lỗi thực thi getDataForUser:', err);
        throw err;
    }
}

async function searchInfluecer(costEstimateFrom ,costEstimateTo ,ageFrom ,ageTo ,contentTopic ,nameType ,contentFormats ,audienceGender	,audienceLocation){
    try {
        const searchInfluecer = "searchInfluencer";
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
        
        const result = await request.execute(searchInfluecer);
        console.log(result)
        connection.close();
        const data = common.formatResponse(result.recordset)
        return data;
    } catch (err) {
        console.log('Lỗi thực thi searchInfluecer:', err);
        throw err;
    }
}

module.exports = {getAllInfluencer,searchInfluecer}