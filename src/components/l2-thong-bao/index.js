import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  ImageBackground,
  Dimensions,
  StyleSheet
} from "react-native";
// import { connect } from "react-redux";
// import DrawBar from "../navigation-controls/DrawBar";
// import { DrawerNavigator, NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
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
  View
} from "native-base";

// import { setIndex } from "../../redux/actions/list";
// import { openDrawer } from "../../redux/actions/drawer";
// import styles from "./styles";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import ThongBaoAPI from '../../services/api-service/thong-bao-api'
import { scale, verticalScale, moderateScale } from '../../components/user-controls/utilities/Scale'
import AppIndicator from '../user-controls/AppIndicator'
import { convertTime } from '../user-controls/utilities/converter'
//import PushNotification from 'react-native-push-notification'
var iconHeight = scale(70)
var iconWidth = scale(70)
var textTitle = scale(26)
var textContent = scale(24)
var bottomHeight = verticalScale(109)

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class ThongBaoScreen extends Component {
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
      loadMore: false,
      listData: []
    };
  }

  componentDidMount() {

    // this.testPushNoti()
    this.getData();
  }
  getData() {
    this.setState({ loadMore: true })
    ThongBaoAPI.getDsThongBao(this.state.listData.length).then((res) => {
      if (this.state.listData.length == 0) {
        this.setState({ listData: res, isLoading: false, loadMore: false });
      } else {
        this.setState({ listData: this.state.listData.concat(res), isLoading: false, loadMore: false });
      }
    });
  }
  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  btnThongBao(notiID, cateId, newsId) {
    if (cateId != null && newsId != null)
      this.props.navigation.navigate(this.getJumpPoint(cateId), { id: newsId })
    else
      alert('không có cateId và newsId')
    ThongBaoAPI.getUpdateReadNoti(notiID).then((res) => {
      if (res != null) {
        
      }
    })
  }
  getJumpPoint = (pointer) => {
    switch (pointer) {
      case 0:
        return "LichCongTacChiTiet";
      case 1:
        return "KhanCapChiTiet";
      case 2:
        return "BaoCaoKTXHChiTiet";
      case 3:
        return "NhiemVuChiTiet";
      // case '4':
      //   return "Mục tiêu";
      // VanbanChiTiet lỗi
      case 5:
        return "VanBanChiTiet";
      // case '6':
      //   return "Quản lý nội bộ";
      // case '7':
      //   return "Dư luận";
      // case '8':
      case 9:
        return "LichCongTacChiTiet";
      //   return "Mục tiêu";
      // case '10':
      //   return "Mục tiêu";
      // case '11':
      //   return "Mục tiêu";
      // case '12':
      //   return "Mục tiêu";
      // case '13':
      //   return "Mục tiêu";
      case '14':
        return "ChiTietDuAnScreen";
      default: return "HomeNavigator";
    }
  };
  listItems = ({ item }) => (

    <View key={item.id}>
      <TouchableOpacity onPress={() => this.btnThongBao(item.notificationId, item.cateId, item.newsId)}>
        <View style={{ backgroundColor: "white", paddingTop: 10, paddingBottom: 10 }}>
          <View
            style={[
              styles.containerRow,
              {
                alignItems: "center",
                marginLeft: 8,
                marginRight: 8,
                padding: 8,
                width: '100%',
                height: verticalScale(126), paddingBottom: 10, paddingTop: 10
              }
            ]}
          >
            {/* {isRead?<View>} */}
            <View
              style={[
                styles.iconItem,
                { backgroundColor: "white", flex: 10 }
              ]}
            >
              <Image
                source={item.isRead ? require('../../../assets/images/l2-thong-bao/bell.png') : require('../../../assets/images/l2-thong-bao/bell_inactive.png')}
                style={{ width: iconWidth, height: iconHeight, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 80 }}>
              <Text style={{ marginLeft: 8, fontSize: textTitle }} numberOfLines={1}>
                {item.title}
              </Text>

              <Text
                style={{ marginLeft: 8, color: "#888888", fontSize: textContent, marginBottom: 3, marginTop: 3 }}
                numberOfLines={1}
              >
                {item.contents}
              </Text>
              <Text style={{ marginLeft: 8, color: "#888888", fontSize: textContent }}>{convertTime(item.createTime)}</Text>
            </View>
            <View style={{ flex: 10, justifyContent: "center", alignItems: "center" }}></View>
          </View>
        </View>
        <View style={styles.line} />
      </TouchableOpacity>
    </View>
  )
  isScrollEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }
  render() {
    return (
      <Container style={[styles.container, { flex: 1 }]}>
        <CustomHeader title="THÔNG BÁO" display='none'></CustomHeader>
        {this.state.isLoading ? (<AppIndicator />) :
          (<Content style={{ flex: 1, marginBottom: -verticalScale(15) }} onScroll={({ nativeEvent }) => {
            if (this.isScrollEnd(nativeEvent) && !this.state.loadMore) {
              this.getData()
            }
          }}>
            {console.log("dữ liệu thông báo", this.state.listData)}
            <FlatList
              data={this.state.listData}
              keyExtractor={(item, index) => item.id}
              renderItem={this.listItems}
              numColumns={1}
            />
          </Content>)
        }
        <Footer style={[{ height: bottomHeight, backgroundColor: 'transparent' }, Platform.OS == 'ios' ? { borderWidth: 0, borderColor: 'transparent' } : {}]}>
          <View>
            <CustomTabs2 active='1'></CustomTabs2>
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: scale(24) },
  baotext: { justifyContent: 'center', alignItems: 'center' },
  touchable: { flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  _9icons: { width: iconWidth, height: iconHeight, marginBottom: 5 },
  footerIos: { height: bottomHeight, backgroundColor: 'transparent', borderTopWidth: 0 },
  footerAndroid: { height: bottomHeight, backgroundColor: 'transparent', paddingBottom: -10 },
  container: {
    backgroundColor: '#DADADA',
  },
  itemStyle: {
    backgroundColor: '#FFFFFF',
    height: 100,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    padding: 10,

  },
  buttonIcon: {
    width: 48,
    height: 48,
  },
  line: {
    backgroundColor: '#eaeaea',
    flex: 1,
    height: 1
  },
  containerRow: {
    flexDirection: 'row',
  },
  iconItem: {
    backgroundColor: '#3d5e8f',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconItemDisable: {
    backgroundColor: '#bfbfbf',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  }
})


