import ApiService, { API_LIST, rootAPI } from ".";

class CommonAPI extends ApiService {
  async getDsAttachments(id) {
    // alert(this.getToken());
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.COMMON_VAN_BAN_DINH_KEM, id);
    res = await rootAPI.apiGetListFiles(apiName);
    return res;
  }

  async getDsAttachmentsOfComment(newID, commentID) {
    // alert(this.getToken());
    if (!newID || !commentID) return null;
    
    apiName = this.formatString(API_LIST.COMMON_TIEN_TRINH_FILE_DINH_KEM, newID, commentID);
    res = await rootAPI.apiGetListFiles(apiName);
    return res;
  }

  async postChiDao(data) {
    //console.log(data)
    //apiName = this.formatString(API_LIST.COMMON_POST_CHI_DAO, id);
    res = await rootAPI.postAItem(API_LIST.COMMON_POST_CHI_DAO, data);
    return res;
  }

  async uploadFile(id, fileInfo) {
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.COMMON_FILE_UPLOAD, id);
    res = await rootAPI.apiFileUpload(apiName, fileInfo);
    return res;
  }

  async getTientrinh(newsIDVal,offsetValue, limitValue) {
    params = {
      offset: offsetValue,
      limit: limitValue,
      newsID : newsIDVal,
    };
    res = await rootAPI.apiGetDetail(
      API_LIST.COMMON_CHI_TIET_TIEN_TRINH,
      null,
      params
    );
      
    //todo tai anh
    if (res.commentEntity.length > 0) {
      for (let i = 0; i < res.commentEntity.length; i++) {
        if(res.commentEntity[i].linkAvt == ""|| res.commentEntity[i].linkAvt==null || res.commentEntity[i].linkAvt == undefined){
          res.commentEntity[i].icon = require('../../../assets/images/default/avatar_progress.png')
        }else{
          res.commentEntity[i].icon = rootAPI.imageLinkToSrc(
            res.commentEntity[i].linkAvt
          );
        }

        for(let j = 0; j< res.commentEntity[i].lstChildData.length; j++){
          if(res.commentEntity[i].lstChildData[j].linkAvt == ""|| res.commentEntity[i].lstChildData[j].linkAvt==null || res.commentEntity[i].lstChildData[j].linkAvt == undefined){
            res.commentEntity[i].lstChildData[j].icon = require('../../../assets/images/default/avatar_progress.png')
          }else{
            res.commentEntity[i].lstChildData[j].icon = rootAPI.imageLinkToSrc(
              res.commentEntity[i].lstChildData[j].linkAvt
            );
          } 
        }
      }
    }

    return res;
  }

  async getNoiDungMau(cateTypeId=22, cateId=1){
        params = {
          cateTypeId: cateTypeId,
          cateId: cateId
        };
    res = await rootAPI.apiGetList(API_LIST.COMMON_GET_NOI_DUNG_MAU, params);
    return res;
}

  async getThongKe(catID = 1, yearVal = 2019, newsType = 0, token = "") {
    params = {
      cateID : catID,
      //year: yearVal,
      newsType: newsType
    };
    if(token == ""){
        res = await rootAPI.apiGetList(API_LIST.COMMON_GET_THONG_KE, params);

    }else{
        res = await rootAPI.apiGetListHaveToken(API_LIST.COMMON_GET_THONG_KE, params,token);
    }
    return res;
  }
  
  async getThongKeAll(type=1,catID = 5, yearVal = 2019, newsType = 1, token = "") {
    params = {
      cateID : catID,
      //year: yearVal,
      offset:0,limit:10,
      type:type,
      newsType: newsType
    };
    if(token == ""){
        res = await rootAPI.apiGetList(API_LIST.COMMON_GET_THONG_KE_THEO_ALL, params);
    }else{
        res = await rootAPI.apiGetListHaveToken(API_LIST.COMMON_GET_THONG_KE_THEO_ALL, params,token);
    }
    return res;
  }

  async getThongKeTotal(catID = 1, yearVal = 2019, newsType = 0) {
    params = {
      cateID : catID,
      //year: yearVal,
      newsType: newsType
    };
    res = await rootAPI.apiGetList(API_LIST.COMMON_GET_THONG_KE_TOTAL, params);
    return res;
    
  }
  async changeState(value, newsID){
    params = {
      newsId:newsID
    };
    res = await rootAPI.apiGetDetail(
      API_LIST.COMMON_BUTTON_COMPLETE,
      null,
      params
    );
    return res;
  }

  async getKetNoi(type = 1) {
    params = {
        gid : type,
    };
    // apiName = this.formatString(API_LIST.COMMON_GET_KET_NOI, type);
    res = await rootAPI.apiGetList(API_LIST.COMMON_GET_KET_NOI,params);
    return res;
  }

}

export default new CommonAPI;
