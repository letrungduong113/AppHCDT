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
import AppIndicator from '../../../../user-controls/AppIndicator'
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
} from "native-base";

import CustomTabs2 from "../../../../navigation-controls/CustomTabs2";
import CustomHeader from "../../../../user-controls/CustomHeader";
import { scale, verticalScale, moderateScale } from "../../../../user-controls/utilities/Scale";
import LinhVucQuanLyAPI from '../../../../../services/api-service/linh-vuc-quan-ly-api';
import HanhChinhCongAPI from '../../../../../services/api-service/hanh-chinh-cong'
import PieChart from '../../../../user-controls/PieChart'
import Footer ,{footerMargin} from '../../../../user-controls/CustomFooter'
import Text from '../../../../../components/custom-view/text';
import ChiTieuFragment from '../../../../l2-bao-cao-va-dieu-hanh/new-chi-tieu'

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class MucTieuSo extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {text: '', isLoading: true, data_soNganh: [], soNganh:[],
        token: this.props.navigation.getParam("token"),
        id: this.props.navigation.getParam("id"),
        // navigation:this.props.navigation.getParam("navigation")
      }
    }

      render() {
        return(
            <ChiTieuFragment navigation={this.props.navigation} token= {this.state.token}></ChiTieuFragment>
        )
      }

}