import {Alert, Platform, PlatformIOS } from 'react-native';

import DummyDataService from "../dummy-data-service";
import NavigationService from "../navigation-service";
const RNFS = require('react-native-fs');

// const server = "http://172.17.0.100:8080";      // DEV SERVER
// const server = 'http://172.17.0.100:8088';    // TEST SERVER
const server = 'http://13.250.56.249:8080';     // PUBLIC SERVER

const serverWeather="https://api.darksky.net/forecast/";
const weather_key="57d4ede1fa8c44820a512184e3769ad1"

const loginserverURL    = `${server}/authentication/`;
const serverURL         = `${server}/hcdt/`;
const serverFileURL     = `${server}/file-manager/`;
const serverCMSURL       = `${server}/hcdt_cms/`;
const isUsingDummy = false;

export const API_LIST = {
    MASTER_DS_LINH_VUC_BAO_CAO: 'master_ds_linh_vuc_bao_cao',
    MASTER_DS_LINH_VUC: 'new/linh_vuc',
    MASTER_DS_SO_NGANH: 'don_vi_cap_duoi',
    MASTER_DS_LOAI_TAI_LIEU: 'loai_van_ban',
    MASTER_DS_TRANG_THAI_KHAN_CAP: 'master_khan_cap',
    MASTER_DS_TRANG_THAI_NHIEM_VU: 'master_nhiem_vu',
    MASTER_DS_TRANG_THAI_TIN_TUC: 'master_tin_tuc',
    MASTER_DS_TRANG_THAI_VU_VIEC: 'master_vu_viec',
    MASTER_DS_TRANG_THAI_VAN_BAN: 'master_duyet_van_ban',
    MASTER_DS_TRANG_THAI_THONG_BAO: 'master_thong_bao',
    MASTER_DS_DON_VI_CAP_DUOI: 'master_don_vi_cap_duoi',
    MASTER_DS_DON_VI: 'getlist/donvi',
    MASTER_MAU:'comment/getCommentPattern',
    LOG_IN: 'user/login',
    LOG_OUT: 'user/logout',
    FORGOT_PASS: 'user/forgot-password',

    /* Common API: Văn bản đính kèm, Post ý kiến chỉ đạo, download file */
    COMMON_VAN_BAN_DINH_KEM: 'file/tin_khan_cap/getListFileDocByNewsID/${0}',
    COMMON_POST_CHI_DAO: 'tinKhanCap/themMoiYKienChiDao',
    COMMON_POST_NOTI: 'noti/Comment',
    COMMON_FILE_UPLOAD: 'file/tinkhancap/y-kien-chi-dao/upload?newsID=${0}&commentID=0',
    COMMON_CHI_TIET_TIEN_TRINH: 'tinKhanCap/getListComment',
    COMMON_BUTTON_COMPLETE:'tinKhanCap/hoanThanhYKienChiDao',
    COMMON_TIEN_TRINH_FILE_DINH_KEM: 'file/list_doc/getListFileDocByNewsCmtID/${0}/${1}',
    COMMON_GET_THONG_KE: 'report/news',
    COMMON_GET_THONG_KE_THEO_ALL:'linh_vuc_quan_ly/thong_ke_don_vi_phu_trach',
    COMMON_GET_THONG_KE_TOTAL: 'report/totalnews',
    COMMON_GET_KET_NOI: 'connection/getlist',
    COMMON_GET_NOI_DUNG_MAU: 'comment/getCommentPattern',

    BAO_CAO_DANH_SACH :'cms000007/01',
    BAO_CAO_DANH_SACH_KINH_TE :'ds_bao_cao_tong_hop_kinh_te',
    BAO_CAO_DANH_SACH_GIAO_DUC: 'ds_bao_cao_tong_hop_giao_duc',
    LOAI_HINH_DANH_SACH: 'loai_hinh_bao_cao',
    BAO_CAO_CHI_TIET : '',
    BAO_CAO_CHI_TIET_BIEU_DO: '',
    BAO_CAO_TIM_NHANH: '',
    BAO_CAO_TIM_KIEM_SO: '',

    KHAN_CAP_DANH_SACH: 'tinKhanCap/getListEmergency',
    KHAN_CAP_CHI_TIET: 'tinKhanCap/getEmergencyDetail',
    KHAN_CAP_CHI_TIET_DANH_SACH_ANH: 'file/tin_khan_cap/getListMediaFileByNewsID/${0}',
    KHAN_CAP_CHI_TIET_ND_CHI_DAO: '',
    KHAN_CAP_CHI_TIET_TIEN_TRINH: 'tinKhanCap/getListComment',
    KHAN_CAP_CHI_TIET_CHI_DAO: 'tinKhanCap/themMoiYKienChiDao',
    KHAN_CAP_FILE_UPLOAD: 'file/tinkhancap/y-kien-chi-dao/upload?newsID=${0}&commentID=${1}',
    KHAN_CAP_LOCATIONS: 'api/news/locations',
    KHAN_CAP_LOCATIONDETAIL: 'api/news/locations/detail',
    KHAN_CAP_CHIDAONHANSU: 'tinKhanCap/chi_dao_nhan_su',

    LICH_CONG_TAC_DANH_SACH: 'lich',
    LICH_CONG_TAC_CHI_TIET: 'lichChiTiet',
    LICH_CONG_TAC_CHI_TIET_THEM: 'themlichcongtac',

    VAN_BAN_DEN_DANH_SACH: 'van_ban/den/nguoi_xu_ly',
    VAN_BAN_DEN_CHI_TIET: 'van_ban/den/by_nguoi_xu_ly',
    VAN_BAN_DI_DANH_SACH: 'van_ban/di/nguoi_xu_ly',
    VAN_BAN_DI_CHI_TIET: 'van_ban/di/by_nguoi_xu_ly',
    DUYET_VAN_BAN_DEN:'van_ban/den/y-kien-chi-dao',
    DUYET_VAN_BAN_DI:'van_ban/di/y-kien-chi-dao',
    VAN_BAN_DEN_FILE_UPLOAD: 'file/van_ban/den/upload/${0}',
    VAN_BAN_DI_FILE_UPLOAD: 'file/van_ban/di/upload/${0}',
    
    NHIEM_VU_NHAN_DANH_SACH: 'nhiem_vu/nhan/by_nguoi_xu_ly',
    NHIEM_VU_NHAN_CHI_TIET: 'nhiem_vu/nhan/by_nguoi_xu_ly', 
    NHIEM_VU_GIAO_DANH_SACH:'nhiem_vu/giao/by_nguoi_xu_ly',
    NHIEM_VU_GIAO_CHI_TIET:'nhiem_vu/giao/by_nguoi_xu_ly',
    NHIEM_VU_CHI_TIET_CHI_DAO:'tinKhanCap/themMoiYKienChiDao',
    NHIEM_VU_FILE_UPLOAD: 'file/nhiem-vu/y-kien/upload/${0}',
    NHIEM_VU_TIEN_TRINH:'nhiem_vu/tien-trinh/by_nguoi_xu_ly',

    CHI_TIEU_KT_DANH_SACH: 'api/chi_tieu/get_list_hot_chi_tieu',
    CHI_TIEU_KT_CHI_TIET_TIEN_TRINH: 'tinKhanCap/getListComment',
    CHI_TIEU_KT_CHI_TIET_KET_QUA: 'api/chi_tieu/get_tien_do_theo_thang',
    CHI_TIEU_KT_CHI_TIET_NOI_DUNG: 'api/chi_tieu/get_chi_tiet_chi_tieu',
    CHI_TIEU_KT_CHI_TIET_DU_BAO: 'cms000008/01',
    
    MUC_TIEU_FILE_UPLOAD: 'file/y_kien/upload_files',
    MUC_TIEU_CHI_TIET_CHI_DAO:'api/chi_tieu/y_kien_chi_dao/mobile',

    TIEN_ICH_LICH_SU:'canhan/danhSachLichSu',
    TIEN_ICH_TIM_KIEM_LICH_SU:'canhan/timKiemLichSu',
    TIEN_ICH_PROFILE: 'user/profile',
    THONG_BAO_DANH_SANH: 'noti/getAllNotification',
    THONG_BAO_UPDATE_READ: 'noti/updateReadNoti',

    // THONG_BAO_DANH_SANH: 'ds_thong_bao',
    CHI_TIET_DANH_SACH: '',
    DANH_SACH_CAP_DUOI:'bao-cao-truc-tiep/getAllFriends',
    NGUOI_DAN: 'danLuan/getAllDanLuan',
    CONG_DONG_MANG: 'cong_dong_mang',

    LINH_VUC_QUAN_LY: 'linhvucquanly',
    LVQL_QUYET_DINH_PHAN_CONG_NHIEM_VU: 'linh_vuc_quan_ly/qdpcnv',
    LVQL_DON_VI_DANG_PHU_TRACH: 'linh_vuc_quan_ly/don_vi_phu_trach',
    LVQL_LINH_VUC_DANG_PHU_TRACH: 'linhvucdangphutrach',
    LVQL_SU_KIEN_QUAN_TRONG: 'linh_vuc_quan_ly/su_kien_quan_trong',
    LVQL_DU_AN_QUAN_TRONG: 'linh_vuc_quan_ly/du_an_trong_diem',
    LVQL_CONG_VIEC_CHAM_TIEN_DO: 'linh_vuc_quan_ly/cv_cham_tiem_do',
    LVQL_CHI_TIET_PHAN_CONG: 'linh_vuc_quan_ly/qdpcnv',
    LVQL_CHI_TIET_DON_VI: 'linh_vuc_quan_ly/don_vi_phu_trach/ds_nhiem_vu_giao',
    LVQL_CHI_TIET_DU_AN: 'linh_vuc_quan_ly/du_an_trong_diem',
    LVQL_CHI_TIET_CONG_VIEC: 'van_ban/di/by_nguoi_xu_ly',
    LVQL_MUC_TIEU_SO_TAI_CHINH: 'muc_tieu_so_tai_chinh',
    LVQL_NHIEM_VU_SO_TAI_CHINH: 'nhiem_vu_so_tai_chinh',
    LVQL_CHI_TIET_SU_KIEN: 'linh_vuc_quan_ly/su_kien_quan_trong',
    LVQL_GET_THONG_TIN: 'api/get_don_vi',
    
    
    //Việt
    LVQL_DON_VI_PHU_TRACH: 'linh_vuc_quan_ly/don_vi_phu_trach',

    NHAT_KY_DANH_SACH:'canhan/getLstNhatKy',
    NHAT_KY_TAO:'canhan/themMoiNhatKy',
    TIM_KIEM:'news/chatbotsearch',

    CUOC_TRO_CHUYEN:'messsage/getfriendmessage',
    GUI_TIN_NHAN:'messsage/sendmessage',

    //Image
    SKQT_GET_IMAGE:serverFileURL+'file_detail/tin_khan_cap/download/'
}

