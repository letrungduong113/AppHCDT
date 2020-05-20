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
import moment from 'moment'
import LichCongTacAPI from '../../services/api-service/lich-cong-tac-api'
import {
  scale,
  verticalScale,
  moderateScale
} from "../../components/user-controls/utilities/Scale";

var deviceWidth = Dimensions.get('window').width;
const dateOfWeek = [
    "CN",
  "Th2",
  "Th3",
  "Th4",
  "Th5",
  "Th6",
  "Th7",
]
export default class ItemLichCongTac extends Component {

  constructor(props) {
    super(props);


    this.state = {
      isLoading: false,
      data: [],
      navigation: this.props.navigation,
      time: '03:15'
    };


  }

  componentDidMount() {
    var start = moment().format('YYYY/MM/DD');
    var end = moment().add(7, 'd').format('YYYY/MM/DD');
    this.getLichCongTac(start, end);
  }
  getLichCongTac(start, end) {
    LichCongTacAPI.getDsLichCongTac(start, end, 1, 5, 2).then((res) => {
      console.log("Lich Cong Tac", res)
      if (res == null) {
        // alert("Xảy ra lỗi request")
        this.setState({ isLoading: false, data: [] });
        return;
      }
      // var now = moment();
      var now = moment();
      var data = [];
      for (var p = res.length-1; p>=0 ; p--) {
        for (var i = 0; i < res[p].lichTrongNgay.length; i++) {
          var ms = moment(res[p].lichTrongNgay[i].startDate, 'HH:mm YYYY/MM/DD').diff(moment());
          var d = moment.duration(ms);
          var s = moment.utc(ms).format("HH:mm");
          var timediff = moment(res[p].lichTrongNgay[i].startDate, 'HH:mm YYYY/MM/DD').diff(moment(), 'hours');
          var timediffMinute = moment(res[p].lichTrongNgay[i].startDate, 'HH:mm YYYY/MM/DD').diff(moment(), 'minutes');
          if(timediff>0||(timediff==0 && timediffMinute>0)){
            data.push({
                id: res[p].lichTrongNgay[i].id,
                title: res[p].lichTrongNgay[i].title,
                time: moment(res[p].lichTrongNgay[i].startDate, 'HH:mm YYYY/MM/DD').format('HH:mm ') + dateOfWeek[res[p].dayOfWeek - 1],
                host: res[p].lichTrongNgay[i].chuTri,
                timeEnd:s,
                timediff:timediff
            })
            }
        }
      }
      this.setState({ ...this.state, data: data });
    });

  }
  getWidthItem() {
    if (this.state.data.length < 2) {
      return deviceWidth - 30;
    } else {
      return deviceWidth * 0.7;
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.state.navigation.navigate('LichCongTacChiTiet', { id: item.id })}
    >
      <View elevation={1}
        style={{ backgroundColor: item.timediff<5?'#047ef2':'#5bc77b', borderRadius: 5, width: this.getWidthItem(), padding: scale(15), marginRight: 8 }}>
        <Text style={{ color: 'white', fontSize: scale(25) }}>{item.time}</Text>
        <Text line={2} style={{ color: 'white', height: Platform.OS === 'ios' ? verticalScale(56) : verticalScale(80), fontSize: scale(28), fontWeight: 'bold', marginTop: 5, marginBottom: 5, marginRight: scale(50) }}>{item.title}</Text>
        {item.timediff<5&&<View style={{ position: 'absolute', top: scale(25), right: scale(10), alignItems: 'center' }}>
          <Image style={{ width: scale(50), height: scale(70) }} source={require('../../../assets/images/icon/ic_timer.png')} />
          <Text style={{ color: 'white', fontSize: scale(20) }}>{item.timeEnd}</Text>
        </View>}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: scale(40), height: scale(40) }} source={require('../../../assets/images/home_option2/ic_user.png')} />
          <Text style={{ color: 'white', fontSize: scale(25), marginLeft: 8 }}>{item.host}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  render() {
    return (
      <View>
        <View style={{ width: '100%', height: scale(10), backgroundColor: '#F5F5F5' }}></View>
        <View style={{ backgroundColor: 'white', paddingTop: 15,paddingBottom:15, position: 'relative' }}>
          <Text style={{  marginRight: 15,marginLeft:15 }}>Lịch họp sắp tới</Text>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <FlatList
              style={{ paddingRight:15,paddingLeft:15,backgroundColor: 'white', width: '100%', flex: 1, height: "100%" }}
              extraData={this.state.data}
              data={this.state.data}
              keyExtractor={(item, index) => item.id}
              horizontal={true}
              renderItem={this._renderItem}
            >
            </FlatList>
          </View>
        </View>
      </View>
    );
  }
}

class TextTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.timeEnd
    };
  }
  runTime(time) {

    // setInterval(() => {
    // var now = moment();
    // var ms = moment(this.props.timeEnd, 'HH:mm YYYY/MM/DD').diff(now, 'HH:mm YYYY/MM/DD');
    //   this.setState({
    //     time: moment(ms).format('HH:mm')
    //   })
    // }, 60*1000)
    return this.state.time
  }
  render() {
    return (
      <Text style={{ color: 'white', fontSize: scale(20) }}>{this.props.timeEnd}</Text>
    )
  }
}