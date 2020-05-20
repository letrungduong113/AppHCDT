import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  FlatList,
} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import PropTypes from "prop-types";
import YearMonthPicker from '../user-controls/YearPicker';
import moment from 'moment';
import {
  Container,
  Content,
  View,
} from "native-base";
import Text from '../custom-view/text'
import CustomHeader from "../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../user-controls/AppIndicator";
import Footer ,{footerMargin} from '../user-controls/CustomFooter';
import MasterAPI from "../../services/api-service/master-api";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
import TongHopBaoCaoControl from "./tong-hop-bao-cao/danh-sach-bao-cao";
import ChiTieuFragment from "./new-chi-tieu";
import ThongKeBaoCaoFragment from "./new-thongke-baocao-songanh";
const win = Dimensions.get("window");
export default class VanBanChiTieuScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  renderTabBar = props => <TabBar {...props}
    indicatorStyle={{ backgroundColor: '#777777' }}
    style={{ backgroundColor: 'white'}}
    labelStyle = {{color:'#666666',fontSize: scale(22)}}
   scrollEnabled = {true}
    // tabStyle = {{color:'green'}}
     />;

  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam("userToken"),
      titlePage: this.props.navigation.getParam("nameSoNganh"),
      isSoNganh: this.props.navigation.getParam("showSoNganh"),
      sizeList:0,
      dsLinhVuc: [],
      data_picker: 1,
      isLoading: true,
      task_type: true, //true = chi tieu don vi, false = tong hop bao cao
      data: [],
      data1: 0,
      pageNumber: 1,
      monthPicker:false,
      year: moment().format('YYYY'),
      listSoNganh: [],
      listChiTieu: [],
      index: 0,
      routes: [
        { key: 'first', title: 'Chỉ tiêu đơn vị' },
        { key: 'second', title: 'Tổng hợp báo cáo' },
        { key: 'third', title: 'Danh sách' },
      ],
    };
  }

  componentDidMount() {
    console.log('---------------------------', this.state.token)
    MucTieuAPI.getDsMucTieu(0, this.state.pageNumber, 10, this.state.year, 0, 0 , this.state.token).then((res)=>{
      // alert(JSON.stringify(res));
    if(res!=null){
      this.setState({listChiTieu: res, isLoading2: false});
    }
    });
  }

  FirstRoute = () => (
    <ChiTieuFragment navigation={this.props.navigation} token= {this.state.token}></ChiTieuFragment>
  );
  SecondRoute = () => (
    <ThongKeBaoCaoFragment navigation={this.props.navigation} token={this.state.token}></ThongKeBaoCaoFragment>
  );
  ThirdRoute = ()=>(
    <TongHopBaoCaoControl token={this.state.token}></TongHopBaoCaoControl>
  )

  
  
  // renderItems() {
  //   if (this.state.isLoading) {
  //     return (
  //       <View
  //         style={{
  //           width: "100%",
  //           height: 400,
  //           alignItems: "center",
  //           justifyContent: "center"
  //         }}
  //       >
  //         <AppIndicator />
  //       </View>
  //     );
  //   }
  //   return (
  //     <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
  //   );
  // }


  addThousandsSeparator(input) {
    var output = input
    if (parseFloat(input)) {
        input = new String(input); // so you can perform string operations
        var parts = input.split("."); // remove the decimal part
        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
        output = parts.join(".");
    }

    return output;
  }

reloadData(){
  MucTieuAPI.getDsMucTieu(0, 1, 10, this.state.year, 0, 0 , this.state.token).then((res)=>{
    // alert(JSON.stringify(res));
  if(res!=null){
    this.setState({listChiTieu: res, isLoading2: false, pageNumber: 1});
    
  }
  });
}


  render() {
    var task_type = this.state.task_type;
    return (
      <Container style={styles.container}>
        <CustomHeader title={this.state.titlePage}/>
        <Content

         style={{ backgroundColor: "#efefef" ,marginBottom:footerMargin}}>


         {/* todo */}

         {/* <View style={{ marginTop: 10, backgroundColor: 'white', padding: 10, justifyContent:'center' }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#f6f6f6' }}>
              
              <View
                style={{
                  width: scale(682),
                  height: scale(64),
                  borderWidth:1,
                  borderColor:'lightgray',
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    height: "100%",
                    flexDirection: "row"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      backgroundColor: task_type ? "#3D5F8F" : "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      if (!this.state.task_type) {
                        this.setState({
                          isLoading: true,
                          task_type: true
                        }, () => this.reloadData());
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: task_type ? "white" : "black",
                        fontSize: FONT_SIZE_MAIN
                      }}
                    >
                      CHỈ TIÊU ĐƠN VỊ
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: task_type ? "white" : "#3D5F8F",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      if (this.state.task_type) {
                        this.setState({
                          task_type: false
                        }, () => {});
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: task_type ? "black" : "white",
                        fontSize: FONT_SIZE_MAIN
                      }}
                    >
                      TỔNG HỢP BÁO CÁO
                </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            
          </View> */}
          <View style={{backgroundColor: '#f5f5f5', height:win.height, paddingBottom:footerMargin}}>
          <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.SecondRoute,
                third: this.ThirdRoute,
              })}
              renderTabBar={this.renderTabBar}
              onIndexChange={index => {
              this.setState({index})
              }}
              initialLayout={{ width: Dimensions.get('window').width}}
            />
            </View>
          {/* {
            this.state.task_type? this.renderItem3(this.state.listChiTieu) : (<TongHopBaoCaoControl token={this.state.token}></TongHopBaoCaoControl>)
          } */}


          
          {/* <YearMonthPicker
            visible={this.state.monthPicker}
            onClose={()=>this.setState({monthPicker:false})}
            year={this.state.year}
            selectYear2={(year)=>this.pickMonthYear(year)}
            /> */}
        </Content>
        <Footer select='0'/>
       
      </Container>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: "#ffffff",
      flex: 1,
  },
  container2: {
      marginLeft: scale(18),
      marginRight: scale(18),
      //backgroundColor: "white",
      flex: 1,
  },
  content: {
      backgroundColor: "white",
      // marginTop: scale(20),
  },
  viewtitle: {
      borderBottomColor: "gray",
      borderBottomWidth: 0.4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  titleText: {
      fontSize: scale(26),
      color: "black"
  },
  itemts: {
      flexDirection: 'row',
      borderBottomColor: "gray",
      borderBottomWidth: 0.4,
      
  }
});
