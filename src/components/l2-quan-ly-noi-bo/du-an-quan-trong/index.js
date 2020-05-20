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
import AppIndicator from '../../user-controls/AppIndicator';
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"
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
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api';
import HanhChinhCongAPI from '../../../services/api-service/hanh-chinh-cong'
import PieChart from '../../user-controls/PieChart'
import Footer, { footerMargin } from '../../user-controls/CustomFooter'
import Text from '../../../components/custom-view/text';

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class DuAnQuantrong extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { text: '', isLoading: true, data_soNganh: [], soNganh: [], listData: [] }
    }

    componentDidMount() {
        LinhVucQuanLyAPI.getDuAn(1, 10).then((res) => {
            // alert(JSON.stringify(res));
            this.setState({ listData: res.newsEntity, defaultlistData: res.newsEntity, isLoading: false });
        });
    }

    getDonViDuAn(value) {
        if (value == null || value == '') {
            return ""
        } else {
            var arr = value.split(";");
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].slice(-1) == "1") {      //So với 1
                    arr[i] = arr[i].slice(0, -2)    //Cắt 2 phần tử
                    return arr[i];
                }
            }
            return ""
        }
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} style={{
            backgroundColor: 'white', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
            height: khungHeight, flexDirection: "row"
        }} onPress={() => this.props.navigation.navigate('ChiTietDuAn', { id: item.id })} >
            <View style={{ flex: 15, justifyContent: "center", alignItems: "center" }} >
                <Image source={
                    item.icon ? item.icon :
                        require('../../../../assets/images/l2-linh-vuc-quan-ly/daqt_active.png')} style={{ width: iconSize, height: iconSize }} />
            </View>

            <View style={{ flex: 75, justifyContent: "center" }}>
                {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}>{item.title}</Text> */}
                <Text style={{ color: 'black', fontSize: titleSize }} line={2}>{item.tieuDe}</Text>
                <Text style={{ fontSize: textConlai, color: 'grey' }} line={1}>
                    Chủ đầu tư: {this.getDonViDuAn(item.referInfo)}    
                    {/* {this.getDonViDuAn(item.referInfo)}     |     {item.tenTrangThai} */}
                </Text>
            </View>

            <View style={{ flex: 10 }}></View>
        </TouchableOpacity>
    )

    renderItems() {
        if (this.state.isLoading) {
            return (
                <AppIndicator />
            );
        }
        if (this.state.listData == '') {
            return (
                <Content style={{ marginBottom: footerMargin }}>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400) }}>
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
            <Content style={{ marginBottom: footerMargin }}>
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
        return (
            <Container>
                <CustomHeader title={GROBAL_RESOUCE.SU_KIEN_QUAN_TRONG_TITLE} />
                <Content>
                    <View>
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
                                    listData: this.state.defaultlistData.filter(unit => unit.tieuDe.includes(text)),
                                })}
                                underlineColorAndroid="transparent"
                                placeholder="Tìm kiếm"
                            />
                        </View>
                        <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: 'white', position: "relative", borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: scale(30), color: '#217de0', position: 'absolute', right: 15 }}>
                                {this.state.listData.length} dự án trọng điểm
                        </Text>
                        </View>
                        <FlatList
                            data={this.state.listData}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={this._renderItem}
                            numColumns={1}
                        />
                    </View>
                </Content>
            </Container>
        );
    }

    render() {
        return (
            <Container>
                <CustomHeader title={GROBAL_RESOUCE.BAO_CAO_DU_AN_TRONG_DIEM_TITLE_DETAIL} />
                {this.renderItems()}
                <Footer select='0' />
            </Container>
        )
    }

}