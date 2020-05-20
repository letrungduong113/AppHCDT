import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import theme from "../../themes/base-theme";
import PropTypes from "prop-types";
import {
  getHomePaddingTop,
  getHeaderSize
} from "../user-controls/utilities/StatusBar";
import MapView, { Marker } from "react-native-maps";
import TextTicker from "react-native-text-ticker";
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
  View
} from "native-base";
import { updateUserAvatar } from "../../redux/actions/user1";
import { updateMarkers } from "../../redux/actions/getMarkers";
import { updateNotiKhanCap } from '../../redux/actions/noti';
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn";
import { ENABLE_VIEW } from "../../../assets/strings/enable_view";
import Text from "../custom-view/text";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import AppIndicator from "../user-controls/AppIndicator";
// import styles from "./styles";
import Swiper from "react-native-swiper";
import HomeAPI from "../../services/api-service/home-api";
import KhanCapAPI from "../../services/api-service/khan-cap-api";
import LinearGradient from "react-native-linear-gradient";
import TienIchAPI from "../../services/api-service/tien-ich-api";
import SuKienHome from './su-kien-home';
import ItemLichcongtac from './item_lichcongtac'
import {
  scale,
  verticalScale,
  moderateScale
} from "../../components/user-controls/utilities/Scale";
import ItemXinYKien from "./item_xin_y_kien";
import ItemDocBao from "./item_docbao";
import ViewKhanCap from "./ViewKhanCap";
import ChatbotBox from "../user-controls/ChatbotBox";

var headerHeight = verticalScale(128);
var quochuy = scale(78);
var UBNDsize = scale(20);
var HCDTSize = scale(24);
var anhtinHeight = scale(318);
var anhtinWidth = scale(661);
var iconHeight = scale(116);
var iconWidth = scale(116);
var sizeTin1 = scale(26);
var sizeTin2 = scale(22);
var bodyHeight = verticalScale(1081.2);
var bottomHeight = verticalScale(109);
var avatar = scale(75);
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const LATITUDEDELTA = 0.25;
var IconLocation = scale(50);
const LONGITUDEDELTA =
  LATITUDEDELTA *
  (Dimensions.get("window").width / Dimensions.get("window").height);
class HomeScreenOption2 extends Component {
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
    this.map = null;
    listBtns = [
      {
        name: GROBAL_RESOUCE.MODULE_1,
        icon: GROBAL_RESOUCE.MODULE_1_ICON,
        screen: "BaoCaoVaDieuHanhScreen1",
        enable: ENABLE_VIEW.HOME_XEM_BAO_BAO_VA_DIEU_HANH
      },
      {
        name: GROBAL_RESOUCE.MODULE_2,
        icon: GROBAL_RESOUCE.MODULE_2_ICON,
        screen: "DonViDangPhuTrach",
        enable: ENABLE_VIEW.HOME_QUAN_LY_SO_NGANH
      },
      {
        name: GROBAL_RESOUCE.MODULE_3,
        icon: GROBAL_RESOUCE.MODULE_3_ICON,
        screen: "DiaPhuongDangPhuTrach",
        enable: ENABLE_VIEW.HOME_QUAN_LY_DIA_PHUONG
      },
      {
        name: GROBAL_RESOUCE.MODULE_9,
        icon: GROBAL_RESOUCE.MODULE_9_ICON,
        screen: "DonViTrucThuoc",
        enable: ENABLE_VIEW.HOME_TIEN_ICH
      },
      {
        name: GROBAL_RESOUCE.MODULE_4,
        icon: GROBAL_RESOUCE.MODULE_4_ICON,
        screen: "DsVanBan",
        enable: ENABLE_VIEW.HOME_VAN_BAN_DEN_DI
      },
      {
        name: GROBAL_RESOUCE.MODULE_5,
        icon: GROBAL_RESOUCE.MODULE_5_ICON,
        screen: "SuKienQuantrong",
        enable: ENABLE_VIEW.HOME_CAC_SU_KIEN_QUAN_TRONG
      },
      {
        name: GROBAL_RESOUCE.MODULE_6,
        icon: GROBAL_RESOUCE.MODULE_6_ICON,
        screen: "NguoiDan",
        enable: ENABLE_VIEW.HOME_Y_KIEN_NGUOI_DAN
      },
      {
        name: GROBAL_RESOUCE.MODULE_7,
        icon: GROBAL_RESOUCE.MODULE_7_ICON,
        screen: "MangXaHoi",
        enable: ENABLE_VIEW.HOME_MANG_XA_HOI
      },
      {
        name: GROBAL_RESOUCE.MODULE_8,
        icon: GROBAL_RESOUCE.MODULE_8_ICON,
        screen: "DsKetNoi",
        enable: ENABLE_VIEW.HOME_KET_NOI
      }

    ];

