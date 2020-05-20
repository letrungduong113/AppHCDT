import React from "react";
import { StyleSheet } from "react-native";
import { AppRegistry, Image, TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';

import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
} from "native-base";
const routes = [
  { screen: "Home", icon: require('../../../../assets/images/navigation/bottom_home.png'), iconActive: require('../../../../assets/images/navigation/bottom_home_active.png'), text: "Trang chủ"},
  { screen: "ThongBao", icon: require('../../../../assets/images/navigation/bottom_thongbao.png'), iconActive: require('../../../../assets/images/navigation/bottom_thongbao_active.png'), text: "Thông báo"},
  { screen: "CaNhan", icon: require('../../../../assets/images/navigation/bottom_user.png'), iconActive: require('../../../../assets/images/navigation/bottom_user_active.png'), text: "Tiện ích"},
  { screen: "TroLyAo", icon: require('../../../../assets/images/navigation/bottom_chatbot.png'), iconActive: require('../../../../assets/images/navigation/bottom_chatbot_active.png'), text: "Trợ lý thông minh"},
  
];

class CustomTabs2 extends React.Component {
  constructor(props) {
    super(props);
    //alert(props.active);
  }
  static navigationOptions = {
    header: null
  };

  activeColor (i) {
    if (i == this.props.active) {
      return '#dd0000';
    }
    else {
      return 'darkgrey';
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', backgroundColor: 'white', width: '100%'}} >
            {
                routes.map((element, i) => {
                  return (
                    <TouchableOpacity key={i}
                        style = {styles.button}
                        onPress = {()=> {this.props.navigation.navigate(element.screen); /*alert(element.screen);*/}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 4, marginBottom: 4}}>
                          {/* <Icon active name={element.icon} style={{color: this.activeColor(i)}}/> */}
                          <Image active source={i != this.props.active ? element.icon: element.iconActive} style={{width: 30, height: 25, marginBottom: 7}} />
                          <Text style={{fontSize: 10, color: this.activeColor(i)}}>{element.text}</Text>
                        </View>
                    </TouchableOpacity>
                  );
              })
            }
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    button: {

    },
    buttonIcon: {
        width: 32,
        height:32,
    },
    buttonText: {
      fontSize:8,
    }
});

export default withNavigation(CustomTabs2);
