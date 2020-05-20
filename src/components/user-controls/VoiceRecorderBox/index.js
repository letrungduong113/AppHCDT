import React, {Component} from 'react'
import {View, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'native-base';

import { scale } from "../utilities/Scale";
import PropTypes from "prop-types";
import Voice from 'react-native-voice';
let timer = null;
export default class VoiceRecorderBox extends React.Component {
    static propTypes = {
        onRecorded: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isSpeaking: false,
            resultListening: "",
        }
    }

   
    componentDidMount() {
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechEndHandler(e) {
        console.log('end voice')
        //alert( JSON.stringify(e));
        if (Platform.OS === 'ios') {
            timer = null;
            this.setState({ isSpeaking: false });
            if (this.state.resultListening != null && this.state.resultListening != '') {
                const rs = this.state.resultListening;
                if (this.props.onRecorded) this.props.onRecorded(rs);
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
                this.setState({ resultListening: suggestions[0], isSpeaking: false});
                if (this.props.onRecorded) this.props.onRecorded(suggestions[0]);
                //console.log(suggestions[0]);
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
        this.setState({ isSpeaking: true });
    }
    async stopRecording() {
        try {
            await Voice.stop();
            console.log('stop voice')
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        //alert(JSON.stringify(this.props.style));
        return (
            <TouchableOpacity style={{width: scale(60), height: scale(60),}}
                onPress={() => this.state.isSpeaking ? this.stopRecording() : this.startRecording()} >
                <View style={{
                        width: scale(60), height: scale(60), backgroundColor: 'white',
                    borderRadius: scale(30), borderColor: '#3d5e8f', borderWidth: 1,
                    flex: 1, alignItems: 'center', justifyContent: 'center'
                }}>
                    <Icon name={this.state.isSpeaking ? "ios-pause" : "ios-mic"} style={{ color: '#3d5e8f', fontSize: scale(40) }} />
                </View>
            </TouchableOpacity>
        );
    }
 }