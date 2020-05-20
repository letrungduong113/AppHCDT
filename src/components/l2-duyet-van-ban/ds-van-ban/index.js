import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform
} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ThongKeBox, { NEW_CATEGORY ,PROCESSING_STATUS, PROCESS_STATUS_TEXT} from "../../user-controls/ThongKeBox";
import ThongKeAllBox from "../../user-controls/ThongKeBox/thong_ke_all";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text,
  Picker
} from "native-base";
import styles from "./styles";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale,moderateScale } from "../../user-controls/utilities/Scale";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import MasterAPI from "../../../services/api-service/master-api";
import AppIndicator from "../../user-controls/AppIndicator";
import Footer ,{footerMargin,footerHeight} from '../../user-controls/CustomFooter'
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"
import VanBanDiCpn from "../ds-van-ban/van_ban_di_cpn"
import VanBanDenCpn from "../ds-van-ban/van_ban_den_cpn"

import {getPaddingTop,getHeaderSize} from '../../user-controls/utilities/StatusBar'
import { TabBar } from 'react-native-tab-view';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_SUB = scale(22);

export default class DsVanBanScreen extends Component {

  FirstRoute = () => (
    <ThongKeAllBox 
    navigation={this.props.navigation}
    ref = {ref=>this._thongke = ref}
    title="văn bản" 
    catId={NEW_CATEGORY.VAN_BAN} 
    subType={1}
    onFilter={(status) => this.onFilterStatus(status)} />
  );
  SecondRoute = () => (
      <VanBanDenCpn navigation={this.props.navigation} />
  );
  ThirdRoute = () => (
    <VanBanDiCpn navigation={this.props.navigation}  />
);

renderTabBar = props => <TabBar {...props}
    indicatorStyle={{ backgroundColor: '#777777' }}
    style={{ backgroundColor: 'white'}}
    labelStyle = {{color:'#666666'}}
   
