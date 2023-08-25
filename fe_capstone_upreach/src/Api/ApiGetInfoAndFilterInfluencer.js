import axiosClient from "./AxiosClient"

const ApiGetInfoAndFilterInfluencer = {
    searchInfluencer(InputSearch){
        // InputSearch param is object need to search it must have some attribute { clientId, pointSearch, costEstimateFrom,
        // costEstimateTo, ageFrom, ageTo, contentTopic, nameType, contentFormats, audienceGender, audienceLocation } 
        const url = '/influ/search';
        return axiosClient.post(url, InputSearch)
    },
    getAllInfluencer(Email,Role){
        const url = "/client/homePage";
        return axiosClient.post(url,{email : Email, role: Role})
    },
}

export default ApiGetInfoAndFilterInfluencer