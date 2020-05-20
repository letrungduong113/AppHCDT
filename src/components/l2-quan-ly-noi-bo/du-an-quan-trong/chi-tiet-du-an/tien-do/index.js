import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImageControl from '../../../../user-controls/ImageControl';

export default class TienDoChiTietDuAn extends React.Component {
    render() {
        return(
        <View>
            <Text style={{padding: 10}}>BÁO CÁO TIẾN ĐỘ DỰ ÁN</Text>
            <ImageControl image={require("../../../../../../assets/images/l2-linh-vuc-quan-ly/du_an_tien_do.jpg")}/>
        </View>
        )
    }
}