    // tabStyle = {{color:'green'}}
     />;
  
  
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
      data: [],
      loadMore:false,
      listDocTypes: [],
      statusText: '',
      selectedDocType:0,
      text_type: true, // true = văn bản đến, false = văn bản đi
      index: 0,
      routes: [
        { key: 'first', title: 'THỐNG KÊ' },
        { key: 'second', title: 'VĂN BẢN ĐẾN' },
        { key: 'third', title: 'VĂN BẢN ĐI' },
      ],
    };

    this.filterProcessStatus = PROCESSING_STATUS.TAT_CA;
    this.filterDocType = 0;
  }

  getLoaiVanBan(value) {
    if (value == null || value == '') {
      return ""
    } else {
      var arr = value.split(";");
      // var textFormat = arr[1]
      if (arr[0]) {
        arr2 = arr[0].split(",");
        return arr2[0];
      }
      return "";
    }
  }

  componentDidMount() {

    // this._subscribe = this.props.navigation.addListener('didFocus', () => {
    //   this.getData();
    // });

    MasterAPI.getDsLoaiTaiLieu().then((res)=> {
      if(res!=null)
      this.setState({listDocTypes: res, isLoading1: false});
      // alert(JSON.stringify(this.state.listDocTypes));
    });
  }
  
  getData(){
    if(this.state.text_type){
      this.getDanhSachVanBanDen()
    }else{
      this.getDanhSachVanBanDi()
    }
  }
  loadMoreData(){
      this.state.loadMore=true
      this.setState({loadMore:true})
    if(this.state.text_type){
      this.getDanhSachVanBanDen(true)
    }else{
      this.getDanhSachVanBanDi(true)
    }
  }
  getDanhSachVanBanDen(loadMore=false) {
      DanhSachVanBanAPI.getdsvanbanden(loadMore?this.state.data.length/10+1:1, 10,this.filterDocType,this.filterProcessStatus).then(res => {
        if(res && res.vanBans){
          this.setState({
            isLoading: false,
            loadMore:false,
            data: loadMore?this.state.data.concat(res.vanBans):res.vanBans,
          });
        }else{
          this.setState({
            isLoading: false,
            loadMore:false,
          });
        }
      });
  }

  getDanhSachVanBanDi(loadMore=false) {
    // if(!loadMore) (this.state.isLoading = true),
      DanhSachVanBanAPI.getdsvanbandi(loadMore?this.state.data.length/10+1:1, 10,this.filterDocType,this.filterProcessStatus).then(res => {
        if(res && res.vanBans){
          this.setState({
            isLoading: false,
            loadMore:false,
            data: loadMore?this.state.data.concat(res.vanBans):res.vanBans,
          });
        }else{
          this.setState({
            isLoading: false,
            loadMore:false
          });
        }
      });
  }

  // newPage(index) {
  //   this.props.setIndex(index);
  //   Actions.blankPage();
  // }

  renderItems() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: 400,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <AppIndicator></AppIndicator>
        </View>
      );
    }
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }

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
  getColorType(type) {
    switch (type) {
      case 0:
        return "#fc7c43";
      case 1:
        return "#4169a3";
      case 3:
        return "#ed3229";
      default:
        return "#999999";
    }
  }

  getIsDone(value) {
    if (value == 1121) return true;
    return false;
  }

  listItems(value) {
    return value.map((data, i) => {
      let isDone = this.getIsDone(data.trangThai);
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            height: scale(140),
            width: "100%",
            backgroundColor: isDone ? "#f6f6f6" : "white",
            flexDirection: "row",
            borderTopWidth:1,
            borderTopColor:'#eeeeee'
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("VanBanChiTiet", {
              id: data.id,
              text_type: this.state.text_type
            });
          }}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: scale(77), height: scale(77) }}
              source = {data.icon}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: FONT_SIZE_MAIN,
                color: "#333333",
                marginRight: 20
              }}
            >
              {data.tieuDe}
            </Text>
            <View style={{marginTop:5, flexDirection: "row" }}>
              <View
                style={{
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                  alignItems: "center"
                }}
              >
                <Text
                numberOfLines = {1}
                  style={{
                    marginRight: 10,
                    fontSize: FONT_SIZE_SUB,
                    color: "#888888"
                  }}
                >
                  {data.docType}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: this.getColorType(data.trangThai)
                  }}
                >
                  {data.tenTrangThai}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }


  renderPicker() {
        
    return (
      <View>
        <View style={{flexDirection: "row", flex: 10, borderColor: '#d7d7d7', backgroundColor:'#fafafa', borderWidth: 1 }}>
          <Picker
            textStyle={{fontSize: FONT_SIZE_MAIN,color:'#464646'}}
            selectedValue={this.state.selectedDocType}
            style={{ flex: 8, height: scale(64)}}
            iosHeader="Mời bạn chọn"
            headerBackButtonTextStyle = {{padding:20}}
            headerTitleStyle = {{paddingTop:20}}
            headerBackButtonText="Hủy"
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({selectedDocType: itemValue });
                this.onfilterDocType(itemValue)
            }
              
            }
          >
            <Picker.Item label="Tất cả loại văn bản" value={0} />
            {
                this.state.listDocTypes.map((item, index) => {
                    return (<Picker.Item label={item.catValue} value={item.id} />)
                })
            }
          </Picker>
          {Platform.OS == "ios" ? (
              <Image
                source={require("../../../../images/logo/sortdown.png" )}
                style={{ height: 10, width: 10 , position: "absolute",top:15,right:15}}
              />
          
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }

  onFilterStatus(status) {
    this.filterProcessStatus = status;
    this.setState({statusText: PROCESS_STATUS_TEXT[status]});
    this.reloadData();
  }

  onfilterDocType(linhvuc) {
    this.filterDocType = linhvuc;
    this.reloadData();
  }

  reloadData() {
    //todo
    // if (this._thongke) this._thongke.refreshData(this.state.text_type? 2: 1, false);

    if(this.state.text_type){
      this.getDanhSachVanBanDen();
    }else{
      this.getDanhSachVanBanDi();
    }
  }
  isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=contentSize.height - paddingToBottom;
  }

  // _renderTabBar = props => {
  //   const inputRange = props.navigationState.routes.map((x, i) => i);
  //   return (
  //     <View style={styles.tabBar}>
  //       {props.navigationState.routes.map((route, i) => {
  //         const color = Animated.color(
  //           Animated.round(
  //             Animated.interpolate(props.position, {
  //               inputRange,
  //               outputRange: inputRange.map(inputIndex =>
  //                 inputIndex === i ? 255 : 0
  //               ),
  //             })
  //           ),
  //           0,
  //           0
  //         );

  //         return (
  //           <TouchableOpacity
  //             style={styles.tabItem}
  //             onPress={() => this.setState({ index: i })}>
  //             <Animated.Text style={{ color }}>{route.title}</Animated.Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };


  render() {
    var text_type = this.state.text_type;
    return (
      <Container style={styles.container}>
        <CustomHeader title={GROBAL_RESOUCE.VAN_BAN_TITLE} />
        {/* <Content 
         scrollEnabled = {false} */}
             {/* onScroll={({nativeEvent}) => {
             if (this.isScrollEnd(nativeEvent) && !this.state.loadMore) {
                 this.loadMoreData()
             }}}
             style={{marginBottom:footerMargin}}
             > */}
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
          {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
               
            <View
              style={{
                margin: 10,
                width: scale(682),
                height: verticalScale(64),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  backgroundColor: text_type ? "#3d5f90" : "white",
                  borderColor: "#e1e1e1",
                  borderWidth: text_type ? 0 : 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  if (!this.state.text_type) {
                    this.setState({
                      isLoading:true,
                      data:[],
                      text_type:true
                    }, ()=> this.reloadData())
                    
                  }
                }}
              >
                <Text
                  style={{
                    color: text_type ? "white" : "#6f6f6f",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  {GROBAL_RESOUCE.VAN_BAN_DEN}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  backgroundColor: "white",
                  backgroundColor: text_type ? "white" : "#3d5f90",
                  borderColor: "#e1e1e1",
                  borderWidth: text_type ? 1 : 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  if (this.state.text_type) {
                    this.setState({
                      isLoading:true,
                      data:[],
                      text_type:false
                    }, () => this.reloadData())
                    
                  }
                }}
              >
                <Text
                  style={{
                    color: text_type ? "#6f6f6f" : "white",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  {GROBAL_RESOUCE.VAN_BAN_DI}
                </Text>
              </TouchableOpacity>
            </View>
            <View
                style={{
                    width: scale(682),
                    height: verticalScale(72),
                    alignItems: "center",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    flexDirection: "row",
                    backgroundColor: "white"
                }}
                >
                <TouchableOpacity
                    style={{
                    flex: 10,
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <Icon name="ios-search" style={{ color: "gray" }} />
                </TouchableOpacity>
                <TextInput
                    style={{ flex: 90, height: 40 }}
                    onChangeText={text => this.setState({ 
                        // listData: this.state.defaultlistData.filter(unit => unit.donVi.includes(text)),
                        })}
                    underlineColorAndroid="transparent"
                    placeholder="Tìm kiếm"
                />
                </View>
            </View> */}
            {/* <View style={[styles.container2,{marginTop:10}]}>{this.renderPicker()}</View> */}
            {/* <View style={{margin: 10, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 10}}>
              <Text  style={{color: '#217de0', fontSize:FONT_SIZE_MAIN}}>
                <Text style={{fontWeight: '800', color: '#217de0', fontSize:FONT_SIZE_30}}>{this.state.data && this.state.data.length ? this.state.data.length: 0}</Text>
                &nbsp;{GROBAL_RESOUCE.VAN_BAN}&nbsp;{this.state.text_type? 'đến': 'đi'}&nbsp;{this.state.statusText}
              </Text>
            </View> */}
            {/* {this.renderItems()} */}
          </View>
        {/* </Content> */}
        <Footer select='0'/>
      </Container>
    );
  }
}
