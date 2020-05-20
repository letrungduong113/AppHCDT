
import React, { Component } from 'react';
import {
    View,
    Picker,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'native-base'
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale'
import moment from 'moment';
import styles from './styles'
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const monthData = [
    "Tháng 1 ",
    "Tháng 2 ",
    "Tháng 3 ",
    "Tháng 4 ",
    "Tháng 5 ",
    "Tháng 6 ",
    "Tháng 7 ",
    "Tháng 8 ",
    "Tháng 9 ",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
]
export default class YearMonthPicker extends Component {
    constructor(props) {
        super(props);
        const yearData = [];
        for (var i = 2003; i <= moment().format('YYYY'); i++) {
            yearData.push(i + "");
        }
        this.state = {
            year: this.props.year,
            month: parseInt(this.props.month, 10),
            yearData,
            monthData,
        }
    }
    updateYear(value) {
        if (value > 0) {
            if (this.state.year < this.state.yearData[this.state.yearData.length - 1]) {
                this.setState({ year: this.state.year + 1 })
            }
        } else {
            if (this.state.year > this.state.yearData[0]) {
                this.setState({ year: this.state.year - 1 })
            }
        }

    }
    renderTitle() {
        return (
            <View style={styles.titleHeader}>
                <TouchableOpacity opacity={this.state.year > this.state.yearData[0] ? 1 : 0} style={styles.btnTitle} onPress={() => this.updateYear(-1)}>
                    <Image style={{ width: scale(60), height: scale(60) }} source={require("../../../../assets/images/l2-lich-cong-tac/btn_calendar_previous.png")} />
                </TouchableOpacity>
                <Text style={styles.textTitleHeader}>{this.state.year}</Text>
                <TouchableOpacity opacity={this.state.year < this.state.yearData[this.state.yearData.length - 1] ? 1 : 0} style={styles.btnTitle} onPress={() => this.updateYear(1)}>
                    <Image style={{ width: scale(60), height: scale(60) }} source={require("../../../../assets/images/l2-lich-cong-tac/btn_calendar_next.png")} />
                </TouchableOpacity>
            </View>
        )
    }
    updateMonth(month) {
        if (this.state.year > this.state.yearData[this.state.yearData.length - 1] && month > parseInt(moment().format('M'), 10)) {
            // > current time
        } else {
            if (this.state.year == this.state.yearData[this.state.yearData.length - 1] && month > parseInt(moment().format('M'), 10)) {
                return;
            }
            this.setState({ month })
            this.props.selectMonth(month + "", this.state.year + "");
            this.props.onClose()
        }
    }
    _renderItem = ({ item, index }) => (

        <TouchableOpacity
            onPress={() => this.updateMonth(index + 1)}
            key={item}
            style={{ flex: 1, width: scale(200), justifyContent: 'center', alignItems: 'center', paddingTop: scale(10), paddingBottom: scale(10), backgroundColor: index + 1 == this.state.month ? '#36598c' : 'transparent' }}>
            <Text
                style={index + 1 == this.state.month ? { fontSize: scale(32), color: 'white' } : { fontSize: scale(32), color: 'black' }}>
                {item}
            </Text>
        </TouchableOpacity>
    );

    renderMonth() {
        return (
            <FlatList
                contentContainerStyle={styles.listMonth}
                data={this.state.monthData}
                extraData={this.state.monthData}
                keyExtractor={(item, index) => item}
                renderItem={this._renderItem}
                scrollEnabled={false}
            />
        )
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onClose();
                }}>
                <TouchableWithoutFeedback onPress={() => this.props.onClose()}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.visible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ width: scale(683), backgroundColor: 'white', borderRadius: 2, borderWidth: 1, borderColor: 'white', padding: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View />
                                    <Text style={{ fontSize: scale(32), color: '#333333', fontFamily: 'Roboto-Medium' }}>Chọn thời gian</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.onClose();
                                        }}>
                                        <Icon name='ios-close' style={{ fontSize: 40, color: '#c7c7c7' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: '#d8d8d8', height: 1, marginBottom: 8, width: scale(683) - 16 }} />
                                {this.renderTitle()}
                                {this.renderMonth()}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        )
    }
}

