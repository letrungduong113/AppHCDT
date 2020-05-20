import ApiService, { API_LIST, rootAPI } from ".";

class LinhVucQuanLyAPI extends ApiService {
    async getLinhVuc(quanlyId) {
        params = {
            id: quanlyId
        };

        res = await rootAPI.apiGetList(API_LIST.LINH_VUC_QUAN_LY, params);
        return res;
    }

    async getThongTinChung(token) {
      res = await rootAPI.apiGetListHaveToken(API_LIST.LVQL_GET_THONG_TIN, null, token);
    //   if(res.length>0){
    //     for(let i = 0; i< res.length;i++){
    //         res[i].icon = rootAPI.imageLinkToSrc(
    //             res[i].leaderAvatar
    //           );
    //     }
    // }
    if(res){
      res.icon = rootAPI.imageLinkToSrc(res.leaderAvatar);
    }
      return res;
  }

    async getQuyetDinhPhanCong(offsetVal = 0, limitVal = 10, typeVal = 1) {
        params = {
            offset: offsetVal,
            limit: limitVal,
            type: typeVal
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_QUYET_DINH_PHAN_CONG_NHIEM_VU, params);
        if(res.nhiemVus.length>0){
          for(let i = 0; i< res.nhiemVus.length;i++){
              res.nhiemVus[i].icon = rootAPI.imageLinkToSrc(
                  res.nhiemVus[i].avtLink
                );
          }
      }
        return res;
    }
    async getDonVi(typeVal, offsetVal, limitVal) {
        params = {
            type: typeVal,
            offset: offsetVal,
            limit: limitVal
        };
        res = await rootAPI.apiGetList(API_LIST.LVQL_DON_VI_DANG_PHU_TRACH, params);
        return res;
    }
    async getLinhVucPT(linhvucId) {
        params = {
            id: linhvucId
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_LINH_VUC_DANG_PHU_TRACH, params);
        return res;
    }
    async getSuKien(offsetVal, limlitVal, year=0,cateTypeID,month=0) { 
        params = {
            cateTypeID: cateTypeID,
            offset: offsetVal,
            limit: limlitVal,
            month: month,
            year: year,
            // processID:255
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_SU_KIEN_QUAN_TRONG, params);
        console.log('skqt',res);
        if(res.newsEntity.length>0){
            for(let i = 0; i< res.newsEntity.length;i++){
                if(res.newsEntity[i].imgLink==null || res.newsEntity[i].imgLink=="0"||res.newsEntity[i].imgLink==undefined){
                    res.newsEntity[i].image=require('../../../assets/images/l2-khan-cap/imgDefault.png')
                }else{
                    res.newsEntity[i].image = rootAPI.imageLinkToSrc(
                        API_LIST.SKQT_GET_IMAGE + res.newsEntity[i].imgLink
                      );
                }
            }
        }
        return res;
    }
    async getDuAn(offsetVal, limlitVal,token="") {
        params = {
            offset: offsetVal,
            limit: limlitVal
        };
        if(token==""){
            res = await rootAPI.apiGetList(API_LIST.LVQL_DU_AN_QUAN_TRONG, params);
        }else{
            res = await rootAPI.apiGetListHaveToken(API_LIST.LVQL_DU_AN_QUAN_TRONG, params,token);
        }
        if(res.newsEntity.length>0){
          for(let i = 0; i< res.newsEntity.length;i++){
              res.newsEntity[i].icon = rootAPI.imageLinkToSrc(
                  res.newsEntity[i].linkIcon
                );
          }
      }
        return res;
    }

    async getDuAnHaveToken(offsetVal = 1, limlitVal = 20, token) {
      params = {
          offset: offsetVal,
          limit: limlitVal
      };

      res = await rootAPI.apiGetListHaveToken(API_LIST.LVQL_DU_AN_QUAN_TRONG, params,token);
      if(res.newsEntity.length>0){
        for(let i = 0; i< res.newsEntity.length;i++){
            res.newsEntity[i].icon = rootAPI.imageLinkToSrc(
                res.newsEntity[i].linkIcon
              );
        }
    }
      return res;
  }


