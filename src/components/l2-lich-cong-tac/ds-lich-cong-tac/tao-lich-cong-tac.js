import React, { Component } from "react";
import { TouchableOpacity, Dimensions, Modal, TextInput,Image} from "react-native";
import PropTypes from 'prop-types';
import {
    Container,
    Content,
    Icon,
    CheckBox,
    View,
    Picker,

} from "native-base";
import styles from './styles'
import Text from '../../custom-view/text'
import LichCongTacAPI from "../../../services/api-service/lich-cong-tac-api"
import MasterApi from "../../../services/api-service/master-api"
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale'
import moment from 'moment'
import BoPhanLienQuan from './bo-phan-lien-quan-modal'
import DatePicker from 'react-native-datepicker'
// dummy
const laixe = [
    {
        id: 1,
        name: 'Nguyễn Văn Nam - 29B1456'
    },
    {
        id: 2,
        name: 'Nguyễn Văn Hùng - 32T1354'
    },
    {
        id: 3,
        name: 'Phạm Ngọc Long - 32T1354'
    }
]
class TaoLichCongTacModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: "",
            content: "",
            leader: "",
            address: "",
            driver: null,
            number_car: "",
            lienquan: "Liên quan",
            time: moment().format('DD-MM-YYYY HH:mm'),
            timePicker: false,
            lienquanPicker:false,
            donvi_capduoi:[],
            laixe:[]
        }
    }
    componentDidMount() {
        moment.locale('vi')
        this.setState({
            laixe
        })
        this.loadDonViCapDuoi();
    }
    loadDonViCapDuoi(){
        MasterApi.getDsDonViCapDuoi().then((res) => {
            // this.setState({ ...this.state,data: res });
            if (res != null) {
                this.setState({donvi_capduoi:res});
            }
        });
    }
    submit() {
        if(this.state.driver==null){
            //alert('Chọn người lái xe')
            return;
        }
        LichCongTacAPI.taoLichCongTac(this.state).then((res) => {
            // this.setState({ ...this.state,data: res });
            if (res != null) {
                this.props.close();
            }
        });
    }


    renderDatePicker() {
        return (
            <DatePicker
                style={{ width: scale(683) - 16, marginTop: 8 }}
                date={this.state.time}
                mode="datetime"
                locale={'vi'}
                placeholder="Chọn ngày"
                format="DD-MM-YYYY HH:mm"
                minDate={moment().format('DD-MM-YYYY HH:mm')}
                confirmBtnText="Chọn"
                cancelBtnText="Hủy"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginRight: 0
                    },
                    dateInput: {
                        marginRight: 36
                    }
                }}
                onDateChange={(date) => { this.setState({ date: moment(date, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'), timePicker: true }) }}
            />
        )
    }
    renderDriver(){
        return (
            // <Text style={ { marginLeft: 8,color:'#333333' }} >{this.state.driver}</Text>
            <View >
                <Picker style={ {width:scale(500),backgroundColor:'transparent', fontSize:8}} itemStyle={ { fontSize:scale(14),color:'#333333' }}  mode="dropdown" iosHeader="Thông tin tài xế" selectedValue={this.state.driver} onValueChange={(value)=>this.setState({driver:value})}>
                        <Picker.Item label="Thông tin tài xế" value={null}/>
                        {
                            this.state.laixe.map((item,index)=>{
                                return <Picker.Item key={index} label={item.name} value={item.name} />;
                            })
                        }
                </Picker>
            </View>
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
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.visible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                    <View style={{ width: scale(683), backgroundColor: 'white', borderRadius: 2, borderWidth: 1, borderColor: 'white', padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View />
                            <Text style={{ fontSize: scale(32), colo: '#333333', fontFamily: 'Roboto-Medium' }}>LỊCH CÔNG TÁC</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.close();
                                }}>
                                <Icon name='ios-close' style={{ fontSize: 40, color: '#c7c7c7' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#d8d8d8', height: 1, marginBottom: 8, width: scale(683) - 16 }} />
                        <TextInput
                            numberOfLines={1}
                            placeholder='Tiêu đề'
                            placeholderTextColor='#333333'
                            value={this.state.title}
                            multiline={true} underlineColorAndroid="transparent" style={[styles.inputModal, { marginTop: 8, textAlignVertical: 'top' }]}
                            onChangeText={(value) => this.setState({ title: value })}
                        ></TextInput>
                        <TextInput
                            placeholder='Nội dung'
                            placeholderTextColor='#333333'
                            value={this.state.content}
                            multiline={true} underlineColorAndroid="transparent" style={[styles.inputModal, { height: 100, marginTop: 8, textAlignVertical: 'top' }]}
                            onChangeText={(value) => this.setState({ content: value })}
                        ></TextInput>
                        < View style={[styles.border, { width: '100%', marginTop: 8, height: scale(70), justifyContent: 'center',alignItems:'center', flexDirection: 'row' }]}>
                            <Image source={require('../../../../assets/images/icon/ic_location_grey.png')} style={{ width: scale(22), height: verticalScale(32), }} />
                            <View style={{ flex: 9, justifyContent: 'center',marginTop:12}}>
                                <TextInput  underlineColorAndroid="transparent" onChangeText={(value) => this.setState({ address: value })} placeholder="Địa điểm cuộc họp" placeholderTextColor='#333333' style={ { marginLeft: 8,color:'#333333',height:verticalScale(70) }} >{this.state.address}</TextInput>
                            </View>
                        </View>
                        < View style={[styles.border, { width: '100%', marginTop: 8, height: scale(70), justifyContent: 'center',alignItems:'center', flexDirection: 'row' }]}>
                            <Image source={require('../../../../assets/images/icon/ic_person_grey.png')} style={{ width: scale(28), height: verticalScale(32), }} />
                            <View style={{ flex: 9, justifyContent: 'center',marginTop:12 }}>
                                <TextInput underlineColorAndroid="transparent" onChangeText={(value) => this.setState({ leader: value })}  placeholder="Chủ trì" placeholderTextColor='#333333' style={ { marginLeft: 8,color:'#333333' ,height:verticalScale(70)}} >{this.state.leader}</TextInput>
                            </View>
                        </View>
                         < View style={{ justifyContent: 'center', marginTop: 8, }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({lienquanPicker:true});
                                // this.setModalVisible_Item(!this.state.modalVisible_Item);
                            }} style={[styles.border, { width: '100%', height: scale(70), justifyContent: 'center',alignItems:'center', flexDirection: 'row' }]}>
                                <Image source={require('../../../../assets/images/icon/ic_lien_quan.png')} style={{ width: scale(30), height: verticalScale(30), }} />
                                <View style={{ flex: 9, justifyContent: 'center', }}>
                                    <Text style={ { marginLeft: 8,color:'#333333' }} >{this.state.lienquan}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../assets/images/l2-khan-cap/ic_arrow_down.png')} style={{ width: scale(22), height: verticalScale(17), }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        < View style={{ justifyContent: 'center', marginTop: 8, }}>
                            <View style={[styles.border, { width: '100%', height: scale(70), justifyContent: 'center',alignItems:'center', flexDirection: 'row' }]}>
                                <Image source={require('../../../../assets/images/icon/ic_car_grey.png')} style={{ width: scale(30), height: verticalScale(25), }} />
                                <View style={{ flex: 9, alignItems: 'center', }}>
                                    {this.renderDriver()}
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../assets/images/l2-khan-cap/ic_arrow_down.png')} style={{ width: scale(22), height: verticalScale(17), }} />
                                </View>
                            </View>
                        </ View>
                        {/* <TextInput
                            placeholder='Số xe'
                            numberOfLines={1}
                            placeholderTextColor='#333333'
                            value={this.state.number_car}
                            multiline={true} underlineColorAndroid="transparent" style={[styles.inputModal, { marginTop: 8, textAlignVertical: 'top' }]}
                            onChangeText={(value) => this.setState({ number_car: value })}
                        ></TextInput> */}
                        {this.renderDatePicker()}
                        <TouchableOpacity onPress={() => this.submit()} style={{ marginTop: 8, backgroundColor: '#3d5e8f', height: (verticalScale(72)), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: (scale(28)), fontFamily: 'Roboto-Medium' }}>TẠO LỊCH</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    setLienQuanData(select){
        var rs="";
        for (var i = 0; i < select.length-1; i++) {
            rs = rs +select[i].name+", ";
        }
        if(select.length>0){
            rs = rs + select[i].name;
        }
        if(rs.length>0){
            this.setState({lienquan:rs})
        }
    }
    render() {
        if(this.state.lienquanPicker){
            return (
            <BoPhanLienQuan 
                onDataSelect={(select)=>this.setLienQuanData(select)}
                close={()=>this.setState({lienquanPicker:false})}
                title="Bộ phận liên quan" 
                data={this.state.donvi_capduoi} 
                visible={this.state.lienquanPicker}/>
            )
        }else{
            return (this.renderContent());
        }
    }
}


export default TaoLichCongTacModal;
