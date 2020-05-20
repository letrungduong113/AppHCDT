import React, {Component} from 'react'
import {View, Image, Dimensions, TouchableOpacity} from 'react-native'
import DraggableControl from '../DraggableControl';
import { scale } from "../utilities/Scale";
import SpeakingService from "../../../services/speaking-service";
import PropTypes from "prop-types";

const win = Dimensions.get('window');
const IMG_SPEAKER_START = require('../../../../assets/images/icon/ic_speaker_start.png');
const IMG_SPEAKER_STOP = require('../../../../assets/images/icon/ic_speaker_stop.png');

export default class SpeakerBox extends React.Component {
    static propTypes = {
        onSpeak: PropTypes.func,
        onStop:  PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isSpeaking: false,
        }
        this.contents = [];
        this.contentCount = -1;
        this.setContentsProp(this.props);
    }

    setContentsProp(props) {
        if (props.contents) {
            if (Array.isArray(props.contents))
            {
                this.contents = props.contents;
            }
            else {
                this.contents = [props.contents];
            }
            this.contentCount = -1;
            SpeakingService.stop();
            this.setState({isSpeaking: false});
        }
    }
    componentWillReceiveProps(props) {
        //console.log("Speaker box: ----------", this.props.contents);
        //alert(JSON.stringify(this.props.contents));
        this.setContentsProp(props);
    }

    componentDidMount() {
        SpeakingService.onStopped = this.onSpeakingStopped.bind(this);
    }

    onSpeakingStopped = ()=> {
        if (this.contentCount >= 0 && this.contentCount < this.contents.length - 1) {
            this.contentCount ++;
            SpeakingService.speak(this.contents[this.contentCount]);
        }
        else {
            this.contentCount = -1;
            this.setState({isSpeaking: false});
        }
    }
        
    speakButtonPress = ()=>{
        //alert(JSON.stringify(this.contents))
        if (!this.state.isSpeaking) {
            if (this.contents.length > 0) {
                this.contentCount = 0;
                SpeakingService.speak(this.contents[0]);
                this.setState({isSpeaking: !this.state.isSpeaking});
            }
        }
        else {
            SpeakingService.stop();
            this.setState({isSpeaking: !this.state.isSpeaking});
        }
    }

    render() {
        //alert(JSON.stringify(this.props.style));
        return (
        <View style={{
                position: 'absolute', 
                top: this.props.top? this.props.top : 0, 
                right: 0, 
                flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
            <DraggableControl>
              <View>
                <TouchableOpacity onPress={this.speakButtonPress}>
                    <Image 
                        source={this.state.isSpeaking? IMG_SPEAKER_STOP: IMG_SPEAKER_START} 
                        style={{height: scale(120), width: scale(120)}} resizeMode="contain"></Image>
                </TouchableOpacity>
              </View>
            </DraggableControl>
        </View>
        );
    }
 }