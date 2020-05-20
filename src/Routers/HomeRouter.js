
import HomeScreenOption2 from "../components/home_option2";
import TinTucChiTietHomeScreen from "../components/home_option2/tin-tuc-chi-tiet";

import TroLyAoScreen from "../components/l2-tro-ly-ao/trolythongminh";
import ThongBaoScreen from "../components/l2-thong-bao";
import TaiKhoanScreen from "../components/l2-tai-khoan";
import CaNhanScreen from "../components/l2-ca-nhan";
import LichVanNienScreen from '../components/l2-ca-nhan/l3-lich-van-nien';
import LichVanNienChiTietScreen from '../components/l2-ca-nhan/l3-lich-van-nien_chi_tiet';
import PhongThuyScreen from '../components/l2-ca-nhan/l3-phong-thuy';
import PhongThuyHangNgayScreen from '../components/l2-ca-nhan/l3-phong-thuy/l3-pt-hang-ngay';
import DichThuatScreen from '../components/l2-ca-nhan/l3-dich-thuat';

import Login2 from "../components/login2";
import Splash from "../components/splash";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

/* L2 Khẩn cấp */
import DsKhanCapScreen from "../components/l2-khan-cap/danh-sach-khan-cap";
import ChiTietKhanCapScreen from "../components/l2-khan-cap/chi-tiet-khan-cap";
import CusVideoScreen from "../components/l2-khan-cap/CusVideo";
import Maps from "../components/l2-khan-cap/Maps";
import ThongKeKhanCapScreen from "../components/l2-khan-cap/thong_ke_khan_cap"
import ChiDaoNhanSuScreen from "../components/l2-khan-cap/chi-dao-nhan-su";
import ChiTietNhanSuScreen from "../components/l2-khan-cap/chi-tiet-nhan-su";

/* L2 Mục tiêu kinh tế */
import MucTieuKinhTeScreen from "../components/l2-muc-tieu-kinh-te/ds-muc-tieu-kinh-te";
import BaoCaoKTXHChiTietScreen from "../components/l2-bao-cao-va-dieu-hanh/l3-bao-cao-ktxh-chi-tiet";

/* L2 Bao Cao Dieu Hanh */
import BaoCaoVaDieuHanhScreen1 from "../components/l2-bao-cao-va-dieu-hanh/ds-bao-cao-dieu-hanh";
import BaoCaoKTXHScreen from "../components/l2-bao-cao-va-dieu-hanh/l3-bao-cao-kt-xh";
import DanhSachTroTruyenScreen from "../components/l2-bao-cao-va-dieu-hanh/danh-sach-tro-truyen"
import ChiTietTroTruyenScreen from "../components/l2-bao-cao-va-dieu-hanh/chi-tiet-tro-chuyen";
import BaoCaoKhanCapScreen from "../components/l2-bao-cao-va-dieu-hanh/l3-bao-cao-khan-cap";
import VanBanChiTieuScreen from "../components/l2-bao-cao-va-dieu-hanh/l5-van-ban-chi-tieu";
import BCDHSoNganhChiTietScreen from "../components/l2-bao-cao-va-dieu-hanh/tong-hop-bao-cao/chi-tiet-bao-cao";
import ChiTietDuAnTrongDiemScreen from "../components/l2-bao-cao-va-dieu-hanh/l4-chi-tiet-du-an-trong-diem";
import TongHopYKienChiDao from '../components/l2-bao-cao-va-dieu-hanh/tong-hop-y-kien-chi-dao'

/* L2 Nhiệm vụ */
import DsNhiemVuScreen from "../components/l2-nhiem-vu/ds-nhiem-vu";
import NhiemVuChiTietScreen from '../components/l2-nhiem-vu/chi-tiet-nhiem-vu';
import ThongKeNhiemVuScreen from '../components/l2-nhiem-vu/ds-nhiem-vu/thong_ke_nhiem_vu'

