import axiosClient from "./AxiosClient"

const PointAndHistoryReport = {
    updateSearchPoint(ClientId, PointReport){
        const url = '/influ/search-minus-point';
        return axiosClient.post(url, {clientId :ClientId, pointReport:PointReport})
    },
    updateReportOfInfluencer(ClientId, PointReport){
        const url = '/influ/report-influencer';
        return axiosClient.post(url, {clientId :ClientId, pointReport:PointReport})
    },
    getAllHistoryReport(ClientId){
        const url = '/influ/get-data-history-report';
        return axiosClient.post(url, {clientId : ClientId})
    },
    insertDataToHistory(InfluencerId, ClientId){
        const url = '/influ/insert-data-history-report';
        return axiosClient.post(url, {influencerId : InfluencerId, clientId : ClientId})
    },
    updatePointSearch(ClientId, PointSearch){
        const url = '/influ/search-minus-point';
        return axiosClient.post(url, {clientId : ClientId,pointSearch:PointSearch})
    },
    updatePointReport(ClientId, PointReport){
        const url = '/influ/report-influencer';
        return axiosClient.post(url, {clientId : ClientId,pointReport:PointReport})
    },
}

export default PointAndHistoryReport