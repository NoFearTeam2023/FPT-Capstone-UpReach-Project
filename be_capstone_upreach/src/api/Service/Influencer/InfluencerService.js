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

async function getAllInfluencerByPublish(){
    try {
        const getAllInfluencerByPublish = "getAllInfluencerByPublish";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getAllInfluencerByPublish);
        if(result){
            const data = common.formatResponseInfluencerToArray(result.recordset)
            connection.close();
            return data;
        }
    } catch (err) {
        console.log('Lỗi thực thi getAllInfluencerByPublish:', err);
        throw err;
    }
}

async function getLastProfileId(){
    try {
        const getLastProfileId = "getLastProfileId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastProfileId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastProfileId:', err);
        throw err;
    }
}

async function getLastInfluencerContentFormatListsId(){
    try {
        const getLastInfluencerContentFormatListsId = "getLastInfluencerContentFormatListsId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastInfluencerContentFormatListsId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastInfluencerContentFormatListsId:', err);
        throw err;
    }
}

async function getLastInfluencerContentTopicsListsId(){
    try {
        const getLastInfluencerContentTopicsListsId = "getLastInfluencerContentTopicsListsId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastInfluencerContentTopicsListsId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastInfluencerContentTopicsListsId:', err);
        throw err;
    }
}

async function getLastInfluencerTypeListId(){
    try {
        const getLastInfluencerTypeListId = "getLastInfluencerTypeListId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastInfluencerTypeListId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastInfluencerTypeListId:', err);
        throw err;
    }
}

async function insertInfluencerProfile(fullName,nickName,email,age,phone,gender,bio,address,relationship,costEstimateFrom,costEstimateTo,followers,typeId){
    try {
        const insertInfluencerProfile = "insertInfluencerProfile";
        

        const profileId = await getLastProfileId()
        const lastProfileId =  common.increaseID(profileId.Profile_ID);
        const typeListId = await getLastInfluencerTypeListId()
        const lastTypeListId =  common.increaseID(typeListId.TypeList_ID);


        const connection = await pool.connect();
        const request = connection.request();
        request.input('profileId',  sql.NVarChar, lastProfileId);
        request.input('fullName',  sql.NVarChar, fullName);
        request.input('nickName',  sql.NVarChar, nickName);
        request.input('email',  sql.NVarChar, email);
        request.input('age',  sql.Int, age);
        request.input('phone',  sql.NVarChar, phone);
        request.input('gender',  sql.NVarChar, gender);
        request.input('bio',  sql.NVarChar, bio);
        request.input('address',  sql.NVarChar, address);
        request.input('relationship',  sql.NVarChar, relationship);
        request.input('costEstimateFrom',  sql.Int, costEstimateFrom);
        request.input('costEstimateTo',  sql.Int, costEstimateTo);
        request.input('followers',  sql.Int, followers);

        request.input('typeListId',  sql.NVarChar, lastTypeListId);
        request.input('typeId',  sql.NVarChar, typeId);

        const result = await request.execute(insertInfluencerProfile);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi insertInfluencerProfile : ', err);
        throw err;
    }
}

async function getLastPlatformInformationId(){
    try {
        const getLastPlatformInformationId = "getLastPlatformInformationId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastPlatformInformationId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastPlatformInformationId:', err);
        throw err;
    }
}

async function getLastAudienceAgeRangeListId(){
    try {
        const getLastAudienceAgeRangeListId = "getLastAudienceAgeRangeListId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastAudienceAgeRangeListId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastAudienceAgeRangeListId : ', err);
        throw err;
    }
}

async function getLastAudienceGenderListId(){
    try {
        const getLastAudienceGenderListId = "getLastAudienceGenderListId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastAudienceGenderListId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastAudienceGenderListId : ', err);
        throw err;
    }
}

async function getLastAudienceFollowerMonthListId(){
    try {
        const getLastAudienceFollowerMonthListId = "getLastAudienceFollowerMonthListId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastAudienceFollowerMonthListId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastAudienceFollowerMonthListId : ', err);
        throw err;
    }
}

async function getLastAudienceLocationListId(){
    try {
        const getLastAudienceLocationListId = "getLastAudienceLocationListId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastAudienceLocationListId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastAudienceLocationListId : ', err);
        throw err;
    }
}