/* L2 Báo cáo */
import BaoCaoTongHopScreen from "../components/l2-bao-cao/bao-cao-tong-hop";
import BaoCaoThongKeChiTietScreen from "../components/l2-bao-cao/bao-cao-thong-ke-chi-tiet";
// import BaoCaoVaDieuHanhScreen from "../components/l2-bao-cao-va-dieu-hanh";

/* L2 Duyệt văn bản */
import DsVanBanScreen from "../components/l2-duyet-van-ban/ds-van-ban";
import VanBanChiTietScreen from "../components/l2-duyet-van-ban/xet-duyet-chi-tiet";
import TimKiemVanBanScreen from "../components/l2-duyet-van-ban/ds-van-ban/tim-kiem-ds-van-ban"
/* L2 Quản lý nội bộ */
import QuanLyNoiBoScreen from '../components/l2-quan-ly-noi-bo/';
import QuyetDinhPhanCong from '../components/l2-quan-ly-noi-bo/quyet-dinh-phan-cong'
import ChiTietPhanCongScreen from "../components/l2-quan-ly-noi-bo/quyet-dinh-phan-cong/chi-tiet-phan-cong";
// import LinhVucDangPhuTrach from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach'
import DonViDangPhuTrach from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach'
import ChiTietDonVi from '../components/l2-quan-ly-noi-bo/chi-tiet-don-vi'
import ChiTietDuAnNew from "../components/l2-quan-ly-noi-bo/du-an-quan-trong/chi-tiet-du-an/";
// import ChiTietDuAnSo from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach/so-tai-chinh/du-an-so/chi-tiet-du-an'
import ChiTietCongViecScreen from "../components/l2-quan-ly-noi-bo/cong-viec-cham-tien-do/chi-tiet-cong-viec";
import SuKienQuantrong from '../components/l2-quan-ly-noi-bo/su-kien-quan-trong/'
import DuAnQuantrong from '../components/l2-quan-ly-noi-bo/du-an-quan-trong'
import CongViecChamTienDo from '../components/l2-quan-ly-noi-bo/cong-viec-cham-tien-do'
import TimKiemNhiemVuScreen from '../components/l2-nhiem-vu/ds-nhiem-vu/tim_kiem_nhiem_vu'
import SoTaiChinh from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach/so-tai-chinh/'
import NhiemVu from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach/so-tai-chinh/nhiem-vu'
import ChiTietSuKienScreen from '../components/l2-quan-ly-noi-bo/su-kien-quan-trong/chi-tiet-su-kien'
import NhiemVuChiTietSo from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach/so-tai-chinh/nhiemvuso/chi-tiet-nhiem-vu'
import MucTieuKTLVQLChiTietScreen from '../components/l2-quan-ly-noi-bo/don-vi-dang-phu-trach/so-tai-chinh/chi-tiet-muc-tieu'
import DiaPhuongDangPhuTrach from '../components/l2-quan-ly-noi-bo/dia-phuong-dang-phu-trach/'
import DonViTrucThuoc from '../components/l2-quan-ly-noi-bo/don-vi-truc-thuoc'

/* L2 Dư luận */
import LangNgheDuLuanScreen from "../components/l2-du-luan";
import NguoiDan from '../components/l2-du-luan/nguoi-dan'
import DoanhNghiep from '../components/l2-du-luan/doanh-nghiep'
import BaoChi from '../components/l2-du-luan/bao-chi'
import CongDongMang from '../components/l2-du-luan/cong-dong-mang'

/* L2 Hành chính công */
import HanhChinhCongScreen from "../components/l2-hanh-chinh-cong";
/* L2 Lịch công tác */

import DsLichCongTacScreen from "../components/l2-lich-cong-tac/ds-lich-cong-tac";
import LichCTChiTietScreen from "../components/l2-lich-cong-tac/chi-tiet-lich-cong-tac";
import ThongKeVanBanScreen from "../components/l2-duyet-van-ban/xet-duyet-chi-tiet/thong_ke_van_ban"

import NhatKyCaNhanScreen from "../components/l2-ca-nhan/l3-nhat-ky";
import CamNangCaNhanScreen from "../components/l2-ca-nhan/l3-cam-nang";
import LichSuCaNhanScreen from '../components/l2-ca-nhan/l3-lich-su';
import TimkiemLichSu from '../components/l2-ca-nhan/l3-lich-su/tim-kiem-lich-su';

