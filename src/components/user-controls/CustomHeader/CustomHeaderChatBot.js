import React, { Component } from "react";
import { TouchableOpacity, ImageBackground, TextInput, Image,Platform } from "react-native";
import { withNavigation } from "react-navigation";
import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'
import {getPaddingTop,getHeaderSize} from '../utilities/StatusBar'
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"

import {
  Container,
  Title,
  Content,
  Text,
  Icon,
  View,
} from "native-base";

var headerHeight = verticalScale(90)
var backHeight = scale(35)
var backWidth = scale(34)

class CustomHeaderChatBot extends Component {
    render() {
        return(
            <ImageBackground
          source={GROBAL_RESOUCE.IMAGE_HEADER}
          style={{
            width: "100%",
            height: getHeaderSize() ,
            flexDirection: "row",
            alignItems: "center",
            position: "relative"
          }}
        >
        <View style={{flexDirection: "row",alignItems: "center",position: "relative",marginTop:getPaddingTop()}}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.goBack(null)}
            >
                <View style={{width: '100%', height: '100%', justifyContent: "center", alignItems: "center"}}>
                <Image source={require('../../../../assets/images/closechatbot.png')} style={{width: backWidth, height: backHeight, display: this.props.display}} />
                </View>
            </TouchableOpacity>

            <View style={{ flex: 8, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ color: "white", fontSize: scale(30), fontWeight: "bold", textAlign: 'center' }}>
                {this.props.title}
                </Text>
            </View>

            <TouchableOpacity
                style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
                onPress={this.props.goto}
            >
                <Image source={this.props.source} style={{width: scale(41), height: scale(41)}} />
          </TouchableOpacity>
        </View>
        </ImageBackground>
        )
    }
}

export default withNavigation(CustomHeaderChatBot);