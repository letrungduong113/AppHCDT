import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StorageService from "../../../services/storage-service";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text,
  Footer
} from "native-base";
import styles from "./styles";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale } from "../../user-controls/utilities/Scale";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import AppIndicator from "../../user-controls/AppIndicator";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
var headerHeight = scale(123);

export default class TimKiemVanBanScreen extends Component {
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
      data: [],
      text: "",
      text_type: this.props.navigation.getParam("text_type") // true = văn bản đến, false = văn bản đi
    };
  }

  componentDidMount() {
    if (this.state.text_type) {
        this.getTimKiemVanBanDen("");
    } else {
        this.getTimKiemVanBanDi("");
    }
  }

  getTimKiemVanBanDen(text) {
    if(text == "" ){
      StorageService.loadValue("search_text_come").then(value => {
        if (value == undefined) value = "";
        this.timKiemDen(value);
      });  
    }
    else{
      this.timKiemDen(text);
    }
  }

  getTimKiemVanBanDi(text) {
    if(text == "" ){
      StorageService.loadValue("search_text_go").then(value => {
        if (value == undefined) value = "";
        this.timKiemDi(value);
      });  
    }
    else{
      this.timKiemDi(text);
    }
  }

  timKiemDi(text){
    DanhSachVanBanAPI.getTimKiemVanBanDi(text).then(res => {
      // alert(JSON.stringify(res))
      if (res != null) {
        if (res.data.length > 0) {
          StorageService.saveValue("search_text_go", text);
          // for (let i = 0; i < res.data.length; i++) {
          //   res.data[i].noiXuLy = this.getNoiXuLy(res.data[i].referInfo)
          // }
        }
        this.setState({
          data: res.data,
          isLoading: false
          // text:text
        });
      }
    });
  }

  timKiemDen(text){
    DanhSachVanBanAPI.getTimKiemVanBanDen(text).then(res => {
      // alert(JSON.stringify(res))
      if (res != null) {
        if (res.data.length > 0) {
          StorageService.saveValue("search_text_come", text);
          // for (let i = 0; i < res.data.length; i++) {
          //   res.data[i].noiXuLy = this.getNoiXuLy(res.data[i].referInfo)
          // }
        }
        this.setState({
          data: res.data,
          isLoading: false
        });
      }else{
        this.setState({
          isLoading: false
        });
      }
    });
  }

  getLoaiVanBan(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      // var textFormat = arr[1]
      if (arr[0]) {
        arr2 = arr[0].split(",");
        return arr2[0];
      }
      return "";
    }
  }

  renderItems() {
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
    if (this.state.data == null){
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
    }
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }

  getColorType(type) {
    switch (type) {
      case 1119:
        return "#fc7c43";
      case 1120:
        return "#4169a3";
      case 1122:
        return "#ed3229";
      default:
        return "#999999";
    }
  }

  getIsDone(value) {
    if (value == 1121) return true;
    return false;
  }

  listItems(value) {
    return value.map((data, i) => {
      let isDone = this.getIsDone(data.trangThai);
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            height: scale(140),
            width: "100%",
            backgroundColor: isDone ? "#f6f6f6" : "white",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#eeeeee"
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("VanBanChiTiet", {
              id: data.id,
              text_type: this.state.text_type,
              trangThaiId :data.trangThai,
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
              style={{ width: scale(77), height: scale(77) }}
              source = {data.icon}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: FONT_SIZE_MAIN,
                color: "#333333",
                marginRight: 20
              }}
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
                   {this.getLoaiVanBan(data.videoLink)}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: this.getColorType(data.trangThai)
                  }}
                >
                  {data.tenTrangThai}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    var text_type = this.state.text_type;
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
                borderColor: "lightgray",
                borderWidth: 1,
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.5)"
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
                  
                }}
                returnKeyType="search"
                onSubmitEditing = {()=>{
                  if (this.state.text_type) {
                    this.getTimKiemVanBanDen(this.state.text);
                  } else {
                    this.getTimKiemVanBanDi(this.state.text);
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
                    //todo search theo text = false
                    this.setState({ text: '' })
                    if (this.state.text_type) {
                      this.getTimKiemVanBanDen("");
                    } else {
                      this.getTimKiemVanBanDi("");
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

          <Text
            style={{
              color: "white",
              marginTop: 10,
              marginLeft: scale(48),
              fontSize: FONT_SIZE_MAIN
            }}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            Huỷ
          </Text>
        </ImageBackground>
        <Content  style={{ backgroundColor: "#efefef"}}>
          <View
            style={{
              backgroundColor:'#efefef',
              margin: 10,
              width: scale(682),
              height: verticalScale(64),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                // backgroundColor: text_type ? "#3d5f90" : "white",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                if (!this.state.text_type) {
                  this.setState({
                    isLoading: true,
                    data: [],
                    text_type: true
                  })
                  this.getTimKiemVanBanDen(this.state.text);
                }
              }}
            >
              <View style={{
                height: '100%',
                borderBottomWidth: 1,
                borderBottomColor: text_type ? '#666666' : '#efefef'
              }}>
                <Text
                  style={{
                    color: text_type ? "#666666" : "#999999",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  VĂN BẢN ĐẾN
              </Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                // backgroundColor: "white",
                // backgroundColor: text_type ? "white" : "#3d5f90",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                if (this.state.text_type) {
                  this.setState({
                    isLoading: true,
                    data: [],
                    text_type: false
                  })
                  this.getTimKiemVanBanDi(this.state.text);
                }
              }}
            >
              <View style={{
                height: '100%',
                borderBottomWidth: 1,
                borderBottomColor: text_type ? '#efefef' : '#666666'
              }}>
                <Text
                  style={{
                    color: text_type ? "#999999" : "#666666",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  VĂN BẢN ĐI
              </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.renderItems()}
        </Content>
      </Container>
    );
  }
}