/* Kết nối, mạng xã hội */
import DsKetNoiScreen from "../components/l2-ket-noi/ds-ket-noi";
import DanhBaKetNoiScreen from "../components/l2-ket-noi/danh-ba-ket-noi";
import MangXaHoiScreen from "../components/l2-mang-xa-hoi";

import SuKienScreen from "../components/l2-su-kien/index";
import ChiDaoScreen from "../components/user-controls/CommandIdeaBox/screen_chi_dao"
// import HomeDrawerRouter from "./HomeDrawerRouter";
// bottom tab
import CommandIdeaScreen from '../components/user-controls/CommandIdeaScreen';
import NoiDungMauScreen from '../components/user-controls/CommandIdeaBox/noi-dung-mau';
import XinYKienScreen from "../components/user-controls/CommandIdeaBox/screen_xin_y_kien"

//thong ke chi tiet
import ThongKeChiTietScreen from '../components/user-controls/ThongKeBox/thong_ke_chi_tiet'
import DocBao from '../components/l2-ca-nhan/l3-doc-bao'
const HomeNavigator = createSwitchNavigator({
    // CusVideo: { screen: CusVideoScreen },
    // MangXaHoi: { screen: MangXaHoiScreen },
    Splash: { screen: Splash },
    Login: { screen: Login2 },
    HomeScreenOption2: { screen: HomeScreenOption2 },
    DsLichCongTac: { screen: DsLichCongTacScreen },
    CaNhan: { screen: CaNhanScreen },
    ThongBao: { screen: ThongBaoScreen },

});
const rootStack = createStackNavigator({
    HomeNavigator,

    ChiDaoScreen: { screen: ChiDaoScreen },
    TaiKhoan: { screen: TaiKhoanScreen },
    TinTucChiTietHome: { screen: TinTucChiTietHomeScreen },
    TimkiemLichSu: { screen: TimkiemLichSu },
    TroLyAo: { screen: TroLyAoScreen },
    CamNangCaNhan: { screen: CamNangCaNhanScreen },
    NhatKyCaNhan: { screen: NhatKyCaNhanScreen },
    LichSuCaNhan: { screen: LichSuCaNhanScreen },
    LichVanNien: { screen: LichVanNienScreen },
    LichVanNienChiTiet: { screen: LichVanNienChiTietScreen },
    PhongThuy: { screen: PhongThuyScreen },
    PhongThuyHangNgay: { screen: PhongThuyHangNgayScreen },
    DocBao: { screen: DocBao },
    DichThuat: { screen: DichThuatScreen },

    /* L2 Kết nối */
    DsKetNoi: { screen: DsKetNoiScreen },
    DanhBaKetNoi: { screen: DanhBaKetNoiScreen },
    XinYKienScreen: { screen: XinYKienScreen },
    /* L2 Khẩn cấp */
    DsKhanCap: { screen: DsKhanCapScreen },
    KhanCapChiTiet: { screen: ChiTietKhanCapScreen },
    CusVideo: { screen: CusVideoScreen },
    Maps: { screen: Maps },
    ThongKeKhanCapScreen: { screen: ThongKeKhanCapScreen },
    ChiDaoNhanSu: { screen: ChiDaoNhanSuScreen },
    ChiTietNhanSu: { screen: ChiTietNhanSuScreen },

    /* L2 Mục tiêu kinh tế */
    MucTieuKinhTe: { screen: MucTieuKinhTeScreen }, //Mục tiêu và chỉ tiêu chủ yếu
    BaoCaoKTXHChiTiet: { screen: BaoCaoKTXHChiTietScreen }, //Nội dung chỉ tiêu

    /* L2 Nhiệm vụ */
    DsNhiemVu: { screen: DsNhiemVuScreen },
    NhiemVuChiTiet: { screen: NhiemVuChiTietScreen },
    TimKiemNhiemVuScreen: { screen: TimKiemNhiemVuScreen },
    ThongKeNhiemVuScreen: { screen: ThongKeNhiemVuScreen },

    /* L2 Báo cáo */
    BaoCaoTongHop: { screen: BaoCaoTongHopScreen },//Báo cáo thống kê 2019
    BaoCaoThongKeChiTiet: { screen: BaoCaoThongKeChiTietScreen },
    DanhSachTroTruyen: { screen: DanhSachTroTruyenScreen },
    ChiTietTroTruyen: { screen: ChiTietTroTruyenScreen },
    // BaoCaoVaDieuHanh: {screen: BaoCaoVaDieuHanhScreen},

    /* L2 Duyệt văn bản */
    DsVanBan: { screen: DsVanBanScreen },
    VanBanChiTiet: { screen: VanBanChiTietScreen },
    TimKiemVanBanScreen: { screen: TimKiemVanBanScreen },
    ThongKeVanBanScreen: { screen: ThongKeVanBanScreen },

    /* L2 Quản lý nội bộ */
    QuanLyNoiBo: { screen: QuanLyNoiBoScreen },
    QuyetDinhPhanCong: { screen: QuyetDinhPhanCong },
    ChiTietPhanCong: { screen: ChiTietPhanCongScreen },
    DonViDangPhuTrach: { screen: DonViDangPhuTrach },
    SuKienQuantrong: { screen: SuKienQuantrong },
    DuAnQuantrong: { screen: DuAnQuantrong },
    CongViecChamTienDo: { screen: CongViecChamTienDo },
    ChiTietDuAn: { screen: ChiTietDuAnNew },
    // ChiTietDuAnSo: {screen: ChiTietDuAnSo},
    ChiTietCongViecScreen: { screen: ChiTietCongViecScreen },
    SoTaiChinh: { screen: SoTaiChinh },
    NhiemVu: { screen: NhiemVu },
    ChiTietSuKien: { screen: ChiTietSuKienScreen },
    NhiemVuChiTietSo: { screen: NhiemVuChiTietSo },
    MucTieuKTLVQLChiTietScreen: { screen: MucTieuKTLVQLChiTietScreen },
    DiaPhuongDangPhuTrach: { screen: DiaPhuongDangPhuTrach },
    DonViTrucThuoc: { screen: DonViTrucThuoc },
    ChiTietDonVi: { screen: ChiTietDonVi },

    /* L2 Dư luận */
    LangNgheDuLuan: { screen: LangNgheDuLuanScreen },
    NguoiDan: { screen: NguoiDan },
    DoanhNghiep: { screen: DoanhNghiep },
    BaoChi: { screen: BaoChi },
    CongDongMang: { screen: CongDongMang },

    /* L2 Hành chính công */
    HanhChinhCong: { screen: HanhChinhCongScreen },

    /* L2 Lịch công tác */
    LichCongTacChiTiet: { screen: LichCTChiTietScreen },

    SuKienScreen: { screen: SuKienScreen },
    /* L2 Bao cao dieu hanh */
    BaoCaoVaDieuHanhScreen1: { screen: BaoCaoVaDieuHanhScreen1 },
    BaoCaoKTXHScreen: { screen: BaoCaoKTXHScreen },
    BaoCaoKhanCapScreen: { screen: BaoCaoKhanCapScreen },
    VanBanChiTieuScreen: { screen: VanBanChiTieuScreen },
    BCDHSoNganhChiTiet: { screen: BCDHSoNganhChiTietScreen },
    ChiTietDuAnTrongDiemScreen: { screen: ChiTietDuAnTrongDiemScreen },
    TongHopYKienChiDao: {screen: TongHopYKienChiDao},
    // MXH
    MangXaHoi: { screen: MangXaHoiScreen },
    CommandIdeaScreen: { screen: CommandIdeaScreen },
    NoiDungMauScreen: { screen: NoiDungMauScreen },

    //thong ke chi tiet
    ThongKeChiTiet: { screen: ThongKeChiTietScreen },


},
    {
        initialRouteName: 'HomeNavigator',
        headerMode: 'none',
    });

const App = createAppContainer(rootStack);

export default App;

