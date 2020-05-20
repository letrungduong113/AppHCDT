import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
// import {convertDate} from "../../user-controls/utilities/converter";
import {convertTime, convertDate} from "../../user-controls/utilities/converter";

import CommandIdeaBox, {COMMAND_TYPE} from "../../user-controls/CommandIdeaBox";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Picker,
  Footer,
  View
} from "native-base";

import CustomHeader from "../../user-controls/CustomHeader";
import AppIndicator from "../../user-controls/AppIndicator";
import AttachmentsBox from "../../user-controls/AttachmentsBox";
import ProgressListBox from "../../user-controls/ProgressListBox";

var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
var sizeImg = scale(60);

export default class BCDHSoNganhChiTietScreen extends Component {
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
    this.state = {
      isLoading: true,
      id: 1746, // KHÔNG CÓ API NÊN TẠM THỜI FIX THEO DATA
      text_type: this.props.navigation.getParam("text_type"),
      data: {},
      progressList: [],
      progressSize: 0,
      isLoadMore:false,
      offset:1
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      data: {
        tieuDe: 'Báo cáo qui trình phát triển giao thông đô thị thành phố Bắc Ninh',
        tenLinhVuc: 'Giao thông',
        noiDung: `Qui trình phát triển giao thông đô thị thành phố Bắc Ninh đã trải qua giai đoạn 2,
        Hiện tổng số tuyến phố đưcọ nâng cấp và làm mới giai đoạn 2 là 500 nâng tổng số tuyến phố cải tạo cả dự án là 700`,
        donViBaoCao: 'Phòng Giao Thông TP Bắc Ninh',
        ngayBaoCao: '29/04/2019 12:00',
        
      }
      // <Text style = {styles.textContent}>Cơ quan ban hành:&nbsp;{this.getBanHanh(data.referInfo)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{data.startTime}</Text>
      //       </View>
      //       <Text style={styles.textContent}>Đơn vị tiếp nhận:&nbsp;{this.getNoiXuLy(data.referInfo)}</Text>
      //       <Text style={styles.textContent}>Lĩnh vực:&nbsp;{data.tenLinhVuc}</Text>
      //       <Text style={styles.textContent}>Người ký:&nbsp;{data.signUser}</Text>
      //       <Text style={styles.textContent}>Ngày hiệu lực:&nbsp;{data.publishTime}</Text>
      //       <Text style={styles.textContent}>Số ký hiệu:&nbsp;{data.docCode}</Text>
    })

    DanhSachVanBanAPI.getTienTrinh(this.state.id,1,20).then(res =>{
        if(res!=null){
          let canLoad = false;
        if (res.size > 3) canLoad = true;
        this.setState({ progressList: res.commentEntity, isLoadMore: canLoad, progressSize: res.size, offset:1 });
        }
    });
  }

  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }
    
  postYKienChiDao = async (response)=> {
    if (response && response.message == "SUCCESS") {
      //console.log(this.state.ctrlTienTrinh);
      if (this._tientrinh) {
          this._tientrinh.refreshData();
          this._tientrinh.updateTrangThai(false)
      }
    }
  }
  postYKienChiDao2 = async (response)=> {
    if (response && response.message == "SUCCESS") {
      //console.log(this.state.ctrlTienTrinh);
      if (this._tientrinh) {
          this._tientrinh.refreshData();
          this._tientrinh.updateTrangThai(false)
      }
    }
  }

  formatSoHieu(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      // var textFormat = arr[1]
      if (arr[1]) {
        arr[1] = arr[1].slice(0, -2)
        return arr[1];
      }
      return "";
    }
  }
  getNoiXuLy(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "2"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }
  getNoiLienQuan(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "3"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }

  getBanHanh(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "1"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }

  getThemBoi(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(",");
      // var textFormat = arr[1]
      if (arr[0]) {
        return arr[0];
      }
      return "";
    }
  }

  getMauVanBan(type) {
    switch (type) {
      case "1": {
        return "#449944";
      }
      default: {
        return "#ce1e17";
      }
    }
  }

  renderContent() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: verticalScale(450),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <AppIndicator />
        </View>
      );
    }
    data = this.state.data;
    return (
      <View style={{ flexDirection: "column", marginTop: 10 }}>
        <View style={{ backgroundColor: "white", padding: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              borderBottomColor: "#cfcfcf",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ fontSize: scale(34), color: "#3a3a3a" }}>
              {data.tieuDe}
            </Text>
            <Text style={styles.textContent}>Đơn vị báo cáo:&nbsp;{this.getNoiXuLy(data.donViBaoCao)}</Text>
            <Text style={styles.textContent}>Lĩnh vực:&nbsp;{data.tenLinhVuc}</Text>
            <Text style={styles.textContent}>Ngày báo cáo:&nbsp;{data.ngayBaoCao}</Text>
              {/* <Text
                style={{
                  marginLeft: 5,
                  fontSize: FONT_SIZE_24,
                  color: this.getMauVanBan(data.trangThai) //"#3d5f90" vitcon
                }}
              >
                
              </Text> */}
            <View

              style={[
                styles.containerRow,
                { alignItems: "center", marginBottom: 10 }
              ]}
            >
              {/* <Text style={styles.textContent}>
                Tình trạng:&nbsp;
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: FONT_SIZE_24,
                  color: this.getMauVanBan(data.trangThai)
                }}
              >
                {data.tenTrangThai}
              </Text> */}
            </View>
          </View>
          <Text
            style={{
              fontSize: FONT_SIZE_MAIN,
              paddingTop: 10,
              paddingBottom: 10,
              color: "#666666"
            }}
          >
            {data.noiDung}
          </Text>
        </View>
        <AttachmentsBox itemId={this.state.id} callBackFunc={()=>{}}></AttachmentsBox>
        <ProgressListBox  itemId={this.state.id} ref = {ref=>{this._tientrinh = ref}}></ProgressListBox>
      </View>
    );
  }
  formatUser(value){
    if(value == null || value == "") return [];
    let arr = value.split(",");
    if(arr){
      arr.splice(arr.length-1,1)
      return arr;
    }
    return []
  }
  render() {
    return (
      <Container style={styles.container}>
        <CommandIdeaBox
          ref={ref => { this._ideaBoxDen = ref }}
          itemId={this.state.id} ideaType={COMMAND_TYPE.VAN_BAN_DEN}
          referUserID={this.state.data.referUserID ? this.formatUser(this.state.data.referUserID)  : []}
          referIDSelectSo={this.formatUser(this.state.data.referOrgID)
            //  ? this.state.data.referOrgID : []
             }
             ngayhieuluc = {this.state.data.publishTime ? this.state.data.publishTime: ""}
          orgID={this.state.data.orgID ? this.state.data.orgID : 0}
          postCallBack={this.postYKienChiDao}
        />
        <CommandIdeaBox
          ref={ref => { this._ideaBoxDi = ref }}
          itemId={this.state.id} ideaType={COMMAND_TYPE.VAN_BAN_DI}
          referUserID={this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : []}
          referIDSelectSo={this.formatUser(this.state.data.referOrgID)
          
            //  ? this.state.data.referOrgID : []
             }
             ngayhieuluc = {this.state.data.publishTime ? this.state.data.publishTime: ""}
          orgID={this.state.data.orgID ? this.state.data.orgID : 0}
          postCallBack={this.postYKienChiDao2}
        />
        <CustomHeader title="Nội dung chi tiết" />
        <Content>{this.renderContent()}</Content>
        <View
          style={{
            width: "100%",
            height: verticalScale(106),
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            padding: 10,
            backgroundColor: "white",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity
            style={{
              margin: 10,
              width: scale(682),
              height: verticalScale(72),
              borderColor: "lightgrey",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3d5e8f",
              flexDirection: "row"
            }}
            onPress={() => {
              if (this.state.text_type) {
                if (this._ideaBoxDen) this._ideaBoxDen.show();
              }
              else {
                if (this._ideaBoxDi) this._ideaBoxDi.show();
              }
            }}>
            <Image
              style={{ width: FONT_SIZE_28, height: FONT_SIZE_28 }}
              source={require("../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-add.png")}
            />
            <Text
              style={{ color: "white", marginLeft: 10, fontSize: FONT_SIZE_28 }}
            >
              Ý KIẾN CHỈ ĐẠO
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
  },
  textContent:{
    color:'#666666',
    fontSize: scale(24)
  },
  containerRow:{
    marginTop:4,
    backgroundColor:'white',
    flexDirection: 'row',
  },
  line:{
    backgroundColor:'#eaeaea',
    margin:8,
    flex:1,
    height:1
  },
  chuviText: {
    flex: 6,
    fontSize: scale(24),
    color: "#ef743e",
    fontFamily: "Roboto-Regular"
  },
  textTime: {
    flex:2.5,
    fontSize: scale(24),
    color: "#999999",
    fontFamily: "Roboto-Regular",
    marginLeft: 5
  },noidungText: {
    color: "#333333",
    fontSize: scale(26),
    fontFamily: "Roboto-Regular"
  },
  bophanthuchienView: {
    flexDirection: "row",
    width: scale(536),
    marginTop: 5
  },
  bophanthuchienText: {
    fontSize: scale(24),
    color: "#999999"
  },
  text: {
    fontSize: scale(24)
  },
  textModal: {
      color: '#333333',
      fontSize: scale(26)
  },
  border: {
      borderColor: '#b4b4b4',
      borderWidth: scale(1),
  },
});
