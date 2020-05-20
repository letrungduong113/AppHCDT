import React, { Component } from "react";
import { Image, TextInput, StyleSheet } from "react-native";
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale';
import CustomTabs2 from '../navigation-controls/CustomTabs2'

import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Footer,
    View,
    
  } from "native-base";
import Text from '../custom-view/text'
var iconDbHeight = verticalScale(130) 
var iconDbWidth = verticalScale(130)
var fontSize = scale(36)
var contentheight = verticalScale(950)

export default class CongDongMang extends Component {
    render() {
        return(

            <Content>
                <View style={{width: '100%', height: contentheight, justifyContent: "center", alignItems: "center"}}>
                    <Image source={require('../../../assets/images/l2-du-luan/database.png')} style={{width: iconDbWidth, height: iconDbHeight, marginBottom: 10}} />
                    <Text style={{fontSize: fontSize, color: 'grey'}}>Kết nối với hệ thống dữ liệu</Text>
                    <Text style={{fontSize: fontSize}}>bên ngoài</Text>
                </View>

                {/* <Footer style={{height: 60, backgroundColor: 'transparent'}}>
                <View>
                    <CustomTabs2 active = '0'></CustomTabs2>
                </View>
                </Footer> */}
            </Content>
        )
    }
}