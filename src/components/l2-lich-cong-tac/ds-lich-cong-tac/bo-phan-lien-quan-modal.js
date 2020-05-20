import React, { Component } from 'react';
import { Modal, TouchableOpacity,Dimensions, View, ScrollView,Alert ,TextInput,Image} from 'react-native';
import DateRangePicker from '../../user-controls/CustomRangeCalendar'
import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale';
import {Icon} from 'native-base'
import Text from '../../custom-view/text'
var IMG_CHECK = require('../../../../assets/images/l2-khan-cap/l2-chi-tiet/modal/check.png');
var IMG_UNCHECK = require('../../../../assets/images/l2-khan-cap/l2-chi-tiet/modal/uncheck.png');
const win = Dimensions.get('window');
export default class BoPhanLienQuan extends Component {
    constructor(props){
        super(props)
        this.state={
            default_data:this.props.data,
            data:this.props.data,
            select:{}
        }
    }
    getHeightRatio(width, width_new, height_new) {
        let height = height_new * width / width_new
        return height
    }
    _closeModal_Item(){
        this.props.close();
    }
    onPressCheck(item) {
        const exist = this.state.select;
        exist[item.id] = !exist[item.id];
        this.setState({ select: exist });
        const test = this.state.data.map(e => { e.check = exist[e.id] })
        //console.log(this.state.dsCacSo)
    }
    renderItem(data) {
        return data.map((data, i) => {
            return (
                <View key={i} style={{
                    height: verticalScale(87),
                    alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#dfdfdf', backgroundColor: 'white'
                }} >
                    <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }} key={i}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.select[data.id] ?
                                <TouchableOpacity onPress={() => this.onPressCheck(data)}>
                                    <Image source={IMG_CHECK} style={{ width: win.width / 20, height: win.width / 20 }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.onPressCheck(data)}>
                                    <Image source={IMG_UNCHECK} style={{ width: win.width / 20, height: win.width / 20 }} />
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: scale(26), color: '#666666' }}>{data.name}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        )
    }
    render(){
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={this.props.visible}
                onRequestClose={() => this._closeModal_Item()}>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" ,backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <View style={{ width: scale(683), height: verticalScale(910), backgroundColor: "#efefef" }}>
                        <View style={{ backgroundColor: "#ffffff", height: this.getHeightRatio(win.width - 20, 683, 87), justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <View style={{ flexDirection: "row", width: "100%", }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => this._closeModal_Item()}>
                                        <Icon name="ios-arrow-back" style={{ color: "#c7c7c7", fontSize: 30 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 8, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: scale(32), fontFamily: 'Roboto-Medium', color: "#333333" }}>
                                        {this.props.title}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => this._closeModal_Item()}>
                                        <Icon
                                            name="close"
                                            style={{ color: "#c7c7c7", fontSize: 30 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 7 }}>
                            <View style={{ width: "100%", height: verticalScale(72), flexDirection: "row", backgroundColor: "white" }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Icon name="ios-search" style={{ color: '#999999' }} />
                                </View>
                                <View style={{ flex: 9, justifyContent: "center" }}>
                                    <TextInput
                                        style={{ marginLeft: scale(20) }}
                                        fontSize={scale(26)}
                                        onChangeText={text =>
                                            this.setState({
                                                data: this.state.default_data.filter(item => item.name.includes(text)),
                                            })
                                        }
                                        placeholder="Tìm kiếm"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ flex: 5, }}>
                                <ScrollView>
                                    {this.renderItem(this.state.data)}
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => {
                                    const select = this.state.data.filter(e => { return e.check});
                                    this.props.onDataSelect(select)
                                    this._closeModal_Item()
                                }}
                                    style={{ width: win.width - 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3d5e8f', height: 40 }}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>ĐỒNG Ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }
}