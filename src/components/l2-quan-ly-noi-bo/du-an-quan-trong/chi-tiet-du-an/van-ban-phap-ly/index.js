import React, { Component } from 'react';
import { View } from 'react-native';
import ImageControl from '../../../../user-controls/ImageControl';

export default class VanBanChiTietDuAn extends React.Component {
    render() {
        return(
            <View>
                <ImageControl image={require("../../../../../../assets/images/l2-linh-vuc-quan-ly/du_an_van_ban.jpg")}/>
            </View>
        )
    }
}