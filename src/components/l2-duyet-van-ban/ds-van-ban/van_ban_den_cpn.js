import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform
} from "react-native";
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
import styles from "./styles";
import { scale, verticalScale,moderateScale } from "../../user-controls/utilities/Scale";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import MasterAPI from "../../../services/api-service/master-api";
import AppIndicator from "../../user-controls/AppIndicator";
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"
import Footer ,{footerMargin} from '../../user-controls/CustomFooter'

var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_SUB = scale(22);

export default class VanBanDenCpn extends Component {
  static propTypes = {
    // goToDetailDen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading:true,
      isLoadMore:false,
      listDocTypes: [],
      selectedDocType:0,
    };

    this.filterDocType = 0;
  }

  componentDidMount() {
    this.getDanhSachVanBanDen()
    MasterAPI.getDsLoaiTaiLieu().then((res)=> {
      if(res!=null)
      this.setState({listDocTypes: res});
    });
  }

  loadMoreData(){
    this.state.loadMore=true
    this.setState({loadMore:true})
    this.getDanhSachVanBanDen(true)
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

  listItems(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            height: scale(140),
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            borderTopWidth:1,
            borderTopColor:'#eeeeee'
          }}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("VanBanChiTiet", {
              id: data.id,
              text_type: true
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

  renderItems() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: '100%',
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

  renderPicker() {
    return (
      <View>
        <View style={{flexDirection: "row", flex: 10, borderColor: '#d7d7d7', backgroundColor:'#fafafa', borderWidth: 1 }}>
          <Picker
            textStyle={{fontSize: FONT_SIZE_MAIN,color:'#464646'}}
            selectedValue={this.state.selectedDocType}
            style={{ flex: 8, height: scale(64)}}
            iosHeader="Mời bạn chọn"
            headerBackButtonTextStyle = {{padding:20}}
            headerTitleStyle = {{paddingTop:20}}
            headerBackButtonText="Hủy"
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({selectedDocType: itemValue });
                this.onfilterDocType(itemValue)
            }
              
            }
          >
            <Picker.Item label="Tất cả loại văn bản" value={0} />
            {
                this.state.listDocTypes.map((item, index) => {
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

  reloadData() {
      this.getDanhSachVanBanDen();
  }

  getDanhSachVanBanDen(loadMore=false) {
    DanhSachVanBanAPI.getdsvanbanden(loadMore?this.state.data.length/10+1:1, 30,this.filterDocType,255).then(res => {
      if(res && res.vanBans){
        this.setState({
          isLoading: false,
          loadMore:false,
          data: loadMore?this.state.data.concat(res.vanBans):res.vanBans,
        });
      }else{
        this.setState({
          isLoading: false,
          loadMore:false,
        });
      }
    });
}
  // getDanhSachVanBanDi(loadMore=false) {
  //     DanhSachVanBanAPI.getdsvanbandi(loadMore?this.state.data.length/10+1:1, 30,this.filterDocType,255).then(res => {
  //       // alert(JSON.stringify(res))
  //       if(res && res.vanBans){
  //         // alert(JSON.stringify(res))
  //         this.setState({
  //           isLoading: false,
  //           loadMore:false,
  //           data: loadMore?this.state.data.concat(res.vanBans):res.vanBans,
  //         });
  //       }else{
  //         this.setState({
  //           isLoading: false,
  //           loadMore:false
  //         });
  //       }
  //     });
  // }

  isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=contentSize.height - paddingToBottom;
  }

  render() {
    return (
      // <Content onScroll={({nativeEvent}) => {
      //   if (this.isScrollEnd(nativeEvent) && !this.state.loadMore) {
      //       this.loadMoreData()
      //   }}}
      //   style={{marginBottom:footerMargin}}>
      <Content scrollEnabled = {true} style={{marginBottom:footerMargin}}>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <View style={[styles.container2, { marginTop: 10 }]}>{this.renderPicker()}</View>
        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 10 }}>
          <Text style={{ color: '#217de0', fontSize: FONT_SIZE_MAIN }}>
            <Text style={{ fontWeight: '800', color: '#217de0', fontSize: FONT_SIZE_30 }}>{this.state.data && this.state.data.length ? this.state.data.length : 0}</Text>
            &nbsp;{GROBAL_RESOUCE.VAN_BAN}&nbsp;đến&nbsp;
              </Text>
        </View>
        {this.renderItems()}
      </View>
    </Content>
    )
  }
}