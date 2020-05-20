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
  KeyboardAvoidingView
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
import Text from "../../../custom-view/text";
import CustomHeader from "../../../user-controls/CustomHeader";
import { BarChart, Grid } from 'react-native-svg-charts';
// import {BarChart} from 'react-native-charts-wrapper';
import {
  scale,
  verticalScale,
  moderateScale
} from "../../../user-controls/utilities/Scale";
import MucTieuAPI from "../../../../services/api-service/muc-tieu-api";
import AppIndicator from "../../../user-controls/AppIndicator";
import CommandIdeaBox, {COMMAND_TYPE} from "../../../user-controls/CommandIdeaBox";
import ProgressListBox from "../../../user-controls/ProgressListBox";
import AttachmentsBox from "../../../user-controls/AttachmentsBox";
import ColumnChart from "../../../user-controls/Charts/ColumnChart";

const win = Dimensions.get("window");
imgTaiLieu = require("../../../../../assets/images/l2-khan-cap/l2-chi-tiet/image_tailieu.png");
imgKhanCap = require("../../../../../assets/images/l2-khan-cap/l2-chi-tiet/image_khancap.png");
const size24 = scale(24);
var size = 3;
var IMG_DOC1 = require("../../../../../assets/images/muctieu/pdf2.png");
var IMG_DOC2 = require("../../../../../assets/images/muctieu/doc2.png");
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




// function getTypeDocument1(mang){
//     alert(JSON.stringify(mang))
//     for(let i=0; i<listType.length; i++){
//         if(listType[i].type==mang.loaiVanBan){
//             // mang.icon= listType[i].source;
//             alert('ahihi');
//         }
//     }
//     // alert(JSON.stringify(mang));
//     return mang;
// }

export default class MucTieuKTLVQLChiTietScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading1: true,
      isLoading2: true,
      id: this.props.navigation.getParam("id"),
      token: this.props.navigation.getParam('token'),
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
      y1: 1,
      y2:1,
      y3:1,
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
    let y1=1, y2=1, y3=1;
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
    MucTieuAPI.getNoiDung(this.state.id, this.state.token).then(res1 => {
      // alert(JSON.stringify( res ));
      if (res1 != null){
        this.setState({ mt_noi_dung: res1, isLoading1: false}  
          , () => {
            if(res.trangThai==2){
              if(this._tientrinh)
              this._tientrinh.updateTrangThai(true);
            }}
          );
        if(this._ideaBox) this._ideaBox.updateOrgRef(res.referOrgID)
      } 
    });

    MucTieuAPI.getKetQuaThucHien(this.state.id).then(res=>{
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
      let listDataYear=[
        {year: 2017, value: 0},
        {year: 2018, value: 0},
        {year: 2019, value: 0}
      ]
      if(res!=null){
        // alert(JSON.stringify(res));
        this.fillData3(res)
        this.setState({
          listKQtheoThang: res,
          ex: this.fillData(res, listDataMonth2),
          ex2: this.fillData2(res, listDataMonth3),
          // ex3: this.fillData3(res, listDataYear),
          ketQua: listDataMonth2[this.getDate()-1].tienDo,
          dienGiai: listDataMonth2[this.getDate()-1].description,
          // ketQua: ex[2].tienDo,
        });
      }
    });
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

  // <Text style={{ fontSize: scale(26) }}> todo
    // formatDonvis(res){
    //   var data  = "";
    //   for(let i = 0; i<res.length;i++){
    //     data += res[i] + ", "
    //   }
    //   data = data.slice(0, -2);
    //   return data;
    // }
  renderMonth(data){
    return data.map((data, i)=>{
      return(
      //   <View style={{flexDirection: "column", flex: 1, height: "100%"}}>
      // <Text>abc</Text>
      <TouchableOpacity style={{height: "100%", flex:1}} onPress={()=>this.setState({dienGiai: data.description, ketQua: data.tienDo, month: data.month})}>
      <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
        <Text>T{i+1}</Text>
      </View>
      </TouchableOpacity>
      //  </View>
      );
    });
  }

