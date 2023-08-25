import axiosClient from "./AxiosClient"

const ApiListInfluecer = {
    getListMenu(clientID){
        const url = '/getlistbyuserid';
        return axiosClient.post(url, {ClientID: clientID})
    },
    addListClient(clientID,idList, nameList){
        const url = '/addlistclient';
        return axiosClient.post(url, {ClientID: clientID,IdList: idList, NameList: nameList})
    },
    editListName(clientID,idList,nameList){
        const url = '/editnamelist';
        return axiosClient.post(url, {ClientID: clientID,ListID: idList, UpdateNameList: nameList})
    },
    deleteListClient(idList){
        const url = '/deletelistclient';
        return axiosClient.post(url, {IdList: idList})
    },
    getTableKOLs(clientID,idList){
        const url = '/gettablekols';
        return axiosClient.post(url, {ClientID: clientID,IdList: idList})
    },
    deleteTableKOLs(idProfile,idList){
        const url = '/deletetablekols';
        return axiosClient.post(url, {IdProfile: idProfile,IdList: idList})
    },
    deleteAllTable(idList){
        const url = '/deletealltable';
        return axiosClient.post(url, {IdList: idList})
    },
    addTableKOLs(listKOLsID,kOLsID,idList){
        const url = '/addtotablekols';
        return axiosClient.post(url, {ListKOLsID: listKOLsID,KOLsID : kOLsID ,ClientListID: idList})
    },
    getStatusListOfKOLs(clientID,kOLsID){
        const url = '/getstatuslistofkols';
        return axiosClient.post(url, {ClientID: clientID,KOLsID : kOLsID})
    },
    getAudienceDataAge(listKOLsID){
        const url = '/getdatachartageaudi';
        return axiosClient.post(url, {ListKOLsID: listKOLsID})
    },
    getAudienceDataGender(listKOLsID){
        const url = '/getdatachartgenderaudi';
        return axiosClient.post(url, {ListKOLsID: listKOLsID})
    },
    
}

export default ApiListInfluecer