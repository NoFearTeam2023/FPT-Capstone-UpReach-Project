const formatResponseInfluencer = (payload) => {
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

const formatResponseUser = (payload) => {
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

function convertData(data) {
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
      } else {
        kolGroups[kolId]["influencerTypeName"].add(item["influencerTypeName"]);
        kolGroups[kolId]["influencerContentTopicName"].add(item["influencerContentTopicName"]);
        kolGroups[kolId]["influencerContentFormatName"].add(item["influencerContentFormatName"]);
        kolGroups[kolId]["audienceLocation"].add(item["audienceLocation"]);
        kolGroups[kolId]["audienceGender"].add(item["audienceGender"]);
      }
    });
  
    for (const kolId in kolGroups) {
      const kolData = kolGroups[kolId];
      kolData["influencerTypeName"] = Array.from(kolData["influencerTypeName"]);
      kolData["influencerContentTopicName"] = Array.from(kolData["influencerContentTopicName"]);
      kolData["influencerContentFormatName"] = Array.from(kolData["influencerContentFormatName"]);
      kolData["audienceLocation"] = Array.from(kolData["audienceLocation"]);
      kolData["audienceGender"] = Array.from(kolData["audienceGender"]);
      result.push(kolData);
    }
  
    return result;
}


function convertArray(payload){
    if (!Array.isArray(payload)) {
        payload = [payload];
        return payload
    }
    return payload;
}

module.exports = {formatResponseInfluencer,convertArray,formatResponseUser,convertData}

