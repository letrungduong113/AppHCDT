import React, { Component } from "react";
import { TouchableOpacity, Image, Modal,StatusBar, ImageBackground, Dimensions, FlatList, Platform, Switch } from "react-native";
import { connect } from "react-redux";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import TienIchAPI from "../../services/api-service/tien-ich-api";
// import StorageService from "../../services/storage-service";
import {getPaddingTop,getHeaderSize} from '../user-controls/utilities/StatusBar'
import PropTypes from 'prop-types';
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
    Footer,
    View,

} from "native-base";

import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import { rootAPI } from "../../services/api-service";
import StorageService from "../../services/storage-service";
import styles from "./styles";
import TouchID from 'react-native-touch-id';
import { scale, verticalScale, moderateScale } from '../../components/user-controls/utilities/Scale'
const deviceWidth = Dimensions.get('window').width;
var bottomHeight = verticalScale(109)
import LogoutModal from "./thong-bao-logout";
import AppIndicator from "../user-controls/AppIndicator";
import InputModalPass from "./re-pass";
import InputModalNewPass from "./new-pass";
import {GROBAL_RESOUCE} from "../../../assets/strings/string-bn"
var backHeight = scale(37)
var backWidth = scale(41)

export default class TaiKhoanScreen extends Component {
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
            profile: {},
            device: {},
            touchIdSupport: false,
            touchIdCheck: false,
            showModalLogout: false,