    async getCongViec(offsetVal = 0, limitVal = 10) {
        params = {
            offset: offsetVal,
            limit: limitVal
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_CONG_VIEC_CHAM_TIEN_DO, params);
        if(res.cvChamTienDos.length>0){
            for(let i = 0; i< res.cvChamTienDos.length;i++){
                res.cvChamTienDos[i].icon = rootAPI.imageLinkToSrc(
                    res.cvChamTienDos[i].iconLink
                  );
            }
        }
        return res;
    }
    // Phần Chi tiết 
    async getChiTietPhanCong(id) {
        res = await rootAPI.apiGetDetail(API_LIST.LVQL_CHI_TIET_PHAN_CONG, id);
        if(res){
          res.icon = rootAPI.imageLinkToSrc(res.fileAvtLink);
        }
        return res;
    }
    async getChiTietSuKien(id) {
        res = await rootAPI.apiGetDetail(API_LIST.LVQL_CHI_TIET_SU_KIEN, id);
        if(res.length>0){
            for(let i = 0; i< res.length;i++){
                res[i].icon = rootAPI.imageLinkToSrc(
                    res[i].imgLink
                  );
            }
        }
        return res;
    }
    async getChiTietDonVi(id) {
        res = await rootAPI.apiGetDetail(API_LIST.LVQL_CHI_TIET_DON_VI, id);
        if(res.length>0){
            for(let i = 0; i< res.length;i++){
                res[i].icon = rootAPI.imageLinkToSrc(
                    res[i].linhVucIconLink
                  );
            }
        }
        return res;
    }
    async getChiTietDuAn(id) {
        res = await rootAPI.apiGetDetail(API_LIST.LVQL_CHI_TIET_DU_AN, id);
        return res;
    }

    async getChiTietDuAnSo(id, token) {
      res = await rootAPI.apiGetDetailHaveToken(API_LIST.LVQL_CHI_TIET_DU_AN, id,null, token);
      return res;
  }

    async getChiTietCongViec(id, yKienLimitVal) {
      params = {
        yKienLimit: yKienLimitVal
      };
        res = await rootAPI.apiGetDetail(API_LIST.LVQL_CHI_TIET_CONG_VIEC, id, params);
        return res;
    }

    async MucTieuSoTaiChinh(id) {
        params = {
            id: id
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_MUC_TIEU_SO_TAI_CHINH, params);
        return res;
    }
    async NhiemVuSoTaiChinh(id) {
        params = {
            id: id
        };

        res = await rootAPI.apiGetList(API_LIST.LVQL_NHIEM_VU_SO_TAI_CHINH, params);
        return res;
    }

    async getDonViPhuTrach(offsetVal, limitVal) {
        params = {
            offset: offsetVal,
            limit: limitVal
        };
        res = await rootAPI.apiGetList(API_LIST.LVQL_DON_VI_PHU_TRACH, params);
        return res;
    }

    //   async getDanhsachMucTieu( offset, limit, token,isHot) {
    //     params = {
    //       offset:offset,
    //       limit:limit,
    //       isHot:1
    //     };
        
    //     res = await rootAPI.apiGetListHaveToken(API_LIST.CHI_TIEU_KT_DANH_SACH, params, token);
    //     if (res) {
    //       for (let i = 0; i < res.length; i++) {
    //          res[i].icon = rootAPI.imageLinkToSrc(res[i].iconLink);
    //       }
    //     }
    //     return res;
    // }

    async getSuKienSo(offsetVal, limlitVal, token) {
      params = {
          offset: offsetVal,
          limit: limlitVal
      };

      res = await rootAPI.apiGetListHaveToken(API_LIST.LVQL_SU_KIEN_QUAN_TRONG, params, token);
      if(res.newsEntity.length>0){
          for(let i = 0; i< res.newsEntity.length;i++){
              res.newsEntity[i].icon = rootAPI.imageLinkToSrc(
                  res.newsEntity[i].linkIcon
                );
          }
      }
      return res;
  }

