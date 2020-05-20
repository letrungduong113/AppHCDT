import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, StyleSheet, Platform} from "react-native";
import {
    Footer,
    View,

} from "native-base";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";

import { scale, verticalScale, moderateScale } from '../../../components/user-controls/utilities/Scale'

var bottomHeight = verticalScale(109)

export default class CustomFooter extends Component {
    render() {
        return (
            <Footer style={Platform.OS == 'ios' ? styles.footerIos : styles.footerAndroid}>
                <View >
                    <CustomTabs2 active={this.props.select} />
                </View>
            </Footer>
        );
    }
}
export const footerMargin=-verticalScale(15);
export const footerHeight=bottomHeight;
const styles = StyleSheet.create({
    footerIos: { height: bottomHeight, backgroundColor: 'transparent', borderTopWidth: 0 },
    footerAndroid: { height: bottomHeight, backgroundColor: 'transparent', paddingBottom: -10 }
})
