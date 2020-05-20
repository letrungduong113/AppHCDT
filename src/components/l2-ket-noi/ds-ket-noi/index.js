import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"
import {
  Container,
  Content,
  Text,
  Icon,
  View
} from "native-base";

import styles from "./styles";
import Footer, { footerMargin } from '../../user-controls/CustomFooter';
import CustomHeader from "../../user-controls/CustomHeader";

import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'

var iconHeight = scale(80)
var iconWidth = scale(80)
var textSize = scale(25)

export default class DsKetNoiScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listData: [
        {name: GROBAL_RESOUCE.KET_NOI_TRUNG_UONG_TITLE, name2:'', icon: GROBAL_RESOUCE.KET_NOI_TRUNG_UONG_ICON, type: 1},
        {name: GROBAL_RESOUCE.KET_NOI_DIA_PHUONG_TITLE,  name2:'', icon: GROBAL_RESOUCE.KET_NOI_DIA_PHUONG_ICON, type: 2},
        {name: GROBAL_RESOUCE.KET_NOI_QUOC_TE_TITLE,  name2:'', icon: GROBAL_RESOUCE.KET_NOI_QUOC_TE_ICON, type: 3},
        
        
      ]
    };
  }

  componentDidMount() {
  }
  _renderFlatList = ({item}) => (
    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("DanhBaKetNoi", { title: item.name, type: item.type})}}>
    <View
      key={item.id}
      style={{
        // justifyContent: "center",
        // alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#f6f6f7",
        width: scale(330),
        marginRight: scale(20),
        height: scale(240),
        // marginTop: scale(8),
        marginBottom: scale(20),
        // borderColor: 'lightgrey', borderWidth: 0.5
        borderRadius: 7,
      }}
    >
      <View style={{lexDirection: "column", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        {/* <View style={{ justifyContent: "flex-end", alignItems: "center", flex: 1, backgroundColor: "blue"}}> */}
          <Image style={{ width: scale(100), height: scale(100), resizeMode: "contain" }} source={item.icon} />
        {/* </View> */}
        
      </View>

      <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
          <Text style={{ fontSize: scale(24), color: "#666666"}} numberOfLines={2}>{item.name}</Text>
          <Text style={{ fontSize: scale(24), color: "#666666"}} numberOfLines={2}>{item.name2}</Text>
      </View>

    </View>
  </TouchableOpacity>
  )
  render() {
    return (
      
      <Container style={styles.container}>
        <CustomHeader title={GROBAL_RESOUCE.KET_NOI_TITLE}></CustomHeader>

        <Content style={{marginBottom: footerMargin}}>
          {/* {console.log(this.state.listData)} */}
          <View style={{padding: 10}}>
          <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderFlatList}
            numColumns={2}
          />
          </View>
        </Content>
        <Footer select='0' />
      </Container>
    );
  }
}

