import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import Video from 'react-native-video';
import { Container, Header, Title, Icon, Body, Footer, } from "native-base";

const win = Dimensions.get('window');
export default class CusVideoScreen extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.navigation.getParam('data');
        this.link = {uri: this.props.navigation.getParam('link')}
        this.poster = this.props.navigation.getParam('poster')
        // this.data = { laVideo: true, link: 'https://rawgit.com/uit2712/Mp3Container/master/tom_and_jerry_31.mp4' }
        this.state = {
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
            poster: '',
            // poster: 'https://media.laodong.vn/storage/newsportal/2018/11/29/643949/Chan-Nuoi-Lon1.jpg',
        }
    }
    componentDidMount() {
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
            }, 4000);
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
    renderImage(data) {
        return (
            <View style={{ backgroundColor: 'white', width: win.width }}>
                <Image source={data.link} style={{ width: win.width, height: scale(375) }} />
            </View>
        )
    }
    renderVideo(data) {
        //console.log("CusVideo poster:", data.poster)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>    
            <TouchableWithoutFeedback
                    onPress={() => this.onPressVideo()}>
                    <View style={[styles.fullScreen, { height: verticalScale(375) }]}>
                        <Video
                            ref={(ref: Video) => { this.video = ref }}
                            /* For ExoPlayer */
                            // source={this.link}
                            source={require('../../../configUI/video/bacninhvideo.mp4')}
                            style={styles.fullScreen1}
                            rate={this.state.rate}
                            // poster={this.poster}
                            // poster={'http://www.baobacninh.com.vn/documents/20182/695004/8.JPG/8fa19235-0ad3-45a7-870d-d965a7e37ac6?t=1555031914284'}
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
    }
    renderItem(data) {
        if (data.laVideo) {
            return this.renderVideo(data)
        }
        else {
            return this.renderImage(data)
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ width: '100%', height: verticalScale(140), flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ flex: 1.5, }}>
                        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/l2-khan-cap/btnback.png')} style={{ width: scale(41), height: verticalScale(37) }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 6.5, justifyContent: 'center', alignItems: 'center' }}>

                    </View>
                    <View style={{ flex: 1.5 }}></View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: win.height - verticalScale(140 * 2) }}>
                    {
                        this.renderItem(this.data)
                        // this.renderVideo(this.data)
                    }
                </View>
                <View style={{ height: verticalScale(140) }}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        //position: 'absolute',
        //top: win.height / 10,
        // left: 0,
        // bottom: 0,
        // right: 0,
        backgroundColor: 'black',
        marginTop: scale(10),
        justifyContent: 'center',
        width: win.width,
        //height: win.width / 2,
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