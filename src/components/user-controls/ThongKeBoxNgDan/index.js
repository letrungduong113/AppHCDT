import React, { Component } from "react";
import { TouchableOpacity, Image, Dimensions, Platform} from "react-native";
import { scale, verticalScale, moderateScale } from "../utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Icon, View, Picker } from "native-base";
import Text from "../../custom-view/text";
import styles from "./styles";
import NguoiDanAPI from "../../../services/api-service/nguoi-dan-api";
import AppIndicator from '../AppIndicator';
import PieChart from "../Charts/PieChart"
import moment from 'moment'
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
	"1" : "chưa trả lời",
	"2" : "đã trả lời",
	"255": "",
}


const colors = [ '#eb4f4e', '#3d5e8f', ]
// const titleChart  = [ 'Quá hạn', 'Chưa xử lý', 'Đang xử lý', 'Hoàn thành' ]
const selectedColor = "#deddf1";
	
export default class ThongKeBoxNgDan extends Component {
	static propTypes = {
		catId: PropTypes.number,
		title: PropTypes.string,
		onFilter: PropTypes.func,
		subType: PropTypes.any,
	};
	
	constructor(props) {
			super(props);

			var currentMonth = new Date().getMonth() + 1; //Current Month
			this.monthArr = [];
			for (let i = 1; i <= currentMonth; i ++) {
				this.monthArr.push(i);
			}
			this.thongKeData = [];
			this.state = {
					catId: this.props.catId? this.props.catId: 0,
					subType: this.props.subType? 2: 1,
					isLoadMore:false,
					isLoading: false,
					isHigher: false,
					deviation: 0,
					selectedStatus: PROCESSING_STATUS.TAT_CA,
					selectedMonth: 0,
					monthData: {
						tong: 0,
						chuatraloi: 0,
						datraloi: 0,
                        },
                    data:[],
					numberChartData:[
          	[],[],[],[]
          ],
					xAxis: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12" ],
			};
		
	}
    
  componentDidMount() {
		this.refreshData(this.state.subType, true);
	}
	
	refreshData() {
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear();   //Current Year

		this.setState({isLoading: true});
		NguoiDanAPI.getThongKe(year).then((response)=> {
			//alert(response);
			if (response) {
				
				length = response.length;
				for (i = length + 1; i <= 12; i ++) {
					response.push({
						tong: 0,
						chuatraloi: 0,
						datraloi: 0,
						month: i,
						year: year,
						});
				}
				this.thongKeData = response;
				monthData= response.find(item => item.month == month);
				if (!monthData) monthData = response[0];
				
				prevmonthData = response.find(item => (item.month == month - 1));
				if (!prevmonthData) prevmonthData = response[0];
				
				isHigher = monthData.tong >= prevmonthData.tong;
				deviation = prevmonthData.tong ? Math.round(Math.abs((monthData.tong - prevmonthData.tong)/ prevmonthData.tong * 100)) : 100 ;

				// data1 = response.map(item=>item.quahan);
				// data2 = response.map(item=>item.chuaxuly);
				// data3 = response.map(item=>item.dangxuly);
				// data4 = response.map(item=>item.hoanthanh);
				// const numberChartData=[
				// 		data1,data2,data3,data4
				// ]
				this.setState({
					isHigher: isHigher,
          deviation: deviation,
					selectedMonth: month,
				})
				this.refreshDashboard();
			}
			this.setState({isLoading: false});
		})
	}
	refreshDashboard() {
        response = this.thongKeData;
        console.log('thongke',response)
        console.log('thongke1',this.state.selectedMonth)
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear();   //Current Year
	
		selectedMonthData = null;
	
		if (response.length > 0) {
			monthData= response.find(item => item.month == month);
			if (!monthData) monthData = response[0];
			
			if (this.state.selectedMonth == 0) {
				selectedMonthData = { 
					month: 0,
					year: year,
					tong: response.reduce((a,b)=> a + parseInt(b.tong), 0),
					chuatraloi: response.reduce((a,b)=> a + parseInt(b.chuatraloi), 0),
					datraloi: response.reduce((a,b)=> a + parseInt(b.datraloi), 0),
				}
			}
			else {
				selectedMonthData = response.find(item =>item.month == this.state.selectedMonth);
			}
	
			if (!selectedMonthData) selectedMonthData = monthData;
		}
		else {
			selectedMonthData = {month: 0, year: year, tong: 0, chuatraloi: 0, datraloi: 0}
        }
        
		var data=[
            {name:'Chưa trả lời',y:parseInt(selectedMonthData.chuatraloi)},
            {name:'Đã trả lời',y:parseInt(selectedMonthData.datraloi)},
        ]
		this.setState({ monthData: selectedMonthData,data })
	}

	onStatusFilter(statusId) {
		if (this.state.selectedStatus == statusId) {
			statusId = PROCESS_STATUS_TEXT.TAT_CA;
		}
		this.setState({selectedStatus: statusId});
		if (this.props.onFilter) {
			this.props.onFilter(statusId, this.state.selectedMonth);
		}
		
	}
	
