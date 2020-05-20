import React, { Component } from "react";
import { TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Icon, View, Picker } from "native-base";
import Text from "../../custom-view/text";
import styles from "./styles";
import CommonAPI from "../../../services/api-service/common-api";
import AppIndicator from '../AppIndicator';
import StackColumnChart from "../Charts/StackColumnChart";
import moment from 'moment'
import PieChart from "../Charts/PieChart";
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_60 = scale(70);
const win = Dimensions.get("window");
export const NEW_CATEGORY = {
    KHAN_CAP: 1,
    MUC_TIEU: 2,
    NHIEM_VU: 3,
    BAO_CAO: 4,
    VAN_BAN: 5,
    QL_NOI_BO: 6,
    DU_LUAN: 7,
    HC_CONG: 8,
    LICH_CT: 9,
    ALL_CAT: 0,
}
export const PROCESSING_STATUS = {
    DANG_XU_LY: 1,  // : Đang xử lý
    DA_XU_LY: 2,    // : Đã xử lý
    QUA_HAN: 3,     // : Quá hạn xử lý
    CHUA_XU_LY: 0,  // : Chưa xử lý
    TAT_CA: 255,    // : get all
    CHO_Y_KIEN_CHI_DAO:9
}
export const PROCESS_STATUS_TEXT = {
    "1": "đang xử lý",
    "2": "đã xử lý",
    "3": "quá hạn",
    "0": "chưa xử lý",
    "9": "Xin ý kiến cấp trên",
    "255": "",
}


const colors = ['#eb4f4e', '#f28352', '#5694e1', '#c1c1c1']
const keys = ['quahan', 'chuaxuly', 'dangxuly', 'hoanthanh']
const titleChart = ['Quá hạn', 'Chưa xử lý', 'Đang xử lý', 'Hoàn thành']
const selectedColor = "#deddf1";
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };


export default class ThongKeBox extends Component {
    static propTypes = {
        catId: PropTypes.number,
        title: PropTypes.string,
        onFilter: PropTypes.func,
        subType: PropTypes.any,
        token: PropTypes.string
    };

    constructor(props) {
        super(props);

        var currentMonth = new Date().getMonth() + 1; //Current Month
        this.monthArr = [];
        for (let i = 1; i <= currentMonth; i++) {
            this.monthArr.push(i);
        }
        this.thongKeData = [];
        this.state = {
            catId: this.props.catId ? this.props.catId : 0,
            subType: this.props.subType ? 2 : 1,
            isLoadMore: false,
            isLoading: false,
            isHigher: false,
            deviation: 0,
            token:this.props.token,
            selectedStatus: PROCESSING_STATUS.TAT_CA,
            selectedMonth: 0,
            monthData: {
                tong: 12,
                quahan: 0,
                chuaxuly: 0,
                dangxuly: 6,
                hoanthanh: 6,
            },data:[],
            numberChartData: [
                [], [], [], []
            ],
            xAxis: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        };
    }

    componentDidMount() {
        this.refreshData(this.state.subType, true);
    }

