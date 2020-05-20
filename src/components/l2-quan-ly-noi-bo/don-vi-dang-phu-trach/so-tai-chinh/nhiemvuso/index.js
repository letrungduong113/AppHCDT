import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../../../user-controls/utilities/Scale";
import ThongKeBox, { NEW_CATEGORY ,PROCESSING_STATUS, PROCESS_STATUS_TEXT} from "../../../../user-controls/ThongKeBox";
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
import MasterAPI from "../../../../../services/api-service/master-api";
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
import Text from '../../../../custom-view/text'
import { setIndex } from "../../../../../redux/actions/list";
import { openDrawer } from "../../../../../redux/actions/drawer";
import CustomTabs2 from "../../../../navigation-controls/CustomTabs2";
import CustomHeader from "../../../../user-controls/CustomHeader";
import styles from "./styles";
import QuanLyNhiemVuAPI from "../../../../../services/api-service/ql-nhiem-vu-api";
import AppIndicator from "../../../../user-controls/AppIndicator";
import Footer ,{footerMargin} from '../../../../user-controls/CustomFooter'
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
export default  class DsNhiemVuSo extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  getIconType(type) {
    switch (type) {
      case 1:
        return require("../../../../../../assets/images/van-ban/van-ban-type-1.png");
      case 2:
        return require("../../../../../../assets/images/van-ban/van-ban-type-2.png");
      case 3:
        return require("../../../../../../assets/images/van-ban/van-ban-type-4.png");
      case 4:
        return require("../../../../../../assets/images/van-ban/van-ban-type-4.png");
      case 5:
        return require("../../../../../../assets/images/van-ban/van-ban-type-6.png");
      default:
        return require("../../../../../../assets/images/van-ban/van-ban-type-6.png");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      dsLinhVuc: [],
      data_picker: 1,
      isLoading: true,
      data: [],
      statusText: '',
      token: this.props.navigation.getParam("token"),
      task_type: true, //true = nhận nhiệm vụ, false = giao nhiệm vụ
    };
    this.filterProcessStatus = PROCESSING_STATUS.TAT_CA;
  }
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getData();
    });
    // alert(this.state.token)
  }
  onFilterStatus(status) {
    this.filterProcessStatus = status;
    this.setState({statusText: PROCESS_STATUS_TEXT[status]});
    this.reloadData();
  }

  reloadData() {
    //todo
    if (this._thongke) this._thongke.refreshData(this.state.task_type? 2: 1, false);

    if(this.state.task_type){
      this.getDanhSachNhanNhiemVu();
    } else{
      this.getDanhSachGiaoNhiemVu();
    }
    // if(this.state.text_type){
    //   this.getDanhSachVanBanDen();
    // }else{
    //   this.getDanhSachVanBanDi();
    // }
  }

  getData(){
    if(this.state.task_type){
      this.getDanhSachNhanNhiemVu();
    }else{
      this.getDanhSachGiaoNhiemVu();
    }
  }
  getNoiXuLy(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "2"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  getDanhSachNhanNhiemVu() {
    QuanLyNhiemVuAPI.getDsNhiemVuNhan(1, 15, "", this.filterProcessStatus, this.state.token).then(res => {
      if(res!=null){
        for(let i = 0 ;i<res.data.length;i++){
          if(res.data[i].referInfo){
            let noi_xu_ly = JSON.parse(res.data[i].referInfo)
            for(let j = 0; j<noi_xu_ly.length;j++){
              if(noi_xu_ly[j].type == 1) res.data[i].noiXuLy = noi_xu_ly[j].name
            }
          }else {
            res.data[i].noiXuLy = ""
          }
        }
        this.setState({
          data: res.data,
          isLoading: false,
        });
      }
    });
  }
  getDanhSachGiaoNhiemVu() {
    QuanLyNhiemVuAPI.getDsNhiemVuGiao(1, 1000, "", this.filterProcessStatus,this.state.token).then(res => {
      if(res!=null){
        for(let i = 0 ;i<res.data.length;i++){
          if(res.data[i].referInfo){
            let noi_xu_ly = JSON.parse(res.data[i].referInfo)

            for(let j = 0; j<noi_xu_ly.length;j++){
              if(noi_xu_ly[j].type == 2) res.data[i].noiXuLy = noi_xu_ly[j].name
            }
          }else {
            res.data[i].noiXuLy = ""
          }
        }
        this.setState({
          data: res.data,
          isLoading: false,
        });
      }
    });
  }
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
          <AppIndicator />
        </View>
      );
    }
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }
  getColorType(type) {
    switch (type) {
      case '0':
        return "#fc7c43";
      case '1':
        return "#4169a3";
      case '3':
        return "#ed3229";
      default:
        return "#999999";
    }
  }

  getIsDone(value) {
    if (value == "3") return true;
    return false;
  }

  listItems(value) {
    // alert(value.length)
    if(value==null){
      return (<AppIndicator/>)
    }
    return value.map((data, i) => {
      let isDone = this.getIsDone(data.trangThai);
      // alert(JSON.stringify(data))
      return (
        <TouchableOpacity
          style={{
            backgroundColor: isDone ? "#F7F6F7" : "white",
            width: "100%",
            height: scale(140),
            flexDirection: "row",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("NhiemVuChiTietSo", {
              taskID: data.id,
              task_type: this.state.task_type,
              trangThaiId :data.trangThai,
              token: this.state.token,
            });
          }}
        >
          <View
            style={{ flex:1,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: scale(77),
                height: scale(77)
              }}
              source={data.icon}
            />
          </View>
          {/* todo here */}
          <View style={{ flex: 6, justifyContent: "center" ,marginRight:10 }}>
            <Text line ={2} style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    fontSize: FONT_SIZE_SUB,
                    color: "#888888"
                  }}
                >
                  {data.noiXuLy}
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

  render() {
    var task_type = this.state.task_type;
    return (
      <Container style={styles.container}>
        {/* <CustomHeader title="QUẢN LÝ NHIỆM VỤ"/> */}
        <Content style={{ backgroundColor: "#efefef" ,marginBottom:footerMargin}}>

        <ThongKeBox 
            ref = {ref=>this._thongke = ref}
            title="nhiệm vụ" 
            catId={NEW_CATEGORY.NHIEM_VU} 
            token={this.props.navigation.getParam("token")}
            subType={this.state.text_type ? 1: 2}
            onFilter={(status) => this.onFilterStatus(status)} />

          <View style = {{marginTop:5,backgroundColor:'white', padding:10}}>
          <View style = {{borderBottomWidth:1, borderBottomColor:'#f6f6f6'}}>
          

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              this.props.navigation.navigate("TimKiemNhiemVuScreen", {
                task_type: this.state.task_type
              });
            }}
          >
            <View
              style={{
                width: scale(682),
                height: scale(72),
                alignItems: "center",
                marginTop: 10,
                borderColor: "lightgray",
                borderWidth: 1,
                flexDirection: "row",
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-search" style={{ color: "gray" }} />
              </View>
              <View
                style={{
                  flex: 9,
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#b7b7b7" }}>
                  Tìm kiếm
                </Text>
              </View>

              {/* <TouchableOpacity
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
                /> */}
            </View>
          </TouchableOpacity>

          <View style={{margin: 10, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 10}}>
              <Text  style={{color: '#217de0', fontSize:FONT_SIZE_MAIN}}>
                <Text style={{fontWeight: '800', color: '#217de0', fontSize:scale(30)}}>{this.state.data && this.state.data.length ? this.state.data.length: 0}</Text>
                &nbsp;nhiệm vụ&nbsp;{this.state.task_type? 'nhận': 'giao'}&nbsp;{this.state.statusText}
              </Text>
            </View>
          </View>
          
          {this.renderItems()}
          </View>
        </Content>
        {/* <Footer select='0'/> */}
       
      </Container>
    );
  }
}