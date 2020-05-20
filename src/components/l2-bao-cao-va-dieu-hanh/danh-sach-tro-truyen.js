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

import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import ThongBaoAPI from '../../services/api-service/thong-bao-api'
import { scale, verticalScale, moderateScale } from '../user-controls/utilities/Scale'
import AppIndicator from '../user-controls/AppIndicator'
import {convertTime} from '../user-controls/utilities/converter'
import {GROBAL_RESOUCE} from "../../../assets/strings/string-bn"
var iconHeight = scale(70)
var iconWidth = scale(70)
var bottomHeight = verticalScale(109)

var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class DanhSachTroTruyenScreen extends Component {
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
      isLoading: false,
      
      listData: this.props.navigation.getParam("listFriend"),
      // a:[
      //   {
      //     icon:require('../../../assets/images/default/task.png'),
      //     title: 'Phạm Gia, Phó GĐ Sở Giáo Dục',
      //     time:'08:00 Thứ 2',
      //     address:'Đối với chủ tịch UBND các huyện khác      dhad a ds ads a d ád a sd ád a ád'
      //   },
      //   {
      //     icon:require('../../../assets/images/default/task.png'),
      //     title: 'Phạm Gia, Phó GĐ Sở Giáo Dục',
      //     time:'08:00 Thứ 2',
      //     address:'Đối với chủ tịch UBND các huyện khác       ákdhad a ds ads a d ád a sd ád a ád'
      //   },
      //   {
      //     icon:require('../../../assets/images/default/task.png'),
      //     title: 'Phạm Gia, Phó GĐ Sở Giáo Dục',
      //     time:'08:00 Thứ 2',
      //     address:'Đối với chủ tịch UBND các huyện khác      ákdhad a ds ads a d ád a sd ád a ád'
      //   },
      //   {
      //     icon:require('../../../assets/images/default/task.png'),
      //     title: 'Phạm Gia, Phó GĐ Sở Giáo Dục',
      //     time:'08:00 Thứ 2',
      //     address:'Đối với chủ tịch UBND các huyện khác      ákdhad a ds ads a d ád a sd ád a ád'
      //   },
      //   {
      //     icon:require('../../../assets/images/default/task.png'),
      //     title: 'Phạm Gia, Phó GĐ Sở Giáo Dục',
      //     time:'08:00 Thứ 2',
      //     address:'Đối với chủ tịch UBND các huyện khác     ákdhad a ds ads a d ád a sd ád a ád'
      //   }
      // ]
    };
  }

  componentDidMount() {
  }

  renderItems(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity style={{backgroundColor: "white",width: "100%",height: scale(140),flexDirection: "row",borderBottomColor: "#eeeeee",borderBottomWidth:1 }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("ChiTietTroTruyen", {
              receiveId: data.id,
              name: data.ten,
              chucvu: data.chucVu,
              icon: data.avatar
              });}}>
          <View style={{ flex: 1, margin: 10, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: scale(60), height: scale(60) , borderRadius: scale(30)}} source={data.avatar} />
          </View>
          <View style={{ flex: 6, justifyContent: "center", marginRight: 10 }}>
            <Text numberOfLines={1} style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {data.ten}
              <Text numberOfLines={1} style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {", "}{data.chucVu}
            </Text>
            </Text>
            <Text numberOfLines={1} style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>{data.message}</Text>
          </View>

          <View style={{flex:2,justifyContent: "center", marginRight: 10 }}>
            <Text numberOfLines={1} style={{ fontSize: scale(19), color: "#999999" }}>
              {data.time}
            </Text>
            <Text numberOfLines={1} style={{fontSize: FONT_SIZE_SUB, color: "#888888"}}></Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <Container style={[styles.container, { flex: 1 }]}>
        <CustomHeader title={GROBAL_RESOUCE.BAO_CAO_CAP_TREN_TITLE_DETAIL}></CustomHeader>
        {this.state.isLoading ? (<AppIndicator />) :
        (<Content style={{ flex: 1, marginBottom: -verticalScale(15) }}>
         {this.renderItems(this.state.listData)}
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
    backgroundColor: '#f6f6f6',
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