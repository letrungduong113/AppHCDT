import ApiService, { API_LIST, rootAPI } from ".";

class MasterAPI extends ApiService {
    async getDsLinhVucBaoCao() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_LINH_VUC_BAO_CAO);
        return res;
    }
    async getDsDonVi() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_DON_VI);
        return res;
    }
    async getDsLinhVuc(groupTypeValue = 1) {
        params = {
            groupType:groupTypeValue
          };
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_LINH_VUC, params);
        return res;
    }
    async getDsSoNganh() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_SO_NGANH);
        return res;
    }
    async getDsLoaiTaiLieu() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_LOAI_TAI_LIEU);
        return res;
    }
    async getDsTrangThaiKhanCap() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_KHAN_CAP);
        return res;
    }
    async getDsTrangThaiNhiemVu() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_NHIEM_VU);
        return res;
    }
    async getDsTrangThaiTinTuc() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_TIN_TUC);
        return res;
    }
    async getDsTrangThaiVuViec() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_VU_VIEC);
        return res;
    }
    async getDsTrangThaiVanBan() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_VAN_BAN);
        return res;
    }
    async getDsTrangThaiThongBao() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_TRANG_THAI_THONG_BAO);
        return res;
    }
    async getDsDonViCapDuoi() {
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_DON_VI_CAP_DUOI);
        return res;
    }
    getDSMau
    async getDSMau(cateTypeId=22,cateId=1) {
        params = {
            cateTypeId:cateTypeId,
            cateId:cateId
          };
        res = await rootAPI.apiGetList(API_LIST.MASTER_MAU,params);
        return res;
    }
}

export default new MasterAPI;
