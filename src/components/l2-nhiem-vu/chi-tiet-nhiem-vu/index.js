import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { convertTime, convertDate } from "../../user-controls/utilities/converter";

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
  Footer,
  View,
  Text,
  Picker
} from "native-base";
// import Text from "../../custom-view/text";
import NhanNhiemVuAPI from "../../../services/api-service/nhan-nhiem-vu-api";
import CommonAPI from "../../../services/api-service/common-api";
import { rootAPI } from "../../../services/api-service/index";
import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../../user-controls/AppIndicator";
import CommandIdeaBox, { COMMAND_TYPE } from "../../user-controls/CommandIdeaBox";
import AttachmentsBox from "../../user-controls/AttachmentsBox";
import ProgressListBox from "../../user-controls/ProgressListBox";
import CommandIdeaBox2 from "../../user-controls/CommandIdeaBox2";
import HtmlText from "../../user-controls/HtmlText";
import SpeakerBox from "../../user-controls/SpeakerBox";

const win = Dimensions.get("window");
var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
var sizeImg = scale(60);

class NhiemVuChiTietScreen extends Component {
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
      isLoadMore: false,
      defaultDsCacSo: [],
      text: "",
      date: "",
      isLoading: true,
      modalVisible: false,
      taskID: this.props.navigation.getParam("id"),
      task_type: this.props.navigation.getParam("task_type"),
      trangThaiId: this.props.navigation.getParam("trangThaiId"),
      data: {},
      dsCacSo: [],
      data_picker: 1,
      selectedSo: {},
      modalVisible_Item: false,
      textBoPhanThucHien: "Bộ phận thực hiện",
      checkboxThuocNhomViecGap: true,
      uploadedFiles: [],
      progressList: [],
      disableButton: false,
      progressSize: 0,
      offset: 1,
      textCommit: '',
      noiDungHtml: '',
    };
  }

  getThemBoi(value) {
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

  formatBoPhanThucHien(value) {
    if (value == null || value == '') {
      return ""
    } else {
      let textFormat = ''
      var arr = value.split(";");
      for (let i = 0; i < arr.length - 1; i++) {
        arr2 = arr[i].split(",")
        textFormat += arr2[0] + ", "
      }
      textFormat = textFormat.slice(0, -2)
      return textFormat;
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
  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  getColorState(color) {
    switch (color) {
      case "2264":
        return "#449944";
      default:
        return "#ce1e17";
    }
  }

  componentDidMount() {
    // alert(this.state.taskID)

    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      if (this._tientrinh) {
        this._tientrinh.refreshData();
      }
    });

    if (this.state.task_type) {
      NhanNhiemVuAPI.getNhiemVuNhanChiTiet(this.state.taskID, 3).then(res => {
        if (res != null) {
          res.themBoi = res.sumary;
          res.noiLienQuan = ""
          res.noiXuLy = ""
          if (res.referInfo) {
            let noi_xu_ly = JSON.parse(res.referInfo)
            for (let i = 0; i < noi_xu_ly.length; i++) {
              if (noi_xu_ly[i].type == 2) {
                res.noiXuLy = noi_xu_ly[i].name
              }
              if (noi_xu_ly[i].type == 3) {
                res.noiLienQuan += noi_xu_ly[i].name + ", "
              }
            }
            res.noiLienQuan = res.noiLienQuan.slice(0, -2)
            // alert(res.noiLienQuan)
          }

          this.setState({
            data: res,
            isLoading: false,
          }, () => {
            if (res.trangThai == 2) {
              if (this._tientrinh)
                this._tientrinh.updateTrangThai(true);

            }
          });
          if (this._ideaBox) {
            let time = res.publishTime + ""
            this._ideaBox.updateDate2(time)
            this._ideaBox.updateOrgRef(res.referOrgID)
          }

          if (this._ideaBoxXin) {
            this._ideaBoxXin.updateOrgRefStr(res.referOrgID)
          }
        }
      });
    } else {
      NhanNhiemVuAPI.getNhiemVuGiaoChiTiet(this.state.taskID, 3).then(res => {
        if (res != null) {
          res.themBoi = res.sumary;
          res.noiLienQuan = ""
          res.noiXuLy = ""
          if (res.referInfo) {
            let noi_xu_ly = JSON.parse(res.referInfo)
            for (let i = 0; i < noi_xu_ly.length; i++) {
              if (noi_xu_ly[i].type == 2) {
                res.noiXuLy = noi_xu_ly[i].name
              }
              if (noi_xu_ly[i].type == 3) {
                res.noiLienQuan += noi_xu_ly[i].name + ", "
              }
            }
            res.noiLienQuan = res.noiLienQuan.slice(0, -2)
          }
          this.setState({
            data: res,
            isLoading: false,
          }, () => {
            if (res.trangThai == 2) {
              if (this._tientrinh)
                this._tientrinh.updateTrangThai(true);
            }
          });
          if (this._ideaBox) {
            this._ideaBox.updateOrgRef(res.referOrgID)
            this._ideaBox.updateDate2(res.publishTime)
          }
        }
        if (this._ideaBoxXin) {
          this._ideaBoxXin.updateOrgRefStr(res.referOrgID)
        }
      });
    }
  }

  postYKienChiDao = async (response) => {
    if (response && response.message == 'SUCCESS') {
      if (this._tientrinh) {
        this._tientrinh.refreshData();
        this._tientrinh.updateTrangThai(false)
      }
    }
    return response;
  }

  getType(type) {
    switch (type) {
      case "text/plain":
        return require("../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-doc.png");
      default:
        return require("../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-pdf.png");
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
    } else {
      data = this.state.data;
      return (
        <View>
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ color: "#333333", fontSize: scale(32) }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={{
                flexDirection: "row",
              }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    color: "#666666",
                    marginRight: 5,

                  }}
                >
                  Người giao:&nbsp;</Text>
                <Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    color: "#666666",
                    marginRight: 5
                  }}
                >
                  {data.themBoi}
                </Text>
              </View>

              <Text style={{ marginLeft: 5, fontSize: FONT_SIZE_24, color: "#666666", marginRight: 5 }}>
                Ngày giao:&nbsp;{convertTime(data.createTime)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 5
                }}
              >
                Đơn vị thực hiện:&nbsp;</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 10
                }}
              >
                {data.noiXuLy}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignSelf: "baseline"
              }}
            >
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 5
                }}
              >
                Đơn vị liên quan:&nbsp;<Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    color: "#666666",
                    marginRight: 24
                  }}
                >
                  {data.noiLienQuan}
                </Text></Text>

            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666"
                }}
              >
                Thời hạn:&nbsp;</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 10
                }}
              >
                {convertDate(data.publishTime)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {/* <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666"
                }}
              >
                Tình trạng:{" "}</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: this.getColorState(data.trangThai)
                }}
              >
                {data.tenTrangThai}
              </Text> */}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "white",
              flexWrap: 'wrap'
            }}
          >
            <Text
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                color: "#454545",
                fontSize: FONT_SIZE_MAIN,
                borderBottomColor: "#f6f6f6",
                borderBottomWidth: 1
              }}
            >NỘI DUNG</Text>
            <HtmlText source={data.contents}  onLoaded={(text)=> {this.setState({noiDungHtml: text})}}></HtmlText>
          </View>

          <AttachmentsBox itemId={this.state.taskID} callBackFunc={() => { }}></AttachmentsBox>
          <ProgressListBox itemId={this.state.taskID} callBackFunc={() => { }} ref={ref => { this._tientrinh = ref }}></ProgressListBox>
        </View>
      );
    }
  }

  xinYKienChiDao = async (response) => {
    // alert(JSON.stringify(res))
    if (response && response.message == "SUCCESS") {
      //console.log(this.state.ctrlTienTrinh);
      if (this._tientrinh) {
        this._tientrinh.refreshData();
        this._tientrinh.updateTrangThai(false)
      }
    }
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
            <CommandIdeaBox
            navigation= {this.props.navigation}
            ref={ref => { this._ideaBox = ref }}
            itemId={this.state.taskID} ideaType={COMMAND_TYPE.NHIEM_VU}
            referUserID={this.formatUser(this.state.data.referUserID)

            //  ? this.state.data.referUserID : []
          }
          // referIDSelectSo={this.formatUser(this.state.data.referOrgID)
          // //  ? this.state.data.referOrgID : []
          //  }
          orgID={this.state.data.orgID ? this.state.data.orgID : 0}
          postCallBack={this.postYKienChiDao}
        />
        <CustomHeader title="Nội dung chi tiết" />
        <Content style={{ backgroundColor: "#efefef" }}>
          {this.renderContent()}
        </Content>
        <SpeakerBox contents={[this.state.data.title, this.state.noiDungHtml]}></SpeakerBox>
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
              id: this.state.taskID,
              referUserID:this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : [],
              referIDSelectSo:this.formatUser(this.state.data.referOrgID),
            //  ? this.state.data.referOrgID : []
              ngayhieuluc:this.state.data.publishTime ? this.state.data.publishTime : "",
              orgID:this.state.data.orgID ? this.state.data.orgID : 0
            });
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
            onPress={() => { this.props.navigation.navigate("XinYKienScreen", {
              id: this.state.taskID,
              referUserID:this.state.data.referUserID ? this.formatUser(this.state.data.referUserID) : [],
              referIDSelectSo:this.formatUser(this.state.data.referOrgID),
            //  ? this.state.data.referOrgID : []
              ngayhieuluc:this.state.data.publishTime ? this.state.data.publishTime : "",
              orgID:this.state.data.orgID ? this.state.data.orgID : 0
            });}}
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
export default connect(ahihi, null)(NhiemVuChiTietScreen);