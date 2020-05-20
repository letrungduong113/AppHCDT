import React, { Component } from "react";
import {
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    FlatList
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import AppIndicator from '../../user-controls/AppIndicator';
// import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"
import {
    Container,
    Content,
    Input,
    Button,
    Icon,
    View,
} from "native-base";

// import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
// import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api';
// import HanhChinhCongAPI from '../../../services/api-service/hanh-chinh-cong'
// import PieChart from '../../user-controls/PieChart'
import Footer, { footerMargin } from '../user-controls/CustomFooter'
import Text from '../../components/custom-view/text';

var iconSize = scale(50)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(250)

export default class TongHopYKienChiDao extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            listData: [
                {
                    id: 1,
                    title: 'UBND tỉnh Quảng Ninh vừa ra công điện “hỏa tốc” chỉ đạo, tập trung nguồn lực khống chế dịch tả lợn châu Phi',
                    content: 'Bộ phận thực hiện: Sở Giao thông, Sở hành chính, Sở  Y tế, Sở Giáo dục và 5 bộ phận khác',
                    time: '08:00 21/03/2019'
                },
                {
                    id: 2,
                    title: 'UBND tỉnh Quảng Ninh vừa ra công điện “hỏa tốc” chỉ đạo, tập trung nguồn lực khống chế dịch tả lợn châu Phi',
                    content: 'Bộ phận thực hiện: Sở Giao thông, Sở hành chính, Sở  Y tế, Sở Giáo dục và 5 bộ phận khác',
                    time: '08:00 21/03/2019'
                },
                {
                    id: 3,
                    title: 'UBND tỉnh Quảng Ninh vừa ra công điện “hỏa tốc” chỉ đạo, tập trung nguồn lực khống chế dịch tả lợn châu Phi',
                    content: 'Bộ phận thực hiện: Sở Giao thông, Sở hành chính, Sở  Y tế, Sở Giáo dục và 5 bộ phận khác',
                    time: '08:00 21/03/2019'
                },
            ]
        }
    }

    // componentDidMount() {
    //     LinhVucQuanLyAPI.getDuAn(1, 10).then((res) => {
    //         // alert(JSON.stringify(res));
    //         this.setState({ listData: res.newsEntity, defaultlistData: res.newsEntity, isLoading: false });
    //     });
    // }

    _renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} style={{
            backgroundColor: 'white', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
            height: khungHeight, flexDirection: "row"
        }} onPress={() => this.props.navigation.navigate('', { id: item.id })} >
            <View style={{ flex: 15, alignItems: "center", marginTop: scale(30) }} >
                <Image source={
                    // item.icon ? item.icon :
                        require('../../../assets/images/bao-cao-dieu-hanh/tonghopykienchidaolist.png')} style={{ width: iconSize, height: iconSize }} />
            </View>

            <View style={{ flex: 75, justifyContent: "center" }}>
                {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}>{item.title}</Text> */}
                <Text style={{ color: 'black', fontSize: titleSize }} line={3}>{item.title}</Text>
                <Text style={{ fontSize: textConlai, color: 'grey' }} line={2}>
                    {(item.content)}    
                    {/* {this.getDonViDuAn(item.referInfo)}     |     {item.tenTrangThai} */}
                </Text>
                <Text style={{ fontSize: textConlai, color: 'grey' }}>
                    {(item.time)}
                </Text>
            </View>

            <View style={{ flex: 10 }}></View>
        </TouchableOpacity>
    )

    renderItems() {
        // if (this.state.isLoading) {
        //     return (
        //         <AppIndicator />
        //     );
        // }
        if (this.state.listData == '') {
            return (
                <Content style={{ marginBottom: footerMargin }}>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400) }}>
                        <Image
                            source={require("../../../assets/images/search_not_found.png")}
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
                <CustomHeader title='Tổng hợp ý kiến chỉ đạo' />
                <Content>
                    <View>
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
}