import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {convertTime, convertDate} from "../../user-controls/utilities/converter";
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
import Text from "../../custom-view/text";
import styles from "./styles";
import CommonAPI from "../../../services/api-service/common-api";

const win = Dimensions.get("window");
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var sizeImg = scale(60);


export default class ProgressListBox extends Component {
    static propTypes = {
        itemId: PropTypes.string,
        callBackFunc: PropTypes.func,
      };
    
    constructor(props) {
        super(props);
        this.state = {
            taskID: this.props.itemId,
            isLoadMore:false,
            isLoading: true,
            progressList: [],
            disableButton: false,
            progressSize:0,
            offset:1,
            textCommit:'',
            trangThai:false
        };
    }
    
    updateTrangThai(value){
      this.setState({trangThai: value})
    }

    componentDidMount() {
        // // alert(this.state.taskID)
        // CommonAPI.getTientrinh(this.state.taskID, 1, 100).then(res2 => {
        //     // alert(res2)
        //     // alert(this.state.taskID)
        //     if (res2 != null) {
        //       this.getAttachmentsOfComment(res2.commentEntity);
        //       this.setState({ progressList: res2.commentEntity, isLoadMore: res2.size > 3, progressSize: res2.size, offset:1 });
        //     }
        // });
        // if (this.state.trangThaiId == 1121) {
        //     this.setState({
        //     disableButton: true
        //     })
        // }
        this.refreshData();
    }

    async getAttachmentsOfComment(comments) {
      if (comments && comments.length) {
        for (i = 0; i< comments.length; i++) {
          fileList = await CommonAPI.getDsAttachmentsOfComment(this.state.taskID, comments[i].commentId);
          if (fileList) {
            comments[i].fileDinhKems = fileList;  
            console.log("DOWNLOAD COMPLETED!!!")
          }
        }
      }
    }


    async refreshData() {
        // alert(this.state.taskID)
      res2 = await CommonAPI.getTientrinh(this.state.taskID, 1, 100);
      if (res2 != null) {
        // alert(JSON.stringify(res2))
        await this.getAttachmentsOfComment(res2.commentEntity);
        this.setState({ progressList: res2.commentEntity, isLoadMore: res2.size > 3, progressSize: res2.size, offset:1 });
      }
      if (this.state.trangThaiId == 1121) {
          this.setState({
          disableButton: true
          })
      }
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
      }
      // }else{
      //   let textFormat= ''
      //   var arr = value.split(";");
      //   for(let i = 0;i<arr.length-1;i++){
      //     arr2 = arr[i].split(",")
      //     textFormat += arr2[0] + ", "
      //   }
      //   textFormat = textFormat.slice(0,-2)

        value = value.replace("\r\n","")
        value = value.replace("\r\n\r\n","")
        value = value.replace("\r\n\r\n","")
        return value;
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
    
    postReplyComment(parentComment, index) {
      
      let noidung = this.state.progressList[index].text.trim();
      if(noidung =="") {
        // alert("nội dung trống")
        // list = this.state.progressList;
        // list[index].text = "";
        // this.setState({progressList:list})
        return;
      }
      body = {
        parentCommentId: parentComment.commentId,
        newsId: this.state.taskID,
        deadLine: moment().format("DD/MM/YYYY"),
        referOrgID: parentComment.lstReferOrgID ? parentComment.lstReferOrgID : [],
        referUserID:parentComment.lstReferUserID ? parentComment.lstReferUserID:[],
        orgID: parentComment.orgID?parentComment.orgID:0,
        contents: noidung,
        isSerious: 0,
        attachedFileIDs: []
      };
      CommonAPI.postChiDao(body).then(res => {
        // alert(JSON.stringify(body))
        this.setState({ textCommit: "" })
        if (res != null) {
          this.refreshData();
          this.updateTrangThai(false)
        }
      })
    }

