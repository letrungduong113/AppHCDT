import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Alert, TouchableWithoutFeedback } from 'react-native';
import DateRangePicker from '../../user-controls/CustomRangeCalendar'
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale';
import { Icon } from 'native-base'
import Text from '../../custom-view/text'
export default class ModalDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStart: null,
            dateEnd: null
        }
    }
    search() {
        if (this.state.dateStart == null) {
            // alert('Chọn ngày tìm kiếm');
        } else {
            this.props.closeDatePicker();
            this.props.searchDate(this.state.dateStart, this.state.dateEnd);
        }
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {

                }}>
                <TouchableWithoutFeedback onPress={() => this.props.closeDatePicker()}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.visible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ width: scale(683), backgroundColor: 'white', borderRadius: 2, borderWidth: 1, borderColor: 'white' }}>
                                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.closeDatePicker();
                                        }}>
                                        <Icon name='ios-close' style={{ fontSize: 45, color: '#c7c7c7' }} />
                                    </TouchableOpacity>
                                </View>
                                <DateRangePicker
                                    typeDate="day"
                                    onSuccess={(s, e) => this.setState({ dateStart: s, dateEnd: e })}
                                />
                                <TouchableOpacity onPress={() => this.search()} style={{ margin: (scale(20)), backgroundColor: '#3d5e8f', height: (verticalScale(72)), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: (scale(28)), fontFamily: 'Roboto-Medium' }}>TÌM KIẾM</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}