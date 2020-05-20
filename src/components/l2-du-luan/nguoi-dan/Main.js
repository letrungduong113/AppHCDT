import React, { Component } from "react";
import { TouchableOpacity, Image, TextInput, StyleSheet,Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  
} from "native-base";
import Animated from 'react-native-reanimated';
import CustomHeader from "../../user-controls/CustomHeader";
import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer"
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import Text from '../../../components/custom-view/text';
// import {scale, verticalScale, moderateScale} from '../../../user-controls/utilities/Scale'
import {scale, verticalScale,moderateScale } from "../../user-controls/utilities/Scale";
import {getPaddingTop,getHeaderSize} from '../../user-controls/utilities/StatusBar'
import Footer ,{footerMargin,footerHeight} from '../../user-controls/CustomFooter'
import ThongKe from './thong-ke';
import YKien from './y-kien';
// import styles from "./styles";

var searchHeight = verticalScale(72)
var searchWidth = scale(682)
var text = scale(24)
var tabHeight = verticalScale(64)
const deviceHeight = Dimensions.get("window").height;

export default class Main extends Component {

  FirstRoute = () => (
    <ThongKe navigation={this.props.navigation}></ThongKe>
  );
  SecondRoute = () => (
    <YKien navigation={this.props.navigation}></YKien>
  );

renderTabBar = props => <TabBar {...props}
    
    indicatorStyle={{ backgroundColor: '#047ef2' }}
    style={{ backgroundColor: 'white'}}
    activeColor="red"
    labelStyle = {{color:'#666666',fontSize: scale(22)}}
   
    // tabStyle = {{color:'green'}}
     />;


  constructor() {
    super();
    this.state = {
      isLoading: false,
      tabActive: 'ThongKe',
      index: 0,
      routes: [
        { key: 'first', title: 'Thống kê' },
        { key: 'second', title: 'Ý kiến người dân' }
      ],
    }

  }
  
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Ý kiến người dân"></CustomHeader>
        {/* <Content> */}

        <View style={{backgroundColor: 'white', height:deviceHeight-getHeaderSize(), paddingBottom:footerMargin}}>
            
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.SecondRoute,
              })}
              labelStyle={{fontSize:30,fontWeight:'bold'}}
              scrollEnabled={true}
              renderTabBar={this.renderTabBar}
              onIndexChange={index => {
              this.setState({index})
              }}
              initialLayout={{ width: Dimensions.get('window').width}}
            />
            </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    texttab: {
        fontSize: 25,
        color: 'grey'
    }
})
