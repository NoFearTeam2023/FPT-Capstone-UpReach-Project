import axiosClient from "./AxiosClient"

const ApiListInfluecer = {
    getListMenu(){
        const url = '/getlistbyuserid';
        return axiosClient.post(url, {ClientID: "CL001"})
    },
    addListClient(idList, nameList){
        const url = '/addlistclient';
        return axiosClient.post(url, {ClientID: "CL001",IdList: idList, NameList: nameList})
    },
    editListName(idList,nameList){
        const url = '/editnamelist';
        return axiosClient.post(url, {ClientID: "CL001",ListID: idList, UpdateNameList: nameList})
    },
    deleteListClient(idList){
        const url = '/deletelistclient';
        return axiosClient.post(url, {IdList: idList})
    },
    getTableKOLs(idList){
        const url = '/gettablekols';
        return axiosClient.post(url, {ClientID: "CL001",IdList: idList})
    },
    deleteTableKOLs(idProfile,idList){
        const url = '/deletetablekols';
        return axiosClient.post(url, {IdProfile: idProfile,IdList: idList})
    },
    deleteAllTable(idList){
        const url = '/deletealltable';
        return axiosClient.post(url, {IdList: idList})
    },
    
}

export default ApiListInfluecer