    refreshData(subType = 1, isLoading = false) {
        newsID = this.state.catId;
        if (newsID != NEW_CATEGORY.VAN_BAN) subType = 0;
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();   //Current Year

        this.setState({ isLoading: isLoading, subType: subType });
        CommonAPI.getThongKe(newsID, year, subType,this.state.token).then((response) => {
            //alert(response);
            console.log('dataR',response)
            if (response) {

                length = response.length;
                for (i = length + 1; i <= 12; i++) {
                    response.push({
                        tong: 0,
                        quahan: 0,
                        chuaxuly: 0,
                        dangxuly: 0,
                        hoanthanh: 0,
                        choykienchidao:0,
                        month: i,
                        year: year,
                    });
                }
                this.thongKeData = response;
                monthData = response.find(item => item.month == month);
                if (!monthData) monthData = response[0];

                prevmonthData = response.find(item => (item.month == month - 1));
                if (!prevmonthData) prevmonthData = response[0];

                isHigher = monthData.tong >= prevmonthData.tong;
                deviation = prevmonthData.tong ? Math.round(Math.abs((monthData.tong - prevmonthData.tong) / prevmonthData.tong * 100)) : 100;

                
                data1 = response.map(item => item.quahan);
                data2 = response.map(item => item.chuaxuly);
                data3 = response.map(item => item.dangxuly);
                data4 = response.map(item => item.hoanthanh);
                const numberChartData = [
                    data1, data2, data3, data4
                ]
                this.setState({
                    isHigher: isHigher,
                    deviation: deviation,
                    numberChartData: numberChartData,
                    // selectedMonth: month,
                })
                this.refreshDashboard();
            }
            this.setState({ isLoading: false });
        })

        // Không cần dùng API này nữa do tháng hiện tại sẽ lấy từ danh sách tháng ra.
        // CommonAPI.getThongKeTotal(newsID, year).then((response)=> {
        // 	if (response) {
        // 		if (response.month == 0) response.month = month;
        // 		this.setState({
        // 			monthData: response,
        // 		})
        // 	}
        // });
    }
    refreshDashboard() {
        response = this.thongKeData;
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();   //Current Year

        monthData = response.find(item => item.month == month);
        if (!monthData) monthData = response[0];
        selectedMonthData = null;

        if (this.state.selectedMonth == 0) {
            selectedMonthData = {
                month: 0,
                year: year,
                tong: response.reduce((a, b) => a + parseInt(b.tong), 0),
                quahan: response.reduce((a, b) => a + parseInt(b.quahan), 0),
                chuaxuly: response.reduce((a, b) => a + parseInt(b.chuaxuly), 0),
                dangxuly: response.reduce((a, b) => a + parseInt(b.dangxuly), 0),
                choykienchidao: response.reduce((a, b) => a + parseInt(b.choykienchidao), 0),
                hoanthanh: response.reduce((a, b) => a + parseInt(b.hoanthanh), 0),
            }
        }
        else {
            selectedMonthData = response.find(item => item.month == this.state.selectedMonth);
        }
        var data=[
            {name:'Quá hạn',y:selectedMonthData.quahan},
            {name:'Chưa xử lý',y:selectedMonthData.chuaxuly},
            {name:'Đang xử lý',y:selectedMonthData.dangxuly},
            {name:'Hoàn thành',y:selectedMonthData.hoanthanh},
            {name:'Chờ ý kiến chỉ đạo',y:selectedMonthData.choykienchidao}
        ]
        if (!selectedMonthData) selectedMonthData = monthData;
        this.setState({ monthData: selectedMonthData, data})
    }

    onFilter(statusId) {
        if (this.state.selectedStatus == statusId) {
            statusId = PROCESS_STATUS_TEXT.TAT_CA;
        }
        this.setState({ selectedStatus: statusId });
        if (this.props.onFilter) {
            this.props.onFilter(statusId, this.state.selectedMonth);
        }

    }

    onMonthFilter(month) {
        this.setState({ selectedMonth: month }, () => this.refreshDashboard());
        if (this.props.onFilter) {
            this.props.onFilter(this.state.selectedStatus, month);
        }
    }


