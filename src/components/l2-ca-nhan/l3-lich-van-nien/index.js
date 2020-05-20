import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, Dimensions, FlatList } from "react-native";
import { connect } from "react-redux";
import Footer, { footerMargin } from '../../user-controls/CustomFooter';
import AppIndicator from "../../user-controls/AppIndicator";
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  View,

} from "native-base";
import Text from '../../../components/custom-view/text';
import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import TienIchApi from "../../../services/api-service/tien-ich-api";
import { scale, verticalScale } from "../../user-controls/utilities/Scale";
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class LichVanNienScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props) {
    super(props);
    var crrDate = new Date();
    dateStr = moment(crrDate).format("DD/MM/YYYY");
    this.state = {
      isLoading: true,
      ngayHienTai: dateStr,
      dataNgay: {},
    }
  }

  updateDate(addedDays) {
    if (addedDays > 0) {
      date = moment(this.state.ngayHienTai, 'DD/MM/YYYY', true).add(1, 'days').format("DD/MM/YYYY");
    }
    else {
      date = moment(this.state.ngayHienTai, 'DD/MM/YYYY', true).subtract(1, 'days').format("DD/MM/YYYY");
    }
    this.setState({ ngayHienTai: date });
    TienIchApi.getLichVanNien(date).then((res) => {
      if (res && res.status)
        this.setState({ dataNgay: res.data });
    });
  }
  componentDidMount() {
    TienIchApi.getLichVanNien(this.state.ngayHienTai).then((res) => {
      if (res && res.status)
        this.setState({ dataNgay: res.data });
      this.setState({ isLoading: false });
    });
  }
  renderGioHoangDao(str) {
    arr = str.split(':')
    return (
      <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#333333', marginTop: scale(20) }}>{arr[0]}</Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#333333' }}>{arr[1]}</Text>
      </View>
    )
  }
  renderThoiGian(str) {
    arr = str.split(',');
    //console.log('cắt chuỗi', arr)
    return (
      <View style={{ width: deviceWidth, height: verticalScale(200), backgroundColor: '#faebe3', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(30), fontFamily: 'Roboto-Regular' }}>Giờ</Text>
          </View>
          <View>
            <Text style={{ color: '#fe7802', fontFamily: 'Roboto-Bold', fontSize: scale(40) }}>{arr[0].split(' ')[0].replace('h', ':')}</Text>
          </View>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(24), fontFamily: 'Roboto-Regular' }}>{arr[0].split(' ')[2].substring(0, arr[0].split(' ')[2].length - 1)}</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(30), fontFamily: 'Roboto-Regular' }}>Ngày</Text>
          </View>
          <View>
            <Text style={{ color: '#fe7802', fontFamily: 'Roboto-Bold', fontSize: scale(40) }}>{arr[1].trim().split(' ')[1]}</Text>
          </View>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(24), fontFamily: 'Roboto-Regular' }}>{arr[1].split(' ')[3].substring(1, arr[1].split(' ')[3].length + 1) + " " + arr[1].split(' ')[4].substring(0, arr[1].split(' ')[4].length - 1)}</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(30), fontFamily: 'Roboto-Regular' }}>Tháng</Text>
          </View>
          <View>
            <Text style={{ color: '#fe7802', fontFamily: 'Roboto-Bold', fontSize: scale(40) }}>{arr[2].trim().split(' ')[1]}</Text>
          </View>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(24), fontFamily: 'Roboto-Regular' }}>{arr[2].split(' ')[3].substring(1, arr[2].split(' ')[3].length + 1) + " " + arr[2].split(' ')[4].substring(0, arr[2].split(' ')[4].length - 1)}</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(30), fontFamily: 'Roboto-Regular' }}>Năm</Text>
          </View>
          <View>
            <Text style={{ color: '#fe7802', fontFamily: 'Roboto-Bold', fontSize: scale(40) }}>2019</Text>
          </View>
          <View>
            <Text style={{ color: '#333333', fontSize: scale(24), fontFamily: 'Roboto-Regular' }}>{arr[3].trim().split(' ')[1] + " " + arr[3].trim().split(' ')[2]}</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    //let ngay_am = this.state.dataNgay.ngay_am.split();
    return (
      <Container style={styles.container}>
        <CustomHeader title="LỊCH VẠN NIÊN"></CustomHeader>
        <Content style={{ backgroundColor: 'white', marginBottom: footerMargin }}>
          {
            this.state.isLoading ? (<View style={{ marginTop: scale((deviceHeight) / 2) }}><AppIndicator ></AppIndicator></View>) : (

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text style={{ padding: scale(50), color: '#333333', fontWeight: '400', fontSize: scale(36) }}>{this.state.dataNgay.thang.toUpperCase()}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <TouchableOpacity onPress={() => this.updateDate(-1)}>
                    <View style={{ opacity: 0.5, padding: scale(20) }}>
                      <Icon name="ios-arrow-back" style={{ color: '#d1d1d1', fontSize: scale(96) }}></Icon>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('LichVanNienChiTiet', { ngayHienTai: this.state.ngayHienTai })}>
                    <View>
                      <ImageBackground source={require('../../../../assets/images/canhan/ngay_bg.png')} style={{ width: scale(450), height: scale(450) }}>
                        <View style={{ width: "100%", height: "100%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ padding: scale(15), color: '#333333', fontWeight: '400', fontSize: scale(36) }}>{this.state.dataNgay.ngay_trong_tuan}</Text>
                          <Text style={{ fontSize: scale(200), fontWeight: '600', color: '#c20000', marginTop: scale(-64), }}>{this.state.dataNgay.ngay}</Text>
                        </View>
                      </ImageBackground>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.updateDate(1)}>
                    <View style={{ opacity: 0.5, padding: scale(20) }}>
                      <Icon name="ios-arrow-forward" style={{ color: '#d1d1d1', fontSize: scale(96) }}></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <Text style={{ fontSize: 18, fontWeight: '400', color: '#333333', marginTop: scale(20) }}>{this.state.dataNgay.ngay_hoang_dao}</Text>
                <Text style={{ fontSize: 14, textAlign: 'center', color: '#c20000' }}>{this.state.dataNgay.gio_hoang_dao}</Text> */}
                {/* <Text style={{ fontSize: 20, fontWeight: '400', color: '#333333', marginTop: 20 }}>Lịch âm</Text>
                <Text style={{ fontSize: 14, textAlign: 'center', color: '#c20000' }}>{this.state.dataNgay.ngay_am}</Text> */}
                {this.renderGioHoangDao(this.state.dataNgay.gio_hoang_dao)}
                {this.renderThoiGian(this.state.dataNgay.ngay_am)}

              </View>
            )}
        </Content>
        <Footer select='0' />
      </Container>
    );
  }
}