import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Icon,
  View
} from "native-base";

import styles from "./styles";
import Footer, { footerMargin } from '../../user-controls/CustomFooter';
import CustomHeader from "../../user-controls/CustomHeader";
import CommonAPI from "../../../services/api-service/common-api";
import QuanLyNhiemVuAPI from '../../../services/api-service/ql-nhiem-vu-api'
import DanhSachVanBanAPI from '../../../services/api-service/danh-sach-van-ban-api'
import KhanCapAPI from '../../../services/api-service/khan-cap-api'
import {NEW_CATEGORY} from './thong_ke_all'
import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'
const win = Dimensions.get("window");
var iconHeight = scale(80)
var iconWidth = scale(80)
var textSize = scale(25)

const TAT_CA_LINH_VUC = '0';
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(24);
var margin20 = scale(20);
var margin10 = scale(10);
var IconLocation = scale(40);
var ellipseLocation = scale(80);

export default class ThongKeChiTietScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listData: [],
      data:this.props.navigation.getParam('data'),
      token:this.props.navigation.getParam('token'),
    };
  }
  getColorIdTrangThai(trangThai) {
    switch (trangThai) {
        case "0": // Chua xu ly
            return '#fc7c43';
        case "1": // Dang xu ly
            return '#3d5e8f';
        case "2": // Da xu ly
            return '#999999';
        case "3": // Qua han
            return 'e63534';
        case 4:
            return '#3d5e8f';
        case 5:
            return '#888888';
        case 6:
            return '#888888';
        default:
            return 'red';
    }
}
  componentDidMount() {
    switch(this.state.data.cateID){
        case NEW_CATEGORY.KHAN_CAP:
            this.getApiKhanCap();
            break;
        case NEW_CATEGORY.NHIEM_VU:
            this.getApiNhiemVu();
            break;
        case NEW_CATEGORY.VAN_BAN:
            this.getApiVanBan()
            break;
    }
  }
  getApiKhanCap(){
    KhanCapAPI.getDsKhanCap(1,100,0,this.state.data.process,this.state.token).then(res => {
        if(res!=null&&res.newsEntity!=null){
            var listData = res.newsEntity;
            this.setState({listData})
        }
    });
  }
  getApiNhiemVu(){
      console.log("URL",this.state.data.process)
    QuanLyNhiemVuAPI.getDsNhiemVuNhan(1, 100, "", this.state.data.process, this.state.token).then(res => {
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
            // alert(loadMore+" "+res.data.length)
            this.setState({
              listData: res.data,
            });
          //   alert(JSON.stringify(res.data[0]))
          }
        });
  }
  getApiVanBan(){
    DanhSachVanBanAPI.getdsvanbanden(1, 10,0,this.state.data.process, this.state.token).then(res => {
        if(res && res.vanBans){
          this.setState({
            listData: res.vanBans,
          });
        }else{
          this.setState({
            isLoading: false,
            loadMore:false,
          });
        }
      });
  }
  componentWillMount(){
    //   alert(JSON.stringify(this.props.data))
  }


  getRenderType(){
    switch(this.state.data.cateID){
        case NEW_CATEGORY.KHAN_CAP:
        return this._renderItemNKhanVu;
            break;
        case NEW_CATEGORY.NHIEM_VU:
            return this._renderItemNhiemVu;
        case NEW_CATEGORY.VAN_BAN:
            return this._renderItemVanBan;
    }
  }
  _renderItemNKhanVu =({item,i})=>(
    <TouchableOpacity onPress={() => this.props.navigation.navigate('KhanCapChiTiet', { id: item.id })} key={i}>
        <View style={[styles.itemts, { width: win.width, height: verticalScale(128) }]}>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1.5 }}>
                {/* <Image source={data.icon} style={{ width: scale(77), height: scale(77), margin: margin20 }} /> */}
                {/* {console.log("link icon", data.icon)} */}
                <Image source={item.icon.uri ? item.icon : require('../../../../assets/images/default/task.png')} style={{ width: scale(77), height: scale(77), margin: margin20 }} />
            </View>
            <View style={{ justifyContent: "center", flex: 10, marginLeft: margin20 }}>
                <View style={{}}>
                    <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#3a3a3a", fontStyle: "normal", }} line={2} >
                        {item.tieuDe}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>{item.tenLinhVuc}  |  </Text>
                    <Text style={{ fontSize: FONT_SIZE_SUB, color: this.getColorIdTrangThai(item.trangThai) }}>{item.tenTrangThai}</Text>
                </View>

            </View>
            {/* <View style={{ flex: 0.5 }}>

            </View> */}
        </View>
    </TouchableOpacity>
  )
  _renderItemNhiemVu = ({item,i}) => (
    <TouchableOpacity
          style={{
            backgroundColor:"white",
            width: "100%",
            height: scale(140),
            flexDirection: "row",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5
          }}
          key={i}
          onPress={() => {
              this.props.navigation.navigate("NhiemVuChiTiet", {
                id: item.id,
                task_type: this.state.task_type,
                trangThaiId: item.trangThai,
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
              source={item.icon}
            />
          </View>
          {/* todo here */}
          <View style={{ flex: 6, justifyContent: "center" ,marginRight:10 }}>
            <Text line ={2} style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {item.title}
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
                  {item.noiXuLy}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    // color: this.getColorType(item.trangThai)
                  }}
                >
                  {item.tenTrangThai}
                </Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
  )
  
  _renderItemVanBan = ({item,i}) => (
    <TouchableOpacity
          style={{
            padding: 10,
            height: scale(140),
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            borderTopWidth:1,
            borderTopColor:'#eeeeee'
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("VanBanChiTiet", {
              id: item.id,
              text_type: true
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
              source = {item.icon}
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
              {item.tieuDe}
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
                  {item.docType}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    // color: this.getColorType(data.trangThai)
                  }}
                >
                  {item.tenTrangThai}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
  )

  render() {
    return (
      
      <Container style={styles.container}>
        <CustomHeader title='Nội dung chi tiết'></CustomHeader>

        <Content style={{marginBottom: footerMargin}}>
          {/* {console.log(this.state.listData)} */}
          <View>
          <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => index+""}
            renderItem={this.getRenderType()}
            numColumns={1}
          />
          </View>
        </Content>
        {/* <Footer select='0' /> */}
      </Container>
    );
  }
}

