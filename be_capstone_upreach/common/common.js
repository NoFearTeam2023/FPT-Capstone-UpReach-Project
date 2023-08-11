const _ = require('lodash');
// Get Array Dataa Influencer to Object
const formatResponseInfluencerToObject = (payload) => {
    const formatValue = payload.reduce(
        ( _accumulator, currentValue) => {
            return {
                ...currentValue,
                influencerTypeName: [...new Set(payload.map((e) => e.influencerTypeName))] ,
                influencerContentTopicName: [...new Set(payload.map((e) => e.influencerContentTopicName))],
                influencerContentFormatName: [...new Set(payload.map((e) => e.influencerContentFormatName))] ,
                audienceLocation: [...new Set(payload.map((e) => e.audienceLocation))],
            }
        },
        {}
    );
    return formatValue;
}

const formatResponseUserToObject = (payload) => {
    const formatValue = payload.reduce(
        ( _accumulator, currentValue) => {
            return {
                ...currentValue
            }
        },
        {}
    );
return formatValue;
}

// Get Array Dataa Client to Object
const formatResponseClientToObject = (payload) => {
    const formatValue = payload.reduce(
        ( _accumulator, currentValue) => {
            return {
                ...currentValue,
                nameListOfClients: [...new Set(payload.map((e) => e.nameListOfClients))] 
            }
        },
        {}
    );
    return formatValue;
}

// Get Array Data Influencer with not duplicate
function formatResponseInfluencerToArray(data) {
    const result = [];
    const kolGroups = {};

    data.forEach((item) => {
    const kolId = item["influencerId"];
    if (!kolGroups[kolId]) {
        kolGroups[kolId] = { ...item };
        kolGroups[kolId]["influencerTypeName"] = new Set([item["influencerTypeName"]]);
        kolGroups[kolId]["influencerContentTopicName"] = new Set([item["influencerContentTopicName"]]);
        kolGroups[kolId]["influencerContentFormatName"] = new Set([item["influencerContentFormatName"]]);
        kolGroups[kolId]["audienceLocation"] = new Set([item["audienceLocation"]]);
        kolGroups[kolId]["audienceGender"] = new Set([item["audienceGender"]]);
        kolGroups[kolId]["AudienceAgeList"] = new Set([item["AudienceAgeList"]]);
        kolGroups[kolId]["AudienceFollowerList"] = new Set([item["AudienceFollowerList"]]);
        kolGroups[kolId]["AudienceFollowerMonth"] = new Set([item["AudienceFollowerMonth"]]);
        kolGroups[kolId]["AudiencerLocation"] = new Set([item["AudiencerLocation"]]);
        kolGroups[kolId]["Image"] = new Set([item["Image"]]);
    } else {
        kolGroups[kolId]["influencerTypeName"].add(item["influencerTypeName"]);
        kolGroups[kolId]["influencerContentTopicName"].add(item["influencerContentTopicName"]);
        kolGroups[kolId]["influencerContentFormatName"].add(item["influencerContentFormatName"]);
        kolGroups[kolId]["audienceLocation"].add(item["audienceLocation"]);
        kolGroups[kolId]["audienceGender"].add(item["audienceGender"]);
        kolGroups[kolId]["AudienceAgeList"].add(item["AudienceAgeList"]);
        kolGroups[kolId]["AudienceFollowerList"].add(item["AudienceFollowerList"]);
        kolGroups[kolId]["AudienceFollowerMonth"].add(item["AudienceFollowerMonth"]);
        kolGroups[kolId]["AudiencerLocation"].add(item["AudiencerLocation"]);
        kolGroups[kolId]["Image"].add(item["Image"]);
    }
    });

    for (const kolId in kolGroups) {
    const kolData = kolGroups[kolId];
    kolData["influencerTypeName"] = Array.from(kolData["influencerTypeName"]);
    kolData["influencerContentTopicName"] = Array.from(kolData["influencerContentTopicName"]);
    kolData["influencerContentFormatName"] = Array.from(kolData["influencerContentFormatName"]);
    kolData["audienceLocation"] = Array.from(kolData["audienceLocation"]);
    kolData["audienceGender"] = Array.from(kolData["audienceGender"]);
    kolData["AudienceAgeList"] = Array.from(kolData["AudienceAgeList"]);
    kolData["AudienceFollowerList"] = Array.from(kolData["AudienceFollowerList"]);
    kolData["AudienceFollowerMonth"] = Array.from(kolData["AudienceFollowerMonth"]);
    kolData["AudiencerLocation"] = Array.from(kolData["AudiencerLocation"]);
    kolData["Image"] = Array.from(kolData["Image"]);
    result.push(kolData);
    }
    
    return result;
}
// Get Array Data Client with not duplicate
function formatResponseClientToArray(data) {
    const result = [];
    const clientGroup = {};

    data.forEach((item) => {
    const clients = item["clientId"];
    if (!clientGroup[clients]) {
        clientGroup[clients] = { ...item };
        clientGroup[clients]["nameListOfClients"] = new Set([item["nameListOfClients"]]);
    } else {
        clientGroup[clients]["nameListOfClients"].add(item["nameListOfClients"]);
    }
    });

    for (const  clientId in clientGroup) {
    const clientData = clientGroup[clientId];
    clientData["nameListOfClients"] = Array.from(clientData["nameListOfClients"]);
    result.push(clientData);
    }
    
    return result;
}

