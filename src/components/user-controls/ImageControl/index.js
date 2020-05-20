import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
const win = Dimensions.get("window");
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
} from "native-base";


export default class ImageControl extends Component {
  static propTypes = {
    image: PropTypes.string,
};

  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={{padding: 10, backgroundColor: 'white'}}>
        <AutoHeightImage
          width={win.width -20}
          source={this.props.image}
        />
      </View>
    )
  }

}