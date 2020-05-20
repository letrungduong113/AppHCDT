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
import CustomTabs2 from "../../../../navigation-controls/CustomTabs2";
import CustomHeader from "../../../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../../../services/api-service/linh-vuc-quan-ly-api'
import Footer ,{footerMargin} from '../../../../user-controls/CustomFooter'
import AppIndicator from '../../../../user-controls/AppIndicator'
import Text from '../../../../../components/custom-view/text';
import moment from "moment";

var iconSize = scale(77)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class SuKienQuantrong extends Component {
  static navigationOptions = {
      header: null
    };

  constructor(props) {
      super(props);
      this.state = {
          text: '', 
          isLoading: true, 
          listData: [],
          dateSelect:null,
          listDataSelect:[],
          markedDates:{},
          token: this.props.navigation.getParam("token"),
          minDay:moment().startOf('month').format('YYYY-MM-DD'),
          maxDay:moment().endOf('month').format('YYYY-MM-DD')
      }
  }

  componentDidMount() {
    LinhVucQuanLyAPI.getSuKienSo(1, 100, this.state.token).then((res)=>{
      var dateStart = moment().add(1,'M').startOf('month');
      var dateEnd = moment().add(-1,'M').endOf('month');
      var data = res.newsEntity.filter(item=>{
         return moment(item.publishTime).isBefore(dateStart) && moment(item.publishTime).isAfter(dateEnd) 
      });
        const markedDates = {};
        for(var t=0;t<data.length;t++){
            markedDates[moment(data[t].publishTime).format('YYYY-MM-DD')]={selected: true, selectedColor: '#7accc8'}
        }
      this.setState({listData: data,listDataSelect:data, isLoading: false,markedDates});
    });
    if (this.state.listData == ''){
      return (
        <Content style={{marginBottom:footerMargin}}>
        <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400)}}>
          <Image
            source={require("../../../../../../assets/images/search_not_found.png")}
            style={{ width: scale(198), height: scale(198) }}
          />
          <Text
            style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
          >
            Không có dữ liệu
          </Text>
        </View>
        </Content>
      );
    }
  }

    filterDate(day){
        var dateSelect = moment(`${day.year} ${day.month} ${day.day}`,'YYYY MM DD').format('YYYY-MM-DD');
        var data = this.state.listData.filter(item=>{
          return moment(item.publishTime).format('YYYY-MM-DD')==dateSelect;
       });
      this.setState({dateSelect,listDataSelect:data});
    }
    getAllData(){
      this.setState({dateSelect:null,listDataSelect:this.state.listData});
    }
    _renderItem = ({item}) => (
        // <TouchableOpacity key={item.id} style={{backgroundColor: item.isRead ? 'white' : 'transparent', width: '100%', height: khungHeight, flexDirection: "row"}} >
        <TouchableOpacity key={item.id} style={{backgroundColor: 'white', width: '100%', height: khungHeight, 
        flexDirection: "row", borderBottomColor: 'lightgrey', borderBottomWidth: 1, position: "relative"}}
        onPress={() => this.props.navigation.navigate('ChiTietSuKien', {id: item.id, token: this.state.token})} >
          {/* {alert(item.id)} */}
          <View style={{flex: 15, justifyContent: "center", alignItems: "center"}} >
              <Image source={item.icon ? item.icon : require('../../../../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png')} style={{width: iconSize, height: iconSize}} />
          </View>

          <View style={{flex: 55, justifyContent: "center"}}>
              {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}> */}
              <Text style={{color: 'black', fontSize: titleSize}} line={2}>
                {item.tieuDe}
              </Text>
              <Text style={{fontSize: textConlai, color: 'grey'}}>
                {item.so}
              </Text>
              <Text style={{fontSize: textConlai, color: '#666666', marginTop: -10}}>
                {moment(item.publishTime).format('DD/MM/YYYY HH:mm')}
              </Text>
          </View>

          <View style={{flex: 30}}></View>

          <TouchableOpacity style={{width: scale(155), height: scale(46), backgroundColor: '#3173d3', borderRadius: 40, justifyContent: "center",
          alignItems: "center", position: "absolute", right: 10, bottom: 10}}>
            <Text style={{color: 'white', fontSize: scale(22)}}>Tham gia</Text>
          </TouchableOpacity>
        </TouchableOpacity>
    )

    renderItems() {
      if (this.state.isLoading) {
        return (
            <AppIndicator />
        );
      }
      
      return (
        <Content style={{marginBottom:footerMargin,backgroundColor:'#f6f6f6'}}>
          <Content style={{marginBottom:footerMargin}}>
          <Calendar
              markedDates={this.state.markedDates}
              pastScrollRange={0}
              onDayPress={(day) => {this.filterDate(day)}}
              scrollEnabled={false}

              minDate={this.state.minDay}
              maxDate={this.state.maxDate}
              renderArrow={(t) => {return}}
              onPressArrowLeft={()=>{return}}
              onPressArrowRight={()=>{return}}
              />
              {  
                  <View style={{width: '100%', height: 60, justifyContent: 'center', backgroundColor: 'white', marginTop: 10, position: "relative", borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    {
                        this.state.dateSelect!=null &&
                        <TouchableOpacity 
                              style={{ position: 'absolute', left: 15}}
                              onPress={()=>this.getAllData()}
                          >
                          <Text style={{ fontSize:scale(30), color:'#333333'}}>
                                  Tất cả
                          </Text>
                      </TouchableOpacity>
                    }
                    
                    <Text style={{ fontSize:scale(30), color:'#217de0', position: 'absolute', right: 15}}>
                      <Text style={{fontWeight:'bold'}}>{this.state.listDataSelect.length}</Text> sự kiện trong {this.state.dateSelect==null?"tháng":("ngày "+moment(this.state.dateSelect,'YYYY-MM-DD').format('MM/DD/YYYY'))}
                    </Text>
                  </View>
              }
              <FlatList
                  style={{marginTop:scale(2),paddingBottom:scale(8)}}
                  data={this.state.listDataSelect}
                  extraData={this.state.listDataSelect}
                  keyExtractor={(item, index) => item.id}
                  renderItem={this._renderItem}
                  numColumns={1}
              />
          </Content>
        </Content>
      );
    }

    render() {
      return(
          <Container>
              {
                this.renderItems()
              }
              {/* <Footer select='0'/> */}
          </Container>
      )
    }

}