    this.state = {
      isLoading: false,
      listNews: [],
      profile: {},
      region: {
        latitude: 21.110085,
        longitude: 106.095694
      },
      // markers: [
      //   {
      //     id: 42,
      //     newsId: 1599,
      //     latitude: 21.114931106567383,
      //     longitude: 105.96138000488281,
      //     title:
      //       "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tGoá phụ bỏ lại 2 con, nhắn tin trước khi nhảy cầu Hồ tự tử",
      //     isHotFillter: 2
      //   }
      // ],
      //markers: this.props.markers,
      listData: [],
      listButtons: listBtns.filter(item => item.enable == true)
    };
  }
  // componentWillReceiveProps(props){
  //   if(props.makers)
  //     alert(props.makers.length)
  // }
  getIconLocation(capdo) {
    switch (capdo - 1) {
      case 1:
        return require("../../../configUI/imageLocation/Location_Green.png");
      case 2:
        return require("../../../configUI/imageLocation/Location_Orange.png");
      case 3:
        return require("../../../configUI/imageLocation/Location_Red.png");
      default:
        return require("../../../configUI/imageLocation/Location_Red.png");
    }
  }
  getColorEclipse(capdo) {
    switch (capdo - 1) {
      case 1:
        return require("../../../configUI/imageLocation/ellipse_Green.png");
      case 2:
        return require("../../../configUI/imageLocation/ellipse_Orange.png");
      case 3:
        return require("../../../configUI/imageLocation/ellipse_Red.png");
      default:
        return require("../../../configUI/imageLocation/ellipse_Red.png");
    }
  }
  componentDidMount() {
    TienIchAPI.getThongTinCaNhan().then(res => {
      if (res.avtLink) {
        // alert(JSON.stringify(res.avtLink))
        this.props.updateUserAvatar(res.avtLink);
      }
      this.setState({ profile: res, isLoading: false });
      // alert(JSON.stringify(res));
    });

    KhanCapAPI.getLocations().then(res => {
      if (res != null) {
        this.props.updateMarkers(res);
      }
    })
    // setInterval(() => {

    //   }, 5000);
    // })
    KhanCapAPI.getDsKhanCap(1, 1000, 0, 255).then(res => {
      //console.log("GET DS Khẩn Cấp Screen", res)
      // alert(JSON.stringify(res));
      if (res != null) {
        this.setState({
          listData: res,
          isLoading: false,
          //poster: res.nhiemVus[0].poster.uri
          poster: res.poster
        });
      }
    });
    HomeAPI.getTinHome(5).then((res)=>{
        // alert(JSON.stringify(res));
        this.setState({listNews: res,
           isLoading: false
          });
      });
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  _renderItem = ({ item }) => {
    if (item.id != 1) {
      return (
        <TouchableOpacity
        style={{width:(Dimensions.get("window").width-20)/3, justifyContent: "center", alignItems: "center", marginBottom: moderateScale(20)}}
          onPress={() => {
            this.props.navigation.navigate(item.screen);
          }}
        >
          <Image source={item.icon} style={styles._9icons} />
          <View style={styles.baotext}>
            <Text style={styles.text}>{item.name}</Text>
            {/* <Text style={[styles.text, {color: 'transparent'}]}>Khẩn cấp</Text> */}
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  ZoomBounds() {
    this.map.fitToCoordinates(this.state.markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  renderMap() {
    return (
      // <MapView
      //   ref={ref => {
      //     this.map = ref;
      //   }}
      //   style={{ height: verticalScale(368) }}
      //   onPress={() =>
      //     this.props.navigation.navigate("Maps", {
      //       region: this.state.region,
      //       markers: this.props.markers,
      //       listData: this.state.listData.newsEntity,
      //       navigation: this.props.navigation
      //     })
      //   }
      //   region={{
      //     latitude: 21.110085,
      //     longitude: 106.095694,
      //     latitudeDelta: LATITUDEDELTA,
      //     longitudeDelta: LONGITUDEDELTA
      //   }}
      //   scrollEnabled={true}
      //   zoomEnabled={true}
      // //onMapReady={() => this.state.markers.latitude ? this.ZoomBounds() : {}}
      // >
      //   {this.props.markers
      //     ? this.props.markers.map((marker, i) => (
      //       <Marker
      //         key={i}
      //         coordinate={{
      //           latitude: marker.latitude,
      //           longitude: marker.longitude
      //         }}
      //         title={marker.title}
      //       >
      //         {/* <ImageBackground
      //           source={this.getColorEclipse(marker.isHotFillter)}
      //           style={{
      //           height: IconLocation * 2,
      //           width: IconLocation * 2,
      //           justifyContent: "center",
      //           alignItems: "center"
      //           }}
      //       > */}
      //         <Image
      //           source={this.getIconLocation(marker.isHotFillter)}
      //           style={{ height: IconLocation, width: IconLocation }}
      //         />
      //         {/* </ImageBackground> */}
      //       </Marker>
      //     ))
      //     : null}
      // </MapView>
      <Swiper
            paginationStyle={{left: 2000000}}
            // activeDotColor='#d73d1f' 
            height={scale(380)}
            autoplay={true}
            autoplayTimeout={2}
            style={{marginTop: moderateScale(8)}} >
              <View activeOpacity={1} onPress={()=>{this.props.navigation.navigate("TinTucChiTietHome", {news_link: this.state.listNews[0]? this.state.listNews[0].news_link: ""})}} style={{justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center", width: anhtinWidth, height: anhtinHeight}}>
                  
                  <Image style={{marginTop: 10, alignItems: "center", position: "relative", resizeMode: 'cover', width: anhtinWidth, height: anhtinHeight}}
                    // source={{uri: this.state.listNews[0]? this.state.listNews[0].news_image: ""}} 
                    source={require('../../../assets/images/home_option2/1.png')}
                    />
                    
                    {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={{position: "absolute", top: 0, left: 0, width: anhtinWidth, height: anhtinHeight, marginTop: 10}}>
                      <View style={{position: "absolute", left: 10, right: 10, bottom: 10}}>
                        <Text style={{color: 'white', fontWeight: "bold", fontSize: sizeTin1}}>{this.state.listNews[0]? this.state.listNews[0].news_title: ""}</Text>
                        <Text style={{color: 'white', fontSize: sizeTin2}}>{this.state.listNews[0]? this.state.listNews[0].news_date: ""}</Text>
                      </View>
                    </LinearGradient> */}
                  
                </View>
              </View>
              
              <View activeOpacity={1} onPress={()=>{this.props.navigation.navigate("TinTucChiTietHome", {news_link: this.state.listNews[0]? this.state.listNews[0].news_link: ""})}} style={{justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center", width: anhtinWidth, height: anhtinHeight}}>
                  
                  <Image style={{marginTop: 10, alignItems: "center", position: "relative", resizeMode: 'cover', width: anhtinWidth, height: anhtinHeight}}
                    // source={{uri: this.state.listNews[0]? this.state.listNews[0].news_image: ""}} 
                    source={require('../../../assets/images/home_option2/2.png')}
                    />
                    
                    {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={{position: "absolute", top: 0, left: 0, width: anhtinWidth, height: anhtinHeight, marginTop: 10}}>
                      <View style={{position: "absolute", left: 10, right: 10, bottom: 10}}>
                        <Text style={{color: 'white', fontWeight: "bold", fontSize: sizeTin1}}>{this.state.listNews[0]? this.state.listNews[0].news_title: ""}</Text>
                        <Text style={{color: 'white', fontSize: sizeTin2}}>{this.state.listNews[0]? this.state.listNews[0].news_date: ""}</Text>
                      </View>
                    </LinearGradient> */}
                  
                </View>
              </View>
              
              <View activeOpacity={1} onPress={()=>{this.props.navigation.navigate("TinTucChiTietHome", {news_link: this.state.listNews[0]? this.state.listNews[0].news_link: ""})}} style={{justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center", width: anhtinWidth, height: anhtinHeight}}>
                  
                  <Image style={{marginTop: 10, alignItems: "center", position: "relative", resizeMode: 'cover', width: anhtinWidth, height: anhtinHeight}}
                    // source={{uri: this.state.listNews[0]? this.state.listNews[0].news_image: ""}} 
                    source={require('../../../assets/images/home_option2/3.png')}
                    />
                    
                    {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={{position: "absolute", top: 0, left: 0, width: anhtinWidth, height: anhtinHeight, marginTop: 10}}>
                      <View style={{position: "absolute", left: 10, right: 10, bottom: 10}}>
                        <Text style={{color: 'white', fontWeight: "bold", fontSize: sizeTin1}}>{this.state.listNews[0]? this.state.listNews[0].news_title: ""}</Text>
                        <Text style={{color: 'white', fontSize: sizeTin2}}>{this.state.listNews[0]? this.state.listNews[0].news_date: ""}</Text>
                      </View>
                    </LinearGradient> */}
                  
                </View>
              </View>
              
              {/* <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate("TinTucChiTietHome", {news_link: this.state.listNews[3]? this.state.listNews[3].news_link: ""})}} style={{justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center", width: anhtinWidth, height: anhtinHeight}}>
                  
                  <Image style={{width: anhtinWidth, height: anhtinHeight, marginTop: 10, alignItems: "center", position: "relative"}}
                    source={{uri: this.state.listNews[3]? this.state.listNews[3].news_image: ""}} />
                    
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={{position: "absolute", top: 0, left: 0, width: anhtinWidth, height: anhtinHeight, marginTop: 10}}>
                      <View style={{position: "absolute", bottom: 10, left: 10, right: 10}}>
                        <Text style={{color: 'white', fontWeight: "bold", fontSize: sizeTin1}}>{this.state.listNews[3]? this.state.listNews[3].news_title: ""}</Text>
                        <Text style={{color: 'white', fontSize: sizeTin2}}>{this.state.listNews[3]? this.state.listNews[3].news_date: ""}</Text>
                      </View>
                    </LinearGradient>
                  
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate("TinTucChiTietHome", {news_link: this.state.listNews[4]? this.state.listNews[4].news_link: ""})}} style={{justifyContent: "center", alignItems: "center"}}>
                
                <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center", width: anhtinWidth, height: anhtinHeight}}>
                  
                  <Image style={{width: anhtinWidth, height: anhtinHeight, marginTop: 10, alignItems: "center", position: "relative"}}
                    source={{uri: this.state.listNews[4]? this.state.listNews[4].news_image: ""}} />
                    
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,4)']} style={{position: "absolute", top: 0, left: 0, width: anhtinWidth, height: anhtinHeight, marginTop: 10}}>
                      <View style={{position: "absolute", bottom: 10, left: 10, right: 10}}>
                        <Text style={{color: 'white', fontWeight: "bold", fontSize: sizeTin1}}>{this.state.listNews[4]? this.state.listNews[4].news_title: ""}</Text>
                        <Text style={{color: 'white', fontSize: sizeTin2}}>{this.state.listNews[4]? this.state.listNews[4].news_date: ""}</Text>
                      </View>
                    </LinearGradient>
                  
                </View>
              </TouchableOpacity> */}
            </Swiper>
    )
  }
  render() {
    // var titleKhanCap = "";
    // for (var i = 0; i < Math.min(this.props.markers.length, 2); i++) {
    //   titleKhanCap =
    //     titleKhanCap + this.props.markers[i].title + ".                ";
    // }
    //   alert(titleKhanCap.length)
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={GROBAL_RESOUCE.IMAGE_BACKGROUND_HEADER}
          style={{
            width: "100%",
            height: Platform.OS == "ios" ? getHeaderSize() : headerHeight,
            flexDirection: "row",
            alignItems: "center",
            paddingTop: getHomePaddingTop(),
            position: "relative"
          }}
        >
          <View
            style={{ flex: 20, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={GROBAL_RESOUCE.IMAGE_QUOC_HUY_LOGIN}
              style={{ width: quochuy, height: quochuy }}
            />
          </View>

          <View style={{ flex: 60 }}>
            <Text style={{ color: "#FCD2AB", fontSize: UBNDsize }}>
              {GROBAL_RESOUCE.APP_TITLE}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: HCDTSize,
                color: "white",
                marginTop: scale(5)
              }}
            >
              {GROBAL_RESOUCE.APP_TITLE_2}
            </Text>
          </View>

          <View
            style={{ flex: 20, justifyContent: "center", alignItems: "center" }}
          >
            {/* <Image source={require('../../../assets/images/home/quochuy.png')} style={{width: avatar, height: avatar }}/> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TaiKhoan")}
              style={{
                width: avatar,
                height: avatar,
                borderColor: "white",
                borderWidth: 1,
                borderRadius: avatar / 2
              }}
            >
              {this.state.profile && this.state.profile.avtImg ? (
                <Image
                  source={this.state.profile.avtImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: avatar / 2
                  }}
                />
              ) : (
                  <View />
                )}
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Content style={{ marginBottom: -verticalScale(15) }}>
          <View style={{ flex: 1 }}>

            <View style={{ height: verticalScale(368) }}>
              {this.renderMap()}
              {/* <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('DsKhanCap')}>
                <Text style={{ color: '#999999', fontSize: scale(26) }}>Bản đồ cảnh báo</Text>
               </TouchableOpacity>
              </View> */}
              {/* <View style={{ position: 'absolute', top: verticalScale(40), right: 8 }}>
                <View style={{ shadowColor: '#A0A0A0', shadowOffset: { width: 0, height: 1 }, shadowRadius: 1, shadowOpacity: 1.0 }}>
                  <Image style={{ width: verticalScale(60), height: verticalScale(60) }} source={require('../../../assets/images/home_option2/btn_khancap.png')} />
                </View>
                <View style={{ marginTop: 2, shadowColor: '#A0A0A0', shadowOffset: { width: 0, height: 1 }, shadowRadius: 1, shadowOpacity: 1.0 }}>
                  <Image style={{ width: verticalScale(60), height: verticalScale(60) }} source={require('../../../assets/images/home_option2/btn_camera.png')} />
                </View>
              </View> */}
            </View>

            <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
              <FlatList
                style={{ marginHorizontal: 10 }}
                data={this.state.listButtons}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
                numColumns={3}
              />
            </View>

            <ItemLichcongtac navigation={this.props.navigation} />
            {/* <ItemXinYKien /> */}

            {/* <View style={{ width: '100%', height: scale(5), backgroundColor: '#e1e1e1' }}></View> */}
            <View style={{ backgroundColor: 'white', position: 'relative' }}>
              <Text style={{ marginLeft: 15 }}>Tin tức - Sự kiện</Text>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                {/* <TouchableOpacity style={{ width: scale(556), height: scale(228), borderRadius: scale(8), backgroundColor: '#047ef2' }}>

                </TouchableOpacity> */}
                <SuKienHome navigation={this.props.navigation} />
              </View>
            </View>

            {/* <ItemDocBao navigation={this.props.navigation}/> */}
          </View>
        </Content>
        {/* {
          (this.props.markers.length > 0) && (this.props.check) ? (
            <ViewKhanCap navigation={this.props.navigation} heightView={verticalScale(130)} 
            data={this.props.markers[this.props.markers.length - 1]}
            show={true} 
            />
          ) :
            null
        } */}
        {/* <ChatbotBox></ChatbotBox> */}
        <Footer
          style={Platform.OS == "ios" ? styles.footerIos : styles.footerAndroid}
        >
          <View>
            <CustomTabs2 active="0" />
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: scale(25),
    color: "#666666",
    textAlign: "center"
  },
  baotext: {
    justifyContent: "center",
    alignItems: "center"
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(20)
  },
  _9icons: { width: iconWidth, height: iconHeight, marginBottom: 5 },
  footerIos: {
    height: bottomHeight,
    backgroundColor: "transparent",
    borderTopWidth: 0
  },
  footerAndroid: {
    height: bottomHeight,
    backgroundColor: "transparent",
    paddingBottom: -10
  }
});

const mapStateToProps = state => ({
  markers: state.getMarkers.markers,
  check: state.noti.check
});

export default connect(
  mapStateToProps,
  { updateUserAvatar, updateMarkers, updateNotiKhanCap }
)(HomeScreenOption2);

 