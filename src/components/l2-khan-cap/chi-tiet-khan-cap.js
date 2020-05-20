import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Platform, KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, WebView,
    ImageBackground, Dimensions, ScrollView, TouchableOpacity, Image, FlatList, Modal, TextInput, PixelRatio
} from 'react-native';
import Video from 'react-native-video';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right, Footer, Text } from "native-base";
import CustomHeader from '../user-controls/CustomHeader';
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import KhanCapAPI from "../../services/api-service/khan-cap-api";
import CTKPTienTrinhScreen from "./chi-tiet-khan-cap-tien-trinh";
// import Text from '../../components/custom-view/text';
import moment from "moment";
import AppIndicator from "../user-controls/AppIndicator";
import CommandIdeaBox, { COMMAND_TYPE } from "../user-controls/CommandIdeaBox";
import CommandIdeaBox2 from "../user-controls/CommandIdeaBox2";
import AttachmentsBox from "../user-controls/AttachmentsBox";
import ProgressListBox from "../user-controls/ProgressListBox";
import {convertTime, convertDate} from "../user-controls/utilities/converter";
import MapView, { Marker } from 'react-native-maps';
import HtmlText from "../user-controls/HtmlText";
import SpeakerBox from "../user-controls/SpeakerBox";

var IMG_YOUTUBE = require('../../../assets/images/l2-khan-cap/l2-chi-tiet/image_button_youtube.png');
var FONT_SIZE_SUB = scale(24);
var margin22 = scale(22);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_28 = scale(28);
const region = {
    latitude: 21.122477,
    longitude: 106.103911,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}
var size24 = scale(24);
var size26 = scale(26);
const win = Dimensions.get('window');

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
var IconLocation = scale(40);
const LATITUDEDELTA = 0.0922;
const LONGITUDEDELTA = 0.0421;
class ChiTietKhanCapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    formatBoPhanThucHien(value) {
        if (value == null || value == '') {
            return ""
        }
        // }else{
        //   let textFormat= ''
        //   var arr = value.split(";");
        //   for(let i = 0;i<arr.length-1;i++){
        //     arr2 = arr[i].split(",")
        //     textFormat += arr2[0] + ", "
        //   }
        //   textFormat = textFormat.slice(0,-2)

