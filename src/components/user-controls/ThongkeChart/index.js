import React, { Component } from "react";
import { TouchableOpacity, Image, Dimensions, Platform} from "react-native";
import { scale, verticalScale, moderateScale } from "../utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Icon, View, Picker, Row, Content } from "native-base";
import Text from "../../custom-view/text";
import styles from "./styles";
import NguoiDanAPI from "../../../services/api-service/nguoi-dan-api";
import AppIndicator from '../AppIndicator';
import moment from 'moment'
import { FlatList } from "react-native-gesture-handler";
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_60 = scale(70);
const deviceWidth = Dimensions.get("window").width;
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


const colors = [ '#34b751', '#eba82d', '#d53939']
// const titleChart  = [ 'Quá hạn', 'Chưa xử lý', 'Đang xử lý', 'Hoàn thành' ]
const type = ["Đã xử lý","Đang xử lý","Chưa xử lý"]
const iconWidth=scale(100);
const iconHeight=verticalScale(66);
export default class ThongKeChart extends Component {
	static propTypes = {
		catId: PropTypes.number,
		title: PropTypes.string,
		onFilter: PropTypes.func,
		subType: PropTypes.any,
	};
	
	constructor(props) {
			super(props);

            this.state={
                isLoading:false,
                data : [],
                select:0,
                click:{
                    indexList:-1,
                    indexData:0
                }
            }
		
    }
    componentWillReceiveProps(props){
        if(this.props.data ){
            const data = this.props.data;
            const select = this.props.month;
            this.updateData(data,props.month);
        }
    }
    componentWillMount(){
        if(this.props.data){
            const data = this.props.data;
            const select = this.props.month;
            this.updateData(data,select);
        }
    }
    updateData(data,select){
        var rs = [];
        for(var i=0;i<data.length;i++){
            if(data[i].dsThongKe.length>select){
                var hoanthanh = data[i].dsThongKe[select].hoanthanh;
                var dangxuly = data[i].dsThongKe[select].dangxuly;
                var chuaxuly = data[i].dsThongKe[select].chuaxuly;
                if(hoanthanh>0||chuaxuly>0||dangxuly>0){
                    console.log('abc123',hoanthanh+" "+chuaxuly+" "+dangxuly)
                    rs.push({
                        title:data[i].donVi,
                        data:[
                            hoanthanh,
                            dangxuly,
                            chuaxuly
                        ],
                        token:data[i].token
                    })
                }
            }
        }
        this.setState({data:rs})
    }
    onClick(item,value){
        item.name=type[value]+" "+item.title;
        switch(value){
            case 0:
                item.process=2
                break;
            case 1:
                item.process=1
                break;
            case 2:
                item.process=0
                break;
            default:
                item.process=255
        }
        this.props.click(item,value);
    }
	renderChart(item,index){
        var sum = (item.data[0]+item.data[1]+item.data[2]);
        return (
            <View style={{flexDirection:'row',height:verticalScale(30),flex:7}}>
                <TouchableOpacity style={{flex:item.data[0]}} 
                    onPress={()=>this.onClick(item,0)}
                    onPressIn={()=>this.setState({click:{indexList:index,indexData:0,justifyContent:'center',alignContent:'center'}})}>
                    <View style={{borderBottomLeftRadius:3,borderTopLeftRadius:3,backgroundColor:colors[0],flex:1}}>
                        <Text style={{textAlign:'center',color:'white'}}>{item.data[0]*10>sum?item.data[0]:""}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:item.data[1]}}  
                    onPress={()=>this.onClick(item,1)}
                    onPressIn={()=>this.setState({click:{indexList:index,indexData:1}})}>
                    <View style={{backgroundColor:colors[1],flex:1,justifyContent:'center',alignContent:'center'}}>
                        <Text style={{textAlign:'center',color:'white'}}>{item.data[1]*10>sum?item.data[1]:""}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:item.data[2]}}  
                    onPress={()=>this.onClick(item,2)}
                    onPressIn={()=>this.setState({click:{indexList:index,indexData:2}})}>
                    <View style={{borderBottomRightRadius:3,borderTopRightRadius:3,backgroundColor:colors[2],flex:1,justifyContent:'center',alignContent:'center'}}>
                        <Text style={{textAlign:'center',color:'white'}}>{item.data[2]*10>sum?item.data[2]:""}</Text>
                    </View>
                </TouchableOpacity>
            </View>
               
        )
    }
    renderClickChart(item,index){
        if(index==this.state.click.indexList){
            var sum = item.data[0]+item.data[1]+item.data[2];
            var percent =0
            switch(this.state.click.indexData){
                case 0:
                    percent = (item.data[0]/2);
                    break;
                case 1:
                    percent = (item.data[0]+item.data[1]/2);
                    break;
                case 2:
                    percent = (item.data[0]+item.data[1]+item.data[2]/2);
                    break;
            }
            var left = percent*(deviceWidth-30)/sum -iconWidth/2;
            return (
                <View style={{position:'absolute',bottom:8,left:left,height:iconHeight,width:iconWidth,justifyContent: 'center', alignItems: 'center'}}>
                    <Image  style={{height:iconWidth*20/30,width:iconWidth}} source={require('../../../../assets/images/icon/ic_rect.png')}/>
                    <View style={{position: 'absolute', top: iconHeight/4, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{item.data[this.state.click.indexData]}</Text>
                    </View>
                </View>
            )
        }else{
            return (<View/>)
        }
    }
    renderItem=({item,index})=>(
        <View>
            <Text style={{marginTop:scale(8),marginBottom:scale(8),color:'#333333',fontSize:scale(28)}}>{item.title}: {item.data[0]+item.data[1]+item.data[2]}</Text>
            {this.renderChart(item,index)}
            {this.renderClickChart(item,index)}
        </View>
    )
    renderType(title,color){
        return(
            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                <View style={{backgroundColor:color,width:scale(40),height:scale(40),borderRadius:scale(20)}}/>
                <Text style={{marginLeft:8}}>{title}</Text>
            </View>
        )
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
		// <Content>
            <View style={{ flexDirection: "column",backgroundColor:'white'}}>
			<FlatList
                contentContainerStyle={{padding:15}}
                data={this.state.data}
                extraData={this.state.data}
                keyExtractor={(item, index) => item}
                renderItem={this.renderItem}
            />
            <View style={{margin:15,marginTop:0,backgroundColor:'#d8d8d8',height:1}}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:15,marginRight:15}}>
                {this.renderType(type[0],colors[0])}
                {this.renderType(type[1],colors[1])}
                {this.renderType(type[2],colors[2])}
            </View>
            {/* <View style={{margin:15}}>
            </View> */}
		    </View>
        // </Content>
		);
	}
}