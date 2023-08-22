import axiosClient from "./AxiosClient"

const ApiInfluencer = {
    addNewInfluencer(data){
        const url = '/influ/addInfluencer'
        return axiosClient.post(url,data)
    },
    getIDInfluencer(email) {
        console.log("nickname", email)
        const url = "/influ/getIdInfluencer"
        return axiosClient.post(url, { email: email })
    },
    updateAvatarInfluencer(data){
        const url = '/influ/updateInfluencer'
        return axiosClient.post(url,  data )
    }
}

export default ApiInfluencer