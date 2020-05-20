export const
REPORT_CONFIG = [
    {
        linhVucId: "lvGD",
        cacCap: [
            { fieldName: "phongGD", displayedName: "Các phòng giáo dục",},
            { fieldName: "tenTruong", displayedName: "Các trường học"},
            { fieldName: "$CHI_TIEU", displayedName: "Các chỉ tiêu"},
            { fieldName: "kieuBaoCao", displayedName: "Loại báo cáo"},
            { fieldName: "thangBaoCao", displayedName: "Tháng báo cáo"},
        ],
        cacChiTieu: [
            { 
                fieldName: "soPhongHoc", 
                displayedName: "Số phòng học",
                subChiTieu: [
                    {fieldName: "soPhongHocCu", displayedName: "Số phòng học cũ"},
                    {fieldName: "soPhongHocMoi", displayedName: "Số phòng học mới"}
                ],
            },
            { 
                fieldName: "soHocSinh", 
                displayedName: "Số học sinh",
                subChiTieu: [
                    {fieldName: "soHocSinhNam", displayedName: "Số học sinh nam"},
                    {fieldName: "soHocSinhNu", displayedName: "Số học sinh nữ"}
                ],
            },
            { 
                fieldName: "soGiaoVien", 
                displayedName: "Số giáo viên",
                subChiTieu: [],
            },
            { 
                fieldName: "soLopHoc", 
                displayedName: "Số lớp học",
                subChiTieu: [],
            },
        ]


    },
]