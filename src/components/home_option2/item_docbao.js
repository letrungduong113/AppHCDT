import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, Platform, FlatList, StatusBar } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right, Footer, View } from "native-base";
import Text from "../custom-view/text";
import { scale, verticalScale, moderateScale } from "../../components/user-controls/utilities/Scale";
import HomeAPI from "../../services/api-service/home-api";

var deviceWidth = Dimensions.get('window').width;
export default class ItemDocBao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listNews: [],
        };
    }

    componentDidMount() {
        HomeAPI.getTinHome(3).then((res) => {
            console.log("Dữ liệu đọc báo", res);
            this.setState({
                listNews: res,
                isLoading: false
            });
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', padding: 15, position: 'relative', marginTop: 5 }}>
                <Text style={{ color: "black", fontFamily: "Roboto-Bold", fontSize: scale(8 * 4) }}>Đọc báo</Text>
                <FlatList
                    data={this.state.listNews}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("TinTucChiTietHome", { news_link: item ? item.news_link : "" }) }}>
                            <View style={{ width: '100%', height: verticalScale(180), flexDirection: 'row', marginTop: 10, borderBottomColor: "#e1e1e1", borderBottomWidth: 1 }}>
                                <View style={{ width: verticalScale(180), height: verticalScale(180), justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: item.news_image }} style={{ width: verticalScale(160), height: verticalScale(120), borderRadius: scale(10) }} />
                                </View>
                                <View style={{ width: "100%", height: verticalScale(180) }}>
                                    <View style={{ margin: verticalScale(20), width: scale(480)}}>
                                        <View style={{ width: "100%", height: verticalScale(90) }}>
                                            <Text line={2} style={{ color: "black", fontFamily: "Roboto-Regular", fontSize: scale(8 * 4) }}>{item.news_title}</Text>
                                        </View>
                                        <Text style={{ color: "#999999", fontFamily: "Roboto-Regular", fontSize: scale(8 * 3.5) }}>Dân trí</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}
