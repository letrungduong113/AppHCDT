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
import Text from "../custom-view/text";
import CustomHeader from "../user-controls/CustomHeader";
import { BarChart, Grid } from 'react-native-svg-charts';
// import {BarChart} from 'react-native-charts-wrapper';
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from "../../services/api-service/linh-vuc-quan-ly-api";
import AppIndicator from "../user-controls/AppIndicator";
import CommandIdeaBox, {COMMAND_TYPE} from "../user-controls/CommandIdeaBox";
import ProgressListBox from "../user-controls/ProgressListBox";
import AttachmentsBox from "../user-controls/AttachmentsBox";

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

export default class ChiTietDonVi extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading1: true,
      isLoading2: true,
      id: this.props.navigation.getParam("id"),
      token: this.props.navigation.getParam("token"),
      songanh: this.props.navigation.getParam("songanh"),
      value: 10,
      isLoading: true,
      dienGiai: "",
      ketQua: 50,
      month:this.getDate(),
      mt_noi_dung: {
        noiDung: "Tốc độ tăng trưởng kinh tế (theo GRDP) từ 7,5-8,0% , trong đó: nông - lâm - ngư nghiệp từ 4,0-4,5%; công nghiệp - xây dựng từ 10,5-11,0%; dịch vụ từ 7,5-8,0%.",
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
      listChiTieu: [
        // {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        // {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        // {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        // {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
        
    ],
    listBaoCao: [
      {id: 0, title: "Nông sản tăng", giaTri: "3,4%", delta: "tang 2%"},
      {id: 0, title: "Công nghiệp xây dựng tăng", giaTri: "9,2%", delta: "tang 2%"},
      {id: 0, title: "Công nghiệp khai khoáng", giaTri: "6,5%", delta: "tang 2%"},
      {id: 0, title: "Du lịch", giaTri: "10,3-10,5%", delta: "tang 2%"},
      {id: 0, title: "GDRP tăng trưởng", giaTri: "10%", delta: "tang 2%"},
      {id: 0, title: "Nội thu địa hạt", giaTri: "30.369 tỷ đồng", delta: "tang 2%"},
      
    ],
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
    LinhVucQuanLyAPI.getDanhsachMucTieu(1, 100, this.state.token,1).then((res)=>{
    if(res!=null){
      this.setState({listChiTieu: res, isLoading2: false});
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

renderItem2(data){
  return(
      <FlatList
          data= {data}
          renderItem={({item}) => 
                  // <TouchableOpacity onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet', {id: item.id})} >
                      <View style={styles2.itemts} >
                          <View style={{ width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
                              <Image 
                              source={item.icon?item.icon: require('../../../assets/images/muctieu/default.png')}
                              // source={require("../../../images/logo/mt_home.png")}
                                  style={{ width: "70%", height:"70%", resizeMode: "contain",  }}
                              />
                          </View>
                          <View style={{ justifyContent: "center", width: win.width-scale(102) }}>
                              <Text numberOfLines={1} style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{item.noiDung?item.noiDung:""}</Text>
                              <View style={{ flexDirection: "row" }}>
                                  {/* <View style={{width: win.width-scale(250)}}> */}
                                  <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red" }}>{item.giaTriKeHoach}</Text>
                                  {/* <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red", marginLeft: 2 }}>{item.donVi?item.donVi:""}</Text> */}
                                  {/* </View> */}
                                  {/* <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
                                      <Control ratio={item.tiendo?item.tiendo:0} color= {item.tiendo >= 66 ? '#32b81b': (item.tiendo >= 33 ? '#ffc835': '#da3838')}/>
                                  </View> */}
                              </View>

                          </View>
                          {/* <View style={{ position: "absolute", right: 0, width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center", }}>
                              <Icon name="ios-arrow-forward" style={{ color: "#d7d7d7" }} />
                          </View> */}
                      </View>
                  // </TouchableOpacity>
              }
      />
  );
}
_renderFlatList = ({item}) => (
  // <TouchableOpacity>
  <View
    key={item.id}
    style={{
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      backgroundColor: "white",
      width: scale(320),
      marginRight: scale(20),
      height: scale(148),
      // marginTop: scale(8),
      marginBottom: scale(20),
      borderColor: 'lightgrey', borderWidth: 0.5
    }}
  >
    <View style={{ margin: 10, flexDirection: "row", flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", width: 32, height: 32, marginRight: 3 }}>
        <Image style={{ width: scale(37), height: scale(37), resizeMode: "contain" }} source={require('../../../assets/images/muctieu/default.png')} />
      </View>
      <View style={{ width: win.width / 3, height: 200, marginLeft: 5, flex: 4 }}>
        <Text style={{ fontSize: scale(24), color: "#666666" }} numberOfLines={3}>{item.title}</Text>
        <Text style={{ color: "#da3838", fontSize: scale(22) }} numberOfLines={1}>
          {item.giaTri}
        </Text>
      </View>
    </View>
    <View style={{ margin: 10, marginTop: 40, alignItems: "flex-start", justifyContent: "flex-start"}}>
      <Text style={{ fontSize: scale(22), color: "#999999" }}>{item.delta}</Text>
    </View>
  </View>
// </TouchableOpacity>
)

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
        {
          !this.state.songanh ? (<CustomHeader title="Nội dung chi tiết" />) : (<View />)
        }
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled={Platform.OS == 'ios'}>
            <ScrollView>
            <View style={styles.container}>
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
                    <Text style={styles.titleText}>CHỈ TIÊU CỦA SỞ</Text>
                </View>
                {/* </View> */}
                <View style={{ padding: scale(20), borderBottomColor: "gray",
                    borderBottomWidth: 0.4, }}>
                    <Text style={{ fontSize: scale(26) }}>
                    {this.state.mt_noi_dung.noiDung}
                    </Text>
                </View>
                {this.renderItem2(this.state.listChiTieu)}
            </View>
            </ScrollView>
          
        </KeyboardAvoidingView>

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
