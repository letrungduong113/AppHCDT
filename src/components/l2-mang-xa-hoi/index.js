import React, { Component } from "react";
import { TouchableOpacity, Image, Modal, ImageBackground, Dimensions, FlatList, Platform, Switch } from "react-native";
import { connect } from "react-redux";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import PropTypes from 'prop-types';
import LineChart from '../user-controls/Charts/LineChart'
import PieChart from '../user-controls/Charts/PieChart'
import PercentBox from '../user-controls/PercentBox'
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn"
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Footer,
    View,

} from "native-base";

import styles from "./styles";
import { scale, verticalScale, moderateScale } from '../../components/user-controls/utilities/Scale'
const deviceWidth = Dimensions.get('window').width;
var bottomHeight = verticalScale(109)
import AppIndicator from "../user-controls/AppIndicator";


var FONT_SIZE_30 = scale(30);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_60 = scale(70);
const win = Dimensions.get("window");

const colors = ['#eb4f4e', '#f28352', '#5694e1', '#c1c1c1']
const title1 = "Biểu đồ tương tác";
const colorLine1 = ['#df7220', '#39F'];
const dataLine1 = [{
    name: "Lượng đề cập",
    data: [
        [Date.UTC(2019, 2, 9), 5],
        [Date.UTC(2019, 3, 6), 10],
        [Date.UTC(2019, 3, 20), 20],
        [Date.UTC(2019, 3, 25), 15],
        [Date.UTC(2019, 4, 4), 30],
        [Date.UTC(2019, 4, 17), 32],
    ]
}, {
    name: "Lương tương tác",
    data: [
        [Date.UTC(2019, 2, 9), 10],
        [Date.UTC(2019, 3, 6), 6],
        [Date.UTC(2019, 3, 20), 14],
        [Date.UTC(2019, 3, 25), 20],
        [Date.UTC(2019, 4, 4), 25],
        [Date.UTC(2019, 4, 17), 28],
    ]
}];
const title2 = "Biểu đồ tích cực";
const colorLine2 = ['green', 'red'];
const dataLine2 = [{
    name: "Lượng tích cực",
    data: [
        [Date.UTC(2019, 2, 9), 5],
        [Date.UTC(2019, 3, 6), 10],
        [Date.UTC(2019, 3, 20), 20],
        [Date.UTC(2019, 3, 25), 8],
        [Date.UTC(2019, 4, 4), 15],
        [Date.UTC(2019, 4, 17), 20],
    ]
}, {
    name: "Lương tiêu cực",
    data: [
        [Date.UTC(2019, 2, 9), 10],
        [Date.UTC(2019, 3, 6), 6],
        [Date.UTC(2019, 3, 20), 14],
        [Date.UTC(2019, 3, 25), 15],
        [Date.UTC(2019, 4, 4), 13],
        [Date.UTC(2019, 4, 17), 8],
    ]
}];

const title3 = "Biểu đồ tròn";
const data3 = [{
    name: 'Lượt xem',
    y: 60,
}, {
    name: 'Bình luận',
    y: 11
}, {
    name: 'Lượt chia sẻ',
    y: 11
}, {
    name: 'Lượt thích',
    y: 5
}, {
    name: 'Đề cập',
    y: 4
}, {
    name: 'Tag',
    y: 7
}
]

