import axiosClient from "./AxiosClient"

const ApiListClient = {
    updateProfileClient(data){
        const url = '/client/updateClientProfile';
        return axiosClient.post(url, data,{ headers: { 'Content-Type': 'multipart/form-data' }})
    },

}

export default ApiListClient