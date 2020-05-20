import ApiService, { API_LIST ,rootAPI} from ".";
import moment from 'moment';
class LichCongTacAPI extends ApiService {
    async getDsLichCongTac(start, end,offset,limit,type) {
        params = {
            startDate: start,
            endDate: end,
            offset,
            limit,
            type
        };
        res = await rootAPI.apiGetList(API_LIST.LICH_CONG_TAC_DANH_SACH, params);
        return res;
    }
    async getChiTietLichCongTac(id) {
        res = await rootAPI.apiGetDetail(API_LIST.LICH_CONG_TAC_CHI_TIET, id);
        return res;
    }
 
    async taoLichCongTac(param) {
        param.startDate = moment(param.time,'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm');
        param.endDate = param.startDate;
        param.number_car = param.driver.split('-')[1].trim();
        param.driver = param.driver.split('-')[0].trim();
        res = await rootAPI.postAItem(API_LIST.LICH_CONG_TAC_CHI_TIET_THEM, param);
        return res;
    }
}

export default new LichCongTacAPI;
