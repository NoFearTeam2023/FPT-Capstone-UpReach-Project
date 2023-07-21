const formatResponseInfluencer = (payload) => {
    const formatValue = payload.reduce(
    ( _accumulator, currentValue) => {
        return {
            ...currentValue,
            Type_Id: [...new Set(payload.map((e) => e.Type_Id))] ,
            Format_ID: [...new Set(payload.map((e) => e.Format_ID))],
            Topics_Id: [...new Set(payload.map((e) => e.Topics_Id))] ,
            Location: [...new Set(payload.map((e) => e.Location))],
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

function convertArray(payload){
    if (!Array.isArray(payload)) {
        payload = [payload];
        return payload
    }
    return payload;
}

module.exports = {formatResponseInfluencer,convertArray,formatResponseUser}

