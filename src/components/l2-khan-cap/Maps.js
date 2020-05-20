import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import { withNavigation } from 'react-navigation';
import { polygon } from "./bacNinhProvince";
import Text from "../../components/custom-view/text";
import styles from "./styles";
import { Content } from "native-base";
import SuperMarkers from "./SuperMarkers";
import ViewKhanCap from "../home_option2/ViewKhanCap";
import { updateMarkers } from "../../redux/actions/getMarkers";
import { connect } from "react-redux";
import KhanCapAPI from "../../services/api-service/khan-cap-api";
const win = Dimensions.get("window");
var IconLocation = scale(50);
var ellipseLocation = scale(80);
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
var margin20 = scale(20);
class ListButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      btnAll: true,
      btn1: false,
      btn2: false,
      btn3: false
    };
  }
  componentWillMount() {
    KhanCapAPI.getDsKhanCap(1, 1000, 0, 255).then(res => {
      //   alert(JSON.stringify(res));
      if (res != null) {
        //   alert(JSON.stringify(res.newsEntity[0]));
        this.setState({
          listData: res.newsEntity,
          isLoading: false,
          //poster: res.nhiemVus[0].poster.uri
          poster: res.poster
        });
      }
    });
  }
  getColorIdTrangThai(trangThai) {
    switch (trangThai) {
      case "0": // Chua xu ly
        return "#fc7c43";
      case "1": // Dang xu ly
        return "#3d5e8f";
      case "2": // Da xu ly
        return "#999999";
      case "3": // Qua han
        return "e63534";
      case 4:
        return "#3d5e8f";
      case 5:
        return "#888888";
      case 6:
        return "#888888";
      default:
        return "red";
    }
  }
  getIconLocation(capdo) {
    switch (capdo) {
      case 4:
        return require("../../../configUI/imageLocation/Location_Red.png");
      case 3:
        return require("../../../configUI/imageLocation/Location_Orange.png");
      case 2:
        return require("../../../configUI/imageLocation/Location_Green.png");
      default:
        return require("../../../configUI/imageLocation/Location_White.png");
    }
  }
  clickBtn(number) {
    switch (number) {
      case 0: {
        this.setState({
          btnAll: true,
          btn1: false,
          btn2: false,
          btn3: false
        });
        break;
      }
      case 1: {
        this.setState({
          btnAll: false,
          btn1: true,
          btn2: false,
          btn3: false
        });
        break;
      }
      case 2: {
        this.setState({
          btnAll: false,
          btn1: false,
          btn2: true,
          btn3: false
        });
        break;
      }
      case 3: {
        this.setState({
          btnAll: false,
          btn1: false,
          btn2: false,
          btn3: true
        });
        break;
      }
      default: {
        this.setState({
          btnAll: true,
          btn1: false,
          btn2: false,
          btn3: false
        });
        break;
      }
    }
  }
  filterCapDo(mucDo) {
    if (mucDo == 0) {
      this.setState({
        listData: this.props.listData
      });
    } else {
      let listData = this.props.listData.filter(data => {
        return data.isHotFillter === mucDo;
      });
      //console.log('Du Lieu Sau Khi Loc:', listData)
      this.setState({
        listData: listData
      });
    }
  }
  renderListEmergency(data) {
    if (data == null || data === undefined) {
      return (
        <View style={{ padding: 10 }}>
          <Text>Không có dữ liệu</Text>
        </View>
      )
    }
    else
      if (data.length < 1 )
        return (
          <View style={{ padding: 10 }}>
            <Text>Không có dữ liệu</Text>
          </View>
        );
      else {
        return data.map((data, i) => {
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("KhanCapChiTiet", { id: data.id })
              }
              key={i}
            >
              <View
                style={[
                  styles.itemts,
                  { width: win.width, height: verticalScale(128) }
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1.5
                  }}
                >
                  {/* <Image source={data.icon} style={{ width: scale(77), height: scale(77), margin: margin20 }} /> */}
                  {/* {console.log("link icon", data.icon)} */}
                  <Image
                    source={
                      data.icon.uri
                        ? data.icon
                        : require("../../../assets/images/default/task.png")
                    }
                    style={{
                      width: scale(77),
                      height: scale(77),
                      margin: margin20
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flex: 10,
                    marginLeft: margin20
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_MAIN,
                        color: "#3a3a3a",
                        fontStyle: "normal"
                      }}
                      line={2}
                    >
                      {data.tieuDe}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>
                      {data.tenLinhVuc} |{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_SUB,
                        color: this.getColorIdTrangThai(data.trangThai)
                      }}
                    >
                      {data.tenTrangThai}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </TouchableOpacity>
          );
        });
      }
  }
  renderBtn() {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.clickBtn(0);
            this.props.onPress(0);
            this.filterCapDo(0);
          }}
          style={{
            width: scale(160),
            height: verticalScale(60),
            backgroundColor: this.state.btnAll ? "#3d5e8f" : "#efefef",
            borderRadius: scale(50)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: scale(22),
                color: this.state.btnAll ? "#efefef" : "#666666"
              }}
            >
              Tất cả
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.clickBtn(1);
            this.props.onPress(3);
            this.filterCapDo(4);
          }}
          style={{
            width: scale(160),
            height: verticalScale(60),
            marginLeft: 8,
            marginRight: 4,
            backgroundColor: this.state.btn1 ? "#e40d0d" : "#efefef",
            borderRadius: scale(50)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }}
          >
            <Image
              source={
                this.state.btn1
                  ? this.getIconLocation(-1)
                  : this.getIconLocation(4)
              }
              style={{ height: IconLocation, width: IconLocation }}
            />
            <Text
              style={{
                fontSize: scale(22),
                color: this.state.btn1 ? "white" : "#666666"
              }}
            >
              Cấp độ 3
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.clickBtn(2);
            this.props.onPress(2);
            this.filterCapDo(3);
          }}
          style={{
            width: scale(160),
            height: verticalScale(60),
            marginLeft: 4,
            marginRight: 8,
            backgroundColor: this.state.btn2 ? "#ffca11" : "#efefef",
            borderRadius: scale(50)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }}
          >
            <Image
              source={
                this.state.btn2
                  ? this.getIconLocation(-1)
                  : this.getIconLocation(3)
              }
              style={{ height: IconLocation, width: IconLocation }}
            />
            <Text
              style={{
                fontSize: scale(22),
                color: this.state.btn2 ? "white" : "#666666"
              }}
            >
              Cấp độ 2
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.clickBtn(3), this.props.onPress(1);
            this.filterCapDo(2);
          }}
          style={{
            width: scale(160),
            height: verticalScale(60),
            backgroundColor: this.state.btn3 ? "#047ef2" : "#efefef",
            borderRadius: scale(50)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }}
          >
            <Image
              source={
                this.state.btn3
                  ? this.getIconLocation(-1)
                  : this.getIconLocation(2)
              }
              style={{ height: IconLocation, width: IconLocation }}
            />
            <Text
              style={{
                fontSize: scale(22),
                color: this.state.btn3 ? "white" : "#666666"
              }}
            >
              Cấp độ 1
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          width: win.width,
          backgroundColor: "#ffffff",
          position: "absolute",
          bottom: 0,
          padding: 8
        }}
      >
        <View
          style={{
            width: win.width,
            height: verticalScale(20),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ showList: !this.state.showList })}
          >
            <View
              style={{
                width: win.width,
                height: verticalScale(30),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: scale(130),
                  marginBottom: 8,
                  backgroundColor: "#b1b1b1",
                  height: verticalScale(7)
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.renderBtn()}
        {this.state.showList && (
          <View style={{ width: "100%", height: 500, marginTop: 8 }}>
            <Content>
              {this.props.listData && this.state.listData &&
                this.renderListEmergency(this.state.listData)}
            </Content>
          </View>
        )}
      </View>
    );
  }
}

