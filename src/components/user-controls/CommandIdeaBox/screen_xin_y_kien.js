import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,Keyboard
} from "react-native";
import { Icon, Picker, Container,Content } from "native-base";
import DatePicker from "react-native-datepicker";
import Text from "../../custom-view/text";
import PropTypes from "prop-types";
import { scale, verticalScale, moderateScale } from "../utilities/Scale";
import MasterAPI from "../../../services/api-service/master-api";
import CommonAPI from "../../../services/api-service/common-api";
import SuccessModal from "../Messages/success";
import moment from 'moment'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { convertFileSize } from "../utilities/converter";
import AppIndicator from '../AppIndicator'
import NoiDungMauScreen from './noi-dung-mau';
var IMG_CHECK = require('../../../../assets/images/user-controls/check.png');
var IMG_UNCHECK = require('../../../../assets/images/user-controls/uncheck.png');
import CustomHeader from "../CustomHeader";
import VoiceRecorderBox from "../VoiceRecorderBox";
const win = Dimensions.get("window");
const defaultDsCacSo = [
  { id: 1, name: "Sở Công thương", check: false },
  { id: 2, name: "Sở Du lịch", check: false },
  { id: 3, name: "Sở Giáo dục và đào tạo", check: false },
  { id: 4, name: "Sở Giao thông vận tải", check: false },
  { id: 5, name: "Sở Khoa học và  công nghệ", check: false },
  { id: 6, name: "Sở Lao động thương binh xã hội", check: false },
  { id: 7, name: "Sở Ngoại vụ", check: false },
  { id: 8, name: "Sở Nội vụ", check: false },
  { id: 9, name: "Sở Nông nghiệp và Phát triển nông thôn", check: false },
  { id: 10, name: "Sở Tài chính", check: false },
  { id: 11, name: "Sở Tài nguyên và môi trường", check: false },
  { id: 12, name: "Sở Thông tin và truyền thông", check: false },
  { id: 13, name: "Sở Tư pháp", check: false },
  { id: 14, name: "Sở Văn hóa Thể thao và du lịch", check: false },
  { id: 15, name: "Sở Xây dựng", check: false },
  { id: 16, name: "Sở Y tế", check: false }
];

export const COMMAND_TYPE = {
  KHAN_CAP: 1,
  MUC_TIEU: 2,
  NHIEM_VU: 3,
  VAN_BAN_DEN: 4,
  VAN_BAN_DI: 5,
}

