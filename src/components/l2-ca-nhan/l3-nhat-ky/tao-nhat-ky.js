import React, { Component } from "react";
import { TouchableOpacity, Dimensions, Modal, TextInput, TouchableWithoutFeedback,Image,Keyboard } from "react-native";
import PropTypes from 'prop-types';
import {
    Container,
    Content,
    Icon,
    CheckBox,
    View,

} from "native-base";
import styles from './styles'
import Text from '../../custom-view/text'
import NhatKyAPI from "../../../services/api-service/nhat-ky-api";
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale'
import moment from 'moment'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import DatePicker from 'react-native-datepicker'

class TaoNhatKyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            noiDung: "",
            loaiThongBao: 1,
            thoiGianThongBaoText: "",
            status: 0,
            isNoTiFy: 1,
            date: moment().format('DD/MM/YYYY HH:mm'),
            timePicker: false,
        }
    }
    componentDidMount() {
        moment.locale('vi')
    }
    submit() {
        if (this.state.noiDung.length == 0) {
            // alert("Cần nhập nội dung");
            return;
        }
        NhatKyAPI.taoNhatKy(this.state).then((res) => {
            // this.setState({ ...this.state,data: res });
            // alert(JSON.stringify(res))
            if (res) {
                this.props.close();
                this.props.onCreateSuccess();
            }
        });
    }


    renderDatePicker() {
        return (
            <DatePicker
                style={{ flex: 1, marginTop: 8 }}
                date={this.state.date}
                mode="datetime"
                locale={'vi'}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm"
                minDate={moment().format('DD/MM/YYYY HH:mm')}
                confirmBtnText="Chọn"
                cancelBtnText="Hủy"
                showIcon={false}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                    },
                    dateInput: {
                        // backgroundColor:'#e1e1e1',
                        // borderColor:'transparent',
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(24)
                    }
                }}
                onDateChange={(date) => { this.setState({ date: date, timePicker: true }) }}
            />
        )
    }
    renderTimePicker() {
        return (
            <DatePicker
                style={{ marginTop: 8 }}
                date={this.state.date}
                mode="datetime"
                locale={'vi'}
                placeholder="Chọn giờ"
                format="DD/MM/YYYY HH:mm"
                confirmBtnText="Chọn"
                cancelBtnText="Hủy"
                showIcon={false}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                    },
                    dateInput: {
                        // backgroundColor:'#e1e1e1',
                        // borderColor:'transparent',
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(24)
                    }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
            />
        )
    }
    renderChecker(check){
        if(check){
            return require('../../../../assets/images/l2-khan-cap/l2-chi-tiet/modal/check.png')
        }else{
            return require('../../../../assets/images/l2-khan-cap/l2-chi-tiet/modal/uncheck.png')
        }
    }
    renderTime() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.timePicker}
                onRequestClose={() => {
                    this.setState({ timePicker: false })
                }}>
                <TouchableWithoutFeedback onPress={() => this.setState({ timePicker: false })}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.visible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                            <View style={{ width: scale(683), backgroundColor: 'white', borderRadius: 2, borderWidth: 1, borderColor: 'white', padding: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View />
                                    <Text style={{ fontSize: scale(32), color: '#333333', fontFamily: 'Roboto-Medium' }}>Giờ</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ timePicker: false })
                                        }}>
                                        <Icon name='ios-close' style={{ fontSize: 40, color: '#c7c7c7' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: '#d8d8d8', height: 1, marginBottom: 8, width: scale(683) - 16 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ loaiThongBao: 1 })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8, marginLeft: 0 }}>
                                                <Image onPress={() => this.setState({ loaiThongBao: 1 })} style={{width:scale(38),height:scale(38)}} source={this.renderChecker(this.state.loaiThongBao == 1)}  />
                                                <Text style={{ marginLeft: 8 }}>Nhắc lịch trước 1 giờ</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ loaiThongBao: 2 })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8, marginTop: 0, marginLeft: 0 }}>
                                                <Image onPress={() => this.setState({ loaiThongBao: 2 })} style={{width:scale(38),height:scale(38)}}source={this.renderChecker(this.state.loaiThongBao == 2)}   />
                                                <Text style={{ marginLeft: 8 }}>Nhắc lịch trước 3 giờ</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ loaiThongBao: 3 })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8, marginTop: 0, marginLeft: 0 }}>
                                                <Image onPress={() => this.setState({ loaiThongBao: 3 })} style={{width:scale(38),height:scale(38)}} source={this.renderChecker(this.state.loaiThongBao == 3)} />
                                                <Text style={{ marginLeft: 8 }}>Nhắc lịch trước 1 ngày</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {this.renderTimePicker()}
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ timePicker: false })} style={{ backgroundColor: '#3d5e8f', height: (verticalScale(72)), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: (scale(28)), fontFamily: 'Roboto-Medium' }}>TIẾP</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    renderContent() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.createItem}
                onRequestClose={() => {
                    this.props.close();
                }}>
                <TouchableWithoutFeedback onPress={() => this.props.close()}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.visible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ width: scale(683), backgroundColor: 'white', borderRadius: 2, borderWidth: 1, borderColor: 'white', padding: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View />
                                    <Text style={{ fontSize: scale(32), color: '#333333', fontFamily: 'Roboto-Medium' }}>THÊM NHẬT KÝ</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.close();
                                        }}>
                                        <Icon name='ios-close' style={{ fontSize: 40, color: '#c7c7c7' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: '#d8d8d8', height: 1, marginBottom: 8, width: scale(683) - 16 }} />
                                <Text style={{ fontSize: scale(26), color: '#616161', marginBottom: moderateScale(2) }}>Nội dung</Text>
                                <TextInput
                                    value={this.state.noiDung}
                                    multiline={true} underlineColorAndroid="transparent" style={[styles.inputModal, { height: 100, marginTop: 8, textAlignVertical: 'top' }]}
                                    onChangeText={(value) => this.setState({ noiDung: value })}
                                ></TextInput>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => this.setState({ isNoTiFy: 1 })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8, marginLeft: 0 }}>
                                                <Image onPress={() => this.setState({ isNoTiFy: 1 })} style={{width:scale(38),height:scale(38)}} source={this.renderChecker(this.state.isNoTiFy == 1)}  />
                                                <Text style={{ marginLeft: 8 }}>Bật nhắc nhở</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ isNoTiFy: 0 })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8, marginTop: 0, marginLeft: 0 }}>
                                                <Image onPress={() => this.setState({ isNoTiFy: 0 })} style={{width:scale(38),height:scale(38)}} source={this.renderChecker(this.state.isNoTiFy != 1)}  />
                                                <Text style={{ marginLeft: 8 }}>Tắt nhắc nhở</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.isNoTiFy == 1 && this.renderDatePicker()}
                                </View>
                                <TouchableOpacity onPress={() => this.submit()} style={{ backgroundColor: '#3d5e8f', height: (verticalScale(72)), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: (scale(28)), fontFamily: 'Roboto-Medium' }}>XONG</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    render() {
        if (this.state.timePicker) {
            return (this.renderTime());
        } else {
            return (this.renderContent());
        }
    }
}


export default TaoNhatKyModal;
