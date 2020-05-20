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
  View,
  Picker,
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
import MasterAPI from "../../services/api-service/master-api";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
import LinhVucQuanLyAPI from '../../services/api-service/linh-vuc-quan-ly-api';
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn";
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const icon_size=scale(57);
const win = Dimensions.get("window");
export default class ChiTieuFragment extends Component {
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
      // token: this.props.navigation.getParam("userToken"),
      // titlePage: this.props.navigation.getParam("nameSoNganh")? this.props.navigation.getParam("nameSoNganh") : GROBAL_RESOUCE.BAO_CAO_KINH_TE_XA_HOI_TITLE_DETAIL,
      // isSoNganh: this.props.navigation.getParam("showSoNganh"),
      sizeList:0,
      pageNumber: 1,
      isLoading2: true,
      data: [],
      data1: 0,
      year: moment().format('YYYY'),
      listChiTieu: [],
    };
  }

  componentDidMount() {
    
    MucTieuAPI.getDsMucTieu(0, 1, 100, this.state.year, 0, 0, this.props.token).then((res)=>{
      // alert(JSON.stringify(res));
    if(res!=null){
      this.setState({listChiTieu: res, isLoading2: false});  
      // console.log('muctie',res);
      }
    });
  }


  addThousandsSeparator(input) {
    var output = input
    if (parseFloat(input)) {
        input = new String(input); // so you can perform string operations
        var parts = input.split("."); // remove the decimal part
        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
        output = parts.join(".");
    }

    return output;
  }

  replaceRN(data){
    if (data) {
      data =  data.replace("\r\n", "");
    }
    return data;
  }

  renderItem3(data){
    return(
      <FlatList
        data={data}
        renderItem={({item})=>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet', {id: item.id, idCttk: this.replaceRN(item.idCttk), groupId: item.groupId})} >
            <View style={styles2.card}>
              
            <View style={{flexDirection: "row", alignItems: "flex-start", paddingTop:scale(17),paddingBottom: scale(17), paddingRight: scale(17)}}>
                <View style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
                  <Image 
                  source={item.icon?item.icon: require('../../../assets/images/muctieu/default.png')}
                  style={{ width: icon_size, height:icon_size, resizeMode: "contain",  }}
                  />
                </View>
                <View style={{flex: 60,justifyContent: "center", alignItems: "flex-start"}}>
                  <Text numberOfLines={1} style={{ fontSize: scale(31), color: "#333333", fontStyle: "normal", paddingRight: scale(20) }}>{item.noiDung?item.noiDung:""}</Text>
                </View>
                <View style={{flex: 10, alignItems: "flex-end"}}>
                <Image 
                  source={require('../../../assets/images/bao-cao-dieu-hanh/more.png')}
                  style={{ width: scale(46), height:scale(46)}}
                  />
                </View>
            </View>
            <View style={{width:win.width,height:1,backgroundColor:'#f5f5f5',margin:scale(5),marginBottom:verticalScale(10)}}/>
              <View style={{flexDirection: "row",width: "100%", borderRadius: 4,paddingBottom:scale(5)}}>
                
                <View style={{flex: 1,marginRight:scale(5)}}>
                  <Text style={{ marginTop:verticalScale(10), textAlign: 'center',color:'#999999',fontSize:scale(23)}}>Kế hoạch</Text>
                  <Text numberOfLines={1} style={{  marginTop:verticalScale(10),textAlign: 'center',fontSize: scale(61), color: "#c01713", fontWeight: "bold" }}>{this.addThousandsSeparator(item.giaTriKeHoach)} {item.donVi=="%"?item.donVi:""}</Text>
                  <Text numberOfLines={1} style={{  marginTop:verticalScale(10),textAlign: 'center',fontSize: scale(27), color: "#333333", marginLeft: 2 }}>{item.donVi!="%"?item.donVi:""}</Text>
                </View>


                <View style={{flex:1,marginRight:scale(5),justifyContent:'center',alignItems:'center',marginBottom:verticalScale(10)}}>
                    <Text style={{  marginTop:verticalScale(10),textAlign: 'center',color:'#999999',fontSize:scale(23)}}>Thực hiện</Text>
                    <Text numberOfLines={1} style={{ marginTop:verticalScale(10),fontSize: scale(61), color: "#c01713", fontWeight: "bold" }}>{this.addThousandsSeparator(item.totalResultValue)} {item.donVi=="%"?item.donVi:""}</Text>
                    <Text numberOfLines={1} style={{ marginTop:verticalScale(10),fontSize: scale(27), color: "#333333", marginLeft: 2 }}>{item.donVi!="%"?item.donVi:""}</Text>
                    {/* {item.compare!=null?(
                      <View style={{width: "75%", height: scale(70), backgroundColor: "white", flexDirection: "row"}}>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                          <Image 
                          source={item.compare>=0? require('../../../assets/images/bao-cao-dieu-hanh/icon_tang.png'): require('../../../assets/images/bao-cao-dieu-hanh/icon_giam.png')}
                          style={{ width: "50%", height:"50%", resizeMode: "contain",  }}
                        />
                        </View>
                        <View style={{flex: 5, justifyContent: "center", alignItems: "flex-start"}}>
                          <Text style={{color: item.compare>=0?"#5bc77b":"#c01713", fontSize: scale(23)}}>{item.compare>=0?"Tăng "+item.compare:"Giảm "+(-item.compare)}{"%"}</Text>
                        </View>
                      </View>
                    ):(
                      <View style={{width: "50%", height: scale(70), backgroundColor: "white", flexDirection: "row"}}/>
                    )} */}
                    
                    
                </View>

                
                
              </View>
            </View>
          </TouchableOpacity>
        }
    />
    );    
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content
          // onScrollEndDrag={
          //     ()=>{
          //       if(!this.state.isLoading2){
          //         let page=this.state.pageNumber+1;
          //         MucTieuAPI.getDsMucTieu(this.state.data1, page, 10, this.state.year, this.state.data1==0?1:0).then((res)=>{
          //           if(res!=null){
          //             this.setState({listChiTieu: this.state.listChiTieu.concat(res), isLoading2: false});
          //           }
          //         });
          //         this.setState({isLoading2: true, pageNumber: this.state.pageNumber+1 });
          //       }
              
          //   }}
          style={{ backgroundColor: "#f5f5f5" ,marginBottom:footerMargin}}>
          <View style={styles2.container}>
            
            {/* {this.state.isSoNganh=1?(
              <View style={{flex: 1, padding: scale(20)}} >
              <View style={{height: scale(75), justifyContent: "center" }}>
              <Text style={{paddingLeft: scale(20), fontSize: scale(30), color: "#343434"}}>{"CHỈ TIÊU KINH TẾ XÃ HỘI TỈNH NĂM " +this.state.year}</Text>
            </View>
                    {this.renderPicker()}
              </View>
            ):(
              <View style={{height: scale(75), justifyContent: "center" }}>
              <Text style={{paddingLeft: scale(20), fontSize: scale(30), color: "#343434"}}>{"CHỈ TIÊU CỦA ĐƠN VỊ NĂM " +this.state.year}</Text>
            </View>
            )} */}
            {this.renderItem3(this.state.listChiTieu)}
            {this.state.isLoading2?<AppIndicator></AppIndicator>:null}
          </View>
        </Content>
        {/* <Footer select='0'/> */}
       
      </Container>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: "#f5f5f5",
      flex: 1,
  },
  container2: {
      marginLeft: scale(18),
      marginRight: scale(18),
      backgroundColor: "#f5f5f5",
      flex: 1,
  },
  content: {
      backgroundColor: "#f5f5f5",
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
  },
  card:{
    backgroundColor: "white", 
    width: win.width-2*scale(20), 
    marginLeft: scale(20),
    marginRight: scale(20),
    marginBottom: scale(10), 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius:5
  }
});
