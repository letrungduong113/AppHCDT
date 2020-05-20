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
import { Calendar } from 'react-native-calendars'
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api'
import Footer, { footerMargin } from '../../user-controls/CustomFooter'
import AppIndicator from '../../user-controls/AppIndicator'
import Text from '../../../components/custom-view/text';
import moment from "moment";
import { GROBAL_RESOUCE } from "../../../../assets/strings/string-bn"

var deviceWidth = Dimensions.get('window').width;
var iconSize = scale(77)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class SuKienQuantrong extends Component {
    static navigationOptions = {
        header: null
    };
    getWidthItem() {
        if (this.state.listDataSelect.length < 2) {
            return deviceWidth - 30;
        } else {
            return deviceWidth * 0.8;
        }
    }
    _renderItem1 = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChiTietSuKien', { id: item.id })}>
            <View elevation={1}
                style={{
                    shadowColor: '#A0A0A0', shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 5, shadowOpacity: 1.0, flexDirection: 'column', margin: 15, backgroundColor: 'white', borderRadius: 5, width: this.getWidthItem()
                }}>
                {/* <View style = {{backgroundColor: item.anh == 1 ? 'green': 'red', width:'100%', height:180}}></View> */}
                <View style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, overflow: 'hidden' }}>
                    <Image source={item.image} style={{ width: this.getWidthItem(), height: deviceWidth * 0.4, }} />
                </View>
                <View style={{ padding: 10, borderBottomColor: '#d7d7d7', borderBottomWidth: 1 }}>
                    <Text line={1} style={{ fontSize: FONT_SIZE_MAIN, color: '#333333', marginTop: 5 }}>{item.tieuDe}</Text>
                    <Text line={1} style={{ fontSize: FONT_SIZE_MAIN, color: '#cc3734', marginTop: 5 }}>{moment(item.publishTime).format('DD/MM/YYYY HH:MM')}</Text>
                    <Text line={1} style={{ fontSize: FONT_SIZE_MAIN, color: '#999999', marginTop: 5 }}>{item.sumary} </Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: scale(30), height: scale(30) }} source={require('../../../../assets/images/l2-quan-ly-noi-bo/ic_join.png')} />
                    <Text style={{ marginLeft: 8, color: '#3173d3' }}>Phân tích và đánh giá</Text>
                </View>
                {/* <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', marginTop:5}}>Số người tham gia: <Text style = {{fontSize:FONT_SIZE_MAIN, color:'#217de0', fontWeight:'600'}}>{item.participant} người</Text></Text> */}

            </View>
        </TouchableOpacity>
    )

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isLoading: true,
            listData: [],
            listData2: [],
            dateSelect: null,
            listDataSelect: [],
            listDataSelect2: [],
            markedDates: {},
            minDay: moment().startOf('month').format('YYYY-MM-DD'),
            maxDay: moment().endOf('month').format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        var month = moment().format('M')
        var year = moment().format('YYYY')
        LinhVucQuanLyAPI.getSuKien(1, 100, year, 34, month).then((res) => {
            console.log('year+month', year+month)
            console.log('lvql', res);

            // var dateStart = moment().add(1,'M').startOf('month');
            // var dateEnd = moment().add(-1,'M').endOf('month');
            if (res.posterLink != null) {
                var data = res.newsEntity
                // .filter(item=>{
                //    return moment(item.publishTime).isBefore(dateStart) && moment(item.publishTime).isAfter(dateEnd) 
                // });
                var markedDates = {}
                for (var t = 0; t < data.length; t++) {
                    markedDates[moment(data[t].publishTime).format('YYYY-MM-DD')] = { selected: true, selectedColor: '#7accc8' }
                }
                for (var t = 0; t < this.state.listData2.length; t++) {
                    markedDates[moment(this.state.listData2[t].publishTime).format('YYYY-MM-DD')] = { selected: true, selectedColor: '#7accc8' }
                }
                this.setState({ listData: data, listDataSelect: data, isLoading: false, markedDates });
            }
        }).then(this.getData2());

    }
    getData2() {
        var month = moment().format('M')
        var year = moment().format('YYYY')
        LinhVucQuanLyAPI.getSuKien(1, 100, year, 35, month).then((res) => {
            var dateStart = moment().add(1, 'M').startOf('month');
            var dateEnd = moment().add(-1, 'M').endOf('month');
            var data = res.newsEntity
            // .filter(item=>{
            //    return moment(item.publishTime).isBefore(dateStart) && moment(item.publishTime).isAfter(dateEnd) 
            // });
            var markedDates = {};
            for (var t = 0; t < data.length; t++) {
                markedDates[moment(data[t].publishTime).format('YYYY-MM-DD')] = { selected: true, selectedColor: '#7accc8' }
            }
            for (var t = 0; t < this.state.listData.length; t++) {
                markedDates[moment(this.state.listData[t].publishTime).format('YYYY-MM-DD')] = { selected: true, selectedColor: '#7accc8' }
            }
            this.setState({ listData2: data, listDataSelect2: data, isLoading: false, markedDates });
        });
    }
    filterDate(day) {
        var dateSelect = moment(`${day.year} ${day.month} ${day.day}`, 'YYYY MM DD').format('YYYY-MM-DD');
        var data = this.state.listData.filter(item => {
            return moment(item.publishTime).format('YYYY-MM-DD') == dateSelect;
        });

        var data2 = this.state.listData2.filter(item => {
            return moment(item.publishTime).format('YYYY-MM-DD') == dateSelect;
        });

        this.setState({ dateSelect, listDataSelect: data, listDataSelect2: data2 });
    }
    getAllData() {
        this.setState({ dateSelect: null, listDataSelect: this.state.listData, listDataSelect2: this.state.listData2 });
    }
    _renderItem = ({ item }) => (
        // <TouchableOpacity key={item.id} style={{backgroundColor: item.isRead ? 'white' : 'transparent', width: '100%', height: khungHeight, flexDirection: "row"}} >
        <TouchableOpacity key={item.id} style={{
            backgroundColor: 'white', width: '100%', height: khungHeight,
            flexDirection: "row", borderBottomColor: 'lightgrey', borderBottomWidth: 1, position: "relative"
        }}
            onPress={() => this.props.navigation.navigate('ChiTietSuKien', { id: item.id })} >
            <View style={{ flex: 15, justifyContent: "center", alignItems: "center" }} >
                <Image source={item.icon ? item.icon : require('../../../../assets/images/l2-linh-vuc-quan-ly/icon_active.png')} style={{ width: iconSize, height: iconSize }} />
            </View>

            <View style={{ flex: 55, justifyContent: "center" }}>
                {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}> */}
                <Text style={{ color: 'black', fontSize: titleSize }} line={2}>
                    {item.tieuDe}
                </Text>
                <Text style={{ fontSize: textConlai, color: 'grey' }}>
                    {item.so}
                </Text>
                <Text style={{ fontSize: textConlai, color: '#666666', marginTop: -10 }}>
                    {moment(item.publishTime).format('DD/MM/YYYY HH:mm')}
                </Text>
            </View>

            <View style={{ flex: 30 }}></View>

            <TouchableOpacity style={{
                width: scale(155), height: scale(46), backgroundColor: '#3173d3', borderRadius: 40, justifyContent: "center",
                alignItems: "center", position: "absolute", right: 10, bottom: 10
            }}>
                <Text style={{ color: 'white', fontSize: scale(22) }}>Phân tích và đánh giá</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )

    renderItems() {
        if (this.state.isLoading) {
            return (
                <AppIndicator />
            );
        }
        if (this.state.listData == '') {
            return (
                <Content style={{ marginBottom: footerMargin }}>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400) }}>
                        <Image
                            source={require("../../../../assets/images/search_not_found.png")}
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
        return (
            <Content style={{ marginBottom: footerMargin, backgroundColor: '#f6f6f6' }}>
                <Calendar
                    markedDates={this.state.markedDates}
                    pastScrollRange={0}
                    onDayPress={(day) => { this.filterDate(day) }}
                    scrollEnabled={false}

                    minDate={this.state.minDay}
                    maxDate={this.state.maxDate}
                    renderArrow={(t) => { return }}
                    onPressArrowLeft={() => { return }}
                    onPressArrowRight={() => { return }}
                />
                {/* {  
                    <View style={{width: '100%', height: 30, justifyContent: 'center', backgroundColor: 'white', marginTop: 10, position: "relative"}}>
                      <Text style={{ fontSize:scale(30), color:'#217de0', position: 'absolute', right: 15}}>
                        <Text style={{fontWeight:'bold'}}>{this.state.listDataSelect.length+this.state.listDataSelect2.length}</Text> sự kiện trong {this.state.dateSelect==null?"tháng":("ngày "+moment(this.state.dateSelect,'YYYY-MM-DD').format('MM/DD/YYYY'))}
                      </Text>
                    </View>
                } */}
                <View style={{ width: '100%', height: scale(10), backgroundColor: '#F5F5F5' }}></View>
                {this.state.listDataSelect.length > 0 && <Text style={{ backgroundColor: 'white', paddingLeft: 8, paddingTop: 10 }}>VẤN ĐỀ NỔI BẬT TRONG NƯỚC VÀ QUỐC TẾ</Text>}
                <FlatList style={{ backgroundColor: 'white', width: '100%', paddingBottom: 20, flex: 1, height: "100%" }}
                    extraData={this.state.listDataSelect}
                    data={this.state.listDataSelect}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    renderItem={this._renderItem1}
                >
                </FlatList>

                {this.state.listDataSelect2.length > 0 && <Text style={{ backgroundColor: 'white', paddingLeft: 8 }}>CHÍNH SÁCH MỚI BAN HÀNH</Text>}
                <FlatList style={{ backgroundColor: 'white', width: '100%', marginBottom: 20, flex: 1, height: "100%" }}
                    extraData={this.state.listDataSelect2}
                    data={this.state.listDataSelect2}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    renderItem={this._renderItem1}
                >
                </FlatList>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                <CustomHeader title={GROBAL_RESOUCE.SU_KIEN_QUAN_TRONG_TITLE} source={require('../../../../assets/images/icon/ic_refresh.png')} goto={() => this.getAllData()} />
                {
                    this.renderItems()
                }
                <Footer select='0' />
            </Container>
        )
    }

}