//  function formatChartDataInfluencer(data) {
// //     const result = [];
// //     const dataChartGroup = {};

// //     data.forEach((item) => {
// //         const influencerId = item["influencerId"];
// //         if (!dataChartGroup[influencerId]) {
// //             dataChartGroup[influencerId] = { ...item };
// //             dataChartGroup[influencerId]["dataFollower"] = [];
// //             dataChartGroup[influencerId]["dataGender"] = [];
// //             dataChartGroup[influencerId]["dataAge"] = [];
// //             dataChartGroup[influencerId]["dataLocation"] = [];
// //         }

// //         const existingFollower = dataChartGroup[influencerId]["dataFollower"].find(follower => follower.monthFollow === item["monthFollowAudiencer"]);
// //         if (!existingFollower) {
// //             dataChartGroup[influencerId]["dataFollower"].push({
// //                 "monthFollow": item["monthFollowAudiencer"],
// //                 "value": item["quantityFollowerAudiencer"]
// //             });
// //         }

// //         const existingGender = dataChartGroup[influencerId]["dataGender"].find(gender => gender.sex === item["genderAudiencer"]);
// //         if (!existingGender) {
// //             dataChartGroup[influencerId]["dataGender"].push({
// //                 "sex": item["genderAudiencer"],
// //                 "value": item["quantityGenderAudiencer"]
// //             });
// //         }
// //         const existingAge = dataChartGroup[influencerId]["dataAge"].find(age => age.type === item["ageRangeAudiencer"]);
// //         if (!existingAge) {
// //             dataChartGroup[influencerId]["dataAge"].push({
// //                 "type": item["ageRangeAudiencer"],
// //                 "value": item["quantityAgeRangeAudiencer"]
// //             });
// //         }

// //         const existingLocation = dataChartGroup[influencerId]["dataLocation"].find(location => location.type === item["locationAudiencer"]);
// //         if (!existingLocation) {
// //             dataChartGroup[influencerId]["dataLocation"].push({
// //                 "type": item["locationAudiencer"],
// //                 "value": item["quantityLocationAudiencer"]
// //             });
// //         }

// //     });

// //     for (const influencerId in dataChartGroup) {
// //         const chartData = dataChartGroup[influencerId];
// //         result.push(chartData);
// //     }
        
// //     return result;
//  }

// function formatChartDataInfluencer(data) {
//     const result = {}; // Thay mảng bằng đối tượng
//     const dataChartGroup = {};

//     data.forEach((item) => {
//         const chartData = item["influencerId"];
//         if (!dataChartGroup[chartData]) {
//             dataChartGroup[chartData] = { ...item };
//             dataChartGroup[chartData]["dataFollower"] = []; // Khởi tạo mảng cho dataFollower
//             dataChartGroup[chartData]["dataGender"] = []; // Khởi tạo mảng cho dataGender
//             dataChartGroup[chartData]["dataAge"] = []; // Khởi tạo mảng cho dataAge
//             dataChartGroup[chartData]["dataLocation"] = []; // Khởi tạo mảng cho dataLocation
//         }
        
//         // Xử lý dataFollower
//         const followerEntry = {
//             "monthFollow": item["monthFollowAudiencer"],
//             "value": item["quantityFollowerAudiencer"]
//         };
//         if (!dataChartGroup[chartData]["dataFollower"].some(entry => entry.monthFollow === followerEntry.monthFollow)) {
//             dataChartGroup[chartData]["dataFollower"].push(followerEntry);
//         }

