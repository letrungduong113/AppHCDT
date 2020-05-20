import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, StyleSheet, StatusBar } from "react-native";
import { connect } from "react-redux";
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
import CustomTabs2 from "../navigation-controls/CustomTabs2";
// import styles from "./styles";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: false, 
    }
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  // componentWillUnmount() {
  //   StatusBar.setTranslucent(true);
  // }

  render() {
    return (
      <Container style={styles.container}>
      {/* <StatusBar backgroundColor="transparent" barStyle="light-content" /> */}

        <ImageBackground source={require('../../../images/headerbg.jpg')} style={{width: '100%', height: 60, flexDirection: "row", alignItems: "center", position: "relative"}}>
                <View style={{position: "absolute", left: 15}}>
                    <Image source={require('../../../assets/images/home/quochuy.png')} style={{width: 40, height: 40}}/>
                </View>

                <View style={{position: "absolute", left: 70}}>
                    <Text style={{color: '#FCD2AB', fontSize: 12}}>UBND TỈNH BẮC NINH</Text>
                    <Text style={{fontWeight: "bold", fontSize: 14, color: 'white'}}>HỆ THỐNG HÀNH CHÍNH ĐIỆN TỬ</Text>
                </View>

                {/* <Button
                    transparent
                    onPress={() => DrawerNav.navigate("DrawerOpen")}>
                    <Icon active name="ios-contact" style={{color: 'white', fontSize: 40, marginTop: 20, marginLeft: 60}} />
                </Button> */}
                <TouchableOpacity
                    style={{position: "absolute", right: 15, bottom: 10}}
                    onPress={() => DrawerNav.navigate("DrawerOpen")}>
                    <Image source={require('../../../assets/images/home/avatar.png')} style={{width: 40, height: 40, borderRadius: 50}}/>
                </TouchableOpacity>
        </ImageBackground>
        
        <Content>

          <View style={{width: '100%', height: 545}}>
            
            <View style={{alignItems: "center", marginBottom: 20, justifyContent: "center"}}>
              <ImageBackground style={{width: '97%', height: 200, marginTop: 10, alignItems: "center", position: "relative"}}
                source={require('../../../assets/images/home/anhtin.png')}>
                <View style={{position: "absolute", bottom: 10, left: 10, right: 10}}>
                  <Text style={{color: 'white', fontWeight: "bold"}}>TRIỂN KHAI THÁNG HÀNH ĐỘNG VÌ NGƯỜI CAO TUỔI VIỆT NAM NĂM 2019</Text>
                  <Text style={{color: 'white'}}>14/03/2019 8:39</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={{flex: 1}}> 
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("CongTacLapPhapLv2");}}>
                    <Image source={require('../../../assets/images/home/khancap.png')}  style={styles._9icons}/>
                    <View style={styles.baotext}>
                      <Text style={styles.text}>KHẨN CẤP</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable} 
                    onPress = {()=> {this.props.navigation.navigate("DanhSachHDGiamSat");}}>
                    <Image source={require('../../../assets/images/home/muctieu.png')}  style={styles._9icons}/>
                    <View style={styles.baotext}>
                      <Text style={styles.text}>MỤC TIÊU</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("DsKyHopQuocHoiChiTiet");}}>
                    <Image source={require('../../../assets/images/home/baocao.png')}  style={styles._9icons} />
                    <View style={styles.baotext}>
                      <Text style={styles.text}>BÁO CÁO</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("TiepXucCuTri");}}>
                    <Image source={require('../../../assets/images/home/chidaodieuhanh.png')}  style={styles._9icons} />
                    <View style={styles.baotext}>
                      <Text style={styles.text}>CHỈ ĐẠO</Text>
                      <Text style={styles.text}>ĐIỀU HÀNH</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("DanhSachDoanDaiBieu");}}>
                    <Image source={require('../../../assets/images/home/hethongvanban.png')}  style={styles._9icons} />
                    <View style={styles.baotext}>
                      <Text style={styles.text}>HỆ THỐNG</Text>
                      <Text style={styles.text}>VĂN BẢN</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("DsVanPhongDienTu2");}}>
                    <Image source={require('../../../assets/images/home/linhvucquanly.png')}   style={styles._9icons}/>
                    <View style={styles.baotext}>
                      <Text style={styles.text}>LĨNH VỰC</Text>
                      <Text style={styles.text}>QUẢN LÝ</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("TongHopDanhSachBaoCao");}}>
                    <Image source={require('../../../assets/images/home/hanhchinhcong.png')}    style={styles._9icons} />
                    <View style={styles.baotext}>
                      <Text style={styles.text}>HÀNH CHÍNH CÔNG</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("DanhSachUyBan");}}>
                    <Image source={require('../../../assets/images/home/duluan.png')}  style={styles._9icons} />
                      <View style={styles.baotext}>
                        <Text style={styles.text}>DƯ LUẬN</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                    onPress = {()=> {this.props.navigation.navigate("HoatDongQuocHoi");}}>
                    <Image source={require('../../../assets/images/home/lichcongtac.png')}  style={styles._9icons}/>
                    <View style={styles.baotext}>
                      <Text style={styles.text}>LỊCH CÔNG TÁC</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            
          </View>
        </Content>
        <Footer style={{height: 60, backgroundColor: 'transparent'}}>
          <View>
              <CustomTabs2 active = '0'/>
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {fontSize: 12},
  baotext: { justifyContent: 'center', alignItems: 'center'},
  touchable: {flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10},
  _9icons: {width: 60, height: 60, marginBottom: 5}
})


function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(HomeScreen);
// const DrawNav = CreateDrawerNavigator(
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