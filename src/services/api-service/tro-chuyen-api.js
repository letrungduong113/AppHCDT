import ApiService, { API_LIST, rootAPI } from ".";

class TroChuyenApi extends ApiService {
    async getTroChuyen(receiveIdVal) {
        params = {
            receiveId: receiveIdVal
        };
        res = await rootAPI.apiGetList(API_LIST.CUOC_TRO_CHUYEN, params);
        if(res){
            for(let i = 0 ; i < res.length; i++){
                if(res[i].createdTime)
                res[i].createdTime = res[i].createdTime.slice(0,-7)
            }
        }
        return res;
    }

    async guiTinNhan(sendUserIdVal,receiveIdVal,content) {
        body = {
            sendUserId: sendUserIdVal,
            receiveUserId: receiveIdVal,
            message:content
          };
        res = await rootAPI.postAItem(API_LIST.GUI_TIN_NHAN, body);
        return res;
    }

    async getAvatar(avatar) {
        res = await rootAPI.imageLinkToSrc(avatar);
        return res;
    }
}


export default new TroChuyenApi;