    renderMonthPicker() {
        preText = "Tổng số " + this.props.title + (this.props.catId == NEW_CATEGORY.VAN_BAN ? (this.state.subType == 1 ? " đi" : " đến") : "");
        preText = ""
        return (
            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                <Picker
                    itemStyle={{ color: "#444444", fontSize: scale(24), textAlign: 'flex-start' }}
                    textStyle={{ textAlign: 'left' }}
                    iosHeader="Mời bạn chọn"
                    headerBackButtonText="Hủy"
                    headerBackButtonTextStyle = {{padding:20}}
                    headerTitleStyle = {{paddingTop:20}}
                    selectedValue={this.state.selectedMonth}
                    mode="dropdown"
                    style={{
                        height: scale(64),
                        // width: win.width - 20,
                    }}
                    onValueChange={(itemValue, itemIndex) => { this.onMonthFilter(itemValue) }}
                >
                    <Picker.Item label={preText + " Năm 2019"} value={0} />
                    {
                        this.monthArr.map((item, index) => {
                            return (<Picker.Item label={preText + " Tháng " + item.toString()} value={item} style={{ color: 'green' }} />)
                        })
                    }
                </Picker>
                {
                    Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, justifyContent: 'center' }}>
                        <Icon name="md-arrow-dropdown" style={{ color: "#444444", fontSize: scale(30) }} ></Icon>
                    </View> : <View />
                }
            </View>
        );
    }
    onItemClick(index){
        // alert(index)
        if(this.props.navigation){
            var item ={}
            if(this.state.catId==NEW_CATEGORY.BAO_CAO){
                return
            }
            item.cateID = this.state.catId;
            item.token = this.state.token;
            switch(index){
                case 0:
                    item.process=PROCESSING_STATUS.QUA_HAN
                    break;
                case 1:
                    item.process=PROCESSING_STATUS.CHUA_XU_LY
                    break;
                case 2:
                    item.process=PROCESSING_STATUS.DANG_XU_LY
                    break;
                case 3:
                    item.process=PROCESSING_STATUS.DA_XU_LY
                    break;
                case 4:
                    item.process=PROCESSING_STATUS.CHO_Y_KIEN_CHI_DAO
                    break;

            }
            this.props.navigation.navigate('ThongKeChiTiet',{data:item,token:item.token});
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        width: "100%",
                        height: 400,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <AppIndicator />
                </View>
            );
        }

        return (
            <View style={{ flexDirection: "column", backgroundColor: '#f6f6f6' }}>
                {/* <View style={{ backgroundColor: "white"}}>
			  <Image style = {{width:'100%', resizeMode:'contain', height:300}} source = {require("../../../assets/images/default/bieu_do.png")}></Image>
			</View> */}
                <View>
                    <View
                        style={{
                            paddingBottom: scale(0),
                            paddingHorizontal: 10,
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: "white",
                            width: '100%',
                        }}>
                        <View style={{  paddingBottom: verticalScale(10), flexDirection: 'row', alignItems: 'flex-start' }}>
                            {this.renderMonthPicker()}
                            {/* <TouchableOpacity onPress={() => this.onFilter(PROCESSING_STATUS.TAT_CA)}>
                                <Text style={{ color: '#333333', fontSize: FONT_SIZE_60, marginTop: verticalScale(10), fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}></Text>
                            </TouchableOpacity> */}
                        </View>
                            <View style={{flexDirection:'row'}}>
                                {/* <TouchableOpacity  style={{ backgroundColor: '#ebebeb', flex: 1, margin: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                        <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Tổng số</Text>
                                        <Text style={{ color: 'black', fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.tong}</Text>
                                    </View>
                                </TouchableOpacity> */}

                                {/* <View style={{  justifyContent: 'space-around', width: win.width /3, paddingVertical: 0 }}>
                            
                                    <TouchableOpacity onPress={() => this.onFilter(PROCESSING_STATUS.QUA_HAN)} style={{ backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.QUA_HAN ? selectedColor : '#ebebeb', flex: 1, margin: 5 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                            <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Quá hạn</Text>
                                            <Text style={{ color: colors[0], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.quahan}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onFilter(PROCESSING_STATUS.CHUA_XU_LY)} style={{ backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.CHUA_XU_LY ? selectedColor : '#ebebeb', flex: 1, margin: 5 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                            <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Chưa xử lý</Text>
                                            <Text style={{ color: colors[1], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.chuaxuly}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ justifyContent: 'space-around',width: win.width /3}}>
                                    <TouchableOpacity onPress={() => this.onFilter(PROCESSING_STATUS.DANG_XU_LY)} style={{ backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.DANG_XU_LY ? selectedColor : '#ebebeb', flex: 1, margin: 5 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                            <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Đang xử lý</Text>
                                            <Text style={{ color: colors[2], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.dangxuly}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onFilter(PROCESSING_STATUS.DA_XU_LY)} style={{ backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.DA_XU_LY ? selectedColor : '#ebebeb', flex: 1, margin: 5 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                            <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Hoàn thành</Text>
                                            <Text style={{ color: colors[3], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.hoanthanh}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                    </View>
                    <PieChart click={(value)=>this.onItemClick(value)} data={this.state.data} title='' />
                    <View style={{ padding: 10, flex: 0.95, backgroundColor: 'white'}}>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'white' }}>
                            <Icon name={this.state.isHigher ? "md-arrow-dropup" : "md-arrow-dropdown"}
                                style={{ color: this.state.isHigher ? "#eb4f4e" : "#217de0", fontSize: FONT_SIZE_30 }} ></Icon>
                            <Text style={{ marginBottom: 10, color: this.state.isHigher ? "#eb4f4e" : "#217de0", fontSize: FONT_SIZE_24 }}>&nbsp;{this.state.isHigher ? "Tăng" : "Giảm"} {this.state.deviation}% so với tháng trước</Text>
                        </View> */}
                        </View>

                        {/* <View style={{ backgroundColor: 'white', marginTop: 10  }}> */}
                        {/* <View style={{width: '100%',paddingHorizontal: 10, marginTop: 18}}>
						<Text style={{ textTransform: 'uppercase',color: '#464646',marginBottom:20}}>Thống kê {this.props.title} năm {moment().year()}</Text>
					</View> */}
                        {/* <StackColumnChart data ={this.state.numberChartData} keys={titleChart} colors={colors} style={{width:"100%"}}/> */}
                        {/* <View style={{ padding: 10, flex: 0.95, marginLeft: 10 }}> */}
                        {/* <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
							<Icon name={this.state.isHigher ? "md-arrow-dropup" : "md-arrow-dropdown"} 
										style={{color:this.state.isHigher ? "#eb4f4e": "#217de0", fontSize: FONT_SIZE_30}} ></Icon>
							<Text style={{ marginBottom:10, color: this.state.isHigher ? "#eb4f4e": "#217de0", fontSize: FONT_SIZE_24 }}>&nbsp;{this.state.isHigher ? "Tăng": "Giảm"} {this.state.deviation}% so với tháng trước</Text>
					    </View> */}
                        {/* </View> */}
                        {/* </View> */}
                    </View>
                </View>
                );
            }
}