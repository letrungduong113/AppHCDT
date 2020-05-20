import ApiService, { API_LIST ,rootAPI} from ".";
import moment from 'moment'
class NhatKyAPI extends ApiService {
    async getDsNhatKy(offset) {
        params = {
            offset: offset,
            limit: 10
        };
        res = await rootAPI.apiGetList(API_LIST.NHAT_KY_DANH_SACH, params);
        return res;
    }
    async taoNhatKy(body){
        params ={
            noiDung : body.noiDung,
            loaiThongBao : body.loaiThongBao,
            thoiGianThongBaoText: moment(body.date,'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm'),
            status : 0,
            isNoTiFy : body.isNoTiFy,
        }
        res = await rootAPI.postAItem(API_LIST.NHAT_KY_TAO, params);
        return res;
    }
 
}

export default new NhatKyAPI;
