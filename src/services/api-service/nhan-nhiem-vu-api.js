import ApiService, { API_LIST, rootAPI } from ".";

class NhanNhiemVuAPI extends ApiService {
  async getDsNhiemVuNhan(offsetValue, limitValue=10, text, processID) {
    // alert(this.getToken());
    params = {
      offset: offsetValue,
      limit: limitValue,
      processID: processID,
    };
    body = {
      kieuTim: 0,
      noiDungTim: text
    };
    res = await rootAPI.postGetItem(
      API_LIST.NHIEM_VU_NHAN_DANH_SACH,
      params,
      body
    );
      // alert(JSON.stringify(res))
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].icon = require('../../../assets/images/default/task.png')
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

  async getDsNhiemVuGiao(offsetValue, limitValue, text, processID) {
    // params = {
    //   offset: offsetValue,
    //   limit: limitValue,
    //   processID: processID,
    // };
    // body = {
    //   kieuTim: 0,
    //   noiDungTim: text
    // };
    // res = await rootAPI.postGetItem(
    //   API_LIST.NHIEM_VU_GIAO_DANH_SACH,
    //   params,
    //   body
    // );
    // if (res.data) {
    //   for (let i = 0; i < res.data.length; i++) {
        
    //     if(res.data[i].imgLink == ""|| res.data[i].imgLink==null|| res.data[i].imgLink == undefined|| res.data[i].imgLink == "0"){
    //       res.data[i].icon = require('../../../assets/images/default/task_2.png')
    //     }else{
    //       res.data[i].icon = rootAPI.imageLinkToSrc(
    //         res.data[i].imgLink
    //       );
    //     }
    //   }
    // }
    // return res;
  }

  async getNhiemVuNhanChiTiet(linhvucId, yKienLimit) {
    params = {
      yKienLimit: yKienLimit
    };
    res = await rootAPI.apiGetDetail(
      API_LIST.NHIEM_VU_NHAN_CHI_TIET,
      linhvucId,
      params
    );
    return res;
  }

  async getNhiemVuGiaoChiTiet(linhvucId, yKienLimit) {
    params = {
      yKienLimit: yKienLimit
    };
    res = await rootAPI.apiGetDetail(
      API_LIST.NHIEM_VU_GIAO_CHI_TIET,
      linhvucId,
      params
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


  async postChiDao(data) {
    
    // alert(data.newsId)
    res = await rootAPI.postAItem(API_LIST.NHIEM_VU_CHI_TIET_CHI_DAO, data);
    return res;
  }

  async uploadFile(id, fileInfo) {
    if (!id || id < 0) return null;
    
    apiName = this.formatString(API_LIST.NHIEM_VU_FILE_UPLOAD, id);
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
      API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH,
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
        // for(let j = 0; j< res.commentEntity[i].lstChildData.length; j++){
        //   if(res.commentEntity[i].lstChildData[j].imgLink == ""|| res.commentEntity[i].lstChildData[j].imgLink==null || res.commentEntity[i].lstChildData[j].imgLink == undefined){
        //     res.commentEntity[i].lstChildData[j].icon = require('../../../assets/images/default/avatar_progress.png')
        //   }else{
        //     res.commentEntity[i].lstChildData[j].icon = rootAPI.imageLinkToSrc(
        //       res.commentEntity[i].lstChildData[j].imgLink
        //     );
        //   } 
        // }
      }
    }

    return res;
  }

}

export default new NhanNhiemVuAPI;
