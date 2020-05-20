import React, { Component } from "react";
import { TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
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
import CustomHeader from "../user-controls/CustomHeader";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer"
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'
// import styles from "./styles";

var searchHeight = verticalScale(72)
var searchWidth = scale(682)
var text = scale(24)
var tabHeight = verticalScale(64)
var iconSearchHeight = verticalScale(33)
var iconSearchWidth = scale(33)

export default class Main extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoading: false,
      tabActive: 'CongDongMang'
    }

  }
  CongDongMang = () => {
    this.setState({
      tabActive: 'CongDongMang'
    })
    this.props.navigation.navigate('CongDongMang')
  }
  NguoiDan = () => {
    this.setState({
      tabActive: 'NguoiDan'
    })
    this.props.navigation.navigate('NguoiDan')
  }
  DoanhNghiep = () => {
    this.setState({
      tabActive: 'DoanhNghiep'
    })
    this.props.navigation.navigate('DoanhNghiep')
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

  // constructor(props){
  //   super(props);
  //   this.state ={ 
  //     isLoading: false,
  //     isFirstTab: true
  //   }
  // }

  // changeTab(index) {
  //   switch (index) {
  //     case 0:
  //       this.setState({ isFirstTab: true });
  //       break;
  //     case 1:
  //       this.setState({ isFirstTab: false });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="LẮNG NGHE DƯ LUẬN"></CustomHeader>
        {/* <Content> */}
          <View style={{alignItems: "center"}}>
            <View style={{width: searchWidth, alignItems: "center", marginTop: 10, marginBottom: 10, borderColor: 'lightgrey', borderWidth: 1, flexDirection: "row", backgroundColor: 'white'}}>
              <TouchableOpacity style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
                <Image source={require('../../../assets/images/l2-du-luan/search.png')} style={{width: iconSearchWidth, height: iconSearchHeight}} />
              </TouchableOpacity>
              <TextInput
                style={{flex: 90, height: searchHeight}}
                onChangeText={(text) => this.setState({text})}
                underlineColorAndroid='transparent'
                placeholder='Tìm kiếm'
                value={this.state.text}
              />
            </View>

            <View style={{width: '95%', height: tabHeight, flexDirection: "row", backgroundColor: 'white', borderColor: 'lightgrey', borderWidth: 1}}>
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'CongDongMang' ? '#3E5E8F' : 'white', borderRightColor: 'lightgrey', borderRightWidth: 1, justifyContent: 'center', alignItems: "center"}}
                onPress={this.CongDongMang}>
                    <Text style={{color: this.state.tabActive == 'CongDongMang' ? 'white' : 'grey', fontSize: text}}>CỘNG ĐỒNG MẠNG</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'NguoiDan' ? '#3E5E8F' : 'white', borderRightColor: 'lightgrey', borderRightWidth: 1, justifyContent: 'center', alignItems: "center"}}
                onPress={this.NguoiDan}>
                    <Text style={{color: this.state.tabActive == 'NguoiDan' ? 'white' : 'grey', fontSize: text}}>NGƯỜI DÂN</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex: 1, backgroundColor: this.state.tabActive == 'DoanhNghiep' ? '#3E5E8F' : 'white', justifyContent: 'center', alignItems: "center"}}
                onPress={this.DoanhNghiep}>
                    <Text style={{color: this.state.tabActive == 'DoanhNghiep' ? 'white' : 'grey', fontSize: text}}>DOANH NGHIỆP</Text>
                </TouchableOpacity>
            </View>
          </View>
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
