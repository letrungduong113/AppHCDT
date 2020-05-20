import ApiService, { API_LIST, rootAPI } from ".";

class BaoCaoAPI extends ApiService {
    // async getDsBaoCaoKinhTe(linhvucId) {
    //     params = {
    //         id: linhvucId,
    //     };

    //     res = await rootAPI.apiGetList(API_LIST.BAO_CAO_DANH_SACH_KINH_TE, params);
    //     return res;
    // }
    // async getDsBaoCaoGiaoDuc(linhvucId) {
    //     params = {
    //         id: linhvucId,
    //     };

    //     res = await rootAPI.apiGetList(API_LIST.BAO_CAO_DANH_SACH_GIAO_DUC, params);
    //     return res;
    // }
    async getloaiHinhBaoCao(loaiHinhId) {
        params = {
            id: loaiHinhId,
        };

        res = await rootAPI.apiGetList(API_LIST.LOAI_HINH_DANH_SACH, params);
        return res;
    }
    async getDsBaoCao(loaiHinhId) {
        params = {};
        if (loaiHinhId) {
            params = {
                id: loaiHinhId,
            };
        }
        res = await rootAPI.apiGetListCms('POST', API_LIST.BAO_CAO_DANH_SACH, params);
        return res;
    }

    
    async getBaoCaoChiTiet(chitieuId) {
        res = await rootAPI.apiGetListCms('GET', API_LIST.CHI_TIEU_KT_CHI_TIET_DU_BAO);
        return res;
      }
  
}

export default new BaoCaoAPI;
