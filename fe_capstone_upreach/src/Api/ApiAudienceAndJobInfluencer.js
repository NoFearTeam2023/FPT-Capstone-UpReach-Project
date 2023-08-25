import axiosClient from "./AxiosClient"

const ApiAudienceAndJobInfluencer = {
    getDataForChart(IdInflu){
        const url = '/influ/data-chart';
        return axiosClient.post(url, {influencerId : IdInflu})
    },
}

export default ApiAudienceAndJobInfluencer