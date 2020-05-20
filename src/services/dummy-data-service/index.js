import React from "react";
import { AsyncStorage } from "react-native";
import { FORCE_DUMMY_APIS } from "./config";

const DUMMY_DATA = {
  'user/login': [
    {
      id: 1,
      hoTen: 'Nguyễn Đức Long',
      permissionIds: [1, 70],
    },
  ],
  'user/profile':
  {
    id: 1,
    hoTen: 'Nguyễn Đức Long',
    email: 'nguyenduclong@gov.vn',
    dienThoaiDiDong: '0982322***',
    avtLink: 'http://www.qtv.vn/dataimages/201510/original/images1191465_images831292_anh_long2.jpg',
    donVi: {
      name: 'Chủ tịch UBND tỉnh Quảnh Ninh',
    }


  },
  'canhan/timKiemLichSu': [
    {
      "id": 29,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-29T02:13:51.533+0000",
      "ngayTacDongText": "29/03/2019 09:13",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": null,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 2,
      "tenChucNang": "Duyệt văn bản",
      "tieuDe": "Duyệt văn bản số xxx",
      "ngayTacDong": "2019-03-28T02:00:00.000+0000",
      "ngayTacDongText": "28/03/2019 09:00",
      "userId": 13,
      "viewId": 1,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": null,
      "idChucNang": 1
    },
    {
      "id": 13,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:31:43.467+0000",
      "ngayTacDongText": "27/03/2019 16:31",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 1,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 12,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:25:34.250+0000",
      "ngayTacDongText": "27/03/2019 16:25",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 4,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 11,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:21:31.640+0000",
      "ngayTacDongText": "27/03/2019 16:21",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 3,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 10,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-27T08:38:44.130+0000",
      "ngayTacDongText": "27/03/2019 15:38",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 9,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-27T08:27:02.010+0000",
      "ngayTacDongText": "27/03/2019 15:27",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 1,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 6,
      "tenChucNang": "Comment",
      "tieuDe": "Comment1",
      "ngayTacDong": "2019-03-27T03:47:39.403+0000",
      "ngayTacDongText": "27/03/2019 10:47",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 5,
      "tenChucNang": "Comment",
      "tieuDe": "Thêm mới chỉ tiêu",
      "ngayTacDong": "2019-03-27T03:46:47.143+0000",
      "ngayTacDongText": "27/03/2019 10:46",
      "userId": 13,
      "viewId": 0,
      "partitionId": 0,
      "idLinhvuc": 1,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 4,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới chỉ tiêu",
      "ngayTacDong": "2019-03-27T03:39:19.970+0000",
      "ngayTacDongText": "27/03/2019 10:39",
      "userId": 13,
      "viewId": 0,
      "partitionId": 2,
      "idLinhvuc": 4,
      "linkIcon": null,
      "idChucNang": 0
    }
  ],
  'canhan/danhSachLichSu': [
    {
      "id": 29,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-29T02:13:51.533+0000",
      "ngayTacDongText": "29/03/2019 09:13",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": null,
      "linkIcon": null,
      "idChucNang": 0
    },
    {
      "id": 2,
      "tenChucNang": "Duyệt văn bản",
      "tieuDe": "Duyệt văn bản số xxx",
      "ngayTacDong": "2019-03-28T02:00:00.000+0000",
      "ngayTacDongText": "28/03/2019 09:00",
      "userId": 13,
      "viewId": 1,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/3",
      "idChucNang": 1
    },
    {
      "id": 13,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:31:43.467+0000",
      "ngayTacDongText": "27/03/2019 16:31",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 1,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/4",
      "idChucNang": 0
    },
    {
      "id": 12,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:25:34.250+0000",
      "ngayTacDongText": "27/03/2019 16:25",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 4,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/2",
      "idChucNang": 0
    },
    {
      "id": 11,
      "tenChucNang": "Lay du lieu",
      "tieuDe": "danh sach lich cong tac",
      "ngayTacDong": "2019-03-27T09:21:31.640+0000",
      "ngayTacDongText": "27/03/2019 16:21",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 3,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/5",
      "idChucNang": 0
    },
    {
      "id": 10,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-27T08:38:44.130+0000",
      "ngayTacDongText": "27/03/2019 15:38",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/3",
      "idChucNang": 0
    },
    {
      "id": 9,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới nhật ký",
      "ngayTacDong": "2019-03-27T08:27:02.010+0000",
      "ngayTacDongText": "27/03/2019 15:27",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 1,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/4",
      "idChucNang": 0
    },
    {
      "id": 6,
      "tenChucNang": "Comment",
      "tieuDe": "Comment1",
      "ngayTacDong": "2019-03-27T03:47:39.403+0000",
      "ngayTacDongText": "27/03/2019 10:47",
      "userId": 13,
      "viewId": 0,
      "partitionId": 3,
      "idLinhvuc": 2,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/3",
      "idChucNang": 0
    },
    {
      "id": 5,
      "tenChucNang": "Comment",
      "tieuDe": "Thêm mới chỉ tiêu",
      "ngayTacDong": "2019-03-27T03:46:47.143+0000",
      "ngayTacDongText": "27/03/2019 10:46",
      "userId": 13,
      "viewId": 0,
      "partitionId": 0,
      "idLinhvuc": 1,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/4",
      "idChucNang": 0
    },
    {
      "id": 4,
      "tenChucNang": "Thêm mới",
      "tieuDe": "Thêm mới chỉ tiêu",
      "ngayTacDong": "2019-03-27T03:39:19.970+0000",
      "ngayTacDongText": "27/03/2019 10:39",
      "userId": 13,
      "viewId": 0,
      "partitionId": 2,
      "idLinhvuc": 4,
      "linkIcon": "http://10.0.22.117:8081/file/history/icon/download/2",
      "idChucNang": 0
    }
  ],
  // 'ds_bao_cao_tong_hop': [
  //   {
  //     id: "1",
  //     name: "LĨNH VỰC KINH TẾ",
  //     data: [
  //       {
  //         id: "1",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-1.png"),
  //         linhvuc_name: "Nông sản tăng",
  //         textNum: "3.4%",
  //         report: "Đóng góp 0.2%"
  //       },
  //       {
  //         id: "2",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-2.png"),
  //         linhvuc_name: "Công nghiệp - xây dựng tăng",
  //         textNum: "9.2%",
  //         report: "Đóng góp 4.5%"
  //       },
  //       {
  //         id: "3",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-3.png"),
  //         linhvuc_name: "Công nghiệp khai khoáng",
  //         textNum: "6.5%",
  //         report: ""
  //       },
  //       {
  //         id: "4",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-4.png"),
  //         linhvuc_name: "Du lịch Quảng Ninh",
  //         textNum: "5.74 triệu khách",
  //         report: "Tăng 24% cùng kỳ"
  //       },
  //       {
  //         id: "5",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-5.png"),
  //         linhvuc_name: "GRDP tăng trưởng",
  //         textNum: "10.3-10.5%",
  //         report: "Tính đến thời điểm báo cáo"
  //       },
  //       {
  //         id: "6",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-6.png"),
  //         linhvuc_name: "Thu nội địa đạt",
  //         textNum: "30.360 tỷ đồng",
  //         report: "Tăng 10% cùng kỳ"
  //       }
  //     ]
  //   },
  //   {
  //     id: "2",
  //     name: "LĨNH VỰC GIÁO DỤC",
  //     data: [
  //       {
  //         id: "1",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
  //         linhvuc_name: "Số lượng học sinh",
  //         textNum: "12.128 học sinh",
  //         report: "Tính đến thời điểm báo cáo"
  //       },
  //       {
  //         id: "2",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-8.png"),
  //         linhvuc_name: "Số lượng trường học",
  //         textNum: "462 trường",
  //         report: "Tăng 19 trường"
  //       },
  //       {
  //         id: "3",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-9.png"),
  //         linhvuc_name: "Tốt nghiệp phổ thông",
  //         textNum: "1.114 học sinh",
  //         report: "Giảm 2% so với cùng kỳ"
  //       },
  //       {
  //         id: "4",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
  //         linhvuc_name: "Học sinh giỏi",
  //         textNum: "4.014 học sinh",
  //         report: "Tính đến thời điểm báo cáo"
  //       },
  //       {
  //         id: "5",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
  //         linhvuc_name: "Học sinh bỏ học",
  //         textNum: "244 học sinh",
  //         report: "Tăng 5 học sinh"
  //       },
  //       {
  //         id: "6",
  //         icon: require("../../../assets/images/bao-cao-tong-hop-12.png"),
  //         linhvuc_name: "Số lượng giáo viên",
  //         textNum: "451 giáo viên",
  //         report: "Tính đến thời điểm báo cáo"
  //       }
  //     ]
  //   }
  // ],
  'ds_bao_cao_tong_hop_kinh_te': [
    {
      id: "1",
      icon: require("../../../assets/images/bao-cao-tong-hop-1.png"),
      linhvuc_name: "Nông sản tăng",
      textNum: "3.4%",
      report: "Đóng góp 0.2%"
    },
    {
      id: "2",
      icon: require("../../../assets/images/bao-cao-tong-hop-2.png"),
      linhvuc_name: "Công nghiệp - xây dựng tăng",
      textNum: "9.2%",
      report: "Đóng góp 4.5%"
    },
    {
      id: "3",
      icon: require("../../../assets/images/bao-cao-tong-hop-3.png"),
      linhvuc_name: "Công nghiệp khai khoáng",
      textNum: "6.5%",
      report: ""
    },
    {
      id: "4",
      icon: require("../../../assets/images/bao-cao-tong-hop-4.png"),
      linhvuc_name: "Du lịch Quảng Ninh",
      textNum: "5.74 triệu khách",
      report: "Tăng 24% cùng kỳ"
    },
    {
      id: "5",
      icon: require("../../../assets/images/bao-cao-tong-hop-5.png"),
      linhvuc_name: "GRDP tăng trưởng",
      textNum: "10.3-10.5%",
      report: "Tính đến thời điểm báo cáo"
    },
    {
      id: "6",
      icon: require("../../../assets/images/bao-cao-tong-hop-6.png"),
      linhvuc_name: "Thu nội địa đạt",
      textNum: "30.360 tỷ đồng",
      report: "Tăng 10% cùng kỳ"
    }
  ],
  'ds_bao_cao_tong_hop_giao_duc': [
    {
      id: "1",
      icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
      linhvuc_name: "Số lượng học sinh",
      textNum: "12.128 học sinh",
      report: "Tính đến thời điểm báo cáo"
    },
    {
      id: "2",
      icon: require("../../../assets/images/bao-cao-tong-hop-8.png"),
      linhvuc_name: "Số lượng trường học",
      textNum: "462 trường",
      report: "Tăng 19 trường"
    },
    {
      id: "3",
      icon: require("../../../assets/images/bao-cao-tong-hop-9.png"),
      linhvuc_name: "Tốt nghiệp phổ thông",
      textNum: "1.114 học sinh",
      report: "Giảm 2% so với cùng kỳ"
    },
    {
      id: "4",
      icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
      linhvuc_name: "Học sinh giỏi",
      textNum: "4.014 học sinh",
      report: "Tính đến thời điểm báo cáo"
    },
    {
      id: "5",
      icon: require("../../../assets/images/bao-cao-tong-hop-10.png"),
      linhvuc_name: "Học sinh bỏ học",
      textNum: "244 học sinh",
      report: "Tăng 5 học sinh"
    },
    {
      id: "6",
      icon: require("../../../assets/images/bao-cao-tong-hop-12.png"),
      linhvuc_name: "Số lượng giáo viên",
      textNum: "451 giáo viên",
      report: "Tính đến thời điểm báo cáo"
    }
  ],
  'loai_hinh_bao_cao': [
    {
      id: "1",
      name: "Báo cáo đột xuất"
    },
    {
      id: "2",
      name: "Báo cáo theo tuần"
    },
    {
      id: "3",
      name: "Báo cáo theo tháng"
    },
    {
      id: "4",
      name: "Báo cáo theo quý"
    },
    {
      id: "5",
      name: "Báo cáo 6 tháng"
    },
    {
      id: "6",
      name: "BÁO CÁO NĂM"
    },
    {
      id: "6",
      name: "BÁO CÁO HỖN HỢP"
    },
  ],

  'tinKhanCap/getListEmergency':
    [
      {
        "id": 1,
        "idLinhVuc": 1,
        "idBoPhan": 1,
        "idTrangThai": 1116,
        "idNguoiTao": 3,
        "idLoaiTin": 2130,
        "tieuDe": "Dữ liệu test",
        "noiDung": "Tháng 4 đến là lúc Rikkeisoft bước sang tuổi thứ 7, và cũng là thời điểm mà chỉ còn 2 tháng nữa, công ty chúng ta sẽ đạt mốc 1000 nhân sự (Mục tiêu hoàn thành 1000 nhân sự được rút ngắn xuống trước T6/2019). Nhân sự kiện CHÀO MỪNG 07 NĂM THÀNH LẬP CÔNG TY và để thực hiện công tác chuẩn bị cho sự “bùng nổ” nhân sự trong tháng 6 tới, Rikkeisoft hân hoan tổ chức chuỗi hoạt động tích hợp mang tên “I’M POSSIBLE - TÔI CÓ THỂ” với mục đích chính là tạo ra sân chơi cho các anh em không ngừng hoàn thiện bản thân về cả mặt thể chất, tư duy và tâm hồn. ",
        "thoiGianTao": "21/03/2019 00:00",
        "thoiGianCapNhat": "2019-03-20T17:00:00.000+0000",
        "trichDan": null,
        "link": "https://www.youtube.com/watch?v=zX5ckNc7UmM",
        "poster": "https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg",
        "tenTrangThai": "Cần xử lý ngay",
        "tenLinhVuc": "Luật pháp",
        "tenBoPhan": null,
        "tenNguoiTao": null,
        "tenLoaiTin": "Cháy nổ",
        "idBoPhanNhan": null,
        "listDonViDTO": null,
        "fileTinKhanCapEntity": null,
        "link_icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8AlIx0eBRcuV5K_l1asbI9XyBdvygMskltWwwYjzWVaxV85o",
      },
      {
        "id": 2,
        "idLinhVuc": 1,
        "idBoPhan": 1,
        "idTrangThai": 1116,
        "idNguoiTao": 3,
        "idLoaiTin": 2130,
        "tieuDe": "Dữ liệu test",
        "noiDung": "Tháng 4 đến là lúc Rikkeisoft bước sang tuổi thứ 7, và cũng là thời điểm mà chỉ còn 2 tháng nữa, công ty chúng ta sẽ đạt mốc 1000 nhân sự (Mục tiêu hoàn thành 1000 nhân sự được rút ngắn xuống trước T6/2019). Nhân sự kiện CHÀO MỪNG 07 NĂM THÀNH LẬP CÔNG TY và để thực hiện công tác chuẩn bị cho sự “bùng nổ” nhân sự trong tháng 6 tới, Rikkeisoft hân hoan tổ chức chuỗi hoạt động tích hợp mang tên “I’M POSSIBLE - TÔI CÓ THỂ” với mục đích chính là tạo ra sân chơi cho các anh em không ngừng hoàn thiện bản thân về cả mặt thể chất, tư duy và tâm hồn. ",
        "thoiGianTao": "21/03/2019 00:00",
        "thoiGianCapNhat": "2019-03-20T17:00:00.000+0000",
        "trichDan": null,
        "link": "https://www.youtube.com/watch?v=zX5ckNc7UmM",
        "poster": "https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg",
        "tenTrangThai": "Cần xử lý ngay",
        "tenLinhVuc": "Luật pháp",
        "tenBoPhan": null,
        "tenNguoiTao": null,
        "tenLoaiTin": "Cháy nổ",
        "idBoPhanNhan": null,
        "listDonViDTO": null,
        "fileTinKhanCapEntity": null,
        "link_icon": "https://www.burns-360.com/wp-content/uploads/2018/09/Sample-Icon.png",
      },
    ],



  'ds_thong_bao': [
    {
      id: 1,
      icon: require('../../../assets/images/l2-thong-bao/bell.png'),
      title: "Công văn số DVC-34536 cần được duyệt",
      contents: "Nhắc duyệt văn bản",
      createTime: "20/10/2019 03:65"
    },
    {
      id: 2,
      icon: require('../../../assets/images/l2-thong-bao/bell.png'),
      title: "Mật khẩu dùng đã quá 90 ngày. Cảnh báo....",
      contents: "Nhắc thay đổi mật khẩu",
      createTime: "20/10/2019 03:65"
    },
    {
      id: 3,
      icon: require('../../../assets/images/l2-thong-bao/bell.png'),
      title: "Chỉ còn 20:45 cuộc họp sẽ bắt đầu",
      contents: "Họp tại chi cục thuế tỉnh Quảng Ninh",
      createTime: "20/10/2019 03:65"
    },
    {
      id: 4,
      icon: require('../../../assets/images/l2-thong-bao/bell_inactive.png'),
      title: "Mật khẩu dùng đã quá 90 ngày. Cảnh báo....",
      contents: "Họp tại chi cục thuế tỉnh Quảng Ninh",
      createTime: "20/10/2019 03:65"
    },
    {
      id: 5,
      icon: require('../../../assets/images/l2-thong-bao/bell_inactive.png'),
      title: "Mật khẩu dùng đã quá 90 ngày. Cảnh báo....",
      contents: "Họp tại chi cục thuế tỉnh Quảng Ninh",
      createTime: "20/10/2019 03:65"
    },
    {
      id: 6,
      icon: require('../../../assets/images/l2-thong-bao/bell_inactive.png'),
      title: "Mật khẩu dùng đã quá 90 ngày. Cảnh báo....",
      contents: "Họp tại chi cục thuế tỉnh Quảng Ninh",
      createTime: "20/10/2019 03:65"
    },
  ],
  'nhiem_vu/nhan/by_nguoi_xu_ly': {
    "size": 2,
    "data": [
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Điều chỉnh QHCXD Khu KTCK Thuận Thành, tỉnh Bắc Ninh",
            "sumary": "",
            "contents": "Thủ Tướng Chính phủ đồng ý để Tỉnh Bắc Ninh tổ chức lập hồ sơ điều chỉnh quy hoạch chung Khu kinh tế cửa khẩu Thuận Thành.\n\nBộ Xây dựng hướng dẫn Tỉnh Bắc Ninh thực hiện theo đúng quy định của pháp luật hiện hành.",
            "imgLink": "12",
            "videoLink": "",
            "createTime": "2019-04-16T02:21:35.350+0000",
            "publishTime": "2019-04-30T02:16:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"Chính phủ\",\"id\":\"1\",\"type\":\"1\"},{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"2\"},{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"3\"},{\"name\":\"Sở Tài chính\",\"id\":\"11\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 543,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Thực hiện chương trình, chính sách liên quan đến phân luồng sau giáo dục Trung học cơ sở tại vùng đồng bào DTTS giai đoạn 2010 - 2018 ",
            "sumary": "",
            "contents": "Giao  Sở Giáo dục và đào tạo làm đầu mối chủ trì, phối hợp với các đơn vị liên quan triển khai thực hiện chính sách này.",
            "imgLink": null,
            "videoLink": "",
            "createTime": "2019-04-14T19:01:05.830+0000",
            "publishTime": "2019-04-29T18:36:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"3\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 289,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        }
    ]
},
  'nhiem_vu/nhan/by_nguoi_xu_ly/0': {
    "cateID": 3,
    "cateTypeID": 0,
    "userID": 62,
    "publishUserID": 0,
    "orgID": 8,
    "title": "Điều chỉnh QHCXD Khu KTCK Thuận Thành, tỉnh Bắc Ninh",
    "sumary": "nguyenduclong",
    "contents": "Thủ Tướng Chính phủ đồng ý để Tỉnh Bắc Ninh tổ chức lập hồ sơ điều chỉnh quy hoạch chung Khu kinh tế cửa khẩu Thuận Thành.\n\nBộ Xây dựng hướng dẫn Tỉnh Bắc Ninh thực hiện theo đúng quy định của pháp luật hiện hành.",
    "imgLink": "",
    "videoLink": "",
    "createTime": "2019-04-16T02:21:35.350+0000",
    "publishTime": "2019-04-30T02:16:00.000+0000",
    "status": "1",
    "referUserID": "1,56,57,58,59,60,61,62,",
    "referUserName": null,
    "referOrgID": "1,8,11,",
    "referOrgName": null,
    "fileIds": null,
    "publishTimeStr": null,
    "missionType": null,
    "pageSize": null,
    "pageId": null,
    "referInfo": "[{\"name\":\"Chính phủ\",\"id\":\"1\",\"type\":\"1\"},{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"2\"},{\"name\":\"UBND Tỉnh Bắc Ninh\",\"id\":\"8\",\"type\":\"3\"},{\"name\":\"Sở Tài chính\",\"id\":\"11\",\"type\":\"3\"}]",
    "lstReferUserId": [
        "1",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62"
    ],
    "lstReferOrgId": [
        "1",
        "8",
        "11"
    ],
    "id": 543,
    "trangThai": "1",
    "tenTrangThai": "Đang xử lý"
},
  'nhiem_vu/giao/by_nguoi_xu_ly': {
    "size": 19,
    "data": [
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 76,
            "publishUserID": 0,
            "orgID": 10,
            "title": "Đồng chí Giám đốc Sở Giáo dục và Đào tạo Quảng Ninh đến thăm, tặng Giấy khen và trao học bổng cho học sinh Nguyễn Thành Đạt vượt khó vươn lên, đạt thành tích xuất sắc trong học tập và rèn luyện.",
            "sumary": "",
            "contents": "Sáng ngày 12/3/2019, đồng chí Vũ Liên Oanh, Tỉnh Ủy viên, Giám đốc Sở Giáo dục và Đào tạo (GDĐT) trực tiếp đến trường thăm, tặng Giấy khen và trao học bổng động viên học sinh Nguyễn Thành Đạt. Tham gia Đoàn có đồng chí Hoàng Hồng, Phó Chủ tịch Hội Khuyến học Tỉnh cùng lãnh đạo Phòng Chính trị tư tưởng, Phòng GDĐT huyện Hoành Bồ.\nSau khi nghe đồng chí Hiệu trưởng trường TH&THCS Đồng Sơn báo cáo sơ bộ tình hình nhà trường nói chung, kết quả học tập, rèn luyện của học sinh Nguyễn Thành Đạt nói riêng, đồng chí Giám đốc Sở đã trực tiếp trao đổi, trò chuyện cùng cô giáo Năm - mẹ đẻ của học sinh Nguyễn Thành Đạt để tìm hiểu về hành trình vượt khó của hai mẹ con trong việc giúp con được tiếp cận và học tập tốt môn học ngoại ngữ trong điều kiện gia đình còn nhiều khó khăn như hiện nay.\n\nPhát biểu tại Lễ trao thưởng, trước sự chứng kiến của lãnh đạo địa phương xã Đồng Sơn, lãnh đạo ngành GDĐT huyện và tập thể cán bộ, giáo viên, học sinh khối tiểu học của trường TH&THCS Đồng Sơn, đồng chí Giám đốc Sở đã ghi nhận, biểu dương những cố gắng nỗ lực của học sinh Nguyễn Thành Đạt, mặc dù còn nhỏ tuổi nhưng em đã quyết tâm vượt khó vươn lên, đạt thành tích trong học tập và rèn luyện. Em Nguyễn Thành Đạt hai năm liền là lớp trưởng, là học sinh xuất sắc của trường, được thầy cô và các bạn yêu mến. Em Đạt rất yêu thích và ham học tiếng Anh ở bất cứ thời gian, thời điểm nào trong ngày, điều đó chính là động lực để mẹ em cố gắng cuối mỗi tuần vượt hàng trăm cây số đường rừng, đường đèo dốc quanh co, không quản nắng mưa để đưa em ra thành phố học tiếng Anh.\n\nĐến thăm gia đình học sinh, đồng chí Giám đốc Sở và đoàn công tác vô cùng xúc động vì mặc dù căn nhà ván gỗ ghép, nền đất mấp mô, đồ đạc sơ sài nhưng mọi thứ được sắp đặt khá gọn gàng, sạch sẽ. Trên bàn học của em Đạt là quyển sách Tiếng Anh, đồng chí Giám đốc đã nghe em Đạt đọc và dịch khá nhanh, chuẩn những câu hội thoại trong sách.\nĐồng chí Giám đốc Sở GDĐT khen ngợi, động viên học sinh Nguyễn Thành Đạt cần cố gắng hơn, kiên trì và quyết tâm hơn nữa trong học tập để trở thành “người công dân toàn cầu” khi đã giỏi tiếng Anh; đồng chí cũng đề nghị Phòng GDĐT Hoành Bồ, lãnh đạo trường TH&THCS Đồng Sơn tích cực tham mưu lãnh đạo địa phương tiếp tục quan tâm tới hoàn cảnh gia đình em Đạt nhằm tạo điều kiện thuận lợi để em có cơ hội được học tập, được phát triển năng khiếu ngoại ngữ một cách tốt hơn. Về phía ngành giáo dục, ngoài suất học bổng của Sở dành cho em Đạt trị giá 5 triệu đồng, Trung tâm ngoại ngữ APAX nơi em đang theo học sẽ có cơ chế hỗ trợ giảm học phí để em có thêm nhiều cơ hội được học tập, phát triển năng lực nghe, nói tiếng Anh. Đồng chí Giám đốc Sở mong muốn nhà trường, gia đình cần tiếp tục tuyên truyền cho em Đạt và các học sinh khác ngọn lửa đam mê về học tập ngoại ngữ, nhất là tiếng Anh để nhân rộng tấm gương em Đạt khắp toàn huyện, toàn tỉnh, nhất là trong giai đoạn hiện nay khi Tỉnh Quảng Ninh đang thực hiện nhiều giải pháp để nâng cao việc học tập ngoại ngữ trong thanh thiếu nhi.\n\nCuối buổi làm việc, Đoàn công tác ghé thăm trường mầm non Sơn Dương, đồng chí Giám đốc Sở GDĐT đánh giá cao sự cần cù, chịu khó, tâm huyết của đội ngũ giáo viên nhà trường trong việc sử dụng, bảo vệ tài sản công của nhà nước cũng như thiết bị học và chơi của trẻ được ngành trang cấp từ các chương trình dự án phát triển giáo dục, ngoài ra các cô rất chú ý trang trí cây xanh, tạo không gian từ các góc hoạt động cho học sinh rất thân thiện, đẹp mắt. Thăm nơi ăn, ngủ của học sinh, đồng chí nhắc nhở nhà trường cần tăng cường chú ý đến công tác phòng chống dịch bệnh, vệ sinh an toàn thực phẩm, phòng chống cháy nổ và đảm bảo an toàn cho học sinh khi tới trường.\n\n",
            "imgLink": "20",
            "videoLink": "",
            "createTime": "2019-04-18T10:02:57.120+0000",
            "publishTime": "2019-04-08T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"},{\"name\":\"Lãnh đạo sở Giáo dục\",\"id\":\"1115\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 987,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 76,
            "publishUserID": 0,
            "orgID": 10,
            "title": "KẾT QUẢ CỦA ĐOÀN QUẢNG NINH THAM DỰ CUỘC THI KHKT QUỐC GIA DÀNH CHO HỌC SINH TRUNG HỌC NĂM HỌC 2017-2018",
            "sumary": "",
            "contents": "Đây là cuộc thi nhằm khuyến khích học sinh nghiên cứu khoa học; sáng tạo kĩ thuật, công nghệ và vận dụng kiến thức của môn học vào giải quyết những vấn đề thực tiễn, góp phần đổi mới hình thức tổ chức dạy học; đổi mới hình thức và phương pháp đánh giá kết quả học tập; phát triển năng lực và phẩm chất học sinh.\n\nNăm 2019, Cuộc thi được thực hiện theo hướng dẫn tại Thông tư 38/2012 và được bổ sung tại Thông tư 32/2017 của Bộ Giáo dục và Đào tạo. Theo đó, số lượng dự án đạt giải không quá 50% số lượng dự án dự thi (trong đó giải Nhất không quá 5%, giải Nhì không quá 10%, giải ba không quá 15% và giải Tư không quá 20% số lượng dự án dự thi); thực hiện chấm thi hai vòng độc lập gồm vòng chấm hồ sơ và vòng phỏng vấn học sinh tại địa điểm trưng bày dự án; bốc thăm ngẫu nhiên giám khảo chấm mỗi vòng nhằm tăng tính khách quan, chặt chẽ, minh bạch cho công tác chấm thi.\n\n Tham dự Cuộc thi, đoàn Quảng Ninh có 6 Dự án thuộc 4 lĩnh vực: Kĩ thuật cơ khí, Vi sinh, Khoa học xã hội và hành vi, Hệ thống nhúng của học sinh đến từ các trường: THPT chuyên Hạ Long, THPT Hòn Gai, THPT Uông Bí và Phòng GDĐT Quảng Yên.\n\nKết quả, đoàn Quảng Ninh đạt được 6/6 giải, gồm 1 giải Nhất, 1 giải Ba và 4 giải Tư, đạt 100% số lượng dự án dự thi, cụ thể như sau:\n\n* Giải Nhất:\n\nDự án: “Máy làm sạch bề mặt đáy ao nuôi tôm” Ngô Anh Tài và Nguyễn Đức Hoàn - THCS Tân An - Quảng Yên;\n\n* Giải Ba:\n\nDự án: “Phân lập, tuyển chọn các chủng vi sinh vật chịu mặn, tạo chế phẩm phục vụ sản xuất phân bón hữu cơ vi sinh, cải tạo đất hạn mặn trên các đảo xa đất liền của Việt Nam” của học sinh Nguyễn Hương Giang và Đào Diễm Quỳnh – THPT chuyên Hạ Long;\n\n* Giải Tư:\n\nDự án: “ Nghiên cứu phương pháp chẩn đoán mầm bệnh hoại tử gan tụy cấp tính trên tôm thẻ chân trắng và sản xuất chế phẩm Lactobacillus plantarum S11 từ ruột tôm để ức chế vi khuẩn gây bệnh” của học sinh Mạnh Tuấn Hưng và Lê Tuấn – THPT chuyên Hạ Long;\n\nDự án: “ Hệ thống quản lí thức ăn thông minh và cải thiện môi trường sinh thái biển dựa trên tập tính săn mồi của loài cá song” của học sinh Dương Đình Ngọc Bách và Phạm Đức Hùng – THPT chuyên Hạ Long;\n\nDự án: “ Học sinh thành phố Uông Bí, tỉnh Quảng Ninh với việc quảng bá giá trị văn hóa, lịch sử khu di tích Quốc gia đặc biệt Yên Tử góp phần phát triển ngành Du lịch” của học sinh Trần Khánh Linh và Nguyễn Thúy Hiền – THPT Uông Bí;\n\nDự án: “Hệ thống định vị và quản lí khách du lịch” của học sinh Trần Hoàng Sơn và Đặng Minh Dũng – THPT Hòn Gai.\n\nNgoài ra các dự án dự thi còn được trao 05 giải thưởng đặc biệt của các nhà tài trợ.\n\nĐây là lần đầu tiên đoàn dự thi của tỉnh Quảng Ninh có 6/6 dự án đạt giải, trong đó có giải Nhất, và cũng là đơn vị duy nhất toàn miền Bắc có 100% dự án đạt giải tại Cuộc thi.\n\nKết quả đạt được cho thấy định hướng tổ chức các hoạt động trải nghiệm, đưa giáo dục STEM vào các nhà trường và công tác tổ chức, hướng dẫn học sinh trung học nghiên cứu khoa học của tỉnh đã đi đúng hướng, có tính lan tỏa cao và ngày càng nhận được nhiều hơn sự quan tâm ủng hộ từ phía các nhà quản lí giáo dục, các tổ chức doanh nghiệp và phụ huynh học sinh.",
            "imgLink": "20",
            "videoLink": "",
            "createTime": "2019-04-18T10:01:31.930+0000",
            "publishTime": "2019-04-23T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"},{\"name\":\"Lãnh đạo sở Giáo dục\",\"id\":\"1115\",\"type\":\"3\"},{\"name\":\"Văn phòng Sở Giáo dục\",\"id\":\"1116\",\"type\":\"3\"},{\"name\":\"Phòng Giáo dục Tiểu học\",\"id\":\"1120\",\"type\":\"3\"},{\"name\":\"Phòng Giáo dục Trung học\",\"id\":\"1121\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 986,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Đẩy mạnh xã hội hóa và tự chủ trong ngành Y tế",
            "sumary": "",
            "contents": "Trong những năm qua, ngành Y tế Quảng Ninh đã từng bước kiện toàn, củng cố mạng lưới y tế từ tuyến xã đến tuyến tỉnh, phù hợp với tình hình địa phương. Qua đó tạo điều kiện thuận lợi để nâng cao chất lượng chuyên môn, từng bước cải thiện sức khỏe người dân, góp phần giảm nghèo bền vững cho người dân, vì đói nghèo và bệnh tật là vòng luẩn quẩn, ảnh hưởng đến vấn đề an sinh xã hội. Cùng với đó, công tác truyền thông giáo dục sức khỏe thông qua các phương tiện thông tin đại chúng thường xuyên tuyên truyền những chủ trương, chính sách của Đảng và Nhà nước về công tác y tế, nên cộng đồng đã tích cực tham gia các chương trình mục tiêu y tế như: Tiêm chủng mở rộng, phòng chống dịch bệnh, vệ sinh an toàn thực phẩm, bảo vệ môi trường, hiến máu nhân đạo...\n\n \n\nNgành Y tế Quảng Ninh cũng đẩy mạnh việc xã hội hóa y tế, nhằm ngày càng phát triển, đảm bảo chất lượng khám, chữa bệnh cho người dân tốt nhất. Từ năm 2008 đến nay, toàn tỉnh đã có 20 dự án thuộc nguồn vốn trái phiếu Chính phủ để đầu tư xây dựng và mua sắm trang thiết bị ở tuyến huyện. Tổng vốn đầu tư trên 920 tỷ đồng, trong đó, trên 470 tỷ đồng là nguồn vốn trái phiếu Chính phủ, còn lại nguồn ngân sách của tỉnh. Nhờ đó, cơ sở hạ tầng của các đơn vị y tế tuyến huyện từng bước được hoàn thiện; trang thiết bị đầu tư; kỹ thuật mới, kỹ thuật cao đã được triển khai... từng bước đáp ứng nhu cầu khám chữa bệnh ngày càng cao của nhân dân.\nCùng với hệ thống bệnh viện công lập, ngành Y tế Quảng Ninh cũng đẩy mạnh thực hiện các giải pháp huy động nguồn lực từ xã hội để đầu tư cơ sở vật chất, bổ sung mới trang thiết bị y tế hiện đại, giúp nâng cao năng lực chẩn đoán và điều trị của các cơ sở y tế. Các phòng khám đa khoa tư nhân đã phát triển nhiều chuyên khoa, số lượng bác sĩ tham gia từ 10-15 người. Năm 2016, Quảng Ninh đã có 1 bệnh viện tư nhân Đa khoa quốc tế Vinmec Hạ Long, với quy mô 150 giường được đưa vào sử dụng. Đến nay, toàn tỉnh có trên 1.190 cơ sở hành nghề y, dược tư nhân được cấp phép hoạt động. Nhờ có mạng lưới cơ sở hành nghề y, dược tư nhân rộng khắp, qua đó kịp thời đáp ứng nhu cầu khám chữa bệnh và cung cấp các loại thuốc thông thường cho nhân dân, chia sẻ bớt gánh nặng quá tải trong các cơ sở nhà nước.\n\n \n\nBên cạnh đó, ngành Y tế cũng đẩy mạnh thực hiện cơ chế tự chủ trong các đơn vị y tế. Hiện nay, toàn ngành đang có 7 đơn vị tự chủ 100% chi thường xuyên; 19 đơn vị tự chủ một phần (từ 10-60%); chỉ còn 4 đơn vị chưa thực hiện tự chủ, ngân sách nhà nước đảm bảo toàn bộ. Thực hiện tự chủ về tài chính đồng nghĩa với việc các đơn vị y tế công lập phải tự thu, chi và tự cân đối. Nhiều đơn vị mở rộng các hình thức dịch vụ để khám và điều trị như: Dịch vụ khám chữa bệnh theo yêu cầu, khám chữa bệnh tự chọn, sử dụng các dịch vụ kỹ thuật cao, mời chuyên gia, giáo sư đầu ngành ở Trung ương về tuyến tỉnh để điều trị...\n\n \n\nQua thực tế triển khai cho thấy, việc thực hiện cơ chế tự chủ, tự chịu trách nhiệm đã tạo quyền chủ động cho đơn vị trong quản lý chi tiêu tài chính, từng bước giảm bớt sự can thiệp của cơ quan quản lý ở cấp trên. Đồng thời, thu nhập của người lao động từng bước được cải thiện, phân phối tiền lương của đơn vị sự nghiệp đã gắn với hiệu quả, chất lượng công việc thông qua quy chế chi tiêu nội bộ...\n\n \n\nCác đơn vị đã chủ động trong việc rà soát, sắp xếp lại bộ máy để điều chỉnh chức năng, nhiệm vụ, tinh gọn, tiết kiệm chi phí, tránh chồng chéo. Ưu tiên dành chỉ tiêu biên chế, ban hành các tiêu chí và thực hiện các quy chế đãi ngộ để thu hút, tuyển dụng nguồn nhân lực chất lượng cao; chủ động triển khai và tiếp tục mở rộng thực hiện hợp đồng gói dịch vụ, hạn chế phương thức “tuyển dụng một lần hưởng lương suốt đời”... qua đó góp phần tiết kiệm biên chế so với định mức theo quy định của Trung ương.\nNgoài nguồn lực từ ngân sách nhà nước, nhiều tổ chức, cá nhân trong và ngoài nước đã huy động đóng góp, hỗ trợ tài chính cho khám, chữa bệnh, bảo trợ bệnh nhân nghèo, nạn nhân chất độc da cam, người tàn tật... Tiêu biểu như các chương trình phẫu thuật sứt môi, hở hàm ếch đem lại nụ cười trẻ thơ; phẫu thuật mắt đem lại ánh sáng cho người khiếm thị; phẫu thuật bệnh tim bẩm sinh cho trẻ em; nồi cháo nhân đạo, tủ áo miễn phí tại các bệnh viện... Nhờ sự tham gia tích cực của cộng đồng đã tạo nên nguồn lực không nhỏ bảo vệ, chăm sóc sức khỏe nhân dân trên địa bàn tỉnh.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:57:03.717+0000",
            "publishTime": "2019-04-24T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Chi cục Dân số Kế hoạch hóa gia đình\",\"id\":\"1147\",\"type\":\"3\"},{\"name\":\"Ban quản lý dự án đầu tư các công trình y tế\",\"id\":\"1155\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 910,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Những thầy thuốc trẻ thắp lửa nhiệt huyết",
            "sumary": "",
            "contents": "Với hành trang là chiếc blouse trắng và các kiến thức học tại các giảng đường trường y cũng như từ thực tiễn học chuyên khoa I tại các bệnh viện tuyến TW, các bác sĩ trẻ thuộc Dự án “Thí điểm đưa bác sĩ trẻ tình nguyện về công tác tại miền núi, vùng sâu, vùng xa, biên giới, hải đảo, vùng có điều kiện kinh tế - xã hội khó khăn (ưu tiên 62 huyện nghèo)” (gọi tắt là Dự án 585) đã tình nguyện dành những ngày tháng tươi đẹp nhất để chăm sóc sức khỏe cho người dân ở các huyện nghèo của nhiều tỉnh miền núi…\nTháng 11/2014, Hiếu chính thức là một trong những học viên đầu tiên của chương trình tình nguyện - Dự án 585. Năm học thứ hai của khóa học BSCK I, ngành Nhi khoa của Dự án 585, Hiếu khởi phát bệnh “viêm cột sống dính khớp thể hỗn hợp”, mất khả năng lao động, việc tự chăm sóc bản thân gặp khó khăn và đau đớn. Nhưng bằng ý chí, nghị lực, trong thời gian điều trị tại Khoa Cơ xương khớp (BV Bạch Mai), Hiếu cố gắng học tập và hoàn thành khóa học.\n\n \n\nTháng 8/2017, Hiếu lên đường đến vùng cực Tây Tổ quốc, hỗ trợ Trung tâm y tế huyện Mường Nhé, thời gian tối thiểu là 3 năm với hai nhiệm vụ quan trọng là khám, chẩn đoán, điều trị bệnh nhân và hướng dẫn, giảng dạy, chia sẻ kiến thức chuyên môn cho bác sĩ tuyến cơ sở. BS. Hiếu chia sẻ, quá trình “cọ xát” môi trường thực tế đã cho tôi hiểu được những vất vả, khó khăn của các đồng nghiệp, qua đó giúp tôi rèn luyện, trưởng thành và hoàn thiện trong công việc. Tôi được bố trí ở nội trú trong trung tâm y tế nên khi có bệnh nhân nặng, dù ở ca trực của mình hay đồng nghiệp, tôi luôn sẵn sàng hỗ trợ kịp thời để cứu sống nhiều bệnh nhân trong tình trạng nguy cấp như: ngạt sau sinh, sốc nhiễm khuẩn nặng, suy hô hấp ở trẻ đẻ non, uốn ván sơ sinh, suy hô hấp do viêm phổi nặng...\n\n \n\nTháng 1/2018, sau khi tốt nghiệp chuyên khoa I tại Trường ĐH Y Hà Nội chuyên ngành nội khoa, bác sĩ trẻ Nguyễn Thị Thu (ở Hà Nội) lên nhận công tác tại BVĐK huyện Hà Quảng (Cao Bằng), bắt đầu một hành trình hoàn toàn mới - 2 năm công tác tại một huyện miền núi. Thu chia sẻ, cô lựa chọn tham gia dự án vì đây là cơ hội để những bác sĩ trẻ mới ra trường như mình được học tập, được mang sức trẻ cống hiến cho sự nghiệp chăm sóc sức khỏe nhân dân vùng cao.\nTheo Bộ trưởng Bộ Y tế Nguyễn Thị Kim Tiến, Dự án thí điểm bác sĩ trẻ tình nguyện là bước đột phá của ngành y tế trong việc tiến tới bảo đảm đủ số lượng nguồn nhân lực có trình độ chuyên môn, kỹ thuật cao, đáp ứng được nhu cầu chăm sóc sức khỏe của nhân dân ở địa phương còn khó khăn. Qua đó tạo cơ hội cho đông đảo người nghèo, người dân ở vùng sâu, vùng xa, biên giới, hải đảo, vùng có điều kiện kinh tế - xã hội khó khăn được tiếp cận các dịch vụ y tế có chất lượng ngày một tốt hơn, hạn chế chuyển tuyến điều trị không cần thiết, góp phần giảm quá tải ở các bệnh viện tuyến trên, tránh lãng phí cho người dân, cộng đồng và xã hội.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:55:37.267+0000",
            "publishTime": "2019-05-08T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng Kế hoạch Tài chính\",\"id\":\"1142\",\"type\":\"3\"},{\"name\":\"Chi cục Dân số Kế hoạch hóa gia đình\",\"id\":\"1147\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 909,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Phòng, chống suy dinh dưỡng cho trẻ còn khó khăn",
            "sumary": "",
            "contents": "Phòng, chống suy dinh dưỡng cho trẻ dưới 5 tuổi, nhất là suy dinh dưỡng thể thấp còi luôn được tỉnh quan tâm thông qua việc tổ chức tốt hoạt động cho trẻ uống vitamin A hằng năm. Năm 2018, Chương trình phòng, chống suy dinh dưỡng của tỉnh còn cấp kinh phí cho mỗi xã, phường, thị trấn tổ chức 1 lớp tập huấn, nói chuyện chuyên đề về dinh dưỡng cho khoảng 30 phụ nữ mang thai và bà mẹ nuôi con nhỏ. Bên cạnh đó, tuyên truyền phòng, chống suy dinh dưỡng được lồng ghép tại các buổi sinh hoạt của các đoàn thể...  Các địa phương thực hiện thường xuyên việc cân, đo cho trẻ; bám sát gia đình có trẻ nhỏ để theo dõi tình hình, nhất là gia đình có trẻ bị suy dinh dưỡng hoặc nguy cơ rơi vào suy dinh dưỡng. Năm 2018, toàn tỉnh còn triển khai chương trình tẩy giun cho trẻ từ 2 tuổi trở lên để hạn chế tình trạng suy dinh dưỡng ở trẻ.\nMặc dù vậy, chương trình phòng, chống suy dinh dưỡng, nhất là suy dinh dưỡng thể thấp còi cho trẻ dưới 5 tuổi hiện gặp nhiều khó khăn. Theo báo cáo từ việc theo dõi cân nặng, chiều cao ở trẻ của các địa phương cho thấy, năm 2018 toàn tỉnh có 111.435 trẻ dưới 5 tuổi; qua cân, đo 110.018 trẻ dưới 5 tuổi thì có 8.923 trẻ suy dinh dưỡng cân nặng, 11.021 trẻ suy dinh dưỡng chiều cao (tỷ lệ 10,02%). Số trẻ suy dinh dưỡng chiều cao hiện chủ yếu tập trung ở các huyện miền núi: Đầm Hà (23,56%), Hải Hà (21,23%), Ba Chẽ (20,93%), Bình Liêu (20,64%)... Trong khi đó, kinh phí cho chương trình này lại khá hạn chế.\n\n \n\nTheo quy định  về hoạt động cải thiện tình trạng dinh dưỡng trẻ em tại Thông tư số 26/2018/TT-BTC của Bộ Tài chính “Quy định quản lý và sử dụng kinh phí sự nghiệp thực hiện chương trình mục tiêu y tế - dân số giai đoạn 2016- 2020”, thì không có kinh phí hỗ trợ cho việc cân trẻ. Trong khi thực tế ở các xã vùng sâu, vùng xa, nhiều khu vực dân cư tách biệt, khiến người dân không mặn mà với việc đưa trẻ đi cân, đo, đi uống vitamin A. Để khắc phục, thời gian trước đây khi có kinh phí hỗ trợ, các cộng tác viên dân số, y tá thôn, bản phải đến tận hộ dân để thực hiện; nhưng giờ không còn kinh phí hỗ trợ, nên tiền xăng xe đi lại cũng là cả vấn đề.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:53:55.403+0000",
            "publishTime": "2019-05-12T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Phòng Nghiệp vụ Dược\",\"id\":\"1144\",\"type\":\"3\"},{\"name\":\"Thanh tra sở Y tế\",\"id\":\"1146\",\"type\":\"3\"},{\"name\":\"Chi cục Dân số Kế hoạch hóa gia đình\",\"id\":\"1147\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 907,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Bộ trưởng Bộ Y tế: Đi bộ 10.000 bước chân để khỏe mạnh mỗi ngày",
            "sumary": "",
            "contents": "Sáng 7/4, Bộ Y tế phối hợp Trung ương đoàn TNCS Hồ Chí Minh tổ chức Lễ mít tinh hưởng ứng Chương trình Sức khỏe Việt Nam do Thủ tướng Chính phủ phát động và Tuyên dương Thầy thuốc trẻ Việt Nam tiêu biểu lần thứ VIII nhân Ngày Sức khỏe Thế giới (7/4/2019).\n \nTới dự lễ mít tinh có đồng chí Trương Thị Mai - Ủy viên Bộ chính trị, Bí thư Trung ương Đảng, Trưởng ban Dân vận Trung ương; Ông Kidong Park - Trưởng đại diện Văn phòng Tổ chức Y tế thế giới tại Việt Nam; Ông Lê Quốc Phong - Ủy viên Dự khuyết Trung ương Đảng, Bí thư thứ nhất Trung ương Đoàn TNCS Hồ Chí Minh, đại diện các ban ngành cùng đông đảo người dân.\n\n \n\nSự kiện này nhằm nâng cao nhận thức, khám sàng lọc và tư vấn để cùng vận động các tầng lớp xã hội và cộng đồng chung tay phòng chống các bệnh không lây nhiễm. Ngoài ra, thông qua hoạt động “đi bộ 10.000 bước chân” và hoạt động đồng diễn thể dục, Ban tổ chức mong muốn truyền tải thông điệp vận động để phòng chống bệnh tật, để thay đổi cuộc sống và vì một Việt Nam khỏe mạnh.\n\n \n\n\"Sát thủ\" mang tên bệnh không lây nhiễm\n \n\nPhát biểu khai mạc Ngày Sức khỏe thế giới 2019, hưởng ứng chương trình Sức khỏe Việt Nam, PGS.TS Nguyễn Thị Kim Tiến – Bộ trưởng Bộ Y tế cho biết, các bệnh không lây nhiễm như: bệnh tim mạch, ung thư, đái tháo đường và bệnh mạn tính về đường hô hấp… là những “sát thủ” hàng đầu, đang chiếm 73% số ca tử vong hằng năm.\n\n \n\nNguyên nhân khiến tỷ lệ mắc và tử vong cao đối với các bệnh không lây nhiễm xuất phát từ lối sống và sự chủ quan của người Việt Nam như: hút thuốc, uống rượu bia, ăn ít rau, trái cây, ăn nhiều muối, thiếu hoạt động thể lực… Tình trạng thừa cân béo phì, tăng huyết áp, tăng đường máu, rối loạn lipid máu… đều có xu hướng gia tăng nhanh.\n\n \n\nTrong khi đó, mạng lưới y tế tuyến cơ sở chưa quản lý được các bệnh mạn tính, nhiều nơi năng lực còn hạn chế, đại bộ phận người dân chưa có ý thức kiểm tra sức khỏe định kỳ, sàng lọc phát hiện sớm các bệnh không lây nhiễm và lười rèn luyện thể chất.\n\nNgày 27/2/2019, Thủ tướng Chính phủ Nguyễn Xuân Phúc đã phát động Chương trình Sức khỏe Việt Nam, tập trung vào 11 lĩnh vực chia làm 3 nhóm: (1) Nâng cao sức khỏe: bảo đảm dinh dưỡng hợp lý, tăng cường vận động thể lực; (2) Bảo vệ sức khỏe và phòng bệnh: chăm sóc sức khỏe trẻ em và học sinh; phòng chống tác hại của thuốc lá; phòng chống tác hại của rượu, bia; vệ sinh môi trường; an toàn thực phẩm; (3) Chăm sóc sức khỏe ban đầu, kiểm soát bệnh tật: phát hiện sớm và quản lý một số bệnh không lây nhiễm; chăm sóc, quản lý sức khỏe người dân tại cộng đồng; chăm sóc sức khỏe người cao tuổi; chăm sóc sức khỏe người lao động.\n\n \n\nThiết thực triển khai Chương trình Sức khỏe Việt Nam, Bộ Y tế đã phối hợp với các Ban, ngành, Đoàn Thanh niên và các Tổ chức quốc tế, các hội nghề nghiệp như Hội Thầy thuốc trẻ Việt Nam triển khai nhiều hoạt động nhằm nâng cao nhận thức, thực hành của mỗi người dân để thực hiện các hành vi có lợi cho sức khỏe, tự chăm sóc bảo vệ và nâng cao sức khỏe các nhân, gia đình và cộng đồng.\n\n \n\nTăng cường sự tham gia, phối hợp liên ngành để xây dựng môi trường nâng cao sức khỏe, giảm thiểu các nguy cơ sức khỏe cho người dân và cộng đồng; Bảo đảm cho mọi người dân được quản lý, theo dõi sức khỏe liên tục và lâu dài để dự phòng, phát hiện sớm và điều trị, chăm sóc sức khỏe toàn diện và hiệu quả.\n\nMột điểm rất đặc biệt ở nước ta, vào năm 2000, ngày sức khỏe thế giới đã được Thủ tướng Chính phủ quyết định lấy là “Ngày toàn dân hiến máu tình nguyện” nhằm thúc đẩy hoạt động hiến máu tình nguyện trên cả nước. Từ đó đến nay, việc hiến máu  đã được các cấp, các ngành và đông đảo người dân Việt Nam hưởng ứng bằng hành động thiết thực đó là hiến máu và vận động nhiều người khác cùng hiến máu, góp phần quyết định đảm bảo cung cấp kịp thời máu và các các chế phẩm máu an toàn cho cấp cứu và điều trị, góp phần nâng cao chất lượng an toàn truyền máu.\n\n \n\nNhân dịp này, Bộ trưởng cũng biểu dương và cảm ơn những tình nguyện viên hiến máu của thủ đô nhân Ngày Toàn dân hiến máu tình nguyện, các bạn đã giúp ngành Y tế đảm bảo nguồn máu quý hiếm để cung cấp cho bệnh nhân, thể hiện nghĩa cử cao đẹp, “Mỗi giọt máu cho đi, một cuộc đời ở lại”.\n\n",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:52:24.017+0000",
            "publishTime": "2019-05-07T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Thanh tra sở Y tế\",\"id\":\"1146\",\"type\":\"3\"},{\"name\":\"Ban quản lý dự án đầu tư các công trình y tế\",\"id\":\"1155\",\"type\":\"3\"},{\"name\":\"Bệnh viện phục hồi chức năng\",\"id\":\"1160\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 906,
            "trangThai": "2",
            "tenTrangThai": "Đã xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Để người dân tin tưởng vào y tế tuyến huyện",
            "sumary": "",
            "contents": "Giống như nhiều địa phương trong cả nước, các cơ sở y tế tuyến huyện, nhất là địa bàn vùng sâu, vùng xa của tỉnh, hiện rất khó tuyển dụng hoặc thu hút bác sĩ chất lượng cao. Để tháo gỡ khó khăn này, ngành Y tế Quảng Ninh đã có nhiều giải pháp nhằm nâng cao chất lượng nguồn nhân lực, giúp người dân yên tâm, tin tưởng đến khám chữa bệnh ở tuyến huyện.\nTình trạng khó tuyển bác sĩ và thu hút bác sĩ chất lượng cao về tuyến huyện cũng diễn ra tương tự ở các huyện Cô Tô, Vân Đồn, Đầm Hà, Hải Hà... Mặc dù ngành Y tế tỉnh và các đơn vị đã có nhiều cơ chế ưu đãi để tuyển và thu hút bác sĩ chất lượng cao, nhưng rất ít người muốn về làm việc. Lãnh đạo các TTYT ở đây lý giải, nguyên nhân chính là do thu nhập thấp và ít có cơ hội phát triển chuyên khoa; đặc biệt là vị trí địa lý, điều kiện kinh tế - xã hội ở các địa phương này còn khó khăn, nên ít bác sĩ muốn gắn bó lâu dài.\nNhững người được lựa chọn luân chuyển về cơ sở đều là các bác sĩ có trình độ chuyên môn giỏi, chuyên khoa sâu, y đức tốt. Họ không chỉ làm nhiệm vụ quản lý, điều hành, mà còn trực tiếp tham gia khám, chữa bệnh, chuyển giao các kỹ thuật từ đơn giản đến phức tạp cho các bác sĩ theo các chuyên ngành hỗ trợ. Như vậy những kỹ thuật chuyên sâu của tuyến tỉnh, thậm chí tuyến Trung ương sẽ được triển khai tại cơ sở. Những cán bộ được bổ nhiệm, luân chuyển cũng tích cực tham gia vào công tác quản lý, xây dựng các quy trình chuyên môn kỹ thuật nhằm nâng cao chất lượng khám, chữa bệnh ở cơ sở.\n\n \n\nVới việc thực hiện đồng bộ các giải pháp, hy vọng thời gian tới, người dân ở vùng sâu, vùng xa của tỉnh sẽ dễ dàng, công bằng khi tiếp cận dịch vụ chăm sóc sức khỏe có chất lượng ngay tại địa phương, góp phần đảm bảo an sinh xã hội.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:50:15.887+0000",
            "publishTime": "2019-05-05T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Thanh tra sở Y tế\",\"id\":\"1146\",\"type\":\"3\"},{\"name\":\"Trung tâm Kiểm soát bệnh tật\",\"id\":\"1149\",\"type\":\"3\"},{\"name\":\"Trung tâm Kiểm nghiệm\",\"id\":\"1150\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 905,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Ấn Độ hỗ trợ lắp chân giả miễn phí cho người khuyết tật tại Quảng Ninh",
            "sumary": "",
            "contents": "Ngày 5/4/2019, Đoàn công tác của Đại sứ quán Ấn Độ đã có buổi làm việc tại Quảng Ninh để chuẩn bị cho sự kiện khai mạc dự án lắp chân giả Jaipur Foot và chuyển giao, tiếp nhận chân giả cho người khuyết tật trên địa bàn tỉnh. Đồng chí Nguyễn Tiến Hưng – Phó Giám đốc Sở Y tế chủ trì buổi làm việc với đoàn.\n\n \n\nCùng tiếp và trao đổi tại buổi làm việc còn có lãnh đạo các Sở: Ngoại vụ; Lao động, thương binh và xã hội; Kế hoạch đầu tư và Bệnh viện Phục hồi chức năng Quảng Ninh.\nThông tin tại buổi làm việc, Đại sứ Ấn Độ Rajiv Bodwade cho biết: Trong năm 2018, Dự án lắp chân giả Jaipur Foot được tổ chức thành công ở 02 tỉnh Vĩnh Phúc và Phú Thọ đã giúp cho hơn 500 người khuyết tật được lắp chân giả miễn phí. Năm 2019, dự án tiếp tục được triển khai ở Quảng Ninh và Yên Bái. Tại Quảng Ninh, các chuyên gia của tổ chức Bhagwan Mahaveer Viklang Sahayara Samiti (BMVSS) sẽ phối hợp với Công ty cổ phần sản xuất vật liệu Hữu Nghị và Bệnh viện phục hồi chức năng lắp đặt chân giả cho khoảng 250 người khuyết tật trên địa bàn. Sau khi lô hàng hỗ trợ cập cảng Hải Phòng sẽ được chuyển giao toàn bộ cho Bệnh viện Phục hồi chức năng Quảng Ninh. Phía Ấn Độ sẽ cử khoảng 10 bác sĩ, kỹ thuật viên sang hỗ trợ cho chương trình. Đối với Bệnh viện phục hồi chức năng Quảng Ninh, ngoài việc hỗ trợ về cơ sở vật chất, cử đội ngũ cán bộ, y, bác sĩ hỗ trợ trong thời gian diễn ra lắp đặt, Bệnh viện sẽ chịu trách nhiệm theo dõi, kiểm tra định kỳ cho những người khuyết tật được lắp đặt chân giả thuộc dự án. \n\n \n\nCũng tại buổi làm việc, hai bên đã trao đổi để làm rõ những nội dung liên quan và thống nhất các kế hoạch triển khai chương trình như: thời gian đoàn chuyên gia Ấn Độ sang tiền trạm; tổng hợp số lượng người khuyết tật cần lắp chân giả; địa điểm lắp chân giả; hội trường tổ chức sự kiện; số lượng phòng và các thiết bị cần thiết cho chương trình,…\n\n \n\nPhát biểu tại buổi làm việc, đồng chí Nguyễn Tiến Hưng, Phó Giám đốc Sở Y tế Quảng Ninh đã gửi lời cảm ơn tới Đại sứ quán và Bộ ngoại giao Ấn Độ; đồng thời, đồng chí khẳng định Sở Y tế sẽ cùng với các sở/ngành tích cực chuẩn bị theo kế hoạch và phối hợp với các chuyên gia của Ấn Độ để chương trình nhân đạo được diễn ra thành công tốt đẹp.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:47:36.210+0000",
            "publishTime": "2019-04-09T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Phòng Nghiệp vụ Dược\",\"id\":\"1144\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 904,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Ngành Y tế Quảng Ninh triển khai nhiệm vụ quý II năm 2019",
            "sumary": "",
            "contents": "Chiều ngày 8/4/2019, tại thành phố Hạ Long, Sở Y tế Quảng Ninh tổ chức Hội nghị trực tuyến “Sơ kết công tác quý I, triển khai nhiệm vụ Quý II năm 2019”. Đồng chí Nguyễn Trọng Diện, giám đốc Sở Y tế chủ trì hội nghị.\n\n \n\nTham dự hội nghị còn có các đồng chí trong Ban Giám đốc; Lãnh đạo và chuyên viên các Phòng, Ban chức năng Sở Y tế; đại diện BHXH tỉnh; Thường trực Công đoàn ngành; Phòng Y tế các huyện, thị xã, thành phố và đại diện các đơn vị trực thuộc dự họp tại 20 điểm cầu trong tỉnh.\nTrong 3 tháng đầu năm 2019, ngành Y tế đã chủ động triển khai công tác phòng, chống dịch bệnh. Trên địa bàn tỉnh không có dịch bệnh lớn xảy ra, không ghi nhận trường hợp bệnh biến chứng nặng hoặc tử vong do dịch bệnh. Công tác tiêm chủng mở rộng được thực hiện theo đúng kế hoạch, đảm bảo an toàn. Công tác an toàn vệ sinh thực phẩm được giám sát chặt chẽ, đặc biệt là trong các dịp Lễ hội, Tết Nguyên Đán, không để xảy ra vụ ngộ độc thực phẩm đông người và các bệnh truyền qua thực phẩm. Các chương trình mục tiêu về y tế, dân số được triển khai thực hiện có hiệu quả. Hoạt động khám, chữa bệnh được duy trì thực hiện tốt ở tất cả các tuyến. Quý I/2019, toàn ngành đã tổ chức khám cho 495.752 lượt bệnh nhân, bằng 109,19% cùng kỳ năm 2018; điều trị nội trú cho 71.288 lượt bệnh nhân, bằng 101,32% cùng kỳ năm 2018; công suất sử dụng giường bệnh bình quân đạt trên 90%. \nThời gian tới, ngành Y tế sẽ thành lập đội cấp cứu ngoại viện trong toàn tỉnh, vì vậy yêu cầu các đơn vị đẩy mạnh truyền thông trên hệ thống website. Bên cạnh đó, các đơn vị cũng cần tập trung phát triển y tế chuyên sâu, mũi nhọn; tăng cường công tác đào tạo, hợp tác quốc tế, phát triển đội ngũ nhân lực chất lượng cao; thường xuyên luân chuẩn cán bộ để phục vụ nhiệm vụ của ngành và hỗ trợ phát triển y tế tuyến cơ sở; hoàn thành xây dựng đề án hợp nhất Trung tâm Y tế thành phố Cẩm Phả với Bệnh viện đa khoa Cẩm Phả để thành lập Trung tâm Y tế đa chức năng; rà soát lại toàn bộ các vấn đề về tự chủ tài chính, phòng khám đa khoa khu vực trên địa bàn, những khó khăn, vướng mắc tại các cơ sở điều trị Methadone; đẩy mạnh ứng dụng CNTT, cải cách thủ tục hành chính và tăng cường công tác truyền thông, đặc biệt là ở tuyến huyện,…",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:46:24.607+0000",
            "publishTime": "2019-05-06T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Thanh tra sở Y tế\",\"id\":\"1146\",\"type\":\"3\"},{\"name\":\"Trung tâm Kiểm nghiệm\",\"id\":\"1150\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 902,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Nâng tầm các sản phẩm OCOP từ dược liệu",
            "sumary": "",
            "contents": "Theo khảo sát thực tế, sản xuất các sản phẩm OCOP về dược liệu ở các đơn vị trên địa bàn tỉnh phần lớn đã đảm bảo quy trình khép kín. Doanh nghiệp đã chủ động về vùng nguyên liệu và có chiến lược phát triển vùng nguyên liệu đảm bảo nguồn cung cho sản xuất. Tiêu biểu như: HTX Dược liệu xanh Đông Triều (Tràng Lương, Đông Triều) trồng ba kích, trà hoa vàng, kim ngân, hà thủ ô, địa hoàng, đinh lăng, diện tích gần 3ha; HTX Nông dược xanh Tinh Hoa (Quảng La, Hoành Bồ) cũng xin dự án khoảng 25ha trong đó phần lớn là trồng các loại cây dược liệu đặc trưng địa phương như: Trinh nữ hoàng cung, nhân trần, kim ngân hoa... Công ty TNHH Nuôi trồng, Sản xuất và Chế biến dược liệu Đông Bắc (TP Cẩm Phả) là đơn vị đầu tiên đưa về và trồng thành công cây giảo cổ lam ở Quảng Ninh cùng nhiều loại dược liệu khác tạo vùng nguyên liệu ở Tiên Yên, Bình Liêu...\nTheo thống kê sơ bộ cho tới nay, trong khoảng gần 200 doanh nghiệp, HTX, cơ sở, hộ sản xuất tham gia sản xuất các sản phẩm OCOP thì có hơn 10 tổ chức, đơn vị sản xuất sản phẩm OCOP về dược liệu. Các đơn vị này sản xuất khoảng 30 đầu sản phẩm OCOP về dược liệu. Nhiều sản phẩm tinh chế trong số này được đánh giá cao, xếp hạng từ 3-4 sao. Với hướng đi này, các đơn vị sản xuất sản phẩm OCOP về dược liệu chiếm được thị trường khá tốt trong tỉnh, có sức cạnh tranh rộng toàn quốc.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:45:06.297+0000",
            "publishTime": "2019-04-20T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Phòng nghiệp vụ Y\",\"id\":\"1143\",\"type\":\"3\"},{\"name\":\"Thanh tra sở Y tế\",\"id\":\"1146\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 901,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Y tế Quảng Ninh: Đẩy mạnh hợp tác quốc tế",
            "sumary": "",
            "contents": "Để nâng cao chất lượng khám, chữa bệnh cho người dân, ngành Y tế Quảng Ninh đã tích cực đẩy mạnh hợp tác với các quốc gia trên thế giới để học tập, chuyển giao kỹ thuật, đào tạo nhân lực cho ngành.\nLà bệnh viện đa khoa tuyến cuối của tỉnh, Bệnh viện Đa khoa tỉnh không ngừng phát huy tiềm năng, thế mạnh trong hội nhập hợp tác quốc tế. Trao đổi với chúng tôi, thạc sĩ, bác sĩ Trịnh Văn Mạnh, Giám đốc Bệnh viện Đa khoa tỉnh, cho biết: Để đội ngũ nhân lực có chuyên môn nhằm triển khai những kỹ thuật cao, chuyên sâu, hằng năm Bệnh viện chủ động gửi hàng chục cán bộ, bác sĩ đi đào tạo ở Pháp, Đức, Singapore, Philippines... với nhiều chuyên khoa khác nhau. Đồng thời đón nhiều đoàn quốc tế đến trao đổi chuyên môn; mời chuyên gia nước ngoài về giảng dạy chuyển giao kỹ thuật. Nhờ đó, cán bộ, bác sĩ Bệnh viện có điều kiện, cơ hội nghiên cứu, áp dụng kỹ thuật mới, góp phần nâng cao năng lực khám, chữa bệnh.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T06:43:52.933+0000",
            "publishTime": "2019-04-22T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"},{\"name\":\"Phòng Tổ chức cán bộ\",\"id\":\"1141\",\"type\":\"3\"},{\"name\":\"Ban quản lý dự án đầu tư các công trình y tế\",\"id\":\"1155\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 900,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "title": "Quảng Ninh nỗ lực giảm mất cân bằng giới tính khi sinh",
            "sumary": "",
            "contents": "Những năm gần đây, ở nước ta đã và đang diễn ra tình trạng mất cân bằng giới tính khi sinh. Mặc dù công tác dân số kế hoạch hóa gia đình (DS-KHHGĐ) từ Trung ương đến địa phương đã triển khai nhiều biện pháp nhằm ngăn chặn, hạn chế tình trạng trên nhưng tỷ lệ trẻ em vẫn cao hơn trẻ em gái. Thực tế này đòi hỏi các cấp, ngành cần có những biện pháp cụ thể, thiết thực nhằm nâng cao công tác tuyên truyền để đảm bảo cân bằng giới tính trong tương lai.\nTại cấp huyện, 14/14 địa phương đã xây dựng, triển khai, thực hiện chương trình phối hợp về thúc đẩy thực hiện bình đẳng giới nhằm kiểm soát mất cân bằng giới tính khi sinh giai đoạn 2015-2020; tổ chức 30 lớp tập huấn cho 1.350 người về nội dung kỹ năng truyền thông, cập nhật tin tức mới nhất về kiểm soát mất cân bằng giới tính khi sinh; tổ chức 110 buổi nói chuyện chuyên đề nội dung thông tin mới về bình đẳng giới, nhằm kiểm soát mất cân bằng giới tính khi sinh trong giai đoạn hiện nay cho 4.950 người; tổ chức 53 lớp tập huấn cho 2.385 cán bộ cơ sở về nguyên nhân, thực trạng mất cân bằng giới tính khi sinh.\n\n \n\nĐể làm tốt hơn nữa công tác tuyên truyền, nâng cao nhận thức cho người dân về giảm thiểu mất cân bằng giới tính khi sinh, theo đồng chí Hoàng Văn Hy, Chi cục trưởng Chi cục DS-KHHGĐ tỉnh, thời gian tới đơn vị tiếp tục xây dựng kế hoạch hướng dẫn và tổ chức triển khai chiến dịch truyền thông giảm thiểu mất cân bằng giới tính khi sinh; chỉ đạo cơ sở lồng ghép truyền thông hưởng ứng Ngày quốc tế trẻ em gái 11/10. Cùng với đó là phối hợp trong công tác tuyên truyền, phổ biến kiến thức, chính sách, pháp luật về bình đẳng giới; tổ chức chiến dịch truyền thông cao điểm về giới và giới tính khi sinh; duy trì hoạt động của 186 câu lạc bộ về giảm thiểu mất cân bằng giới tính khi sinh; phối hợp với các cơ quan thông tin đại chúng, ban, ngành, đoàn thể tổ chức các hoạt động truyền thông góp phần giảm thiểu mất cân bằng giới tính khi sinh.",
            "imgLink": "15",
            "videoLink": "",
            "createTime": "2019-04-18T05:04:37.703+0000",
            "publishTime": "2019-04-02T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở y tế\",\"id\":\"1058\",\"type\":\"2\"},{\"name\":\"Lãnh đạo Sở Y tế\",\"id\":\"1139\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 894,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 76,
            "publishUserID": 0,
            "orgID": 10,
            "title": "HỘI NGHỊ TẬP HUẤN TỰ ĐÁNH GIÁ, ĐÁNH GIÁ NGOÀI TRƯỜNG MẦM NON VÀ CƠ SỞ GIÁO DỤC PHỔ THÔNG NĂM 2019",
            "sumary": "",
            "contents": "Từ ngày 21 đến 23/3/2019 tại thành phố Hạ Long, Sở Giáo dục và Đào tạo (GDĐT) Quảng Ninh phối hợp với Cục quản lý chất lượng, Bộ GDĐT tổ chức Hội nghị tập huấn công tác tự đánh giá và đánh giá ngoài trường Mầm non và cơ sở giáo dục phổ thông.\nNội dung tập huấn theo các Thông tư số 17/2018/TT-BGDĐT ngày 22/8/2019 của Bộ trưởng Bộ GDĐT ban hành quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn Quốc gia đối với trường tiểu học; Thông tư số 18/2018/TT-BGDĐT ngày 22/8/2019 của Bộ trưởng Bộ GDĐT ban hành quy định về kiểm định chất lượng giáo dục (KĐCLGD) và công nhận đạt Chuẩn quốc gia (CQG) đối với trường trung học cơ sở và trung học phổ thông và trường phổ thông có nhiều cấp học; Thông tư số 19/2018/TT-BGDĐT ngày 22/8/2019 của Bộ trưởng Bộ GDĐT ban hành quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn Quốc gia đối với trường mầm non. Tham dự tập huấn có 250 đại biểu đại diện các cơ quan quản lý giáo dục, các trường Mầm non, các cơ sở giáo dục Phổ thông và các Sở - Ngành có liên quan trên địa bàn tỉnh. Tới dự và chỉ đạo Hội nghị có đồng chí Vũ Liên Oanh - Tỉnh ủy viên, Giám đốc Sở GDĐT; đồng chí Nguyễn Văn Tuế - Phó Giám đốc Sở cùng các đồng chí lãnh đạo, chuyên viên Cục Quản lý chất lượng - Bộ GDĐT. ",
            "imgLink": "20",
            "videoLink": "",
            "createTime": "2019-04-18T03:49:17.660+0000",
            "publishTime": "2019-04-20T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"},{\"name\":\"Lãnh đạo sở Giáo dục\",\"id\":\"1115\",\"type\":\"3\"},{\"name\":\"Văn phòng Sở Giáo dục\",\"id\":\"1116\",\"type\":\"3\"},{\"name\":\"Thanh tra Sở Giáo dục\",\"id\":\"1138\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 845,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Chủ tịch UBND tỉnh Nguyễn Đức Long: Dự toán chi thường xuyên đến 30/6 không phân khai giải ngân sẽ điều chuyển",
            "sumary": "",
            "contents": "Ngày 12/4, Chủ tịch UBND tỉnh Nguyễn Đức Long đã chủ trì cuộc họp về tăng cường điều hành ngân sách Nhà nước (NSNN), giao ban công tác xây dựng cơ bản (XDCB) và quản lý đô thị quý I, triển khai nhiệm vụ quý II.\\nTheo báo cáo của BCĐ tăng cường điều hành NSNN tỉnh, tổng thu NSNN trên địa bàn thực hiện quý I đạt 12.234 tỷ đồng, bằng 29% dự toán, tăng 20% cùng kỳ năm 2018. Đối với số thu NSNN do cấp huyện thực hiện quý I đạt khoảng 2.000 tỷ đồng, bằng 22% dự toán năm, tăng 22% cùng kỳ. Về chi ngân sách địa phương thực hiện quý I đạt 4.698 tỷ đồng, bằng 19% dự toán, tăng 40% cùng kỳ.\\n\\nTổng kế hoạch chi đầu tư phát triển năm 2019 đến nay là 13.733 tỷ đồng, tăng 1.195 tỷ đồng so với cùng kỳ năm 2018, đưa tỷ trọng chi đầu tư phát triển chiếm 50% tổng chi ngân sách địa phương giao đầu năm. Theo đó, khối lượng thực hiện và số vốn đã giải ngân đều cao hơn so với cùng kỳ. Sau khi bố trí kế hoạch vốn năm 2019, đến nay nợ đọng xây dựng cơ bản toàn tỉnh đã giảm đáng kể, còn lại là 386 tỷ đồng.\\nTại cuộc họp, các ngành, địa phương đã báo cáo làm rõ về những thuận lợi, khó khăn và đề xuất một số giải pháp trong thực hiện nhiệm vụ điều hành ngân sách, giải ngân vốn XDCB quý II, như: Đẩy nhanh tiến độ các công trình, dự án; rà soát, xử lý các dự án chậm tiến độ; quản lý chặt chẽ các nguồn thu, đối tượng thu, tránh thất thu ngân sách; khai thác các nguồn thu mới; tập trung hỗ trợ doanh nghiệp vừa và nhỏ;\\n\\nPhát biểu kết luận cuộc họp, Chủ tịch UBND tỉnh Nguyễn Đức Long đánh giá cao nỗ lực của các sở, ban ngành địa phương cùng cộng đồng doanh nghiệp, nhà đầu tư và người dân trong thực hiện nhiệm vụ thu ngân sách quý I/2019.",
            "imgLink": "2",
            "videoLink": "",
            "createTime": "2019-04-17T02:41:20.627+0000",
            "publishTime": "2019-04-25T17:00:00.000+0000",
            "status": "1",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Tài chính\",\"id\":\"11\",\"type\":\"2\"},{\"name\":\"Sở Công thương\",\"id\":\"1046\",\"type\":\"3\"},{\"name\":\"Cục thuế\",\"id\":\"1080\",\"type\":\"3\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 653,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Thực hiện chương trình, chính sách liên quan đến phân luồng sau giáo dục Trung học cơ sở tại vùng đồng bào DTTS giai đoạn 2010 - 2018 ",
            "sumary": "",
            "contents": "Giao  Sở Giáo dục và đào tạo làm đầu mối chủ trì, phối hợp với các đơn vị liên quan triển khai thực hiện chính sách này.",
            "imgLink": "20",
            "videoLink": "",
            "createTime": "2019-04-14T19:01:05.830+0000",
            "publishTime": "2019-04-29T18:36:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"3\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 289,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Xây dựng kế hoạch thực hiện Hiệp định Đối tác toàn diện và tiến bộ xuyên TBD (CPTTP)",
            "sumary": "",
            "contents": "Giao Sở Công thương chủ trì, phối hợp với các sở ngành địa phương liên quan xây dựng và tham mưu cho UBND Tỉnh kế hoạch triển khai thực hiện Hiệp định đối tác toàn diện và tiến bộ xuyên Thái bìn dương (CPTTP), tổng hợp báo cáo UBND Tỉnh trước ngày 15/4/2019.",
            "imgLink": "8",
            "videoLink": "",
            "createTime": "2019-04-14T18:58:03.523+0000",
            "publishTime": "2019-04-14T18:36:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Công thương\",\"id\":\"1046\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 288,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Nâng cao hiệu quả hoạt động của hệ thống thiết chế văn hóa cơ sở",
            "sumary": "",
            "contents": "Giao Sở Văn hóa và thể thao chủ trì, kiểm tra đôn đốc, giám sát việc thực hiện hệ thống thiết chế văn hóa tại các địa phương, kịp thời tham mưu đề xuất, báo cáo UBND Tỉnh chỉ đạo các nội dung theo thẩm quyền, đảm bảo kết quả.",
            "imgLink": "5",
            "videoLink": "",
            "createTime": "2019-04-14T18:51:52.180+0000",
            "publishTime": "2019-04-29T18:36:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Văn hóa và thể thao\",\"id\":\"12\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 287,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Đẩy mạnh thanh toán tiền điện bằng phương thức thanh toán điện tử",
            "sumary": "",
            "contents": "Đề nghị Công ty Điện lực Quảng Ninh, phối hợp với UBND các Huyện, Thị xã, Thành Phố trong Tỉnh đẩy mạnh triển khai việc thanh toán tiền điện bằng phương thức thanh toán điện tử. Giao Sở Công thương làm đầu mối theo dõi đánh giá, báo cáo kết quả về UBND Tỉnh việc triển khai thực hiện.",
            "imgLink": "8",
            "videoLink": "",
            "createTime": "2019-04-14T18:44:59.513+0000",
            "publishTime": "2019-04-19T18:36:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Tài chính\",\"id\":\"11\",\"type\":\"3\"},{\"name\":\"Sở Khoa học và Công nghệ\",\"id\":\"1038\",\"type\":\"3\"},{\"name\":\"Sở Công thương\",\"id\":\"1046\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 286,
            "trangThai": "0",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 3,
            "cateTypeID": 0,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "title": "Tăng cường công tác quản lý dự án xây dựng nghĩa trang Đồng Khuôn",
            "sumary": "",
            "contents": "Phó Chủ tịch Cao Tường Huy yêu cầu các sở ban ngành liên quan, UBND Huyện Hoành Bồ, TCT Đông Bắc, CTCP Tập đoàn Hạ Long thực hiện nghiêm túc các nội dung đã chỉ đạo của UBND Tỉnh về việc khắc phục tồn tại quá trình thực hiện dự án xây dựng nghĩa trang Đồng Khuôn, tại xã Quang La, Huyện Hoành Bồ. Giao Sở TNMT kiểm tra, đánh giá kết quả việc thực hiện các nội dung đã nêu, đề xuất kiểm điểm, xử lý các tập thể, cá nhân không thực hiện hoặc chậm tiến độ.",
            "imgLink": null,
            "videoLink": "",
            "createTime": "2019-04-14T18:29:42.270+0000",
            "publishTime": "2019-04-19T18:21:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "fileIds": null,
            "publishTimeStr": null,
            "missionType": null,
            "pageSize": null,
            "pageId": null,
            "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Tài nguyên và Môi trường\",\"id\":\"1055\",\"type\":\"2\"}]",
            "lstReferUserId": null,
            "lstReferOrgId": null,
            "id": 284,
            "trangThai": "1",
            "tenTrangThai": "Đang xử lý"
        }
    ]
},
  'nhiem_vu/giao/by_nguoi_xu_ly/0': {
    "cateID": 3,
    "cateTypeID": 0,
    "userID": 76,
    "publishUserID": 0,
    "orgID": 10,
    "title": "Đồng chí Giám đốc Sở Giáo dục và Đào tạo Quảng Ninh đến thăm, tặng Giấy khen và trao học bổng cho học sinh Nguyễn Thành Đạt vượt khó vươn lên, đạt thành tích xuất sắc trong học tập và rèn luyện.",
    "sumary": "nguyenduclong",
    "contents": "Sáng ngày 12/3/2019, đồng chí Vũ Liên Oanh, Tỉnh Ủy viên, Giám đốc Sở Giáo dục và Đào tạo (GDĐT) trực tiếp đến trường thăm, tặng Giấy khen và trao học bổng động viên học sinh Nguyễn Thành Đạt. Tham gia Đoàn có đồng chí Hoàng Hồng, Phó Chủ tịch Hội Khuyến học Tỉnh cùng lãnh đạo Phòng Chính trị tư tưởng, Phòng GDĐT huyện Hoành Bồ.\nSau khi nghe đồng chí Hiệu trưởng trường TH&THCS Đồng Sơn báo cáo sơ bộ tình hình nhà trường nói chung, kết quả học tập, rèn luyện của học sinh Nguyễn Thành Đạt nói riêng, đồng chí Giám đốc Sở đã trực tiếp trao đổi, trò chuyện cùng cô giáo Năm - mẹ đẻ của học sinh Nguyễn Thành Đạt để tìm hiểu về hành trình vượt khó của hai mẹ con trong việc giúp con được tiếp cận và học tập tốt môn học ngoại ngữ trong điều kiện gia đình còn nhiều khó khăn như hiện nay.\n\nPhát biểu tại Lễ trao thưởng, trước sự chứng kiến của lãnh đạo địa phương xã Đồng Sơn, lãnh đạo ngành GDĐT huyện và tập thể cán bộ, giáo viên, học sinh khối tiểu học của trường TH&THCS Đồng Sơn, đồng chí Giám đốc Sở đã ghi nhận, biểu dương những cố gắng nỗ lực của học sinh Nguyễn Thành Đạt, mặc dù còn nhỏ tuổi nhưng em đã quyết tâm vượt khó vươn lên, đạt thành tích trong học tập và rèn luyện. Em Nguyễn Thành Đạt hai năm liền là lớp trưởng, là học sinh xuất sắc của trường, được thầy cô và các bạn yêu mến. Em Đạt rất yêu thích và ham học tiếng Anh ở bất cứ thời gian, thời điểm nào trong ngày, điều đó chính là động lực để mẹ em cố gắng cuối mỗi tuần vượt hàng trăm cây số đường rừng, đường đèo dốc quanh co, không quản nắng mưa để đưa em ra thành phố học tiếng Anh.\n\nĐến thăm gia đình học sinh, đồng chí Giám đốc Sở và đoàn công tác vô cùng xúc động vì mặc dù căn nhà ván gỗ ghép, nền đất mấp mô, đồ đạc sơ sài nhưng mọi thứ được sắp đặt khá gọn gàng, sạch sẽ. Trên bàn học của em Đạt là quyển sách Tiếng Anh, đồng chí Giám đốc đã nghe em Đạt đọc và dịch khá nhanh, chuẩn những câu hội thoại trong sách.\nĐồng chí Giám đốc Sở GDĐT khen ngợi, động viên học sinh Nguyễn Thành Đạt cần cố gắng hơn, kiên trì và quyết tâm hơn nữa trong học tập để trở thành “người công dân toàn cầu” khi đã giỏi tiếng Anh; đồng chí cũng đề nghị Phòng GDĐT Hoành Bồ, lãnh đạo trường TH&THCS Đồng Sơn tích cực tham mưu lãnh đạo địa phương tiếp tục quan tâm tới hoàn cảnh gia đình em Đạt nhằm tạo điều kiện thuận lợi để em có cơ hội được học tập, được phát triển năng khiếu ngoại ngữ một cách tốt hơn. Về phía ngành giáo dục, ngoài suất học bổng của Sở dành cho em Đạt trị giá 5 triệu đồng, Trung tâm ngoại ngữ APAX nơi em đang theo học sẽ có cơ chế hỗ trợ giảm học phí để em có thêm nhiều cơ hội được học tập, phát triển năng lực nghe, nói tiếng Anh. Đồng chí Giám đốc Sở mong muốn nhà trường, gia đình cần tiếp tục tuyên truyền cho em Đạt và các học sinh khác ngọn lửa đam mê về học tập ngoại ngữ, nhất là tiếng Anh để nhân rộng tấm gương em Đạt khắp toàn huyện, toàn tỉnh, nhất là trong giai đoạn hiện nay khi Tỉnh Quảng Ninh đang thực hiện nhiều giải pháp để nâng cao việc học tập ngoại ngữ trong thanh thiếu nhi.\n\nCuối buổi làm việc, Đoàn công tác ghé thăm trường mầm non Sơn Dương, đồng chí Giám đốc Sở GDĐT đánh giá cao sự cần cù, chịu khó, tâm huyết của đội ngũ giáo viên nhà trường trong việc sử dụng, bảo vệ tài sản công của nhà nước cũng như thiết bị học và chơi của trẻ được ngành trang cấp từ các chương trình dự án phát triển giáo dục, ngoài ra các cô rất chú ý trang trí cây xanh, tạo không gian từ các góc hoạt động cho học sinh rất thân thiện, đẹp mắt. Thăm nơi ăn, ngủ của học sinh, đồng chí nhắc nhở nhà trường cần tăng cường chú ý đến công tác phòng chống dịch bệnh, vệ sinh an toàn thực phẩm, phòng chống cháy nổ và đảm bảo an toàn cho học sinh khi tới trường.\n\n",
    "imgLink": "",
    "videoLink": "",
    "createTime": "2019-04-18T10:02:57.120+0000",
    "publishTime": "2019-04-08T17:00:00.000+0000",
    "status": "1",
    "referUserID": "56,57,58,59,60,61,62,65,66,67,74,75,76,169,",
    "referUserName": null,
    "referOrgID": "8,10,1115,",
    "referOrgName": null,
    "fileIds": null,
    "publishTimeStr": null,
    "missionType": null,
    "pageSize": null,
    "pageId": null,
    "referInfo": "[{\"name\":\"UBND Tỉnh Quảng Ninh\",\"id\":\"8\",\"type\":\"1\"},{\"name\":\"Sở Giáo dục và đào tạo\",\"id\":\"10\",\"type\":\"2\"},{\"name\":\"Lãnh đạo sở Giáo dục\",\"id\":\"1115\",\"type\":\"3\"}]",
    "lstReferUserId": [
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "65",
        "66",
        "67",
        "74",
        "75",
        "76",
        "169"
    ],
    "lstReferOrgId": [
        "8",
        "10",
        "1115"
    ],
    "id": 987,
    "trangThai": "0",
    "tenTrangThai": "Chưa xử lý"
},
  'master_ds_linh_vuc_bao_cao': [
    // {
    //   "id": 0,
    //   "ten": "Tất cả",
    //   "iconID": 4
    // },
    {
      "id": 1,
      "ten": "LĨNH VỰC KINH TẾ",
      "iconID": 4
    },
    {
      "id": 2,
      "ten": "LĨNH VỰC GIÁO DỤC",
      "iconID": 3
    },
    {
      "id": 3,
      "ten": "Lĩnh vực giao thông",
      "iconID": 5
    },
    {
      "id": 4,
      "ten": "Lĩnh vực xã hội",
      "iconID": 2
    },
    {
      "id": 5,
      "ten": "Lĩnh vực tài chính",
      "iconID": 5
    },
    {
      "id": 6,
      "ten": "Lĩnh vực kinh tế",
      "iconID": 5
    },
    {
      "id": 7,
      "ten": "Lĩnh vực giáo dục",
      "iconID": 5
    },
    {
      "id": 8,
      "ten": "Lĩnh vực tài chính",
      "iconID": 5
    },
  ],
  'tinKhanCap/getEmergencyDetail':
  {
    "id": 1,
    "tieuDe": "\"I'M POSSIBLE - TÔI CÓ THỂ\" - CHUỖI HOẠT ĐỘNG CHÀO MỪNG KỶ NIỆM 7 NĂM THÀNH LẬP CÔNG TY",
    "trichDan": null,
    "noiDung": "Tháng 4 đến là lúc Rikkeisoft bước sang tuổi thứ 7, và cũng là thời điểm mà chỉ còn 2 tháng nữa, công ty chúng ta sẽ đạt mốc 1000 nhân sự (Mục tiêu hoàn thành 1000 nhân sự được rút ngắn xuống trước T6/2019). Nhân sự kiện CHÀO MỪNG 07 NĂM THÀNH LẬP CÔNG TY và để thực hiện công tác chuẩn bị cho sự “bùng nổ” nhân sự trong tháng 6 tới, Rikkeisoft hân hoan tổ chức chuỗi hoạt động tích hợp mang tên “I’M POSSIBLE - TÔI CÓ THỂ” với mục đích chính là tạo ra sân chơi cho các anh em không ngừng hoàn thiện bản thân về cả mặt thể chất, tư duy và tâm hồn. ",
    "thoiDiemTao": "21/03/2019 00:00:00",
    "thoiHan": null,
    "nguoiGiao": "Đặng Mai",
    "noiXuLy": "Ủy ban nhân dân tỉnh Quảng Ninh",
    "idTrangThai": 1120,
    "trangThai": "Đang xử lý",
    "idLoaiTin": 2130,
    "loaiTin": "Cháy nổ",
    "noiLienQuan": null,
    "fileDinhKems": [
      {
        "id": 4,
        "name": "scv_1553913881126.mp4",
        "uploader": "Đặng Mai",
        "contentType": "video/mp4",
        "uploadedTime": "30/03/2019",
        "link": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/4",
        "posterLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/8"
      },
      {
        "id": 5,
        "name": "qp.png",
        "uploader": "Đặng Mai",
        "contentType": "image/png",
        "uploadedTime": "30/03/2019",
        "link": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/5",
        "posterLink": null
      },
      {
        "id": 6,
        "name": "nn.png",
        "uploader": "Đặng Mai",
        "contentType": "image/png",
        "uploadedTime": "30/03/2019",
        "link": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/6",
        "posterLink": null
      },
      {
        "id": 7,
        "name": "yte.png",
        "uploader": "Đặng Mai",
        "contentType": "image/png",
        "uploadedTime": "30/03/2019",
        "link": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/7",
        "posterLink": null
      }
    ],
    "tienTrinhs": {
      "size": 7,
      "tienTrinhs": [
        {
          "id": 33,
          "noiDung": "Chỉ đơn vị 4 Tiếp tục thực hiện QD 007 của TTCP ngày 26-03",
          "thoiDiemGui": "30/03/2019 17:15:30",
          "laViecGap": false,
          "thoiHan": "25/04/2019 00:00:00",
          "nguoiGuiId": 2,
          "nguoiGui": "Đặng Mai",
          "noiNhan": "Sở Văn hóa - Xã hội",
          "laGiaoNhiemVu": true,
          "avtNguoiGuiLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/y-kien/avt-nguoi-gui/download/1/2",
          "fileDinhKems": [
            {
              "id": 1,
              "name": "cai dat jhipster.txt",
              "uploader": "Administrator Administrator",
              "contentType": "text/plain",
              "uploadedTime": "23/03/2019",
              "link": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/y-kien/download/1"
            }
          ]
        },
        {
          "id": 35,
          "noiDung": "Chỉ đơn vị 3 Tiếp tục thực hiện QD 007 của TTCP ngày 26-03",
          "thoiDiemGui": "30/03/2019 17:15:30",
          "laViecGap": false,
          "thoiHan": "27/04/2019 00:00:00",
          "nguoiGuiId": 2,
          "nguoiGui": "Đặng Mai",
          "noiNhan": "Sở y tế",
          "laGiaoNhiemVu": true,
          "avtNguoiGuiLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/y-kien/avt-nguoi-gui/download/1/2",
          "fileDinhKems": []
        },
        {
          "id": 83,
          "noiDung": "Nội Dung",
          "thoiDiemGui": null,
          "laViecGap": false,
          "thoiHan": "20/03/2019 00:00:00",
          "nguoiGuiId": 2,
          "nguoiGui": "Đặng Mai",
          "noiNhan": "Sở Văn hóa - Xã hội",
          "laGiaoNhiemVu": true,
          "avtNguoiGuiLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/y-kien/avt-nguoi-gui/download/1/2",
          "fileDinhKems": []
        }
      ]
    }
  },
  'ds_khancap_tientrinh':
    [
      { avatar: require('../../../assets/images/l2-khan-cap/l2-chi-tiet/avatar/avatar1.png'), chucvi: 'GĐ sở Giáo Dục', ngaygio: '15:01,21/03/2019', noidung: 'UBND tỉnh Quảng Ninh vừa ra công điện “hỏa tốc” chỉ đạo, tập trung nguồn lực khống chế dịch tả lợn châu Phi', bophanthuchien: 'Bộ phận thực hiện: Sở Giao thông, Sở hành chính, Sở  Y tế, Sở Giáo dục, Sở Giao thông và 5 bộ phận khác', tailieu: 'kế hoạch phát triển kinh tế-xã hội năm 2019', khancap: true },
      { avatar: require('../../../assets/images/l2-khan-cap/l2-chi-tiet/avatar/avatar2.png'), chucvi: 'Phòng Tài Chính', ngaygio: '09:01, 20/03/2019', noidung: 'Đối với Chủ tịch UBND các huyện thị khác, tỉnh yêu cầu cần khẩn trương triển khai thực hiện tình huống 2 (tình huống có dịch bệnh) theo kế hoạch của UBND tỉnh để ngăn chặn và ứng phó khẩn cấp đối với khả năng bệnh dịch tả lợn ', bophanthuchien: 'Bộ phận thực hiện: Phòng Tài Chính, Phòng Nội vụ, Phòng ABC và 5 bộ phận khác', tailieu: 'kế hoạch phát triển kinh tế-xã hội năm 2019', khancap: true },
      { avatar: require('../../../assets/images/l2-khan-cap/l2-chi-tiet/avatar/avatar2.png'), chucvi: 'Nguyễn An, Phòng Tài Chính', ngaygio: '12:01, 18/03/2019', noidung: 'UBND tỉnh Quảng Ninh vừa ra công điện “hỏa tốc” chỉ đạo, tập trung nguồn lực khống chế dịch tả lợn châu Phi', bophanthuchien: 'Báo cáo tới: Phòng Tài Chính, Phòng Nội vụ, Phòng ABC và 5 bộ phận khác', tailieu: 'kế hoạch phát triển kinh tế-xã hội năm 2019', khancap: false },
    ],

  'van_ban/den/nguoi_xu_ly': {
    "posterLink": "",
    "size": 8,
    "newsEntity": [
        {
            "cateID": 5,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "sumary": "Nguyễn Trọng Diện",
            "contents": "Thông báo lịch trực các ngày nghỉ Giỗ Tổ Hùng Vương năm 2019",
            "imgLink": "0",
            "videoLink": "Tài liệu khác,2272;Số 838/TB-SYT,0",
            "createTime": "2019-04-18T07:53:25.607+0000",
            "publishTime": "2019-04-10T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Sở y tế,1;UBND Tỉnh Quảng Ninh,2;Trung tâm Kiểm soát bệnh tật,2;Trung tâm Kiểm nghiệm,2;Trung tâm Kiểm dịch Y tế quốc tế,2;Trung tâm Pháp y,2;Văn phòng UBND Tỉnh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/0",
            "id": 931,
            "idLinhVuc": 0,
            "tieuDe": "Thông báo lịch trực các ngày nghỉ Giỗ Tổ Hùng Vương năm 2019",
            "trangThai": "0",
            "tenLinhVuc": null,
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "sumary": "Nguyễn Mạnh Tuấn",
            "contents": "Về việc đình chỉ lưu hành, thu hồi mỹ phẩm không đạt chất lượng",
            "imgLink": "0",
            "videoLink": "Tài liệu khác,2272;Số 851/SYT-NVD,0",
            "createTime": "2019-04-18T07:44:30.270+0000",
            "publishTime": "2019-04-11T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Sở y tế,1;UBND Tỉnh Quảng Ninh,2;Trung tâm Kiểm soát bệnh tật,2;Trung tâm Kiểm nghiệm,2;Văn phòng UBND Tỉnh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/0",
            "id": 924,
            "idLinhVuc": 0,
            "tieuDe": "Về việc đình chỉ lưu hành, thu hồi mỹ phẩm không đạt chất lượng",
            "trangThai": "0",
            "tenLinhVuc": null,
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 79,
            "publishUserID": 0,
            "orgID": 1058,
            "sumary": "Nguyễn Mạnh Tuấn",
            "contents": "Về việc đình chỉ lưu hành, thu hồi mỹ phẩm vi phạm",
            "imgLink": "0",
            "videoLink": "Tài liệu khác,2272;Số 850/SYT-NVD,0",
            "createTime": "2019-04-18T07:42:47.803+0000",
            "publishTime": "2019-04-11T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Sở y tế,1;UBND Tỉnh Quảng Ninh,2;Trung tâm Kiểm soát bệnh tật,2;Trung tâm Kiểm nghiệm,2;Văn phòng UBND Tỉnh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/0",
            "id": 923,
            "idLinhVuc": 0,
            "tieuDe": "Về việc đình chỉ lưu hành, thu hồi mỹ phẩm vi phạm",
            "trangThai": "0",
            "tenLinhVuc": null,
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "Chánh văn phòng Nguyễn Hồng Quang",
            "contents": "Công văn về việc tăng cường chống buôn lậu, gian lận thương mại xăng dầu.",
            "imgLink": "0",
            "videoLink": "Công văn,2145;03/BCĐ389,0",
            "createTime": "2019-04-17T14:49:12.023+0000",
            "publishTime": "2019-04-15T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Thị xã Quảng Yên,1;UBND Tỉnh Quảng Ninh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/6",
            "id": 800,
            "idLinhVuc": 6,
            "tieuDe": "Công văn về việc tăng cường chống buôn lậu, gian lận thương mại xăng dầu.",
            "trangThai": "0",
            "tenLinhVuc": "Thương mại - Dịch vụ",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "Chánh văn phòng Nguyễn Hồng Quang",
            "contents": "Về việc chủ trương đầu tư xây dựng công trình: Đường bê tông, rãnh thoát nước tổ 14, khu 3, phường Trưng Vương, thành phố Uông Bí",
            "imgLink": "0",
            "videoLink": "Văn bản hành chính,2271;176/TB-UBND,0",
            "createTime": "2019-04-17T14:46:26.610+0000",
            "publishTime": "2019-04-09T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Thành phố Uông Bí,1;UBND Tỉnh Quảng Ninh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/17",
            "id": 799,
            "idLinhVuc": 17,
            "tieuDe": "Về việc chủ trương đầu tư xây dựng công trình: Đường bê tông, rãnh thoát nước tổ 14, khu 3, phường Trưng Vương, thành phố Uông Bí",
            "trangThai": "0",
            "tenLinhVuc": "Giao thông vận tải",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "Phó Giám đốc Sở GTVT Bùi Hồng Minh",
            "contents": "Chấn chỉnh hoạt động vận tải khách cố định bằng xe ô tô",
            "imgLink": "0",
            "videoLink": "Quy chế/Quy định,2269;1638/SGTVT-QLVT&PT,0",
            "createTime": "2019-04-17T14:43:34.213+0000",
            "publishTime": "2019-04-15T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Sở Giao thông vận tải,1;UBND Tỉnh Quảng Ninh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/17",
            "id": 798,
            "idLinhVuc": 17,
            "tieuDe": "Chấn chỉnh hoạt động vận tải khách cố định bằng xe ô tô",
            "trangThai": "0",
            "tenLinhVuc": "Giao thông vận tải",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "Phó Giám đốc Sở GD-ĐT Nguyễn Thị Thúy",
            "contents": "Kết quả thực hiện Kế hoạch chấm dứt hoạt động của các cơ sở sản xuất vôi thủ công trên địa bàn Thành phố",
            "imgLink": "0",
            "videoLink": "Báo cáo,2270;183/TB-UBND,0",
            "createTime": "2019-04-17T14:40:57.010+0000",
            "publishTime": "2019-04-11T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Thành phố Uông Bí,1;UBND Tỉnh Quảng Ninh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/2",
            "id": 797,
            "idLinhVuc": 2,
            "tieuDe": "Kết quả thực hiện Kế hoạch chấm dứt hoạt động của các cơ sở sản xuất vôi thủ công trên địa bàn Thành phố",
            "trangThai": "0",
            "tenLinhVuc": "Văn hóa - Xã hội",
            "tenTrangThai": "Chưa xử lý"
        },
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "Chủ tịch tỉnh Quảng Ninh",
            "contents": "Có rất nhiều điều khoản",
            "imgLink": "0",
            "videoLink": "Luật,2143;123/QN,0",
            "createTime": "2019-04-17T01:28:03.067+0000",
            "publishTime": "2019-04-29T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "Chính phủ,1;UBND Tỉnh Quảng Ninh,2;Sở Giao thông vận tải,3;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/0",
            "id": 633,
            "idLinhVuc": 0,
            "tieuDe": "Quy định về luật chống tham nhũng",
            "trangThai": "0",
            "tenLinhVuc": null,
            "tenTrangThai": "Chưa xử lý"
        }
    ]
},
  'van_ban/di/nguoi_xu_ly': {
    "posterLink": "",
    "size": 1,
    "newsEntity": [
        {
            "cateID": 5,
            "userID": 62,
            "publishUserID": 0,
            "orgID": 8,
            "sumary": "",
            "contents": "Thành phố Uông Bí có 11 đơn vị hành chính, có 17 trường mần non, 20 trường tiểu học, 12 trường THCS, 4 trường THPT, 1 trung tâm hướng nghiệp và giáo dục thường xuyên, 6 trường cao đẳng, trung học chuyên nghiệp và dạy nghề, 2 trường Đại học, 5 đơn vị quân đội đóng trên địa bàn, hơn 200 cơ quan, doanh nghiệp, nhà máy.\nThành phố Uông Bí hiện có khoảng 38582 thanh niên trong độ tuổi. chiếm 33% dân số. Tỷ lệ tập hợp thanh niên vào tổ chức Đoàn đạt 100%. Phát huy các giá trị tuyền thống tốt đẹp của tuổi trẻ Việt Nam, thanh niên sống có lý tuowngrm niềm tin vào sự lãnh đạo của Đảng, không ngừng học tập, rèn luyện, nâng cao trình độ học vấn, chuyên môn, nghiệp vụ, sẵn sàng  đảm nhận những việc mới, việc khó, biết chia sẽ, chung sức cùng cộng đồng xã hội. Qua thực tiễn xuất hiện ngày càng nhiều gương điển hình tiên tiến trên các lĩnh vực, được cấp ủy, chính quyền các cấp và nhân dân ghi nhận, đánh giá cao",
            "imgLink": "0",
            "videoLink": "Báo cáo,2270;78/BC-UBND,0",
            "createTime": "2019-04-17T02:17:26.530+0000",
            "publishTime": "2019-04-16T17:00:00.000+0000",
            "status": "0",
            "referUserID": null,
            "referUserName": null,
            "referOrgID": null,
            "referOrgName": null,
            "referInfo": "UBND Tỉnh Quảng Ninh,1;Văn phòng UBND Tỉnh,2;",
            "linkIcon": "http://13.250.56.249:8080/file-manager/file/icon/download_by_cateTypeID/0",
            "id": 647,
            "idLinhVuc": 0,
            "tieuDe": "Tình hình thực hiện Luật Thanh niên",
            "trangThai": "0",
            "tenLinhVuc": null,
            "tenTrangThai": "Chưa xử lý"
        }
    ]
},
  'van_ban/den/by_nguoi_xu_ly': {
    "cateID": 5,
    "userID": 79,
    "publishUserID": 0,
    "orgID": 1058,
    "sumary": "Nguyễn Trọng Diện",
    "contents": "Thông báo lịch trực các ngày nghỉ Giỗ Tổ Hùng Vương năm 2019",
    "imgLink": "0",
    "videoLink": "Tài liệu khác,2272;Số 838/TB-SYT,0",
    "createTime": "2019-04-18T07:53:25.607+0000",
    "publishTime": "2019-04-10T17:00:00.000+0000",
    "status": "0",
    "referUserID": "56,57,58,59,60,61,62,77,78,79,112,203,204,205,208,239,",
    "referUserName": null,
    "referOrgID": "8,1058,1149,1150,1151,1154,1185,",
    "referOrgName": "UBND Tỉnh Quảng Ninh,2;Sở y tế,1;Trung tâm Kiểm soát bệnh tật,2;Trung tâm Kiểm nghiệm,2;Trung tâm Kiểm dịch Y tế quốc tế,2;Trung tâm Pháp y,2;Văn phòng UBND Tỉnh,2;",
    "startTime": "2019-04-10T17:00:00.000+0000",
    "lstReferUserId": [
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "77",
        "78",
        "79",
        "112",
        "203",
        "204",
        "205",
        "208",
        "239"
    ],
    "lstReferOrgId": [
        "8",
        "1058",
        "1149",
        "1150",
        "1151",
        "1154",
        "1185"
    ],
    "id": 931,
    "idLinhVuc": 0,
    "tieuDe": "Thông báo lịch trực các ngày nghỉ Giỗ Tổ Hùng Vương năm 2019",
    "trangThai": "0",
    "tenLinhVuc": null,
    "tenTrangThai": "Chưa xử lý"
},
  'van_ban/di/by_nguoi_xu_ly': {
    "cateID": 5,
    "userID": 62,
    "publishUserID": 0,
    "orgID": 8,
    "sumary": "",
    "contents": "Thành phố Uông Bí có 11 đơn vị hành chính, có 17 trường mần non, 20 trường tiểu học, 12 trường THCS, 4 trường THPT, 1 trung tâm hướng nghiệp và giáo dục thường xuyên, 6 trường cao đẳng, trung học chuyên nghiệp và dạy nghề, 2 trường Đại học, 5 đơn vị quân đội đóng trên địa bàn, hơn 200 cơ quan, doanh nghiệp, nhà máy.\nThành phố Uông Bí hiện có khoảng 38582 thanh niên trong độ tuổi. chiếm 33% dân số. Tỷ lệ tập hợp thanh niên vào tổ chức Đoàn đạt 100%. Phát huy các giá trị tuyền thống tốt đẹp của tuổi trẻ Việt Nam, thanh niên sống có lý tuowngrm niềm tin vào sự lãnh đạo của Đảng, không ngừng học tập, rèn luyện, nâng cao trình độ học vấn, chuyên môn, nghiệp vụ, sẵn sàng  đảm nhận những việc mới, việc khó, biết chia sẽ, chung sức cùng cộng đồng xã hội. Qua thực tiễn xuất hiện ngày càng nhiều gương điển hình tiên tiến trên các lĩnh vực, được cấp ủy, chính quyền các cấp và nhân dân ghi nhận, đánh giá cao",
    "imgLink": "0",
    "videoLink": "Báo cáo,2270;78/BC-UBND,0",
    "createTime": "2019-04-17T02:17:26.530+0000",
    "publishTime": "2019-04-16T17:00:00.000+0000",
    "status": "0",
    "referUserID": "56,57,58,59,60,61,62,239,",
    "referUserName": null,
    "referOrgID": "8,1185,",
    "referOrgName": "UBND Tỉnh Quảng Ninh,1;Văn phòng UBND Tỉnh,2;",
    "startTime": "2019-04-16T17:00:00.000+0000",
    "lstReferUserId": [
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "239"
    ],
    "lstReferOrgId": [
        "8",
        "1185"
    ],
    "id": 647,
    "idLinhVuc": 0,
    "tieuDe": "Tình hình thực hiện Luật Thanh niên",
    "trangThai": "0",
    "tenLinhVuc": null,
    "tenTrangThai": "Chưa xử lý"
},
  'api/chi_tieu/chi_tieu_theo_linh_vuc': [
    {
      id: '1',
      name: 'Kinh tế',
      data: [
        {
          icon_link: require("../../../images/logo/mt_home.png"),
          ten_chi_tieu: "Tốc độ tăng trưởng kinh tế (theo GRDP)",
          muc_tieu: "7,5 - 8%",
          tiendo: 45,
          color: "#5dde24",
          type: "kinhte"
        },
        {
          icon_link: require("../../../images/logo/mt_2.png"),
          ten_chi_tieu: "GRDP bình quân đầu người",
          muc_tieu: "47-49 triệu đồng",
          tiendo: 20,
          color: "#da3838",
          type: "kinhte"
        },
        {
          icon_link: require("../../../images/logo/mt_3.png"),
          ten_chi_tieu: "Tổng vốn đầu tư phát triển toàn xã hội",
          muc_tieu: "18.000-20.000 tỷ đồng",
          tiendo: 90,
          color: "#ffc835",
          type: "kinhte"
        },
        {
          icon_link: require("../../../images/logo/mt_4.png"),
          ten_chi_tieu: "Tổng thu ngân sách trên địa bàn",
          muc_tieu: "2.900 tỷ đồng",
          tiendo: 90,
          color: "#ffc835",
          type: "kinhte"
        },
        {
          icon_link: require("../../../images/logo/mt_5.png"),
          ten_chi_tieu: "Tổng chi ngân sách địa phương",
          muc_tieu: "7.906 tỷ đồng",
          tiendo: 20,
          color: "#da3838",
          type: "kinhte"
        },
      ]
    },
    {
      id: '1',
      name: 'Xã hội',
      data: [
        {
          icon_link: require("../../../images/logo/mt_6.png"),
          ten_chi_tieu: "Sản lượng lương thực có hạt",
          muc_tieu: "26 vạn tấn",
          tiendo: 45,
          color: "#5dde24",
          type: "xahoi"
        },
        {
          icon_link: require("../../../images/logo/mt_7.png"),
          ten_chi_tieu: "Diện tích trồng mới và tái canh cây công",
          muc_tieu: "550 ha",
          tiendo: 50,
          color: "#3d5e8f",
          type: "xahoi"
        }
      ]
    },
  ],
  'api/chi_tieu/chi_tieu_chi_tiet/2/tien_trinh_thuc_hien': [
    [
      {
          "ma": 49,
          "noiDung": "Gi?m thi?u b?nh thành tích trong h?c t?p",
          "thoiGianTao": "01/04/2019 12:00",
          "tenChiTieu": "Giảm tỉ lệ bệnh thành tích",
          "boPhanThucHien": [],
          "avatar": null
      },
      {
          "ma": 50,
          "noiDung": "Gi?m thi?u b?nh thành tích trong h?c t?p",
          "thoiGianTao": "01/04/2019 12:00",
          "tenChiTieu": "Giảm tỉ lệ bệnh thành tích",
          "boPhanThucHien": [],
          "avatar": "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"
      },
      {
          "ma": 47,
          "noiDung": "Gi?m thi?u b?nh thành tích trong h?c t?p",
          "thoiGianTao": "01/04/2019 12:00",
          "tenChiTieu": "Giảm tỉ lệ bệnh thành tích",
          "boPhanThucHien": [],
          "avatar": null
      },
      {
          "ma": 51,
          "noiDung": "Gi?m thi?u b?nh thành tích trong h?c t?p",
          "thoiGianTao": "01/04/2019 12:00",
          "tenChiTieu": "Giảm tỉ lệ bệnh thành tích",
          "boPhanThucHien": [],
          "avatar": null
      }
  ]
  ],
  'api/chi_tieu/chi_tiet_chi_tieu': {
    noiDung: "Tốc độ tăng trưởng kinh tế (theo GRDP) từ 7,5-8,0%, trong đó: nông-lâm-ngư nghiệp từ 4,0-4,5%; công nghiệp-xây dựng từ 10,5%-11,0%; dịch vụ từ 7,5-8,0%.",
    ketQuaHienTai: "30%",
    dienGiai: "Diễn giải: Tốc độ tăng trưởng GRDP đến tháng 6 đã hoàn thành được 50% chỉ tiêu so với kế hoạch đề ra. Dự kiến đến tháng 12 sẽ hoàn thành vượt mức kế hoạch 20%.",
    don_vi: "Sở giáo dục, Sở Y tế, Sở nông nghiệp",
    "vanBan": [
      {
        "ma": "1",
        "loaiVanBan": "PDF",
        "tenVanBan": "Tài liệu tóm tắt chương trình Kỳ họp 6",
        "nhaPhatHanh": "Bên phát hành: Sở Kế hoạch đầu tư",
        "thoiGianPhatHanh": "16/09/2018",
        "linkTai": "",
      },
      {
        "ma": "1",
        "loaiVanBan": "PDF",
        "tenVanBan": "Tài liệu tóm tắt chương trình Kỳ họp 6",
        "nhaPhatHanh": "Bên phát hành: Sở Kế hoạch đầu tư",
        "thoiGianPhatHanh": "16/09/2018",
        "linkTai": "",
      },
      {
        "ma": "1",
        "loaiVanBan": "PDF",
        "tenVanBan": "Tài liệu tóm tắt chương trình Kỳ họp 6",
        "nhaPhatHanh": "Bên phát hành: Sở Kế hoạch đầu tư",
        "thoiGianPhatHanh": "16/09/2018",
        "linkTai": "",
      }
    ]
  },

  'ds_khan_cap': [
    { id: 1, gotoScreen: 'KhanCapChiTiet', icon: require('../../../assets/images/l2-khan-cap/ic_thientai.png'), colorBackGr: 'white', ratio: 0.5, textRatio: '5%', colorRatio: 'red', title: 'Công điện chỉ đạo ứng phó bão số 3', type: 'Thiên tai', state: 'Cần xử lý ngay', colorState: '#ce1e17' },
    { id: 2, gotoScreen: 'KhanCapChiTiet', icon: require('../../../assets/images/l2-khan-cap/ic_hinhsu.png'), colorBackGr: 'white', ratio: 0.5, textRatio: '5%', colorRatio: 'red', title: 'Bắt khẩn cấp đối tượng truy nã dặc biệt', type: 'Hình sự', state: 'Đang xử lý', colorState: '#3d5e8f' },
    { id: 3, gotoScreen: 'KhanCapChiTiet', icon: require('../../../assets/images/l2-khan-cap/ic_suco.png'), colorBackGr: '#f6f6f6', ratio: 4, textRatio: '40%', colorRatio: 'yellow', title: 'Di dời 90 hộ dân trước nguy cơ vỡ đập', type: 'Sự cố', state: 'Cần xử lý ngay', colorState: '#888888' },
    { id: 4, gotoScreen: 'KhanCapChiTiet', icon: require('../../../assets/images/l2-khan-cap/ic_suco.png'), colorBackGr: '#f6f6f6', ratio: 4, textRatio: '40%', colorRatio: 'yellow', title: 'Di dời 90 hộ dân trước nguy cơ vỡ đập', type: 'Sự cố', state: 'Cần xử lý ngay', colorState: '#888888' },
  ],

  'ds_nhiem_vu': [
    {
      id_type: 1,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 0,
      color_state: 1,
      isRead: false,
      type: 1,
      text_title:
        "Triển khai công tác tiêm chủng mở rộng toàn quốc năm 2019",
      text_address: "Sở y tế",
      text_state: "Mới cập nhật"
    },
    {
      id_type: 1,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 1,
      color_state: 2,
      isRead: false,
      type: 2,
      text_title:
        "Huỷ kết quả đối với thí sinh gian lận điểm thi trong các trường công an",
      text_address: "Sở Giáo Dục",
      text_state: "Đang xử lý"
    },
    {
      id_type: 2,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 2,
      color_state: 3,
      isRead: false,
      type: 3,
      text_title:
        "Áp dụng kĩ thuật mới trong nông nghiệp vào giống lúa mới nhập",
      text_address: "Sở Giáo Dục",
      text_state: "Quá hạn"
    },
    {
      id_type: 2,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 3,
      color_state: 2,
      isRead: false,
      type: 4,
      text_title:
        "Xây thêm 3 trường trung học cơ sở tại địa bàn huyện Cẩm Phả",
      text_address: "Sở Giáo Dục",
      text_state: "Đang xử lý"
    },
    {
      id_type: 1,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 4,
      color_state: 0,
      isRead: true,
      type: 5,
      text_title: "Xây dựng kế hoạch phòng ngừa dịch bệnh cúm A lan tràn",
      text_address: "Sở y tế",
      text_state: "Đã hoàn thành"
    },
    {
      id_type: 2,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 4,
      color_state: 0,
      isRead: true,
      type: 6,
      text_title: "Khai hoang mảnh đất rộng 2000 ha để trồng cây màu",
      text_address: "Sở Nông Nghiệp",
      text_state: "Đã hoàn thành"
    }
  ],

  'lichcongtac': [
    {
      address: "Trụ sở ủy ban nhân dân huyện",
      title: "Gặp giám đốc sở giáo dục và đào tạo",
      startDate: "02:20 2019/01/04",
      id: 4
    },
    {
      address: "Phòng họp báo trực tuyến",
      title: "Dự hội nghị trực tuyến",
      startDate: "02:20 2019/01/02",
      id: 5
    },
    {
      address: "Trụ sở ủy ban nhân dân huyện",
      title: "Gặp giám đốc sở giáo dục và đào tạo",
      startDate: "02:21 2019/01/01",
      id: 8
    },
    {
      address: "Phòng họp báo trực tuyến",
      title: "Gặp giám đốc sở giáo dục và đào tạo",
      startDate: "15:55 2019/03/27",
      id: 9
    },
    {
      address: "Trụ sở ủy ban nhân dân huyện",
      title: "Gặp giám đốc sở giáo dục và đào tạo",
      startDate: "18:25 2019/03/29",
      id: 10
    }
  ],
  'lichcongtac/0': {
    title: 'Gặp giám đốc sở giáo dục và đào tạo',
    startDate: '02:20 2019/01/04',
    endDate: '12:00 2019/01/02',
    leader: 'Chỉ trì',
    content: 'Họp bàn về giáo dục mầm non tại địa bàn thành phố Hạ Long',
    address: 'Trụ sở ủy ban nhân dân tỉnh',
    driver: 'seft',
    number_car: '211435w',
    lienquan: 'Đinh Văn Long - Phó giám đốc sở',
    attachment: [
      {
        id: 1,
        name: 'Qui định giáo dục mầm non',
        author: '..',
        kind: 'pdf',
        date: '02:20 2019/01/04',
        link: 'ada'
      },
      {
        id: 2,
        name: 'thông tư 2323',
        author: '..',
        kind: 'docx',
        date: '02:20 2019/01/04',
        link: null
      }
    ],
    id: 4
  },
  'linhvucquanly': [
    {
      id: 1,
      screen: 'QuyetDinhPhanCong',
      text: "PHÂN CÔNG NHIỆM VỤ",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/quyetdinhphancong.png"),
      background: '#3a5c8e',
    },
    {
      id: 2,
      screen: 'DonViDangPhuTrach',
      text: "ĐƠN VỊ ĐANG PHỤ TRÁCH",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/cacdonvidangphutrach.png"),
      background: '#8147da',
    },
    // {
    //   id: 3,
    //   screen: 'LinhVucDangPhuTrach',
    //   text: "LĨNH VỰC ĐANG PHỤ TRÁCH",
    //   isRead: false,
    //   image: require("../../../assets/images/l2-linh-vuc-quan-ly/linhvucdangphutrach.png"),
    //   background: '#bf322e',
    // },
    {
      id: 4,
      screen: 'SuKienQuantrong',
      text: "SỰ KIỆN QUAN TRỌNG",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/sukienquantrong.png"),
      background: '#4eb69b',
    },
    {
      id: 5,
      screen: 'DuAnQuantrong',
      text: "DỰ ÁN TRỌNG ĐIỂM",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/duantrongdiem.png"),
      background: '#e17626',
    },
    {
      id: 6,
      screen: 'CongViecChamTienDo',
      text: "CÔNG VIỆC CHẬM TIẾN ĐỘ",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/congviecchamtiendo.png"),
      background: '#3a5c8e',
    },
    {
      id: 7,
      screen: '',
      text: "ĐÁNH GIÁ NHÂN SỰ",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/danhgianhansu.png"),
      background: '#8147da',
    },
    {
      id: 8,
      screen: '',
      text: "CÀ PHÊ DOANH NGHIỆP",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/cafedoanhnghiep.png"),
      background: '#8147da',
    },
    {
      id: 9,
      screen: '',
      text: "HOẠT ĐỘNG HỘI ĐỒNG NHÂN DÂN",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/hoatdonghoidongnhandan.png"),
      background: '#8147da',
    },
    {
      id: 10,
      screen: '',
      text: "HOẠT ĐỘNG ĐẠI BIỂU QUỐC HỘI",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/hoatdongdaibieuquochoi.png"),
      background: '#8147da',
    },
    {
      id: 11,
      screen: '',
      text: "CÔNG TÁC ĐẢNG",
      isRead: false,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/congtacdang.png"),
      background: '#8147da',
    },
  ],
  'linh_vuc_quan_ly/qdpcnv': [
    {
      id: 1,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/danghuyhau.png"),
      hoTen: 'ĐẶNG HUY HẬU',
      chucVu: 'Ủy viên BTV Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh'
    },
    {
      id: 2,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/nguyenvanthanh.png"),
      hoTen: 'NGUYỄN VĂN THÀNH',
      chucVu: 'Ủy viên BTV Tỉnh ủy, Phó Chủ tịch UBND tỉnh'
    },
    {
      id: 3,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/vuthithuthuy.png"),
      hoTen: 'VŨ THỊ THU THỦY',
      chucVu: 'Ủy viên BCH Đảng bộ tỉnh, Phó Chủ tịch UBND tỉnh'
    },
    {
      id: 4,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/lequangtung.png"),
      hoTen: 'LÊ QUANG TÙNG',
      chucVu: 'Ủy viên dự khuyết BCH Trung ương Đảng, Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch UBND tỉnh'
    },
    {
      id: 5,
      image: require("../../../assets/images/l2-linh-vuc-quan-ly/vuvandien.png"),
      hoTen: 'VŨ VĂN DIỆN',
      chucVu: 'Ủy viên BCH Đảng bộ tỉnh, Phó Chủ tịch UBND tỉnh'
    },
  ],
  'linh_vuc_quan_ly/don_vi_phu_trach': [
    {
      id: 1,
      donVi: 'Sở Tài chính',
    },
    {
      id: 2,
      donVi: 'Sở Du lịch',
    },
    {
      id: 3,
      donVi: 'Sở Giáo dục và đào tạo',
    },
    {
      id: 4,
      donVi: 'Sở Giao thông vận tải',
    },
    {
      id: 5,
      donVi: 'Sở Kế hoạch và đầu tư',
    },
    {
      id: 6,
      donVi: 'Sở Khoa học và Công nghệ',
    },
    {
      id: 7,
      donVi: 'Sở Lao động - Thương binh và xã hội	Sở Nội vụ',
    },
    {
      id: 8,
      donVi: 'Sở Nông nghiệp và PTNT	Sở Ngoại vụ',
    },
    {
      id: 9,
      donVi: 'Sở Tư pháp	Sở Thông tin và Truyền thông',
    },
  ],
  // 'linhvucdangphutrach': [
  //   {
  //     id: 1,
  //     name: 'Lĩnh vực kinh tế',
  //   },
  //   {
  //     id: 2,
  //     name: 'Lĩnh vực giáo dục',
  //   },
  //   {
  //     id: 3,
  //     name: 'Lĩnh vực giao thông',
  //   },
  //   {
  //     id: 4,
  //     name: 'Lĩnh vực xã hội',
  //   },
  //   {
  //     id: 5,
  //     name: 'Lĩnh vực tài chính',
  //   },
  //   {
  //     id: 6,
  //     name: 'Lĩnh vực tài chính',
  //   },
  //   {
  //     id: 7,
  //     name: 'Lĩnh vực giao thông',
  //   },
  //   {
  //     id: 8,
  //     name: 'Lĩnh vực xã hội',
  //   },
  //   {
  //     id: 9,
  //     name: 'Lĩnh vực tài chính',
  //   },
  // ],
  'linh_vuc_quan_ly/su_kien_quan_trong': [
    {
      id: 1,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Triển khai công tác tiêm chủng mở rộng toàn quốc năm 2019',
      so: 'Sở Y tế',
      status: 'Mới cập nhật',
      isRead: true
    },
    {
      id: 2,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Huỷ kết quả đối với thí sinh gian lận điểm thi trong các trường công an',
      so: 'Sở Giáo Dục',
      status: 'Đang xử lý',
      isRead: true
    },
    {
      id: 3,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Áp dụng kĩ thuật mới trong nông nghiệp vào giống lúa mới nhập',
      so: 'Sở Giáo Dục',
      status: 'Quá hạn',
      isRead: true
    },
    {
      id: 4,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Xây thêm 3 trường trung học cơ sở tại địa bàn huyện Cẩm Phả',
      so: 'Sở Giáo Dục',
      status: 'Đang xử lý',
      isRead: true
    },
    {
      id: 5,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Xây dựng kế hoạch phòng ngừa dịch bệnh cúm A lan tràn',
      so: 'Sở Y Tế',
      status: 'Đã hoàn thành',
      isRead: false
    },
    {
      id: 6,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png'),
      tieuDe: 'Khai hoang mảnh đất rộng 2000 ha để trồng cây màu',
      so: 'Sở Nông Nghiệp',
      status: 'Đã hoàn thành',
      isRead: false
    },
  ], 'canhan/getLstNhatKy': [
    {
      id: 17,
      userId: 17,
      noiDung: 'Buổi trưa tiếp đoàn khách chuyên nghiệp về Hàn Quốc',
      thoiGianTao: '2019-03-28T03:21:37.460+0000',
      thoiGianThongBao: '2019-03-26T13:30:00.000+0000',
      thoiGianThongBaoText: null,
      loaiThongBao: 1,
      status: 0,
      isNoTiFy: 1,
      thoiGianBaoText: '26/03/2019 20:30'
    },
    {
      id: 16,
      userId: 17,
      noiDung: 'Buổi trưa tiếp đoàn khách chuyên nghiệp về Hàn Quốc',
      thoiGianTao: '2019-03-28T03:21:16.023+0000',
      thoiGianThongBao: '2019-03-26T13:30:00.000+0000',
      thoiGianThongBaoText: null,
      loaiThongBao: 1,
      status: 1,
      isNoTiFy: 1,
      thoiGianBaoText: '26/03/2019 20:30'
    },
    {
      id: 15,
      userId: 17,
      noiDung: 'Buổi trưa tiếp đoàn khách chuyên nghiệp về Hàn Quốc',
      thoiGianTao: '2019-03-28T03:21:13.460+0000',
      thoiGianThongBao: '2019-03-26T13:30:00.000+0000',
      thoiGianThongBaoText: null,
      loaiThongBao: 1,
      status: 0,
      isNoTiFy: 0,
      thoiGianBaoText: '26/03/2019 20:30'
    }
  ],
  'linh_vuc_quan_ly/du_an_trong_diem': [
    {
      id: 1,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Dự án Long Thành',
      referInfo: 'Bộ giao thông vận tải',
      status: 'Mới cập nhật',
      isRead: true
    },
    {
      id: 2,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Các Dự án Thủy điện',
      referInfo: 'Bộ Công Thương',
      status: 'Đang xử lý',
      isRead: true
    },
    {
      id: 3,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Dự án xây dựng tuyến đường sắt đô thị số 1 Tp.HCM, tuyến Bến Thành - Suối Tiên',
      referInfo: 'Bộ giao thông vận tải',
      status: 'Quá hạn',
      isRead: true
    },
    {
      id: 4,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Dự án đầu tư xây dựng tuyến tàu điện ngầm số 2 Tp.HCM, tuyến Bến Thành - Tham Lương',
      referInfo: 'Bộ giao thông vận tải',
      status: 'Đang xử lý',
      isRead: true
    },
    {
      id: 5,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Dự án đầu tư xây dựng Cảng cửa ngõ quốc tế Hải Phòng',
      referInfo: 'Bộ giao thông vận tải',
      status: 'Đã hoàn thành',
      isRead: false
    },
    {
      id: 6,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png'),
      tieuDe: 'Dự án đường sắt đô thị Hà Nội, tuyến Cát Linh - Hà Đông',
      referInfo: 'Bộ giao thông vận tải',
      status: 'Đã hoàn thành',
      isRead: false
    },
  ],
  'linh_vuc_quan_ly/cv_cham_tiem_do': [
    {
      id: 1,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Dự án Tòa nhà Trung tâm điều hành sản xuất than tại Quảng Ninh',
      boPhanThucHien: 'Bộ giao thông vận tải',
      status: 'Quá hạn',
      isRead: true
    },
    {
      id: 2,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Đường sắt đô thị Hà Nội tuyến 1 giai đoạn 1 và giai đoạn 2A',
      boPhanThucHien: 'Bộ giao thông vận tải',
      status: 'Sắp hết hạn',
      isRead: true
    },
    {
      id: 3,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Nhà máy nhiệt điện tua bin khí Ô Môn IV',
      boPhanThucHien: 'Bộ Công Thương',
      status: 'Sắp hết hạn',
      isRead: true
    },
    {
      id: 4,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Trung tâm vũ trụ Việt Nam',
      boPhanThucHien: 'Bộ Khoa học và Công nghệ',
      status: 'Quá hạn',
      isRead: true
    },
    {
      id: 5,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Xây dựng Nhà máy X52 Quân chủng Hải quân',
      boPhanThucHien: 'Bộ giao thông vận tải',
      status: 'Sắp hết hạn',
      isRead: true
    },
    {
      id: 6,
      image: require('../../../assets/images/l2-linh-vuc-quan-ly/cvctd.png'),
      tieuDe: 'Dự án kết nối khu vực trung tâm đồng bằng sông Mê Kông',
      boPhanThucHien: 'Bộ Xây dựng',
      status: 'Quá hạn',
      isRead: true
    },
  ],
  'lvql_chi_tiet_phan_cong': {
    id: 1,
    avatar: require('../../../assets/images/l2-linh-vuc-quan-ly/danghuyhau.png'),
    ten: "ĐẶNG HUY HẬU",
    thongtin: "Ủy viên BTV Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh",
    sdt: "08.3835020",
    email: "danghuyhau@quangninh.gov.vn",
    chuyenvien: "Thạc sỹ Quản trị kinh doanh, Cử nhân Luật",
    lyluanchinhtri: "Cử nhân",
    viettat: "P1",
    tieude: "Phân công nhiệm vụ của UBND tỉnh",
    noidung: "\n- Trực tiếp phụ trách, chỉ đạo các lĩnh vực công tác: Quản lý đất đai; nông, lâm, thủy sản; kiểm lâm, kiểm ngư; kinh tế biển; chương trình Biển Đông - Hải đảo; chương trình xây dựng nông thôn mới; tổng hợp kết quả thực hiện Đề án 196 về “Nhiệm vụ, giải pháp đưa các xã, thôn ra khỏi diện đặc biệt khó khăn, thoát khỏi Chương trình 135 giai đoạn 2017- 2020”; tài nguyên và môi trường (bao gồm thăm dò, khai thác, vận chuyển, chế biến, tiêu thụ than, cát, đá, sỏi...); phòng chống thiên tai - tìm kiếm cứu nạn; khoa học - công nghệ; kinh tế hợp tác và hợp tác xã; ứng dụng công nghệ thông tin (ICT Index); chỉ số cải cách hành chính (Par Index); chỉ số quản trị hành chính công (PaPi); công tác dân vận chính quyền; quy chế dân chủ cơ sở.\n\n Làm Trưởng các tổ chức phối hợp liên ngành (Ban chỉ đạo, Hội đồng…) của tỉnh theo lĩnh vực công tác được Chủ tịch Ủy ban nhân dân tỉnh phân công trực tiếp phụ trách, chỉ đạo.\n\nĐược Chủ tịch UBND tỉnh ủy quyền chỉ đạo giải quyết công việc cụ thể và các công việc chung của Ủy ban nhân dân tỉnh khi Chủ tịch đi công tác vắng.\n\n- Phụ trách, chỉ đạo địa bàn các địa phương: Cẩm Phả, Đông Triều, Uông Bí.\n\n- Thực hiện các công việc khác do Chủ tịch Ủy ban nhân dân tỉnh phân công\n"
  },
  'lvql_chi_tiet_don_vi':
  {
    idTenSo: "Sở công thương",
    muctieu: "Mục tiêu, nhiệm vụ",
    noidungmuctieu: " \nBáo cáo định kỳ hoặc đột xuất kết quả thực hiện; kiến nghị giải pháp nhằm thực hiện có hiệu quả chương trình, kế hoạch công tác;\n\ne) Kịp thời báo cáo, điều chỉnh chương trình, kế hoạch công tác, đáp ứng yêu cầu quản lý, chỉ đạo, điều hành của Ủy ban nhân dân, Chủ tịch Ủy ban nhân dân tỉnh.\n\nPhục vụ hoạt động của Ủy ban nhân dân tỉnh:\n\na) Chủ trì, phối hợp với các cơ quan liên quan chuẩn bị chương trình, nội dung, phục vụ các cuộc họp của Ủy ban nhân dân tỉnh;\n\nb) Thực hiện chế độ tổng hợp, báo cáo;\n\nc) Theo dõi, đôn đốc, đánh giá kết quả thực hiện Quy chế làm việc của Ủy ban nhân dân tỉnh;\n\nd) Tổ chức công tác tiếp công dân theo quy định của pháp luật.\n\nTham mưu, giúp Chủ tịch Ủy ban nhân dân tỉnh thực hiện các nhiệm vụ, quyền hạn sau:\n\na) Triệu tập, chủ trì các cuộc họp;\n\nb) Theo dõi, đôn đốc, chỉ đạo, kiểm tra công tác đối với các Sở; Hội đồng nhân dân và Ủy ban nhân dân cấp huyện;\n\nc) Thực hiện nhiệm vụ trước Hội đồng nhân dân tỉnh; tiếp xúc, báo cáo, trả lời kiến nghị của cử tri;\n\nd) Chỉ đạo, áp dụng biện pháp cần thiết giải quyết công việc trong trường hợp đột xuất, khẩn cấp;",
    chitieu: "CHỈ TIÊU",
    noidungchitieu: "Tốc độ tăng trưởng kinh tế (theo GRDP) từ 7,5-8,0% , trong đó: nông - lâm - ngư nghiệp từ 4,0-4,5%; công nghiệp - xây dựng từ 10,5-11,0%; dịch vụ từ 7,5-8,0%",
    ketqua: "KẾT QUẢ THỰC HIỆN",
    noidungketqua: "Diễn giải : Tốc độ tăng trưởng GRDP đến tháng 3 đã hoàn thành được 30% chi tiêu so với kế hoạch đề ra. Dự kiến đến tháng 12 sẽ hoàn thành vượt mức kế hoạch 20% ",
    donvi: "Sở giáo dục, Sở Y tế, Sở nông nghiệp",
  },
  'lvql_chi_tiet_du_an': {
    TMĐTBandau: "31.3",
    TMĐTDieuchinh: "31.3",
    Doivon: "0",
    kehoach: {
      batdau: 2014,
      ketthuc: 2020
    },
    thucte: {
      batdau: 2014,
      ketthuc: 2020
    },
    hosoduan: [
      { file: "", title: "Thông tin cảng hàng không dân dụng Long Thành ", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" },
      { file: "", title: "Tiến trình thực hiện ", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" },
      { file: "", title: "Diện tích giải toả", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" }
    ]
  },

  'lvql_chi_tiet_cong_viec': {
    TMĐTBandau: "31.3",
    TMĐTDieuchinh: "31.3",
    Doivon: "0",
    kehoach: {
      batdau: 2014,
      ketthuc: 2020
    },
    thucte: {
      batdau: 2014,
      ketthuc: 2020
    },
    hosoduan: [
      { file: "", title: "Thông tin cảng hàng không dân dụng Long Thành ", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" },
      { file: "", title: "Tiến trình thực hiện ", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" },
      { file: "", title: "Diện tích giải toả", benphathanh: "Sở Kế hoạch đầu tư", time: "16/09/2018" }
    ]
  },
  'nhiem_vu_so_tai_chinh': [
    {
      id: 1,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 0,
      color_state: 1,
      isRead: false,
      type: 1,
      text_title:
          "Triển khai công tác tiêm chủng mở rộng toàn quốc năm 2019",
      text_address: "Sở y tế",
      text_state: "Mới cập nhật"
  },
  {
      id: 2,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 1,
      color_state: 2,
      isRead: false,
      type: 2,
      text_title:
          "Huỷ kết quả đối với thí sinh gian lận điểm thi trong các trường công an",
      text_address: "Sở Giáo Dục",
      text_state: "Đang xử lý"
  },
  {
      id: 3,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 2,
      color_state: 3,
      isRead: false,
      type: 3,
      text_title:
          "Áp dụng kĩ thuật mới trong nông nghiệp vào giống lúa mới nhập",
      text_address: "Sở Giáo Dục",
      text_state: "Quá hạn"
  },
  {
      id: 4,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 3,
      color_state: 2,
      isRead: false,
      type: 4,
      text_title:
          "Xây thêm 3 trường trung học cơ sở tại địa bàn huyện Cẩm Phả",
      text_address: "Sở Giáo Dục",
      text_state: "Đang xử lý"
  },
  {
      id: 5,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 4,
      color_state: 0,
      isRead: true,
      type: 5,
      text_title: "Xây dựng kế hoạch phòng ngừa dịch bệnh cúm A lan tràn",
      text_address: "Sở y tế",
      text_state: "Đã hoàn thành"
  },
  {
      id: 6,
      icon: require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png'),
      hanxuly: 'Hạn xử lý',
      date: '20/08/2018',
      color_icon: 4,
      color_state: 0,
      isRead: true,
      type: 6,
      text_title: "Khai hoang mảnh đất rộng 2000 ha để trồng cây màu",
      text_address: "Sở Nông Nghiệp",
      text_state: "Đã hoàn thành"
  }
],
  'master_ds_so': [
    { id: 2168, catValue: "Sở công thương" },
    { id: 2169, catValue: "Sở giao thông vận tải" },
    { id: 2170, catValue: "Sở giáo dục và đạo tào" },
    { id: 2171, catValue: "Sở kế hoạch và đầu tư" },
    { id: 2172, catValue: "Sở khoa học và công nghệ" },
    { id: 2173, catValue: "Sở lao động thương binh và xã hội" },
    { id: 2174, catValue: "Sở nội vụ" },
    { id: 2175, catValue: "Sở ngoại vụ" },
    { id: 2176, catValue: "Sở tài chính" },
    { id: 2177, catValue: "Sở tư pháp" },
    { id: 2178, catValue: "Sở xây dựng" },
    { id: 2179, catValue: "Sở y tế" },
    { id: 2180, catValue: "Sở nông nghiệp và phát triển nông thôn" },
    { id: 2181, catValue: "Sở quy hoạch kiến trúc" },
    { id: 2182, catValue: " Sở tài nguyên và môi trường" },
    { id: 2183, catValue: "Sở thông tin và tuyền thông" },
    { id: 2184, catValue: "Sở văn hóa thể thao và du lịch" },
  ],
  'muc_tieu_so_tai_chinh': [
    
      {
          "id": 1,
          "name": "Kinh tế",
          "data": [
              {
                  "id": 10,
                  "iconLink": require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/1.png'),
                  "giaTriKeHoach": "7,5 - 8",
                  "noiDung": "Tốc độ tăng trưởng kinh tế (theo GRDP)",
                  "donVi": "%",
                  "tiendo": 0.5
              },
              {
                  "id": 26,
                  "iconLink": require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/2.png'),
                  "giaTriKeHoach": "47-49",
                  "noiDung": "GRDP bình quân đầu người",
                  "donVi": "triệu đồng",
                  "tiendo": 3
              },
              {
                  "id": 31,
                  "iconLink": require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/3.png'),
                  "giaTriKeHoach": "18.000-20.000",
                  "noiDung": "Tổng vốn đầu tư phát triển toàn xã hội",
                  "donVi": "tỷ đồng",
                  "tiendo": 44
              },
              {
                  "id": 35,
                  "iconLink": require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/4.png'),
                  "giaTriKeHoach": "2.900",
                  "noiDung": "Tổng thu ngân sách trên địa bàn",
                  "donVi": "tỷ đồng",
                  "tiendo": 44
            },
              {
                "id": 34,
                "iconLink": require('../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/5.png'),
                "giaTriKeHoach": "7.906",
                "noiDung": "Tổng chi ngân sách địa phương",
                "donVi": "tỷ đồng",
                "tiendo": 44
              }
          ]
      },
  ],

  // 'master_ds_linh_vuc': [
  //   { "id": 1, "ten": "Luật pháp", "iconID": 4 },
  //   { "id": 2, "ten": "Giáo dục", "iconID": 3 },
  //   { "id": 3, "ten": "Quốc phòng", "iconID": 5 },
  //   { "id": 4, "ten": "Ngoại giao", "iconID": 2 },
  // ],
  'danLuan/getAllDanLuan': [
    {
      id: 1,
      tieuDe: "Nền hành chính giấy tờ",
      name: "Phạm Trung Tuyến",
      ngayDuyet: "01/09/2019 12 : 20",
      linhVuc: "Hành chính",
      noiDung: "Nếu đặt mình vào địa vị của Bộ trưởng Giao thông, nhìn thấy tình trạng nhờn luật, lách luật của người điều khiển phương tiện, hàng ngày phải nghe quá nhiều tin tức về tai nạn giao thông, có lẽ sẽ không ít người nghĩ đến các biện pháp cực đoan như thế. Nhưng không có nhiều hơn một người giữ chức Bộ trưởng Giao thông. Là người đứng đầu của ngành, lẽ ra Tiến sĩ Nguyễn Văn Thể phải nghĩ về việc quản lý bằng lái theo cách rộng hơn, sâu hơn, chứ không phải đơn thuần là tạo ra nhiều phiền toái hơn, chỉ để giảm bớt tình trạng lách luật của dân."
    },
    {
      id: 2,
      tieuDe: "Không hối lộ",
      name: "Đặng Quỳnh Giang",
      ngayDuyet: "01/09/2019 12 : 20",
      linhVuc: "Tư pháp",
      noiDung: "Hoạt động tại Việt Nam hơn 20 năm, công ty tôi, một doanh nghiệp Nhật Bản đã chấp nhận không ít phiền toái để giữ được nguyên tắc của mình."
    },
    {
      id: 3,
      tieuDe: "Nề nếp sống hàng xóm",
      name: "Đặng Quỳnh Giang",
      ngayDuyet: "01/09/2019 12 : 20",
      linhVuc: "Văn hóa Xây Dựng",
      noiDung: "Hoạt động tại Việt Nam hơn 20 năm, công ty tôi, một doanh nghiệp Nhật Bản đã chấp nhận không ít phiền toái để giữ được nguyên tắc của mình."
    }
  ],
  'report/news' : [
    {
      tong: 12,
      quahan: 0,
      chuaxuly: 0,
      dangxuly: 6,
      hoanthanh: 6,
      month: 1,
    },
    {
      tong: 12,
      quahan: 0,
      chuaxuly: 2,
      dangxuly: 4,
      hoanthanh: 6,
      month: 2,
    },
    {
      tong: 120,
      quahan: 0,
      chuaxuly: 30,
      dangxuly: 50,
      hoanthanh: 40,
      month: 3,
    },
    {
      tong: 75,
      quahan: 5,
      chuaxuly: 10,
      dangxuly: 25,
      hoanthanh: 35,
      month: 4,
    },
    {
      tong: 6,
      quahan: 0,
      chuaxuly: 0,
      dangxuly: 3,
      hoanthanh: 3,
      month: 5,
    },
  ],
  'connection/1': [
    {
        name: 'Văn phòng Trung ương Đảng',
        address: '1A Hùng Vương, Ba Đình, Hà Nội',
        fax: '080.48924',
        phone: '080.43162',
        email: 'dangcongsan@cpv.org.vn',
        website: 'http://dangcongsan.vn/',
        image: require('../../../images/logo/quochuy.png'),
      },
    {
      name: 'Văn phòng Chủ tịch nước',
      address: 'Số 2 Hùng Vương, Ba Đình, Hà Nội',
      fax: '0437335256',
      phone: '08043176',
      email: 'webmaster@president.gov.vn',
      website: 'president.gov.vn​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Văn phòng Quốc hội',
      address: 'Số 2 Hùng Vương, Ba Đình, Hà Nội',
      fax: '0437335256',
      phone: '08044322',
      email: 'hotro@qh.gov.vn',
      website: 'http://quochoi.vn/vanphongquochoi​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Văn phòng chính phủ',
      address: '16 Lê Hồng Phong - Ba Đình - Hà Nội',
      fax: '080.48924',
      phone: '080.43162',
      email: 'thongtinchinhphu@chinhphu.vn',
      website: 'http://vpcp.chinhphu.vn/​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Bộ Tài Chính',
      address: 'Số 28 Trần Hưng Đạo - Quận Hoàn Kiếm - Hà Nội',
      fax: '024-2220.8091',
      phone: '024-2220.2828',
      email: 'support@mof.gov.vn',
      website: 'http://www.mof.gov.vn/​',
      image: require('../../../images/logo/quochuy.png'),
    },
    
  ],
  'connection/2': [
    {
      name: 'Văn  phòng Tỉnh Ủy Bắc Ninh',
      address: 'Đường Phù Đổng Thiên Vương, Suối Hoa, Bắc Ninh',
      fax: '-',
      phone: '0222 3814 299',
      email: '-',
      website: '-​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Văn phòng HĐND Tỉnh Bắc Ninh',
      address: 'Số 10 Đường Phù Đổng Thiên Vương, phường Suối Hoa, TP Bắc Ninh',
      fax: '-',
      phone: '0222.3.822.502',
      email: '-',
      website: 'http://vphdnd.bacninh.gov.vn/​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Văn phòng UBND Tỉnh Bắc Ninh',
      address: 'Số 10 Phù Đổng Thiên Vương, Suối Hoa, Bắc Ninh',
      fax: '0222.3822492',
      phone: '0222.3898777',
      email: 'banbientap@bacninh.gov.vn',
      website: 'http://bacninh.gov.vn/​',
      image: require('../../../images/logo/quochuy.png'),
    },
    {
      name: 'Ủy ban Mặt trận Tổ quốc Tỉnh Bắc Ninh',
      address: '122 - Ngô Gia Tự - Phường Suối Hoa - TP Bắc Ninh',
      fax: '-',
      phone: '0222.3 870.069',
      email: 'bantinmattranbn@gmail.com',
      website: 'http://mttq.bacninh.gov.vn/​',
      image: require('../../../images/logo/quochuy.png'),
    },
  ]

}

class DummyDataService {
  getDummyData(apiName, id = null) {
    if (id) {
      extApiName = apiName + "/0";
      if (DUMMY_DATA[extApiName]) {
        return DUMMY_DATA[extApiName];
      }
      else {
        return DUMMY_DATA[apiName];
      }
    }
    else {
      return DUMMY_DATA[apiName];
    }

  }

  isForcedDummy(apiName) {
    return (FORCE_DUMMY_APIS.indexOf(apiName) >= 0);
    //return false;
  }
}

export default new DummyDataService();

