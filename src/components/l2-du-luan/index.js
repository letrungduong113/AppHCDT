import React, { Component } from "react";
import { TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
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
  View,
  
} from "native-base";
import CustomHeader from "../user-controls/CustomHeader";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer"
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
var khungtinHeight = verticalScale(128)
var iconSize = scale(80)
var fontSize = scale(26)

export default class LangNgheDuLuanScreen extends Component {
  render() {
    return (
      <Container>
        <CustomHeader title="LẮNG NGHE DƯ LUẬN"></CustomHeader>
        <Content style={{marginBottom:footerMargin}}>
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.khungtin} onPress={() => this.props.navigation.navigate('')}>
              <View style={{flex: 20, justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('../../../assets/images/l2-du-luan/congdongmang.png')} style={{width: iconSize, height: iconSize}} />
              </View>

              <View style={{flex: 70, justifyContent: "center"}}>
                <Text style={{fontSize: fontSize}}>MẠNG XÃ HỘI</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <Icon name='ios-arrow-forward' style={styles.arrow} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khungtin} onPress={() => this.props.navigation.navigate('NguoiDan')}>
              <View style={{flex: 20, justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('../../../assets/images/l2-du-luan/nguoidan.png')} style={{width: iconSize, height: iconSize}} />
              </View>

              <View style={{flex: 70, justifyContent: "center"}}>
                <Text style={{fontSize: fontSize}}>NGƯỜI DÂN</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <Icon name='ios-arrow-forward' style={styles.arrow} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khungtin} onPress={() => this.props.navigation.navigate('')}>
              <View style={{flex: 20, justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('../../../assets/images/l2-du-luan/doanhnghiep.png')} style={{width: iconSize, height: iconSize}} />
              </View>

              <View style={{flex: 70, justifyContent: "center"}}>
                <Text style={{fontSize: fontSize}}>DOANH NGHIỆP</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <Icon name='ios-arrow-forward' style={styles.arrow} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khungtin} onPress={() => this.props.navigation.navigate('')}>
              <View style={{flex: 20, justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('../../../assets/images/l2-du-luan/baochi.png')} style={{width: iconSize, height: iconSize}} />
              </View>

              <View style={{flex: 70, justifyContent: "center"}}>
                <Text style={{fontSize: fontSize}}>BÁO CHÍ</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <Icon name='ios-arrow-forward' style={styles.arrow} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khungtin} onPress={() => this.props.navigation.navigate('')}>
              <View style={{flex: 20, justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('../../../assets/images/l2-du-luan/chuyengia.png')} style={{width: iconSize, height: iconSize}} />
              </View>

              <View style={{flex: 70, justifyContent: "center"}}>
                <Text style={{fontSize: fontSize}}>CHUYÊN GIA</Text>
              </View>

              <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <Icon name='ios-arrow-forward' style={styles.arrow} />
              </View>
            </TouchableOpacity>
          </View>
        </Content>
        <Footer select='0'/>

        {/* <Footer style={{height: 60, backgroundColor: 'transparent'}}>
          <View>
              <CustomTabs2 active = '0'></CustomTabs2>
          </View>
        </Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    texttab: {
        fontSize: 12,
        color: 'grey'
    },
    arrow: {
      color: 'grey'
    },
    khungtin: {
      width: '100%', height: khungtinHeight, flexDirection: "row", borderBottomColor: 'lightgrey', borderBottomWidth: 1
    }
})
