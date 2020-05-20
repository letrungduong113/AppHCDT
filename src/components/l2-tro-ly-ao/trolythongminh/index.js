import React, { Component } from "react";
import { WebView, TouchableOpacity, Platform, ImageBackground, Dimensions, Image, FlatList, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { searchData } from './key-map'
import { getStatusBarHeight } from '../../user-controls/utilities/StatusBar';
import { withNavigation } from 'react-navigation';
import Menu from './menu'
import { menuData,menuIcon } from './menu_data'
import {
    scale,
    verticalScale,
    moderateScale
} from "../../user-controls/utilities/Scale";

import {
    Container,
    Content,
    Text,
    View,
    Icon,
    Input,
} from "native-base";
import CustomHeaderChatBot from "../../user-controls/CustomHeader/CustomHeaderChatBot";
import ChatBotService from "../../../services/chat-bot-service";
import TienIchApi from "../../../services/api-service/tien-ich-api";
import LichCongTacAPI from "../../../services/api-service/lich-cong-tac-api";
import SearchAPI from '../../../services/chat-bot-service/index'
import WeatherAPI from '../../../services/api-service/weather-api';
import Voice from 'react-native-voice';
import styles from "./styles";
import KhanCap from "./khan_cap";
import DataSearch from "./data_search";
import LichCongTac from "./lich_cong_tac";
import Choose from './btn_choose';
import LichVanNien from './lich_van_nien';
import Weather from './weather';
import moment from 'moment';
//import Geolocation from 'react-native-geolocation-service';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
let timer = null;
class TroLyAoScreen extends Component {
    static navigationOptions = {
        header: null
    };
    static propTypes = {
        // name: PropTypes.string,
        // setIndex: PropTypes.func,
        // list: PropTypes.arrayOf(PropTypes.string),
        // openDrawer: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isTyping: false,
            inputedText: '',
            contentList: [
                {
                    leftSide: true,
                    content: 'Xin chào! Tôi có thể giúp gì cho bạn?'
                },
            ],
            resultListening: "",
            location: {
                latitude: 0,
                longitude: 0
            },
            listening: false,
            showMenu:true
        }

        // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);

        this.chatBotWeb = null;
    }

    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }
    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    onMessageReceived(message) {
        console.log(message);
        messageData = JSON.parse(message);
        console.log('message', messageData);
        switch (messageData.type) {
            case "text":
                // custom type

                if (this.isJsonString(messageData.content.text.replace("\t", "").replace("\n", ""))) {
                    var data = JSON.parse(messageData.content.text.replace("\t", "").replace("\n", ""));
                    const type = data.type;
                    const content = data.content;
                    const controls = data.controls;
                    var contentList;
                    switch (type) {
                        case 'menu':
                        // contentList =this.state.contentList.concat({leftSide: true,type:type, content:content,controls:controls});
                        // break;
                        // add type
                        this.setState({ showMenu:true})
                        this.refs.flatList1.scrollToEnd();
                        return 
                        case 'khan_cap':
                            contentList = this.state.contentList.concat({ leftSide: true, type: type, content: content, controls: controls });
                            break;
                        case 'choose':
                            contentList = this.state.contentList.concat({ leftSide: true, type: type, content: content, controls: controls });
                            break;
                        case 'lich_van_nien':
                            var day = moment().format('DD/MM/YYYY');
                            TienIchApi.getLichVanNien(day).then((res) => {
                                if (res && res.data) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'lich_van_nien', content: res.data });
                                    this.setState({ contentList: data ,showMenu:false})
                                    this.refs.flatList1.scrollToEnd();
                                }
                            });
                            return;
                        case 'lich_cong_tac_trong_tuan':
                            var dayFirst = moment().startOf('week').format('YYYY/MM/DD');
                            var dayEnd = moment().endOf('week').format('YYYY/MM/DD');
                            LichCongTacAPI.getDsLichCongTac(dayFirst, dayEnd, 1, 30, 2).then((res) => {
                                if (res) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'lich_cong_tac', content: res });
                                    this.setState({ contentList: data,showMenu:false })
                                    this.refs.flatList1.scrollToEnd();
                                }
                            });
                            return;
                        case 'lich_cong_tac_trong_ngay':
                            var day = moment().format('YYYY/MM/DD');
                            LichCongTacAPI.getDsLichCongTac(day, day, 1, 30, 2).then((res) => {
                                if (res) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'lich_cong_tac', content: res });
                                    this.setState({ contentList: data ,showMenu:false})
                                    this.refs.flatList1.scrollToEnd();
                                }
                            });
                            return;

                        case 'lich_cong_tac_trong_tuan':
                            var start = moment().startOf('week').format('YYYY/MM/DD');
                            var end = moment().endOf('week').format('YYYY/MM/DD');
                            LichCongTacAPI.getDsLichCongTac(start, end, 1, 30, 2).then((res) => {
                                if (res) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'lich_cong_tac', content: res });
                                    this.setState({ contentList: data ,showMenu:false})
                                    this.refs.flatList1.scrollToEnd();
                                }
                            });
                            return;
                        case 'search':
                            const item = searchData(data);
                            SearchAPI.search(item, data.search).then((res) => {
                                if (res) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'search', screen: item.category.navigate, content: res.data });
                                    this.setState({ contentList: data ,showMenu:false})
                                    this.refs.flatList1.scrollToEnd();
                                }

                            });
                            return;
                        case 'weather':
                            WeatherAPI.get(this.props.location.latitude, this.props.location.longitude).then((res) => {
                                if (res) {
                                    var data = this.state.contentList.concat({ leftSide: true, type: 'weather', type_weather: content, content: res });
                                    this.setState({ contentList: data ,showMenu:false})
                                }

                            });
                            return;
                    }
                    this.setState({ contentList ,showMenu:false})
                    this.refs.flatList1.scrollToEnd();
                } else {
                    this.setState(state => {
                        var contentList = contentList = state.contentList.concat({ leftSide: true, type: 'text', content: messageData.content.text });
                        return {
                            contentList,
                            showMenu:false
                        };
                    }, () => { this.refs.flatList1.scrollToEnd(); });
                }
            default:
                break;
        }
    };

    componentDidMount() {
        //ChatBotService.registerEventListner("onMessage", this.onMessageReceived);
        ChatBotService.initService();
        ChatBotService.onMessage = this.onMessageReceived.bind(this);
        ChatBotService.sendMessage('Menu');

        //voice 
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        // weather
        // navigator.geolocation.watchPosition(
        //     (position) => {
        //         const location = {
        //             latitude:position.coords.latitude,
        //             longitude:position.coords.longitude,
        //         }
        //         alert(location)
        //         this.state.location = location;
        //         this.setState({location});
        //     },
        //     (error) => {
        //       alert(error.message)
        //         // See error code charts below.
        //         //alert(error.code, error.message);
        //     },
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        // );
    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
        //navigator.geolocation.clearWatch(this.watchId);
        ChatBotService.closeWSS();
        // ChatBotService.close();
    }

    onSpeechEndHandler(e) {
        console.log('end voice')
        //alert( JSON.stringify(e));
        if (Platform.OS === 'ios') {
            timer = null;
            this.setState({ listening: false });
            if (this.state.resultListening != null && this.state.resultListening != '') {
                const rs = this.state.resultListening;
                ChatBotService.sendMessage(rs);
                this.setState(state => {
                    const contentList = state.contentList.concat({ leftSide: false, content: rs });
                    return {
                        contentList,
                        inputedText: '',
                    };
                });
            }
        }
    }

    onSpeechResultsHandler(e) {
        console.log('handle voice')
        if (Platform.OS === 'ios') {
            this.setState({ resultListening: e.value[0] });
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.stopRecording();
            }, 1000);
        } else {
            suggestions = e.value.toString().split(',');
            if (suggestions.length) {
                ChatBotService.sendMessage(suggestions[0]);
                this.setState(state => {
                    const contentList = state.contentList.concat({ leftSide: false, content: suggestions[0] });

                    return {
                        contentList,
                        listening: false,
                        inputedText: '',
                    };
                });
            }
        }
    }

    async startRecording() {
        try {
            await Voice.start('vi-VN');
            console.log('start voice')
        } catch (e) {
            console.error(e);
        }
        this.setState({ listening: true });
    }
    async stopRecording() {
        try {
            await Voice.stop();
            console.log('stop voice')
        } catch (e) {
            console.error(e);
        }
    }

    sendMessage = () => {
        let message = this.state.inputedText;
        if (message.length > 0) {
            ChatBotService.sendMessage(message);
            this.setState(state => {
                const contentList = state.contentList.concat({ leftSide: false, content: state.inputedText });

                return {
                    contentList,
                    inputedText: '',
                };
            });
            this.refs.flatList1.scrollToEnd();
        }

    }

    renderRowBot(item) {
        console.log(item)
        switch (item.type) {
            case 'text':
                return (
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Image source={require("../../../../assets/images/l2-tro-ly-ao/ico_chatbot.png")}
                                style={{ width: scale(64), height: scale(64), marginRight: scale(31) }}></Image>
                            <View style={[styles.leftContentItem, { marginRight: scale(63) }]}>
                                <Text style={styles.leftContentText}> {item.content}</Text>
                            </View>
                        </View>
                    </View>
                );
            // case 'menu':
            //     return <Menu send={(message)=>ChatBotService.sendMessage(message)} data={item}/>
            case 'khan_cap':
                return <KhanCap data={item} />
            case 'search':
                return <DataSearch navigation={this.props.navigation} data={item} />
            case 'choose':
                return <Choose send={(message) => ChatBotService.sendMessage(message)} data={item} />
            case 'lich_van_nien':
                return <LichVanNien data={item} />
            case 'lich_cong_tac':
                return <LichCongTac navigation={this.props.navigation} data={item} />
            case 'weather':
                return <Weather type={item.type_weather} data={item} />

        }
    }
    renderInput() {
        return (
            <View style={styles.bottomGroup}>
                <Input
                    placeholder="Tôi có thể giúp gì cho bạn?"
                    placeholderTextColor="#999999"
                    onFocus={() => this.setState({ isTyping: true })}
                    onBlur={() => this.setState({ isTyping: false })}
                    onEndEditing={this.sendMessage}
                    onChangeText={(text) => this.setState({ inputedText: text })}
                    value={this.state.inputedText}>
                </Input>
                {
                    this.state.isTyping ? (
                        <TouchableOpacity onPress={this.sendMessage} style={{ width: scale(60), height: scale(60) }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="ios-send" style={{ color: '#3d5e8f' }} ></Icon>
                            </View>
                        </TouchableOpacity>
                    )
                        : (
                            <TouchableOpacity onPress={() => this.state.listening ? this.stopRecording() : this.startRecording()} style={{ width: scale(60), height: scale(60) }}>
                                <View style={{
                                    borderRadius: scale(30), borderColor: '#3d5e8f', borderWidth: 1,
                                    flex: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Icon name={this.state.listening ? "ios-pause" : "ios-mic"} style={{ color: '#3d5e8f', fontSize: scale(40) }} ></Icon>
                                </View>
                            </TouchableOpacity>
                        )
                }
            </View>
        )
    }
    renderRow(contentItem) {
        let item = contentItem.item;
        console.log('item', item);
        if (!item.leftSide) {
            return (
                <View style={styles.rightContentItem}>
                    <Text style={styles.rightContentText}>{item.content}</Text>
                </View>
            )
        }
        else {
            return this.renderRowBot(item);
        }
    }

    renderRowMenu = ({ item, index }) => (
        <TouchableOpacity  onPress={()=>this.clickMenuItem(item)}>
            <View style={{alignItems:'center',width:deviceWidth/4.5}}>
                <Image style={{width:scale(100),height:scale(100)}} source={menuIcon[index]} />
                <Text style={{color:'#999999',fontSize:scale(20),marginTop:5} }>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
    clickMenuItem(item){
        switch(item.type){
            case 'bot':
                ChatBotService.sendMessage(item.title)
                return;
            case 'api':

                return;
            case 'navigate':
                return;
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <CustomHeaderChatBot title="TRỢ LÝ THÔNG MINH" source={require('../../../../assets/images/l2-tro-ly-ao/ic_home.png')} goto={() => ChatBotService.sendMessage('menu')}></CustomHeaderChatBot>
                <View style={[styles.bodyContainer, { flex: 1, paddingBottom: scale(100) }]}>
                    {this.state.contentList.length<2 && <Image style={{ position: 'absolute', top: deviceWidth / 2.2, left: deviceWidth * 0.1, right: deviceWidth * 0.1, width: deviceWidth * 0.8, height: deviceWidth * 0.8 }} source={require('../../../../assets/images/l2-tro-ly-ao/img_chat_bot.png')} />}
                    {this.state.showMenu && <View style={{ backgroundColor: 'white', width: deviceWidth, padding: 10}}>
                        <Text style={{padding: 10}}>Chọn chủ đề</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={menuData}
                            renderItem={(item,index) => this.renderRowMenu(item,index)}>
                        </FlatList>
                    </View>}
                    <FlatList ref="flatList1"
                        style={{ paddingLeft: 10, paddingRight: 10, }}
                        onContentSizeChange={() => this.refs.flatList1.scrollToEnd()}
                        data={this.state.contentList}
                        renderItem={(item) => this.renderRow(item)}>
                    </FlatList>
                </View>
                {
                    Platform.OS == 'ios' ?
                        <KeyboardAvoidingView behavior='position' enabled={Platform.OS == 'ios'} keyboardVerticalOffset={getStatusBarHeight(true)} style={[styles.bottomGroup, { paddingLeft: 0, paddingRight: 0 }]}>
                            {this.renderInput()}
                        </KeyboardAvoidingView>
                        : <View>{this.renderInput()}</View>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location.location
});

export default connect(mapStateToProps, null)(withNavigation(TroLyAoScreen));