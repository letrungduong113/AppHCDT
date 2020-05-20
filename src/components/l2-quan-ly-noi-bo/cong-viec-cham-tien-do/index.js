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
import Footer ,{footerMargin} from '../../user-controls/CustomFooter'
import Text from '../../../components/custom-view/text';
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api'
import HanhChinhCongAPI from '../../../services/api-service/hanh-chinh-cong'
import PieChart from '../../user-controls/PieChart'
import AppIndicator from '../../user-controls/AppIndicator'

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class CongViecChamTienDo extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {text: '', isLoading: true, data_soNganh: [], soNganh:[], listData: []}
    }

    componentDidMount() {
        LinhVucQuanLyAPI.getCongViec().then((res)=>{
          // alert(JSON.stringify(res));
          this.setState({listData: res.cvChamTienDos, defaultlistData: res.cvChamTienDos, isLoading: false});
        });
      }

      _renderItem = ({item}) => (
          // <TouchableOpacity key={item.id} style={{backgroundColor: item.isRead ? 'white' : 'transparent', width: '100%', 
          //   height: khungHeight, flexDirection: "row"}} onPress={() => this.props.navigation.navigate('ChiTietCongViec')} >
          <TouchableOpacity key={item.id} style={{backgroundColor: 'white', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
            height: khungHeight, flexDirection: "row"}} onPress={() => this.props.navigation.navigate('ChiTietCongViecScreen', {id: item.id})} >
            <View style={{flex: 15, justifyContent: "center", alignItems: "center"}} >
                <Image source={
                // item.icon ? item.icon :
                require('../../../../assets/images/l2-linh-vuc-quan-ly/congviecchamtiendo.png')} 
                style={{width: iconSize, height: iconSize}} />
            </View>

            <View style={{flex: 75, justifyContent: "center"}}>
                {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}>{item.title}</Text> */}
                <Text style={{color: 'black', fontSize: titleSize}} line={2}>{item.tieuDe}</Text>
                <Text style={{fontSize: textConlai, color: 'grey'}}>
                {item.boPhanThucHien}    
                {/* |    {item.status} */}
                </Text>
            </View>

            <View style={{flex: 10}}></View>
          </TouchableOpacity>
      )

      renderItems() {
        if (this.state.isLoading) {
          return (
              <AppIndicator />
          );
        }
        if (this.state.listData == ''){
          return (
            <Content style={{marginBottom:footerMargin}}>
            <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400)}}>
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
          <Content style={{marginBottom:footerMargin}}>
            <View>
            {this.renderChart()}
                <FlatList
                    data={this.state.listData}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this._renderItem}
                    numColumns={1}
                />
            </View>
          </Content>
        );
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

    renderChart() {
      // alert(JSON.stringify(this.state.data_soNganh))
      const chart_wh = 150
      const sliceColor = ['#c93f3c','#c2c2c2']
      return (
          <View style={{ padding: moderateScale(20), backgroundColor: 'white', marginTop: moderateScale(8) }}>
              <Text style={{ fontSize: scale(26), color: '#343434' }}>TỶ LỆ CÔNG VIỆC CHẬM TIẾN ĐỘ</Text>
              <View style={{alignItems:'center',marginTop:moderateScale(20), flexDirection: "row"}}>
                  <PieChart
                      chart_wh={chart_wh}
                      series={[36,64]}
                      sliceColor={sliceColor}
                  />
                  <View style={{justifyContent:'space-around',marginTop:moderateScale(8)}}>
                      <View style={{flexDirection:'row',alignItems:'center', marginLeft:scale(69), marginBottom: 20}}>
                          <View style={{backgroundColor:'#c93f3c',width:scale(35),height:scale(21)}}/>
                          <Text style={{fontSize:scale(22),color:'#666666',marginLeft:scale(8)}}>Công việc chậm tiến độ</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center',marginLeft:scale(69)}}>
                          <View style={{backgroundColor:'#c2c2c2',width:scale(35),height:scale(21)}}/>
                          <Text style={{fontSize:scale(22),color:'#666666',marginLeft:scale(8)}}>Công việc khác</Text>
                      </View>
                  </View>
              </View>
              
          </View>
      )
  }

      render() {
        return(
            <Container>
                <CustomHeader title='CÔNG VIỆC CHẬM TIẾN ĐỘ' />
                {this.renderItems()}
                <Footer select='0'/>
            </Container>
        )
      }

}