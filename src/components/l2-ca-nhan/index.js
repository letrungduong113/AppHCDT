import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import Footer, { footerMargin } from '../user-controls/CustomFooter';
import PropTypes from "prop-types";
import {GROBAL_RESOUCE} from "../../../assets/strings/string-bn"
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
  View
} from "native-base";
import CustomHeader from "../user-controls/CustomHeader";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import styles from "./styles";

import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'

const deviceWidth = Dimensions.get("window").width;
var bottomHeight = verticalScale(109)
var FON_SIZE_24 = scale(24)
export default class CaNhanScreen extends Component {
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
      isLoading: false,
      listTienIch: [
        // {id: 0, title: GROBAL_RESOUCE.TIEN_ICH_HOAT_DONG_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_HOAT_DONG_ICON},
        {id: 1, title: GROBAL_RESOUCE.TIEN_ICH_SO_TAY_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_SO_TAY_ICON },
        {id: 2, title:  GROBAL_RESOUCE.TIEN_ICH_THOI_TIET_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_THOI_TIET_ICON},
        {id: 3, title: GROBAL_RESOUCE.TIEN_ICH_GIAO_THONG_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_GIAO_THONG_ICON},
        {id: 4, title: GROBAL_RESOUCE.TIEN_ICH_PHONG_THUY_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_PHONG_THUY_ICON},
        {id: 5, title: GROBAL_RESOUCE.TIEN_ICH_LICH_VAN_NIEN_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_LICH_VAN_NIEN_ICON},
        {id: 6, title: GROBAL_RESOUCE.TIEN_ICH_BAO_CUA_TINH_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_BAO_CUA_TINH_ICON},
        {id: 7, title: GROBAL_RESOUCE.TIEN_ICH_DICH_THUAT_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_DICH_THUAT_ICON},
        {id: 8, title: GROBAL_RESOUCE.TIEN_ICH_TRUYEN_HINH_CUA_TINH_TITLE, icon: GROBAL_RESOUCE.TIEN_ICH_TRUYEN_HINH_CUA_TINH_ICON},
        {id: 9, title: "", icon: ""},
        // {id: 8, title: "", icon: ""},
      ],
    };
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  Option(id){
    switch(id){
      case 0:
        this.props.navigation.navigate("LichSuCaNhan");
        break;
      case 1:
        this.props.navigation.navigate("NhatKyCaNhan");
        break;
      case 2:
        this.props.navigation.navigate("");
        break;
      case 3:
        this.props.navigation.navigate("");
        break;
      case 4:
        this.props.navigation.navigate("PhongThuyHangNgay");
        break;
      case 5:
        this.props.navigation.navigate("LichVanNien");
        break;
      case 6:
        this.props.navigation.navigate("DocBao");
        break;
      case 7:
        this.props.navigation.navigate("DichThuat");
        break;
      case 8:
        this.props.navigation.navigate("");
        break;
      
    }
  }

  _renderFlatList=({item})=>(
    <TouchableOpacity onPress={()=>{this.Option(item.id)}} style = {{flex :1}}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:scale(120), height:scale(120),borderRadius: scale(60) ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={item.icon}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353" , fontSize:FON_SIZE_24, textAlign: 'center'}}>
                    {item.title}
                </Text>
              </View>
    </TouchableOpacity>
  );

  renderDs(){
    return(
      <FlatList
        style={{marginLeft: scale(20), marginTop: 20}}
        data={this.state.listTienIch}
        numColumns={3}
        renderItem={this._renderFlatList}
      />
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title={GROBAL_RESOUCE.TIEN_ICH_TITLE} display="none"></CustomHeader>

        <Content style={{ flex: 1, backgroundColor: "#EDECED" ,marginBottom:-verticalScale(15), marginBottom: footerMargin }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}>
          {this.renderDs()}
          {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("LichSuCaNhan")} style = {{flex :1}}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_HOAT_DONG_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353" , fontSize:FON_SIZE_24}}>
                    {GROBAL_RESOUCE.TIEN_ICH_HOAT_DONG_TITLE}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style = {{flex :1}} onPress={()=>this.props.navigation.navigate("NhatKyCaNhan")}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_SO_TAY_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353", fontSize:FON_SIZE_24 }}>
                {GROBAL_RESOUCE.TIEN_ICH_SO_TAY_TITLE}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {{flex :1}} onPress={() => this.props.navigation.navigate("")}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width: 70, height: 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ width: '100%', height: '100%' }}
                    source={GROBAL_RESOUCE.TIEN_ICH_THOI_TIET_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353", fontSize:FON_SIZE_24 }}> {GROBAL_RESOUCE.TIEN_ICH_THOI_TIET_TITLE}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style = {{ flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly" }}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("")}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_GIAO_THONG_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353" , fontSize:FON_SIZE_24}}>
                  {GROBAL_RESOUCE.TIEN_ICH_GIAO_THONG_TITLE}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("PhongThuyHangNgay")}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_PHONG_THUY_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353" , fontSize:FON_SIZE_24}}>
                {GROBAL_RESOUCE.TIEN_ICH_PHONG_THUY_TITLE}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate("LichVanNien")}>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_LICH_VAN_NIEN_ICON}
                  />
                </View>
                <Text style={{ marginTop: 10, color: "#535353" , fontSize:FON_SIZE_24}}>{GROBAL_RESOUCE.TIEN_ICH_LICH_VAN_NIEN_TITLE}</Text>
              </View>
            </TouchableOpacity> 
          </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            height:125
          }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("")} style = {{flex :1}}>
              <View
                style={{
                  height:'100%',
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_BAO_CUA_TINH_ICON}
                  />
                </View>
                <View style = {{width:'100%' ,alignItems:'center',justifyContent:'center'}} >
                <Text style={{ marginTop: 10, color: "#595959" , fontSize:FON_SIZE_24, textAlign:'center'}}>
                {GROBAL_RESOUCE.TIEN_ICH_BAO_CUA_TINH_TITLE}
                </Text>
 
                </View>
                
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("")} style = {{flex :1}}>
              <View
                style={{
                  height:'100%',
                  padding: 10,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,borderRadius: 50 ,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                    source={GROBAL_RESOUCE.TIEN_ICH_TRUYEN_HINH_CUA_TINH_ICON}
                  />
                </View>
                <Text style={{textAlign:'center',marginTop: 10, color: "#535353",alignItems:'center',justifyContent:'center', fontSize:FON_SIZE_24}}>
                {GROBAL_RESOUCE.TIEN_ICH_TRUYEN_HINH_CUA_TINH_TITLE}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("")} style = {{flex :1}}>
              <View
                style={{
                  height:'100%',
                  padding: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width:70, height:70,alignItems:'center',justifyContent:'center'}}>
                  <Image style = {{width:'100%', height:'100%'}}
                  />
                </View>
                
                <Text style={{ marginTop: 10, color: "#535353" }}>
                    
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </Content>
        <Footer select='4' />
      </Container>
    );
  }
}