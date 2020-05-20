import React from "react";
import { StyleSheet ,Dimensions} from "react-native";
import { AppRegistry, Image, TouchableOpacity } from "react-native";

import {
  Text,
  Container,
  Content,
  Icon,
  View,
} from "native-base";

class PercentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        percent:this.props.percent,
        value:this.props.value,
        title:this.props.title
    }
  }
  render() {
    return (
      <View style={{backgroundColor:'white',width:Dimensions.get('window').width-40}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text>{this.props.title}</Text>
                <Text style={{color:'#365899'}}>{this.props.value}</Text>
            </View>
            <View style={{flexDirection:'row',height:10}}>
            <View style={{flex:this.state.percent,backgroundColor:'#365899'}}></View>
                <View style={{flex:(100-this.state.percent),backgroundColor:'#f5f5f5'}}></View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default PercentBox;
