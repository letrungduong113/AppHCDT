import ApiService, { API_LIST, rootAPI } from ".";

class QuanLyNhiemVuAPI extends ApiService {
  async getDsNhiemVuNhan(offsetValue, limitValue, text, processIDVal,token= null) {
    // alert(this.getToken());
    // alert(processID)
    params = {
      offset: offsetValue,
      limit: limitValue,
      processID: processIDVal,
    };
    body = {
      kieuTim: 0,
      noiDungTim: text
    };
    res = await rootAPI.postGetItemHaveToken(
      API_LIST.NHIEM_VU_NHAN_DANH_SACH,
      params,
      body,token
    );
      // alert(JSON.stringify(res))
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].imgLink == ""|| res.data[i].imgLink==null || res.data[i].imgLink == undefined||res.data[i].imgLink == "0"){
          res.data[i].icon = require('../../../assets/images/default/task.png') 
        }else{
          res.data[i].icon = rootAPI.imageLinkToSrcHaveToken(
            res.data[i].imgLink
          );
        }
      }
    }
    return res;
  }

  async getDsNhiemVuGiao(offsetValue, limitValue, text, processID,token) {
    params = {
      offset: offsetValue,
      limit: limitValue,
      processID: processID,
    };
    body = {
      kieuTim: 0,
      noiDungTim: text
    };
    res = await rootAPI.postGetItemHaveToken(
      API_LIST.NHIEM_VU_GIAO_DANH_SACH,
      params,
      body,token
    );
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        
        if(res.data[i].imgLink == ""|| res.data[i].imgLink==null|| res.data[i].imgLink == undefined|| res.data[i].imgLink == "0"){
          res.data[i].icon = require('../../../assets/images/default/task_2.png')
        }else{
          res.data[i].icon = rootAPI.imageLinkToSrcHaveToken(
            res.data[i].imgLink
          );
        }
      }
    }
    return res;
  }

  async getNhiemVuNhanChiTiet(linhvucId, yKienLimit,token) {
    params = {
      yKienLimit: yKienLimit
    };
    res = await rootAPI.apiGetDetailHaveToken(
      API_LIST.NHIEM_VU_NHAN_CHI_TIET,
      linhvucId,
      params,token
    );
    return res;
  }

  async getNhiemVuGiaoChiTiet(linhvucId, yKienLimit,token) {
    params = {
      yKienLimit: yKienLimit
    };
    res = await rootAPI.apiGetDetailHaveToken(
      API_LIST.NHIEM_VU_GIAO_CHI_TIET,
      linhvucId,
      params,token
    );
    return res;
  }

  async getTimKiemNhiemVuGiao(offsetValue, limitValue, text) {
    params = {
      offset: offsetValue,
      limit: limitValue
    };
    res = await rootAPI.apiGetList(API_LIST.NHIEM_VU_GIAO_DANH_SACH, params);
    if (res.nhiemVus) {
      for (let i = 0; i < res.nhiemVus.length; i++) {
        res.nhiemVus[i].icon = rootAPI.imageLinkToSrc(
          res.nhiemVus[i].linhVucIconLink
        );
      }
    }
    return res;
  }

  async getTimKiemNhiemVuNhan(text) {
    body = {
      "searchKey": text,
      "cateID": 3,
      "cateTypeId": 0,
      "offset": 1,
      "limit": 100,
      "beginTime": "20/04/2018",
      "endTime": "20/04/2020",
      "process": 0,
      "newsType":1
      };
    // alert(JSON.stringify(body))
    res = await rootAPI.postGetItem(
      API_LIST.TIM_KIEM,
      null,
      body
    );
    if (res &&res.data) {
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].imgLink == ""|| res.data[i].imgLink==null || res.data[i].imgLink == undefined || res.data[i].imgLink == "0"){
          res.data[i].icon = require('../../../assets/images/default/task.png')
        }else{
          res.data[i].icon = rootAPI.imageLinkToSrc(
            res.data[i].imgLink
          );
        }
      }
    }
    // alert(JSON.stringify(res))
    return res;
  }

  async getTimKiemNhiemVuGiao(text) {
    body = {
      "searchKey": text,
      "cateID": 3,
      "cateTypeId": 0,
      "offset": 1,
      "limit": 100,
      "beginTime": "20/04/2018",
      "endTime": "20/04/2020",
      "process": 0,
      "newsType":2
      };
    // alert(JSON.stringify(body))
    res = await rootAPI.postGetItem(
      API_LIST.TIM_KIEM,
      null,
      body
    );
    if (res &&res.data) {
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].imgLink == ""|| res.data[i].imgLink==null || res.data[i].imgLink == undefined || res.data[i].imgLink == "0"){
          res.data[i].icon = require('../../../assets/images/default/task_2.png')
        }else{
          res.data[i].icon = rootAPI.imageLinkToSrc(
            res.data[i].imgLink
          );
        }
      }
    }
    return res;
  }


  async postChiDao(data,token) {
    
    // alert(data.newsId)
    res = await rootAPI.postAItemHaveToken(API_LIST.NHIEM_VU_CHI_TIET_CHI_DAO, data,token);
    return res;
  }

  async uploadFile(id, fileInfo) {
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.NHIEM_VU_FILE_UPLOAD, id);
    res = await rootAPI.apiFileUpload(apiName, fileInfo);
    return res;
  }

  async getTientrinhHaveToken(newsIDVal,offsetValue, limitValue, token) {
    params = {
      offset: offsetValue,
      limit: limitValue,
      newsID : newsIDVal,
    };
    res = await rootAPI.apiGetDetailHaveToken(
      API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH,
      null,
      params,token
    );

    //todo tai anh
    if (res.commentEntity.length > 0) {
      for (let i = 0; i < res.commentEntity.length; i++) {
        if(res.commentEntity[i].imgLink == ""|| res.commentEntity[i].imgLink==null || res.commentEntity[i].imgLink == undefined){
          res.commentEntity[i].icon = require('../../../assets/images/default/avatar_progress.png')
        }else{
          res.commentEntity[i].icon = rootAPI.imageLinkToSrcHaveToken(
            res.commentEntity[i].imgLink
          );
        }

        for(let j = 0; j< res.commentEntity[i].lstChildData.length; j++){
          if(res.commentEntity[i].lstChildData[j].imgLink == ""|| res.commentEntity[i].lstChildData[j].imgLink==null || res.commentEntity[i].lstChildData[j].imgLink == undefined){
            res.commentEntity[i].lstChildData[j].icon = require('../../../assets/images/default/avatar_progress.png')
          }else{
            res.commentEntity[i].lstChildData[j].icon = rootAPI.imageLinkToSrcHaveToken(
              res.commentEntity[i].lstChildData[j].imgLink
            );
          } 
        }
      }
    }

    return res;
  }
}

export default new QuanLyNhiemVuAPI;
