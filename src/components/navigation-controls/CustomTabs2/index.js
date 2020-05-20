import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Image, TouchableOpacity, AsyncStorage, ImageBackground } from "react-native";
import { withNavigation } from 'react-navigation';
import resolveAssetSource from 'resolveAssetSource';
import firebase from 'react-native-firebase';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
} from "native-base";
import { connect } from 'react-redux';
import { scale, verticalScale, moderateScale } from '../../../components/user-controls/utilities/Scale'

var iconHeight = scale(54)
var iconWidth = scale(54)
var textBottomSize = scale(20)
var iconchatbotHeight = verticalScale(100)
var iconchatbotWidth = verticalScale(100)
var bottomHeight = verticalScale(94)

const routes = [
  { screen: "HomeScreenOption2", icon: require('../../../../assets/images/navigation/home2/bottom_home.png'), iconActive: require('../../../../assets/images/navigation/home2/bottom_home_active.png'), text: "Trang chủ" },
//   { screen: "ThongBao", icon: require('../../../../assets/images/navigation/home2/bottom_thongbao.png'), iconActive: require('../../../../assets/images/navigation/home2/bottom_thongbao_active.png'), text: "Thông báo" },
  { screen: "Maps", icon: require('../../../../assets/images/home_option2/bandoso.png'), text: "Bản đồ số" },
  { screen: "", icon: require('../../../../assets/images/home/bottombar_center_btn.png'), text: "" },
  { screen: "DsLichCongTac", icon: require('../../../../assets/images/navigation/home2/bottom_calendar.png'), iconActive: require('../../../../assets/images/navigation/home2/bottom_calendar_active.png'), text: "Lịch công tác" },
  { screen: "CaNhan", icon: require('../../../../assets/images/navigation/home2/bottom_ultility.png'), iconActive: require('../../../../assets/images/navigation/home2/bottom_ultility_active.png'), text: "Tiện ích" },

];
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class CustomTabs2 extends React.Component {
  constructor(props) {
    super(props);
    // alert(props.active);
    this.state = {
      mainButtonLeft: 0
      
    }
  }
  static navigationOptions = {
    header: null
  };

  calItemWidth() {
    return (routes.length ? (deviceWidth / routes.length ) : deviceWidth);
  }
  // getImageSize(url) {
  //   let icon = url;

  //   return Height = source.height * (win.width - 20) / win.height
  // }
  componentDidMount() {
    let source = resolveAssetSource(require('../../../../assets/images/home/bottombar_center_btn.png'));
    this.setState({ mainButtonLeft: (deviceWidth - source.width) / 2 });
  }

  activeColor(i) {
    if (i == this.props.active) {
      return '#3173d3';
    }
    else {
      return 'darkgrey';
    }
  }
  _onPress(index) {
    this.props.onChangeTab(index);
  }

  convertLargeNumber(number) {
    return number > 99 ? "99+" : number;
  }
  render() {
    //console.log("get badge", this.state.badge)
    return (
      <Container style={{ backgroundColor: 'transparent', height: bottomHeight, paddingTop: 10 }}>
        <Content style={{ position: 'relative', backgroundColor: 'white' }} scrollEnabled={false} showsVerticalScrollIndicator={false}>
          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
            backgroundColor: 'white', width: '100%', padding: 3,
            borderTopColor: 'lightgrey', borderTopWidth: 0.7,
          }} >
            {
              routes.map((element, i) => {
                return (
                  <TouchableOpacity key={i}
                    // style = {styles.button}
                    onPress={() => { this.props.navigation.navigate(element.screen); }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: this.calItemWidth() }}>
                      {/* <Icon active name={element.icon} style={{color: this.activeColor(i)}}/> */}
                      {element.text != null && element.text != "" ?
                        (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ImageBackground active source={i != this.props.active ? element.icon : element.iconActive} style={{ width: iconWidth, height: iconHeight }} />
                            {i == 1 && (this.props.badge != 0) ?
                              (<View style={{ height: scale(36), width: scale(this.props.badge > 99?54:36), backgroundColor: '#c93f3c', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: scale(this.props.badge>99?18:32), borderRadius: scale(18) }}>
                                <Text style={{ color: 'white', fontSize: scale(22), fontFamily: 'Roboto-Regular' }}>{this.convertLargeNumber(this.props.badge)}</Text>
                              </View>)
                              : null}
                            <Text style={{ fontSize: textBottomSize, color: this.activeColor(i) }}>{element.text}</Text>
                          </View>
                        ) : (<View></View>)
                      }
                    </View>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </Content>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("TroLyAo")}
          style={{
            position: 'absolute', bottom: 0, left: deviceWidth / 2 - iconchatbotWidth / 2
          }}
        >
          <View>
            <Image active source={require('../../../../assets/images/home_option2/bottombar_center_btn.png')} style={{ width: iconchatbotWidth, height: iconchatbotHeight }} />
          </View>
        </TouchableOpacity>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  badge: state.noti.badge
});

export default connect(mapStateToProps, null)(withNavigation(CustomTabs2));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // button: {

  // },
  // buttonIcon: {
  //     width: 32,
  //     height:32,
  // },
  // buttonText: {
  //   fontSize:8,
  // }
});

// export default withNavigation(CustomTabs2);