    renderFileDinhkem(value) {
      if (value) {
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
                source={require("../../../../assets/images/user-controls/icon_dinhkiem2.png")}
              />
              <Text style={{ color: "#3c7bd9", fontSize: FONT_SIZE_24 }}>
                {data.fileName}
              </Text>
            </TouchableOpacity>
          );
        });
      }
      else {
        return (<View/>)
      }
      
    }
  listItemProgess(value) {
    return value.map((data, i) => {
      return (

        <View style={{ flexDirection: 'column' }}>
          <View style={{ marginTop: 10, flexDirection: "row", width: "100%" }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  borderRadius:sizeImg/2,
                  width: sizeImg ,
                  height: sizeImg
                }}
                source={data.icon}
              />
            </View>
            <View style={{ flex: 8.5, backgroundColor: 'white', flexDirection: 'column' }}>
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
                        {data.positionCode + " " + data.fullName }
                      </Text>
                      
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
                    <Text style={styles.textTime}>{convertTime(data.createTime)}</Text>
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
                        {convertDate(data.deadLine)}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        width: "100%",
                        backgroundColor: "#f5f5f5"
                      }}
                    >
                      {this.renderFileDinhkem(data.fileDinhKems)}
                    </View>
                    <View style={{ height: scale(20) }} />
                  </View>
                </View>
              </View>
              {this.danhsachTrochuyenNho(data.lstChildData)}
              {data.lstChildData.length > 0 ?
                <View style={{ flexDirection: 'row' }}>
                  <View style={{
                    flex: 1, width: sizeImg,
                    height: sizeImg
                  }}>
                  </View>
                  <View style={{ flex: 8.5 }}>
                    <TextInput value={data.text}
                      underlineColorAndroid="transparent"
                      onChangeText={text => {
                        const progressList = this.state.progressList;
                        progressList[i].text = text;
                        this.setState({ progressList });
                      }}
                      placeholder='Viết trả lời' style={{paddingRight:scale(95),marginTop: 5, paddingLeft: 15, borderColor: '#d7d7d7', borderWidth: 1, width: '100%', height: verticalScale(70), backgroundColor: 'white', flexDirection: 'row', borderRadius: scale(70) }}>
                    </TextInput>
                    {this.state.progressList[i].text ? <TouchableOpacity style={{
                      position: "absolute",
                      right: 0,
                      alignItems:'center',
                      justifyContent:'center',
                      marginRight: 15,
                      top:5,
                      width: scale(80), height: verticalScale(70)
                    }} onPress={() => {
                      Keyboard.dismiss
                      this.setState({textCommit: "" })
                      this.postReplyComment(data, i)}}>
                      <Image style={{
                        // position: "absolute",
                        // right: 0,
                        width: scale(44), height: verticalScale(40)
                      }} source={require('../../../../assets/images/default/send.png')}></Image>
                    </TouchableOpacity> : null}
                  </View>
                </View> : null
              }
            </View>
          </View>
          {data.lstChildData.length > 0 ? null :
            <View style={{ flexDirection: 'row' }}>
              <View style={{
                flex: 1, width: sizeImg,
                height: sizeImg
              }}>
              </View>
              <View style={{ flex: 8.5 }}>
                <TextInput value={data.text}
                  underlineColorAndroid="transparent"
                  onChangeText={text => {
                    const progressList = this.state.progressList;
                    progressList[i].text = text;
                    this.setState({ progressList });
                  }}
                  placeholder='Viết trả lời' style={{ paddingRight : scale(95),marginTop: 5, paddingLeft: 15, borderColor: '#d7d7d7', borderWidth: 1, width: '100%', height: verticalScale(70), backgroundColor: 'white', flexDirection: 'row', borderRadius: scale(70) }}>
                </TextInput>
                {this.state.progressList[i].text ? <TouchableOpacity style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  alignItems:'center',
                  justifyContent:'center',
                  marginRight: 15,
                  width: scale(80), height: verticalScale(70)
                }} onPress={() => {
                  Keyboard.dismiss
                  this.setState({textCommit: ""})
                   this.postReplyComment(data,i) }}>
                  <Image style={{
                    width: scale(44), height: verticalScale(40)
                  }} source={require('../../../../assets/images/default/send.png')}></Image>
                </TouchableOpacity> : null}
              </View>
            </View>
          }
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
                    borderRadius:scale(22),
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
                    <Text style={styles.textTime}>{convertTime(data.createTime)}</Text>
                    <Text style={styles.noidungText}>
                    {data.contents}
                    </Text>
                </View>
            </View>
          )
        })
    }

    render() {
        return (
            <View
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "white",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1
            }}
          >
            <View style = {{flexDirection:'row',borderBottomColor: "#f6f6f6",
                borderBottomWidth: 1,paddingBottom:5}}>
            <Text
              style={{
                padding: 5,
                color: "#454545",
                fontSize: FONT_SIZE_MAIN,
                flex:1
              }}
            >
              TIẾN TRÌNH THỰC HIỆN
            </Text>
            <TouchableOpacity 
             disabled = {this.state.trangThai}
             onPress = {()=>{
              CommonAPI.changeState(true, this.props.itemId).then(res=>{
                if(res){
                  // this.setState({trangThai:true})
                  // todo khi gửi hoàn thành thành công
                  // alert(JSON.stringify(res))
                  if(res.id == 200){
                    this.setState({trangThai:true})
                  }else{
                    alert(res.message)
                  }
                }
                else{
                  alert("Lỗi server! vui lòng thử lại sau ít phút")
                }
              })
            }}
            style = {{height:scale(46), marginRight:15, borderRadius:scale(46),
                    backgroundColor:this.state.trangThai ? '#3db329':'#ffffff',
                    borderWidth:1,
                    borderColor:this.state.trangThai?'#3db329':'#3173d3',
                    alignItems:'center', justifyContent: "center", paddingLeft:10, paddingRight:10}}>
                <Text style={{ color: this.state.trangThai ? '#ffffff' : '#3173d3', fontSize: scale(22) }}>Hoàn thành</Text>
            </TouchableOpacity>
            </View>
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
                  CommonAPI.getTientrinh(
                    this.state.taskID,
                    offsetValue,
                    200
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
                {this.state.isLoadMore ?  
                // <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
                //   {" "}
                //   Xem các tiến trình trước...
                // </Text>
                null
                : null}                
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        )
    }
}