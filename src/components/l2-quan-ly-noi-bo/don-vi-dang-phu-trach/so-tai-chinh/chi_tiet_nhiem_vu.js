import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../../user-controls/utilities/Scale";
import { connect } from "react-redux";
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
  Footer,
  View,
  Picker
} from "native-base";
import moment from "moment"
import Text from "../../../custom-view/text";
import LinhVucQuanLyAPI from "../../../../services/api-service/linh-vuc-quan-ly-api";
import CustomHeader from "../../../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../../../user-controls/AppIndicator";
import CommandIdeaBox, {COMMAND_TYPE} from "../../../user-controls/CommandIdeaBox";
import AttachmentsBox from "../../../user-controls/AttachmentsBox";
import {convertDate} from "../../../user-controls/utilities/converter";

const win = Dimensions.get("window");
var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
var sizeImg = scale(60);

export default class NhiemVuChiTietLVQLScreen extends Component {
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
      isLoadMore:false,
      defaultDsCacSo: [],
      text: "",
      date: "",
      isLoading: true,
      modalVisible: false,
      taskID: this.props.navigation.getParam("task_ID"),
      task_type: this.props.navigation.getParam("task_type"),
      trangThaiId: this.props.navigation.getParam("trangThaiId"),
      tokenNow: this.props.navigation.getParam("token"),
      data: {},
      dsCacSo: [],
      data_picker: 1,
      selectedSo: {},
      modalVisible_Item: false,
      textBoPhanThucHien: "Bộ phận thực hiện",
      checkboxThuocNhomViecGap: true,
      uploadedFiles: [],
      progressList: [],
      disableButton: false,
      progressSize:0,
      offset:1,
      textCommit:''
    };
  }

  getThemBoi(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "1"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }

  formatBoPhanThucHien(value){
    if(value==null||value==''){
      return ""
    }else{
      let textFormat= ''
      var arr = value.split(";");
      for(let i = 0;i<arr.length-1;i++){
        arr2 = arr[i].split(",")
        textFormat += arr2[0] + ", "
      }
      textFormat = textFormat.slice(0,-2)
      return textFormat;
    }
  }

  getNoiXuLy(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "2"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }
  getNoiLienQuan(value){
    if(value==null||value==''){
      return ""
    }else{
      var arr = value.split(";");
      for(let i = 0;i<arr.length;i++){
        if(arr[i].slice(-1) == "3"){
          arr[i] = arr[i].slice(0,-2)
          return arr[i];
        }
      }
      return ""
    }
  }
  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  getColorState(color) {
    switch (color) {
      case "2264":
        return "#449944";
      default:
        return "#ce1e17";
    }
  }

  componentDidMount() {
    if (this.state.task_type) {
      LinhVucQuanLyAPI.getNhiemVuNhanChiTiet(this.state.taskID, 3, this.state.tokenNow).then(res => {
        if (res != null) {
            res.themBoi = this.getThemBoi(res.referInfo)
            res.noiXuLy = this.getNoiXuLy(res.referInfo)
            res.noiLienQuan = this.getNoiLienQuan(res.referInfo)
          this.setState({
            data: res,
            isLoading: false,
          });
        }
      });
    } else {
      LinhVucQuanLyAPI.getNhiemVuGiaoChiTiet(this.state.taskID, 3, this.state.tokenNow).then(res => {
        if (res != null) {
          res.themBoi = this.getThemBoi(res.referInfo)
          res.noiXuLy = this.getNoiXuLy(res.referInfo)
          res.noiLienQuan = this.getNoiLienQuan(res.referInfo)
          this.setState({
            data: res,
            isLoading: false,
          });
        }
      });
    }
    // alert(this.state.taskID)
    LinhVucQuanLyAPI.getTientrinhHaveToken(this.state.taskID, 1, 30, this.state.tokenNow).then(res2 => {
      // alert(res2)
      // alert(this.state.taskID)
      if (res2 != null) {
        let canLoad = false;
        if (res2.size > 3) canLoad = true;
        this.setState({ progressList: res2.commentEntity, isLoadMore: canLoad, progressSize: res2.size, offset:1 });
        // alert(this.state.progressList.length)
      }
    });
    if (this.state.trangThaiId == 1121) {
      this.setState({
        disableButton: true
      })
    }
  }

  postYKienChiDao =async(response)=> {
    if(response && response.message =='SUCCESS'){
      LinhVucQuanLyAPI.getTientrinhHaveToken(this.state.taskID, 1, 200, this.state.tokenNow).then(res2 => {
        // alert(JSON.stringify(res2))
        if (res2 != null) {
          let canLoad = false;
          if (res2.size > 3) canLoad = true;
          this.setState({ progressList: res2.commentEntity, isLoadMore: canLoad, progressSize: res2.size , offset:1 });
        }
      });
    }
    return response;
  }

  getType(type) {
    switch (type) {
      case "text/plain":
        return require("../../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-doc.png");
      default:
        return require("../../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-pdf.png");
    }
  }

  listItemProgess(value) {
    return value.map((data, i) => {
      return (
        <View style = {{flexDirection:'column'}}>
          <View style={{ marginTop: 10, flexDirection: "row", width: "100%" }}>
          <View style={{ flex: 1}}>
            <Image
              style={{
                width: sizeImg,
                height: sizeImg
              }}
              source={data.icon}
            />
          </View>
          <View style={{ flex: 8.5, backgroundColor: 'white' , flexDirection:'column'}}>
            <View>
            <View
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 5
              }}
            >
              <View
                style={{ padding: 10, paddingBottom: 0 }}
              >
                <View
                  style={[styles.titleView, { flexDirection: "row" }]}
                >
                  <Text line={1} style={styles.chuviText}>
                    {data.fullName+", "+ data.positionCode}
                  </Text>
                  <Text style={styles.textTime}>{data.createTime ? data.createTime.substring(0, 10) : ''}</Text>
                  {data.status == 1  ? ( //todo là việc gấp
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        source={imgKhanCap}
                        style={{ width: scale(30), height: scale(30) }}
                      />
                    </View>
                  ) : (
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        style={{ width: scale(30), height: scale(30) }}
                      />
                    </View>
                  )}
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={styles.noidungText}>{data.contents}</Text>
                </View>
                <Text style={styles.bophanthuchienView}>
                    <Text style={styles.bophanthuchienText}>
                      Bộ phận thực hiện:{" "}
                    </Text>
                  <Text style={{ fontSize: scale(24), color: "#333333" }}>
                    {this.formatBoPhanThucHien(data.referOrgName)}
                  </Text>
                </Text>

                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: FONT_SIZE_24,
                      color: "#999999"
                    }}
                  >
                    Thời hạn:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONT_SIZE_24,
                      color: "#333333",
                      marginRight: 10
                    }}
                  >
                    {data.createTime?data.createTime.substring(0,10) : ''}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    width: "100%",
                    backgroundColor: "#f5f5f5"
                  }}
                >
                  {/* {this.renderFileDinhkem(data.fileDinhKems)} */}
                </View>
                <View style={{ height: scale(20) }} />
              </View>
                </View>
              </View>
              {this.danhsachTrochuyenNho(data.lstChildData)}
              {data.lstChildData.length>0 ? 
              <TextInput
                underlineColorAndroid="transparent"
                value={data.text}
                onChangeText={text => {
                  const progressList = this.state.progressList;
                  progressList[i].text = text;
                  this.setState({ progressList });
                }} returnKeyType="done" onSubmitEditing={() => {
                  body = {
                    parentCommentId: data.commentId,
                    newsId: this.state.taskID,
                    deadLine: moment().format("DD/MM/YYYY"),
                    referOrgID: [],
                    contents: this.state.progressList[i].text,
                    isSerious: 0,
                    attachedFileIDs: []
                  };
                  CommonAPI.postChiDao(body).then(res => {
                    this.setState({ textCommit: "" })
                    if (res != null) {
                      LinhVucQuanLyAPI.getTientrinhHaveToken(this.state.taskID, 1, 200, this.state.tokenNow).then(res2 => {
                        // alert(JSON.stringify(res2))
                        if (res2 != null) {
                          let canLoad = false;
                          if (res2.size > 3) canLoad = true;
                          this.setState({ progressList: res2.commentEntity, isLoadMore: canLoad, progressSize: res2.size, offset: 1 });
                        }
                      });
                    }
                  })
                }} placeholder='Viết trả lời' style={{ marginTop: 5, paddingLeft: 15, borderColor: '#d7d7d7', borderWidth: 1, width: '100%', height: scale(70), backgroundColor: 'white', flexDirection: 'row', borderRadius: scale(70) }}>
              </TextInput> : null}
            </View>
          </View>
          {data.lstChildData.length>0 ? null : <TextInput value={data.text}
          underlineColorAndroid="transparent"
           onChangeText={text => {
            const progressList = this.state.progressList;
            progressList[i].text = text;
            this.setState({ progressList });
          }} returnKeyType="done" onSubmitEditing={() => {
            body = {
              parentCommentId: data.commentId,
              newsId: this.state.taskID,
              deadLine: moment().format("DD/MM/YYYY"),
              referOrgID: [],
              contents: this.state.progressList[i].text,
              isSerious: 0,
              attachedFileIDs: []
            };
            CommonAPI.postChiDao(body).then(res => {
              this.setState({ textCommit: "" })
              if (res != null) {
                // alert(JSON.stringify(res))
                LinhVucQuanLyAPI.getTientrinhHaveToken(this.state.taskID, 1, 200, this.state.tokenNow).then(res2 => {
                  // alert(JSON.stringify(res2))
                  if (res2 != null) {
                    let canLoad = false;
                        if (res2.size > 3) canLoad = true;
                        this.setState({ progressList: res2.commentEntity, isLoadMore: canLoad, progressSize: res2.size, offset: 1 });
                      }
                    });
                  }
                })
        }} placeholder= 'Viết trả lời' style = {{ marginTop:5, paddingLeft:15, borderColor:'#d7d7d7',borderWidth:1, width:'100%' , height:scale(70) ,backgroundColor:'white', flexDirection:'row', borderRadius:scale(70) }}>
                </TextInput>}
        </View>
      );
    });
  }

  danhsachTrochuyenNho(value){
    if(value==null) return (<View></View>);
    return value.map((data, i) => {
      return (
        <View style = {{backgroundColor:'white', width:'100%', flexDirection:'row',marginTop:10}}>
            <View style = {{flex:1}}>
            <Image
              style={{
                width: scale(44),
                height: scale(44)
              }}
              source={data.icon}
            />
            </View>
            <View style = {{
              padding:10,
                flex:8.5 ,
                flexDirection:'column',
                backgroundColor: "#f5f5f5",
                borderRadius: 5}}>
                <View style = {{flexDirection:'row'}}>
                  <Text style = {styles.chuviText}>{data.fullName}</Text>
                  <Text style={styles.textTime}>{data.createTime?data.createTime.substring(0,10) : ''}</Text>
                  {data.status == 1 ? ( //todo là việc gấp
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        source={imgKhanCap}
                        style={{ width: scale(30), height: scale(30) }}
                      />
                    </View>
                  ) : (
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        style={{ width: scale(30), height: scale(30) }}
                      />
                    </View>
                  )}
                </View>
                <Text style={styles.noidungText}>
                {data.contents}
                </Text>
            </View>
        </View>
      )
    })
  }

  renderFileDinhkem(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "#f5f5f5",
            marginTop: 5,
            flexDirection: "row",
            width: "100%",
            alignItems: "center"
          }}
          onPress={() => {}}
        >
          <Image
            style={{
              width: scale(24),
              height: scale(24),
              marginRight: 5,
            }}
            source={require("../../../../../assets/images/nhiem-vu/nhiem_vu_chi_tiet_link.png")}
          />
          <Text style={{ color: "#3c7bd9", fontSize: FONT_SIZE_24 }}>
            {data.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }
  renderContent() {
    
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
    } else {
      data = this.state.data;
      return (
        <View>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: "white",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ color: "#333333", fontSize: scale(32) }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={{
                flexDirection: "row", borderRightColor: "lightgrey",
                borderRightWidth: 1
              }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    color: "#666666",
                    marginRight: 5,

                  }}
                >
                  Người giao:&nbsp;</Text>
                <Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    color: "#666666",
                    marginRight:5
                  }}
                >
                  {data.themBoi}
                </Text>
              </View>

              <Text style={{ marginLeft:5,fontSize: FONT_SIZE_24, color: "#666666", marginRight:5 }}>
                Ngày giao:&nbsp;{data.createTime?data.createTime.substring(0,10) : ''}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 5
                }}
              >
                Đơn vị thực hiện:&nbsp;</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 10
                }}
              >
                {data.noiXuLy}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignSelf: "baseline"
              }}
            >
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 5
                }}
              >
                Đơn vị liên quan:&nbsp;<Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 24
                }}
              >
                {data.noiLienQuan}
              </Text></Text>
              
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666"
                }}
              >
                Thời hạn:&nbsp;</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666",
                  marginRight: 10
                }}
              >
                {convertDate(data.publishTime)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: "#666666"
                }}
              >
                Tình trạng:{" "}</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE_24,
                  color: this.getColorState(data.trangThai)
                }}
              >
                {data.tenTrangThai}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: "white",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                padding: 5,
                color: "#454545",
                fontSize: FONT_SIZE_MAIN,
                borderBottomColor: "#f6f6f6",
                borderBottomWidth: 1
              }}
            >
              NỘI DUNG
            </Text>
            <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#666666", marginTop: 10 }}>
              {data.contents}
            </Text>
          </View>

          <AttachmentsBox itemId={this.state.taskID} callBackFunc={()=>{}}></AttachmentsBox>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: "white",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                padding: 5,
                color: "#454545",
                fontSize: FONT_SIZE_MAIN,
                borderBottomColor: "#f6f6f6",
                borderBottomWidth: 1
              }}
            >
              TIẾN TRÌNH THỰC HIỆN
            </Text>
            <View style={styles.styleList}>
              {this.listItemProgess(this.state.progressList)}
            </View>
            {this.state.progressList.length > 0 ? (
              <TouchableOpacity
                style={{ marginTop: 20, marginBottom: 10 }}
                onPress={() => {
                  this.setState({
                    isLoading: true
                  });
                  offsetValue = this.state.offset;
                  offsetValue++;
                  LinhVucQuanLyAPI.getTientrinhHaveToken(
                    this.state.taskID,
                    offsetValue,
                    200, this.state.tokenNow
                  ).then(res => {
                
                    list = this.state.progressList;
                    for (let i = 0; i < res.commentEntity.length; i++) {
                      list.push(res.commentEntity[i]);
                    }
                    let canLoad=false;
                    if(this.state.progressList.length< this.state.progressSize) canLoad = true;
                    this.setState({
                      isLoading: false,
                      progressList: list,
                      isLoadMore: canLoad, offset: offsetValue
                    });
                  });
                }}
              >
                {this.state.isLoadMore ?  <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
                  {" "}
                  Xem các tiến trình trước...
                </Text>: null}                
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
      );
    }
  }
  render() {
    var data = this.state.data;
    return (
      <Container style={styles.container}>
        <CommandIdeaBox 
          ref = {ref => {this._ideaBox = ref}} 
          itemId={this.state.taskID} ideaType={COMMAND_TYPE.NHIEM_VU}
          postCallBack = {this.postYKienChiDao}
          />
        <CustomHeader title="Nội dung chi tiết" />
        <Content style={{ backgroundColor: "#efefef" }}>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}