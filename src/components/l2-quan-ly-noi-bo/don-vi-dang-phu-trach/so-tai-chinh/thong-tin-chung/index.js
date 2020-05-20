import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Linking } from 'react-native';
import { Container, Footer, } from "native-base";
import CustomHeader from '../../../../user-controls/CustomHeader';
import CustomTabs2 from '../../../../navigation-controls/CustomTabs2';
import Text from '../../../../../components/custom-view/text';
import { scale, verticalScale } from '../../../../user-controls/utilities/Scale';
import LinhVucQuanLyAPI from '../../../../../services/api-service/linh-vuc-quan-ly-api'
import AppIndicator from '../../../../user-controls/AppIndicator'
import AttachmentsBox from "../../../../user-controls/AttachmentsBox";
import ProgressListBox from "../../../../user-controls/ProgressListBox";
import CommandIdeaBox, { COMMAND_TYPE } from "../../../../user-controls/CommandIdeaBox";
import {convertTime} from '../../../../user-controls/utilities/converter/'

const titleSize = scale(30)
const contentSize = scale(26)
const textConlai = scale(24)
var FONT_SIZE_28 = scale(28);

export default class ThongTinChung extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id") ? this.props.navigation.getParam("id")  : 0,
            token: this.props.navigation.getParam("token") ? this.props.navigation.getParam("token")  : 0,
            isSoNganh: this.props.navigation.getParam("isSoNganh"),
            listData: [],
            isLoading: true,
            data: {}
        }
    }

    componentDidMount() { 
        LinhVucQuanLyAPI.getThongTinChung(this.state.token).then((res)=>{
            //   alert(JSON.stringify(res));
            if(res!=null){
                this.setState({data: res, isLoading: false});                
            }
            })
      }

    getDonViDuAn(value){
        console.log('--------------------------------------------' + value)
    if(value==null||value==''){
        return ""
    }else{
        var arr = value.split(";");
        for(let i = 0;i<arr.length;i++){
            if(arr[i].slice(-1) == "2"){
            arr[i] = arr[i].slice(0,-2)
            return arr[i];
            }
        }
        return ""
    }
    }

    renderHeader() {
        return (
            <CustomHeader title="Nội dung chi tiết"></CustomHeader>
        )
    }
    render() {
        data = this.state.data
        return (
            <Container>
                <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
                {this.state.isLoading ? (<AppIndicator />) :
                (<ScrollView>
                    <View style={{backgroundColor: 'white', padding: 15}}>
                        <Text style={{fontWeight: 'bold', fontSize: titleSize, marginBottom: 10}}>{data.orgName}</Text>
                        <View style={{marginBottom: 20}}>
                            <View style={{flexDirection: "row"}}>
                              <Image source={require('../../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/address.png')} style={{width: scale(38), height: scale(38), marginRight: scale(5)}} />
                              <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>{data.address}</Text>
                            </View>

                            <View style={{flexDirection: "row"}}>
                              <Image source={require('../../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/fax.png')} style={{width: scale(38), height: scale(38), marginRight: scale(5)}} />
                              <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>Fax: {data.fax ? data.fax : ''}</Text>
                            </View>

                            <View style={{flexDirection: "row"}}>
                              <Image source={require('../../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/call.png')} style={{width: scale(38), height: scale(38), marginRight: scale(5)}} />
                              <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>ĐT: </Text>
                                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${data.orgTel}`) }}>
                                    <Text style={{color: '#047ef2', fontSize: textConlai}}>{data.orgTel}</Text>
                                </TouchableOpacity>
                              
                            </View>

                            <View style={{flexDirection: "row"}}>
                              <Image source={require('../../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/mail.png')} style={{width: scale(38), height: scale(38), marginRight: scale(5)}} />
                              <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>Email: </Text>
                                <TouchableOpacity onPress={() =>  Linking.openURL(`mailto:${data.email}`) }>
                                    <Text style={{color: '#047ef2', fontSize: textConlai}}>{data.email}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{width: '100%', height: 1, justifyContent: "center", alignItems: "center"}}>
                      <View style={{width: '90%', height: 1, backgroundColor: 'lightgrey', }}></View>
                    </View>
                    
                    <View style={{backgroundColor: 'white', padding: 15, width: '100%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Image source={data.icon ? data.icon : require('../../../../../../assets/images/default/avatar_progress.png')} 
                        style={{width: scale(140), height: scale(140), marginRight: scale(10)}} />
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: scale(32)}}>{data.leaderName}</Text>
                          <Text style={{fontSize: scale(28), color: '#999999', marginBottom: scale(5), width: '100%'}}>{data.position}</Text>
                          <View style={{flexDirection: "row"}}>
                            <Image source={require('../../../../../../assets/images/l2-linh-vuc-quan-ly/so-tai-chinh/call.png')} style={{width: scale(38), height: scale(38), marginRight: scale(5)}} />
                            <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>ĐT: </Text>
                                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${data.leaderPhone}`) }}>
                                    <Text style={{color: '#047ef2', fontSize: textConlai}}>{data.leaderPhone}</Text>
                                </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{width: '100%', height: scale(10), backgroundColor: '#f5f5f5'}}></View>

                    <View style={{backgroundColor: 'white', padding: 15}}>
                      <Text style={{fontWeight: 'bold', color: '#333333', fontSize: scale(30)}}>Chức năng và nhiệm vụ</Text>
                      <Text style={{fontSize: scale(32), lineHeight: scale(48)}}>{data.description}</Text>
                    </View>
                    
                </ScrollView>)
                }
            </KeyboardAvoidingView>
            </Container>
        )
    }
    formatUser(value) {
       return []
        if (value == null || value == "") return [];
        let arr = value.split(",");
        if (arr.length>0) {
            arr.splice(arr.length - 1, 1)
            //   alert(JSON.stringify(arr))
            return arr;
        }
        return []
    }

    postYKienChiDao2 = async (response) => {
        if (response && response.message == 'SUCCESS') {
            if (this._tientrinh) {
                this._tientrinh.refreshData();
            }
        }
        return response;
    }
}

const styles = StyleSheet.create({

})