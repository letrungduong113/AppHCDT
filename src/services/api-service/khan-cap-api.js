import ApiService, { API_LIST, rootAPI } from ".";

class KhanCapAPI extends ApiService {
    async getDsKhanCap(offsetVal, limitVal, catId, statusId,token="") {
        params = {
            offset: offsetVal,
            limit: limitVal,
            cateTypeID: catId,
            processID: statusId,
        };
        if(token==""){
            res = await rootAPI.apiGetList(API_LIST.KHAN_CAP_DANH_SACH, params);
        }else{
            res = await rootAPI.apiGetListHaveToken(API_LIST.KHAN_CAP_DANH_SACH, params,token);
        }

        if (res) {
            for (let i = 0; i < res.newsEntity.length; i++) {
                //res.newsEntity[i].link = rootAPI.imageLinkToSrc(res.newsEntity[i].videoLink)
                res.newsEntity[i].img = rootAPI.imageLinkToSrc(res.newsEntity[i].imgLink) // trường link ảnh
                res.newsEntity[i].icon = rootAPI.imageLinkToSrc(res.newsEntity[i].linkIcon) // trường link icon
            }
            res.poster = rootAPI.imageLinkToSrc(res.posterLink); // trường link icon
        }
        return res;
    }
    async getDsKhanCapTienTrinh(offsetVal = 0, limitVal = 10) {
        params = {
            offset: offsetVal,
            limit: limitVal,
        };

        res = await rootAPI.apiGetList(API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH, params);
        // if (res) {
        //     for (let i = 0; i < res.length; i++) {
        //         res[i].icon = rootAPI.imageLinkToSrc(res[i].link_icon)
        //     }
        // }
        // console.log("Thêm icon", res)
        return res;
    }
    async getDsKhanCapChiTietNoiDung(khanCapId) {
        params = {
            'id': khanCapId
        };

        res = await rootAPI.apiGetDetail(API_LIST.KHAN_CAP_CHI_TIET, null, params);
        //console.log('API ChiTietKC', res)
        //alert(JSON.stringify(res))
        if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
                // res.fileDinhKems[i].videoLink = rootAPI.imageLinkToSrc(res.fileDinhKems[i].link)
                // res.fileDinhKems[i].poster = rootAPI.imageLinkToSrc(res.fileDinhKems[i].posterLink)
            }
        }
        // if (res.tienTrinhs.tienTrinhs) {
        //     for( let i = 0; i < res.tienTrinhs.tienTrinhs.length; i++) {
        //         res.tienTrinhs.tienTrinhs[i].avatar = rootAPI.imageLinkToSrc(res.tienTrinhs.tienTrinhs[i].avtNguoiGuiLink)
        //     }
        // }

        //console.log('API ChiTietKC', res)
        return res;
    }
    async getComment(offsetVal, limitVal, newsIDVal, userIDVal) {
        params = {
            offset: offsetVal,
            limit: limitVal,
            newsID: newsIDVal,
            userID: userIDVal,
        };

        res = await rootAPI.apiGetDetail(API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH, null, params);
        //console.log('Res Comment', res)
        return res;
    }
    async postChiDao(data) {
        //console.log("postChiDao", data)
        res = await rootAPI.postAItem(API_LIST.KHAN_CAP_CHI_TIET_CHI_DAO, data);
        //console.log("postChiDao", res)
        return res;
    }

    async uploadFile(khancapId, fileInfo) {
        if (!khancapId || khancapId < 0) return null;

        apiName = this.formatString(API_LIST.KHAN_CAP_FILE_UPLOAD, khancapId, 0);
        res = await rootAPI.apiFileUpload(apiName, fileInfo);
        return res;
    }

    async getKhanCapImages(khanCapId) {
        if (!khanCapId || khanCapId < 0) return null;

        apiName = this.formatString(API_LIST.KHAN_CAP_CHI_TIET_DANH_SACH_ANH, khanCapId);
        resEx = [];
        res = await rootAPI.apiGetListFiles(apiName);
        if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
                resEx.push({
                    posterLink: null,
                    videoLink: rootAPI.imageLinkToSrc(res[i]),
                })
            }
        }

        return resEx;
    }
    async getLocations() {

        res = await rootAPI.apiGetList(API_LIST.KHAN_CAP_LOCATIONS);
        return res;
    }

    async getLocationDetail(newsIDVal) {
        params = {
            newsId: newsIDVal
        }
        res = await rootAPI.apiGetList(API_LIST.KHAN_CAP_LOCATIONDETAIL, params);
        return res;
    }

    async getDsLinhVucKhanCap() {
        params = { groupType: 2 };
        res = await rootAPI.apiGetList(API_LIST.MASTER_DS_LINH_VUC, params);
        return res;
    }

    async getChiDaoNhanSu(cateTypeIDVal) {
        params = {
            cateTypeID: cateTypeIDVal
        }
        res = await rootAPI.apiGetList(API_LIST.KHAN_CAP_CHIDAONHANSU, params);
        if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < res[i].contacts.length; j++) {  
                    res[i].contacts[j].imgAvt = rootAPI.imageLinkToSrc(res[i].contacts[j].avatar)
                }
            }
        }
        console.log("API get chi dao nhan su", res)
        return res;
    }
}

export default new KhanCapAPI;
