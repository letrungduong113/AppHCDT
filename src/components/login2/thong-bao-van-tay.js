import React, { Component } from "react";
import {
    Image,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    Modal,
    TouchableOpacity
  } from "react-native";
  import {
    Container,
    Content,
    Input,
    Button,
    Icon,
    View,
    Text
  } from "native-base";
  import styles from "./styles";
  import {
    scale,
    verticalScale,
    moderateScale
  } from "../user-controls/utilities/Scale";

  export default class ThongBaoVanTayModal extends Component{

    _closeModal() {
        this.props.onClose();
    }
    touchEnable(){
        this._closeModal();
        this.props.touchEnable();
    }
    render(){
        return(
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: scale(683), backgroundColor: "#ffffff", flexDirection: 'column', alignItems: "center" }}>
                    <View style={{ height: scale(90), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{width: '10%'}}></View>
                        <View style={{width: '80%', justifyContent: "center", alignItems: "center"}}><Text style={{ fontSize: scale(32), fontWeight: 'bold', color: "#333333" }}>{this.props.title}</Text></View>
                        <View style={{width: '10%', paddingRight: scale(20)}}><TouchableOpacity onPress={() => this._closeModal()}>
                            <Icon
                                name="close"
                                style={{ color: "gray", fontSize: 35 }}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: scale(640), height: 1, backgroundColor: "#f3f3f3" ,marginBottom:scale(17)}}></View>
                    <Image source={require('../../../assets/images/thumbprint-blue.png')} style={{width:scale(101), height:scale(108)}}/>
                    <View style={{ height: scale(175), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: scale(110), paddingRight: scale(110) }}>
                        <Text style={{textAlign: 'center', color: "#333333",fontSize:scale(28)}}>{this.props.content}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',paddingBottom:scale(17)  }}>
                        <TouchableOpacity 
                            onPress={() => this.touchEnable()}
                            style={{ backgroundColor: '#3d5e8f', width: scale(640), height: scale(72), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{this.props.button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
  }