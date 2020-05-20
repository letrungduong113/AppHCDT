import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
} from "native-base";
import {Calendar} from 'react-native-calendars'
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../services/api-service/linh-vuc-quan-ly-api'
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
import AppIndicator from '../user-controls/AppIndicator'
import Text from '../../components/custom-view/text';
import moment from "moment";
import {GROBAL_RESOUCE} from "../../../assets/strings/string-bn"

var deviceWidth = Dimensions.get('window').width;
var iconSize = scale(77)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class SuKienHome extends Component {
    static navigationOptions = {
        header: null
      };
    getWidthItem(){
        if(this.state.listDataSelect.length<2){
            return deviceWidth-30;
        }else{
            return deviceWidth*0.8;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '', 
            listData: [],
            listDataSelect:[],
        }
    }

    componentDidMount() {
        var year = moment().format('YYYY')
        LinhVucQuanLyAPI.getSuKien(1,5,year,36).then((res)=>{
          var dateStart = moment().add(1,'M').startOf('month');
          var dateEnd = moment().add(-1,'M').endOf('month');
          var data = res.newsEntity
        //   .filter(item=>{
        //      return moment(item.publishTime).isAfter(dateEnd) 
        //   });
            // const markedDates = {};
            // for(var t=0;t<data.length;t++){
            //     markedDates[moment(data[t].publishTime).format('YYYY-MM-DD')]={selected: true, selectedColor: '#7accc8'}
            // }
          this.setState({listDataSelect:data});
        });
      }

      _renderItem1 = ({item}) => (
        <TouchableOpacity
          onPress = {()=> this.props.navigation.navigate('ChiTietSuKien', {id: item.id})}
          activeOpacity={1}>
          <View elevation={1}  
            style={{ shadowColor: '#A0A0A0',shadowOffset: {width: 0, height: 1},
                    shadowRadius: 1,shadowOpacity: 1.0, flexDirection:'column', margin:15,marginTop:0,marginRight:0, backgroundColor:'white',borderRadius:5,width:this.getWidthItem()}}>
            {/* <View style = {{backgroundColor: item.anh == 1 ? 'green': 'red', width:'100%', height:180}}></View> */}
            <View style={{borderTopRightRadius:5,borderTopLeftRadius:5,overflow:'hidden'}}>
                    <Image source={item.image}  style={{width:this.getWidthItem(),height:deviceWidth*0.3,}}/>
            </View>
            <View style={{padding:10,borderBottomColor:'#d7d7d7',borderBottomWidth:1}}>
                <Text line = {1} style = {{fontSize:FONT_SIZE_MAIN, color:'#333333', marginTop:5}}>{item.tieuDe}</Text>
                <Text line = {1} style = {{fontSize:FONT_SIZE_MAIN, color:'#cc3734', marginTop:5}}>{moment(item.publishTime).format('DD/MM/YYYY HH:MM')}</Text>
                <Text line = {1} style = {{fontSize:FONT_SIZE_MAIN, color:'#999999', marginTop:5}}>{item.sumary} </Text>
            </View>
            <View style={{flexDirection:'row',padding:5,paddingTop:10,paddingBottom:10,justifyContent:'center',alignItems:'center'}}>
                <Image style={{width:scale(30),height:scale(30)}} source={require('../../../assets/images/l2-quan-ly-noi-bo/ic_join.png')}/>
                <Text style={{marginLeft:8,color:'#3173d3'}}>Tham gia</Text>
            </View>
            {/* <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', marginTop:5}}>Số người tham gia: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', fontWeight:'600'}}>{item.participant} người</Text></Text> */}
    
          </View>
        </TouchableOpacity>
      )

    render() {
        return(
            <View>
                <FlatList
                //  extraData={this.state.listDataSelect}
                          data= {this.state.listDataSelect}
                          keyExtractor={(item, index) => item.id}
                          horizontal = {true}
                          renderItem={this._renderItem1}
                />
            </View>
        )
      }

}