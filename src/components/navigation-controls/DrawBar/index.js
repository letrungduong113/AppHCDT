import React from "react";
import { AppRegistry, Image, TouchableOpacity, BackHandler } from "react-native";
import StorageService from "../../../services/storage-service";

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

export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {isLogined: false, loginName: ""}

  }
  logOut = ()=> {
    StorageService.removeValue("userid");
    StorageService.removeValue("userlevel");
    StorageService.removeValue("profilename");
    this.props.navigation.navigate("Login");
  
  }
  render() {
    StorageService.loadValue('profilename').then((value)=>{
      if (value) {
        this.setState({isLogined: true, loginName: value})
      }
    });

    return (
      <Container>
        <Content style={{marginTop:20}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center', margin: 10}}>
            {/* <Image square style={{width: 32, height: 32}} source={require('../../../images/applogo.png')}/> */}
            <Text style={{color: 'green'}}>&nbsp;TTĐH BẮC NINH</Text>
          </View>
          <List>
            <ListItem onPress = {this.logOut} style={{display: this.state.isLogined? 'flex': 'none'}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon name="ios-log-out" style={{color: 'red', marginRight: 5}}/>
                <Text>Đăng xuất&nbsp;<Text style={{fontWeight: 'bold'}}>{this.state.loginName}</Text></Text>
              </View>
            </ListItem>
            <ListItem onPress = {()=> this.props.navigation.navigate("Login")}  style={{display: this.state.isLogined? 'none': 'flex'}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon name="ios-log-in" style={{color: 'darkgreen', marginRight: 5}}/>
                <Text>Đăng nhập</Text>
              </View>
            </ListItem>
            <ListItem onPress = {()=> BackHandler.exitApp()}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon name="ios-power" style={{color: 'red', marginRight: 5}}/>
                <Text>Thoát chương trình</Text>
              </View>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
