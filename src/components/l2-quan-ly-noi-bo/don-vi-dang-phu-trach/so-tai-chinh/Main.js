import React, { Component } from "react";
import { TouchableOpacity, Image, TextInput, StyleSheet,Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
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
  View,
  
} from "native-base";
import Animated from 'react-native-reanimated';
import CustomHeader from "../../../user-controls/CustomHeader";
import { setIndex } from "../../../../redux/actions/list";
import { openDrawer } from "../../../../redux/actions/drawer"
import CustomTabs2 from "../../../navigation-controls/CustomTabs2";
import Text from '../../../../components/custom-view/text';
// import {scale, verticalScale, moderateScale} from '../../../user-controls/utilities/Scale'
import {scale, verticalScale,moderateScale } from "../../../user-controls/utilities/Scale";
import {getPaddingTop,getHeaderSize} from '../../../user-controls/utilities/StatusBar'
import Footer ,{footerMargin,footerHeight} from '../../../user-controls/CustomFooter'
import ThongTinChung from './thong-tin-chung';
import ChiTietDuAnSo from './du-an-so';
import ChiTietSuKienSo from './su-kien-so'
import QuyetDinhPhanCongSo from './nhan-su-so'
import MucTieuSo from './muc-tieu-so'
import NhiemVuSo from './nhiemvuso'
import DuAnQuantrong from './du-an-so'
// import styles from "./styles";

var searchHeight = verticalScale(72)
var searchWidth = scale(682)
var text = scale(24)
var tabHeight = verticalScale(64)
const deviceHeight = Dimensions.get("window").height;

export default class Main extends Component {

  FirstRoute = () => (
    <ThongTinChung navigation={this.props.navigation}></ThongTinChung>
  );
  SecondRoute = () => (
    <MucTieuSo style={{marginTop:10}} navigation={this.props.navigation}></MucTieuSo>
  );
  ThirdRoute = () => (
    <NhiemVuSo navigation={this.props.navigation}></NhiemVuSo>
);
  FourRoute = () => (
    <QuyetDinhPhanCongSo navigation={this.props.navigation}></QuyetDinhPhanCongSo>
  );
  FiveRoute = () => (
    <DuAnQuantrong token={this.state.token} navigation={this.props.navigation}></DuAnQuantrong>
  );

renderTabBar = props => <TabBar {...props}
    scrollEnabled={true}
    indicatorStyle={{ backgroundColor: '#047ef2' }}
    style={{ backgroundColor: 'white'}}
    activeColor="red"
    labelStyle = {{color:'#666666',fontSize: scale(24)}}
   scrollEnabled = {true}
    // tabStyle = {{color:'green'}}
     />;


  constructor() {
    super();
    this.state = {
      isLoading: false,
      tabActive: 'DsNhiemVuSo',
      index: 0,
      routes: [
        { key: 'first', title: 'THÔNG TIN CHUNG' },
        { key: 'second', title: 'MỤC TIÊU' },
        { key: 'third', title: 'QL NHIỆM VỤ' },
        { key: 'four', title: 'NHÂN SỰ' },
        { key: 'five', title: 'QL DỰ ÁN' },
      ],
    }

  }
  // DsNhiemVuSo = () => {
  //   this.setState({
  //     tabActive: 'DsNhiemVuSo'
  //   })
  //   this.props.navigation.navigate('DsNhiemVuSo')
  // }
  // ChiTietDuAnSo = () => {
  //   this.setState({
  //     tabActive: 'ChiTietDuAnSo'
  //   })
  //   this.props.navigation.navigate('ChiTietDuAnSo')
  // }
  // ChiTietSuKienSo = () => {
  //   this.setState({
  //     tabActive: 'ChiTietSuKienSo'
  //   })
  //   this.props.navigation.navigate('ChiTietSuKienSo')
  // }
  // QuyetDinhPhanCongSo = () => {
  //   this.setState({
  //     tabActive: 'QuyetDinhPhanCongSo'
  //   })
  //   this.props.navigation.navigate('QuyetDinhPhanCongSo')
  // }
  
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Nội dung chi tiết"></CustomHeader>
        {/* <Content> */}

        <View style={{backgroundColor: 'white', height:deviceHeight-getHeaderSize(), paddingBottom:footerMargin}}>
            
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.SecondRoute,
                third : this.ThirdRoute,
                four: this.FourRoute,
                five:this.FiveRoute,
              })}
              labelStyle={{fontSize:30,fontWeight:'bold'}}
              scrollEnabled={true}
              renderTabBar={this.renderTabBar}
              onIndexChange={index => {
              this.setState({index})
              }}
              initialLayout={{ width: Dimensions.get('window').width}}
            />
            </View>
          {/* <View style={{alignItems: "center", backgroundColor: '#efefef', height: verticalScale(124), width: '100%'}}>

            <View style={{width: '95%', height: verticalScale(64), flexDirection: "row", backgroundColor: 'white', borderColor: 'lightgrey', borderWidth: 1, marginTop: moderateScale(20)}}>
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'DsNhiemVuSo' ? '#3E5E8F' : 'white', borderRightColor: 'lightgrey', borderRightWidth: 1, justifyContent: 'center', alignItems: "center"}}
                onPress={this.DsNhiemVuSo}>
                    <Text style={{color: this.state.tabActive == 'DsNhiemVuSo' ? 'white' : 'grey', fontSize: text}}>QL NHIỆM VỤ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'ChiTietDuAnSo' ? '#3E5E8F' : 'white', borderRightColor: 'lightgrey', borderRightWidth: 1, justifyContent: 'center', alignItems: "center"}}
                onPress={this.ChiTietDuAnSo}>
                    <Text style={{color: this.state.tabActive == 'ChiTietDuAnSo' ? 'white' : 'grey', fontSize: text}}>QL DỰ ÁN</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'ChiTietSuKienSo' ? '#3E5E8F' : 'white', borderRightColor: 'lightgrey', borderRightWidth: 1, justifyContent: 'center', alignItems: "center"}}
                onPress={this.ChiTietSuKienSo}>
                    <Text style={{color: this.state.tabActive == 'ChiTietSuKienSo' ? 'white' : 'grey', fontSize: text}}>CÁC SỰ KIỆN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'QuyetDinhPhanCongSo' ? '#3E5E8F' : 'white', justifyContent: 'center', alignItems: "center"}}
                onPress={this.QuyetDinhPhanCongSo}>
                    <Text style={{color: this.state.tabActive == 'QuyetDinhPhanCongSo' ? 'white' : 'grey', fontSize: text}}>NHÂN SỰ</Text>
                </TouchableOpacity>
            </View>
          </View> */}
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
        fontSize: 25,
        color: 'grey'
    }
})
