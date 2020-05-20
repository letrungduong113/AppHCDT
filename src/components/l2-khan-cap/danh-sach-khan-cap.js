import React, { Component } from "react";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import { Platform, StyleSheet, View, TouchableWithoutFeedback, AsyncStorage, ProgressBarAndroid, Dimensions, ScrollView, TouchableOpacity, Image, StatusBar, ImageBackground, PixelRatio } from 'react-native';
import Text from '../../components/custom-view/text';
import Video from 'react-native-video';
import { Container, Header, Title, Icon, Body, Content, Picker } from "native-base";
import Footer, { footerMargin } from '../user-controls/CustomFooter'
import CustomTabs2 from '../navigation-controls/CustomTabs2';
import CustomHeader from '../user-controls/CustomHeader';
import KhanCapAPI from "../../services/api-service/khan-cap-api";
import AppIndicator from "../user-controls/AppIndicator";
import ThongKeBox, { NEW_CATEGORY, PROCESSING_STATUS } from "../user-controls/ThongKeBox";
import MapView, { Marker } from 'react-native-maps';
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn"

const TAT_CA_LINH_VUC = '0';
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(24);
var margin20 = scale(20);
var margin10 = scale(10);
var IconLocation = scale(40);
var ellipseLocation = scale(80);
const win = Dimensions.get('window');