export default class MangXaHoiScreen extends Component {
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
            isLoading: false,
            data: [
                {
                    title: 'Goc nhin Alan',
                    content: 'NHỮNG SO SÁNH BẤT TIỆN... Ba thứ không thể che đậy lâu dài',
                    source: 'facebook.com',
                    time: '2019-4-27 12:00',
                    image: require('../../../assets/images/background.png'),
                    mucanhhuong: '6/10'
                },
                {
                    title: 'Báo chí điều tra',
                    content: 'NHỮNG SO SÁNH BẤT TIỆN... Ba thứ không thể che đậy lâu dài',
                    source: 'facebook.com',
                    time: '2019-4-27 12:00',
                    image: require('../../../assets/images/background.png'),
                    mucanhhuong: '6/10'
                },
                {
                    title: 'Báo chí điều tra',
                    content: 'NHỮNG SO SÁNH BẤT TIỆN... Ba thứ không thể che đậy lâu dài',
                    source: 'facebook.com',
                    time: '2019-4-27 12:00',
                    image: require('../../../assets/images/background.png'),
                    mucanhhuong: '6/10'
                },
                {
                    title: 'Báo chí điều tra',
                    content: 'NHỮNG SO SÁNH BẤT TIỆN... Ba thứ không thể che đậy lâu dài',
                    source: 'facebook.com',
                    time: '2019-4-27 12:00',
                    image: require('../../../assets/images/background.png'),
                    mucanhhuong: '6/10'
                },
                {
                    title: 'Báo chí điều tra',
                    content: 'NHỮNG SO SÁNH BẤT TIỆN... Ba thứ không thể che đậy lâu dài',
                    source: 'facebook.com',
                    time: '2019-4-27 12:00',
                    image: require('../../../assets/images/background.png'),
                    mucanhhuong: '6/10'
                },
            ]
        }
    }
    renderComment(data) {
        if (data.length > 0)
            return data.map(data => (
               <View>
                <View style={{width:'100%', height: verticalScale(150), flexDirection: "row"}}>
                        <View style={{flex: 15, justifyContent: "center", alignItems: "center"}}>
                            <Image source={data.image} style={{width: scale(80), height: scale(80), borderRadius: scale(40)}} />
                        </View>

                        <View style={{flex: 65, backgroundColor: 'white', justifyContent: "center"}}>
                            <Text style={{fontSize: scale(24)}} numberOfLines={1}>{data.title}</Text>
                            <Text style={{fontSize: scale(24), color: 'grey'}} numberOfLines={1}>{data.content}</Text>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View style={{flex: 30, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontSize: scale(18), color: 'blue'}}>{data.source}</Text>
                                    <Text style={{fontSize: scale(18), color: 'grey'}}>{data.time}</Text>
                                </View>
                                <View style={{flex: 70, justifyContent: "center", alignItems: "center"}}>
                                    <View style={{width: scale(170), height: scale(10), flexDirection: "row"}}>
                                        <View style={{flex: 60, backgroundColor: 'green'}}></View>
                                        <View style={{flex: 40, backgroundColor: 'grey'}}></View>
                                    </View>
                                    <Text style={{fontSize: scale(18), color: 'grey'}}>Mức ảnh hưởng: {data.mucanhhuong}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 20}}></View>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}}></View>
               </View>
            ));
        else return null;
    }
    render() {
        var total = 0;
        for (var i = 0; i < data3.length; i++) {
            total += data3[i].y
        }
        if (this.state.isLoading) {
            return (
                <AppIndicator />
            )
        }
        else
            return (
                <Container style={styles.container}>
                    <CustomHeader title={GROBAL_RESOUCE.MANG_XA_HOI_TITLE} />
                    <Content style={{ flex: 1, marginBottom: -verticalScale(15) }}>
                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: win.width - 20, paddingVertical: 5 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ebebeb', flex: 1, margin: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                        <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Tổng đề cập</Text>
                                        <Text style={{ color: colors[0], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{Math.floor(Math.random() * 1000) + 1}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ebebeb', flex: 1, margin: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                        <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Lượng tương tác</Text>
                                        <Text style={{ color: colors[1], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{Math.floor(Math.random() * 1000) + 1}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: win.width - 20, paddingBottom: 5 }}>
                                <TouchableOpacity style={{ backgroundColor: '#ebebeb', flex: 1, margin: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                        <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Đề cập tích cực</Text>
                                        <Text style={{ color: colors[2], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{Math.floor(Math.random() * 1000) + 1}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ebebeb', flex: 1, margin: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: verticalScale(10) }}>
                                        <Text style={{ color: '#999999', fontSize: FONT_SIZE_30 }}>Đề cập tiêu cực</Text>
                                        <Text style={{ color: colors[3], fontSize: FONT_SIZE_60, fontFamily: 'Roboto-Bold', fontWeight: 'bold' }}>{Math.floor(Math.random() * 1000) + 1}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <LineChart data={dataLine1} colors={colorLine1} title={title1} />
                        <LineChart data={dataLine2} colors={colorLine2} title={title2} style={{ marginTop: 10 }} />
                        <PieChart data={data3} title={title2} style={{ marginTop: 10 }} />
                        <View style={{ padding: 20 }}>
                            {
                                data3.map((item, i) => {
                                    return (
                                        <PercentBox title={item.name} percent={item.y * 100 / total} value={item.y} style={{ marginTop: 10 }} />
                                    );
                                })
                            }
                        </View>
                        <View style={{  }}>
                            {this.renderComment(this.state.data)}
                        </View>
                    </Content>
                    <Footer style={[{ height: bottomHeight, backgroundColor: 'transparent' }, Platform.OS == 'ios' ? { borderWidth: 0, borderColor: 'transparent' } : {}]}>
                        <View>
                            <CustomTabs2 active='0'></CustomTabs2>
                        </View>
                    </Footer>
                </Container>
            );
    }
}

