import React from "react";
import { StyleSheet } from "react-native";
import { AppRegistry, Image, TouchableOpacity } from "react-native";

import {
  Text,
  Container,
  Content,
  Icon,
  View,
} from "native-base";

class CustomBadge extends React.Component {
  constructor(props) {
    super(props);
  }
  getColor(value) {
    let color = ["#ec3a3a", "#31a03e", "#2fbab5", "#5374a7"];
    if (value < 20) {
      return color[0];
    } else if (value < 30) {
      return color[1];
    } else if (value < 65) {
      return color[2];
    } else {
      return color[3];
    }

  }
  render() {
    return (
      <View style={[styles.container,{backgroundColor: this.getColor(this.props.percent)}]}>
        <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center'}}>{this.props.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width:30,
    borderRadius:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {

  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  buttonText: {
    fontSize: 8,
  }
});

export default CustomBadge;