        value = value.replace("\r\n", "")
        value = value.replace("\r\n\r\n", "")
        value = value.replace("\r\n\r\n", "")
        return value;
    }

    constructor(props) {
        super(props);
        this.map = null;
        this.state = {
            khancapId: this.props.navigation.state.params ? this.props.navigation.state.params.id : 0,
            rate: 1,
            volume: 1,
            muted: true,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            pickerValueHolder: '1.0',
            pausedText: 'Play',
            hideControls: false,
            iconPlay: false,
            poster: 'https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg',
            testDsVideo: [
                { videoLink: 'https://img.thuthuatphanmem.vn/uploads/2018/10/09/hinh-anh-thien-nhien-bien-dao-dep-nhat_041755353.jpg', posterLink: null },
                { videoLink: 'https://img.thuthuatphanmem.vn/uploads/2018/10/09/hinh-anh-thien-nhien-bien-dao-dep-nhat_041755353.jpg', posterLink: "https://i.pinimg.com/originals/a8/45/76/a84576a04c1874304735604d9f47d5a4.jpg" },
                { videoLink: 'https://img.thuthuatphanmem.vn/uploads/2018/10/09/hinh-anh-thien-nhien-bien-dao-dep-nhat_041755353.jpg', posterLink: "https://i.pinimg.com/originals/a8/45/76/a84576a04c1874304735604d9f47d5a4.jpg" },
            ],
            firstImage: null,
            isLoading: false,
            listData: {
                // "cateID": 1,
                // "userID": 5,
                // "publishUserID": 2,
                // "orgID": 1,
                // "title": "t", // Tiêu đề
                // "sumary": "s", // Nơi xả ra sự việc
                // "contents": "c", // Nội dung
                // "imgLink": "i",
                // "videoLink": "v",
                // "createTime": "2019-04-04T15:04:06.307+0000", // Thời hạn
                // "publishTime": null,
                // "status": "0",
                // "referUserID": null,
                // "referUserName": null,
                // "referOrgID": null,
                // "referOrgName": "Quảng NinhSmart Universe ProjectSở tài chính", // Các bộ ngành liên quan
                // "id": 12,
                // "idLinhVuc": 1,// Lĩnh vực Sẽ trả thêm tên lĩnh vực
                // "tenLinhVuc": "Dịch bệnh",
                // "trangThai": null,// Trạng thái -- Sẽ trả thêm Text
                // "tenTrangThai": "Cần xử lý ngay"

            },
            getComment: {},
            dsCacSo: [],
            selectedSo: {},
            checkboxThuocNhomViecGap: true,
            xemThem: false,
            uploadedFiles: [],
            testBaoCaoList: [{
                contentType: 'doc',
                name: 'tên',
                uploader: 'acbc',
                uploadedTime: 'adsfdsfds'
            }],
            region: {
                latitude: 21.1784397,
                longitude: 106.0659577,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },

            markers: [
                //     {
                //     key: '1',
                //     title: 'hello',
                //     latitude: 21.1784397,
                //     longitude: 106.0659577,
                // }
            ],
            noiDungHtml: '',
        };

    }
    // {uri: 'dfjghdfkjghdf' get'dsgfdsbhgfjdh} -> {url: 'sdafdasfdasf}
    componentWillMount() {

        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            if (this._tientrinh) {
              this._tientrinh.refreshData();
            }
          });

        let id = Number(this.state.khancapId);
        // alert(id)
        KhanCapAPI.getDsKhanCapChiTietNoiDung(id).then((res) => {
            if (res != null) {
                KhanCapAPI.getKhanCapImages(id).then((res2) => {
                    if (res2) {
                        fImage = res2[0];
                        res2.splice(0, 1);
                        res.fileDinhKems = res2;
                        this.setState({ listData: res, firstImage: fImage, isLoading: false }
                            , () => {
                                if (res.trangThai == 2) {
                                    if (this._tientrinh)
                                        this._tientrinh.updateTrangThai(true);
                                }
                            });
                        if (this._ideaBox) {
                            this._ideaBox.updateOrgRef(res.referOrgID)
                            this._ideaBox.updateDate2(res.publishTime)
                        }
                        if (this._ideaBoxXin) {
                            this._ideaBoxXin.updateOrgRefStr(res.referOrgID)
                        }
                    }
                });
            }

            // alert(JSON.stringify(res));
        });
        KhanCapAPI.getLocationDetail(id).then((res) => {
            if (res != null) {
                //console.log('GetLocationDetail', res)
                this.setState({ markers: res })
            }
        });
    }
    getColorIdTrangThai(trangThai) {
        switch (trangThai) {
            case "0":
                return '#fc7c43';
            case "1":
                return '#3d5e8f';
            case "2":
                return 'red';
            case "3":
                return '#3d5e8f';
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
        switch (capdo - 1) {
            case 1:
                return require('../../../configUI/imageLocation/Location_Green.png');
            case 2:
                return require('../../../configUI/imageLocation/Location_Orange.png');
            case 3:
                return require('../../../configUI/imageLocation/Location_Red.png');
            default:
                return require('../../../configUI/imageLocation/Location_Red.png');
        }
    }
    getColorEclipse(capdo) {
        switch (capdo - 1) {
            case 1:
                return require('../../../configUI/imageLocation/ellipse_Green.png');
            case 2:
                return require('../../../configUI/imageLocation/ellipse_Orange.png');
            case 3:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
            default:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
        }
    }
    getHeightRatio(width, width_new, height_new) {
        let height = height_new * width / width_new
        return height
    }

    // renderProcess(data) {
    //     if (data.length < 1 || data === undefined)
    //         return (<View></View>)
    //     else {
    //         return data.map((data, i) => {
    //             return (
    //                 <View style={{ marginLeft: 15, marginTop: 10, width: "100%", flexDirection: 'row' }} key={i}>
    //                     <View style={{ flex: 1 }}>
    //                         <View style={{ borderRadius: 100, borderColor: '#cc4b4c', borderWidth: 1, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
    //                             <Text style={{ fontSize: 20, color: '#cc4b4c' }}>{data.id}</Text>
    //                         </View>
    //                     </View>
    //                     <View style={{ flex: 8.5 }}>
    //                         <View>
    //                             <Text style={{ fontSize: FONT_SIZE_SUB, color: '#ef743e', }}>
    //                                 {data.datetime}
    //                             </Text>
    //                         </View>
    //                         <View style={{}}>
    //                             <Text style={{ marginRight: 20, fontSize: FONT_SIZE_SUB }}>
    //                                 {data.text}
    //                             </Text>
    //                         </View>
    //                     </View>
    //                     <View style={{ width: 5 }}></View>
    //                 </View>
    //             )
    //         })
    //     }
    // }

    /* Xử lý video */
    // load video event
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

    postYKienChiDao = async (response) => {
        //response = await KhanCapAPI.postChiDao(body);

        if (response && response.message == "SUCCESS") {
            //console.log(this.state.ctrlTienTrinh);
            if (this._tientrinh) {
                this._tientrinh.refreshData();
                this._tientrinh.updateTrangThai(false)
            }
        }
        //return response;
    }

    renderHeader(cateTypeID) {
        // alert(cateTypeID)
        return (
            <CustomHeader title="Nội dung chi tiết" source={require("../../../assets/images/l2-khan-cap/l2-chi-tiet/call.png")} goto={() => this.props.navigation.navigate("ChiDaoNhanSu", { cateTypeID: cateTypeID })} ></CustomHeader>
        )
    }
    //Hiển thị list ảnh bên dưới ảnh lớn
    renderFlatListImage(data) {
        return (
            (data === undefined || data.length < 1) ? (<View />) :
                (
                    <FlatList
                        data={data}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            item.posterLink == null ? (
                                <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('CusVideo', { data: { link: item.videoLink, laVideo: false, poster: item.poster } })}>
                                    <View style={{ width: scale(220), height: verticalScale(130), marginLeft: 5 }}>
                                        <Image source={item.videoLink} style={{ width: "100%", height: "100%" }} />
                                    </View>
                                </TouchableOpacity>
                            ) :
                                (
                                    <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('CusVideo', { data: { link: item.videoLink, laVideo: false, poster: item.poster } })}>
                                        <View style={{ width: scale(220), height: verticalScale(130), marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={item.poster} style={{ width: "100%", height: "100%" }} />
                                            <Image source={IMG_YOUTUBE} style={{ width: scale(30), height: scale(30), position: 'absolute' }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                        )}
                    />
                )
        )
    }

    renderTienTrinh(data) {
        return (<View>
            <CTKPTienTrinhScreen ref={ref => { this.setState({ ctrlTienTrinh: ref }) }}
            //dataTienTrinh = {data.tienTrinhs.tienTrinhs}
            />
        </View>)
    }
    //Hiển thị ảnh đâu tiên
    renderAnhDauTien(firstImage) {
        return (
            (!firstImage) ?
                (<View />) :
                (
                    (firstImage.posterLink === undefined || firstImage.posterLink == null) ? (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CusVideo', { data: { link: firstImage.videoLink, laVideo: false, poster: firstImage.poster } })}>
                            <View style={{ width: win.width, height: verticalScale(375) }}>
                                <Image source={firstImage.videoLink} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </TouchableOpacity>
                    ) :
                        (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CusVideo', { data: { link: firstImage.videoLink, laVideo: false, poster: firstImage.poster } })}>
                                <View style={{ width: win.width, height: verticalScale(375), justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={firstImage.poster} style={{ width: '100%', height: '100%' }} />
                                    <Image source={IMG_YOUTUBE} style={{ width: scale(115), height: scale(115), position: 'absolute' }} />
                                </View>
                            </TouchableOpacity>
                        )
                )
        )
    }
    ZoomBounds() {
        this.map.fitToCoordinates(this.state.markers, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }
    renderMaps(data) {
        if (data.length != 0)
            return (
                <View style={{ height: verticalScale(180), width: win.width }}>
                    {/* {console.log('data Maps', data)} */}
                    <MapView
                        ref={(ref) => { this.map = ref }}
                        style={{ flex: 1 }}
                        // initialRegion={this.state.region}
                        region={{
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            latitudeDelta: LATITUDEDELTA,
                            longitudeDelta: LONGITUDEDELTA,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        onMapReady={() => this.ZoomBounds()}
                        onPress={() => this.props.navigation.navigate('Maps', { region: data[0], markers: data })}
                    >
                        {data.map(marker => (
                            <MapView.Marker
                                key={marker.key}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                            // title={data.title}
                            >
                                <ImageBackground
                                    source={this.getColorEclipse(marker.isHotFillter)} style={{ height: IconLocation * 2, width: IconLocation * 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={this.getIconLocation(marker.isHotFillter)} style={{ height: IconLocation, width: IconLocation, }} />
                                </ImageBackground>
                            </MapView.Marker>
                        ))
                        }
                    </MapView>
                </View>
            )
        else
            return (
                <View style={{ height: verticalScale(180), width: win.width }}>
                    {/* {console.log('data Maps', data)} */}
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        onPress={() => this.props.navigation.navigate('Maps', { region: region, markers: data })}
                    >
                    </MapView>
                </View>
            )
    }

    formatUser(value) {
        // alert(value.length)
        if (value == null || value == "" || value === undefined) return [];
        // let arr = value.split(",");
        // if (arr) {
        //     arr.splice(arr.length - 1, 1)
        //     return arr;
        // }
        return value
    }

    xinYKienChiDao = async (response) => {
        if (response && response.message == "SUCCESS") {
            //console.log(this.state.ctrlTienTrinh);
            if (this._tientrinh) {
                this._tientrinh.refreshData();
                this._tientrinh.updateTrangThai(false)
            }
        }
    }


    render() {
        return (
            <Container>
                {/* <KeyboardAvoidingView style={styles.container} behavior='padding' enabled={Platform.OS == 'ios'}> */}
                    {/* {// alert(this.state.listData.referOrgID )} */}

                    {/* <CommandIdeaBox2
                        ref={ref => { this._ideaBoxXin = ref }}
                        itemId={this.state.id} ideaType={COMMAND_TYPE.VAN_BAN_DI}
                        referUserID={this.state.listData.referUserID ? this.state.listData.referUserID : []}
                        referIDSelectSo={this.state.listData.referOrgID
                        }
                        ngayhieuluc={this.state.listData.publishTime ? this.state.listData.publishTime : ""}
                        orgID={this.state.listData.orgID ? this.state.listData.orgID : 0}
                        postCallBack={this.xinYKienChiDao}
                    />
                    
                    <CommandIdeaBox
                        ref={ref => { this._ideaBox = ref }}
                        itemId={this.state.khancapId} ideaType={COMMAND_TYPE.KHAN_CAP}
                        referIDSelectSo={this.state.listData.referOrgID ? this.state.listData.referOrgID : []}
                        referUserID={this.state.listData.referUserID ? this.state.listData.referUserID : []}
                        orgID={this.state.listData.orgID ? this.state.listData.orgID : 0}
                        postCallBack={this.postYKienChiDao} /> */}
                        {this.renderHeader(this.state.listData.idLinhVuc)}
                    <Content>
                    {
                        this.state.isLoading
                            // && this.state.listData && this.state.listData.fileTinKhanCapEntity == null 
                            ?
                            (
                                <AppIndicator></AppIndicator>
                            ) :
                            (
                                <View>
                                <ScrollView>
                                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                                        {/* {this.renderMaps(this.state.markers)} */}
                                        <View style={{}}>
                                            {/* {alert(JSON.stringify(this.state.listData))} */}
                                            <View style={{ margin: margin22, }}>
                                                <Text style={{ fontSize: scale(32), fontFamily: 'Roboto-Regular', color: '#333333' }}>
                                                    {this.state.listData.tieuDe}
                                                </Text>
                                                {/* <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.text, { color: '#666666' }]}>Thêm bởi: {this.state.listData.fullName}</Text>
                                                </View> */}
                                                <Text style={[styles.text, { color: '#666666' }]}>Thời gian: {moment(this.state.listData.createTime).format('L')} {moment(this.state.listData.createTime).format('HH:mm')}   </Text>

                                                <Text style={[styles.text, { color: '#666666' }]}>Thực hiện:  {this.state.listData.orgName}</Text>
                                                {/* <Text style={[styles.text, { color: '#666666' }]}>Phối hợp:
                                                        <Text style={[styles.text, { color: '#666666' }]}> {this.formatBoPhanThucHien(this.state.listData.referOrgName)}
                                                    </Text>
                                                </Text> */}
                                                <Text style={[styles.text, { color: '#666666' }]}>Thời hạn hoàn thành: {moment(this.state.listData.publishTime).format('L')}</Text>
                                                {/* <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.text, { color: '#666666' }]}>Tình trạng:  </Text>
                                                    <Text style={[styles.text, { color: this.getColorIdTrangThai(this.state.listData.trangThai) }]}> {this.state.listData.tenTrangThai} </Text>
                                                </View> */}
                                            </View>

                                            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                {/* xử lý video */}
                                                {this.renderAnhDauTien(this.state.firstImage)}

                                            </View>
                                            {/* {console.log("GỌI LIST IMGAE",this.state.listData)} */}
                                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                                {this.renderFlatListImage(this.state.listData.fileDinhKems)}
                                            </View>
                                            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                                                {/* <WebView ref={'webview'}
                                                    automaticallyAdjustContentInsets={false}
                                                    style={{width: win.width, backgroundColor:'red'}}
                                                    html={"<h1>Hello</h1>"} /> */}
                                                <Text style={{ color: "black", fontSize: scale(30) }}>Cập nhật tình hình giải quyết</Text>
                                            </View>
                                            <View style={{ margin: 10, flexWrap: 'wrap' }}>
                                                <HtmlText source={this.state.listData.contents}  onLoaded={(text)=> {this.setState({noiDungHtml: text})}}></HtmlText>
                                                {/* <Text line={this.state.xemThem ? 0 : 3} style={{ color: '#333333', marginTop: 10, fontSize: size26 }}>
                                                    {this.state.listData.contents}
                                                </Text> */}

                                                {/* {!this.state.xemThem && this.state.listData.contents != null ?
                                                    (
                                                        <TouchableOpacity onPress={() => this.setState({ xemThem: true })}>
                                                            <Text style={{ color: '#3c7bd9', fontSize: size26 }}>Xem thêm</Text>
                                                        </TouchableOpacity>
                                                    ) :
                                                    (
                                                        <TouchableOpacity onPress={() => this.setState({ xemThem: false })}>
                                                            <Text style={{ color: '#3c7bd9', fontSize: size26 }}>Ẩn bớt</Text>
                                                        </TouchableOpacity>
                                                    )
                                                } */}
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', height: verticalScale(16), backgroundColor: '#f6f6f6' }}>
                                        </View>
                                        <AttachmentsBox itemId={this.state.khancapId} callBackFunc={() => { }}></AttachmentsBox>
                                        <View style={{ width: '100%', height: verticalScale(16), backgroundColor: '#f6f6f6' }}>
                                        </View>
                                        <ProgressListBox itemId={this.state.khancapId} ref={ref => { this._tientrinh = ref }}></ProgressListBox>
                                    </View>
                                </ScrollView>
                                </View>
                            )
                    }
                    </Content>
                    {this.state.listData && this.state.listData.tieuDe ?(<SpeakerBox contents={[this.state.listData.tieuDe, this.state.noiDungHtml]} top={scale(120)} />) : (<View />)}
                    {/* BTN Ý KIẾN CHỈ ĐẠO */}
                    <View
                        style={{
                            width: "100%",
                            height: verticalScale(106),
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 5,
                            padding: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "white",
                            flexDirection: "row"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                margin: 10,
                                height: verticalScale(72),
                                borderTopColor: "lightgrey",
                                borderTopWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#375a8e",
                                flexDirection: "row"
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("ChiDaoScreen", {
                                    id: this.state.khancapId,
                                    referUserID: this.state.listData.referUserID ? this.formatUser(this.state.listData.referUserID) : [],
                                    referIDSelectSo: this.formatUser(this.state.listData.referOrgID),
                                    //  ? this.state.data.referOrgID : []
                                    ngayhieuluc: this.state.listData.publishTime ? convertDate(this.state.listData.publishTime) : "",
                                    orgID: this.state.listData.orgID ? this.state.listData.orgID : 0
                                });
                            }}>
                            <Text
                                style={{ color: "white", marginLeft: 10, fontSize: FONT_SIZE_28, fontWeight: '800' }}
                            >
                                CHỈ ĐẠO
            </Text>
                        </TouchableOpacity>

                        {this.props.userID == 10022 ? <View></View> : <TouchableOpacity
                            style={{
                                flex: 1,
                                margin: 10,
                                height: verticalScale(72),
                                borderTopColor: "lightgrey",
                                borderTopWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#375a8e",
                                flexDirection: "row"
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("XinYKienScreen", {
                                    id: this.state.khancapId,
                                    referUserID: this.state.listData.referUserID ? this.formatUser(this.state.listData.referUserID) : [],
                                    referIDSelectSo: this.formatUser(this.state.listData.referOrgID),
                                    //  ? this.state.data.referOrgID : []
                                    ngayhieuluc: this.state.listData.publishTime ? convertDate(this.state.listData.publishTime) : "",
                                    orgID: this.state.listData.orgID ? this.state.listData.orgID : 0
                                });
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontSize: FONT_SIZE_28, fontWeight: '800' }}>XIN Ý KIẾN</Text>
                        </TouchableOpacity>}

                    </View>

                {/* </KeyboardAvoidingView> */}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#efefef',
    },
    content: {
        //backgroundColor: "rgba(0,0,0,0.5)",
        backgroundColor: "white",
        marginTop: 10,
    },
    viewtitle: {
        // borderBottomColor: "gray",
        // borderBottomWidth: 0.4,
        justifyContent: "center"
    },
    titleText: {
        fontSize: scale(26),
        color: "#454545"
    },
    viewTextReceive: {
        backgroundColor: '#d23c3b',
        position: 'absolute',
        right: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textReceive: {
        color: 'white',
        margin: 5,
        marginLeft: 5,
        marginRight: 5
    },
    viewTextSend: {
        backgroundColor: '#f6f6f6',
        width: "90%",
        flexDirection: 'row',
    },
    textSend: {
        margin: 5,
        marginLeft: 10,
        marginRight: 5,
        flex: 9,
        borderRadius: 10,
        color: 'black'
    },
    text: {
        fontSize: size24
    },
    textModal: {
        color: '#333333',
        fontSize: scale(26)
    },
    border: {
        borderColor: '#b4b4b4',
        borderWidth: scale(1),
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
});


const ahihi = state =>({
    userID : state.user1.id_person,
  })
  export default connect(ahihi, null)(ChiTietKhanCapScreen);