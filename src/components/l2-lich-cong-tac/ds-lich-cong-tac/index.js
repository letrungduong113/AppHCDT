import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList, ImageBackground, Dimensions,StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Footer, { footerMargin } from '../../user-controls/CustomFooter'
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale';
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
    View,

} from "native-base";
import ItemCalendar from './item_calendar'
import Text from '../../custom-view/text'
import CustomHeader from "../../user-controls/CustomHeader";
import ModalDatePicker from './ModalDatePicker'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import LichCongTacAPI from "../../../services/api-service/lich-cong-tac-api";
import TaoLich from './tao-lich-cong-tac'
import moment from 'moment';
import 'moment/locale/vi';
import styles from './styles'
import AppIndicator from "../../user-controls/AppIndicator";
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const dateOfWeek =[
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ Nhật"
]
export default class DsLichCongTacScreen extends Component {
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
            data: [
            ],
            data_donvi: [],
            createItem: false,
            type_picker: 1, 
            openDatePicker: false,
            startDate: moment().format("YYYY/MM/DD"),
            endDate: moment().format("YYYY/MM/DD"),
            tab: 0,
            filter: false
        }
    }
    componentDidMount() {
        this.state.tab=0;
        this.getLichCongTac();
    }
    getLichCongTac() {
        this.setState({ isLoading: true})
        LichCongTacAPI.getDsLichCongTac(this.state.startDate, this.state.endDate,1,100,this.state.tab+1).then((res) => {
            console.log('dsLichCongTac',res);
            this.setState({ isLoading: false })
            if (res == null) {
                // alert("Xảy ra lỗi request")
                this.setState({  isLoading: false ,data:[]});
                return;
            }
            var now = moment();
            // for (var p = 0; p < res.length; p++) {
            //     for (var i = 0; i < res[p].lichTrongNgay.length; i++) {
            //         res[p].lichTrongNgay[i].done = moment(res[p].lichTrongNgay[i].startDate, 'HH:mm YYYY/MM/DD').isAfter(now, 'HH:mm YYYY/MM/DD');
            //         res[p].lichTrongNgay[i].time = res[p].lichTrongNgay[i].startDate.substring(0, 6);
            //         res[p].lichTrongNgay[i].startDate = res[p].lichTrongNgay[i].startDate.substring(6, 17);
            //     }
            // }
            this.setState({ ...this.state, data: res, isLoading: false });
        });

    }

    renderTime(time, date) {
        var now = moment();
        var ms = moment(time + date, 'HH:mm YYYY/MM/DD').diff(now, 'HH:mm YYYY/MM/DD');
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
        let timediff = moment(time + date, 'HH:mm YYYY/MM/DD').diff(now, 'hours');
        if (timediff < 0 || (timediff == 0 && d < 0)) {
            return <Text style={[styles.itemScheduleTime, { color: '#999999' }]}>{time}</Text>
        } else if (timediff > 5 || d < 0) {
            return <Text style={[styles.itemScheduleTime, { color: '#3d5e8f' }]}>{time}</Text>
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.itemScheduleTime, { color: '#c83835' }]}>{time}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='ios-time' style={{ fontSize: 15, color: '#999999', marginRight: 5 }}></Icon>
                        <Text style={{ color: '#999999', fontSize: 12 }}>{s}</Text>
                    </View>
                </View>
            )
        }
    }
    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }
    updateTypeDate(value) {
        var type = this.state.type_picker;
        type += value;
        if (type < 0) {
            type = 0;
        }
        if (type > 2) {
            type = 2;
        }
        this.setState({ ...this.state, type_picker: type ,filter:false});
        var time = moment().format("YYYY/MM/DD");
        switch (type) {
            case 0:
                this.state.startDate = moment(time).add(-1,'days').format("YYYY/MM/DD");
                this.state.endDate =  moment(time).add(-1,'days').format("YYYY/MM/DD");
                this.setState({startDate:moment(time).add(-1,'days').format("YYYY/MM/DD"),endDate:moment(time).add(-1,'days').format("YYYY/MM/DD")})
                break;
            case 1:
                this.state.startDate = time;
                this.state.endDate = time;
                this.setState({startDate:time,endDate:time})
                // this.state.endDate = moment(time).endOf('week').format("YYYY/MM/DD");
                // this.setState({startDate:time,endDate:moment(time).endOf('week').format("YYYY/MM/DD")})
                break;
            case 2:
                // this.state.endDate = moment(time).endOf('month').format("YYYY/MM/DD");
                // this.setState({startDate:time,endDate:moment(time).endOf('month').format("YYYY/MM/DD")})
                this.state.startDate = moment(time).add(1,'days').format("YYYY/MM/DD");
                this.state.endDate =  moment(time).add(1,'days').format("YYYY/MM/DD");
                this.setState({startDate:moment(time).add(1,'days').format("YYYY/MM/DD"),endDate:moment(time).add(1,'days').format("YYYY/MM/DD")})
                break;
        }
        this.getLichCongTac();

    }
    renderTypeDate() {
        switch (this.state.type_picker) {
            case 0:
                return 'CÔNG VIỆC TRONG NGÀY HÔM QUA'
            case 1:
                return 'CÔNG VIỆC TRONG NGÀY'
            case 2:
                return 'CÔNG VIỆC TRONG NGÀY MAI'
        }
    }
    renderItemDonVi(value) {
        return value.map((data, i) => {
            return (
                <View key={i}>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("LichCongTacChiTiet", { id: data.id, donvi: this.state.tab == 0 })}>
                        <View style={styles.itemSchedule}>
                            <Image style={{ height: scale(77), width: scale(77), marginLeft: moderateScale(7), marginRight: moderateScale(7) }}
                                source={data.done ? require('../../../../assets/images/l2-lich-cong-tac/ic_calendar_active.png') : require('../../../../assets/images/l2-lich-cong-tac/ic_calendar_unactive.png')} />
                            <View style={styles.itemScheduleContent}>
                                <Text line={2}>{data.title}</Text>
                                <Text line={1} style={{ color: 'grey' }}>{data.chuTri}</Text>
                            </View>
                            {this.renderTime(data.time, data.startDate)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        )
    }
    searchDate(s, e) {
        this.state.startDate = s.split('-').join('/');
        this.state.endDate = e.split('-').join('/');
        this.setState({ startDate: s.split('-').join('/'), endDate: e.split('-').join('/') ,filter:true})
        this.getLichCongTac();
    }
    renderDate(date) {
        var d = moment().format('dddd');
        d = d.charAt(0).toUpperCase() + d.slice(1);
        d = d + " - " + moment(date).format("DD/MM/YYYY");
        return d;
    }
    renderItemFilter(item) {
        // alert(JSON.stringify(item))
        var now = moment();
        var ms = moment(item.startDate,'HH:mm YYYY/MM/DD').diff(now, 'HH:mm YYYY/MM/DD');
        var d = moment.duration(ms);
        var s = moment.utc(ms).format("HH:mm");
        let timediff = moment(item.startDate, 'HH:mm YYYY/MM/DD').diff(now, 'hours');
        if (timediff < 0 || (timediff == 0 && d < 0)) {
            return (
                <View style={[styles.item, {height: item.height,backgroundColor:'#999999',width:"95%" }]}>
                    <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
                </View>
            );
        } else if ((timediff <= 3 && timediff>0)||(timediff==0 && d>0)) {
            return (
                <View style={[styles.item, {height: item.height,flexDirection:'row',justifyContent:'space-between',width:"95%" ,backgroundColor:'#4695eb'}]}>
                    <View style={{flex:5,justifyContent:'space-between'}}>
                        <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.title}</Text>
                        <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Image style={{width:scale(58),height:scale(58)}} source={require('../../../../assets/images/icon/ic_timer.png')}/>
                        <Text style={{ color: 'white', fontSize: 12 }}>{s}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.item, {height: item.height,width:"95%"}]}>
                    <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
                </View>
            );
        }
      }
      
    
      renderDayFilter(item){
            var now = moment().format('DD/MM/YYYY');
            var d = item.ngay;
            return (
                <View style={{width:"15%",margin:scale(8),paddingTop:scale(20),alignItems:'center'}}>
                    <Text style={{color:now==d?'#4695eb':'#333333',fontWeight:now==d?'bold':'normal',fontSize:scale(46)}}>{moment(d,'DD/MM/YYYY').format('DD')}</Text>
                    <Text style={{color:now==d?'#4695eb':'#333333',fontWeight:now==d?'bold':'normal',fontSize:scale(26)}}>Th {moment(d,'DD/MM/YYYY').format('MM')}</Text>
                </View>
            )

      }
    renderItemContentFilter = ({ item }) => (
            <View style={{flex:1}}>
                {this.renderItemFilter(item)}
            </View>
    );
    renderListItem() {
        console.log('lct',this.state.data)
        return this.state.data.map((item, i) => {
            return (
                <View key={i} style={{flexDirection:'row',backgroundColor:'#ededed'}}>
                    {/* {this.state.filter&&<Text style={styles.textTitle}>{dateOfWeek[data.dayOfWeek-1]} - {data.ngay}</Text>}
                    {this.renderItemDonVi(data.lichTrongNgay)} */}
                    {this.renderDayFilter(item)}
                    {/* {item.lichTrongNgay.map((data, i) => {return(this.renderItemFilter(data))})} */}
                    <FlatList
                        data={item.lichTrongNgay}
                        extraData={item.lichTrongNgay}
                        keyExtractor={(t, index) => index+""}
                        renderItem={this.renderItemContentFilter}
                        >
                    </FlatList>
                </View>
            )
        })
       
    }
    renderTitle() {
        if (this.state.filter) {
            return (
                <View style={styles.titleHeader}>
                    <View/>
                    <Text style={styles.textTitleHeader}>Từ ngày {moment(this.state.startDate,'YYYY/MM/DD').format('DD/MM/YYYY')} đến ngày {moment(this.state.endDate,'YYYY/MM/DD').format('DD/MM/YYYY')}</Text>
                    <TouchableOpacity style={styles.btnTitle} onPress={() => {this.setState({filter:false}), this.updateTypeDate(0)}}>
                        <Image style={{ width: scale(60), height: scale(60) }} source={require("../../../../assets/images/icon/ic_close_pink.png")} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.titleHeader}>
                    <TouchableOpacity style={styles.btnTitle} onPress={() => this.updateTypeDate(-1)}>
                        <Icon style={{ color:'#666666',width: scale(60), height: scale(60) }}  name='ios-arrow-back'/>
                    </TouchableOpacity>
                    <Text style={styles.textTitleHeader}>{this.renderTypeDate()}</Text>
                    <TouchableOpacity style={styles.btnTitle} onPress={() => this.updateTypeDate(1)}>
                        <Icon style={{ color:'#666666',width: scale(60), height: scale(60) ,textAlign:'right'}} name='ios-arrow-forward'/>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    renderContent(){
        if(this.state.filter){
            return (
                <Content  style={{ paddingBottom: this.state.tab == 1 ? verticalScale(106) : 0, marginBottom: footerMargin }}>
                    {this.state.isLoading ? <AppIndicator /> : this.renderListItem()} 
                </Content>
            )
        
        }else{
            return (
                <ItemCalendar navigation ={this.props.navigation} tab ={this.state.tab} style={{ marginBottom: footerMargin}} />
            )
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <CustomHeader title="LỊCH CÔNG TÁC" display='none' source={require('../../../../assets/images/icon/ic_calendar.png')} goto={() => this.setState({ ...this.state, openDatePicker: true })}></CustomHeader>
                    <View style={{ margin: 10, width: scale(682), height: verticalScale(64), justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { this.state.tab=0,this.setState({ tab: 0 }), this.getLichCongTac() }}
                            style={{
                                flex: 1, height: "100%", backgroundColor: this.state.tab == 0 ? '#3d5f90' : 'white', justifyContent: "center", alignItems: "center"
                            }}
                        >
                            <Text style={{ color: this.state.tab == 0 ? 'white' : '#6f6f6f', fontSize: FONT_SIZE_MAIN }}>
                                ĐƠN VỊ
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.state.tab=1,this.setState({ tab: 1 }), this.getLichCongTac() }} style={{ flex: 1, height: "100%", backgroundColor: this.state.tab == 1 ? '#3d5f90' : 'white', justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: this.state.tab == 0 ? '#6f6f6f' : 'white', fontSize: FONT_SIZE_MAIN }}>
                                CÁ NHÂN
                                </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.filter && this.renderTitle()}
                    {this.renderContent()}
                <ModalDatePicker searchDate={(s, e) => this.searchDate(s, e)} visible={this.state.openDatePicker} closeDatePicker={() => this.setState({ ...this.state, openDatePicker: false })} />
                <Footer select='3' />
            </Container>
        );
    }
}
