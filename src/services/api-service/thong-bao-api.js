import ApiService, { API_LIST, rootAPI } from ".";

class ThongBaoAPI extends ApiService {
    async getDsThongBao(offsetVal = 0, limitVal = 10) {
        params = {
            offset: offsetVal,
            limit: limitVal
        };

        res = await rootAPI.apiGetList(API_LIST.THONG_BAO_DANH_SANH, params);
        return res;
    }

    async getUpdateReadNoti(notiIdVal) {
        params = {
            notiId: notiIdVal,
        };

        res = await rootAPI.apiGetList(API_LIST.THONG_BAO_UPDATE_READ, params);
        return res;
    }
}

export default new ThongBaoAPI;