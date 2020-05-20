import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import PropTypes from "prop-types";
import { getStatusBarHeight } from '../user-controls/utilities/StatusBar';
import TroChuyenApi from "../../services/api-service/tro-chuyen-api"
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
  Input
} from "native-base";

import StorageService from "../../services/storage-service";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import ThongBaoAPI from '../../services/api-service/thong-bao-api'
import { connect } from 'react-redux';
import { scale, verticalScale, moderateScale } from '../user-controls/utilities/Scale'
import AppIndicator from '../user-controls/AppIndicator'
import {convertTime} from '../user-controls/utilities/converter'
var iconHeight = scale(70)
var iconWidth = scale(70)
var bottomHeight = verticalScale(109)
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
var FONT_SIZE_19 = scale(19);

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class ChiTietTroTruyenScreen extends Component {
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
      receiveId: this.props.navigation.getParam("receiveId"),
      name: this.props.navigation.getParam("name"),
      chucvu: this.props.navigation.getParam("chucvu"),
      icon: this.props.navigation.getParam("icon"),
      isLoading: false,
      listData: [],
      inputedText:'',
      avatar:"",
      
    };
  }

  componentDidMount() {
    this.refreshConvenstation()
    TroChuyenApi.getAvatar(this.props.avtImg).then((res) => {
      if(res){
        this.setState({
          avatar: res,
        })
      }else{
        this.setState({
          avatar: require('../../../assets/images/default/avatar_progress.png')
        })
      }
    })
  }

  refreshConvenstation(){
    TroChuyenApi.getTroChuyen(this.state.receiveId).then((res)=>{
      if(res!=null && res.length>0){
        this.setState({listData:res})
      }
    })
  }

  sendMessage(content){
    TroChuyenApi.guiTinNhan(this.props.userID ,this.state.receiveId,content).then((res)=>{
        if(res){
          this.refreshConvenstation();
        }
        this.setState({inputedText:''})
    })
  }
  renderItems(value) {
    return value.map((data, i) => {
      return (
        this.props.userID != data.sendUserId ? <View style = {{ alignItems:'flex-end' ,paddingTop:10, flexDirection:'row', paddingRight:10, paddingLeft:10}}>
          <View style = {{flex:1.5}}>
            <Image style = {{width:scale(60), height:scale(60), borderRadius:scale(30) , justifyContent:'center'}} source = {this.state.icon}></Image>
          </View>
          <View style = {{padding:10 ,flex:8.5, borderColor:'#f6f6f6',backgroundColor:'white', borderRadius:5, borderWidth:1, flexDirection:'column'}}>
            <Text style={{color:'#ef743e',fontWeight:'600',fontSize:FONT_SIZE_19}}>{this.state.name}<Text style={{color:'#ef743e',fontWeight:'300', fontSize:FONT_SIZE_19}}>{", "}{this.state.chucvu}</Text></Text>
            {/* <Text style={{color:'#ef743e',fontWeight:'600',fontSize:FONT_SIZE_19}}>{this.state.referInfo}</Text> */}
            <Text style={{marginTop:5, color:'#999999', fontSize:FONT_SIZE_19}} >{data.createdTime}</Text>
            <Text style={{color:'#333333', marginTop:5,fontSize:FONT_SIZE_MAIN}}>{data.message}</Text>
          </View>
          <View style = {{flex:1.35}}></View>
        </View> 

      :
        <View style = {{alignItems:'flex-end',paddingTop:10, flexDirection:'row', paddingRight:10, paddingLeft:10}}>
          <View style = {{flex:2.5}}></View>
          <View style = {{ padding:10 ,flex:8.5, borderColor:'#e4efff',backgroundColor:'#e4efff', borderRadius:5, borderWidth:1, flexDirection:'column'}}>
            <Text  style={{color:'#999999', fontSize:FONT_SIZE_19}}  >{data.createdTime}</Text>
            <Text style={{color:'#333333', marginTop:5,fontSize:FONT_SIZE_MAIN}}>{data.message}</Text>
          </View>
          <View style = {{flex:1.5,alignItems:'center'}}>
            <Image style = {{width:scale(60), height:scale(60), borderRadius:scale(30) , justifyContent:'center'}} source = {this.state.avatar}></Image>
          </View>
        </View>
      );
    });
  }
  renderInput(){
    return(
        <View style={styles.bottomGroup}>
          <TextInput
            style={{ paddingRight: scale(55), paddingVertical: 15 }}
            underlineColorAndroid="transparent"
            placeholder="Báo cáo tới Chủ tịch"
            placeholderTextColor="#999999"
            onChangeText={(text) => {
              this.setState({ inputedText: text })
            }}
            value={this.state.inputedText}>
          </TextInput>
          {
            this.state.inputedText ? (
              <TouchableOpacity onPress={() => { this.sendMessage(this.state.inputedText)}}
                style={{
                  width: scale(70), height: scale(70), position: "absolute",
                  right: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Image source={require("../../../assets/images/default/send.png")} style={{ width: scale(44), height: scale(40) }}></Image>
              </TouchableOpacity>
            )
              : <View></View>
          }
        </View>
    )
  }
  render() {
    return (
      <Container style={[styles.container, { flex: 1 }]}>
        <CustomHeader title= {this.state.name + ", " + this.state.chucvu} ></CustomHeader>
        {this.state.isLoading ? (<AppIndicator />) :
          (<Content>
            <View style = {{marginBottom:20}}>{this.renderItems(this.state.listData)}</View>
            <View style = {{width:'100%', height:50}}></View>
          </Content>
          )
        }
        {
            Platform.OS =='ios'?
            <KeyboardAvoidingView behavior='position' enabled={Platform.OS=='ios'} keyboardVerticalOffset={getStatusBarHeight(true)} style={[styles.bottomGroup,{paddingLeft:0,paddingRight:0}]  }>
                {this.renderInput()}
            </KeyboardAvoidingView>
            :<View>{this.renderInput()}</View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: scale(24) },
  baotext: { justifyContent: 'center', alignItems: 'center' },
  touchable: { flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  _9icons: { width: iconWidth, height: iconHeight, marginBottom: 5 },
  footerIos: { height: bottomHeight, backgroundColor: 'transparent', borderTopWidth: 0 },
  footerAndroid: { height: bottomHeight, backgroundColor: 'transparent', paddingBottom: -10 },
  container: {
    backgroundColor: '#f6f6f6',
  },
  itemStyle: {
    backgroundColor: '#FFFFFF',
    height: 100,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    padding: 10,

  },
  buttonIcon: {
    width: 48,
    height: 48,
  },
  line: {
    backgroundColor: '#eaeaea',
    flex: 1,
    height: 1
  },
  containerRow: {
    flexDirection: 'row',
  },
  iconItem: {
    backgroundColor: '#3d5e8f',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconItemDisable: {
    backgroundColor: '#bfbfbf',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  bottomGroup: {
    backgroundColor: 'white', 
    alignItems: 'center', 
    flex: 1, 
    flexDirection: 'row', 
    position: 'absolute',
    bottom: 0,
    left: 0, 
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
})
const ahihi = state =>({
  userID : state.user1.id_person,
  avtImg: state.user1.avatar
})
export default connect(ahihi, null)(ChiTietTroTruyenScreen);