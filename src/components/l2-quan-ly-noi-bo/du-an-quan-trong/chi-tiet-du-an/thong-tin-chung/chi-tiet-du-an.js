import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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
import HtmlText from "../../../../user-controls/HtmlText";
import SpeakerBox from '../../../../user-controls/SpeakerBox';

const titleSize = scale(32)
const contentSize = scale(26)
const textConlai = scale(24)
var FONT_SIZE_28 = scale(28);

export default class ChiTietDuAnScreen extends React.Component {
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
            data: {},
            noiDungHtml: '',
        }
    }

    componentDidMount() {
        { this.state.isSoNganh ?
        LinhVucQuanLyAPI.getChiTietDuAnSo(this.state.id, this.state.token).then((res)=>{
            //   alert(JSON.stringify(res));
            if(res!=null){
                this.setState({data: res, isLoading: false});
                if (this._ideaBox) {
                    this._ideaBox.updateOrgRefStr(res.referOrgID)
                    }
                }
            }) : 
            LinhVucQuanLyAPI.getChiTietDuAn(this.state.id).then((res)=>{
                //   alert(JSON.stringify(res));
                if(res!=null){
                    this.setState({data: res, isLoading: false});
                    if (this._ideaBox) {
                        this._ideaBox.updateOrgRefStr(res.referOrgID)
                      }
                  }
                })
        }
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
                {this.state.data.referOrgID ?
                    <CommandIdeaBox
                        ref={ref => { this._ideaBox = ref }}
                        itemId={this.state.id} ideaType={COMMAND_TYPE.NHIEM_VU}
                        referUserID={this.formatUser(this.state.data.referUserID)
                            //  ? this.state.data.referUserID : []
                        }
                        referIDSelectSo={this.formatUser(this.state.data.referOrgID)
                            //  ? this.state.data.referOrgID : []
                        }
                        orgID={this.state.data.orgID ? this.state.data.orgID : 0}
                        postCallBack={this.postYKienChiDao2}
                    />
                    : <CommandIdeaBox
                        ref={ref => { this._ideaBox = ref }}
                        itemId={this.state.id} ideaType={COMMAND_TYPE.NHIEM_VU}
                        referUserID={this.formatUser(this.state.data.referUserID)
                            //  ? this.state.data.referUserID : []
                        }
                        referIDSelectSo={this.formatUser(this.state.data.referOrgID)
                            //  ? this.state.data.referOrgID : []
                        }
                        orgID={this.state.data.orgID ? this.state.data.orgID : 0}
                        postCallBack={this.postYKienChiDao2}
                    />}
                {/* {this.renderHeader()} */}
                {this.state.isLoading ? (<AppIndicator />) :
                (<ScrollView>
                    <View style={{backgroundColor: 'white', padding: 15, borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        <Text style={{fontWeight: 'bold', fontSize: titleSize, marginBottom: 10}}>{data.tieuDe}</Text>
                        <View style={{marginBottom: 30}}>
                            <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>Đơn vị phụ trách: {(data.orgName)}</Text>
                            <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>Ngày bắt đầu: {convertTime(data.createTime)}</Text>
                            <Text style={{color: 'grey', fontSize: textConlai, marginBottom: 8}}>Ngày kết thúc: {convertTime(data.publishTime)}</Text>
                            <Text style={{color: 'grey', fontSize: textConlai}}>Chủ đầu tư: {data.sumary}</Text>
                        </View>
                        {/* <Text style={{fontSize: contentSize, lineHeight: 25}}>{data.contents}</Text> */}
                        <HtmlText source={data.contents}  onLoaded={(text)=> {this.setState({noiDungHtml: text})}}></HtmlText>
                        {/* <TouchableOpacity style={{width: 10, height: 10, backgroundColor: 'red'}} onPress={() => this.props.navigation.navigate('CommandIdeaScreen')}></TouchableOpacity> */}
                    </View>

                    <View style={{backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        <AttachmentsBox itemId={this.state.id} callBackFunc={()=>{}}></AttachmentsBox>
                    </View>
                    <ProgressListBox itemId={this.state.id} callBackFunc={() => { }} ref={ref => { this._tientrinh = ref }}></ProgressListBox>
                    <SpeakerBox contents={[this.state.data.tieuDe, this.state.noiDungHtml]}></SpeakerBox>
                </ScrollView>)
                }
                <View style={{ height: verticalScale(106), width: scale(682) }}>
                    <TouchableOpacity
                        //   disabled = {this.state.disableButton}
                        style={{
                            margin: 10,
                            width: scale(682),
                            height: verticalScale(72),
                            borderColor: "lightgrey",
                            borderWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#3d5e8f",
                            //   this.state.disableButton ? '#999999' : "#3d5e8f",
                            flexDirection: "row"
                        }}
                        onPress={() => {
                            if (this._ideaBox) this._ideaBox.show();
                        }}
                    >
                        <Image
                            style={{ width: FONT_SIZE_28, height: FONT_SIZE_28 }}
                            source={require("../../../../../../assets/images/nhiem-vu/nhiem-vu-chi-tiet-add.png")}
                        />
                        <Text
                            style={{ color: "white", marginLeft: 10, fontSize: FONT_SIZE_28 }}
                        >
                            Ý KIẾN CHỈ ĐẠO
                        </Text>
                    </TouchableOpacity>
                </View>
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