import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import Text from "../../components/custom-view/text";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import CustomHeader from "../user-controls/CustomHeader";
import AppIndicator from "../user-controls/AppIndicator";
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
  Footer
} from "native-base";
import KhanCapAPI from "../../services/api-service/khan-cap-api";

export default class ChiDaoNhanSuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      listData: [
        // {
        //   "orgId": 1187,
        //   "orgName": "UBND Tỉnh Bắc Ninh",
        //   "contacts": [
        //     {
        //       "userId": 10022,
        //       "userName": " Nguyễn Tử Quỳnh",
        //       "position": "Chủ tịch UBND Tỉnh Bắc Ninh",
        //       "phone": "0987654321",
        //       "avatar": "http://13.250.56.249:8080/file-manager/file/user-avt/downloadById/10022"
        //     },
        //     {
        //       "userId": 10024,
        //       "userName": " Nguyễn Hữu Thành",
        //       "position": "Phó chủ tịch UBND Tỉnh Bắc Ninh",
        //       "phone": "0213456852",
        //       "avatar": "http://13.250.56.249:8080/file-manager/file/user-avt/downloadById/10024"
        //     },
        //     {
        //       "userId": 10025,
        //       "userName": " Nguyễn Văn Phong",
        //       "position": "Phó chủ tịch UBND Tỉnh Bắc Ninh",
        //       "phone": "0956214759",
        //       "avatar": "http://13.250.56.249:8080/file-manager/file/user-avt/downloadById/10025"
        //     }
        //   ]
        // },
      ]

    }
  }
  componentDidMount() {
    let cateTypeID = this.props.navigation.getParam("cateTypeID") ? this.props.navigation.getParam("cateTypeID") : 23;
    KhanCapAPI.getChiDaoNhanSu(cateTypeID).then((res) => {
      if (res != null) {
        // console.log(res)
        this.setState({ listData: res })
      }
    });
  }
  renderHeader() {
    return <CustomHeader title="Chỉ đạo nhân sự" />;
  }
  renderData(data) {
    return (
      data.map((data, i) => {
        return (
          // <TouchableOpacity onPress={() => this.props.navigation.navigate("ChiTietNhanSu", {id: data.userId})}>
          <View style={{ width: '100%', height: verticalScale(180), flexDirection: 'row', justifyContent: "center", marginBottom: 0, borderBottomWidth: 1, borderColor: "#d7d7d7" }} key={i}>
            <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: scale(100), height: scale(100) }}>
                <Image source={data.imgAvt.uri ? data.imgAvt : require("../../../assets/images/default/task.png")} style={{ width: scale(100), height: scale(100), borderRadius: scale(50) }} />
              </View>
            </View>
            <View style={{ flex: 6, justifyContent: "center", marginLeft: 10 }}>
              <Text line={1} style={{ color: "#333333", fontSize: scale(32), fontFamily: 'Roboto-Regular' }}>{data.userName}</Text>
              <Text line={2}>{data.position}</Text>
              <Text>SĐT: {data.phone}</Text>
            </View>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { Linking.openURL(`tel:${data.phone}`) }}>
                <Image source={require('../../../assets/images/l2-khan-cap/l2-chi-tiet/call.png')} style={{ width: scale(100), height: scale(100) }} />
              </TouchableOpacity>
            </View>
          </View>
          // </TouchableOpacity>
        )
      })
    )
  }
  renderList(data) {
    return (
      data.map((data, i) => {
        return (
          <View key={i}>
            <View style={{ width: '100%', height: verticalScale(50), backgroundColor: "#e1e1e1" }}>
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', marginLeft: 15 }}>
                <Text style={{ color: "#999999", fontFamily: "Roboto-Bold", fontSize: scale(7 * 4) }} line={1}>{data.orgName}</Text>
              </View>
            </View>
            {this.renderData(data.contacts)}
          </View>
        )
      })
    )
  }
  render() {
    if (this.state.listData.length > 0)
      return (
        <Container>
          {this.renderHeader()}
          <ScrollView>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              {/* {this.renderData(this.state.listData[0].contacts)} */}
              {this.renderList(this.state.listData)}
            </View>
          </ScrollView>
        </Container>
      );
    else
      return (
        <Container>
          {this.renderHeader()}
          <AppIndicator></AppIndicator>
        </Container>
      )
  }
}
