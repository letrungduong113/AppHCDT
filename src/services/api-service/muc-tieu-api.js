import ApiService, { API_LIST, rootAPI } from ".";
var listType = [
  // { type: "application/octet-stream", source: require("../../../assets/images/anh_kieu_type/image_pdf.png") },
  { type: "application/vnd.ms-excel", source: require("../../../assets/images/anh_kieu_type/image_xls.png") },
  {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    source: require("../../../assets/images/anh_kieu_type/image_xls.png")
  },
  // { type: "image/jpeg", source: require("../../../assets/images/anh_kieu_type/image_doc.png") },
  // { type: "image/png", source: require("../../../assets/images/anh_kieu_type/image_pdf.png") },
  { type: "text/plain", source: require("../../../assets/images/anh_kieu_type/image_doc.png") },
  // { type: "video/mp4", source: require("../../../assets/images/anh_kieu_type/image_pdf.png") },
  { type: "application/pdf", source: require("../../../assets/images/anh_kieu_type/image_pdf.png") }
];
class MucTieuAPI extends ApiService {
    async getDsMucTieu(songanhId, offset=1, limit = 100, time, isHot, groupId = 0, token = null,) {
        params={
          don_vi_id:songanhId,
          offset:offset,
          limit:limit,
          year: time,
          isHot: isHot,
        }
        if (groupId) {
          params = Object.assign(params, {groupId: groupId});
        }
        if(!token)
          res = await rootAPI.apiGetList(API_LIST.CHI_TIEU_KT_DANH_SACH, params);
        else
          res = await rootAPI.apiGetListHaveToken(API_LIST.CHI_TIEU_KT_DANH_SACH, params, token);
        if (res) {
          for (let i = 0; i < res.length; i++) {
           
              res[i].icon = rootAPI.imageLinkToSrc(res[i].iconLink);
          

          }
        }
        return res;
    }

    async getDsTienTrinhThucHien(newsID, offset=0, limit=3, userID=1){
        // if (!id || id < 0) return null;
        // params = null;
        // if (id) {
            params = {
              newsID: newsID,
              offset: offset,
              limit: limit,
              userID: userID
            };
        // }
        // apiName = this.formatString(API_LIST.CHI_TIEU_KT_CHI_TIET_TIEN_TRINH, id);
        res = await rootAPI.apiGetList(API_LIST.CHI_TIEU_KT_CHI_TIET_TIEN_TRINH, params);
        // if (res) {
        //     for (let i = 0; i < res.length; i++) {
        //       res[i].icon = rootAPI.imageLinkToSrc(
        //         res[i].avatar
        //       );
        //       res[i].more= true;
        //     }
        //   }
        return res;
        //return [];
    }

    async getKetQuaThucHien(id){
      params = {
        id: id
      };
      res = await rootAPI.apiGetList(API_LIST.CHI_TIEU_KT_CHI_TIET_KET_QUA, params);
      // if(res){
      //   for(let i =0; i < res.length; i++){
      //     if(res[i].date.length==10)
      //     res[i].month = res[i].date.substring(3,5);
      //   }
      // }
      return res;
    }

    async getNoiDung(linhvucId){
        // params = null;
        // if (linhvucId) {
            params = {
                id: linhvucId,
            };
        // }
        res = await rootAPI.apiGetList(API_LIST.CHI_TIEU_KT_CHI_TIET_NOI_DUNG, params);
        if(res){
          res.abc= Number(res.ketQuaThucHien);
        }
        // if(res){
        //   let k = 0;
        //   for(let i=0; i<res.vanBan.length; i++){
        //     res.vanBan[i].icon = this.getTypeDocument1(res.vanBan[i].loaiVanBan);
        //   }
        // }
        return res;
    }

    getTypeDocument2(imageType){
      for(let i= 0 ; i < listType.length; i++){
        if(imageType==listType[i].type){
          return listType[i].source;
        }
      }
    }

    getTypeDocument1(imageType) {
      switch(imageType){
        case "application/pdf" :
          return require("../../../assets/images/anh_kieu_type/image_pdf.png");

        case "text/plain":
          return require("../../../assets/images/anh_kieu_type/image_doc.png");

        case "image/jpeg":
          return require("../../../assets/images/anh_kieu_type/image_null.png");

        case "image/png":
          return require("../../../assets/images/anh_kieu_type/image_null.png");

        case "application/octet-stream":
          return require("../../../assets/images/anh_kieu_type/image_null.png");

        case "application/vnd.ms-excel":
          return require("../../../assets/images/anh_kieu_type/image_xls.png");

        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return require("../../../assets/images/anh_kieu_type/image_null.png");

        case "video/mp4":
          return require("../../../assets/images/anh_kieu_type/image_null.png");

        default :
          return require("../../../assets/images/anh_kieu_type/image_null.png");
      }
      
    }

    async getImage(link){
        res = await rootAPI.imageLinkToSrc(link);
        return res;
    }

    async postChiDao(data) {
      res = await rootAPI.postAItem(API_LIST.MUC_TIEU_CHI_TIET_CHI_DAO, data);
      return res;
    }

    async uploadFile(id, fileInfo) {
      if (!id || id < 0) return null;
      
      apiName = this.formatString(API_LIST.MUC_TIEU_FILE_UPLOAD, id);
      res = await rootAPI.apiFileUpload(apiName, fileInfo);
      return res;
    }

    async getListFriend(){
      res = await rootAPI.apiGetList(API_LIST.DANH_SACH_CAP_DUOI);
      if(res.length){
        for(let i = 0; i< res.length;i++){
          if(res[i].icon==null ||res[i].icon==""||res[i].icon==undefined||res[i].icon=='0'){
            res[i].avatar = require('../../../assets/images/default/avatar_progress.png')
          }
          else{
            res[i].avatar = rootAPI.imageLinkToSrc(res[i].icon)
          }
        }
      }
      return res;
    }
}

export default new MucTieuAPI;
