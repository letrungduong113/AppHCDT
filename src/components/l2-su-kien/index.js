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
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text,
  Picker,
  Item
} from "native-base";
import styles from "./styles";
import CustomHeader from "../user-controls/CustomHeader";
import { scale, verticalScale,moderateScale } from "../user-controls/utilities/Scale";
import AppIndicator from "../user-controls/AppIndicator";
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
import { ScrollView, FlatList } from "react-native-gesture-handler";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_SUB = scale(22);

export default class SuKienScreen extends Component {
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
      isLoading:false,
      data:[
        {anh:1, ten:'Họp fans Hương Tràm', time:'CN, 5 tháng 5', address:'SI Cuisine & Mixology 18 Hàng Bài Hà Nội', participant: '3.199' },
        {anh:2, ten:'Sự lên ngôi của ngành nhân sự toàn cầu', time:'Thứ 4, 15 tháng 5 vào 08:30', address:'Tòa nhà KeangNam', participant: '1.743' },
        {anh:1, ten:'Buổi giao lưu Việt Nam-Nhật Bản lần thứ 12', time:'Thứ 6, 17 tháng 5 vào 18:30', address:'MOJO Club Lounge Hà Nội', participant: '693' },
        {anh:2, ten:'Ngày hội hướng nghiệp chuyên sâu cùng TopCV và Langmaster', time:'Thứ 6, 10 tháng 5 vào 14:00', address:'Nhà văn hóa huyện Từ Sơn-Bắc Ninh', participant: '1.253' },
        {anh:1, ten:'Chuôi CT: Quản trị điều hành chuyên nghiệp - mini MBA 2019', time:'Thứ 7, 4 tháng 5 vào 08:30', address:'Tòa nhà Sông Đà', participant: '74' },
        {anh:2, ten:'Tham gia cổ vũ Jo Cup 2019', time:'CN, 5 tháng 5 vào 08:00', address:'Sân bóng Phạm Văn Đồng Hà Nội', participant: '125' },
      ],
      
    };
  }
 
  componentDidMount() {
  }
  
  _renderItem = ({item}) => (
   
    <TouchableOpacity
      onPress = {()=> {alert('bạn đã bấm vào sự kiện này')}}>
      <View style={{padding:10 ,flexDirection:'column', margin:15, backgroundColor:'white',borderRadius:5,width:250, height:350}}>
        <View style = {{backgroundColor: item.anh == 1 ? 'green': 'red', width:'100%', height:180}}></View>
        <Text numberOfLines = {2} style = {{fontSize:FONT_SIZE_MAIN, color:'#333333', marginTop:5}}>Tên sự kiện: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'black', fontWeight:'600'}}>{item.ten}</Text></Text>
        <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#333333', marginTop:5}}>Thời gian: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#fc7c43'}}>{item.time}</Text></Text>
        <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#333333', marginTop:5}}>Địa điểm: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#3d5e8f'}}>{item.address}</Text></Text>
        <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', marginTop:5}}>Số người tham gia: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', fontWeight:'600'}}>{item.participant} người</Text></Text>

      </View>
    </TouchableOpacity>
  )


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

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="SỰ KIỆN" />
        <Content style={{marginBottom:footerMargin}}>
          
          <View style={{backgroundColor: 'white', marginTop: 10}}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
               
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
             <Text
                  style={{
                    fontWeight:'600',
                    color: "black",
                    fontSize: FONT_SIZE_30
                  }}
                >
                  SỰ KIỆN GẦN ĐÂY
                </Text>
              {/* <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  backgroundColor:"#3d5f90",
                  borderColor: "#e1e1e1",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  VĂN BẢN ĐẾN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  backgroundColor: "white",
                  borderColor: "#e1e1e1",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                }}
              >
                <Text
                  style={{
                    color: "#6f6f6f",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  VĂN BẢN ĐI
                </Text>
              </TouchableOpacity> */}
            </View>
            </View>

                  {/* todo */}

                  <View style = {{}}>
                      <FlatList style = {{backgroundColor:'#666666', width:'100%'}}
                          data= {this.state.data}
                          horizontal = {true}
                          renderItem={this._renderItem}
                      >
                      </FlatList>
                  </View>

          </View>
        </Content>
        <Footer select='0'/>
      </Container>
    );
  }
}
