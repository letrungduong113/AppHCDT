import React, { Component } from "react";
import {
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground,
    FlatList,
    Dimensions
} from "react-native";
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
    Picker,
    Footer,
    View
} from "native-base";
import Text from '../custom-view/text'
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import styles from "./styles";
import CustomHeader from "../user-controls/CustomHeader";
import moment from 'moment';
import HanhChinhCongAPI from '../../services/api-service/hanh-chinh-cong'
import { moderateScale, scale, verticalScale } from "../user-controls/utilities/Scale";
import PieChart from '../user-controls/PieChart'
import YearMonthPicker from '../user-controls/MonthPicker';
import AppIndicator from "../user-controls/AppIndicator";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class HanhChinhCongScreen extends Component {
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
            data: null,
            soNganh:[],
            data_soNganh:[100,0],
            soNganhSelect:0,
            month: moment().format('M'),
            year: moment().format('YYYY'),
            monthPicker:false
        };
    }
    componentDidMount() {
        this.getInfoDetail(this.state.year, this.state.month);
        this.getSoNganh();
        this.getChartApi(this.state.soNganhSelect,this.state.month,this.state.year);
    }
    getInfoDetail(year, month) {
        HanhChinhCongAPI.getInfoDetail(year, month).then((res) => {
            if (res == null) {
                //alert("Xảy ra lỗi request")
                return;
            }
            this.setState({ ...this.state, data: res.data});
        });
    }
    getSoNganh() {
        HanhChinhCongAPI.getSoNganh().then((res) => {
            if (res == null) {
                //alert("Xảy ra lỗi request")
                return;
            }
            this.setState({ ...this.state, soNganh: res });
        });
    }
    getChartApi(value,month,year){
        this.setState({ isLoading: true })
        HanhChinhCongAPI.getChart(value,year,month).then((res) => {
            if (res == null) {
                // alert("Xảy ra lỗi")
                this.setState({ isLoading: false });
                return;
            }
            var data_soNganh =[];
            var t1 = parseInt(res.SoNganhs[0].Ma,10);
            var t2 = parseInt(res.SoNganhs[1].Ma,10);
            data_soNganh.push((t1==0&&t2==0)?100:t1);
            data_soNganh.push(t2);
            this.setState({ ...this.state, data_soNganh, isLoading: false });
           
        });
    }
    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }
    renderHeader() {
        return <CustomHeader title="HÀNH CHÍNH CÔNG" source={require('../../../assets/images/icon/ic_calendar.png')} goto={()=>this.setState({monthPicker:true})} />;
    }
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    renderDetail() {
        if (this.state.data) {
            var tongHS = this.state.data.truoc_han + this.state.data.trong_han + this.state.data.qua_han;
            var dungHan = Math.floor((this.state.data.truoc_han + this.state.data.trong_han) / tongHS * 100);
            return (
                <View style={{ padding: moderateScale(20), backgroundColor: 'white', marginTop: moderateScale(8) }}>
                    <Text style={{ fontSize: scale(26), color: '#343434' }}>TÌNH HÌNH TỔNG HỢP THỤ LÝ HỒ SƠ THÁNG {this.state.data.thang}/{this.state.year}</Text>
                    <View style={{ marginTop: moderateScale(20), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: scale(30), color: '#343434' }}>Tháng {this.state.data.thang}</Text>
                            <Text style={{ fontSize: scale(70), color: '#3d5e8f', fontWeight: 'bold' }}>{dungHan}<Text style={{ fontSize: scale(45), color: '#3d5e8f' }}>%</Text></Text>
                            <Text style={{ fontSize: scale(30), color: '#343434' }}>đúng hạn</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: scale(30), color: '#343434' }}>Giải quyết</Text>
                            <Text style={{ fontSize: scale(70), color: '#3d5e8f', fontWeight: 'bold' }}>{tongHS}</Text>
                            <Text style={{ fontSize: scale(30), color: '#343434' }}>hồ sơ</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: scale(26), color: '#343434', marginTop: moderateScale(20), marginBottom: moderateScale(20) }}>Đã tiếp nhận</Text>
                    <View style={{ borderColor: '#d7d7d7', borderWidth: scale(1) }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eaeaea', borderBottomColor: '#d7d7d7', borderBottomWidth: scale(1) }}>
                            <Text style={styles.textBorder}>Kỳ trước</Text>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>Trong kỳ</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>Tổng</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textBorder}>{this.formatNumber(this.state.data.ky_truoc)}</Text>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>{this.formatNumber(this.state.data.trong_ky)}</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>{this.formatNumber(this.state.data.ky_truoc + this.state.data.trong_ky)}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: scale(26), color: '#343434', marginTop: moderateScale(20), marginBottom: moderateScale(20) }}>Đã giải quyết</Text>
                    <View style={{ borderColor: '#d7d7d7', borderWidth: scale(1) }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eaeaea', borderBottomColor: '#d7d7d7', borderBottomWidth: scale(1) }}>
                            <Text style={styles.textBorder}>Trước hạn</Text>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>Đúng hạn</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>Quá hạn</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>Tổng</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textBorder}>{this.formatNumber(this.state.data.truoc_han)}</Text>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>{this.formatNumber(this.state.data.trong_han)}</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>{this.formatNumber(this.state.data.qua_han)}</Text>
                            </View>
                            <View style={{ borderLeftColor: '#d7d7d7', borderLeftWidth: scale(1), flex: 1 }}>
                                <Text style={styles.textBorder}>{this.formatNumber(tongHS)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (<View />)
        }
    }
    renderPicker() {
        return (
            <View style={{backgroundColor:'white',borderColor:'#d7d7d7',borderWidth:scale(1),marginTop:scale(10)}}>
                <View style={{ flexDirection: "row", flex: 10 }}>
                    <Picker
                        selectedValue={this.state.soNganhSelect}
                        style={{ flex: 8, height: scale(72),backgroundColor:'transparent' }}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ soNganhSelect: itemValue});
                            this.getChartApi(itemValue,this.state.month,this.state.year);
                        }}
                    ><Picker.Item label='Tất cả' value={0}/>
                        {
                            this.state.soNganh.map((item, index) => {
                                return (<Picker.Item label={item.name} value={item.id} />)
                            })
                        }
                    </Picker>
                    {Platform.OS == "ios" ? (
                        <View
                            style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                height: "100%",
                                width: 30,
                                backgroundColor: "white",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require("../../../images/logo/sortdown.png")}
                                style={{ height: 10, width: 10 }}
                            />
                        </View>
                    ) : (
                            <View />
                        )}
                </View>
            </View>
        );
    }
    renderChart() {
        // alert(JSON.stringify(this.state.data_soNganh))
        const chart_wh = 250
        const sliceColor = ['#3766ac','#f7931d']
        return (
            <View style={{ padding: moderateScale(20), backgroundColor: 'white', marginTop: moderateScale(8) }}>
                <Text style={{ fontSize: scale(26), color: '#343434' }}>TỶ LỆ HỒ SƠ ĐÚNG HẠN CÁC ĐƠN VỊ THÁNG {this.state.month}/{this.state.year}</Text>
                {this.renderPicker()}
                <View style={{alignItems:'center',marginTop:moderateScale(20)}}>
                    <PieChart
                        chart_wh={chart_wh}
                        series={this.state.data_soNganh}
                        sliceColor={sliceColor}
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:moderateScale(8)}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{backgroundColor:'#3766ac',width:scale(35),height:scale(21)}}/>
                            <Text style={{fontSize:scale(22),color:'#666666',marginLeft:scale(8)}}>Đúng hạn</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:scale(10)}}>
                            <View style={{backgroundColor:'#f7931d',width:scale(35),height:scale(21)}}/>
                            <Text style={{fontSize:scale(22),color:'#666666',marginLeft:scale(8)}}>Quá hạn</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
    pickMonthYear (month,year) {
        this.setState({month,year})
        this.getChartApi(this.state.soNganhSelect,month,year);
        this.getInfoDetail(year ,month);
      }
    render() {
        return (
            <Container style={styles.container}>
                {this.renderHeader()}
                <Content >
                    {
                        this.state.isLoading?<AppIndicator />:
                        <View>
                            {this.renderDetail()}
                            {this.renderChart()}
                        </View>
                    }
                </Content>
                <YearMonthPicker
                        visible={this.state.monthPicker}
                        onClose={()=>this.setState({monthPicker:false})}
                        year={this.state.year}
                        month={this.state.month}
                        selectMonth ={(month,year)=>this.pickMonthYear(month,year)}
                    />
            </Container>
        );
    }
}
