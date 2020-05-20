import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, Picker, TextInput } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Footer,
  View,
  
} from "native-base";

import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer"
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import styles from "./styles";

export default class ThemNhiemVu extends Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: false, 
    }
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground source={require('../../../../images/headerbg.jpg')} style={{width: '100%', height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center", position: "relative"}}>
            <TouchableOpacity
                  onPress = {()=> {this.props.navigation.goBack(null);}}
                  style={{position: "absolute", left: 15}}>
                  <Icon active name="md-arrow-round-back" style={{color: 'white'}} />
            </TouchableOpacity>
            <Text style={{color: 'white', marginLeft: 10, fontWeight: "bold"}}>THÊM NHIỆM VỤ</Text>
        </ImageBackground>

        <Content>
          <View style={{marginTop: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, backgroundColor: 'white'}}>
            <Text>TIÊU ĐỀ NHIỆM VỤ</Text>
            <TextInput
                style={{width: '99%', height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                underlineColorAndroid='transparent'
            />
            <Text style={{marginTop: 5, paddingTop: 5}}>GIAO CHO</Text>
            <View style={{height: 40, width: '99%', borderColor: 'grey', borderWidth: 1}}>
                <Picker
                    selectedValue={this.state.language}
                    style={{height: 40, width: '99%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Sở hành chính" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            <Text style={{marginTop: 5, paddingTop: 5}}>THỜI GIAN</Text>
            <View style={{width: '99%', height: 40, flexDirection: "row"}}>
                <View style={{flex:48, borderColor: 'grey', borderWidth: 1}}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Ngày bắt đầu" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
                <View style={{flex: 4}}></View>
                <View style={{flex:48, borderColor: 'grey', borderWidth: 1}}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Ngày kết thúc" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <Text style={{marginTop: 5, paddingTop: 5}}>MỨC ĐỘ ƯU TIÊN</Text>
            <View style={{height: 40, width: '99%', borderColor: 'grey', borderWidth: 1}}>
                <Picker
                    selectedValue={this.state.language}
                    style={{height: 40, width: '99%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Bình thường" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            <Text style={{marginTop: 5, paddingTop: 5}}>NỘI DUNG NHIỆM VỤ</Text>
            <TextInput
                style={{width: '99%', height: 80, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 20}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                underlineColorAndroid='transparent'
            />
            <View style={{flexDirection: "row", width: '99%', marginBottom: 10 }}>
                <Text style={{marginRight: 105, marginTop: 10}}>VĂN BẢN ĐÍNH KÈM</Text>
                <TouchableOpacity style={{width: 150, height:40, borderColor: 'grey', borderWidth: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <Image source={require('../../../../images/logo/upload.png')} />
                    <Text style={{color:'#3D5F8F', marginLeft: 5}}>Tải lên</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '99%', height: 40, flexDirection: "row"}}>
                <TouchableOpacity style={{flex:48, borderColor: 'grey', borderWidth: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: '#3D5F8F'}}>HỦY</Text>
                </TouchableOpacity>
                <View style={{flex:4}}></View>
                <TouchableOpacity style={{flex:48,backgroundColor: '#3D5F8F', justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: 'white'}}>THÊM</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Content>

        <Footer style={{height: 60, backgroundColor: 'transparent'}}>
          <View>
              <CustomTabs2 active = '0'></CustomTabs2>
          </View>
        </Footer>
      </Container>
    );
  }
}
