import React, {Component } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform
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
  Text,
  Picker
} from "native-base";
import { scale, verticalScale,moderateScale } from "../../user-controls/utilities/Scale";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import MasterAPI from "../../../services/api-service/master-api";
import AppIndicator from "../../user-controls/AppIndicator";
import { withNavigation } from "react-navigation";

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_SUB = scale(22);

class TongHopBaoCaoControl extends Component {
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
      isLoading: true,
      data: [],
      listReportTypes: [
        {id: 1, catValue: 'Báo cáo tài chính'},
        {id: 2, catValue: 'Báo cáo môi trường'},
        {id: 3, catValue: 'Báo cáo kinh tế'},
      ],
      selectedDocType:0,
    };

    this.filterDocType = 0;
  }

  componentDidMount() {
    this.reloadData();
    
    //////// GET DANH SÁCH LOẠI BÁO CÁO //////////////
    // MasterAPI.getDsLoaiTaiLieu().then((res)=> {
    //   if(res!=null)
    //   this.setState({listReportTypes: res, isLoading1: false});
    //   // alert(JSON.stringify(this.state.listReportTypes));
    // });
  }

  renderItems() {
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
          <AppIndicator></AppIndicator>
        </View>
      );
    }
    return (
      <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
    );
  }

  getColorType(type) {
    switch (type) {
      case 0:
        return "#fc7c43";
      case 1:
        return "#4169a3";
      case 3:
        return "#ed3229";
      default:
        return "#999999";
    }
  }

  getIsDone(value) {
    if (value == 1121) return true;
    return false;
  }

  listItems(value) {
    return value.map((data, i) => {
      let isDone = this.getIsDone(data.trangThai);
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            height: scale(140),
            width: "100%",
            backgroundColor: isDone ? "#f6f6f6" : "white",
            flexDirection: "row",
            borderTopWidth:1,
            borderTopColor:'#eeeeee'
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("VanBanChiTiet", {
              id: data.id,
              text_type: true, // Chỉ tổng hợp báo cáo đến
            });
          }}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: scale(77), height: scale(77) }}
              source = {data.icon}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: FONT_SIZE_MAIN,
                color: "#333333",
                marginRight: 20
              }}
            >
              {data.tieuDe}
            </Text>
            <View style={{marginTop:5, flexDirection: "row" }}>
              <View
                style={{
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                  alignItems: "center"
                }}
              >
                <Text
                numberOfLines = {1}
                  style={{
                    marginRight: 10,
                    fontSize: FONT_SIZE_SUB,
                    color: "#888888"
                  }}
                >
                  {data.docType}
                </Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: this.getColorType(data.trangThai)
                  }}
                >
                  {data.tenTrangThai}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }


  renderPicker() {
        
    return (
      <View>
        <View style={{ flexDirection: "row", flex: 10, borderColor: '#d7d7d7', backgroundColor:'#fafafa', borderWidth: 1 }}>
          <Picker
            textStyle={{fontSize: FONT_SIZE_MAIN,color:'#464646'}}
            selectedValue={this.state.selectedDocType}
            style={{ flex: 8, height: scale(64) }}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({selectedDocType: itemValue });
                this.onfilterDocType(itemValue);
            }
              
            }
          >
            <Picker.Item label="Tất cả loại báo cáo" value={0} />
            {
                this.state.listReportTypes.map((item, index) => {
                    return (<Picker.Item label={item.catValue} value={item.id} />)
                })
            }
          </Picker>
          {Platform.OS == "ios" ? (
            
              <Image
                source={require("../../../../images/logo/sortdown.png" )}
                style={{ height: 10, width: 10 , position: "absolute",top:15,right:15}}
              />
          
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }

  onfilterDocType(linhvuc) {
    this.filterDocType = linhvuc;
    this.reloadData();
  }

  async reloadData() {
    res = await MasterAPI.getDsLoaiTaiLieu();
    
    if(res!=null) {
      baoCao = res.find(item => item.catValue.indexOf("Báo cáo") >= 0);
      console.log("-----------------", baoCao);
      if (baoCao) {
        res = await DanhSachVanBanAPI.getdsvanbanden(1, 100, baoCao.id, 255, this.props.token);
        if(res && res.vanBans){
          this.setState({ data: res.vanBans,});
        }
      } 
    }
    
    this.setState({isLoading: false,});
      

    // this.setState({
    //   isLoading: false,
    //   data: [
    //     {
    //       id: 1,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 2,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 3,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 4,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 5,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 6,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //     {
    //       id: 7,
    //       icon: require('../../../../assets/images/bao-cao-dieu-hanh/ico_baocaotonghop.png'),
    //       docType: 'Báo cáo kinh tế',
    //       tieuDe: 'Báo cáo vấn đề môi trường',
    //     },
    //   ]
    // })
  }

  render() {
    return (
        <Content>
          <View style={{backgroundColor: 'white'}}>
            {/* <View
                style={{
                    width: scale(682),
                    height: verticalScale(72),
                    alignItems: "center",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    flexDirection: "row",
                    backgroundColor: "white"
                }}
                >
                <TouchableOpacity
                    style={{
                    flex: 10,
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <Icon name="ios-search" style={{ color: "gray" }} />
                </TouchableOpacity>
                <TextInput
                    style={{ flex: 90, height: 40 }}
                    onChangeText={text => this.setState({ 
                        // listData: this.state.defaultlistData.filter(unit => unit.donVi.includes(text)),
                        })}
                    underlineColorAndroid="transparent"
                    placeholder="Tìm kiếm"
                />
                </View> */}
            {/* <View style={[styles.container2,{marginBottom:10}]}>{this.renderPicker()}</View> */}
            {/* <View style={{margin: 10, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 10}}>
              <Text  style={{color: '#217de0', fontSize:FONT_SIZE_MAIN}}>
                <Text style={{fontWeight: '800', color: '#217de0', fontSize:FONT_SIZE_30}}>{this.state.data && this.state.data.length ? this.state.data.length: 0}</Text>
                &nbsp;văn bản&nbsp;{this.state.text_type? 'đến': 'đi'}&nbsp;{this.state.statusText}
              </Text>
            </View> */}
            {this.renderItems()}
          </View>
        </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DADADA"
  },
  container2: {
    marginLeft: scale(18),
    marginRight: scale(18),
    //backgroundColor: "white",
    flex: 1,
  },
  styleList: {
    marginTop:1,
    width: "100%",
    backgroundColor: "white"
  }
});
export default withNavigation(TongHopBaoCaoControl);