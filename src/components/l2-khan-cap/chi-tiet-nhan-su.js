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
import LinhVucQuanLyAPI from "../../services/api-service/linh-vuc-quan-ly-api";

export default class ChiTietNhanSuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [

            ]
        }
    }
    componentDidMount() {
        let id = this.props.navigation.getParam("id") ? this.props.navigation.getParam("id") : 10022;
        LinhVucQuanLyAPI.getChiTietPhanCong(id).then((res) => {
            if (res != null) {
                // alert(JSON.stringify(res))
                this.setState({ listData: res })
            }
        });
        // alert(JSON.stringify(this.props.navigation.getParam("id")))
    }
    renderHeader() {
        return <CustomHeader title="Chi tiết nhân sự" />;
    }

    render() {
        if (this.state.listData != null)
            return (
                <Container>
                    {this.renderHeader()}
                    <ScrollView>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ margin: scale(15) }}>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray' }}>
                                    {/* <View style={{ width: scale(72), height: scale(72), backgroundColor: 'red' }}>
                                </View> */}
                                    <Image style={{ width: scale(150), height: scale(150) }} source={this.state.listData.icon} />
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ fontSize: scale(32), fontFamily: "Roboto-Regular", color: "#333333" }}>{this.state.listData.hoTen}</Text>
                                        <Text style={{ fontSize: scale(28), fontFamily: "Roboto-Regular", color: "#999999" }}>{this.state.listData.chucVu}</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <Image source={require('../../../assets/images/l2-khan-cap/l2-chi-tiet/chitietnhansu/call.png')} style={{ width: scale(48), height: scale(48) }} />
                                                <Text style={{ marginLeft: 5, fontSize: scale(28) }}>DT: <Text style={{ color: "##047ef2", fontSize: scale(28) }}>{this.state.listData.dienThoai}</Text></Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <Image source={require('../../../assets/images/l2-khan-cap/l2-chi-tiet/chitietnhansu/mail.png')} style={{ width: scale(48), height: scale(48) }} />
                                                <Text style={{ marginLeft: 5, fontSize: scale(28) }}>Email: <Text style={{ color: "##047ef2", fontSize: scale(28) }}>{this.state.listData.email}</Text></Text>
                                            </View>
                                        </View>
                                        <View style={{height: 10}}></View>
                                    </View>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{ fontSize: scale(28), fontFamily: "Roboto-Regular", color: "#333333" }}>
                                        Phân công nhiệm vụ
                                </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Container>
            );
        else
            return (
                <AppIndicator></AppIndicator>
            )
    }
}
