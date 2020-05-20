import React, {Component} from 'react'
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import DraggableControl from '../DraggableControl';
import { scale } from "../utilities/Scale";
import PropTypes from "prop-types";

const win = Dimensions.get('window');
const IMG_SPEAKER_START = require('../../../../assets/images/icon/ic_speaker_start.png');


class ChatbotBox extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }


    render() {
        //alert(JSON.stringify(this.props.style));
        return (
        <View style={{
                
                position: 'absolute', 
                top: scale(120), 
                right: 0, 
                flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 10}}>
            <DraggableControl allowOutside = {false}>
              <View>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("TroLyAo")}>
                    <Image 
                        source={IMG_SPEAKER_START} 
                        style={{height: scale(120), width: scale(120), opacity: 0.8}} resizeMode="contain"></Image>
                </TouchableOpacity>
              </View>
            </DraggableControl>
        </View>
        );
    }
 }

 export default withNavigation(ChatbotBox);