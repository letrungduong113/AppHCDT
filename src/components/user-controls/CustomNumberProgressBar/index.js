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

class CustomNumberProgressBar extends React.Component {
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
      <View style={styles.container}>
        <Text numberOfLines={1} style={{ backgroundColor: this.getColor(this.props.value), color: 'white', textAlign: 'center', flex: this.props.value }}>{this.props.value}%</Text>
        <Text style={{ backgroundColor: '#dedede', flex: (100 - this.props.value)}}> </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
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

export default CustomNumberProgressBar;
