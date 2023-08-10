import axiosClient from "./AxiosClient"

const ApiListClient = {
    updateProfileClient(data){
        const url = '/client/updateClientProfile';
        return axiosClient.post(url, data)
    },

}

export default ApiListClient