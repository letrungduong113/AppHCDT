import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppIndicator from "../../user-controls/AppIndicator";
import TienIchAPI from "../../../services/api-service/tien-ich-api";
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

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(24);
var headerHeight = scale(123);
var backHeight = verticalScale(37);
var backWidth = scale(41);

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  // if (pw.length > 12) {
  //   error.password = "max 11 characters";
  // }
  // if (pw.length < 5 && pw.length > 0) {
  //   error.password = "Weak";
  // }
  return error;
};

export default class TimkiemLichSu extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      text: "",
      data: [],
      dataAll: []
    };
  }
  componentDidMount() {
    // StorageService.loadValue("search_history").then(value => {
    //   if(value == null) value = ''
    //   TienIchAPI.getDsLichSuTimKiem(0, 10, value).then(res => {
    //     this.setState({ data: res, dataAll: res, isLoading: false });
    //   });
    // });
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
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
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }
  getIconType(type) {
    switch (type) {
      case 1:
        return require("../../../../assets/images/lich-su/history-type-1.png");
      case 2:
        return require("../../../../assets/images/lich-su/history-type-2.png");
      case 3:
        return require("../../../../assets/images/lich-su/history-type-3.png");
      default:
        return require("../../../../assets/images/lich-su/history-type-1.png");
    }
  }
  getColorType(type) {
    switch (type) {
      case 0:
        return "#8E8E8E";
      case 1:
        return "#F08D68";
      case 2:
        return "#37517D";
      default:
        return "#C14A49";
    }
  }
  listItems(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity
          style={{
            width: "100%",
            height: scale(126),
            backgroundColor: "white",
            flex: 1,
            flexDirection: "row",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5
          }}
          key={i}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              width: scale(70),
              height: scale(70)
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={data.icon}
            />
          </View>

          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {data.tieuDe}
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
                    color: "#999999"
                  }}
                >
                  {data.tenChucNang}
                </Text>
              </View>

              <View
                style={{ marginLeft: 10, height: 15, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: "#919191"
                  }}
                >
                  {data.ngayTacDongText}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    dataFind = this.state.dataAll;
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
                // onEndEditing={() => {
                //   TienIchAPI.getDsLichSuTimKiem(0, 10, this.state.text).then(
                //     res => {
                //       StorageService.saveValue(
                //         "search_history",
                //         this.state.text
                //       );
                //       this.setState({ data: res, isLoading: false });
                //     }
                //   );
                // }}
                underlineColorAndroid="transparent"
                placeholder="Tìm kiếm"
                placeholderTextColor="#ffffff"
                value={this.state.text}
              />

              {this.state.text ? (
                <TouchableOpacity
                  onPress={() => {
                    // data : dataFind.filter(element => element.trichYeu.includes(text))
                    this.setState({text:''})
                    // TienIchAPI.getDsLichSuTimKiem(0, 10, "").then(res => {
                    //   this.setState({
                    //     data: res,
                    //     dataAll: res,
                    //     isLoading: false,
                    //   });
                    // });
                    // alert(JSON.stringify(dataFind))
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
        <Content>{this.renderItems()}</Content>

        <Footer style={{ height: 60, backgroundColor: "transparent" }}>
          <View>
            <CustomTabs2 active="3" />
          </View>
        </Footer>
      </Container>
    );
  }
}