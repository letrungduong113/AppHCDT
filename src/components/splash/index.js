import React, { Component } from "react";
import {
  Image,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Modal,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  View
} from "react-native";
import AppIndicator from "../user-controls/AppIndicator";
import { Container, Content } from "native-base";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import {GROBAL_RESOUCE}  from "../../../assets/strings/string-bn.js"
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 500);
    setTimeout(()=>this.setState({ isLoading: true }), 1000);
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
        }
    }
  
  render() {
    return (
      <Container style={{ position: "relative" }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} /> 
        <ImageBackground
          source={GROBAL_RESOUCE.IMAGE_BACKGROUND}
          style={{ width: deviceWidth, height: deviceHeight }}
          resizeMode="cover"
        />
        <Image
          source={require("../../../assets/images/nen.png")}
          style={{
            width: deviceWidth,
            height: deviceHeight,
            position: "absolute"
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center"
                  // marginTop: verticalScale(29) ahii
                }}
              >
                <Image
                  source={GROBAL_RESOUCE.IMAGE_QUOC_HUY_LOGIN}
                  style={{ width: scale(128), height: scale(128) }}
                />
                <Text
                  style={{
                    color: "#ffe3ae",
                    margin: 3,
                    marginTop: verticalScale(29),
                    fontSize: scale(31),
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {GROBAL_RESOUCE.APP_TITLE}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: scale(31)
                  }}
                >
                  {GROBAL_RESOUCE.APP_TITLE_2}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1}}>
                {this.state.isLoading?(<ActivityIndicator style={{marginTop: verticalScale(67)}} size="large" color="white"></ActivityIndicator>):(<View/>)}
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