            modalRePassVisible: false,
            modalNewPassVisible: false,
        }
        this.checkTouchId();
    }

    async getDeviceNumber() {
        let device = await StorageService.loadValue("device");
        this.setState({ device: device })
        //console.log('setState', this.state.deviceId)
        // alert(this.state.device);
      }

    checkTouchId() {
        // check touch sp
        const optionalConfigObject = {
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
        }

        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    this.setState({ touchIdSupport: true })
                } else {
                    this.setState({ touchIdSupport: true })
                }
            })
            .catch(error => {
                this.setState({ touchIdSupport: false })
            })


        StorageService.loadValue("touchId").then(value => {
            if (value != null)
                this.setState({ touchIdCheck: value == "true" });
        });
    }
    changeTouch(value) {
        StorageService.saveValue("touchId", value ? "true" : "false");
        this.setState({ touchIdCheck: value });
    }
    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }

    componentDidMount() {
        TienIchAPI.getThongTinCaNhan().then((res) => {
            this.setState({ profile: res, isLoading: false });
            // alert(res);
        });
        this.getDeviceNumber();
    }
    executeLogout = () => {
        rootAPI.logOut(this.state.device).then((response) => {
            // if (response && response.isSuccess) {
            // }
            this.props.navigation.navigate('Login');
        })
    }
    renderLogout() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.5}
                visible={this.state.showModalLogout}
                onRequestClose={() => { }}
            >
                <LogoutModal
                    title="Đăng xuất"
                    content="Bạn có muốn kết thúc phiên đăng nhập này không?"
                    button="ĐỒNG Ý"
                    logout={() => this.executeLogout()}
                    onClose={() => this._closeModalLogout()}
                />
            </Modal>
        )
    }

    _closeModalLogout() {
        this.setModalVisibleLogout(false)
    }
    setModalVisibleLogout(visible) {
        this.setState({ showModalLogout: visible });
    }
    renderTouchId() {
        if (this.state.touchIdSupport) {
            return (
                <View style={styles.item}>
                    <View style={{ width: scale(31), height: scale(30), marginStart: 10, justifyContent: "center" }}>
                        <Image source={require('../../../images/logo/shape_2.png')} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.textItem}>
                        Đăng nhập bằng vân tay
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Switch
                            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                            onValueChange={(value) => this.changeTouch(value)}
                            value={this.state.touchIdCheck} />
                    </View>
                </View>
            )
        } else {
            return (
                <View />
            )
        }

    }

    renderChucVu(data){
        return data.map((data, i)=>{
          return( 
            <Text style={{color: '#ffe3ae',fontSize: scale(24)}}>{data.ten}</Text>
          );
        });
      }

      ConfirmPass(){
          if(true){
              this.setState({ modalNewPassVisible: true });
          }
        //   else alert("hihi");
      }
      renderModalRePass() {
        return (
          <Modal
            animationType="fade"
            transparent={true}
            backdropOpacity={0.5}
            visible={this.state.modalRePassVisible}
            onRequestClose={() => { }}
          >
            <InputModalPass
              title="Thay đổi mật khẩu"
              content="Nhập mật khẩu hiện tại của bạn"
              button="ĐỒNG Ý"
              onClose={() => this.setState({ modalRePassVisible: false })}
              onSend={(un, em) => { this.ConfirmPass(un, em); this.setState({ modalRePassVisible: false }) }}
            />
          </Modal>
        )
      }

      renderModalNewPass() {
        return (
          <Modal
            animationType="fade"
            transparent={true}
            backdropOpacity={0.5}
            visible={this.state.modalNewPassVisible}
            onRequestClose={() => { }}
          >
            <InputModalNewPass
              title="Thay đổi mật khẩu"
              content="Nhập mật khẩu mới của bạn"
              button="ĐỒNG Ý"
              onClose={() => this.setState({ modalNewPassVisible: false })}
              onSend={(un, em) => { this.setState({ modalNewPassVisible: false }) }}
            />
          </Modal>
        )
      }
      



    render() {
        if (this.state.isLoading) {
            return (
                <AppIndicator/>
            )
        }
        else
            return (
                <Container style={styles.container}>
                    {this.renderModalRePass()}
                    {this.renderModalNewPass()}
                    <Content style={{ flex: 1, marginBottom: -verticalScale(15) }}>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} /> 
                        <ImageBackground source={GROBAL_RESOUCE.IMAGE_BACKGROUND_HEADER} style={{ width: deviceWidth }} resizeMode='cover'>
                            <View style={styles.header}>
                                <View style={styles.image} >
                                    {this.state.profile&&this.state.profile.avtImg?(<Image source={this.state.profile.avtImg} style={{ width: '100%', height: '100%', borderRadius: scale(75), }} />):(<View/>)}
                                </View>
                                <Text style={styles.textName}>{this.state.profile&&this.state.profile.hoTen ? this.state.profile.hoTen.toUpperCase() : ''}</Text>
                                <View style={{flexDirection: "row"}}>
                                {this.state.profile&&this.state.profile.cacChucVu?this.renderChucVu(this.state.profile.cacChucVu):<View/>}
                                </View>
                                <Text style={styles.textMajor}>{this.state.profile&&this.state.profile.donVi && this.state.profile.donVi.name ? this.state.profile.donVi.name : ''}</Text>
                                
                                
                            </View>
                            
                        </ImageBackground>
                        <TouchableOpacity
                                    style={{position:'absolute',top:getPaddingTop(),left:backWidth/2}}
                                    onPress={() => this.props.navigation.goBack(null)}
                                    >
                                    <View style={{width: '100%', height: '100%', justifyContent: "center", alignItems: "center"}}>
                                    <Image source={GROBAL_RESOUCE.IMAGE_BACK} style={{width: backWidth, height: backHeight}} />
                                    </View>
                                </TouchableOpacity>
                        {/* <TouchableOpacity> */}
                        <View style={styles.item}>
                            <View style={{ width: scale(41), height: scale(31), marginStart: 10, justifyContent: "center" }}>
                                <Image source={require('../../../images/logo/mail.png')} style={styles.buttonIcon} />
                            </View>
                            <Text style={styles.textItem}>
                                {this.state.profile&&this.state.profile.email ? this.state.profile.email : ''}
                            </Text>
                        </View>
                        {/* </TouchableOpacity> */}

                        {/* <TouchableOpacity > */}
                        <View style={styles.item}>
                            <View style={{ width: scale(35), height: scale(35), marginStart: 10, justifyContent: "center" }}>
                                <Image source={require('../../../images/logo/call_answer.png')} style={{
                                    width: '100%',
                                    height: '100%',
                                }} />
                            </View>
                            <Text style={styles.textItem}>
                                {this.state.profile&&this.state.profile.dienThoaiDiDong ? this.state.profile.dienThoaiDiDong : ''}
                            </Text>
                        </View>
                        {/* </TouchableOpacity> */}

                        <TouchableOpacity onPress={()=>this.setState({ modalRePassVisible: true })}>
                            <View style={styles.item}>
                                <View style={{ width: scale(30), height: scale(39), marginStart: 10, justifyContent: "center" }}>
                                    <Image source={require('../../../images/logo/change_pass.png')} style={styles.buttonIcon} />
                                </View>
                                <Text style={styles.textItem}>
                                    Thay đổi mật khẩu
                                </Text>
                                <Icon active name="ios-arrow-forward" style={styles.buttonGo} />
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity> */}
                        {this.renderTouchId()}
                        {/* </TouchableOpacity> */}
                        <View style={styles.item}>
                            <View style={{ width: scale(33), height: scale(40), marginStart: 10, justifyContent: "center" }}>
                                <Image source={require('../../../images/logo/ring_profile.png')} style={styles.buttonIcon} />
                            </View>
                            <Text style={styles.textItem}>
                            Nhận thông báo
                            </Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Switch
                                    style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                    onValueChange={(value) => this.changeTouch(value)}
                                    value={this.state.touchIdCheck} 

                                    />
                            </View>
                        </View>
                        
                        <TouchableOpacity style={{ marginTop: scale(16) }} onPress={()=>this.props.navigation.navigate('LichSuCaNhan')}>
                            <View style={styles.item}>
                                <View style={{ width: scale(30), height: scale(39), marginStart: 10, justifyContent: "center" }}>
                                    <Image source={require('../../../images/logo/change_pass.png')} style={styles.buttonIcon} />
                                </View>
                                <Text style={styles.textItem}>
                                    Lịch sử hoạt động
                                </Text>
                                <Icon active name="ios-arrow-forward" style={styles.buttonGo} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: scale(16) }} onPress={() => this.setState({ showModalLogout: true })}>

                            <View style={styles.item}>
                                <View style={{ width: scale(37), height: scale(38), marginStart: 10, justifyContent: "center" }}>
                                    <Image source={require('../../../images/logo/logout.png')} style={styles.buttonIcon} />
                                </View>
                                <Text style={styles.textItem}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>


                    </Content>
                    {/* <TouchableOpacity style={{ backgroundColor: 'white', alignItems: "center", justifyContent: 'center', marginBottom: 10 }}
          onPress={this.executeLogout}>

          <View style={{ width: '100%', height: 50, alignItems: "center", justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: 26, height: 26, marginRight: 10, justifyContent: "center" }}>
              <Image source={require('../../../images/logo/log_out.png')} style={{width: '90%',height: '100%',}} />
            </View>
            <Text style={{ color: '#868686', fontSize: 16 }}>ĐĂNG XUẤT</Text>
          </View>
        </TouchableOpacity> */}
                    {this.renderLogout()}
                    <Footer style={[{ height: bottomHeight, backgroundColor: 'transparent' }, Platform.OS == 'ios' ? { borderWidth: 0, borderColor: 'transparent' } : {}]}>
                        <View>
                            <CustomTabs2 active='0'></CustomTabs2>
                        </View>
                    </Footer>
                </Container>
            );
    }
}


// function bindAction(dispatch) {
//   return {
//     setIndex: index => dispatch(setIndex(index)),
//     openDrawer: () => dispatch(openDrawer())
//   };
// }
// const mapStateToProps = state => ({
//   name: state.user.name,
//   list: state.list.list
// });

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(TaiKhoanScreen);
// const DrawNav = DrawerNavigator(
//   {
//     Announce: { screen: AnnounceSwagger },
//   },
//   {
//     contentComponent: props => <DrawBar {...props} />
//   }
// );
// const DrawerNav = null;
// DrawNav.navigationOptions = ({ navigation }) => {
//   DrawerNav = navigation;
//   return {
//     header: null
//   };
// };
// export default DrawNav;