	onMonthFilter(month) {
		this.setState({selectedMonth: month}, ()=> this.refreshDashboard());
		// monthData = this.state.chartData.find(item => item.month == month);
		// if (monthData) {
		// 	this.setState({monthData: monthData});
		// }
		if (this.props.onFilter) {
			this.props.onFilter(this.state.selectedStatus, month);
		}
	}
	
	renderMonthPicker() {
		preText = "";
		return (
				<View style={{backgroundColor: 'white', marginTop: 10 }}>
						<Picker
                                itemStyle = {{color: "#444444", fontSize: scale(24), textAlign: 'center'}}
                                textStyle={{textAlign: 'left'}}
                                iosHeader="Mời bạn chọn"
                                headerBackButtonText="Hủy"
								selectedValue={this.state.selectedMonth}
								mode="dropdown"
								headerBackButtonTextStyle = {{padding:20}}
                                headerTitleStyle = {{paddingTop:20}}
								style={{
										height: scale(64),
										width: win.width-20,
								}}
								onValueChange={(itemValue, itemIndex) => {this.onMonthFilter(itemValue) }}
						>
								<Picker.Item label= {preText + "Năm 2019"} value={0} />
								{
										this.monthArr.map((item, index) => {
												return (<Picker.Item label={preText + "Tháng " + item.toString()} value={item} style={{color: 'green'}}/>)
										})
								}
						</Picker>
						{
								Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, justifyContent: 'center' }}>
										<Icon name="md-arrow-dropdown" style={{color:"#444444", fontSize: scale(30)}} ></Icon>
								</View> : <View />
						}
				</View>
		);
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
		<View style={{ flexDirection: "column"}}>
			{/* <View style={{ backgroundColor: "white"}}>
			  <Image style = {{width:'100%', resizeMode:'contain', height:300}} source = {require("../../../assets/images/default/bieu_do.png")}></Image>
			</View> */}
			<View>
				<View
					style={{
					paddingHorizontal: 10,
                    flexDirection: 'column',
                    paddingBottom:8,
					alignItems: 'center',
					backgroundColor: "white",
					width: '100%',}}>
					<View style={{width:'100%', paddingBottom: verticalScale(30), flexDirection: 'column', alignItems: 'center' }}>
						{this.renderMonthPicker()}
						{/* <TouchableOpacity onPress = {()=>this.onStatusFilter(PROCESSING_STATUS.TAT_CA)}>
							<Text style={{ color: '#333333', fontSize: FONT_SIZE_60, marginTop: verticalScale(10),fontFamily:'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.tong}</Text>
						</TouchableOpacity> */}
					</View>
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: win.width - 20, paddingVertical: 5}}>
						<TouchableOpacity onPress = {()=>this.onStatusFilter(PROCESSING_STATUS.QUA_HAN)}  style={{backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.QUA_HAN? selectedColor: '#ebebeb', flex: 1, margin: 5, height: scale(150)}}>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
								<Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Chưa trả lời</Text>
								<Text style={{ color: colors[0], fontSize: FONT_SIZE_60,fontFamily:'Roboto-Bold', fontWeight: 'bold' }}>{this.state.monthData.chuatraloi}</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress = {()=>this.onStatusFilter(PROCESSING_STATUS.CHUA_XU_LY)}  style={{backgroundColor: this.state.selectedStatus == PROCESSING_STATUS.CHUA_XU_LY? selectedColor: '#ebebeb', flex: 1, margin: 5}}>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
								<Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Đã trả lời</Text>
								<Text style={{ color: colors[1], fontSize: FONT_SIZE_60, fontFamily:'Roboto-Bold',fontWeight: 'bold'  }}>{this.state.monthData.datraloi}</Text>
							</View>
						</TouchableOpacity>
					</View> */}
			  </View>
              <PieChart click={(value)=>this.onItemClick(value)} data={this.state.data} title='' />
				{/* <View style={{ backgroundColor: 'white', marginTop: 10  }}>
					<View style={{width: '100%',paddingHorizontal: 10, marginTop: 18}}>
						<Text style={{ textTransform: 'uppercase',color: '#464646',marginBottom:20}}>Thống kê {this.props.title} năm {moment().year()}</Text>
					</View>
          <StackColumnChart data ={this.state.numberChartData} keys={titleChart} colors={colors} style={{width:"100%"}}/>
					<View style={{ padding: 10, flex: 0.95, marginLeft: 10 }}>
						<View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
							<Icon name={this.state.isHigher ? "md-arrow-dropup" : "md-arrow-dropdown"} 
										style={{color:this.state.isHigher ? "#eb4f4e": "#217de0", fontSize: FONT_SIZE_30}} ></Icon>
							<Text style={{color: this.state.isHigher ? "#eb4f4e": "#217de0", fontSize: FONT_SIZE_24 }}>&nbsp;{this.state.isHigher ? "Tăng": "Giảm"} {this.state.deviation}% so với tháng trước</Text>
					    </View>
					</View>
				</View> */}
			</View>
		</View>
		);
	}
}