async function insertInfluencerPlatformInformation(linkFB,linkInsta,linkTiktok,linkYoutube,followFB,followInsta,followTikTok,followYoutube,engagement,postsPerWeek){
    try {
        const insertInfluencerPlatformInformation = "insertInfluencerPlatformInformation";
        
        const platformId = getLastPlatformInformationId()
        const lastPlatformId = common.increaseID(platformId.Platform_ID);
        
        const connection = await pool.connect();
        const request = connection.request();

        request.input('platformId', sql.NVarChar, lastPlatformId);
        request.input('linkFB', sql.NVarChar, linkFB);
        request.input('linkInsta', sql.NVarChar, linkInsta);
        request.input('linkTiktok', sql.NVarChar, linkTiktok);
        request.input('linkYoutube', sql.NVarChar, linkYoutube);
        request.input('followFB', sql.Int, followFB);
        request.input('followInsta', sql.Int, followInsta);
        request.input('followTikTok', sql.Int, followTikTok);
        request.input('followYoutube', sql.Int, followYoutube);
        request.input('engagement', sql.Float, engagement);
        request.input('postsPerWeek', sql.Float, postsPerWeek);

        const result = await request.execute(insertInfluencerPlatformInformation);
        connection.close();
        return result;
    } catch (err) {
        console.log('Lỗi thực thi getLastProfileId:', err);
        throw err;
    }
}

async function getLastKOLsId(){
    try {
        const getLastKOLsId = "getLastKOLsId";
        const connection = await pool.connect();
        const request = connection.request();
        const result = await request.execute(getLastKOLsId);
        connection.close();
        return result.recordset[0];
    } catch (err) {
        console.log('Lỗi thực thi getLastKOLsId : ', err);
        throw err;
    }
}

async function insertKols(userId,isPublish,dateEdit){
    try {
        const insertKols = "insertKols";
        
        const kolsId = getLastKOLsId()
        const lastKolsId = common.increaseID(kolsId.KOLs_ID);
        const platformId = getLastPlatformInformationId()
        const lastPlatformId = common.increaseID(platformId.Platform_ID);
        const profileId = getLastProfileId()
        const lastProfileId = common.increaseID(profileId.Profile_ID);

        const connection = await pool.connect();
        const request = connection.request();

        request.input('kolsId', sql.NVarChar, lastKolsId)
        request.input('platformId', sql.NVarChar, lastPlatformId)
        request.input('profileId', sql.NVarChar, lastProfileId)
        request.input('userId', sql.NVarChar, userId)
        request.input('isPublish', sql.Bit, isPublish)
        request.input('dateEdit', sql.NVarChar, dateEdit)

        const result = await request.execute(insertKols);
        connection.close();
        return result;
    }
    catch (err) {
        console.log('Lỗi thực thi updatePointReport:', err);
        throw err;
    }
}

async function insertDatatoContentTopic(dataArray) {
    try {
        const insertDatatoContentTopicProcedure = "InsertInfluencerContentTopics";
        var result;

        const profileId = await getLastProfileId();
        const lastProfileId = profileId.Profile_ID;
        
        const connection = await pool.connect();
        
        for (const value of dataArray) {
            const contentTopicsIdList = await getLastInfluencerContentTopicsListsId();
            const lastContentTopicsId = common.increaseID(contentTopicsIdList.ContentTopicsId);
            console.log("Topic_ID ", lastContentTopicsId);
            await pool.connect();
            const request = connection.request();
            request.input('contentTopicsId', sql.NVarChar, lastContentTopicsId);
            request.input('profileId', sql.NVarChar, lastProfileId);
            request.input('name', sql.NVarChar, value);
            
            result = await request.execute(insertDatatoContentTopicProcedure);
        }
        
        connection.close();
        return result;
    } catch (error) {
        console.log('Lỗi thực thi insertDatatoContentTopic : ', error);
        throw error;
    }
}

module.exports = {getAllInfluencer,searchInfluencer,getAllInfluencerByEmail,updatePointSearch,updatePointReport,getAllInfluencerByPublish,insertInfluencerPlatformInformation,insertInfluencerProfile,insertKols,insertDatatoContentTopic}