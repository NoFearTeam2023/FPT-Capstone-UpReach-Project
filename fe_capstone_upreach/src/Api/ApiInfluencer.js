import axiosClient from "./AxiosClient"

const ApiInfluencer = {
    addNewInfluencer(data){
        const url = '/influ/addInfluencer'
        return axiosClient.post(url,data)
    },
    addNewInfluencerImage(data){
        const url = '/influ/addInfluencerImage'
        return axiosClient.post(url,data)
    }
}

export default ApiInfluencer