const ERROR_MESSAGES = {
    '405': 'Không có quyền truy cập vào chức năng này!',
    '404': 'Không tồn tại URL!',
    '401': 'Gia hạn token thất bại!',
    '406': 'Định dạng token không đúng!',
    '410': 'Token bị vô hiệu do đã có phiên login khác!',
    '400': 'Không tìm thấy nội dung yêu cầu!',
    '500': 'Lỗi hệ thống (Internal server error).',
}

export default class ApiService {
    static accesstoken = '';
    setToken(token) {
        this.accesstoken = token;
    }
    getToken()
    {
        return this.accesstoken;
    }
    removeToken() {
        this.accesstoken = '';
    }

    formatString(str, ...keys) {
        for (id = 0; id < keys.length; id ++) {
            str = str.replace("${" + id + "}", keys[id] );
        }
        return str;
    }
    
    async apiGetList(apiName, params = null) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        // alert(this.accesstoken)
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        paramStr = paramStr.slice(0, -1);
        let url = serverURL + apiName + paramStr;
        // alert(url)
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            console.log(`URL: ${url} \nHTTP Status: ${response.status}`);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
            }
        }
    async apiGetListCms(method='GET', apiName, params = null) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        // alert(this.accesstoken)
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        paramStr = paramStr.slice(0, -1);
        url = serverCMSURL + apiName;
        console.log(url);
        
        try {
            response = null;
            if (method == "GET") {
                url = url + paramStr;
                response = await fetch(
                    url,
                    {
                        method: method,
                        headers: {
                            Accept: 'application/json',
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                )
            }
            else {
                response = await fetch(
                    url,
                    {
                        method: method,
                        headers: {
                            Accept: 'application/json',
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(params),
                    }
                )
            }
            

            
            console.log(response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
     
    async apiGetListFiles(apiName, params = null) {
        console.log("---------------------------GET FILE LIST ---------------------------------");
        
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        // alert(this.accesstoken)
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        paramStr = paramStr.slice(0, -1);
        let url = serverFileURL + apiName + paramStr;
        //console.log(url);
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
           
            //console.log('STATUS CODE ' + response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log('API: ' + apiName + 'RESPONSE: ' + JSON.stringify(responseJson));
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async apiGetListExternal(apiName, params = null) {
        var token = this.accesstoken;
        // alert(this.accesstoken)
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        paramStr = paramStr.slice(0, -1);
        let url = apiName + paramStr;
        // alert(url)
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            console.log("------------------------------------------------------------");
            console.log(url);
            console.log(response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async apiGetDetail(apiName, id = null, params = null) {
        // alert(apiName)
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName, id);
        }
        var token = this.accesstoken;
        let url = serverURL + apiName;
        if (id) {
            url = url + '/' + id;
        }

        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        
        paramStr = paramStr.slice(0, -1);
        url = url  + paramStr;
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            console.log("---------------------------------------------------------------");
            console.log(url);
            console.log(response);
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }

        } catch (error) {
            //alert(error);
            console.error(error);
            return null;
        }
    }
    async apiGetDetailExternal(apiName, params = null) {
        
        let url = apiName;
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        
        paramStr = paramStr.slice(0, -1);
        url = url  + paramStr;

        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            console.log(url);
            console.log(response.status);

            if (response.status == "200") {
                let responseJson = await response.json();
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }

        } catch (error) {
            //alert(error);
            console.error(error);
            return null;
        }
    }

    async logIn(loginInfo) {
        if (isUsingDummy) {
            return DummyDataService.getDummyData(API_LIST.LOG_IN);
        }
        let url = loginserverURL + API_LIST.LOG_IN;
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                    body: JSON.stringify(loginInfo)
                }
            ) 
            if (response.status == "200") {
                this.setToken(response.headers.map.authorization);
                let responseJson = await response.json();
                return responseJson;
            }
            else {

                return null;
            }
            
        } catch (error) {
            return null;
        } 
    }

    async logOut(device) {
        if (isUsingDummy) {
            return {isSuccess: true};
        }
        let url = loginserverURL + API_LIST.LOG_OUT + "/"+ device;
        var token = this.accesstoken;
        
        try {
            let response = await fetch(
                url,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: token,
                    },
                }
            )
            
            if (response.status == "200") {
                this.removeToken();
                // alert(JSON.stringify(responseJson));
                //let responseJson = await response.json();
                return {isSuccess: true};
            }
            else {
                // this.processError(API_LIST.LOG_OUT, response.status, response);
                return {isSuccess: false};
            }
        } catch (error) {
            console.error(error);
            return {isSuccess: false};
        }
    }

    async forgotpass(user, mail) {
        // if (isUsingDummy) {
        //     return DummyDataService.getDummyData(API_LIST.LOG_IN);
        // }
        let url = loginserverURL + API_LIST.FORGOT_PASS;
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                    body: JSON.stringify({
                        username: user,
                        email: mail
                    })
                }
            )
            if (response.status == "200") {
                // alert(JSON.stringify(response.headers.map.authorization[0]));

                // this.setToken(response.headers.map.authorization[0]);
                // let responseJson = await response.json();
                // return responseJson;
            }
            else {

                return null;
            }
            
        } catch (error) {
            return null;
        } 
    }

    async userInfo() {
        apiName = API_LIST.TIEN_ICH_PROFILE;
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        let url = loginserverURL + apiName;
        
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
                
            if (response.status == "200") {
                let responseJson = await response.json();
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }

        } catch (error) {
            //alert(error);
            console.error(error);
            return null;
        }
    }

    async postAItem(apiName, itemData) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        let url = serverURL + apiName;
        // console.log(url);
        console.log(itemData);
        // alert(JSON.stringify(itemData))
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                }
            )
            // let responseJson = {};
            console.log("HTTP status: " + response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }

    async postAItemHaveToken(apiName, itemData,token) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        let url = serverURL + apiName;
        // console.log(url);
        console.log(itemData);
        // alert(JSON.stringify(itemData))
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                }
            )
            
            // let responseJson = {};
            console.log("HTTP status: " + response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }

    async postGetItem(apiName,params, itemData) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        var token = this.accesstoken;
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        paramStr = paramStr.slice(0, -1);
        let url = serverURL + apiName + paramStr;
        //console.log(url)
        // alert(url)
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                }
            )
            console.log(`URL: ${url}, \n HTTP Status: ${response.status}`)
            // let responseJson = {};
            // alert(JSON.stringify(response))
            // alert(response.status)
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                // alert(JSON.stringify("response"))
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }
  
    async apiFileUpload(apiName, uploadFile) {
       var token = this.accesstoken;
        let url = serverFileURL + apiName;
        const form = new FormData();

        form.append('file', {
            uri: uploadFile.uri,
            type: uploadFile.type,
            name: uploadFile.fileName,
        });

        console.log("------------------Uploading File...--------------------")
        console.log(" API name: " + url);
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data;',
                        'Accept': 'application/json',
                    },
                    body: form,
                }
            )
            console.log(" HTTP status: " + response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.log("------API ERROR-------")
            console.log(error);
            return null;
        }

    }

    async apiFileDownload(url, savedName) {
        console.log("---------------DOWNLOADING: " + url + "---------------");
        var token = this.accesstoken;
        
        var path = (Platform.OS == "android"? RNFS.ExternalDirectoryPath : RNFS.TemporaryDirectoryPath) + "/" + savedName;
        result = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
            background: true,
            headers: {
                Authorization: token,
            },
        }).promise;
        if (result.statusCode == 200) {
            console.log(path);
            return path;
        }
        else {
            return "";
        }
    }
    async processError(api, errorCode, response) {
        // Do nothing
        message = ERROR_MESSAGES[errorCode.toString()] ? ERROR_MESSAGES[errorCode.toString()] : '';
        if (!message.length) {
            let body = await response.json();
            if (body) message = body.message;
        }
       if(errorCode!=500){
        // alertMessage = 'Mã lỗi:  '+ errorCode + "\nNội dung: " + message;
        alertMessage = 'Đường truyền tín hiệu không ổn định\n Bạn vui lòng truy cập lại sau';
        if(errorCode.toString() == 410){
            alertMessage="Bạn vui lòng đăng nhập lại"
        }
        
        // Alert.alert(
        //     'Lỗi hệ thống',
        //     alertMessage,
        //     [
        //         {text: 'OK', onPress: () => {
        //             switch (errorCode.toString()) {
        //                 case '401':
        //                 case '406':
        //                 case '410':
        //                     console.log("-----------TOKEN ERROR!!! ----------------")
        //                     NavigationService.navigate("Login");
        //                     break;
        //             }
        //         }},
        //     ],
        //     {cancelable: false},
        //   );
       }
    }

    imageLinkToSrc(imageUrl) {
        console.log('image',imageUrl)
        return {
            uri: imageUrl + "?random_number="+ new Date().getTime(),
            method: 'GET',
            headers: {
                Authorization: this.accesstoken,
                Pragma: 'no-cache',         
            }
        }
    }


    // Việt
    async postGetItemHaveToken(apiName,params, itemData, tokenHeader =null) {
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        if(tokenHeader == null){
            tokenHeader =  this.accesstoken
        }
        paramStr = paramStr.slice(0, -1);
        let url = serverURL + apiName + paramStr;
        try {
            let response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: tokenHeader,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData)
                }
            )
            console.log(`URL: ${url}, \n HTTP Status: ${response.status}`)
            // let responseJson = {};
            if (response.status == "200") {
                let responseJson = await response.json();
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }

    async apiGetListHaveToken(apiName, params = null,tokenUser = null) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName);
        }
        // alert(this.accesstoken)
        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        if(tokenUser == null){
            tokenUser =  this.accesstoken
        }
        paramStr = paramStr.slice(0, -1);
        let url = serverURL + apiName + paramStr;
        console.log(url);
        console.log(tokenUser)
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: tokenUser,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            
            console.log(response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    imageLinkToSrcHaveToken(imageUrl, token) {
        return {
            uri: imageUrl,
            method: 'GET',
            headers: {
                Authorization: token,
                Pragma: 'no-cache',         
            }
        }
    }
    
    async apiGetDetailHaveToken(apiName, id = null, params = null,token = null) {
        if (isUsingDummy || DummyDataService.isForcedDummy(apiName)) {
            return DummyDataService.getDummyData(apiName, id);
        }
        let url = serverURL + apiName;
        if (id) {
            url = url + '/' + id;
        }

        paramStr = '?';
        if (params) {
            Object.keys(params).map((item) =>{
                paramStr += (item + "=" + params[item] + "&");
            })
        }
        
        paramStr = paramStr.slice(0, -1);
        url = url  + paramStr;
        // alert(url)
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            console.log("---------------------------------------------------------------");
            console.log(url);
            console.log(response.status);
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log(responseJson);
                // alert(JSON.stringify(responseJson))
                return responseJson;
            }
            else {
                this.processError(apiName, response.status, response);
                return null;
            }

        } catch (error) {
            //alert(error);
            console.error(error);
            return null;
        }
    }

    async getWeather(lat,long) {
        let url = serverWeather + weather_key+"/" + lat+","+long;
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: token,
                        'Content-Type': 'application/json',
                    }
                }
            )
            // let responseJson = {};
            // alert(JSON.stringify(response))
            // alert(response.status)
            if (response.status == "200") {
                let responseJson = await response.json();
                return responseJson;
            }
            else {
                // alert(JSON.stringify("response"))
               // this.processError(apiName, response.status, response);
                return null;
            }
        } catch (error) {
            //console.log(error);
            // alert(error) 
            return null;
        }
    }
} 

export const rootAPI = new ApiService();
 
