import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Modal
} from "react-native";
import { connect } from "react-redux";
import ThongBaoModal from "../login2/thong-bao-1"
import PropTypes from "prop-types";
import YearMonthPicker from "../user-controls/YearPicker";
import moment from "moment";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Text
} from "native-base";
// import Text from "../custom-view/text";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import styles from "./styles";
import NhanNhiemVuAPI from "../../services/api-service/nhan-nhiem-vu-api";
import AppIndicator from "../user-controls/AppIndicator";
import Footer, { footerMargin } from "../user-controls/CustomFooter";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn";
import { ENABLE_VIEW } from "../../../assets/strings/enable_view";
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
export default class BaoCaoVaDieuHanhScreen1 extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props) {
    super(props);
    listBtns = [
      {id: 0, name: GROBAL_RESOUCE.BAO_CAO_KHAN_CAP_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_KHAN_CAP_ICON,enable:ENABLE_VIEW.BC_KHANCAP},
      {id: 1, name: GROBAL_RESOUCE.BAO_CAO_KINH_TE_XA_HOI_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_KINH_TE_XA_HOI_ICON,enable:ENABLE_VIEW.BC_KINH_TE_XA_HOI},
      {id: 2, name: GROBAL_RESOUCE.BAO_CAO_SO_NGANH_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_SO_NGANH_ICON,enable:ENABLE_VIEW.BC_SO_NGANH},
      {id: 3, name: GROBAL_RESOUCE.BAO_CAO_DIA_PHUONG_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_DIA_PHUONG_ICON,enable:ENABLE_VIEW.BC_DIA_PHUONG},
      {id: 4, name: GROBAL_RESOUCE.BAO_CAO_DON_VI_TRUC_THUOC_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_DON_VI_TRUC_THUOC_ICON,enable:ENABLE_VIEW.BC_LANH_DON_VI_TRUC_THUOC},
      {id: 5, name: GROBAL_RESOUCE.BAO_CAO_TO_CHUC_CO_QUAN_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_TO_CHUC_CO_QUAN_ICON,enable:ENABLE_VIEW.BC_TO_CHUC_CO_QUAN_DOAN_THE},
      {id: 6, name: GROBAL_RESOUCE.BAO_CAO_TONG_HOP_KET_LUAN_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_TONG_HOP_KET_LUAN_ICON,enable:ENABLE_VIEW.BC_TONG_HOP_KET_LUAN},
      {id: 7, name: GROBAL_RESOUCE.BAO_CAO_DU_AN_TRONG_DIEM_TITLE, icon: GROBAL_RESOUCE.BAO_CAO_DU_AN_TRONG_DIEM_ICON,enable:ENABLE_VIEW.BC_DU_AN_TRONG_DIEM},
     
    ];

    
    this.state = {
      modalVisible:false,
      listBaoCao: listBtns.filter(item=>item.enable==true),
    };
  }

  getListFriend(){
    MucTieuAPI.getListFriend().then((res) =>{
      if(res!=null){
        if(res.length>1){
          this.props.navigation.navigate("DanhSachTroTruyen", {listFriend: res})
        }else if(res.length == 1){
          this.props.navigation.navigate("ChiTietTroTruyen",{receiveId: res[0].id, name: res[0].ten,
            chucvu: res[0].chucVu,
            icon: res[0].avatar})
        }else{
          this.setState({modalVisible:true})
        }
      }
    })
  }

  renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.5}
        style = {{width:'100%', height:'100%',backgroundColor:'rgba(0,0,0,0.5)',}}
        visible={this.state.modalVisible}
        onRequestClose={() => { }}
      >
        <ThongBaoModal
          title="Thông báo"
          content="Bạn chưa có chức vụ gì trong hệ thống này!"
          button="OK"
          onClose={() => this.setState({ modalVisible: false })}
        />
      </Modal>
    )
  }

  Option(id){
    switch(id){
      case 0:
        this.props.navigation.navigate("BaoCaoKhanCapScreen", {title: GROBAL_RESOUCE.BAO_CAO_VAN_DE_KHAN_CAP_TITLE_DETAIL,baoCao:true});
        break;
      case 1:
        this.props.navigation.navigate("BaoCaoKTXHScreen", {showSoNganh: "1"});
        break;
      case 2:
        this.props.navigation.navigate("DonViDangPhuTrach", {numScreen: true, title: GROBAL_RESOUCE.BAO_CAO_SO_NGANH_TITLE_DETAIL});
        // this.props.navigation.navigate("BaoCaoKTXHScreen", {showSoNganh: "0"});
        break;
      case 3:
        this.props.navigation.navigate("DiaPhuongDangPhuTrach", {numScreen: true, title: GROBAL_RESOUCE.BAO_CAO_DIA_PHUONG_TITLE_DETAIL});
        break;
      case 4:
        this.props.navigation.navigate("DonViTrucThuoc", {numScreen: true, title: GROBAL_RESOUCE.BAO_CAO_DON_VI_TITLE_DETAIL});
        break;
      case 5:
        // this.getListFriend();
        break;

      case 6:
        this.props.navigation.navigate("DsNhiemVu");
        break;
      case 7:
      this.props.navigation.navigate("DuAnQuantrong");
        break;
      
    }
  }

  _renderFlatList = ({item,index}) => (
    <TouchableOpacity onPress={()=>{
    this.Option(item.id)}}>
    <View style={{width: win.width/2, flexDirection: "row", justifyContent: "center"}}>

    
    <View
      key={item.id}
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        width: win.width/2-2*scale(20),
        marginLeft:index%2==0?scale(10):0,
        marginRight:index%2!=0?scale(10):0,
        height: scale(240),
        marginBottom: scale(20),
        borderRadius: 7,
      }}
    >
      <View style={{lexDirection: "column", flex: 6, justifyContent: "flex-end", alignItems: "center" }}>
        {/* <View style={{ justifyContent: "flex-end", alignItems: "center", flex: 1, backgroundColor: "blue"}}> */}
          <Image style={{ width: scale(100), height: scale(100), resizeMode: "contain" }} source={item.icon} />
        {/* </View> */}
        
      </View>

      <View style={{justifyContent: "center", alignItems: "center", flex: 4}}>
          <Text style={{fontSize: scale(24), color: "#666666", textAlign: 'center'}} numberOfLines={2}>{item.name}</Text>
          {/* <Text style={{ fontSize: scale(24), color: "#666666"}} numberOfLines={2}>{item.name2}</Text> */}
      </View>

    </View>
    </View>
  </TouchableOpacity>
  )

  renderDanhSach(){
    return (
      <FlatList
        style={{ marginTop: scale(20), backgroundColor: "#f5f5f5"}}
        data={this.state.listBaoCao}
        numColumns={2}
        renderItem={this._renderFlatList}
      />
    )
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title={GROBAL_RESOUCE.BAO_CAO_DIEU_HANH_TITLE} 
        source={require('../../../assets/images/bao-cao-dieu-hanh/tonghopykienchidao.png')} 
        goto={() => this.props.navigation.navigate('TongHopYKienChiDao')}/>
        <Content style={{ backgroundColor: "#f5f5f5" ,marginBottom:footerMargin}}>
  
      {this.renderModal()}
      <View style={{ flex: 1 }}>
        {/* {this.renderItem2(this.state.listChiTieu)} */}
        

        {this.renderDanhSach()}
      </View>


      </Content>
        <Footer select='0'/>
       
      </Container>
    );
  }
}
