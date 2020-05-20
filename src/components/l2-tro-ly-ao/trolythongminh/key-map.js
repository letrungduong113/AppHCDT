const category = [
    {key:0,title:'tất cả',navigate:''},
    {key:1,title:'khẩn cấp',navigate:'KhanCapChiTiet'},
    {key:2,title:'mục tiêu',navigate:''},
    {key:3,title:'nhiệm vụ',navigate:''},
    {key:4,title:'báo cáo',navigate:''},
    {key:5,title:'văn bản đến',navigate:''},
    {key:6,title:'quản lý nội bộ',navigate:''},
    {key:7,title:'dư luận',navigate:''},
    {key:8,title:'hành chính công',navigate:''},
    // {key:9,title:'lịch công tác',navigate:''},
    {key:10,title:'quản lý văn bản',navigate:''},
    {key:13,title:'sự kiện quan trọng',navigate:''},
    {key:14,title:'dự án trọng điểm',navigate:''},
    {key:15,title:'mẫu văn bản',navigate:''},
    {key:16,title:'quy trình',navigate:''},
    {key:17,title:'văn bản pháp quy',navigate:''},
    {key:18,title:'lĩnh vực quản lý',navigate:''},
    {key:19,title:'phân công nhiệm vụ',navigate:''},
    {key:20,title:'văn bản đi',navigate:'VanBanChiTiet'},
]
const subCategory = [
    {key:0,title:'tất cả'},
    {key:1,title:'kinh tế'},
    {key:2,title:'văn hóa'},
    {key:3,title:'giáo dục'},
    {key:4,title:'sản xuất công nghiệp'},
    {key:5,title:'nông lâm nghiệp thủy sản'},
    {key:6,title:'thương mại dịch vụ'},
    {key:7,title:'chính sách pháp luật'},
    {key:15,title:'y tế'},
    {key:16,title:'du lịch'},
    {key:17,title:'giao thông vận tải'},
    {key:18,title:'lao động việc làm'},
    {key:23,title:'thiên tai'},
    {key:24,title:'dịch bệnh'},
    {key:28,title:'khác'},
]
export function searchData(item){
    var data ={};
    const cateData = category.find(o=>o.title == item.category)
    const subData = subCategory.find(o=>o.title == item.sub)
    data={
        category:cateData?cateData:category[0],
        sub:subData?subData:subCategory[0]
    };
    return data;
}