//   renderThongKeBaNam(){
//     // const fill = 'red';
//         return (
//             <BarChart
//                 style={{ height: 200 }}
//                 data={ [20, 50, 90] }
//                 svg={{fill}}
//                 contentInset={{ top: 30, bottom: 30 }}
//             >
//                 <Grid/>
//             </BarChart>
//         )
//   }

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
        <CustomHeader title="Nội dung chi tiết" />
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
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                {/* <View style={styles.viewtitle}> */}
                <View
                    style={{
                    height: verticalScale(66),
                    paddingLeft: scale(20),
                    justifyContent: 'center',
                    borderBottomColor: "gray",
                    borderBottomWidth: 0.4,
                    justifyContent: "center"
                    }}
                >
                    <Text style={styles.titleText}>CHỈ TIÊU</Text>
                </View>
                {/* </View> */}
                <View style={{ padding: scale(20) }}>
                    <Text style={{ fontSize: scale(26) }}>
                    {this.state.mt_noi_dung.noiDung}
                    </Text>
                </View>
                </View>

                <View style={styles.content}>
                <View style={styles.viewtitle}>
                    <View
                    style={{ height: verticalScale(66), paddingLeft: scale(20), paddingTop: 10 }}>
                    <Text style={styles.titleText}>KẾT QUẢ THỰC HIỆN</Text>
                    </View>
                </View>

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
                    {/* <ImageBackground
                    source={require("../../../assets/images/muctieu/month.png")}
                    style={{ width: "100%", height: scale(25) }}
                    resizeMode="cover"
                    > */}
                    <View>
                    
                    <Image
                    source={require("../../../../../assets/images/muctieu/tiendo.png")}
                    style={{
                        width: scale(87),
                        height: verticalScale(61),
                        // marginLeft: -scale(87) / 2 - ( (win.width-scale(40))/(this.getDate()*2) ) +((win.width - scale(40)) *parseInt( this.state.month)) /(this.getDate()),
                        marginLeft: -scale(87) / 2 - ( (win.width-scale(40))/(this.state.ex.slice(0, this.getDate()).length*2) ) +((win.width - scale(40)) *parseInt( this.state.month)) /(this.state.ex.slice(0, this.getDate()).length),
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    resizeMode="contain"
                    />
                    
                    {/* </Image> */}
                    {/* <Text style={{ fontSize: scale(26) }}>
                        X{this.state.month}
                    </Text> */}
                    </View>
                    {/* </ImageBackground> */}
                </View>
                <View style={{flexDirection: "row", height: 30, marginLeft: scale(20), marginRight: scale(20)}}>
                    {/* {this.renderMonth(this.state.listKQtheoThang)} */}
                    {this.renderMonth(this.state.ex.slice(0, this.getDate()))}
                </View>

                <View
                    style={{
                    height: 15,
                    backgroundColor: "#d3d3d3",
                    flexDirection: "row",
                    marginLeft: scale(20),
                    marginRight: scale(20)
                    }}
                >
                    <View
                    style={{
                        height: 15,
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
                   
                    <Text style={{fontSize: scale(26), color: "#333333",fontFamily:'Roboto-Bold'}}>Thông tin chi tiết: </Text>
                    {/* Diễn giải: {this.state.dienGiai} */}
                    <Text style={{ fontSize: scale(26), color: "#333333" ,marginTop:5}}>{this.state.dienGiai}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
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
                    {/* <Text style={{ fontSize: scale(26) }}>{this.formatDonvis(this.state.mt_noi_dung.donVis)}</Text> */}
                    </View>
                </View>
                </View>
                
                <View style={styles.content}>
                <View style={styles.viewtitle}>
                    <View
                    style={{ height: verticalScale(66), paddingLeft: scale(20), paddingTop: 10 }}>
                    <Text style={styles.titleText}>THỐNG KÊ THEO THÁNG</Text>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    // height: 200,
                    paddingLeft: scale(20),
                    paddingRight: scale(20),
                    marginBottom: scale(20)
                    // backgroundColor: "black"
                    }}>
                    {this.renderThongKe(this.state.ex2)}
                </View>
                </View>

                <View style={styles.content}>
                <View style={styles.viewtitle}>
                    <View
                    style={{ height: verticalScale(66), paddingLeft: scale(20), paddingTop: 10 }}>
                    <Text style={styles.titleText}>SỰ PHÁT TRIỂN CÁC NĂM GẦN ĐÂY</Text>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    // height: 200,
                    paddingLeft: scale(20),
                    paddingRight: scale(20),
                    marginBottom: scale(20)
                    // backgroundColor: "black"
                    }}>
                    {/* {this.renderThongKeBaNam()} */}
                    <View style={{flex: 1, width: "100%"}}>
                    {/* {this.state.y1 != 0 && this.state.y3 != 0 && this.state.y3 != 0 ? 
                    ( */}
                    <View style={{flexDirection: "row", height: 30, marginLeft: scale(20), marginRight: scale(20), justifyContent: "space-between", marginBottom: -30, marginTop: 10}}>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{}}>{this.state.y1}</Text>
                        </View>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{}}>{this.state.y2}</Text>
                        </View>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{}}>{this.state.y3}</Text>
                        </View>
                    </View>


                    <BarChart
                        style={{ height: 200 }}
                        data={ [this.state.y1, this.state.y2, this.state.y3] }
                        svg={{fill}}
                        contentInset={{ top: 30, bottom: 30 }}
                        >
                        <Grid/>
                        {/* <Labels/> */}
                    </BarChart>
                    {/* ): <View />} */}

                    <View style={{flexDirection: "row", marginTop: 10, height: 30, marginLeft: scale(20), marginRight: scale(20), justifyContent: "space-between"}}>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>2017</Text>
                        </View>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>2018</Text>
                        </View>
                        <View style={{ height: 20, backgroundColor: "transparent", alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>2019</Text>
                        </View>
                    </View>

                    </View>
                </View>
                </View>
                

                <AttachmentsBox itemId={this.state.id} callBackFunc={()=>{}}></AttachmentsBox>

                <View style={styles.content}>
                {/* <View style={styles.viewtitle}>
                    <View style={{ padding: scale(20) }}>
                    <Text style={styles.titleText}>PHÂN TÍCH VÀ DỰ BÁO</Text>
                    </View>
                    <ColumnChart/> */}

                    {/* <View style={{ backgroundColor:'white', height: verticalScale(550), width: '100%', flex: 1}}> */}
                    {/* <BarChart

                    style={{flex: 1}}
                    xAxis={this.state.xAxis}
                    data={this.state.chartData}
                    legend={this.state.legend}
                    drawValueAboveBar={false}
                    marker={this.state.charMarker}
                    chartDescription={{text:"Thông kê và dự báo số lượng học sinh, giáo viên, lớp học"}}
                    /> */}
                    {/* </View> */}

                    {/* <View style={{ padding: scale(20) }}>
                    <Text>Sự tăng trưởng GRDP các năm trước</Text>
                    </View> */}
                {/* </View> */}
                {/* <Image
                    source={require("./images/column-chart.png")}
                    style={{ width: win.width }}
                /> */}
                </View>

                <View style={styles.content}>
                <ProgressListBox itemId={this.state.id} ref = {ref=>{this._tientrinh = ref}}></ProgressListBox>
                </View>
            </View>
            </ScrollView>
            {/* <View
            style={{
                width: "100%",
                height: this.getHeightRatio(win.width, 720, 106),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white"
            }}
            >
            <TouchableOpacity
                style={{
                width: win.width * 0.947,
                height: this.getHeightRatio(win.width * 0.947, 682, 72),
                backgroundColor: "#3d5f8f",
                justifyContent: "center",
                alignItems: "center"
                }}
                onPress={() => {
                if (this._ideaBox) this._ideaBox.show();
                }}
            >
                <View style={{ flexDirection: "row", margin: 5 }}>
                <Text style={{ fontSize: scale(34), color: "white" }}>
                    +{" "}
                </Text>
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Text
                    style={{
                        color: "white",
                        fontSize: scale(28),
                        fontFamily: "Roboto-Medium"
                    }}
                    >
                    {" "}
                    Ý KIẾN CHỈ ĐẠO
                    </Text>
                </View>
                </View>
            </TouchableOpacity>
            </View> */}
        </KeyboardAvoidingView>
        {/* <Footer style={{ height: 60, backgroundColor: 'transparent' }}>
                    <View>
                        <CustomTabs2 active='0'></CustomTabs2>
                    </View>
                </Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 1,
    marginRight: 1,
    flex: 1
  },
  content: {
    // paddingLeft: scale(20),
    backgroundColor: "white",
    marginTop: scale(16),
    justifyContent: "center"
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
    fontSize: scale(26),
    color: "black"
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
