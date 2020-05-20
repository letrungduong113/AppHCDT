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

  export default class ThongBaoModal extends Component{

    _closeModal() {
        this.props.onClose();
    }
    logout() {
        this._closeModal();
        this.props.logout();
    }
    render(){
        return(
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" , backgroundColor:"rgba(0,0,0,0.5)"}}>
                <View style={{ width: scale(683), height: scale(363), backgroundColor: "#ffffff", flexDirection: 'column', alignItems: "center" }}>
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
                    <View style={{ width: scale(640), height: 1, backgroundColor: "#f3f3f3" }}></View>
                    <View style={{ height: scale(175), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: scale(110), paddingRight: scale(110) }}>
                        <Text style={{textAlign: 'center', color: "#333333"}}>{this.props.content}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
                        <TouchableOpacity 
                            onPress={() => this.logout()}
                            style={{ backgroundColor: '#3d5e8f', width: scale(640), height: scale(72), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{this.props.button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
  }