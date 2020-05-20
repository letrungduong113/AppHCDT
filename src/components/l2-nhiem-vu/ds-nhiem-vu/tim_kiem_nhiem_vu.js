import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Footer, { footerMargin } from "../../user-controls/CustomFooter";
import PropTypes from "prop-types";
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
  View
} from "native-base";
import Text from "../../custom-view/text";
import AppIndicator from "../../user-controls/AppIndicator";

import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import NhanNhiemVuAPI from "../../../services/api-service/nhan-nhiem-vu-api";
import StorageService from "../../../services/storage-service";

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
var headerHeight = scale(123);
const win = Dimensions.get("window");
export default class TimKiemNhiemVuScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),

    openDrawer: PropTypes.func
  };

  getIconType(type) {
    switch (type) {
      case 1:
        return require("../../../../assets/images/van-ban/van-ban-type-1.png");
      case 2:
        return require("../../../../assets/images/van-ban/van-ban-type-2.png");
      case 3:
        return require("../../../../assets/images/van-ban/van-ban-type-4.png");
      case 4:
        return require("../../../../assets/images/van-ban/van-ban-type-4.png");
      case 5:
        return require("../../../../assets/images/van-ban/van-ban-type-6.png");
      default:
        return require("../../../../assets/images/van-ban/van-ban-type-6.png");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dsLinhVuc: [],
      task_type: this.props.navigation.getParam("task_type"), //true = nhận nhiệm vụ, false = giao nhiệm vụ
      data_picker: 1,
      isLoading: true,
      data: []
    };
  }

  componentDidMount() {
    if (this.state.task_type) {
        this.getTimKiemNhanNhiemVu("");
    } else {
        this.getTimKiemGiaoNhiemVu("");
    }
  }
  getTimKiemNhanNhiemVu(text) {
    if (text == "") {
      StorageService.loadValue("search_task_pick").then(value => {
        if (value == "" || value == undefined) value = "";
        this.timKiemNhan(value);
      });
    }
    else {
      this.timKiemNhan(text);
    }
  }

  getTimKiemGiaoNhiemVu(text) {
    if(text == "" ){
      StorageService.loadValue("search_task_give").then(value => {
        if (value == "" || value == undefined) value = "";
        this.timKiemGiao(value);
      });  
    }
    else{
      this.timKiemGiao(text);
    }
  }

  timKiemGiao(text){
    NhanNhiemVuAPI.getTimKiemNhiemVuGiao(text).then(res => {
      if (res != null) {
        if (res.data.length > 0) {
          StorageService.saveValue("search_task_give", text);
          for(let i = 0 ;i<res.data.length;i++){
            if(res.data[i].referInfo){
              let noi_xu_ly = JSON.parse(res.data[i].referInfo)
              for(let j = 0; j<noi_xu_ly.length;j++){
                if(noi_xu_ly[j].t == 2) res.data[i].noiXuLy = noi_xu_ly[j].n
              }
            }else {
              res.data[i].noiXuLy = ""
            }
          }
        }
        this.setState({
          data: res.data,
          isLoading: false
          // text:text
        });
      }else{
        this.setState({
            isLoading: false
            // text:text
          });
      }
    });
  }

  timKiemNhan(text){
    NhanNhiemVuAPI.getTimKiemNhiemVuNhan(text).then(res => {
      if (res != null) {
        if (res.data.length > 0) {
          StorageService.saveValue("search_task_pick", text);
          for(let i = 0 ;i<res.data.length;i++){
            if(res.data[i].referInfo){
              let noi_xu_ly = JSON.parse(res.data[i].referInfo)
              for(let j = 0; j<noi_xu_ly.length;j++){
                if(noi_xu_ly[j].t == 2) res.data[i].noiXuLy = noi_xu_ly[j].n
              }
            }else {
              res.data[i].noiXuLy = ""
            }
          }
        }
        this.setState({
          data: res.data,
          isLoading: false
          // text:text
        });
      }else{
        this.setState({
            isLoading: false
          });
      }
    });
  }

  //todo đổi sang danh sách giao nhiệm vụ
  // doiDanhSachGiaoNhiemVu(text) {
  //   NhanNhiemVuAPI.getDsNhiemVuGiao(text).then(res => {
  //     if (res != null) {
  //       for(let i = 0 ;i<res.data.length;i++){
  //         if(res.data[i].referInfo){
  //           let noi_xu_ly = JSON.parse(res.data[i].referInfo)
  //           for(let j = 0; j<noi_xu_ly.length;j++){
  //             if(noi_xu_ly[j].type == 2) res.data[i].noiXuLy = noi_xu_ly[j].name
  //           }
  //         }else {
  //           res.data[i].noiXuLy = ""
  //         }
  //       }
  //       this.setState({
  //         data: res.data,
  //         isLoading: false,
  //         // text: ""
  //       });
  //     }else{
  //       this.setState({
  //           isLoading: false,
  //           // text: ""
  //         });
  //     }
  //   });
  // }
  //todo đổi sang danh sách nhận nhiệm vụ
  // doiDanhsachNhanNhiemVu(text) {
  //   NhanNhiemVuAPI.getDsNhiemVuNhan(text).then(res => {
  //     if (res != null) {
  //       for (let i = 0; i < res.data.length; i++) {
  //         res.data[i].noiXuLy = this.getNoiXuLy(res.data[i].referInfo)
  //       }
  //       this.setState({
  //         data: res.data,
  //         isLoading: false,
  //         // text: ""
  //       });
  //     }else{
  //       this.setState({
  //           isLoading: false,
  //         });
  //     }
  //   });
  // }

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

  renderItems() {
    if (this.state.isLoading) {
      return (
        <AppIndicator />
      );
    }
    if (this.state.data.length == 0)
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 400
          }}
        >
          <Image
            source={require("../../../../assets/images/search_not_found.png")}
            style={{ width: scale(198), height: scale(198) }}
          />
          <Text
            style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
          >
            Không tìm thấy kết quả
          </Text>
        </View>
      );
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }
  getColorType(type) {
    switch (type) {
      case "0":
        return "#fc7c43";
      case "1":
        return "#4169a3";
      case "3":
        return "#ed3229";
      default:
        return "#999999";
    }
  }

  getType(type){
    switch (type) {
      case "0":
        return "Chưa xử lý";
      case "1":
        return "Đang xử lý";
      case "3":
        return "Quá hạn xử lý";
      default:
        return "Đã xử lý";
    }
  }
  getIsDone(value) {
    if (value == 1121) return true;
    return false;
  }

  listItems(value) {
    // alert(value.length)
    return value.map((data, i) => {
      let isDone = this.getIsDone(data.trangThai);
      return (
        <TouchableOpacity
          style={{
            backgroundColor: isDone ? "#F7F6F7" : "white",
            width: "100%",
            height: scale(140),
            flexDirection: "row",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("NhiemVuChiTiet", {
              taskID: data.newId,
              task_type: this.state.task_type,
              trangThaiId: data.process,
            });
          }}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: scale(77),
                height: scale(77)
              }}
              source={data.icon}
            />
          </View>
          {/* todo here */}
          <View style={{ flex: 6, justifyContent: "center", marginRight: 10 }}>
            <Text
              line={2}
              style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}
            >
              {data.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    fontSize: FONT_SIZE_SUB,
                    color: "#888888"
                  }}
                >
                  {data.noiXuLy}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: this.getColorType(data.process)
                  }}
                >
                {this.getType(data.process)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    var task_type = this.state.task_type;
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require("../../../../images/headerbg.jpg")}
          style={{
            width: "100%",
            height: headerHeight,
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            justifyContent: "center"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: scale(587),
                height: scale(60),
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-search" style={{ color: "#ffffff" }} />
              </TouchableOpacity>
              <TextInput
                style={{
                  fontSize: FONT_SIZE_MAIN,
                  flex: 90,
                  height: 40,
                  color: "white"
                }}
                autoFocus = {true}
                onChangeText={text => {
                  this.setState({ text });
                  // todo search theo text
                }}
                returnKeyType="search"
                onSubmitEditing={() => {
                  if (this.state.task_type) {
                    this.getTimKiemNhanNhiemVu(this.state.text);
                  } else {
                    this.getTimKiemGiaoNhiemVu(this.state.text);
                  }
                }}
                underlineColorAndroid="transparent"
                placeholder="Tìm kiếm"
                placeholderTextColor="#ffffff"
                value={this.state.text}
              />
              {this.state.text ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ text: "" });
                    if (this.state.data.length == 0) {
                      if (this.state.task_type) {
                            this.getTimKiemNhanNhiemVu("");
                      } else {
                            this.getTimKiemGiaoNhiemVu("");
                      }
                    }
                  }}
                >
                  <Image
                    style={{
                      width: scale(32),
                      height: scale(32),
                      marginRight: 10
                    }}
                    source={require("../../../../assets/images/lich-su/history-cancel.png")}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Text
              style={{
                color: "white",
                marginTop: 10,
                marginLeft: scale(48),
                fontSize: FONT_SIZE_MAIN
              }}
            >
              Huỷ
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <Content
          style={{ backgroundColor: "#efefef", marginBottom: footerMargin }}
        >
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              width: scale(682),
              height: scale(64),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: '#efefef'
            }}
          >
            <View
              style={{
                height: "100%",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  // backgroundColor: task_type ? "#3D5F8F" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                  // borderBottomWidth:1,
                  // borderBottomColor:'#666666',
                }}
                onPress={() => {
                  if (!this.state.task_type) {
                    this.setState({
                      isLoading: true,
                      data: [],
                      task_type: true
                    });
                    this.getTimKiemNhanNhiemVu(this.state.text);
                  }
                }}
              >
                <View style={{
                  height: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: task_type ? '#666666' : '#efefef'
                }}>
                  <Text
                    style={{
                      height: '100%',
                      color: task_type ? "#666666" : "#999999",
                      fontSize: FONT_SIZE_MAIN
                    }}
                  >
                    NHẬN NHIỆM VỤ
                </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  // backgroundColor: task_type ? "white" : "#3D5F8F",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  if (this.state.task_type) {
                    this.setState({
                      isLoading: true,
                      data: [],
                      task_type: false
                    });
                    this.getTimKiemGiaoNhiemVu(this.state.text);
                  }
                }}
              >
                <View style={{
                  height: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: task_type ? '#efefef' : '#666666'
                }}>
                  <Text
                    style={{
                      height: '100%',
                      color: task_type ? "#999999" : "#666666",
                      fontSize: FONT_SIZE_MAIN
                    }}
                  >
                    GIAO NHIỆM VỤ
                </Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

          {this.renderItems()}
        </Content>
        <Footer select="0" />
      </Container>
    );
  }
}
