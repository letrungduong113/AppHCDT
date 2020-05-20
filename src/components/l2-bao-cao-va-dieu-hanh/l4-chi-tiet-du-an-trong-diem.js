import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Modal
} from "react-native";
import { connect } from "react-redux";
import ThongBaoModal from "../login2/thong-bao-1"
import PropTypes from "prop-types";
import YearMonthPicker from "../user-controls/YearPicker";
import moment from "moment";
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
  View
} from "native-base";
import Text from "../custom-view/text";
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import styles from "./styles";
import NhanNhiemVuAPI from "../../services/api-service/nhan-nhiem-vu-api";
import AppIndicator from "../user-controls/AppIndicator";
import Footer, { footerMargin } from "../user-controls/CustomFooter";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(22);
const win = Dimensions.get("window");
export default class ChiTietDuAnTrongDiemScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderThongTinChung(){
    return(
      <View style={{backgroundColor: "red", height: 0}}>

      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="CHI TIẾT DỰ ÁN" />
        <Content style={{ backgroundColor: "white" ,marginBottom:footerMargin}}>
          {this.renderThongTinChung()}


        </Content>
        <Footer select='0'/>
       
      </Container>
    );
  }
}