const ListButtonCtrl = withNavigation(ListButton);

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    // this.navigation = this.props.navigation.getParam("navigation");
    // this.listData = this.props.navigation.getParam('listData');
    // this.region = this.props.navigation.getParam("region");
    // this.markers = this.props.markers;
    this.polygons = polygon;
    this.state = {
      markers: [
        {
          createdTime: "2019-04-05T03:17:33.177+0000",
          formatted_address: "Phố Phố Chợ Giầu, Tân Hồng, Từ Sơn, Bắc Ninh, Việt Nam",
          id: 799,
          isHotFillter: 3,
          latitude: 21.116669,
          longitude: 105.96124,
          newsId: 2492,
          title: "Kịp thời khống chế vụ hỏa hoạn tại Chợ Giầu ​"
        }
      ],
      listData: [],
      region: {
        latitude: 21.110085,
        longitude: 106.095694
      },
      btnCamOrMarkers: true,
      camera: [
        {
        createdTime: "2019-04-05T03:17:33.177+0000",
        formatted_address: "Phố Phố Chợ Giầu, Tân Hồng, Từ Sơn, Bắc Ninh, Việt Nam",
        id: 799,
        isHotFillter: 3,
        latitude: 21.110085,
        longitude: 106.095694,
        poster:'http://bdsvietnam.vn/wp-content/uploads/2017/11/1-744x446.jpg',
        link: 'https://r5---sn-npoeenee.googlevideo.com/videoplayback?expire=1557324738&ei=Yo_SXKxLiIPXArbNn6AJ&ip=5.9.44.68&id=o-ANoRE6OveSJksz8MIeePB92zrnBM-NfFNp9CVG3WRAgL&itag=22&source=youtube&requiressl=yes&mime=video%2Fmp4&ratebypass=yes&dur=817.760&lmt=1555000638510510&fvip=5&c=WEB&txp=5432432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIhAP8Zn4yNh0QH75qsQK19PkwhnacpsmeGl5qst9qrew8cAiBwFEErZ46Gem35tMQ4QIygnY-vCC2aUf3PmsU_Qik3Nw%3D%3D&title=TP%20B%E1%BA%AFc%20Ninh%20ph%C3%A1t%20tri%E1%BB%83n%20nhanh%20ch%C3%B3ng%20v%C3%A0%20hi%E1%BB%87n%20%C4%91%E1%BA%A1i%20%E2%96%BA%20Kh%C3%A1m%20ph%C3%A1%20B%E1%BA%AFc%20Ninh&cm2rm=sn-jhjup-i5ol7l,sn-i3bse7l&req_id=aa804c785cbca3ee&redirect_counter=3&rm=sn-npolk76&cms_redirect=yes&ipbypass=yes&mip=101.99.14.10&mm=34&mn=sn-npoeenee&ms=ltu&mt=1557303030&mv=m&pl=24&lsparams=ipbypass,mip,mm,mn,ms,mv,pl&lsig=AHylml4wRgIhALlCCf9U-GF2GOMnBqUwFVTjlYEKRfExG97nOI5rk0yIAiEAoyB2HOZuEPLLJtYISB8DOqOVtBQk4gkWkBS96QPCbI0=',
        newsId: 2492,
        title: "BacNinh"
      },
      {
        createdTime: "2019-04-05T03:17:33.177+0000",
        formatted_address: "Phố Phố Chợ Giầu, Tân Hồng, Từ Sơn, Bắc Ninh, Việt Nam",
        id: 799,
        isHotFillter: 3,
        latitude: 21.130085,
        longitude: 106.125694,
        poster:'http://www.baobacninh.com.vn/documents/20182/695004/8.JPG/8fa19235-0ad3-45a7-870d-d965a7e37ac6?t=1555031914284',
        link: 'https://r2---sn-npoeener.googlevideo.com/videoplayback?id=o-AMkN9CxXH4vWReBO3GqippLieHX6gh4hqd3F04Tu5qcT&itag=22&source=youtube&requiressl=yes&pl=24&ei=e4TSXOOuLsOD1wL5wJGICA&mime=video%2Fmp4&ratebypass=yes&dur=690.027&lmt=1555262655566641&fvip=2&c=WEB&txp=5432432&ip=144.76.173.210&ipbits=0&expire=1557321948&sparams=dur,ei,expire,id,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&signature=51469DCA24B260BA90385116473C297F6FB04722.73F2C36B41A2DA8B4337E98A37536C0992179CC7&key=cms1&title=TP%20B%E1%BA%AFc%20Ninh%20C%C3%B3%20%C4%90%C3%A1ng%20S%E1%BB%91ng%20H%C6%A1n%20TP%20Nam%20%C4%90%E1%BB%8Bnh%20%20Bac%20Ninh%20City%20%202019%20Vietnam%20Discovery%20Travel&mip=113.20.108.37&cm2rm=sn-jhjup-i5ol76,sn-i3bs77e&req_id=588a510d8140a3ee&redirect_counter=3&rm=sn-nposk7l&cms_redirect=yes&ipbypass=yes&mm=34&mn=sn-npoeener&ms=ltu&mt=1557300262&mv=m',
        newsId: 2492,
        title: "BacNinh"
      },
      {
        createdTime: "2019-04-05T03:17:33.177+0000",
        formatted_address: "Phố Phố Chợ Giầu, Tân Hồng, Từ Sơn, Bắc Ninh, Việt Nam",
        id: 799,
        isHotFillter: 3,
        latitude: 21.090085,
        longitude: 106.115694,
        poster:'http://angkorich.com/Data/upload/content/seo/bacninh.jpg',
        link: 'https://r2---sn-npoeenez.googlevideo.com/videoplayback?id=o-AOxN-hEvFTiSMqVZLrNbhEkYFmAwtzgQ69njA7bXnEtr&itag=22&source=youtube&requiressl=yes&pl=24&ei=7I_SXJLiI9afgAe4oa7IDQ&mime=video%2Fmp4&ratebypass=yes&dur=184.273&lmt=1487913514659054&fvip=2&c=WEB&ip=5.9.136.235&ipbits=0&expire=1557324876&sparams=dur,ei,expire,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&signature=69B20749DDC18B23AB70D2481898750163D39EC6.60D34A7F48D4B0389F91D85E2A8CA768DC2D3217&key=cms1&title=B%E1%BA%AFc%20Ninh%202017&mip=101.99.14.10&cm2rm=sn-jhjup-i5ol76,sn-i3bzr7l&req_id=df8693500e28a3ee&redirect_counter=2&cms_redirect=yes&mm=34&mn=sn-npoeenez&ms=ltu&mt=1557303159&mv=m',
        newsId: 2492,
        title: "BacNinh"
      },
    ]
    };
  }
  getIconLocation(capdo) {
    switch (capdo) {
      case 2:
        return require("../../../configUI/imageLocation/Location_Green.png");
      case 3:
        return require("../../../configUI/imageLocation/Location_Orange.png");
      case 4:
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
  componentWillMount() {
    //console.log("Get Data Marker", this.props.navigation.getParam('markers'))
    KhanCapAPI.getLocations().then(res => {
      if (res != null) {
        this.props.updateMarkers(res);
      }
    });
  }
  componentDidMount() {
    //alert(JSON.stringify(this.markers))
    // alert(JSON.stringify(this.listData.length))
    KhanCapAPI.getDsKhanCap(1, 1000, 0, 255).then(res => {
      //console.log("GET DS Khẩn Cấp Screen", res)
      //   alert(JSON.stringify(res));
      if (res != null) {
        //   alert(JSON.stringify(res.newsEntity[0]));
        this.setState({
          listData: res.newsEntity,
          // isLoading: false,
          //poster: res.nhiemVus[0].poster.uri
          markers: this.props.markers,
          poster: res.poster
        });
      }
    });
  }
  ZoomBounds() {
    this.map.fitToCoordinates(this.props.markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }
  renderMarkers(data) {
    if (data.length > 0)
      return data.map(marker => (
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          title={marker.title}
          onPress={() =>
            this.props.navigation.navigate("KhanCapChiTiet", { id: marker.newsId })
          }
        >
          <Image
            source={this.getIconLocation(marker.isHotFillter)}
            style={{ height: IconLocation, width: IconLocation }}
          />
        </Marker>
      ));
    else return null;
  }
  filterMarkers(loaiKhanCap) {
    if (loaiKhanCap == 0) {
      this.setState({
        markers: this.props.markers
      });
    } else {
      let markers = this.props.markers.filter(marker => {
        return marker.isHotFillter === loaiKhanCap + 1;
      });
      this.setState({
        markers: markers
      });
    }
  }
  renderKhanCapOrCamera() {
    return (
      <View style={{ position: 'absolute', top: verticalScale(40), right: 8, }}>
        <View style={{ shadowColor: '#A0A0A0', shadowOffset: { width: 0, height: 1 }, shadowRadius: 1, shadowOpacity: 1.0 }}>
          <TouchableOpacity onPress={() => this.clickBtn(0)}>
            <Image style={{ width: verticalScale(60), height: verticalScale(60) }} source={require('../../../assets/images/home_option2/btn_khancap.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 2, shadowColor: '#A0A0A0', shadowOffset: { width: 0, height: 1 }, shadowRadius: 1, shadowOpacity: 1.0 }}>
          <TouchableOpacity onPress={() => this.clickBtn(1)}>
            <Image style={{ width: verticalScale(60), height: verticalScale(60) }} source={require('../../../assets/images/home_option2/btn_camera.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  clickBtn(number) {
    switch (number) {
      case 0: {
        this.setState({
          btnCamOrMarkers: true
        });
        break;
      }
      case 1: {
        this.setState({
          btnCamOrMarkers: false
        });
        break;
      }
    }
  }
  renderCam(data) {
    if (data.length > 0)
      return data.map(marker => (
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          title={marker.title}
          onPress={() =>
            {
              this.props.navigation.navigate("CusVideo", { data: { link: marker.link, laVideo: true, poster: marker.poster } })
              // alert(marker.link)
            }
          }
        >
          <Image
            source={require('../../../configUI/imageLocation/Location_Camera.png')}
            style={{ height: IconLocation, width: IconLocation }}
          />
        </Marker>
      ));
    else return null;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA
          }}
        // onMapReady={() => this.ZoomBounds()}
        >
          {/* {this.renderMarkers(this.state.markers)} */}
          {this.state.btnCamOrMarkers ? this.renderMarkers(this.state.markers) : this.renderCam(this.state.camera)}
          {this.state.btnCamOrMarkers ? (<SuperMarkers navigation={this.props.navigation} />) : null}

          {/* {this.polygons.map(polygon => ( */}
          <Polygon
            // key={polygon.id}
            coordinates={this.polygons}
            // holes={polygon.holes}
            strokeColor="#F00"
            fillColor="rgba(255,255,255,0.3)"
            strokeWidth={1}
          />

        </MapView>
        {this.renderKhanCapOrCamera()}
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack(null)}
          style={{ position: "absolute", left: 10, top: 30 }}
        >
          <View style={{ height: 30, width: 30 }}>
            <Image
              source={require("../../../configUI/imageHeader/btnbackmap.png")}
              style={{
                width: scale(41),
                height: verticalScale(37),
                backgroundColor: "transparent"
              }}
            />
          </View>
        </TouchableOpacity>
        <ViewKhanCap
          navigation={this.props.navigation}
          heightView={verticalScale(160)}
          show={true}
        />
        {/* {alert(JSON.stringify(this.state.listData))} */}
        <ListButtonCtrl
          listData={this.state.listData}
          onPress={number => this.filterMarkers(number)}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.getMarkers.markers
});

export default connect(
  mapStateToProps,
  { updateMarkers }
)(Maps);
