import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  Slider,
  WebView,
  Platform,
  FlatList,
  processColor,
  KeyboardAvoidingView,
} from "react-native";
import {
  Container,
  Header,
  Title,
  Icon,
  Body,
  Footer,
  Picker
} from "native-base";
import moment from "moment";
import Text from "../custom-view/text";
import CustomHeader from "../user-controls/CustomHeader";
import { BarChart, Grid } from 'react-native-svg-charts';
// import {BarChart} from 'react-native-charts-wrapper';
import ColumnChart from '../user-controls/Charts/ColumnChart'
import ColumnNoLabel from '../user-controls/Charts/ColumnNoLabel'
import DoubleColumnChart from '../user-controls/Charts/DoubleColumnChart'
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
import LinhVucQuanLyAPI from "../../services/api-service/linh-vuc-quan-ly-api";
import AppIndicator from "../user-controls/AppIndicator";
import CommandIdeaBox, {COMMAND_TYPE} from "../user-controls/CommandIdeaBox";
import NhanNhiemVuAPI from "../../services/api-service/nhan-nhiem-vu-api";
import ProgressListBox from "../user-controls/ProgressListBox";
import {convertNumber } from "../user-controls/utilities/converter";
// import console = require("console");

const win = Dimensions.get("window");
imgTaiLieu = require("../../../assets/images/l2-khan-cap/l2-chi-tiet/image_tailieu.png");
imgKhanCap = require("../../../assets/images/l2-khan-cap/l2-chi-tiet/image_khancap.png");
const size24 = scale(24);
var size = 3;
var IMG_DOC1 = require("../../../assets/images/muctieu/pdf2.png");
var IMG_DOC2 = require("../../../assets/images/muctieu/doc2.png");
var listType = [
  { type: "application/octet-stream", source: IMG_DOC1 },
  { type: "application/vnd.ms-excel", source: IMG_DOC1 },
  {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    source: IMG_DOC1
  },
  { type: "image/jpeg", source: IMG_DOC2 },
  { type: "image/png", source: IMG_DOC2 },
  { type: "text/plain", source: IMG_DOC2 },
  { type: "video/mp4", source: IMG_DOC2 },
  { type: "application/pdf", source: IMG_DOC2 }
];
const DEFAULT_WEB_HEIGHT = 300;
const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default class BaoCaoKTXHChiTietScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sizeList:0,
      data:[],
      task_type: true,
      isShowTK3Thang: false,
      isLoading1: true,
      isLoading2: true,
      id: this.props.navigation.getParam("id"),
      idCttk: this.replaceRN(this.props.navigation.getParam("idCttk")),
      groupId: this.props.navigation.getParam("groupId"),
      // id: 1,
      value: 10,
      isLoading: true,
      dienGiai: "",
      ketQua: 50,
      month:this.getDate(),
      mt_noi_dung: {
        noiDung: "Chưa có nội dung",
        ketQuaHienTai: 0,
        dienGiai: "",
        donVis: [],
        vanBan: [
          {
            ma: "",
            loaiVanBan: "",
            tenVanBan: "",
            nhaPhatHanh: "",
            thoiGianPhatHanh: "",
            linkTai: ""
          }
        ]
      },
      duBaoData:[],
      page_size: 3,
      listKQtheoThang:[],
      ex: [],
      ex2: [],
      ex3: [0, 0, 0],
      y1: 0,
      y2:0,
      y3:0,
      listChiTieuLienQuan: [],
    listBaoCao: [
      {id: 0, title: "Nông sản tăng", giaTri: "3,4%", delta: "tang 2%"},
      {id: 0, title: "Công nghiệp xây dựng tăng", giaTri: "9,2%", delta: "tang 2%"},
      {id: 0, title: "Công nghiệp khai khoáng", giaTri: "6,5%", delta: "tang 2%"},
      {id: 0, title: "Du lịch", giaTri: "10,3-10,5%", delta: "tang 2%"},
      {id: 0, title: "GDRP tăng trưởng", giaTri: "10%", delta: "tang 2%"},
      {id: 0, title: "Nội thu địa hạt", giaTri: "30.369 tỷ đồng", delta: "tang 2%"},
      
    ],
    webheight: DEFAULT_WEB_HEIGHT,
    };
  }

  getDate() {
    var d = new Date();
    return d.getMonth();
  }

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

  fillData(data, listDataMonth2){
    for(let i=0; i<12; i++){
      for(let j=0; j<data.length; j++){
        if(Number(listDataMonth2[i].month)==Number(data[j].month)&&data[j].year==2019){
          listDataMonth2[i].tienDo = data[j].tienDo;
          listDataMonth2[i].description = data[j].description;
        }
      }
    }
    return listDataMonth2;
  }

  
  fillData2(data, listDataMonth2){
    for(let i=0; i<12; i++){
      for(let j=0; j<data.length; j++){
        if(Number(listDataMonth2[i].month)==Number(data[j].month)&&data[j].year==2019){
          listDataMonth2[i].tienDo = data[j].tienDo+ " %";
          listDataMonth2[i].resultValue = data[j].resultValue;
          listDataMonth2[i].unit = data[j].unit;
        }
      }
    }
    return listDataMonth2;
  }

  fillData3(res){
    let arr=new Array();
    // for(let i=0; i<3; i++){
    //   for(let j=0; j<res.length; j++){
    //     if(res[j].year==listDataYear[i]){
    //       // listDataYear[i]=res[j];
    //       arr.push(res[j].year);
    //       // break;
    //     }
    //   }
    // }
    let y1=0, y2=0, y3=0;
    for(let i=0; i<res.length; i++){
      if(res[i].year==2019){
        y3=Number(res[i].value);
      }
      if(res[i].year==2018){
        y2=Number(res[i].value);
      }
      if(res[i].year==2017){
        y1=Number(res[i].value);
      }
    }
    this.setState({
      y3: y3,
      y2: y2,
      y1: y1,
    });
    // for(let i=0; i<res.length; i++)
    //   arr.push(Number(res[i].value));
    return arr;
  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    date = new Date();
    year = date.getFullYear();
    this.setState({isLoading: true});
    res1 = await MucTieuAPI.getNoiDung(this.state.id);
    if (res1 != null){
      if (!res1.totalResultValue) res1.totalResultValue = 0;

      this.setState({ mt_noi_dung: res1, isLoading1: false}  
        , () => {
          if(res1.trangThai==2){
            if(this._tientrinh)
            this._tientrinh.updateTrangThai(true);
          }}
        );
      if(this._ideaBox) this._ideaBox.updateOrgRef(res.referOrgID)
    } 

    groupId = this.state.groupId ? this.state.groupId : 1;
    res2 = await MucTieuAPI.getDsMucTieu(0, 1, 100, year, 0, groupId);
    if (res2 && res2.length) {
      index = res2.find(item=>item.id == this.state.id);
      if (index) res2.splice(index, 1);
      this.setState({listChiTieuLienQuan: res2});
    };
    // }
    MucTieuAPI.getKetQuaThucHien(this.state.id).then((res3)=>{
      // alert(JSON.stringify(res3))

      let listDataMonth2= [
        { month: "01", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "02", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "03", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "04", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "05", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "06", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "07", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "08", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "09", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "10", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "11", tienDo: 0, description: "Chưa có dữ liệu" },
        { month: "12", tienDo: 0, description: "Chưa có dữ liệu" },
      ];
      let listDataMonth3=[
        { month: "01", tienDo: "--", resultValue: "--", unit: ""},
        { month: "02", tienDo: "--", resultValue: "--", unit: ""},
        { month: "03", tienDo: "--", resultValue: "--", unit: ""},
        { month: "04", tienDo: "--", resultValue: "--", unit: ""},
        { month: "05", tienDo: "--", resultValue: "--", unit: ""},
        { month: "06", tienDo: "--", resultValue: "--", unit: ""},
        { month: "07", tienDo: "--", resultValue: "--", unit: ""},
        { month: "08", tienDo: "--", resultValue: "--", unit: ""},
        { month: "09", tienDo: "--", resultValue: "--", unit: ""},
        { month: "10", tienDo: "--", resultValue: "--", unit: ""},
        { month: "11", tienDo: "--", resultValue: "--", unit: ""},
        { month: "12", tienDo: "--", resultValue: "--", unit: ""},
      ];

      this.setState({
        listKQtheoThang: res3,
        ex: this.fillData(res3, listDataMonth2),
        ex2: this.fillData2(res3, listDataMonth3),
        ketQua: listDataMonth2[this.getDate()-1].tienDo,
        dienGiai: listDataMonth2[this.getDate()-1].description,
      });
    });
    

    // if(res3!=null){
      // alert(JSON.stringify(res3))
      // this.fillData3(res)
      // this.setState({
      //   listKQtheoThang: res3,
      //   ex: this.fillData(res3, listDataMonth2),
      //   ex2: this.fillData2(res3, listDataMonth3),
      //   ketQua: listDataMonth2[this.getDate()-1].tienDo,
      //   dienGiai: listDataMonth2[this.getDate()-1].description,
      // });
    // }

    this.setState({isLoading: false})
  }
  postYKienChiDao = async (response) => {
    if (response && response.message == "SUCCESS") {
        //console.log(this.state.ctrlTienTrinh);
        if (this._tientrinh) {
            this._tientrinh.refreshData();
            this._tientrinh.updateTrangThai(false)
        }
    }
  }


  renderThongKe(data){
    return(
      <FlatList
        // ItemSeparatorComponent= {<View style={{height: 2, backgroundColor: "white"}}></View>}
        numColumns = {4}
        data= {data}
        keyExtractor={(item, index)=>item.month}
        renderItem={({item})=>
        <View style={{width: (win.width-scale(40))/4, height: verticalScale(180), flexDirection: "row", marginBottom: 10}}>

          <View style={{width: ((win.width-scale(40))/4)-1, height: verticalScale(180), flexDirection: "column"}}>
            
            <View style={{height: verticalScale(66), backgroundColor: "#EFEFEF", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: item.month!=this.getDate()? "#3D5F8D": "red", fontSize: 20, fontWeight: "bold"}}>{item.tienDo}</Text>
            </View>

            <View style={{height: verticalScale(59), backgroundColor: "#EFEFEF", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#3D5F8D"}}>{item.resultValue}{" "}{item.unit}</Text>
            </View>

            <View style={{height: verticalScale(55), backgroundColor: "#E5E5E5", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#4F4F4F"}}>Tháng {Number(item.month)}</Text>
            </View>

          </View>

          <View style={{width: 1, height: verticalScale(180), backgroundColor: "white"}}></View>
        </View>
       
        }
      />
    );
  }

  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  renderMonth(data){
    return data.map((data, i)=>{
      return(
      <TouchableOpacity style={{height: "100%", flex:1}} onPress={()=>this.setState({dienGiai: data.description, ketQua: data.tienDo, month: data.month, isShowTK3Thang: true})}>
      <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
        <Text>T{i+1}</Text>
      </View>
      </TouchableOpacity>
      //  </View>
      );
    });
  }



  renderLoadingWebView() {
    return (<AppIndicator></AppIndicator>)
  }

  replaceRN(data){
    if (data) {
      data = data.replace("\r\n", "")
    }
    return data;
    //return data.replace(/(?:\\[rn])+/g, "");
  }

  renderSubItem = ({item}) => (
    <TouchableOpacity onPress={()=> {
      this.setState({
          id: item.id,
          idCttk: this.replaceRN(item.idCttk),
          groupId: item.groupId,
        }, ()=> this.refreshData())
      }}>
      <View style={{
              backgroundColor:'white',width: (win.width - scale(50))/2, height: 150,
              padding: scale(10), marginHorizontal: 2, paddingVertical: scale(10),
              borderWidth: 1, borderColor: '#dfdfdf', }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', width: (win.width - scale(50))/2 - scale(100), height: scale(80)}}>
          <Image source={item.icon} style={{width: scale(64), height: scale(64), marginRight: 5}}></Image>
          <Text style={{fontSize: scale(24)}} numberOfLines={3}>{item.noiDung}</Text>
        </View>
        
        <View style={{flex: 1, flexDirection: 'column', alignItems:'center', justifyContent: 'center', paddingVertical: 5}}>
          <Text style={{fontSize: scale(48)}}>{convertNumber(item.totalResultValue)}</Text>
          <Text style={{fontSize: scale(28)}}>{item.donVi}</Text>
        </View>
        <View style={{backgroundColor: '#28a745', alignItems: 'center'}}>
          <Text style={{fontSize: scale(24), color: 'white', padding: 5}}>Đạt {item.tiendo} %</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
      
  renderListHorizontal(){
  return (
    <View style={{marginVertical: 10, backgroundColor: 'white', height: 220}}>
      <Text style={{padding: 10}}>CÁC CHỈ TIÊU KHÁC</Text>
      <FlatList style = {{backgroundColor:'white', width:'100%', marginBottom:20,flex:1}}
              data= {this.state.listChiTieuLienQuan}
              keyExtractor={(item, index) => index.toString()}
              horizontal = {true}
              renderItem={this.renderSubItem}
          >
      </FlatList>
    </View>
  );
  }

  render() {
    const {value} = this.state;
    const data = [this.state.y1, this.state.y2, this.state.y3]
    const fill = 'rgb(134, 65, 244)';
    const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
          <Text
              key={ index }
              x={ x(index) + (bandwidth / 2) }
              y={ y(value) + 15 }
              fontSize={ 14 }
              fill={ 'black' }
              alignmentBaseline={ 'middle' }
              textAnchor={ 'middle' }
          >
              {value}
          </Text>
      ))
  )
    return (
      <Container>
        <CustomHeader title="Báo cáo và điều hành" />
        {/* {this.state.mt_noi_dung.referOrgID ?  */}
        <CommandIdeaBox
        ref={ref => {
            this._ideaBox = ref;
        }}
        itemId={this.state.id}
        referIDSelectSo = {this.state.mt_noi_dung.referOrgID ? this.state.mt_noi_dung.referOrgID : []}
        referUserID = {this.state.mt_noi_dung.referUserID ? this.state.mt_noi_dung.referUserID : []}
        orgID = {this.state.mt_noi_dung.orgID ? this.state.mt_noi_dung.orgID : 0}
        ideaType={COMMAND_TYPE.MUC_TIEU}
        postCallBack={this.postYKienChiDao}
        />
        
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled={Platform.OS == 'ios'}>
        {this.state.isLoading ? (<AppIndicator/>) :
        (
          <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                  <View style={styles.viewtitle}>
                    <View
                      style={{ paddingHorizontal: scale(20), paddingTop: 10 }}>
                      <Text style={[styles.titleText,{fontWeight:'bold',color:'black'}]}>{this.state.mt_noi_dung.noiDung}</Text>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#dfdfdf', borderBottomWidth: 1}}>
                        <Text style={[styles.titleText, {marginTop: 10}]}>Kết quả thực hiện:</Text>
                        <View style={{alignItems: 'flex-end', marginBottom: 5}}>
                          <Text style={{fontSize: scale(60), color: '#e63534'}}>{convertNumber(this.state.mt_noi_dung.totalResultValue)} <Text style={{fontSize: scale(30)}}>{this.state.mt_noi_dung.unit}</Text></Text>
                          <Text>Đạt {convertNumber(this.state.mt_noi_dung.ketQuaHienTai)} %</Text>
                        </View>
                      </View>

                    </View>
                </View>

                {!this.state.idCttk? (
                  <View style={{flex: 1}}>
                  <View
                    style={{
                    width: "100%",
                    flexDirection: "row",
                    height: 3,
                    paddingLeft: scale(20),
                    paddingRight: scale(20),
                    // backgroundColor: "black"
                    }}
                >
                    <View>
                    
                    <Image
                    source={require("../../../assets/images/muctieu/tiendo.png")}
                    style={{
                        width: scale(87),
                        height: verticalScale(61),
                        // marginLeft: -scale(87) / 2 - ( (win.width-scale(40))/(this.getDate()*2) ) +((win.width - scale(40)) *parseInt( this.state.month)) /(this.getDate()),
                        marginLeft: this.getDate()!=0? -scale(87) / 2 - ( (win.width-scale(40))/(this.getDate()*2) ) +((win.width - scale(40)) *parseInt( this.state.month)) /(this.getDate())
                        : 0,
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    resizeMode="contain"
                    />                   
                    </View>
                </View> 
                
                <View style={{flexDirection: "row", height: 30, marginLeft: scale(20), marginRight: scale(20)}}>
                    {this.renderMonth(this.state.ex.slice(0, this.getDate()))}
                </View>

                <View
                    style={{
                    height: 20,
                    backgroundColor: "#d3d3d3",
                    flexDirection: "row",
                    marginLeft: scale(20),
                    marginRight: scale(20)
                    }}
                >
                    <View
                    style={{
                        height: 20,
                        flex: parseInt(this.state.ketQua),
                        backgroundColor: "#6c73ff",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                    <Text style={{color: 'white'}}>{this.state.ketQua>=10?this.state.ketQua+"%":""}</Text>
                    </View>
                    <View
                    style={{
                        backgroundColor: "#c1c1c1",
                        justifyContent: 'center',
                        flex: 100 - parseInt(this.state.ketQua)
                    }}
                    >
                    <Text style={{color: 'white'}}>{(this.state.ketQua<10&this.state.ketQua>0)?this.state.ketQua+"%":""}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, padding: scale(20) }}>
                {this.state.isShowTK3Thang?this.renderThongKe(this.state.ex2.slice(0, this.getDate())): null}
                </View>

                  </View>
                ):(<WebView style={{height: this.state.webheight}}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    source={{uri: "http://smartgov.rikkei.vn:8080/hcdt_cms_web/dashboard/detail/"+this.state.idCttk}}
                    scalesPageToFit={Platform.OS == "android"}
                    onMessage={event => {
                      this.setState({webheight: parseInt(event.nativeEvent.data)});
                    }}
                    javaScriptEnabled={true}
                    injectedJavaScript ={webViewScript}
                    domStorageEnabled={true}
                    renderLoading={this.renderLoadingWebView} startInLoadingState={true}
                  ></WebView>)}

               
                
                
                   <View style={{ marginTop: 10, padding: scale(20) }}>
                    {/* {this.state.isShowTK3Thang?this.renderThongKe(this.state.ex2.slice(0, this.getDate())): null} */}
                    <Text style={{fontSize: scale(26), color: "#333333",fontWeight: '800'}}>Thông tin chi tiết: </Text>
                    {/* Diễn giải: {this.state.dienGiai} */}
                    <Text style={{ fontSize: scale(26), color: "#333333" ,marginTop:5}}>{this.state.mt_noi_dung.dienGiai}</Text>
                    {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Text style={{ fontSize: scale(26), color: "#333333" }}>
                          Đơn vị:{" "}
                          {
                          <Text
                              style={{ fontSize: scale(26), color: "#999999" }}
                          >
                              {this.state.mt_noi_dung.donVis ? (
                              this.state.mt_noi_dung.donVis.join(", ")
                              ) : (
                              <Text />
                              )}
                          </Text>
                          }
                      </Text>
                      
                    </View> */}
                </View>
                </View>
                {this.renderListHorizontal()}
              
              {/* <View style={styles.content}>
                <View style={styles.viewtitle}>
                  <View style={{ padding: scale(20) }}>
                    <Text style={styles.titleText}>PHÂN TÍCH VÀ DỰ BÁO</Text>
                  </View>

                  <ColumnChart/>
                </View>
              </View> */}
            </View>
          </ScrollView>
        )}
            <View
            style={{
                width: "100%",
                height: this.getHeightRatio(win.width, 720, 106),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white"
            }}
            >
            </View>
        </KeyboardAvoidingView>
    
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 1,
    marginRight: 1,
    flex: 1,
    backgroundColor:'#f6f6f6'
  },
  content: {
    // paddingLeft: scale(20),
    backgroundColor: "white",
    marginTop: 5,
    justifyContent: "center"
  },
  contentScrollView: {
    // paddingLeft: scale(20),
    backgroundColor: "white",
    marginTop: 5,
  },
  titleView: {
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: "center"
    // marginLeft: 5
  },
  chuviText: {
    // width: win.width/3,
    fontSize: scale(24),
    color: "#ef743e",
    fontFamily: "Roboto-Regular"
  },
  textTime: {
    // position: "absolute",
    // right: 0,
    fontSize: scale(24),
    color: "#999999",
    fontFamily: "Roboto-Regular",
    marginLeft: 5
  },
  noidungText: {
    color: "#333333",
    fontSize: scale(26),
    fontFamily: "Roboto-Regular"
  },
  bophanthuchienView: {
    marginTop: 10
  },
  bophanthuchienText: {
    color: 999999,
    width: scale(581),
    fontSize: scale(24)
  },
  tailieuView: {
    marginTop: 5,
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: "center"
  },
  tailieuText: {
    color: "#3c7bd9",
    fontSize: scale(24),
    fontFamily: "Roboto-Regular",
    marginLeft: scale(10)
  },
  viewtitle: {
    // borderBottomColor: "gray",
    // borderBottomWidth: 0.4,
    justifyContent: "center"
  },
  titleText: {
    fontSize: scale(32),
    color: "#454545"
  },
  styleList:{
    backgroundColor: "white",
    borderTopWidth:1,
    borderColor:"#f6f6f6",
  },
  viewTextReceive: {
    backgroundColor: "#d23c3b",
    position: "absolute",
    right: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  textReceive: {
    color: "white",
    margin: 5,
    marginLeft: 5,
    marginRight: 5
  },
  viewTextSend: {
    backgroundColor: "#f6f6f6",
    width: "90%",
    flexDirection: "row"
  },
  textSend: {
    margin: 5,
    marginLeft: 10,
    marginRight: 5,
    flex: 9,
    borderRadius: 10,
    color: "black"
  },
  text: {
    fontSize: size24
  },
  textModal: {
    color: "#333333",
    fontSize: scale(26)
  },
  border: {
    borderColor: "#b4b4b4",
    borderWidth: scale(1)
  }
});

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
      borderBottomColor: "#f6f6f6",
      borderBottomWidth: 1,
  }
});
