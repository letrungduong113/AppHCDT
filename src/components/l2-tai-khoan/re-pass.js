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

  export default class InputModalPass extends Component{

    _closeModal() {
        this.props.onClose();
    }
    _closeSend(){
        this.props.onSend(this.state.userName, this.state.email);
    }
    constructor(props){
        super(props);
        this.state={
            iconUser: "",
            iconEmail: "",
            userName: "",
            email: "",
            disableButton: true
        }
    }
    hideIconUser(){
        this.setState({
          userName: "",
          iconUser: false,
      })
      }
    hideIconEmail(){
        this.setState({
          email: "",
          iconEmail: false,
          disableButton: true,
      })
    }

    render(){
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: scale(683),
                height: verticalScale(625),
                backgroundColor: "#ffffff",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ width: "10%" }} />
                <View
                  style={{
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: scale(32),
                      fontWeight: "bold",
                      color: "#333333"
                    }}
                  >
                    {this.props.title}
                  </Text>
                </View>
                <View style={{ width: "10%", paddingRight: scale(20) }}>
                  <TouchableOpacity onPress={() => this._closeModal()}>
                    <Icon
                      name="close"
                      style={{ color: "gray", fontSize: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: scale(638),
                  height: 1,
                  backgroundColor: "#f3f3f3"
                }}
              />
              <View
                style={{
                  flex: 425,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {/* <Text style={{textAlign: 'center', color: "#333333"}}>{this.props.content}</Text> */}
                <View style={{ flex: 140, width: scale(638) }}>
                  <Text
                    style={{
                      fontSize: scale(28),
                      textAlign: "center",
                      marginTop: verticalScale(31)
                    }}
                  >
                    {this.props.content}
                  </Text>
                </View>
                <View style={{ flex: 198, fexDirection: "column" }}>
                  <View style={{ flex: 98, flexDirection: "row" }}>
                    {/* <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/login/acc.png")}
                        style={{ width: scale(35), height: scale(35) }}
                      />
                    </View>
                    <View style={{ flex: 10 }}>
                      <Input
                        style={{ color: "black", fontSize: scale(28) }}
                        placeholder="Nhập tên tài khoản"
                        placeholderTextColor="#rgba(0, 0, 0, 0.5)"
                        value={this.state.userName}
                        onChangeText={text => {
                          this.setState({ userName: text });
                          if (text == "") {
                            this.setState({ iconUser: false });
                          } else {
                            this.setState({ iconUser: true });
                          }
                        }}
                      />
                    </View> */}
                    {/* <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      {this.state.iconUser == true ? (
                        <TouchableOpacity
                          onPress={() => this.hideIconUser()}
                        >
                          <Image
                            source={require("../../../assets/images/login/shape_1_copy_5.png")}
                            style={{
                              width: scale(32),
                              height: scale(32)
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}
                    </View> */}
                  </View>
                  {/* <View
                    style={{
                      width: scale(638),
                      flex: 1,
                      backgroundColor: "#999999"
                    }}
                  /> */}

                  <View style={{ flex: 98, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/login/mail.png")}
                        style={{ width: scale(31), height: scale(23) }}
                      />
                    </View>
                    <View style={{ flex: 10 }}>
                      <Input
                        style={{ color: "black", fontSize: scale(28) }}
                        placeholder="Nhập email đã đăng ký"
                        placeholderTextColor="#rgba(0, 0, 0, 0.5)"
                        value={this.state.email}
                        onChangeText={text => {
                          this.setState({ email: text });
                          if (text == "") {
                            this.setState({
                              iconEmail: false,
                              disableButton: true
                            });
                          } else {
                            this.setState({
                              iconEmail: true,
                              disableButton: false
                            });
                          }
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      {this.state.iconEmail == true ? (
                        <TouchableOpacity
                          onPress={() => this.hideIconEmail()}
                        >
                          <Image
                            source={require("../../../assets/images/login/shape_1_copy_5.png")}
                            style={{
                              width: scale(32),
                              height: scale(32)
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: scale(638),
                      flex: 1,
                      backgroundColor: "#999999"
                    }}
                  />
                </View>
                <View style={{ flex: 109, backgroundColor: "white" }}>
                  {/* <Text>nothing</Text> */}
                </View>
              </View>
              <View
                style={{
                  flex: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  disabled={this.state.disableButton}
                  onPress={() => this._closeSend()}
                  style={{
                    backgroundColor: this.state.disableButton? '#cdcdcd': "#3d5e8f",
                    // backgroundColor: "#3d5e8f",
                    width: scale(640),
                    height: scale(72),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {this.props.button}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  }