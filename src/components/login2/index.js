import React, { Component } from "react";
import {
  Image,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Modal,
  AsyncStorage,
  TextInput,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { rootAPI } from "../../services/api-service";
import StorageService from "../../services/storage-service";
import PropTypes from "prop-types";
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn.js";
// import Modal from "react-native-modal";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { setUser } from "../../redux/actions/user";
import { updateUserId } from "../../redux/actions/user1";
import styles from "./styles";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import ThongBaoModal from "./thong-bao-1";
import ThongBaoModalPass from "./thong-bao-2";
import ThongBaoVanTay from "./thong-bao-van-tay";
import TouchID from "react-native-touch-id";
import AppIndicator from "../user-controls/AppIndicator";
//import { asyncLocalStorage } from "redux-persist/storages";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const NEW_CATEGORY = {
  KHAN_CAP: 1,
  MUC_TIEU: 2,
  NHIEM_VU: 3,
  BAO_CAO: 4,
  VAN_BAN: 5,
  QL_NOI_BO: 6,
  DU_LUAN: 7,
  HC_CONG: 8,
  LICH_CT: 9,
  ALL_CAT: 0
};

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

const getJumpPoint = pointer => {
  switch (pointer) {
    case "1":
      return "KhanCapChiTiet";
    case "2":
      return "BaoCaoKTXHChiTiet";
    case "3":
      return "NhiemVuChiTiet";
    case "5":
      return "VanBanChiTiet";
    case "14":
      return "ChiTietDuAnScreen";
    default:
      return "HomeNavigator";
  }
};
class Login2 extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    setUser: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userName: "",
      password: "",
      passwordTouch: "",
      deviceId: "", //device token notification
      deviceType: "ANDROID", // loại thiết bị
      appName: "QUANLY", // app sử dụng
      isLoginFailed: false,
      isLogging: false,
      modalVisible: false,
      modalForgetPassVisible: false,
      iconUser: "",
      iconPw: "",
      isWelcome: false,
      isTouchId: false,
      touchIdSupport: false,
      showTouchDialog: false,
      buttonColor: "#d64d4a",
      disableButton: true
    };
  }
  // componentWillMount(){
  //   StorageService.loadValue("account").then(value => {
  //     if (value != null) this.setState({ userName: value, iconUser: true, isWelcome: true });
  //   });
  // }
  componentDidMount() {
    if (__DEV__) {
      this.setState({ password: "123", disableButton: false });
    }
    StorageService.loadValue("account").then(value => {
      if (value != null)
        this.setState({ userName: value, iconUser: true, isWelcome: true });
    });

    StorageService.loadValue("username").then(value => {
      if (value != null) this.setState({ name: value });
    });

    StorageService.loadValue("password").then(value => {
      if (value != null) this.setState({ passwordTouch: value });
    });

    StorageService.loadValue("touchId").then(value => {
      if (value != null && value == "true") {
        this.setState({ isTouchId: true });
        this.touchId();
      }
    });
    // check device
    if (Platform.OS == "ios") {
      this.setState({
        deviceType: "APPLE"
      });
    } else {
      this.setState({
        deviceType: "ANDROID"
      });
    }
    this.getToken();
    // check touch sp
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === "FaceID") {
          this.setState({ touchIdSupport: true });
        } else {
          this.setState({ touchIdSupport: true });
        }
      })
      .catch(error => {
        this.setState({ touchIdSupport: false });
      });
  }
  setUser(name) {
    this.props.setUser(name);
  }
  executeLogin = (id, pass) => {
    loginInfo = {
      username: id,
      password: pass,
      deviceId: this.state.deviceId,
      deviceType: this.state.deviceType,
      appName: this.state.appName
    };
    //console.log(this.state.deviceId);
    // alert('login '+id+"-"+pass)
    //   alert('123')
    this.setState({ isLoginFailed: false, isLogging: true });
    rootAPI.logIn(loginInfo).then(data => {
      //if (true) { /** Replace by below code line if your LOGIN API is available **/
      //console.log(JSON.stringify(data));
      if (data) {
        this.props.updateUserId(data.id);
        StorageService.saveValue("account", id);
        StorageService.saveValue("password", pass);
        StorageService.saveValue("username", data.hoTen);
        // StorageService.saveValue(
        //   "apiCodes",
        //   JSON.stringify(data.apiCodes)
        // );
        StorageService.saveValue("device", data.device + "");
        if (
          this.state.touchIdSupport &&
          !this.state.isTouchId &&
          !this.state.isWelcome
        ) {
          setTimeout(() => {
            this.setState({ showTouchDialog: true });
          }, 500);
        } else {
          this.navigateProcessing();
        }

        this.setState({ isLoginFailed: false, isLogging: false });
      } else {
        this.setState({ isLogging: false });
        this.setModalVisible(true);
      }
    });
    // this.props.navigation.navigate("HomeScreenOption2");
    // this.setState({ isLoginFailed: false, isLogging: false });
  };

  navigateProcessing() {
    AsyncStorage.getItem("notiData", (error, result) => {
      if (error || !result) {
        this.props.navigation.navigate("HomeScreenOption2");
      } else {
        data = JSON.parse(result);
        // alert(getJumpPoint(data.CateID))
        this.props.navigation.navigate("HomeScreenOption2");
        this.props.navigation.navigate(getJumpPoint(data.CateID), {
          id: data.NewsID
        });
        AsyncStorage.removeItem("notiData");
        //console.log("============================",result);
      }
    });
    // .then((result)=> {
    //   AsyncStorage.removeItem("notiData");
    //   console.log("================then function============",result);
    // });
  }
  executeForgotPass = (id, mail) => {
    rootAPI.forgotpass(id, mail).then(data => {
      if (data) {
        // alert(JSON.stringify(response.headers.map.authorization[0]));
        //alert("ahihi");
      }
    });
  };

  renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.5}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <ThongBaoModal
          title="Thông báo"
          content="Tên truy cập hoặc mật khẩu của bạn không đúng"
          button="OK"
          onClose={() => this.setState({ modalVisible: false })}
        />
      </Modal>
    );
  }
  _closeModal() {
    this.setState({
      modalVisible: false
    });
  }
  setModalVisible(visible) {
    setTimeout(() => {
      this.setState({ modalVisible: visible });
    }, 500);

    // this.setState({ modalVisible: visible });
  }
  setThongBao() {
    // alert('123');
  }
  renderModalVanTay() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.5}
        visible={this.state.showTouchDialog && this.state.touchIdSupport}
        onRequestClose={() => {}}
      >
        <ThongBaoVanTay
          title="Mở khóa bằng vân tay"
          content="Sử dụng vân tay để đăng nhập vào ứng dụng nhanh chóng và tiện lợi"
          button="OK"
          touchEnable={() => StorageService.saveValue("touchId", "true")}
          onClose={() => this._closeModalVanTay()}
        />
      </Modal>
    );
  }

  _closeModalVanTay() {
    this.setState({
      showTouchDialog: false
    });
    this.navigateProcessing();
  }
  setModalVisibleVanTay(visible) {
    this.setState({ showTouchDialog: visible });
  }

  renderModalForgetPass() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.5}
        visible={this.state.modalForgetPassVisible}
        onRequestClose={() => {}}
      >
        <ThongBaoModalPass
          title="Lấy lại mật khẩu"
          button="ĐỒNG Ý"
          onClose={() => this.setState({ modalForgetPassVisible: false })}
          onSend={(un, em) => {
            this.executeForgotPass(un, em);
            this.setState({ modalForgetPassVisible: false });
          }}
        />
      </Modal>
    );
  }
  _closeModalForgetPass() {
    this.setState({
      modalForgetPassVisible: false
    });
  }
  setModalForgetPassVisible(visible) {
    this.setState({ modalForgetPassVisible: visible });
  }
  hideIconUser() {
    this.setState({
      userName: "",
      iconUser: false
    });
  }
  hideIconPw() {
    this.setState({
      password: "",
      iconPw: false,
      disableButton: true
    });
  }
  touchId() {
    const optionalConfigObject = {
      title: GROBAL_RESOUCE.TITLE_TOUCH_ID, // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Đăng nhập bằng vân tay", // Android
      sensorErrorDescription: "Thất bại", // Android
      cancelText: "Hủy", // Android
      fallbackLabel: "", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate("Đăng nhập bằng vân tay", optionalConfigObject)
      .then(success => {
        this.executeLogin(this.state.userName, this.state.passwordTouch);
      })
      .catch(error => {
        console.log(error);
      });
  }
  loginRegister() {
    this.setState({
      isWelcome: false,
      userName: "",
      password: "",
      passwordTouch: "",
      isTouchId: false,
      iconUser: false,
      iconPw: false
    });
    StorageService.removeValue("account");
    StorageService.removeValue("password");
    StorageService.removeValue("username");
    StorageService.removeValue("touchId");
  }
  renderLoading() {}
  async getToken() {
    //console.log('getToken')
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    this.setState({ deviceId: fcmToken });
    //console.log('setState', this.state.deviceId)
  }
  render() {
    return (
      <Container style={{ position: "relative" }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={GROBAL_RESOUCE.IMAGE_BACKGROUND}
          style={{ width: deviceWidth, height: deviceHeight }}
          resizeMode="cover"
        />
        <Image
          source={require("../../../assets/images/nen.png")}
          style={{
            width: deviceWidth,
            height: deviceHeight,
            position: "absolute"
          }}
          resizeMode="cover"
        />

        <Modal
          animationType="fade"
          transparent={true}
          opacity={0.5}
          backdropOpacity={0.1}
          visible={this.state.isLogging}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            {/* <View style={{width: 150, height: 150, backgroundColor: "rgba(255,255,255,0.5)", justifyContent: 'center', alignItems: 'center'}}> */}
            <ActivityIndicator size="large" color="white" />
            <Text style={{ textAlign: "center", color: "white" }}>
              Đang đăng nhập...
            </Text>
            {/* </View> */}
          </View>
        </Modal>
        {this.renderModal()}
        {this.renderModalVanTay()}
        {this.renderModalForgetPass()}
        {/* {this.state.isLogging? (<AppIndicator/>):( */}
        <View style={styles.container}>
          <Content>
            <View
              style={{
                // backgroundColor: 'black',
                width: "100%",
                height: 50,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: verticalScale(161)
              }}
            >
              <Image
                source={GROBAL_RESOUCE.IMAGE_QUOC_HUY_LOGIN}
                style={{ width: scale(128), height: scale(128) }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: verticalScale(29)
              }}
            >
              <Text
                style={{
                  color: "#ffe3ae",
                  margin: 3,
                  fontSize: scale(31),
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {GROBAL_RESOUCE.APP_TITLE}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: scale(31)
                }}
              >
                {GROBAL_RESOUCE.APP_TITLE_2}
              </Text>
            </View>

            <View style={styles.bg}>
              <Text
                style={{
                  color: "red",
                  display: this.state.isLoginFailed ? "flex" : "none"
                }}
              >
                {" "}
                Lỗi: Tên người dùng hoặc mật khẩu không đúng.{" "}
              </Text>
              {this.state.isWelcome ? (
                <View
                  style={{
                    marginTop: verticalScale(-134),
                    height: verticalScale(232)
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: verticalScale(70),
                      color: "white",
                      fontSize: scale(28)
                    }}
                  >
                    Chào mừng đồng chí
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: scale(28)
                    }}
                  >
                    {
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: scale(28),
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.name}
                      </Text>
                    }
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: scale(55),
                    marginRight: scale(55)
                  }}
                >
                  <Icon
                    active
                    name="person"
                    style={{ fontSize: 30, marginRight: 5, color: "white" }}
                  />
                  <Input
                    onChangeText={text => {
                      this.setState({ userName: text });
                      if (text == "") {
                        this.setState({ iconUser: false });
                      } else {
                        this.setState({ iconUser: true });
                      }
                    }}
                    style={{ color: "white", fontSize: scale(28) }}
                    placeholder="Nhập tên tài khoản"
                    autoCapitalize="none"
                    placeholderTextColor="#rgba(255, 255, 255, 0.5)"
                    value={this.state.userName}
                    secureTextEntry={false}
                  />
                  {this.state.iconUser == true ? (
                    <TouchableOpacity onPress={() => this.hideIconUser()}>
                      <Image
                        source={require("../../../assets/images/login/shape_1.png")}
                        style={{ width: scale(32), height: scale(32) }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>
              )}
              {this.state.isWelcome ? (
                <View />
              ) : (
                <View
                  style={{
                    marginLeft: scale(55),
                    marginRight: scale(55),
                    height: 1,
                    backgroundColor: "white"
                  }}
                />
              )}

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: scale(55),
                  marginRight: scale(55),
                  alignItems: "center"
                }}
              >
                <Icon
                  active
                  name="lock"
                  style={{ fontSize: 30, marginRight: 5, color: "white" }}
                />
                <Input
                  onChangeText={text => {
                    this.setState({ password: text });
                    if (text == "") {
                      this.setState({ iconPw: false, disableButton: true });
                    } else {
                      this.setState({ iconPw: true, disableButton: false });
                    }
                  }}
                  style={{ color: "white", fontSize: scale(28) }}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={this.state.password}
                  secureTextEntry={true}
                  // returnKeyType="done"
                  // onEndEditing={() => {
                  // this.executeLogin(this.state.userName,this.state.password)
                  // }}
                />
                {this.state.iconPw == true ? (
                  <TouchableOpacity onPress={() => this.hideIconPw()}>
                    <Image
                      source={require("../../../assets/images/login/shape_1.png")}
                      style={{ width: scale(32), height: scale(32) }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
              <View
                style={{
                  marginLeft: scale(55),
                  marginRight: scale(55),
                  height: 1,
                  backgroundColor: "white"
                }}
              />

              <TouchableOpacity
                disabled={this.state.disableButton}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: scale(52),
                  marginRight: scale(52),
                  width: scale(616),
                  height: scale(84),
                  marginTop: scale(78),
                  alignSelf: "center",
                  backgroundColor: this.state.disableButton
                    ? "#d64d4a"
                    : "rgba(85,13,11,0.5)"
                }}
                //onPress={() => console.log('Đăng Nhập', this.state.deviceId+this.state.deviceType+this.state.appName)}
                onPress={() => {
                  //console.log('Device Token', this.state.deviceId)
                  this.executeLogin(this.state.userName, this.state.password);
                }}
              >
                <Text style={{ color: "white", justifyContent: "center" }}>
                  ĐĂNG NHẬP
                </Text>
              </TouchableOpacity>

              {/* <Icon name="lock" style={{fontSize: 20, marginRight: 5}}/> */}
            </View>

            <View
              style={{
                height: scale(27),
                alignItems: "center",

                marginTop: scale(35)
              }}
            >
              <Text
                onPress={() => this.setModalForgetPassVisible(true)}
                style={{ fontSize: scale(26), color: "#fab8b8" }}
              >
                Quên mật khẩu
              </Text>
            </View>
            {/* <TextInput
              style={[
                styles.border,
                { marginTop: 5, height: verticalScale(155), width: scale(650), padding: 5 }
              ]}
              multiline={true}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              //onChangeText={text => this.setState({ text })}
              textAlignVertical="top"
              placeholder="Token"
              placeholderTextColor="#333333"
              value={this.state.deviceId}
            /> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: scale(48),
                width: "100%",
                flexDirection: "row"
              }}
              opacity={this.state.isWelcome && this.state.isTouchId ? 1 : 0}
            >
              <TouchableOpacity onPress={() => this.touchId()}>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={GROBAL_RESOUCE.ICON_VAN_TAY}
                    style={{ width: scale(43), height: scale(46) }}
                  />
                  <Text
                    style={{
                      fontSize: scale(26),
                      color: "white",
                      marginLeft: scale(16)
                    }}
                  >
                    Sử dụng vân tay
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ flex: 1, marginTop: 50 }}
              onPress={() => {
                this.loginRegister();
              }}
            >
              <Text
                style={{
                  color: "white",
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: scale(28)
                }}
              >
                Đăng nhập tài khoản khác
              </Text>
            </TouchableOpacity>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setUser: name => dispatch(setUser(name))
  };
}

const mapStateToProps = state => ({
  name: state.user.name
});

export default connect(
  null,
  { updateUserId }
)(Login2);
