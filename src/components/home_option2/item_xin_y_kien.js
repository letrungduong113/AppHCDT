import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NhanNhiemVuAPI from "../../services/api-service/nhan-nhiem-vu-api";
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
  Footer,
  View
} from "native-base";
import Text from "../custom-view/text";

import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";

var deviceWidth = Dimensions.get('window').width;
export default class ItemXinYKien extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data:[]
    };
  }
  
  componentDidMount() {
    NhanNhiemVuAPI.getTientrinh(0,1,5).then(res => {
      if(res){
        // alert(JSON.stringify(res))
        this.setState({
          data :res.commentEntity
        })
      }
    })
  }
  getWidthItem(){
        if(this.state.data.length<2){
            return deviceWidth-30;
        }else{
            return deviceWidth*0.8;
        }
    }
  _renderItem = ({item}) => (
    <TouchableOpacity
    //   onPress = {}
      >
      <View 
       elevation={1}  // đổ bóng khi có shadow
        style={{borderRadius:5,width:this.getWidthItem(),padding:scale(10),marginRight:8,backgroundColor:'white', shadowColor: 'grey',shadowOffset: {width: 0, height: 1},
        shadowRadius: 5,shadowOpacity: 1.0,}}>
        <View style = {{flexDirection:'row',alignItems:'center',  justifyContent:'center'}}>
          <Image  style = {{width:scale(44),  height: scale(44) , padding:5, borderRadius: scale(22)}} source = {item.icon}></Image>
          <Text line = {1} style = {{padding:10, flex:5, color:'#ffa539', fontSize:scale(27), fontWeight:'600'}}>{item.fullName}, <Text style = {{padding:10, flex:5, color:'#ffa539', fontSize:scale(27),fontWeight:'normal'}}>{item.positionCode} </Text></Text>
        </View>
        <View style = {{ height:verticalScale(100)}}>
          <Text style={{color:'#333333', fontSize:scale(28)}}>{item.contents}</Text>
        </View>
        <View style={{ marginTop:5, flexDirection: 'row',padding:5}}>
        <Text style={{ flex: 1, color:'#147bd1', fontSize:scale(27)}}>Cháy nổ</Text>
        <View style={{ flexDirection: 'row',alignItems:'center',  justifyContent:'center', marginRight:10 }} >
          <Image source={require('../../../assets/images/home_option2/ic_rep.png')} style = {{width:scale(30),  height: scale(30)}}></Image>
          <Text style={{  marginLeft:5,color:'#147bd1', fontSize:scale(27)}}>Trả lời</Text>
        </View>
      </View>
      </View>
     
    </TouchableOpacity>
  )
  render() {
  
    return (
        <View style={{backgroundColor:'#e1e1e1'}}>
            <View style={{width: '100%', height: scale(10), backgroundColor: '#e1e1e1'}}></View>
            <View style={{ padding: 15, position: 'relative'}}>
            <Text>Xin Ý Kiến</Text>
            <TouchableOpacity style={{position: 'absolute', right: 15, top: 15}}><Text style={{color: '#147bd1'}}>Xem tất cả</Text></TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 15}}>
                <FlatList 
                        style = {{ width:'100%', marginBottom:20,flex:1,height:"100%"}}
                        extraData={this.state.data}
                        data= {this.state.data}
                        keyExtractor={(item, index) => item.id}
                        horizontal = {true}
                        renderItem={this._renderItem}
                      >
                    </FlatList>
            </View>
            </View>
        </View>
    );
  }
}
