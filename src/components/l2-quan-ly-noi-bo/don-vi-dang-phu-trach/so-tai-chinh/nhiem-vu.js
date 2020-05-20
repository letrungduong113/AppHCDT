import React, { Component } from "react";
import {
    scale,
    verticalScale,
    moderateScale
} from "../../../user-controls/utilities/Scale";
import {
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Dimensions,
    Image,
    Platform,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import Text from '../../../../components/custom-view/text';
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
    Footer,
    View,
    Item
} from "native-base";
import {convertDate} from '../../../user-controls/utilities/converter'
import LinhVucQuanLyAPI from "../../../../services/api-service/linh-vuc-quan-ly-api";
import AppIndicator from "../../../user-controls/AppIndicator";
FONT_SIZE_MAIN = scale(26);
FONT_SIZE_SUB = scale(22);
export default class NhiemVu extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            dsNhiemVuGiao: [],
            dsNhiemVuNhan: [],
            data_picker: 1,
            isLoading: true,
            task_type: true, //true = nhận nhiệm vụ, false = giao nhiệm vụ,
            showAll1: false,
            showAll2: false,
            token: this.props.navigation.getParam('token'),
            id: this.props.navigation.getParam('id')
        };
    }

    componentDidMount() {
        // alert(this.state.token)
        LinhVucQuanLyAPI.getDanhSachNhiemVuNhan(1, 20, this.state.token).then(res => {
            //alert(JSON.stringify(this.state.token))
            this.setState({
                dsNhiemVuNhan: res.data, isLoading: false
            });
            // alert(JSON.stringify(res.data))
        });
        LinhVucQuanLyAPI.getDanhSachNhiemVuGiao(1, 20, this.state.token).then(res => {
            //alert(JSON.stringify(this.state.token))
            this.setState({
                dsNhiemVuGiao: res.data, isLoading: false
            });
            // alert(JSON.stringify(res.data))
        });
    }

    listItems1(value) {
        var data = value.slice(0,this.state.showAll1?value.length:3);
        // var data = value;
        return data.map((data, i) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor:"white",
                        width: "100%",
                        height: scale(140),
                        flexDirection: "row",
                        borderBottomColor: "lightgrey",
                        borderBottomWidth: 0.5
                    }}
                    key={i}
                    onPress={() => {
                        this.props.navigation.navigate('NhiemVuChiTietLVQL', {task_type: true, task_ID: data.id, token: this.state.token, trangThaiId: data.trangThai })
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
                            style={{
                                width: scale(77),
                                height: scale(77)
                            }}
                            source={data.icon ? data.icon : require('../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png')}
                        />
                    </View>
                    {/* todo here */}
                    <View style={{ flex: 6, justifyContent: "center" }}>
                        <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }} line={2}>
                            {data.title} 
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                    borderRightColor: "lightgrey",
                                    borderRightWidth: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        marginRight: 10,
                                        fontSize: FONT_SIZE_SUB,
                                        color: "#888888"
                                    }}
                                >
                                    {convertDate(data.publishTime)}
                                </Text>
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{
                                        fontSize: FONT_SIZE_SUB,
                                        color: 'black'
                                    }}
                                >
                                    {data.tenTrangThai}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                    </View>
                </TouchableOpacity>
            );
        });
    }

    listItems2(value) {
        var arr = value.slice(0,this.state.showAll1?value.length:3);
        // var data = value;
        return arr.map((data, i) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor:"white",
                        width: "100%",
                        height: scale(140),
                        flexDirection: "row",
                        borderBottomColor: "lightgrey",
                        borderBottomWidth: 0.5
                    }}
                    key={i}
                    onPress={() => {
                        this.props.navigation.navigate('NhiemVuChiTietLVQL', {task_type: false, task_ID: data.id, token: this.state.token, trangThaiId: data.trangThai })
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
                            style={{
                                width: scale(77),
                                height: scale(77)
                            }}
                            source={data.icon ? data.icon : require('../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/icon.png')}
                        />
                    </View>
                    
                    <View style={{ flex: 6, justifyContent: "center" }}>
                        <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}  line={2}>
                            {data.title}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                    borderRightColor: "lightgrey",
                                    borderRightWidth: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        marginRight: 10,
                                        fontSize: FONT_SIZE_SUB,
                                        color: "#888888"
                                    }}
                                >
                                    {convertDate(data.publishTime)}
                                </Text>
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{
                                        fontSize: FONT_SIZE_SUB,
                                        color: 'black'
                                    }}
                                >
                                    {data.tenTrangThai}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                    </View>
                </TouchableOpacity>
            );
        });
    }

    xemTatCa() {
        return(
            <View>
                <Text style={{margin: 10}}>Nhận nhiệm vụ</Text>
                {this.state.dsNhiemVuNhan.length == 0 ? 
                
                <Content style={{marginBottom:10}}>
                <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(20)}}>
                  <Image
                    source={require("../../../../../assets/images/search_not_found.png")}
                    style={{ width: scale(198), height: scale(198) }}
                  />
                  <Text
                    style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
                  >
                    Không có dữ liệu
                  </Text>
                </View>
                </Content> :
                
                <View>{this.listItems1(this.state.dsNhiemVuNhan)}</View>}
                
                <TouchableOpacity onPress={()=>this.setState({showAll1:!this.state.showAll1})}
                style={{backgroundColor:"white",
                width: "100%",
                height: scale(140),
                display: this.state.dsNhiemVuNhan.length <= 3 ? 'none' : 'flex',
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "lightgrey",
                borderBottomWidth: 0.5}}>
                    <Text>{!this.state.showAll1?'Xem tất cả':'Ẩn bớt'}</Text>
                </TouchableOpacity>
                
                <Text style={{margin: 10}}>Giao nhiệm vụ</Text>
                {this.state.dsNhiemVuGiao.length == 0 ? 
                
                <Content style={{marginBottom:10}}>
                <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(20)}}>
                  <Image
                    source={require("../../../../../assets/images/search_not_found.png")}
                    style={{ width: scale(198), height: scale(198) }}
                  />
                  <Text
                    style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
                  >
                    Không có dữ liệu
                  </Text>
                </View>
                </Content> :
                
                <View>{this.listItems2(this.state.dsNhiemVuGiao)}</View>}
                <TouchableOpacity onPress={()=>this.setState({showAll1:!this.state.showAll1})}
                style={{backgroundColor:"white",
                width: "100%",
                height: scale(140),
                display: this.state.dsNhiemVuGiao.length <= 3 ? 'none' : 'flex',
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "lightgrey",
                borderBottomWidth: 0.5}}>
                    <Text>{!this.state.showAll1?'Xem tất cả':'Ẩn bớt'}</Text>
                </TouchableOpacity>
            </View>
           
        )
    }

    render() {
        return (
            <ScrollView>
                <ScrollView>
                    {this.xemTatCa()}
                </ScrollView>
                {/* <Text style={{margin: 10}}>Giao nhiệm vụ</Text>
                <ScrollView>
                    {this.listItems(this.state.dsNhiemVu)}
                </ScrollView> */}
            </ScrollView>
        )
    }
}