  async getChiTietSuKienSo(id, token) {
    res = await rootAPI.apiGetDetailHaveToken(API_LIST.LVQL_CHI_TIET_SU_KIEN, null, id, token);
    return res;
}

async getQuyetDinhPhanCongSo(offsetVal, limitVal, typeVal, token) {
  params = {
      offset: offsetVal,
      limit: limitVal,
      type: typeVal
  };

  res = await rootAPI.apiGetListHaveToken(API_LIST.LVQL_QUYET_DINH_PHAN_CONG_NHIEM_VU, params, token);
  if(res.nhiemVus.length>0){
    for(let i = 0; i< res.nhiemVus.length;i++){
        res.nhiemVus[i].icon = rootAPI.imageLinkToSrc(
            res.nhiemVus[i].avtLink
          );
    }
}
  return res;
}

async getQuyetDinhPhanCongSoChiTiet(id, token) {
  res = await rootAPI.apiGetDetailHaveToken(API_LIST.LVQL_QUYET_DINH_PHAN_CONG_NHIEM_VU, id, null, token);
    if(res){
      res.icon = rootAPI.imageLinkToSrc(res.fileAvtLink);
    }

  return res;
}

      // async getMucTieuLVQLChiTiet(linhvucId, token) {
      //   params = {
      //     id: linhvucId,
      // };
      //   res = await rootAPI.apiGetDetailHaveToken(
      //     API_LIST.CHI_TIEU_KT_CHI_TIET_NOI_DUNG,
      //     null,
      //     params,
      //     token
      //   );
      //   return res;
      // }

      // async getKetQuaThucHienLVQL(id, token){
      //   params = {
      //     id: id
      //   };
      //   res = await rootAPI.apiGetDetailHaveToken(API_LIST.CHI_TIEU_KT_CHI_TIET_KET_QUA, params, token);
        // if(res){
        //   for(let i =0; i < res.length; i++){
        //     if(res[i].date.length==10)
        //     res[i].month = res[i].date.substring(3,5);
        //   }
        // }
      //   return res;
      // }

      async getTientrinhHaveToken(newsIDVal,offsetValue, limitValue,token) {
        params = {
          offset: offsetValue,
          limit: limitValue,
          newsID : newsIDVal,
        };
        res = await rootAPI.apiGetDetailHaveToken(
          API_LIST.KHAN_CAP_CHI_TIET_TIEN_TRINH,
          null,
          params,
          token
        );
    
        //todo tai anh
        if (res.commentEntity.length > 0) {
          for (let i = 0; i < res.commentEntity.length; i++) {
            if(res.commentEntity[i].imgLink == ""|| res.commentEntity[i].imgLink==null || res.commentEntity[i].imgLink == undefined){
              res.commentEntity[i].icon = require('../../../assets/images/default/avatar_progress.png')
            }else{
              res.commentEntity[i].icon = rootAPI.imageLinkToSrcHaveToken(
                res.commentEntity[i].imgLink, token
              );
            }
    
            for(let j = 0; j< res.commentEntity[i].lstChildData.length; j++){
              if(res.commentEntity[i].lstChildData[j].imgLink == ""|| res.commentEntity[i].lstChildData[j].imgLink==null || res.commentEntity[i].lstChildData[j].imgLink == undefined){
                res.commentEntity[i].lstChildData[j].icon = require('../../../assets/images/default/avatar_progress.png')
              }else{
                res.commentEntity[i].lstChildData[j].icon = rootAPI.imageLinkToSrcHaveToken(
                  res.commentEntity[i].lstChildData[j].imgLink, token
                );
              } 
            }
          }
        }
    
        return res;
      }
        
}

export default new LinhVucQuanLyAPI;