export default class XinYKienScreen extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    ideaType: PropTypes.string,
    postCallBack: PropTypes.func,
    referUserID: PropTypes.array,
    orgID: PropTypes.string,
    referIDSelectSo: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      id:this.props.navigation.getParam("id"),
      referUserID:this.props.navigation.getParam("referUserID"),
      referOrgID:this.props.navigation.getParam("referIDSelectSo"),
      orgID:this.props.navigation.getParam("orgID"),
      modalMau:false,
      btnBoPhanThucHien: false,
      date: this.props.navigation.getParam("ngayhieuluc"),
      data: "all",
      modalVisible_Item: false,
      text: '',
      textBoPhanThucHien: 'Bộ phận thực hiện',
      isLoading: false,
      isFileExceeded: false,
      dsCacSo: [],
      selectedSo: {},
      defaultDsCacSo: [],
      dsMau:[],
      defaultDSMau:[],
      checkboxThuocNhomViecGap: true,
      uploadedFiles: [],
    };
  }
  componentDidMount() {
    MasterAPI.getDsSoNganh().then((res) => {
      if (res != null) {
        this.setState({ dsCacSo: res, defaultDsCacSo: res, isLoading: false });
      }
    })
    
    MasterAPI.getDSMau().then((res)=>{
      if(res!=null){
        this.setState({ dsMau: res, defaultDSMau: res});
      }
    })
  }

  updateDate(date){
    this.setState({date:date})
  }
  updateDate2(date){
    this.setState({date: moment(date).format('DD/MM/YYYY')})
  }
  updateOrgRefStr(data) {
    if(data == null) return []
    var data2 = data.split(",")
    data2.splice(data2.length - 1, 1)
    let obj = {}
    if (data2 != null && data2.length > 0)
      data2.forEach(function (item) { obj[item] = true })
    var selectItem = "";
    for(var i=0;i<data2.length;i++){
      var item = this.state.dsCacSo.filter(function(item) {
        return item.id==data2[i];
      });
      if(item && item.length>0){
        selectItem=selectItem + (item[0].name)+", ";
      }
    }
    selectItem = selectItem.slice(0,-2)
    this.setState({ selectedSo: obj, textBoPhanThucHien:selectItem})
  }

  updateOrgRef(data) {
    let obj = {}
    if (data != null && data.length > 0)
      data.forEach(function (item) { obj[item] = true })
    this.setState({ selectedSo: obj })
  }

  async uploadFile(fileInfo) {
    res = await CommonAPI.uploadFile(this.props.itemId, fileInfo);
    if (res && res.id) {
      this.setState(state => {
        state.isLoading = false
        const uploadedFiles = state.uploadedFiles.concat({ file: fileInfo.fileName, size: fileInfo.fileSize, uploadedId: res.id });
        return {
          uploadedFiles,
        };
      });
    }
    else{
      this.setState({isLoading:false})
    }
  }

  openFilePicker = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, fileInfo) => {
      // Android
      if (!error && fileInfo) {
        console.log(fileInfo);
        if (fileInfo.fileSize > 1048576 * 10) { //1048576 * 10
          this.setState({ isFileExceeded: true, isLoading:false });
        }
        else {
          this.setState({ isFileExceeded: false, isLoading:true});
          this.uploadFile(fileInfo);
        }
      }
    });
  }

  async postYKienChiDao() {
    if(this.state.text == ""){
      return;
    }
    let attachments = this.state.uploadedFiles.map(file => file.uploadedId);
    body = {
      parentCommentId: -1,
      newsId: this.state.id,
      deadLine: this.state.date,
      referOrgID: this.state.referOrgID,
      referUserID: this.state.referUserID,
      orgID: this.state.orgID,
      contents: this.state.text,
      isSerious: this.state.checkboxThuocNhomViecGap ? 1 : 0,
      attachedFileIDs: attachments
    };
    CommonAPI.postChiDao(body).then((res) => {
      // alert(JSON.stringify(res))
      if (res) {
        this.setState({
          text:''
        })
        this.props.navigation.goBack(null)
      }
    })

  }

  onPressCheck(item) {
    const exist = this.state.selectedSo;
    exist[item.id] = !exist[item.id];
    this.setState({ selectedSo: exist });
    const test = this.state.dsCacSo.map(e => {
      e.check = exist[e.id];
    });
  }

  renderDSCacSo(data) {
    return data.map((data, i) => {
      return (
        <TouchableOpacity
          onPress={() => this.onPressCheck(data)}
          key={i}
          style={{
            height: verticalScale(87),
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "#dfdfdf",
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              alignItems: "center"
            }}
            key={i}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.state.selectedSo[data.id] ? (

                <Image
                  source={IMG_CHECK}
                  style={{ width: win.width / 20, height: win.width / 20 }}
                />
              ) : (
                  <Image
                    source={IMG_UNCHECK}
                    style={{ width: win.width / 20, height: win.width / 20 }}
                  />

                )}
            </View>
            <View style={{ flex: 9, height: "100%", justifyContent: "center" }}>
              <Text>{data.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  selectMau(data){
    this.setState({text:data.message , modalMau:false})
  }
  renderListMau(data) {
    return data.map((data, i) => {
      return (
        <TouchableOpacity
          onPress={() => this.selectMau(data)}
          key={i}
          style={{
            height: verticalScale(70),
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "#dfdfdf",
            backgroundColor: "white",
            flexDirection:'row'
          }}
        >
        <Image style = {{ width:scale(40), height:scale(40), marginLeft:10}} source = {require('../../../../assets/images/user-controls/noidungmau1.png')}></Image>
        <Text  style={{marginLeft:10, marginRight:40}} line = {1}>{data.message}</Text>
        </TouchableOpacity>
      );
    });
  }

  renderContent() {
    return (
      <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      {this.renderMau()}
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ margin: scale(20), flex: 1 }}>
              <View style={{ marginTop:20, height:verticalScale(395),  borderWidth: 1, borderColor: "#d4d4d4",borderRadius:5, backgroundColor:'white',}}>
                <View style={{  flex:4 }}>
                  <TextInput
                    style={[
                      styles.border,
                      { margin: 10, height: '90%', padding: 5 }
                    ]}
                    multiline={true}
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ text })}
                    textAlignVertical="top"
                    placeholder="Nội dung"
                    placeholderTextColor="#888888"
                    value={this.state.text}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', margin: 4}}>
                  <TouchableOpacity style={{ flex: 1 }} onPress = {()=>{this.setModalMau(!this.state.modalMau);}} >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../../../../assets/images/user-controls/noidungmau1.png')} style={{ margin:10, width: scale(60), height: scale(60) }} />
                      </View>
                      <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center", }}>
                        <Text>Sử dụng mẫu chỉ đạo nhanh</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{margin: 5}} >
                    <VoiceRecorderBox onRecorded={(text)=>this.setState({text})}></VoiceRecorderBox>
                  </View>
                </View>
            </View>


            {/* <View style={{ backgroundColor: 'white', marginTop: 10, borderWidth: 1, borderColor: "#d4d4d4", borderRadius:5}}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible_Item(!this.state.modalVisible_Item);
                  this.setState({ dsCacSo: this.state.defaultDsCacSo })
                }}
                style={[
                  styles.border,
                  {
                    width: "100%",
                    height: scale(70),
                    justifyContent: "center",
                    flexDirection: "row"
                  }
                ]}
              >
                <View style={{ flex: 9, justifyContent: "center" }}>
                  <Text
                    style={[styles.textModal, { marginLeft: 5 }]}
                    line={1}
                  >
                    {this.state.textBoPhanThucHien}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../../../../assets/images/l2-khan-cap/ic_arrow_down.png")}
                    style={{ width: scale(22), height: verticalScale(17) }}
                  />
                </View>
              </TouchableOpacity>
            </View> */}

            <View style={{ flex: 4.5 }}>
              {this.renderDatePicker()}

              <View
                style={{
                  marginRight: 5,
                  flexDirection: "row",
                  flex: 0.5,
                  marginTop: 10
                }}
              >
                {this.state.checkboxThuocNhomViecGap ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        checkboxThuocNhomViecGap: !this.state.checkboxThuocNhomViecGap
                      })
                    }
                  >
                    <Image
                      source={IMG_CHECK}
                      style={{ width: win.width / 20, height: win.width / 20 }}
                    />
                  </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          checkboxThuocNhomViecGap: !this.state.checkboxThuocNhomViecGap
                        })
                      }
                    >
                      <Image
                        source={IMG_UNCHECK}
                        style={{ width: win.width / 20, height: win.width / 20 }}
                      />
                    </TouchableOpacity>
                  )}
                <Text style={[styles.textModal, { marginLeft: 10 }]}>
                  Thuộc nhóm việc gấp
              </Text>
              </View>


              <View
                style={{
                  marginTop:20,
                  flexDirection: "row",
                  height: 50,
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Text style={styles.textModal}>Tập tin đính kèm &nbsp;&nbsp;</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: verticalScale(72),
                    width: scale(298),
                    flexDirection: "row",
                    backgroundColor: "#e1e1e1",
                    margin: 0, borderRadius:5
                  }}
                  onPress={this.openFilePicker}
                >
                  <Image
                    source={require("../../../../assets/images/l2-khan-cap/l2-chi-tiet/upload.png")}
                    style={{ height: verticalScale(30), width: scale(24) }}
                  />
                  <Text
                    style={{ color: "#3e5e8f", fontSize: scale(25.5), marginLeft: 5, }}
                  >
                    TẢI LÊN
                </Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.renderAttachments()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  getHeight() {
    if (this.state.uploadedFiles.length < 4) {
      return this.state.uploadedFiles.length * 28 +
        (this.state.isFileExceeded ? 28 : 0);
    }
    return 4 * 28 +
      (this.state.isFileExceeded ? 28 : 0)
  }
  renderAttachments() {
    return (
      <ScrollView
        style={{
          height: verticalScale(
            this.getHeight()
          ),
          marginBottom: 10
        }}
      >
        {this.state.uploadedFiles.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                marginTop: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../../../assets/images/l2-khan-cap/l2-chi-tiet/ico_dinhkem.png")}
                  style={{ width: scale(24), height: scale(24) }}
                />
                <Text numberOfLines={1} style={{ fontSize: scale(24) }}>
                  &nbsp;{item.file}
                  <Text style={{ color: "#999999" }}>
                    &nbsp;({convertFileSize(item.size)})
                      </Text>
                </Text>
              </View>
              <TouchableOpacity onPress={() => {
                let array = this.state.uploadedFiles;
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ uploadedFiles: array });
                }
              }}>
                <View>
                  <Image
                    source={require("../../../../assets/images/l2-khan-cap/l2-chi-tiet/ic_xoadinhkem.png")}
                    style={{ width: scale(32), height: scale(32) }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        {this.state.isFileExceeded ? (
          <View
            style={{
              backgroundColor: "#ffeaea",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: verticalScale(60)
            }}
          >
            <Text style={{ color: "red" }}>Tập tin tải lên vượt quá 10MB</Text>
          </View>
        ) : (
            <View />
          )}
      </ScrollView>
    );
  }
  renderDatePicker() {
    return (
      //todo
      <View style={{ marginTop: 10, flexDirection: 'row', backgroundColor:'white',borderWidth: 1, borderColor: "#d4d4d4", borderRadius:5 }}>
        <DatePicker
          style={{ width: "100%" }}
          iconSource={require('../../../../assets/images/nhiem-vu/calendar_black.png')}
          date={this.state.date}
          format="DD/MM/YYYY"
          mode="date"
          locale={'vi'}
          minDate={moment().format('DD/MM/YYYY')}
          placeholder={moment(this.props.ngayhieuluc).format('DD/MM/YYYY')}
          placeholderTextColor="#333333"
          confirmBtnText="Xác nhận"
          cancelBtnText="Huỷ"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: scale(21),
              marginLeft: 10,
              width: scale(29),
              height: scale(29)
            },
            dateInput: {},
            placeholderText: {
              position: "absolute",
              left: 0,
              marginLeft: scale(57),
              color: "#333333"
            },
            dateText: {
              position: "absolute",
              left: 0,
              marginLeft: scale(57)
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        <Image style={{
          position: "absolute",
          right: 0,
          top: scale(30),
          marginRight: scale(23),
          width: scale(22), height: verticalScale(17)
        }} source={require('../../../../assets/images/l2-khan-cap/ic_arrow_down.png')}></Image>
      </View>
    );
  }
  renderModal_Item() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalVisible_Item}
        onRequestClose={() => this._closeModal_Item()}
      >
        <TouchableWithoutFeedback onPress={() => this._closeModal_Item()}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: this.state.modalVisible_Item
                ? "rgba(0,0,0,0.5)"
                : "transparent"
            }}
          >
            <TouchableWithoutFeedback >
              <View
                style={{
                  width: scale(683),
                  height: verticalScale(910),
                  backgroundColor: "#efefef"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    height: this.getHeightRatio(win.width - 20, 683, 87),
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        style={{ justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                          this._closeModal_Item()
                        }}
                      >
                        <Icon
                          name="ios-arrow-back"
                          style={{ color: "#c7c7c7", fontSize: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 8,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: scale(32),
                          fontFamily: "Roboto-Medium",
                          color: "#333333"
                        }}
                      >
                        Bộ phận thực hiện
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: 30,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity onPress={() => this._closeModal_Item()}>
                        <Icon
                          name="close"
                          style={{ color: "#c7c7c7", fontSize: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ margin: 7 }}>
                  <View
                    style={{
                      width: "100%",
                      height: verticalScale(72),
                      flexDirection: "row",
                      backgroundColor: "white"
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon name="ios-search" style={{ color: "#999999" }} />
                    </View>
                    <View style={{ flex: 9, justifyContent: "center" }}>
                      <TextInput
                        style={{ marginLeft: scale(20) }}
                        fontSize={scale(26)}
                        onChangeText={text =>
                          this.setState({
                            dsCacSo: this.state.defaultDsCacSo.filter(so =>
                              so.name.includes(text)
                            )
                          })
                        }
                        placeholder="Tìm kiếm"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flex: 5 }}>
                    <ScrollView style={{ backgroundColor: "white" }}>
                      {this.renderDSCacSo(this.state.dsCacSo)}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const selectDS = this.state.dsCacSo.filter(e => {
                          return e.check;
                        });
                        let new_text = this.getTextCacBoPhan(selectDS);

                        this.setState({
                          textBoPhanThucHien: new_text,
                          selectDS: selectDS
                        });
                        this._closeModal_Item();
                      }}
                      style={{
                        width: win.width - 40,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#3d5e8f",
                        height: 40
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>ĐỒNG Ý</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  renderMau(){
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalMau}
        onRequestClose={() => this.setModalMau(false)}
      >
        <TouchableWithoutFeedback onPress={() => this.setModalMau(false)}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: this.state.modalMau
                ? "rgba(0,0,0,0.5)"
                : "transparent"
            }}
          >
            <TouchableWithoutFeedback >
              <View
                style={{
                  width: scale(683),
                  height: verticalScale(910),
                  backgroundColor: "#efefef"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    height: this.getHeightRatio(win.width - 20, 683, 87),
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        style={{ justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                          this.setModalMau(false)
                        }}
                      >
                        <Icon
                          name="ios-arrow-back"
                          style={{ color: "#c7c7c7", fontSize: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 8,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: scale(32),
                          fontFamily: "Roboto-Medium",
                          color: "#333333"
                        }}
                      >
                        Chọn mẫu nội dung
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: 30,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity onPress={() => this.setModalMau(false)}>
                        <Icon
                          name="close"
                          style={{ color: "#c7c7c7", fontSize: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ margin: 7 }}>
                  <View
                    style={{
                      width: "100%",
                      height: verticalScale(72),
                      flexDirection: "row",
                      backgroundColor: "white"
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon name="ios-search" style={{ color: "#999999" }} />
                    </View>
                    <View style={{ flex: 9, justifyContent: "center" }}>
                      <TextInput
                        style={{ marginLeft: scale(20) }}
                        fontSize={scale(26)}
                        onChangeText={text =>
                          this.setState({
                            //todo loc
                            dsMau: this.state.defaultDSMau.filter(so =>
                              so.message.includes(text)
                            )
                          })
                        }
                        placeholder="Tìm kiếm"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flex: 5 }}>
                    <ScrollView style={{ backgroundColor: "white", marginHorizontal:7 }}>
                      {this.renderListMau(this.state.dsMau)}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  render() {
    return (
      <Container style={styles.container}>
        
        <CustomHeader title="Ý kiến chỉ đạo" />
        <Content style = {{backgroundColor:'#f5f5f5'}}>
        <View>
        {this.renderModal_Item()}
        {this.renderContent()}
      </View>
        </Content>
        <View>
                <View
                  style={{
                    backgroundColor:'#f5f5f5',
                    width: "100%",
                    justifyContent:'center',
                    alignItems:'center', paddingLeft:40,paddingRight:40, paddingBottom:20
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.postYKienChiDao();
                      // this._closeModal();
                      //todo end post
                    }}
                    style={{
                      borderRadius:5,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#3d5e8f",
                      height: verticalScale(72)
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: scale(28),
                        fontFamily: "Roboto-Medium"
                      }}
                    >
                      GỬI
                        </Text>
                  </TouchableOpacity>
                </View>
              </View>
      </Container>
     
    )
  }

  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  getTextCacBoPhan(list) {
    if (list.length == 0) return "Bộ phận thực hiện"
    let new_text = '';
    for (let i = 0; i < list.length; i++) {
      new_text += list[i].name + ', ';
    }
    new_text = new_text.slice(0, -2)
    return new_text;
  }

  _closeModal() {
    this.setState({
      uploadedFiles: []
    });
  }

  setModalVisible_Item(visible) {
    this.setState({ modalVisible_Item: visible });
  }
  _closeModal_Item() {
    this.setState({
      modalVisible_Item: false
    });
  }

  setModalMau(visible) {
    this.setState({
      modalMau: visible,
      dsMau: this.state.defaultDSMau
    });
  }

}

const styles = StyleSheet.create({
  text: {
    fontSize: scale(24)
  },
  textModal: {
    color: "#333333",
    fontSize: scale(26)
  },
  border: {
    borderColor: "#d4d4d4",
    borderBottomWidth: 1
  }
});
