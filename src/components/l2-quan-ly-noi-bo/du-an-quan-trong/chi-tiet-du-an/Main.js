import React, { Component } from "react";
import { TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
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
  View,
  
} from "native-base";
import CustomHeader from "../../../user-controls/CustomHeader";
import { setIndex } from "../../../../redux/actions/list";
import { openDrawer } from "../../../../redux/actions/drawer"
import CustomTabs2 from "../../../navigation-controls/CustomTabs2";
import Text from '../../../../components/custom-view/text';
import {scale, verticalScale, moderateScale} from '../../../../components/user-controls/utilities/Scale'
// import styles from "./styles";

var searchHeight = verticalScale(72)
var searchWidth = scale(682)
var text = scale(25)
var tabHeight = verticalScale(64)
const win = Dimensions.get('window')

export default class Main extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoading: false,
      tabActive: 'ChiTietDuAnScreen'
    }

  }
  ChiTietDuAnScreen = () => {
    this.setState({
      tabActive: 'ChiTietDuAnScreen'
    })
    this.props.navigation.navigate('ChiTietDuAnScreen')
  }
  VanBanChiTietDuAn = () => {
    this.setState({
      tabActive: 'VanBanChiTietDuAn'
    })
    this.props.navigation.navigate('VanBanChiTietDuAn')
  }
  TienDoChiTietDuAn = () => {
    this.setState({
      tabActive: 'TienDoChiTietDuAn'
    })
    this.props.navigation.navigate('TienDoChiTietDuAn')
  }
  GiamSatChiTietDuAn = () => {
    this.setState({
      tabActive: 'GiamSatChiTietDuAn'
    })
    this.props.navigation.navigate('GiamSatChiTietDuAn')
  }
  GiaiNganChiTietDuAn = () => {
    this.setState({
      tabActive: 'GiaiNganChiTietDuAn'
    })
    this.props.navigation.navigate('GiaiNganChiTietDuAn')
  }
  BaoCaoChiTietDuAn = () => {
    this.setState({
      tabActive: 'BaoCaoChiTietDuAn'
    })
    this.props.navigation.navigate('BaoCaoChiTietDuAn')
  }

  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Nội dung chi tiết"></CustomHeader>
        {/* <Content> */}
          <ScrollView horizontal={true} style={{width: win.width}} showsHorizontalScrollIndicator={false}>
          <View style={{alignItems: "center", flexDirection: "row", backgroundColor: '#efefef', height: verticalScale(75)}}>
            
            
                <TouchableOpacity style={{ height: '100%',paddingLeft:5,paddingRight:5, backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'ChiTietDuAnScreen' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'ChiTietDuAnScreen' ? 1 : 0}}
                onPress={this.ChiTietDuAnScreen}>
                    <Text style={{color: this.state.tabActive == 'ChiTietDuAnScreen' ? 'black' : 'grey', fontSize: text}}>Thông tin chung</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{width: scale(150), height: '100%', backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'VanBanChiTietDuAn' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'VanBanChiTietDuAn' ? 1 : 0}}
                onPress={this.VanBanChiTietDuAn}>
                    <Text style={{color: this.state.tabActive == 'VanBanChiTietDuAn' ? 'black' : 'grey', fontSize: text}}>VB pháp lý</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{width: scale(170), height: '100%', backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'TienDoChiTietDuAn' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'TienDoChiTietDuAn' ? 1 : 0}}
                onPress={this.TienDoChiTietDuAn}>
                    <Text style={{color: this.state.tabActive == 'TienDoChiTietDuAn' ? 'black' : 'grey', fontSize: text}}>Tiến độ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width: scale(150), height: '100%', backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'GiamSatChiTietDuAn' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'GiamSatChiTietDuAn' ? 1 : 0}}
                onPress={this.GiamSatChiTietDuAn}>
                    <Text style={{color: this.state.tabActive == 'GiamSatChiTietDuAn' ? 'black' : 'grey', fontSize: text}}>Giám sát</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width: scale(150), height: '100%', backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'GiaiNganChiTietDuAn' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'GiaiNganChiTietDuAn' ? 1 : 0}}
                onPress={this.GiaiNganChiTietDuAn}>
                    <Text style={{color: this.state.tabActive == 'GiaiNganChiTietDuAn' ? 'black' : 'grey', fontSize: text}}>Giải ngân</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width: scale(150), height: '100%', backgroundColor: '#efefef', justifyContent: 'center', alignItems: "center", borderBottomColor: this.state.tabActive == 'BaoCaoChiTietDuAn' ? 'black' : 'transparent', borderBottomWidth: this.state.tabActive == 'BaoCaoChiTietDuAn' ? 1 : 0}}
                onPress={this.BaoCaoChiTietDuAn}>
                    <Text style={{color: this.state.tabActive == 'BaoCaoChiTietDuAn' ? 'black' : 'grey', fontSize: text}}>Báo cáo</Text>
                </TouchableOpacity>
            
          </View>
          </ScrollView>
        {/* </Content> */}

        {/* <Footer style={{height: 60, backgroundColor: 'transparent'}}>
          <View>
              <CustomTabs2 active = '0'></CustomTabs2>
          </View>
        </Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    texttab: {
        fontSize: 12,
        color: 'grey'
    }
})

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

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(LangNgheDuLuanScreen);
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
