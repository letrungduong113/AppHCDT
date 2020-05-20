import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import YearMonthPicker from '../user-controls/YearPicker';
import moment from 'moment';
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
import Text from '../custom-view/text'
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import styles from "./styles";
import NhanNhiemVuAPI from "../../services/api-service/nhan-nhiem-vu-api";
import AppIndicator from "../user-controls/AppIndicator";
import Footer ,{footerMargin} from '../user-controls/CustomFooter';
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
export default class BaoCaoVaDieuHanhScreen extends Component {
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
        return require("../../../assets/images/van-ban/van-ban-type-1.png");
      case 2:
        return require("../../../assets/images/van-ban/van-ban-type-2.png");
      case 3:
        return require("../../../assets/images/van-ban/van-ban-type-4.png");
      case 4:
        return require("../../../assets/images/van-ban/van-ban-type-4.png");
      case 5:
        return require("../../../assets/images/van-ban/van-ban-type-6.png");
      default:
        return require("../../../assets/images/van-ban/van-ban-type-6.png");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      sizeList:0,
      dsLinhVuc: [],
      data_picker: 1,
      isLoading: true,
      data: [],
      monthPicker:false,
      year: moment().format('YYYY'),
      task_type: true, //true = nhận nhiệm vụ, false = giao nhiệm vụ
      listChiTieu: [
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
    ],
    };
  }

  componentDidMount() {
    NhanNhiemVuAPI.getDsNhiemVuNhan(1, 1000, "").then(res => {
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
          sizeList:res.size,
          data: res.data,
          isLoading: false,
          task_type: true
        });
      }
    });
    MucTieuAPI.getDsMucTieu(1, 1, 100, this.state.year).then((res)=>{
    if(res!=null){
      this.setState({listChiTieu: res[0].data, isLoading2: false});
      
    }
  });
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
    this.setState({
      sizeList:"",
      isLoading: true,
    })
    NhanNhiemVuAPI.getDsNhiemVuNhan(1, 1000, "").then(res => {
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
          sizeList:res.size,
          data: res.data,
          isLoading: false,
        });
      }
    });
  }
  getDanhSachGiaoNhiemVu() {
    this.setState({
      sizeList:"",
      isLoading: true,
    })
    NhanNhiemVuAPI.getDsNhiemVuGiao(1, 1000, "").then(res => {
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
          sizeList:res.size,
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
      case "0":
        return "#fc7c43";
      case "1":
        return "#4169a3";
      case "3":
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
            this.props.navigation.navigate("NhiemVuChiTiet", {
              taskID: data.id,
              task_type: this.state.task_type,
              trangThaiId :data.trangThai,
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

  renderItem2(data){
    return(
        <FlatList
            data= {data}
            renderItem={({item}) => 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet', {id: item.id})} >
                        <View style={styles2.itemts} >
                            <View style={{ width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
                                <Image 
                                source={item.icon?item.icon: require('../../../assets/images/muctieu/default.png')}
                                // source={require("../../../images/logo/mt_home.png")}
                                    style={{ width: "70%", height:"70%", resizeMode: "contain",  }}
                                />
                            </View>
                            <View style={{ justifyContent: "center", width: win.width-scale(102) }}>
                                <Text numberOfLines={1} style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{item.noiDung?item.noiDung:""}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {/* <View style={{width: win.width-scale(250)}}> */}
                                    <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red" }}>{item.giaTriKeHoach}</Text>
                                    {/* <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red", marginLeft: 2 }}>{item.donVi?item.donVi:""}</Text> */}
                                    {/* </View> */}
                                    {/* <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
                                        <Control ratio={item.tiendo?item.tiendo:0} color= {item.tiendo >= 66 ? '#32b81b': (item.tiendo >= 33 ? '#ffc835': '#da3838')}/>
                                    </View> */}
                                </View>

                            </View>
                            {/* <View style={{ position: "absolute", right: 0, width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center", }}>
                                <Icon name="ios-arrow-forward" style={{ color: "#d7d7d7" }} />
                            </View> */}
                        </View>
                    </TouchableOpacity>
                }
        />
    );
}
pickMonthYear(year){
  this.setState({
      year: year,
  });
  // MucTieuAPI.getDsMucTieu(0, 1, 100, year).then((res)=>{
  //     if(res!=null){
  //       this.setState({listData: res, isLoading2: false});
  //     }
  //   });
}

  render() {
    var task_type = this.state.task_type;
    return (
      <Container style={styles.container}>
        <CustomHeader title="XEM BÁO CÁO VÀ ĐIỀU HÀNH" source={require('../../../assets/images/icon/ic_calendar.png')} goto={()=>this.setState({monthPicker:true})}/>
        <Content style={{ backgroundColor: "#efefef" ,marginBottom:footerMargin}}>
        <View style={styles2.container}>
                        <View style={styles2.itemts} >
                                <View style={{height: scale(95), justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{paddingLeft: scale(20), fontSize: scale(30)}}>CHỈ TIÊU KINH TẾ XÃ HỘI</Text>
                                </View>
                        </View>
                        {this.renderItem2(this.state.listChiTieu)}
                    </View>
          <View style = {{ marginTop:5, backgroundColor:'white', flexDirection:'column'}}>
          <View
            style={{
              borderColor:'#e1e1e1',
              borderWidth:1,
              marginTop: 10,
              marginLeft: 10,
              width: scale(682),
              height: scale(64),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "100%",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: task_type ? "#3D5F8F" : "white",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  if (!this.state.task_type) {
                    this.setState({
                      isLoading: true,
                      data: [],task_type:true
                    });
                    this.getDanhSachNhanNhiemVu();
                  }
                }}
              >
                <Text
                  style={{
                    color: task_type ? "white" : "black",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  NHẬN NHIỆM VỤ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: task_type ? "white" : "#3D5F8F",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  if (this.state.task_type) {
                    this.setState({
                      isLoading: true,
                      data: [],task_type:false
                    });
                    this.getDanhSachGiaoNhiemVu();
                  }
                }}
              >
                <Text
                  style={{
                    color: task_type ? "black" : "white",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  GIAO NHIỆM VỤ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom:10, marginTop:10 }}>
           <Text style={{fontWeight:'bold', marginRight: 15, color: '#217de0', fontSize: FONT_SIZE_MAIN }}>{this.state.sizeList}&nbsp;
           {this.state.task_type ? <Text style={{ fontWeight:'normal', color: '#217de0', fontSize: FONT_SIZE_MAIN }}>nhận nhiệm vụ</Text> : <Text style={{fontWeight:'normal',  color: '#217de0', fontSize: FONT_SIZE_MAIN }}>giao nhiệm vụ</Text>}
           
           </Text>
          </View>
          </View>
          {this.renderItems()}
          <YearMonthPicker
            visible={this.state.monthPicker}
            onClose={()=>this.setState({monthPicker:false})}
            year={this.state.year}
            selectYear2={(year)=>this.pickMonthYear(year)}
            />
        </Content>
        <Footer select='0'/>
       
      </Container>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: "#ffffff",
      flex: 1,
  },
  container2: {
      marginLeft: scale(18),
      marginRight: scale(18),
      //backgroundColor: "white",
      flex: 1,
  },
  content: {
      backgroundColor: "white",
      // marginTop: scale(20),
  },
  viewtitle: {
      borderBottomColor: "gray",
      borderBottomWidth: 0.4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  titleText: {
      fontSize: scale(26),
      color: "black"
  },
  itemts: {
      flexDirection: 'row',
      borderBottomColor: "gray",
      borderBottomWidth: 0.4,
  }
});
