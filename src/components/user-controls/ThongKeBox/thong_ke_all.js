import React, { Component } from "react";
import { TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { scale, verticalScale, moderateScale } from "../utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Icon, View, Picker } from "native-base";
import Text from "../../custom-view/text";
import styles from "./styles";
import CommonAPI from "../../../services/api-service/common-api";
import AppIndicator from '../AppIndicator';
import StackColumnChart from "../Charts/StackColumnChart";
import moment from 'moment'
import ThongKeChart from "../ThongkeChart";
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
}
export const PROCESS_STATUS_TEXT = {
    "1": "đang xử lý",
    "2": "đã xử lý",
    "3": "quá hạn",
    "0": "chưa xử lý",
    "255": "",
}


const colors = ['#eb4f4e', '#f28352', '#5694e1', '#c1c1c1']
const keys = ['quahan', 'chuaxuly', 'dangxuly', 'hoanthanh']
const titleChart = ['Quá hạn', 'Chưa xử lý', 'Đang xử lý', 'Hoàn thành']
const selectedColor = "#deddf1";
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };
export default class ThongKeAllBox extends Component {
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
            type: this.props.type ? this.props.type : 1,
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
            },
            data:[]
        };
    }

    componentDidMount() {
        // alert(this.state.type)
        this.refreshData(this.state.subType, true,this.props.type);
    }

    refreshData(subType = 1, isLoading = false,type=1) {
        newsID = this.state.catId;
        if (newsID != NEW_CATEGORY.VAN_BAN) subType = 0;
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();   //Current Year

        this.setState({ isLoading: isLoading, subType: subType });
        CommonAPI.getThongKeAll(type,newsID, year, subType,this.state.token).then((response) => {
            // (response);
            if (response) {
                for(var i=0;i<response.dsDonVi.length;i++){
                    if(response.dsDonVi[i].token==null||response.dsDonVi[i].dsThongKe==null){
                        response.dsDonVi.splice(i, 1);
                        i--;
                        continue
                   }
                    var hoanthanh = 0;
                    var chuaxuly = 0;
                    var dangxuly = 0;
                    for(var p = 0;p<response.dsDonVi[i].dsThongKe.length;p++){
                        hoanthanh = hoanthanh + response.dsDonVi[i].dsThongKe[p].hoanthanh;
                        chuaxuly = chuaxuly + response.dsDonVi[i].dsThongKe[p].chuaxuly;
                        dangxuly = dangxuly + response.dsDonVi[i].dsThongKe[p].dangxuly;
                    }
                    if(hoanthanh>0||chuaxuly>0||dangxuly>0)
                        response.dsDonVi[i].dsThongKe.unshift({hoanthanh,chuaxuly,dangxuly})
                }
                this.setState({ isLoading: false,data:response.dsDonVi, selectedMonth:0});
            }
        })
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
                hoanthanh: response.reduce((a, b) => a + parseInt(b.hoanthanh), 0),
            }
        }
        else {
            selectedMonthData = response.find(item => item.month == this.state.selectedMonth);
        }

        if (!selectedMonthData) selectedMonthData = monthData;
        this.setState({ monthData: selectedMonthData, })
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
        this.setState({ selectedMonth: month });
        // alert(this.state.month)
        // if (this.props.onFilter) {
        //     this.props.onFilter(this.state.selectedStatus, month);
        // }
    }


    renderMonthPicker() {
        var month ="Tháng "
        var year="Năm "
        preText = "" + this.props.title + (this.props.catId == NEW_CATEGORY.VAN_BAN ? (this.state.subType == 1 ? " đi" : " đến") : "");
        if(this.props.catId == NEW_CATEGORY.VAN_BAN||this.props.catId == NEW_CATEGORY.KHAN_CAP){
            preText ="";
            month="Tháng ";
            year="Năm "
        }
        return (
            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                <Picker
                    itemStyle={{ color: "#444444", fontSize: scale(24), textAlign: 'center' }}
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
                    <Picker.Item label={preText + year+"2019"} value={0} />
                    {
                        this.monthArr.map((item, index) => {
                            return (<Picker.Item label={preText + month + item.toString()} value={item} style={{ color: 'green' }} />)
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
    gotoDetail(item,value){
        if(this.props.navigation){
            item.cateID = this.state.catId;
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
                        <View style={{ width: '100%', paddingBottom: verticalScale(10), flexDirection: 'column', alignItems: 'center' }}>
                            {this.renderMonthPicker()}
                        </View>
                      
                    </View>
                    {/* {this.props.fromKhanCap &&<StackColumnChart data={this.state.numberChartData} keys={titleChart} colors={colors} style={{ width: "100%" }} />} */}
                    <ThongKeChart click={(item,value)=>this.gotoDetail(item,value)} data={this.state.data} month={this.state.selectedMonth}/>
                    {/* <View style={{ padding: 10, flex: 0.95, backgroundColor: 'white'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'white' }}>
                            <Icon name={this.state.isHigher ? "md-arrow-dropup" : "md-arrow-dropdown"}
                                style={{ color: this.state.isHigher ? "#eb4f4e" : "#217de0", fontSize: FONT_SIZE_30 }} ></Icon>
                            <Text style={{ marginBottom: 10, color: this.state.isHigher ? "#eb4f4e" : "#217de0", fontSize: FONT_SIZE_24 }}>&nbsp;{this.state.isHigher ? "Tăng" : "Giảm"} {this.state.deviation}% so với tháng trước</Text>
                        </View>
                        </View>*/}
                        <View style={{padding:10,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                            <Text style={{fontSize:scale(30)}}>Click vào trong đơn vị để xem chi tiết</Text>
                        </View>
                    </View> 
                </View>
                );
            }
}