import React, { Component } from "react";
import {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  Modal,
  TextInput,
  Platform,
  SectionList
} from "react-native";
import { Container, Picker, Header, Title, Icon, Body, Content } from "native-base";
import DatePicker from "react-native-datepicker";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader/";
import BaoCaoAPI from "../../services/api-service/bao-cao-api";
import MasterAPI from "../../services/api-service/master-api";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
import AppIndicator from "../user-controls/AppIndicator";
const win = Dimensions.get("window");
var FONT_SIZE_MAIN = 20;
var FONT_SIZE_SUB = 16;
var FONT_SIZE_ITEM = 13;

var khungtinHeight = scale(148)
var khungtinWWidth = scale(320)
var imageSize = scale(47)
var linhvucSize = scale(24)
var restText = scale(22)

var IMG_CHECK = require('../../../assets/images/l2-bao-cao/modal/check.png');
var IMG_UNCHECK = require('../../../assets/images/l2-bao-cao/modal/uncheck.png');
const TAT_CA_LINH_VUC = '0';

if (PixelRatio.get() <= 2) {
  FONT_SIZE_MAIN = 18;
  FONT_SIZE_SUB = 14;
  var FONT_SIZE_ITEM = 11;
}

export default class BaoCaoTongHopScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dateStart: "2019-03-14",
      dateEnd: "2019-4-20",
      btn1: false,
      btn2: false,
      btn3: false,
      pickerSelectedItem: TAT_CA_LINH_VUC,
      text: "Tìm Kiếm",
      modalVisible: false,
      modalVisible_Item: false,
      modalVisible_loaiHinh: false,
      defaultlistLinhVuc: [],
      listLinhVuc: [],
      listData: [],          // Danh sach cac linh vuc load tu DB ra
      listDisplayedData: [], // Danh sach cac linh vuc hien thi theo filter.
      // listData1: [],
      // listData2: [],
      selectedLinhVuc: {},
      baocaodotxuat: 'Báo cáo đột xuất',
      listLoaiHinh: [],
    };
  }
  componentDidMount() {
    BaoCaoAPI.getloaiHinhBaoCao().then((res) => {
      if(res) {
        this.setState({ listLoaiHinh: res });
        // alert(JSON.stringify(res))
      }
      // alert(JSON.stringify(res));
      //else 
      //alert('Loại hinh rỗng')
    });

    MasterAPI.getDsLinhVucBaoCao().then((res) => {
      this.setState({ listLinhVuc: res, defaultlistLinhVuc: res });
      // alert(JSON.stringify(this.state.listLinhVuc));
    })
    BaoCaoAPI.getDsBaoCao().then((res) => {
      if (res && res.status) {
        this.setState(
          {
            listData: res.data.data,
            listDisplayedData: res.data.data,
            defaultlistLinhVuc: res.data.linhVucs,
            listLinhVuc: res.data.linhVucs,
            isLoading: false,
          });
      }
    })
  }

  getBaocao(id) {
    this.setState({ ...this.state, data: id });
    // BaoCaoAPI.getDsBaoCao(id).then((res)=>{
    //   this.setState({listData: res});
    // });
  }
  getHeightRatio(width, width_new, height_new) {
    let height = (height_new * width) / width_new;
    return height;
  }

  // renderLinhVuc(value) {
  //   return value.map((data, i) => {
  //     return (
  //       <View
  //         key={i}
  //         style={{
  //           width: "100%",
  //           height: 50,
  //           justifyContent: "center",
  //           borderBottomColor: "gray",
  //           borderBottomWidth: 0.5
  //         }}
  //       >
  //         <View style={{ margin: 10 }}>
  //           <Text style={{ fontSize: 20, margin: 10, color: "grey" }}>
  //             {data.ten}
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   });
  // }

  filterLinhVuc(linhVucId) {
    this.setState({
      listDisplayedData: linhVucId == TAT_CA_LINH_VUC ? this.state.listData : this.state.listData.filter(item=>item.idLv == linhVucId),
      pickerSelectedItem: linhVucId,
    })
  }
  renderPicker() {
    return (
      <View style={styles.content}>
        <Picker
          mode={"dropdown"}
          itemTextStyle={{ color: "#3f3f3f", textTransform: 'uppercase' }}
          selectedValue={this.state.pickerSelectedItem}
          mode="dropdown"
          style={{
            height: this.getHeightRatio(win.width, 682, 72),
            width: "100%"
          }}
          onValueChange={(itemValue, itemIndex) =>{this.filterLinhVuc(itemValue)}}
        >
          <Picker.Item label="Tất cả lĩnh vực" value= {TAT_CA_LINH_VUC} />
          {
            this.state.listLinhVuc.map((item, index) => {
              return (<Picker.Item label={item.tenLv} value={item.idLv} />)
            })
          }
        </Picker>
        {
          Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, backgroundColor: 'white', justifyContent: 'center' }}>
            <Image source={require('../../../images/logo/sortdown.png')}
              style={{ height: 10, width: 10 }}
            />
          </View> : <View />
        }
      </View>
    );
  }

