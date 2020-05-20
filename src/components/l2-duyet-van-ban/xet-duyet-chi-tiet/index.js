import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import SpeakerBox from "../../user-controls/SpeakerBox";

// import {convertDate} from "../../user-controls/utilities/converter";
import { convertTime, convertDate } from "../../user-controls/utilities/converter";

import CommandIdeaBox, { COMMAND_TYPE } from "../../user-controls/CommandIdeaBox";
import CommandIdeaBox2 from "../../user-controls/CommandIdeaBox2";
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
import styles from "./styles";
import AppIndicator from "../../user-controls/AppIndicator";
import AttachmentsBox from "../../user-controls/AttachmentsBox";
import ProgressListBox from "../../user-controls/ProgressListBox";
import HtmlText from "../../user-controls/HtmlText";

var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
var sizeImg = scale(60);

class VanBanChiTietScreen extends Component {
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
      id: this.props.navigation.getParam("id"),
      text_type: this.props.navigation.getParam("text_type"),
      data: {},
      progressList: [],
      progressSize: 0,
      isLoadMore: false,
      offset: 1,
      isSpeaking: false,
      noiDungHtml: '',
    };
  }

  componentDidMount() {
    // alert()
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      if (this._tientrinh) {
        this._tientrinh.refreshData();
      }
    });
    if (this.state.text_type) {
      DanhSachVanBanAPI.getVanBanDenChiTiet(this.state.id, 3).then(res => {
        if (res != null) {
          // var mydate = new Date(res.publishTime);
          // alert(mydate)
          this.setState({ data: res, isLoading: false }

            , () => {
              if (res.trangThai == 2) {
                if (this._tientrinh)
                  this._tientrinh.updateTrangThai(true);
              }
            });
        }
      });
    } else {
      DanhSachVanBanAPI.getVanBanDiChiTiet(this.state.id, 3).then(res => {
        if (res != null) {
          this.setState({ data: res, isLoading: false }, () => {
            if (res.trangThai == 2) {
              if (this._tientrinh)
                this._tientrinh.updateTrangThai(true);
            }
          });
          // if (this._ideaBoxDi) {
          //   this._ideaBoxDi.updateOrgRefStr(res.referOrgID)
          //   this._ideaBoxDi.updateDate(res.publishTime)
          // }
          // if (this._ideaBoxXin) {
          //   this._ideaBoxXin.updateOrgRefStr(res.referOrgID)
          // }
        }
      });
    }

    
  }

  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  postYKienChiDao = async (response) => {
    if (response && response.message == "SUCCESS") {
      //console.log(this.state.ctrlTienTrinh);
      if (this._tientrinh) {
        this._tientrinh.refreshData();
        this._tientrinh.updateTrangThai(false)
      }
    }
  }
  postYKienChiDao2 = async (response) => {
    if (response && response.message == "SUCCESS") {
      //console.log(this.state.ctrlTienTrinh);
      if (this._tientrinh) {
        this._tientrinh.refreshData();
        this._tientrinh.updateTrangThai(false)
      }
    }
  }

  xinYKienChiDao = async (response) => {
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
  getNoiXuLy(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].slice(-1) == "2") {
          arr[i] = arr[i].slice(0, -2)
          return arr[i];
        }
      }
      return ""
    }
  }
  getNoiLienQuan(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].slice(-1) == "3") {
          arr[i] = arr[i].slice(0, -2)
          return arr[i];
        }
      }
      return ""
    }
  }

  getBanHanh(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].slice(-1) == "1") {
          arr[i] = arr[i].slice(0, -2)
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
            height: 400,
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
            <View style={[styles.containerRow, { alignItems: "center" }]}>
              <Text style={styles.textContent}>Cơ quan ban hành:&nbsp;{this.getBanHanh(data.referInfo)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{data.startTime}</Text>
            </View>
            <Text style={styles.textContent}>Đơn vị tiếp nhận:&nbsp;{this.getNoiXuLy(data.referInfo)}</Text>
            <Text style={styles.textContent}>Lĩnh vực:&nbsp;{data.tenLinhVuc}</Text>
            <Text style={styles.textContent}>Người ký:&nbsp;{data.signUser}</Text>
            <Text style={styles.textContent}>Ngày hiệu lực:&nbsp;{data.publishTime}</Text>
            <Text style={styles.textContent}>Số ký hiệu:&nbsp;{data.docCode}</Text>
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
          {/* <Text
            style={{
              fontSize: FONT_SIZE_MAIN,
              paddingTop: 10,
              paddingBottom: 10,
              color: "#666666"
            }}
          >
            {data.contents}
          </Text> */}
          <HtmlText source={data.contents} onLoaded={(text)=> {this.setState({noiDungHtml: text});}}></HtmlText>
        </View>
        <AttachmentsBox itemId={this.state.id} callBackFunc={() => {}}></AttachmentsBox>
        <ProgressListBox itemId={this.state.id} ref={ref => { this._tientrinh = ref }}></ProgressListBox>
      </View>
    );
  }
  formatUser(value) {
    if (value == null || value == "") return [];
    let arr = value.split(",");
    if (arr) {
      arr.splice(arr.length - 1, 1)
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
          referUserID={this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : []}
          referIDSelectSo={this.formatUser(this.state.data.referOrgID)
            //  ? this.state.data.referOrgID : []
          }
          ngayhieuluc={this.state.data.publishTime ? this.state.data.publishTime : ""}
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
          ngayhieuluc={this.state.data.publishTime ? this.state.data.publishTime : ""}
          orgID={this.state.data.orgID ? this.state.data.orgID : 0}
          postCallBack={this.postYKienChiDao2}
        />


        <CommandIdeaBox2
          ref={ref => { this._ideaBoxXin = ref }}
          itemId={this.state.id} ideaType={COMMAND_TYPE.VAN_BAN_DI}
          referUserID={this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : []}
          referIDSelectSo={this.formatUser(this.state.data.referOrgID)
          }
          ngayhieuluc={this.state.data.publishTime ? this.state.data.publishTime : ""}
          orgID={this.state.data.orgID ? this.state.data.orgID : 0}
          postCallBack={this.xinYKienChiDao}
        />
        <CustomHeader title="Nội dung chi tiết" />
        
        <Content>
          {this.renderContent()}
        </Content>
        <SpeakerBox contents={[this.state.data.tieuDe, this.state.noiDungHtml]}/>
        <View
          style={{
            width: "100%",
            height: verticalScale(106),
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex:1,
              margin: 10,
              height: verticalScale(72),
              borderTopColor: "lightgrey",
              borderTopWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#375a8e",
              flexDirection: "row"
            }}
            onPress={() => {
              this.props.navigation.navigate("ChiDaoScreen", {
              id: this.state.data.id,
              referUserID:this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : [],
              referIDSelectSo:this.formatUser(this.state.data.referOrgID),
            //  ? this.state.data.referOrgID : []
              ngayhieuluc:this.state.data.publishTime ? this.state.data.publishTime : "",
              orgID:this.state.data.orgID ? this.state.data.orgID : 0
            });
              // if (this.state.text_type) {
              //   if (this._ideaBoxDen) this._ideaBoxDen.show();
              // }
              // else {
              //   if (this._ideaBoxDi) this._ideaBoxDi.show();
              // }
            }}>
            <Text
              style={{ color: "white", marginLeft: 10, fontSize: FONT_SIZE_28, fontWeight: '800' }}
            >
              CHỈ ĐẠO
            </Text>
          </TouchableOpacity>

          {this.props.userID == 10022 ? <View></View> : <TouchableOpacity
            style={{
              flex:1,
              margin: 10,
              height: verticalScale(72),
              borderTopColor: "lightgrey",
              borderTopWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#375a8e",
              flexDirection: "row"
            }}
            onPress={() => { 
              this.props.navigation.navigate("XinYKienScreen", {
              id: this.state.data.id,
              referUserID:this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : [],
              referIDSelectSo:this.formatUser(this.state.data.referOrgID),
            //  ? this.state.data.referOrgID : []
              ngayhieuluc:this.state.data.publishTime ? this.state.data.publishTime : "",
              orgID:this.state.data.orgID ? this.state.data.orgID : 0
            });
              }} 
          >
            <Text style={{ color: '#ffffff', fontSize: FONT_SIZE_28,  fontWeight: '800'}}>XIN Ý KIẾN</Text>
          </TouchableOpacity>}
          
        </View>

      </Container>
    );
  }
}
const ahihi = state =>({
  userID : state.user1.id_person,
})
export default connect(ahihi, null)(VanBanChiTietScreen);