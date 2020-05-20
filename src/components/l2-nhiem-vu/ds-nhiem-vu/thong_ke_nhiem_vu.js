import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DanhSachVanBanAPI from "../../../services/api-service/danh-sach-van-ban-api";
import {convertDate} from "../../user-controls/utilities/converter";

import CommandIdeaBox, {COMMAND_TYPE} from "../../user-controls/CommandIdeaBox";
import ThongKeBox, {NEW_CATEGORY} from "../../user-controls/ThongKeBox";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
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
  Picker,
  Footer,
  View
} from "native-base";

import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../../user-controls/AppIndicator";
import AttachmentsBox from "../../user-controls/AttachmentsBox";
import ProgressListBox from "../../user-controls/ProgressListBox";

var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_60 = scale(60);
const win = Dimensions.get("window");
var sizeImg = scale(60);

export default class ThongKeNhiemVuScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    // name: PropTypes.string,
    // setIndex: PropTypes.func,
    // list: PropTypes.arrayOf(PropTypes.string),
    // openDrawer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: this.props.navigation.getParam("id"),
      text_type: this.props.navigation.getParam("text_type"),
      data: {},
      progressList: [],
      progressSize: 0,
      isLoadMore:false,
      offset:1
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="THỐNG KÊ" />
        <Content>
        <View
            style={{
              backgroundColor:'#f6f6f6',
              marginTop: 10,
              width: '100%',
              height: verticalScale(73),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                // backgroundColor: text_type ? "#3d5f90" : "white",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                if (!this.state.text_type) {
                  this.setState({
                    isLoading: false,
                    data: [],
                    text_type: true
                  })
                  //todo thao tác với văn bản đến
                }
              }}
            >
              <View style={{
                height: '100%',
                justifyContent:'center',
                alignItems:'center',
                borderBottomWidth: 1,
                borderBottomColor: this.state.text_type ? '#666666' : '#f6f6f6'
              }}>
                <Text
                  style={{
                    color:this.state.text_type ? "#666666" : "#999999",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  NHIỆM VỤ NHẬN
              </Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: "100%",
                // backgroundColor: "white",
                // backgroundColor: text_type ? "white" : "#3d5f90",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                if (this.state.text_type) {
                  this.setState({
                    isLoading: false,
                    data: [],
                    text_type: false
                  })
                  //todo thao tác với văn bản đi
                }
              }}
            >
              <View style={{
                justifyContent:'center',
                alignItems:'center',
                height: '100%',
                borderBottomWidth: 1,
                borderBottomColor: this.state.text_type ? '#f6f6f6' : '#666666'
              }}>
                <Text
                  style={{
                    color: this.state.text_type ? "#999999" : "#666666",
                    fontSize: FONT_SIZE_MAIN
                  }}
                >
                  NHIỆM VỤ GIAO
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ThongKeBox title="nhiệm vụ" catId={NEW_CATEGORY.NHIEM_VU}></ThongKeBox>
        
        </Content>
      </Container>
    );
  }
}
