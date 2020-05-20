import ApiService, { API_LIST, rootAPI } from ".";

class DanhSachVanBanAPI extends ApiService {
  async getdsvanbanden(offsetValue, limitValue,docType,filterProcessStatus, token = null) {
    params = {
      offset: offsetValue,
      limit: limitValue,
      cateTypeID:0,
      processID:filterProcessStatus,
      docType:docType
    };
    body = {
      kieuTim: 0,
      noiDungTim: ""
    };
    if (token) {
      res = await rootAPI.postGetItemHaveToken(API_LIST.VAN_BAN_DEN_DANH_SACH, params,body, token);
    }
    else {
      res = await rootAPI.postGetItem(API_LIST.VAN_BAN_DEN_DANH_SACH, params,body);
    }
    
    if (res && res.vanBans) {
      for (let i = 0; i < res.vanBans.length; i++) {
        if(res.vanBans[i].linkIcon == "" || res.vanBans[i].linkIcon==null || res.vanBans[i].linkIcon == undefined || res.vanBans[i].linkIcon == "0" ){
          res.vanBans[i].icon = require('../../../assets/images/default/van_ban.png')
        }else{
          res.vanBans[i].icon = rootAPI.imageLinkToSrc(
            res.vanBans[i].linkIcon
          );
        }
      }
    }
    return res;
  }

  async getdsvanbandi(offsetValue, limitValue,docType,filterProcessStatus) {
    params = {
      offset: offsetValue,
      limit: limitValue,
      cateTypeID:0,
      processID:filterProcessStatus,
      docType:docType
    };
    body = {
      kieuTim: 0,
      noiDungTim: ""
    };
    res = await rootAPI.postGetItem(API_LIST.VAN_BAN_DI_DANH_SACH, params,body);
    if (res && res.vanBans) {
      for (let i = 0; i < res.vanBans.length; i++) {
        if(res.vanBans[i].linkIcon == "" || res.vanBans[i].linkIcon==null || res.vanBans[i].linkIcon == undefined || res.vanBans[i].linkIcon == "0" ){
          res.vanBans[i].icon = require('../../../assets/images/default/van_ban.png')
        }else{
          res.vanBans[i].icon = rootAPI.imageLinkToSrc(
            res.vanBans[i].linkIcon
          );
        }
      }
    }
    return res;
  }

  async getVanBanDenChiTiet(linhvucId,yKienLimit) {
    params = {
      yKienLimit:yKienLimit
    };
    res = await rootAPI.apiGetDetail(API_LIST.VAN_BAN_DEN_CHI_TIET, linhvucId,params);
    return res;
  }

  async getVanBanDiChiTiet(linhvucId,yKienLimit) {
    params = {
      yKienLimit:yKienLimit
    };
    res = await rootAPI.apiGetDetail(API_LIST.VAN_BAN_DI_CHI_TIET, linhvucId,params);
    return res;
  }

  async postChiDaoDen(data) {
    res = await rootAPI.postAItem(API_LIST.DUYET_VAN_BAN_DEN, data);
    return res;
  }

  async postChiDaoDi(data) {
    res = await rootAPI.postAItem(API_LIST.DUYET_VAN_BAN_DI, data);
    return res;
  }

  async uploadFileDen(id, fileInfo) {
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.VAN_BAN_DEN_FILE_UPLOAD, id);
    res = await rootAPI.apiFileUpload(apiName, fileInfo);
    return res;
  }
  async uploadFileDi(id, fileInfo) {
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.VAN_BAN_DI_FILE_UPLOAD, id);
    res = await rootAPI.apiFileUpload(apiName, fileInfo);
    return res;
  }

  async getTimKiemVanBanDen(text){
    body = {
      "searchKey": text,
      "cateID": 5,
      "cateTypeId": 0,
      "offset": 1,
      "limit": 30,
      "beginTime": null,
      "endTime": null
    };
  res = await rootAPI.postGetItem(
    API_LIST.TIM_KIEM,
    null,
    body
  );
    // alert(JSON.stringify(res))
  if (res.data) {
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].icon = require('../../../assets/images/default/van_ban.png')
      // if(res.data[i].imgLink == ""|| res.data[i].imgLink==null || res.data[i].imgLink == undefined){
       
      // }else{
      //   res.data[i].icon = rootAPI.imageLinkToSrc(
      //     res.data[i].imgLink
      //   );
      // }
    }
  }
  return res;
  }
  
  async getTimKiemVanBanDi(text){
    body = {
      "searchKey": text,
      "cateID": 20,
      "cateTypeId": 0,
      "offset": 1,
      "limit": 30,
      "beginTime": null,
      "endTime": null
    };
  res = await rootAPI.postGetItem(
    API_LIST.TIM_KIEM,
    null,
    body
  );
    // alert(JSON.stringify(res))
  if (res.data) {
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].icon = require('../../../assets/images/default/van_ban.png')
      // if(res.data[i].imgLink == ""|| res.data[i].imgLink==null || res.data[i].imgLink == undefined){
       
      // }else{
      //   res.data[i].icon = rootAPI.imageLinkToSrc(
      //     res.data[i].imgLink
      //   );
      // }
    }
  }
  return res;
  }

  async getTienTrinh(newsIDVal,offsetValue, limitValue){
    params = {
      offset: offsetValue,
      limit: limitValue,
      newsID : newsIDVal,
    };
    res = await rootAPI.apiGetDetail(API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH, null, params);
    //console.log('Res Comment', res)

    if (res.commentEntity.length > 0) {
      for (let i = 0; i < res.commentEntity.length; i++) {
        
        if(res.commentEntity[i].imgLink == ""|| res.commentEntity[i].imgLink==null || res.commentEntity[i].imgLink == undefined){
          res.commentEntity[i].icon = require('../../../assets/images/default/avatar_progress.png')
        }else{
          res.commentEntity[i].icon = rootAPI.imageLinkToSrc(
            res.commentEntity[i].imgLink
          );
        }
      }
    }
    
    return res;
}
}

export default new DanhSachVanBanAPI;