//   renderItems() {
//     return (
//         <View style={styles.content}>

//             <SectionList
//                 sections={
//                     this.state.listData
//                 }
//                 renderItem = 
//                 {this._renderFlatList}
//                 // {(data) => 
                
//                 // <FlatList
//                 //   data={this.state.listData}
//                 //   numColumns={2}
//                 //   renderItem={this._renderFlatList}
//                 // /> 
//               // }
//                 renderSectionHeader={({ section }) =>
//                 <View>
//                         <View style={{backgroundColor: '#efefef', height: scale(16)}}>
                            
//                         </View>
//                         <View style={styles.viewtitle}>
//                             <View style={{ margin: 10, }}>
//                                 <Text style={styles.titleText}>{section.name}</Text>
//                             </View>
//                         </View>
//                 </View> 
//                 }
//                 keyExtractor={(item, index) => index}
//             />
//         </View>

//     )
// }

_renderFlatList = ({item}) => (
  <TouchableOpacity onPress={() => this.props.navigation.navigate("BaoCaoThongKeChiTiet", {data: item})}>
  <View
    key={item.id}
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "white",
      width: khungtinWWidth,
      marginRight: 15,
      height: khungtinHeight,
      marginTop: 10,
      borderColor: 'lightgrey', borderWidth: 0.5
    }}
  >
    <View style={{ margin: 10, flexDirection: "row", flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", width: 32, height: 32, marginRight: 3 }}>
        <Image style={{ width: imageSize, height: imageSize }} source={{uri: item.iconChiTieu}} />
      </View>
      <View style={{ width: win.width / 3, height: 200, marginLeft: 5, flex: 4 }}>
        <Text style={{ fontSize: linhvucSize }} numberOfLines={3}>{item.tenChiTieuLv}</Text>
        <Text style={{ color: "red", fontSize: restText }} numberOfLines={1}>
          {item.giaTriChiTieu}&nbsp;{item.tenDonViTinh}
        </Text>
      </View>
    </View>
    {/* <View style={{ margin: 10, marginTop: 40, alignItems: "center" }}>
      <Text style={{ fontSize: restText }}>{item.report}</Text>
    </View> */}
  </View>
</TouchableOpacity>
)

  renderHeader() {
    return (
      <CustomHeader title="BÁO CÁO TỔNG HỢP 2019" source={require('../../../assets/images/l2-bao-cao/bao-cao-tong-hop/filter.png')}
      goto={() => this.setModalVisible(!this.state.modalVisible)}
      />
    );
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _closeModal() {
    this.setState({
      modalVisible: false
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

  setModalVisible_loaiHinh(visible) {
    this.setState({ modalVisible_loaiHinh: visible });
  }

  _closeModal_loaiHinh() {
    this.setState({
      modalVisible_loaiHinh: false
    });
  }

  
  renderIconBtn(state) {
    if (state) {
      return (
        <Icon name="ios-arrow-down" style={{ color: "gray", fontSize: 30 }} />
      );
    } else {
      return (
        <Icon
          name="ios-arrow-forward"
          style={{ color: "gray", fontSize: 30 }}
        />
      );
    }
  }

  onPressCheck(item) {
    const exist = this.state.selectedLinhVuc;
    exist[item.id] = !exist[item.id];
    this.setState({ selectedLinhVuc: exist });
    const test = this.state.listLinhVuc.map(e => { e.check = exist[e.id] })
    //console.log(this.state.dsCacSo)
  }

  renderDSLinhVuc(data) {
    return data.map((data, i) => {
        return (
            <View key={i} style={{
                height: verticalScale(87),
                alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#dfdfdf', backgroundColor: 'white'
            }} >
                <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }} key={i}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.selectedLinhVuc[data.id] ?
                            <TouchableOpacity onPress={() => this.onPressCheck(data)}>
                                <Image source={IMG_CHECK} style={{ width: win.width / 20, height: win.width / 20 }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.onPressCheck(data)}>
                                <Image source={IMG_UNCHECK} style={{ width: win.width / 20, height: win.width / 20 }} />
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
                        <Text>{data.ten}</Text>
                    </View>
                </View>
            </View>
        )
    }
    )
}

renderDSloaiHinh(data) {
  return data.map((data, i) => {
      return (
          <View key={i} style={{
              height: verticalScale(87),
              alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#dfdfdf', backgroundColor: 'white'
          }} >
              <TouchableOpacity style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }} key={i}
              onPress={() => {
                this.setState({baocaodotxuat: data.name})
                this._closeModal_loaiHinh()
              }}>
                  <View style={{ flex: 9, height: '100%', justifyContent: 'center', marginLeft: 10 }}>
                      <Text>{data.name}</Text>
                  </View>
              </TouchableOpacity>
          </View>
      )
  }
  )
}

  renderModal_Item() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalVisible_Item}
        onRequestClose={() => this._closeModal_Item()}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: win.width - 20,
              height: win.height - win.height / 3.5,
              backgroundColor: "#efefef"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ justifyContent: "center", alignItems: "center" }}
                    onPress={() => this._closeModal_Item()}
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
                    style={{ fontSize: 22, fontWeight: "500", color: "black" }}
                  >
                    CHỌN LĨNH VỰC
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
            <View style={{ margin: 10 }}>
              <View
                style={{
                  width: "100%",
                  height: 50,
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
                  <Icon name="ios-search" style={{}} />
                </View>
                <View style={{ flex: 9, justifyContent: "center" }}>
                  <TextInput
                    style={{ marginLeft: 20 }}
                    fontSize={20}
                    onChangeText={text => this.setState({ 
                      listLinhVuc: this.state.defaultlistLinhVuc.filter(linhvuc => linhvuc.ten.includes(text))
                     })}
                    placeholder="Tìm kiếm"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <ScrollView>
                {this.renderDSLinhVuc(this.state.listLinhVuc)}
              </ScrollView>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: moderateScale(20)}}>
                <TouchableOpacity onPress={() => {
                    // const selectDS = this.state.dsCacSo.filter(e => { return e.check });
                    // let new_text = this.getTextCacBoPhan(selectDS);
                    // this.setState({
                    //     textBoPhanThucHien: new_text
                    // })
                    this._closeModal_Item()
                }}
                    style={{ width: win.width - 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3d5e8f', height: 40 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModal_loaiHinh() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalVisible_loaiHinh}
        onRequestClose={() => this._closeModal_loaiHinh()}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: win.width - 20,
              height: win.height - win.height / 3.5,
              backgroundColor: "#efefef"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ justifyContent: "center", alignItems: "center" }}
                    onPress={() => this._closeModal_loaiHinh()}
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
                    style={{ fontSize: 22, fontWeight: "500", color: "black" }}
                  >
                    LOẠI HÌNH BÁO CÁO
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
                  <TouchableOpacity onPress={() => this._closeModal_loaiHinh()}>
                    <Icon
                      name="close"
                      style={{ color: "#c7c7c7", fontSize: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ margin: 10 }}>

            </View>
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <ScrollView>
                {this.renderDSloaiHinh(this.state.listLoaiHinh)}
              </ScrollView>
            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderModal() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalVisible}
        onRequestClose={() => this._closeModal()}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: this.state.modalVisible
              ? "rgba(0,0,0,0.5)"
              : "transparent"
          }}
        >
          <View
            style={{
              width: win.width - 20,
              height: win.height - win.height / 3.5
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ margin: 10, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "500", color: "black" }}
                >
                  TÌM BÁO CÁO NHANH
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity onPress={() => this._closeModal()}>
                  <Icon name="close" style={{ color: "#c7c7c7", fontSize: 30 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 4, backgroundColor: "white" }}>
              {/* <Accordion dataArray={dataArray} icon="ios-arrow-forward" expandedIcon="ios-arrow-down" /> */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setState({ btn1: !this.state.btn1 })}
                activeOpacity={1}
              >
                <Text style={styles.text}>Chọn theo lĩnh vực và sở ngành</Text>
                <View style={styles.btnViewIcon}>
                  {this.renderIconBtn(this.state.btn1)}
                </View>
              </TouchableOpacity>
              {this.state.btn1 ? (
                <View>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#ffffff" }]}
                    onPress={() => {
                      this.setModalVisible_Item(!this.state.modalVisible_Item);
                    }}
                  >
                    <Text style={[styles.text,{color: 'black'}]}>Lĩnh vực</Text>
                    <View style={styles.btnViewIcon}>
                      <Icon
                        name="ios-arrow-forward"
                        style={{ color: "gray", fontSize: 30 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#ffffff" }]}
                    onPress={() => {
                      this.setModalVisible_Item(!this.state.modalVisible_Item);
                    }}
                  >
                    <Text style={[styles.text,{color: 'black'}]}>Sở ngành</Text>
                    <View style={styles.btnViewIcon}>
                      <Icon
                        name="ios-arrow-forward"
                        style={{ color: "gray", fontSize: 30 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setState({ btn2: !this.state.btn2 })}
                activeOpacity={1}
              >
                <Text style={styles.text}>Chọn theo loại hình báo cáo</Text>
                <View style={styles.btnViewIcon}>
                  {this.renderIconBtn(this.state.btn2)}
                </View>
              </TouchableOpacity>
              {this.state.btn2 ? (
                <View>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#ffffff" }]}
                    onPress={() => {
                      this.setModalVisible_loaiHinh(!this.state.modalVisible_loaiHinh);
                    }}
                  >
                    <Text style={[styles.text,{color: 'black'}]}>{this.state.baocaodotxuat}</Text>
                    <View style={styles.btnViewIcon}>
                      <Icon
                        name="ios-arrow-forward"
                        style={{ color: "gray", fontSize: 30 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setState({ btn3: !this.state.btn3 })}
                activeOpacity={1}
              >
                <Text style={styles.text}>Thời gian</Text>
                <View style={styles.btnViewIcon}>
                  {this.renderIconBtn(this.state.btn3)}
                </View>
              </TouchableOpacity>
              {this.state.btn3 ? (
                // <View style={{ flexDirection: "row" }}>
                //   <View
                //     style={{
                //       flexDirection: "row",
                //       justifyContent: "center",
                //       flex: 1,
                //       width: "100%"
                //     }}
                //   >
                //     <View
                //       style={{ justifyContent: "center", alignItems: "center" }}
                //     >
                //       <Text style={{ fontSize: 16 }}>Từ</Text>
                //     </View>
                //     <View style={{ margin: 5, flex: 1.5 }}>
                //       {this.renderDatePicker()}
                //     </View>
                //   </View>

                //   <View
                //     style={{
                //       flexDirection: "row",
                //       justifyContent: "center",
                //       flex: 1,
                //       width: "100%"
                //     }}
                //   >
                //     <View
                //       style={{ justifyContent: "center", alignItems: "center" }}
                //     >
                //       <Text style={{ fontSize: 16 }}>Đến</Text>
                //     </View>
                //     <View style={{ margin: 5, flex: 1.5 }}>
                //       {this.renderDatePicker()}
                //     </View>
                //   </View>
                // </View>
                <View>
                  <Text style={[styles.text,{color: 'black'}]}>07/03/2018</Text>
                  <View style={styles.btnViewIcon}>
                        <Icon
                          name="ios-arrow-forward"
                          style={{ color: "gray", fontSize: 30 }}
                        />
                  </View>
                </View>
              ) : null}
            </View>
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  width: "100%" - 20,
                  left: 10,
                  right: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3e5e8f",
                    height: 40
                  }}
                  onPress={() => this._closeModal()}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>TÌM KIẾM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  renderDatePicker() {
    return (
      <View style={{ marginTop: 10, marginLeft: 5 }}>
        <DatePicker
          style={{ width: "100%" }}
          date={this.state.dateStart}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          //minDate="2016-05-01"
          //maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              right: 0,
              top: 4,
              marginRight: 10
            },
            dateInput: {
              marginLeft: 5
            },
            dateText: {
              position: "absolute",
              left: 0,
              marginLeft: 10
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={dateStart => {
            this.setState({ dateStart: dateStart });
          }}
        />
      </View>
    );
  }

  render() {

    return (
      <Container>
        {this.renderModal_Item()}
        {this.renderModal_loaiHinh()}
        {this.renderModal()}
        {this.renderHeader()}
        {
          this.state.isLoading?  
          (<AppIndicator></AppIndicator>):
          (
            <Content style={{marginBottom:footerMargin}}>
              <View style={{ flex: 1 }}>
                <View style={styles.container}>
                  {this.renderPicker()}
                  {
                    this.state.listDisplayedData && this.state.listDisplayedData.length?
                    (
                      this.state.listDisplayedData.map((itemLinhVuc, index)=> {
                        return (
                        <View style={{marginTop: 10}}>
                          <Text>{itemLinhVuc.tenLv}</Text>
                          <FlatList
                                  data={itemLinhVuc.chiTieus}
                                  numColumns={2}
                                  renderItem={this._renderFlatList}
                          />
                        </View>)
                      })
                    ) 
                    : (<View/>)
                  }
                </View>
              </View>
            </Content>
          )
        }
        
        <Footer style={Platform.OS == 'ios' ? styles.footerIos : styles.footerAndroid}>
          <View>
              <CustomTabs2 active='0'></CustomTabs2>
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15
    //backgroundColor: "white",
  },
  content: {
    backgroundColor: "white",
    marginTop: 15
  },
  btn: {
    width: "100%",
    height: 40,
    backgroundColor: "#efefef",
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
  },
  btnViewIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  viewtitle: {
    justifyContent: "center"
  },
  titleText: {
    fontSize: scale(26),
    color: "black"
  },
footerIos: { height: verticalScale(109), backgroundColor: 'transparent', borderTopWidth: 0 },
  footerAndroid: { height: verticalScale(109), backgroundColor: 'transparent', paddingBottom: -10 },
});

// class Example extends Component {
//   static propTypes = {
//     numColumns: PropTypes.number
//   };

//   static defaultProps = {
//     numColumns: 2
//   };

//   _renderSection = data => <Section {...data} />;

//   _renderItem = ({ section, index }) => {
//     const { numColumns } = this.props;

//     if (index % numColumns !== 0) return null;

//     const items = [];

//     for (let i = index; i < index + numColumns; i++) {
//       if (i >= section.data.length) {
//         break;
//       }

//       items.push(<Item item={section.data[i]} />);
//     }

//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between"
//         }}
//       >
//         {items}
//       </View>
//     );
//   };

//   render() {
//     return (
//       <SectionList
//         sections={dumyData}
//         style={styles.container}
//         renderItem={this._renderItem}
//         renderSectionHeader={this._renderSection}
//       />
//     );
//   }
// }