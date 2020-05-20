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

import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api'
import Footer ,{footerMargin} from '../../user-controls/CustomFooter'
import AppIndicator from '../../user-controls/AppIndicator'
import Text from '../../../components/custom-view/text';

var anhHeight = scale(95)
var anhWWidth = scale(96)
var tenSize = scale(26)
var roleSize = scale(22)
var khungHeight = verticalScale(128)
const win = Dimensions.get('window');

export default class QuyetDinhPhanCong extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {text: '', isLoading: true, listData: [], defaultlistData: []}
    }

    componentDidMount() {
        LinhVucQuanLyAPI.getQuyetDinhPhanCong().then((res)=>{
          // alert(JSON.stringify(res));
          this.setState({listData: res.nhiemVus, defaultlistData: res, isLoading: false});
        });
      }

      _renderItem = ({item}) => (
          <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('ChiTietPhanCong', {id: item.id})}>
            <View style={{flexDirection: "row", height: khungHeight, width: '100%', borderColor: 'lightgrey', borderWidth: 0.5, backgroundColor: 'white'}}>
                <View style={{flex: 20, justifyContent: "center", alignItems: "center"}}>
                    <Image source={item.icon ? item.icon : require('../../../../assets/images/default/avatar_progress.png')} 
                    style={{height: anhHeight, width: anhWWidth}}/>
                </View>

                <View style={{flex: 80, justifyContent: "center"}}>
                    <Text style={{fontSize: tenSize}}>Ông/Bà {item.hoTen}</Text>
                    <Text style={{fontSize: roleSize, color: 'grey'}}>{item.chucVu}</Text>
                </View>
            </View>
          </TouchableOpacity>
      )

      renderItems() {
        if (this.state.isLoading) {
          return (
              <AppIndicator />
          );
        }
        if (this.state.listData == ''){
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
                <CustomHeader title="PHÂN CÔNG NHIỆM VỤ" />
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
                    {/* <TextInput
                        style={{ flex: 90, height: 40 }}
                        onChangeText={text => this.setState({ 
                            listData: this.state.defaultlistData.nhiemVus.filter(ten => ten.hoTen.includes(text)  || ten.chucVu.includes(text)),
                           })}
                        underlineColorAndroid="transparent"
                        placeholder="Tìm kiếm"
                    /> */}
                    <TextInput
                        style={{ flex: 90, height: 40 }}
                        onChangeText={text => this.setState({ 
                            listData: this.state.defaultlistData.nhiemVus.filter(ten => ten.hoTen.includes(text)),
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