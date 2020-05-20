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
import DanhSachVanBanAPI from "../../services/api-service/danh-sach-van-ban-api";
import {convertDate} from "../user-controls/utilities/converter";

import CommandIdeaBox, {COMMAND_TYPE} from "../user-controls/CommandIdeaBox";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
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

import CustomHeader from "../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../user-controls/AppIndicator";
import { BarChart, Grid } from 'react-native-svg-charts';
import ThongKeBox, {NEW_CATEGORY} from "../user-controls/ThongKeBox";

var FONT_SIZE_28 = scale(28);
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_24 = scale(24);
var FONT_SIZE_SUB = scale(22);
var FONT_SIZE_30 = scale(30);
var FONT_SIZE_60 = scale(60);
const win = Dimensions.get("window");
var sizeImg = scale(60);

export default class ThongKeKhanCapScreen extends Component {
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
          <ThongKeBox title="vấn đề khẩn cấp" catId={NEW_CATEGORY.KHAN_CAP}></ThongKeBox>
        </Content>
      </Container>
    );
  }
}