const LIST_IMAGE = [
    require('../../../assets/images/l2-khan-cap/ic_dichbenh.png'),
    require('../../../assets/images/l2-khan-cap/ic_hinhsu.png'),
    require('../../../assets/images/l2-khan-cap/ic_suco.png'),
    require('../../../assets/images/l2-khan-cap/ic_thientai.png'),
]
const LATITUDEDELTA = 0.07;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export default class DsKhanCapScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.map = null;
        this.state = {
            pageTitle: this.props.navigation.getParam('title') ? this.props.navigation.getParam('title') : GROBAL_RESOUCE.KHAN_CAP_TITLE,
            rate: 1,
            volume: 1,
            muted: true,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            pickerValueHolder: '1.0',
            pickerSelectedItem: TAT_CA_LINH_VUC,
            pausedText: 'Play',
            hideControls: false,
            iconPlay: false,
            poster: '',
            listLinhVuc: [],
            // poster: 'https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg',

            isLoading: true,
            listData: {
                // "size": 41,
                // "newsEntity": [
                //     {
                //         "cateID": 1,
                //         "userID": 22,
                //         "publishUserID": 0,
                //         "orgID": 1,
                //         "icon": require('../../../assets/images/l2-khan-cap/ic_dichbenh.png'),
                //         "sumary": "sumary TuanTV",
                //         "contents": "contents",
                //         "imgLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/8",
                //         "videoLink": "https://r4---sn-n4v7knlz.googlevideo.com/videoplayback?txp=5535432&key=cms1&c=WEB&itag=22&fvip=4&expire=1554227727&lmt=1553918766763586&mime=video%2Fmp4&ip=144.76.70.198&requiressl=yes&signature=4FA35035DDE19CBF5DB41F05D41B136305F22DE7.13CEDD347FE70F494A7E7C8A6B448E8636A470BC&ratebypass=yes&ipbits=0&ei=r02jXLLDEJu-1wKl54KQAw&id=o-AOXwv8J_rxAuzdHPc4L_unCcH0ZROv7bPeku51mf60a0&pl=25&source=youtube&sparams=dur,ei,expire,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&dur=236.054&title=Wolves-Warriors%20Ending%20Most%20Ridiculous%206%20Seconds%20This%20Season&cms_redirect=yes&mip=65.49.126.173&mm=31&mn=sn-n4v7knlz&ms=au&mt=1554206008&mv=m",
                //         "createTime": "2019-04-05T11:53:54.750+0000",
                //         "publishTime": null,
                //         "status": "0",
                //         "referUserID": null,
                //         "referUserName": null,
                //         "referOrgID": null,
                //         "referOrgName": null,
                //         "id": 72, // Id của tin
                //         "idLinhVuc": 0, // Lĩnh vực Sẽ trả thêm tên lĩnh vực
                //         "tenLinhVuc": "Dịch bệnh",
                //         "tieuDe": "Title TuanTV", // Tiêu đề
                //         "trangThai": "0", // Trạng thái -- Sẽ trả thêm Text
                //         "tenTrangThai": "Cần xử lý ngay"
                //     },
                //     {
                //         "cateID": 1,
                //         "userID": 22,
                //         "publishUserID": 0,
                //         "orgID": 1,
                //         "icon1": require('../../../assets/images/l2-khan-cap/ic_dichbenh.png'),
                //         "sumary": "sumary TuanTV",
                //         "contents": "contents",
                //         "imgLink": "http://172.17.0.100:8080/file-manager/file/tin_khan_cap/goc/download/8",
                //         "videoLink": "https://r4---sn-n4v7knlz.googlevideo.com/videoplayback?txp=5535432&key=cms1&c=WEB&itag=22&fvip=4&expire=1554227727&lmt=1553918766763586&mime=video%2Fmp4&ip=144.76.70.198&requiressl=yes&signature=4FA35035DDE19CBF5DB41F05D41B136305F22DE7.13CEDD347FE70F494A7E7C8A6B448E8636A470BC&ratebypass=yes&ipbits=0&ei=r02jXLLDEJu-1wKl54KQAw&id=o-AOXwv8J_rxAuzdHPc4L_unCcH0ZROv7bPeku51mf60a0&pl=25&source=youtube&sparams=dur,ei,expire,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&dur=236.054&title=Wolves-Warriors%20Ending%20Most%20Ridiculous%206%20Seconds%20This%20Season&cms_redirect=yes&mip=65.49.126.173&mm=31&mn=sn-n4v7knlz&ms=au&mt=1554206008&mv=m",
                //         "createTime": "2019-04-05T11:53:54.750+0000",
                //         "publishTime": null,
                //         "status": "0",
                //         "referUserID": null,
                //         "referUserName": null,
                //         "referOrgID": null,
                //         "referOrgName": null,
                //         "id": 72, // Id của tin
                //         "idLinhVuc": 0, // Lĩnh vực Sẽ trả thêm tên lĩnh vực
                //         "tenLinhVuc": "Dịch bệnh",
                //         "tieuDe": "Title TuanTV", // Tiêu đề
                //         "trangThai": "0", // Trạng thái -- Sẽ trả thêm Text
                //         "tenTrangThai": "Cần xử lý ngay"
                //     },
                // ]
            },
            Item: [
                { id: 1, icon: require('../../../assets/images/l2-khan-cap/ic_dichbenh.png'), colorIcon: '#375a94', ratio: 0.5, textRatio: '5%', colorRatio: 'red', title: 'Quảng Ninh khẩn cấp ứng phó với dịch tả lợn Châu Phi', type: 'Dịch bệnh', state: 'Cần xử lý ngay', colorState: 'red' },
            ],
            region: {
                // latitude: 21.0288272,
                // longitude: 105.8343033,
            },

            markers: [
                // {
                //     key: '1',
                //     title: 'hello',
                //     latitude: 21.17844009399414,
                //     longitude: 106.06595611572266,
                //     isHotFillter: 3
                // },
                // {
                //     key: '2',
                //     title: 'hello2',
                //     latitude: 21.114931106567383,
                //     longitude: 105.96138000488281,
                //     isHotFillter: 2
                // },
                // {
                //     key: '3',
                //     title: 'hello3',
                //     latitude: 21.17044009399414,
                //     longitude: 106.06595611572266,
                //     isHotFillter: 2
                // },
                // {
                //     key: '4',
                //     title: 'hello4',
                //     latitude: 21.110931106567383,
                //     longitude: 105.96138000488281,
                //     isHotFillter: 3
                // },
                // {
                //     key: '5',
                //     title: 'hello5',
                //     latitude: 21.120931106567383,
                //     longitude: 105.96138000488281,
                //     isHotFillter: 1
                // },
                // {
                //     key: '6',
                //     title: 'hello6',
                //     latitude: 21.150931106567383,
                //     longitude: 105.96138000488281,
                //     isHotFillter: 1
                // }
            ],
            loadMore: false
        };

        this.video = Video;
        this.filterProcessStatus = PROCESSING_STATUS.TAT_CA;
        this.filterLinhVuc = 0;
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.reloadData();
        });
        KhanCapAPI.getDsLinhVucKhanCap().then((res) => {
            // alert(JSON.stringify(res))
            if (res && res.length) {
                this.setState({ listLinhVuc: res })
            }
        })
    }

    reloadData(loadMore = false) {
        KhanCapAPI.getDsKhanCap(loadMore ? this.state.listData.newsEntity.length / 10 + 1 : 1, 10, this.filterLinhVuc, this.filterProcessStatus).then((res) => {
            //console.log("GET DS Khẩn Cấp Screen", res)
            if (res != null) {
                var listData = this.state.listData;
                if (loadMore) {
                    listData.newsEntity = listData.newsEntity.concat(res.newsEntity);
                }
                this.setState({
                    listData: loadMore ? listData : res, isLoading: false,
                    loadMore: false,
                    //poster: res.nhiemVus[0].poster.uri 
                    poster: res.poster,
                });
            }
        });
        KhanCapAPI.getLocations().then((res) => {
            // alert(JSON.stringify(res));
            if (res != null) {
                this.setState({
                    region: res[0],
                    markers: res
                })
            }
        })
    }
    loadMoreData() {
        this.setState({ loadMore: true })
        this.reloadData(true)
    }
    onFilterLinhVuc(linhvuc) {
        this.filterLinhVuc = linhvuc;
        //this.filterLinhVuc = 0; // Chưa có API nên mặc định chọn bằng 0
        this.setState({ pickerSelectedItem: linhvuc })
        this.reloadData();
    }
    onFilterStatus(status) {
        this.filterProcessStatus = status;
        this.reloadData();
    }
    getColorIdTrangThai(trangThai) {
        switch (trangThai) {
            case "0": // Chua xu ly
                return '#fc7c43';
            case "1": // Dang xu ly
                return '#3d5e8f';
            case "2": // Da xu ly
                return '#999999';
            case "3": // Qua han
                return 'e63534';
            case 4:
                return '#3d5e8f';
            case 5:
                return '#888888';
            case 6:
                return '#888888';
            default:
                return 'red';
        }
    }
    getIconLocation(capdo) {
        switch (capdo) {
            case 2:
                return require('../../../configUI/imageLocation/Location_Green.png');
            case 3:
                return require('../../../configUI/imageLocation/Location_Orange.png');
            case 4:
                return require('../../../configUI/imageLocation/Location_Red.png');
            default:
                return require('../../../configUI/imageLocation/Location_Red.png');
        }
    }
    getColorEclipse(capdo) {
        switch (capdo) {
            case 2:
                return require('../../../configUI/imageLocation/ellipse_Green.png');
            case 3:
                return require('../../../configUI/imageLocation/ellipse_Orange.png');
            case 4:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
            default:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
        }
    }
    // height/width = height_new/width_new
    getHeightRatio(width, width_new, height_new) {
        let height = height_new * width / width_new
        return height
    }

    renderListEmergency(data) {
        if (data.length < 1 || data === undefined)
            return (<View style={{ padding: 10 }}><Text>Không có dữ liệu</Text></View>)
        else {
            return data.map((data, i) => {
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('KhanCapChiTiet', { id: data.id })} key={i}>
                        <View style={[styles.itemts, { width: win.width, height: verticalScale(128) }]}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1.5 }}>
                                {/* <Image source={data.icon} style={{ width: scale(77), height: scale(77), margin: margin20 }} /> */}
                                {/* {console.log("link icon", data.icon)} */}
                                <Image source={data.icon.uri ? data.icon : require('../../../assets/images/default/task.png')} style={{ width: scale(77), height: scale(77), margin: margin20 }} />
                            </View>
                            <View style={{ justifyContent: "center", flex: 10, marginLeft: margin20 }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#3a3a3a", fontStyle: "normal", }} line={2} >
                                        {data.tieuDe}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>{data.tenLinhVuc}  |  </Text>
                                    <Text style={{ fontSize: FONT_SIZE_SUB, color: this.getColorIdTrangThai(data.trangThai) }}>{data.tenTrangThai}</Text>
                                </View>

                            </View>
                            {/* <View style={{ flex: 0.5 }}>

                            </View> */}
                        </View>
                    </TouchableOpacity>
                )
            }
            )
        }
    }
    renderKeyItems(data) {
        //console.log("get KeyItems", data)
        if (data.length < 1 || data === undefined)
            return (<View></View>)
        else {
            let data1 = [data[0]];
            return data1.map((data, i) => {
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('KhanCapChiTiet', { id: data.id })} key={i}>
                        <View style={[styles.itemts, { width: win.width, height: verticalScale(128) }]}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1.5 }}>
                                {/* <Image source={data.icon ? data.icon : { uri: 'http://abc.png' }} style={{ width: scale(77), height: scale(77), margin: margin20 }} /> */}
                                <Image source={data.icon.uri ? data.icon : require('../../../assets/images/default/task.png')} style={{ width: scale(77), height: scale(77), margin: margin20 }} />
                            </View>
                            <View style={{ justifyContent: "center", flex: 10, marginLeft: margin20 }}>
                                <View>
                                    <Text style={{ fontSize: FONT_SIZE_MAIN, color: "#3a3a3a", fontStyle: "normal", }} line={2}>{data.tieuDe}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: FONT_SIZE_SUB, color: "#999999" }}>{data.tenLinhVuc}   |   </Text>
                                    <Text style={{ fontSize: FONT_SIZE_SUB, color: this.getColorIdTrangThai(data.trangThai) }}>{data.tenTrangThai}</Text>
                                </View>

                            </View>
                            <View style={{ flex: 1 }}>

                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    // video is playing
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    // video ends
    onEnd = () => {
        this.setState({ paused: true, pausedText: 'Play' })
        this.video.seek(0);
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    onChangeRate(itemValue, itemIndex) {
        var rate = parseFloat(itemValue);
        this.setState({ pickerValueHolder: itemValue, rate: rate });
    }

    // pressing on 'play' button
    onPressBtnPlay() {
        var pausedText = '';
        if (!this.state.paused) {
            pausedText = 'Play';

            // always show controls
            if (this.timeoutHandle)
                clearTimeout(this.timeoutHandle);
        }
        else {
            pausedText = 'Pause';

            // hide controls after 5s
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 5000);
        }
        this.setState({ paused: !this.state.paused, pausedText: pausedText, poster: '' });
        this.getIconPlay();
    }

    // on press video event
    onPressVideo() {
        // showing controls if they don't show
        if (this.state.hideControls) {
            this.setState({ hideControls: false });
            this.timeoutHandle = setTimeout(() => {
                this.setState({ hideControls: true });
            }, 6000);
        }
    }

    // parse seconds to time (hour:minute:second)
    parseSecToTime(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return hours + ':' + minutes + ':' + seconds;
    }

    getIconPlay() {
        this.setState({
            iconPlay: !this.state.iconPlay
        })
    }
    renderHeader() {
        return (
            <CustomHeader title={this.state.pageTitle}></CustomHeader>
        )
    }
    renderImageOrVideo(data) {
        if (!data) {
            return (
                <AppIndicator></AppIndicator>
            )
        }
        else
            // if (data.posterLinfk==null) {
            //console.log('Lấy ảnh', data.poster)
            return (
                data.poster ?
                    (
                        <View style={{ width: "100%", height: scale(375), marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image source={require('../../../assets/images/l2-khan-cap/l2-chi-tiet/image_button_youtube.png')} style={{ width: scale(115), height: scale(115), position: 'absolute' }} /> */}
                            {/* {console.log("Lấy link ảnh", data.link)} */}
                            <Image source={data.link.uri ? data.link : require('../../../assets/images/search_not_found.png')} style={{ width: "100%", height: "100%" }} />
                        </View>
                    ) :
                    (
                        <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableWithoutFeedback
                                onPress={() => this.onPressVideo()}>
                                <View style={[styles.fullScreen, { height: this.getHeightRatio(win.width, 720, 375) + 20 }]}>
                                    <Video
                                        ref={(ref: Video) => { this.video = ref }}
                                        /* For ExoPlayer */
                                        source={data.link}
                                        //source={{ uri: 'https://rawgit.com/uit2712/Mp3Container/master/tom_and_jerry_31.mp4' }}
                                        //source={require('./videos/video1.mp4')}
                                        style={styles.fullScreen1}
                                        rate={this.state.rate}
                                        // poster={{uri: 'https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg'}}
                                        poster={this.state.poster}
                                        paused={this.state.paused}
                                        volume={this.state.volume}
                                        muted={this.state.muted}
                                        resizeMode={this.state.resizeMode}
                                        onLoad={this.onLoad}
                                        onProgress={this.onProgress}
                                        onEnd={this.onEnd}
                                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                        onAudioFocusChanged={this.onAudioFocusChanged}
                                        repeat={false}
                                    />
                                    {
                                        !this.state.hideControls ?
                                            (
                                                <View style={styles.playControl}>
                                                    {
                                                        !this.state.iconPlay ? (
                                                            <TouchableOpacity onPress={() => this.onPressBtnPlay()}>
                                                                <Image source={require('../../../assets/images/l2-khan-cap/l2-chi-tiet/image_button_youtube.png')} style={{ width: scale(115), height: scale(115) }} />
                                                            </TouchableOpacity>) :
                                                            (
                                                                <TouchableOpacity onPress={() => this.onPressBtnPlay()}>
                                                                    <Icon name="pause" style={{ color: "white", fontSize: 60 }} />
                                                                </TouchableOpacity>
                                                            )
                                                    }
                                                </View>
                                            ) : (null)
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    )
            )
    }

    renderPicker() {
        return (
            <View style={{ borderColor: '#d7d7d7', backgroundColor: '#fafafa', margin: 10, marginTop: 20, borderWidth: 1 }}>
                <Picker mode={"dropdown"}
                    itemTextStyle={{ color: "#3f3f3f", textTransform: 'uppercase' }}
                    selectedValue={this.state.pickerSelectedItem}
                    mode="dropdown"
                    iosHeader="Mời bạn chọn"
                    headerBackButtonText="Hủy"
                    headerBackButtonTextStyle={{ padding: 20 }}
                    headerTitleStyle={{ paddingTop: 20 }}
                    style={{
                        height: this.getHeightRatio(win.width, 682, 72),
                        width: Platform.OS == 'ios' ? scale(340) : "100%"
                    }}
                    onValueChange={(itemValue, itemIndex) => { this.onFilterLinhVuc(itemValue) }}
                >
                    <Picker.Item label="Tất cả lĩnh vực khẩn cấp" value={TAT_CA_LINH_VUC} />
                    {
                        this.state.listLinhVuc.map((item, index) => {
                            return (<Picker.Item label={item.name.replace("\n", "").replace("\r", "")} value={item.id} />)
                        })
                    }
                </Picker>
                {
                    Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, justifyContent: 'center' }}>
                        <Image source={require('../../../images/logo/sortdown.png')}
                            style={{ height: 10, width: 10 }}
                        />
                    </View> : <View />
                }
            </View>
        );
    }
    renderMaps(data) {
        if (data.length != 0)
            return (
                <View style={{ flex: 1 }}>
                    {/* {console.log('Marker Maps', data)} */}
                    <MapView
                        ref={(ref) => { this.map = ref }}
                        style={{ flex: 1 }}
                        region={{
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            latitudeDelta: LATITUDEDELTA,
                            longitudeDelta: LONGITUDEDELTA,
                        }}
                        // onMapReady={() => this.ZoomBounds()}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        onPress={() => this.props.navigation.navigate('Maps', {
                            region: data[0],
                            markers: data,
                            listData: this.state.listData.newsEntity,
                            navigation: this.props.navigation
                        })}
                    >

                        {data.map((marker, i) => (
                            <Marker
                                key={i}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                title={marker.title}
                            >
                                {/* <Image source={this.getIconLocation(marker.isHotFillter)} style={{ height: IconLocation, width: IconLocation, }} /> */}
                                <ImageBackground
                                    source={this.getColorEclipse(marker.isHotFillter)} style={{ height: IconLocation * 2, width: IconLocation * 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={this.getIconLocation(marker.isHotFillter)} style={{ height: IconLocation, width: IconLocation, }} />
                                </ImageBackground>

                            </Marker>
                        ))
                        }
                    </MapView>
                </View>
            )
        else
            return (
                <AppIndicator></AppIndicator>
            )
    }
    ZoomBounds() {
        this.map.fitToCoordinates(this.state.markers, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }
    isScrollEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }
    render() {
        return (
            <Container>
                <View style={[styles.container, { marginBottom: footerMargin }]}>
                    {this.renderHeader()}
                    {
                        this.state.isLoading ? (<AppIndicator></AppIndicator>) :
                            (
                                <Content
                                    onScroll={({ nativeEvent }) => {
                                        if (this.isScrollEnd(nativeEvent) && !this.state.loadMore) {
                                            this.state.loadMore = true;
                                            this.loadMoreData()
                                        }
                                    }}
                                >
                                    <View style={{ height: win.height / 2.5, width: win.width }}>
                                        {this.renderMaps(this.state.markers)}
                                    </View>
                                    {/* <ThongKeBox 
                                        ref = {ref=>this._thongke = ref}
                                        title="vấn đề khẩn cấp" 
                                        catId={NEW_CATEGORY.KHAN_CAP} onFilter={(status, month) => this.onFilterStatus(status, month)}/> */}
                                    <View style={{ marginTop: 10, backgroundColor: 'white' }}>
                                        {this.renderPicker()}
                                        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={{ color: '#217de0' }}>
                                                <Text style={{ fontWeight: '600', fontSize: scale(36), color: 'red' }}>{this.state.listData.size ? this.state.listData.size : 0}</Text>
                                                &nbsp;vấn đề khẩn cấp</Text>
                                        </View>
                                        {this.renderListEmergency(this.state.listData.newsEntity)}
                                        <View style={styles.itemts}></View>
                                    </View>
                                </Content>
                            )
                    }


                </View>
                <Footer style={Platform.OS == 'ios' ? styles.footerIos : styles.footerAndroid}>
                    <View>
                        <CustomTabs2 active='0'></CustomTabs2>
                    </View>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    header: {
        width: win.width,
        height: win.height / 10,
        backgroundColor: 'transparent', borderWidth: 0, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0, elevation: 0
    },
    header_imgBackground: {
        width: win.width,
        height: win.height / 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    controls: {
        backgroundColor: 'white',
        opacity: 0.7,
        borderRadius: 5,
        position: 'absolute',
        //alignItems: 'center',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemts: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: win.width,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
    },

    fullScreen: {
        //position: 'absolute',
        //top: win.height / 10,
        // left: 0,
        // bottom: 0,
        // right: 0,
        backgroundColor: 'black',
        marginTop: scale(10),
        justifyContent: 'center',
        // width: win.width,
        // height: win.width / 2,
        width: scale(720),
        height: verticalScale(375)

    },

    fullScreen1: {
        position: 'absolute',
        // left: 0,
        // bottom: 0,
        // right: 0,
        //backgroundColor: 'red',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    playControl: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerIos: { height: verticalScale(109), backgroundColor: 'transparent', borderTopWidth: 0 },
    footerAndroid: { height: verticalScale(109), backgroundColor: 'transparent', paddingBottom: -10 },
});