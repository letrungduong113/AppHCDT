import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import ThongKeAllBox, { NEW_CATEGORY ,PROCESSING_STATUS, PROCESS_STATUS_TEXT} from "../../user-controls/ThongKeBox/thong_ke_all";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MasterAPI from "../../../services/api-service/master-api";
import {convertTime, convertDate} from "../../user-controls/utilities/converter";
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
  View
} from "native-base";
import Text from '../../custom-view/text'
import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import NhanNhiemVuAPI from "../../../services/api-service/nhan-nhiem-vu-api";
import CommonAPI from "../../../services/api-service/nhan-nhiem-vu-api";
import AppIndicator from "../../user-controls/AppIndicator";
import Footer ,{footerMargin} from '../../user-controls/CustomFooter'
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"

import { TabBar, TabView, SceneMap  } from 'react-native-tab-view';
import {getPaddingTop,getHeaderSize} from '../../user-controls/utilities/StatusBar'
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default  class DsNhiemVuScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };
  // tab
  FirstRoute = () => (
    <ThongKeAllBox 
        style={{flex:1}}
        navigation={this.props.navigation}
        // ref = {ref=>this._thongke = ref}
        title="" 
        type={1}
        catId={NEW_CATEGORY.NHIEM_VU} 
        subType={this.state.text_type ? 1: 2}
        onFilter={(status) => this.onFilterStatus(status)} />
  );
  SecondRoute = () => (
    <ThongKeAllBox 
        style={{flex:1}}
        navigation={this.props.navigation}
        // ref = {ref=>this._thongke = ref}
        title="" 
        type={2}
        catId={NEW_CATEGORY.NHIEM_VU} 
        subType={this.state.text_type ? 1: 2}
        onFilter={(status) => this.onFilterStatus(status)} />
  );
  ThirdRoute = () => (
    <ThongKeAllBox 
        style={{flex:1}}
        navigation={this.props.navigation}
        // ref = {ref=>this._thongke = ref}
        title="" 
        type={3}
        catId={NEW_CATEGORY.NHIEM_VU} 
        subType={this.state.text_type ? 1: 2}
        onFilter={(status) => this.onFilterStatus(status)} />
);
renderTabBar = props => <TabBar {...props}
    indicatorStyle={{ backgroundColor: '#777777' }}
    style={{ backgroundColor: 'white'}}
    labelStyle = {{color:'#666666'}}
   
    // tabStyle = {{color:'green'}}
     />;

  getIconType(type) {
    switch (type) {
      case 1:
        return require("../../../../assets/images/van-ban/van-ban-type-1.png");
      case 2:
        return require("../../../../assets/images/van-ban/van-ban-type-2.png");
      case 3:
        return require("../../../../assets/images/van-ban/van-ban-type-4.png");
      case 4:
        return require("../../../../assets/images/van-ban/van-ban-type-4.png");
      case 5:
        return require("../../../../assets/images/van-ban/van-ban-type-6.png");
      default:
        return require("../../../../assets/images/van-ban/van-ban-type-6.png");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      dsLinhVuc: [],
      data_picker: 1,
      isLoading: true,
      data: [],
      data2:[],
      loadMore:true,
      statusText: '',
      task_type: true, //true = nhận nhiệm vụ, false = giao nhiệm vụ
      index: 0,
      routes: [
        { key: 'first', title: 'Sở ngành' },
        { key: 'second', title: 'Địa phương' },
        { key: 'third', title: 'Phòng ban' },
      ],
    };

    this.filterProcessStatus = PROCESSING_STATUS.TAT_CA;
  }


  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    var task_type = this.state.task_type;
    return (
        <Container style={styles.container}>
        <CustomHeader title={GROBAL_RESOUCE.BAO_CAO_TONG_HOP_KET_LUAN_TITLE_DETAIL} />
          <View style={{backgroundColor: 'white', height:deviceHeight-verticalScale(109)-getHeaderSize(), paddingBottom:footerMargin}}>
            
            <TabView
            // scrollEnabled = {true}
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.SecondRoute,
                third : this.ThirdRoute,
              })}
              renderTabBar={this.renderTabBar}
              onIndexChange={index => {
                // alert(index)
                switch(index){
                  case 1:{
                    this.setState({text_type:true})
                    // alert(JSON.stringify(this.state.data))
                    // this.getData();
                  }break;
                  case 2:{
                    this.setState({text_type:false})
                    // this.getData();
                  }
                  break;
                }
                this.setState({index})
              }}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </View>
        <Footer select='0'/>
      </Container>
    
    );
  }
}