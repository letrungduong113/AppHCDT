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
import HomeAPI from "../../../services/api-service/home-api";
import PieChart from '../../user-controls/PieChart'
import Footer, { footerMargin } from '../../user-controls/CustomFooter'
import Text from '../../../components/custom-view/text';
import AutoHeightImage from "react-native-auto-height-image";

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)
const win = Dimensions.get('window');

export default class DocBao extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,  
            listData: [],
            firstItem: {},  
        }
    }

    componentDidMount() {
        HomeAPI.getTinHome(100).then((res)=>{
            // alert(JSON.stringify(res));
            if (res && Array.isArray(res)) {
                firstItem = res.splice(0,1)[0];
                //alert(JSON.stringify(firstItem));
                this.setState({
                    listData: res,
                    isLoading: false,
                    firstItem: firstItem,
                });
            }
            
          });
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} style={{
            backgroundColor: 'white', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
            height: khungHeight, flexDirection: "row"
        }} onPress={() => this.props.navigation.navigate('TinTucChiTietHome', { news_link: item.news_link })} >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                width: "100%"}}>

                <View style={{flex: 73, justifyContent: "center", paddingHorizontal: 10}}>
                    {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}>{item.title}</Text> */}
                    <Text style={{ color: '#333333', fontSize: titleSize }} line={2}>{item.news_title.trim()}</Text>
                    <Text style={{ fontSize: textConlai, color: 'grey' }} line={1}>
                        Ngày đăng: {(item.updated_date)}    
                        {/* {this.getDonViDuAn(item.referInfo)}     |     {item.tenTrangThai} */}
                    </Text>
                </View>

                <View style={{flex: 27, justifyContent: "center", alignItems: "center" }} >
                    <Image source={{uri:item.news_image}} style={{width: scale(160), height: scale(120)}} />
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
                    {/* <TouchableOpacity style={{mả}}>
                    
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('TinTucChiTietHome', { news_link: this.state.firstItem.news_link })}>
                        <View style={{padding: 10, borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}>
                            <AutoHeightImage source={{uri: this.state.firstItem.news_image}} width={win.width -20}/>
                            <Text style={{color: '#333333', fontSize: scale(36)}}>{this.state.firstItem.news_title.trim()}</Text>
                            <Text style={{color: 'grey'}}>Ngày đăng: &nbsp;{this.state.firstItem.updated_date}</Text>
                        </View>
                    </TouchableOpacity>
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
                <CustomHeader title='ĐỌC BÁO' />
                {this.renderItems()}
                <Footer select='0' />
            </Container>
        )
    }

}