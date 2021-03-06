import React, { Component } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Icon, View, Text } from "native-base";
  import {
    scale,
  } from "../utilities/Scale";

  export default class SuccessModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }
    hide() {
        this.setState({isVisible: false})
    }

    show() {
        this.setState ({isVisible: true});
    }

    render(){
        return(
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.5}
                visible={this.state.isVisible}
                onRequestClose={()=>{this.hide()}}
            >
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: this.state.isVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                    <View style={{ width: scale(683), height: scale(363), backgroundColor: "#ffffff", flexDirection: 'column', alignItems: "center" }}>
                        <View style={{ height: scale(90), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{width: '10%'}}></View>
                            <View style={{width: '80%', justifyContent: "center", alignItems: "center"}}><Text style={{ fontSize: scale(32), fontWeight: 'bold', color: "#333333" }}>{this.props.title? this.props.title: "Thông báo"}</Text></View>
                            <View style={{width: '10%', paddingRight: scale(20)}}><TouchableOpacity onPress={() => this.hide()}>
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
                                onPress={() => this.hide()}
                                style={{ backgroundColor: '#3d5e8f', width: scale(640), height: scale(72), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{this.props.button? this.props.button: 'OK'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
  }