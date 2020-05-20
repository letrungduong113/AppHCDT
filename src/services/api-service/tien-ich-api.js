import ApiService, { API_LIST, rootAPI } from ".";

class TienIchAPI extends ApiService {
  async getDsLichSu(offset, limit) {
    params = {
      offset: offset,
      limit: limit
    };
    res = await rootAPI.apiGetList(API_LIST.TIEN_ICH_LICH_SU, params);
    if (res) {
      for (let i = 0; i < res.length; i++) {
        // if(res[i].linkIcon==null || res[i].linkIcon==undefined||res[i].linkIcon=="0"||res[i].linkIcon==""){
          res[i].icon = require('../../../assets/images/default/task.png')
        // }else{
        //   res[i].icon = rootAPI.imageLinkToSrc(
        //     res[i].linkIcon
        //   );
        // }
      }
    }
    return res;
  }

  async getDsLichSuTimKiem(offset, limit, textSearch) {
    params = {
      offset: offset,
      limit: limit,
      textSearch: textSearch
    };
    res = await rootAPI.apiGetList(API_LIST.TIEN_ICH_TIM_KIEM_LICH_SU, params);
    if (res) {
      for (let i = 0; i < res.length; i++) {
        res[i].icon = rootAPI.imageLinkToSrc(
          res[i].linkIcon
        );
      }
    }
    return res;
  }

  async getThongTinCaNhan() {
    res = await rootAPI.userInfo();
    if (res && res.avtLink) {
      res.avtImg = rootAPI.imageLinkToSrc(res.avtLink);
    }
    return res;
  }

  async getLichVanNien(ngayRequest) {
    params = {
      'ngay': ngayRequest
    }
    res = await rootAPI.apiGetDetailExternal("http://aicdemo.com/0rikkei/hcdt/public/api/crawler/lich_van_nien", params);
    return res;
  }
}

export default new TienIchAPI;
