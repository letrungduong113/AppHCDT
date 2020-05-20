import ApiService, { API_LIST, rootAPI } from ".";

class NguoiDanAPI extends ApiService {
    async getNguoiDan(typeDanLuanVal= 1, boPhan = "") {
        params = {
            typeDanLuan: typeDanLuanVal,
            boPhan: boPhan
        };

        //res = await rootAPI.apiGetList(API_LIST.NGUOI_DAN, params);
        res = await rootAPI.apiGetListExternal('http://aicdemo.com/0rikkei/hcdt/public/api/client/du_luan/nguoi_dan', params);
        return res;
    }

    async getThongKe(year) {
        params = {
            year: year,
        }

        res = await rootAPI.apiGetListExternal('http://aicdemo.com/0rikkei/hcdt/public/api/client/du_luan/nguoi_dan_thong_ke', params);
        return res;
    }
}

export default new NguoiDanAPI;