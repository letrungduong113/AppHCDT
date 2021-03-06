import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions,
  FlatList
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
} from "native-base";
import Footer ,{footerMargin} from '../../user-controls/CustomFooter'
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api';
import AppIndicator from '../../user-controls/AppIndicator'
import Text from '../../../components/custom-view/text';
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"

var textSize = scale(30)
var khungHeight = verticalScale(120)
var icon = scale(60)

export default class DiaPhuongDangPhuTrach extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {text: '', isLoading: true, listData: [], defaultlistData: [],
        numScreen: this.props.navigation.getParam("numScreen"),
        pageTitle: this.props.navigation.getParam('title') ? this.props.navigation.getParam('title') : GROBAL_RESOUCE.QUAN_LY_DIA_PHUONG_TITLE,  
      }
    }

    componentDidMount() {
        LinhVucQuanLyAPI.getDonVi(2, 0, 100).then((res)=>{
          // alert(JSON.stringify(res));
          this.setState({listData: res.donViPhuTrachs, defaultlistData: res.donViPhuTrachs, isLoading: false});
        });
      }
      replaceRN(data){
        if (data) {
          data =  data.replace("\r\n", "");
        }
        return data;
      }

      _renderItem = ({item}) => (
        <TouchableOpacity key={item.id} onPress={() => 
        {
          !this.state.numScreen ? this.props.navigation.navigate('SoTaiChinh', {id: item.id, token: item.token, songanh: true}):this.props.navigation.navigate("VanBanChiTieuScreen", {showSoNganh: "0", id: item.id, nameSoNganh: item.donVi, userToken: item.token,songanh:false})
        }
        }>
          <View style={{flexDirection: "row", height: khungHeight, width: '100%', backgroundColor: 'white'}}>
              <View style={{flex: 15, justifyContent: "center", alignItems: "center"}}>
                <View style={{width: scale(80), height: scale(80), justifyContent: "center", alignItems: "center", borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10}}>
                  <Image source={require('../../../../assets/images/l2-linh-vuc-quan-ly/iconso.png')} style={{width: icon, height: icon}} />  
                </View> 
                  
              </View>
              
              <View style={{flex: 75, justifyContent: "center"}}>
                  <Text style={{color: 'grey', fontSize: textSize, fontWeight: 'bold'}}>{item.donVi}</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
                  <Icon name='ios-arrow-forward' style={{color: 'lightgrey'}}/>
              </View>
          </View>
          <View style={{width: '100%', height: 1, flexDirection: 'row'}}>
            <View style={{flex: 15}}></View>
            <View style={{flex: 85, backgroundColor: 'lightgrey'}}></View>
          </View>
        </TouchableOpacity>
    )

      renderItems() {
        if (this.state.isLoading) {
          return (
              <AppIndicator />
          );
        }
        if (this.state.listData == '' || this.state.listData == null){
          return (
            <Content style={{marginBottom:footerMargin}}>
            <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400)}}>
              <Image
                source={require("../../../../assets/images/search_not_found.png")}
                style={{ width: scale(198), height: scale(198) }}
              />
              <Text
                style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
              >
                Không có dữ liệu
              </Text>
            </View>
            </Content>
          );
        }
        return (
          <Content style={{marginBottom:footerMargin}}>
            <View>
                <FlatList
                    data={this.state.listData}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this._renderItem}
                    numColumns={1}
                />
            </View>
          </Content>
        );
      }

    render() {
        return(
            <Container>
                <CustomHeader title={this.state.pageTitle}/>
                <View style={{ alignItems: "center", justifyContent: "center", marginBottom: moderateScale(16) }}>
                    <View
                    style={{
                        width: scale(682),
                        height: verticalScale(72),
                        alignItems: "center",
                        marginTop: 10,
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
                            listData: this.state.defaultlistData.filter(unit => unit.donVi.includes(text)),
                           })}
                        underlineColorAndroid="transparent"
                        placeholder="Tìm kiếm"
                    />
                    </View>
                </View>
                {this.renderItems()}
                <Footer select='0'/>
            </Container>
        )
    }
}