//         // Xử lý dataGender
//         const genderEntry = {
//             "sex": item["genderAudiencer"],
//             "value": item["quantityGenderAudiencer"]
//         };
//         if (!dataChartGroup[chartData]["dataGender"].some(entry => entry.sex === genderEntry.sex)) {
//             dataChartGroup[chartData]["dataGender"].push(genderEntry);
//         }

//         // Xử lý dataAge
//         const ageEntry = {
//             "type": item["ageRangeAudiencer"],
//             "value": item["quantityAgeRangeAudiencer"]
//         };
//         if (!dataChartGroup[chartData]["dataAge"].some(entry => entry.type === ageEntry.type)) {
//             dataChartGroup[chartData]["dataAge"].push(ageEntry);
//         }

//         // Xử lý dataLocation
//         const locationEntry = {
//             "type": item["locationAudiencer"],
//             "value": item["quantityLocationAudiencer"]
//         };
//         if (!dataChartGroup[chartData]["dataLocation"].some(entry => entry.type === locationEntry.type)) {
//             dataChartGroup[chartData]["dataLocation"].push(locationEntry);
//         }
//     });

//     for (const influencerId in dataChartGroup) {
//         const charData = dataChartGroup[influencerId];
//         result[influencerId] = charData; // Thêm vào đối tượng result theo influencerId
//     }

//     return result;
// }



function formatChartDataInfluencer(data) {
    const dataChartGroup = {};

    _.forEach(data, (item) => {
        const influencerId = item["influencerId"];

        if (!dataChartGroup[influencerId]) {
            dataChartGroup[influencerId] = {
                "influencerId": influencerId,
                "dataFollower": [],
                "dataGender": [],
                "dataAge": [],
                "dataLocation": [],
                "dataJob":[]
            };
        }

        dataChartGroup[influencerId]["dataFollower"].push({
            "monthFollow": item["monthFollowAudiencer"],
            "value": item["quantityFollowerAudiencer"]
        });

        dataChartGroup[influencerId]["dataGender"].push({
            "sex": item["genderAudiencer"],
            "value": item["quantityGenderAudiencer"]
        });

        dataChartGroup[influencerId]["dataAge"].push({
            "type": item["ageRangeAudiencer"],
            "value": item["quantityAgeRangeAudiencer"]
        });

        dataChartGroup[influencerId]["dataLocation"].push({
            "type": item["locationAudiencer"],
            "value": item["quantityLocationAudiencer"]
        });
        dataChartGroup[influencerId]["dataJob"].push({
            "jobId": item["idJob"],
            "jobName": item["nameJob"],
            "jobPlatform": item["platformJob"],
            "costForm": item["costForm"],
            "costTo": item["costTo"],
            "quantityNumberWork": item["quantityNumberWork"],
            "linkJob": item["linkJob"],
            "describes": item["describes"],
            "startDate": item["startDate"],
            "endDate": item["endDate"],
            "statusId": item["statusId"],
            "formatid": item["formatid"]
        });

    });

    const result = _.values(dataChartGroup);
    
    // Loại bỏ các đối tượng trùng lặp trong mảng
    _.forEach(result, (item) => {
        item["dataFollower"] = _.uniqBy(item["dataFollower"], "monthFollow");
        item["dataGender"] = _.uniqBy(item["dataGender"], "sex");
        item["dataAge"] = _.uniqBy(item["dataAge"], "type");
        item["dataLocation"] = _.uniqBy(item["dataLocation"], "type");
        item["dataJob"] = _.uniqBy(item["dataJob"], "jobId");
        // Xóa các trường không cần thiết - Dung -> delete item[]
        // delete item["monthFollowAudiencer"];
        // delete item["quantityFollowerAudiencer"];
    });
    
    return result;
}
function increaseID(lastId) {
    try{
        const wordChar= lastId.match(/[A-Za-z]+/)[0]; // Tách phần chữ ra khỏi mã
        const numChar = parseInt(lastId.match(/\d+/)[0]); // Tách phần số và chuyển sang số nguyên
    
        const newNum = numChar + 1; // Tăng phần số lên 1
    
        // Định dạng lại phần số để có độ dài tương tự
        const newString = newNum.toString().padStart(lastId.length - wordChar.length, '0');
    
        const newId = wordChar + newString; // Kết hợp phần chữ và phần số mới
    
        return newId;
    }catch(e){
        console.log(e)
    }
    
}


module.exports = {formatChartDataInfluencer,formatResponseInfluencerToObject,formatResponseUserToObject,formatResponseInfluencerToArray,formatResponseClientToArray,formatResponseClientToObject,increaseID}
