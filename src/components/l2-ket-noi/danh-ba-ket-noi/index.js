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
import CommonAPI from "../../../services/api-service/common-api";

import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'
const win = Dimensions.get("window");
var iconHeight = scale(80)
var iconWidth = scale(80)
var textSize = scale(25)

export default class DanhBaKetNoiScreen extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.ketnoiType = this.props.navigation.getParam("type")? this.props.navigation.getParam("type") : 1,
    this.pageTitle = this.props.navigation.getParam("title")? this.props.navigation.getParam("title").toString() : "KẾT NỐI",
    this.state = {
      isLoading: true,
      listData: []
    };
  }

  componentDidMount() {
    CommonAPI.getKetNoi(this.ketnoiType).then((res)=> {
      console.log(res);
      if (res && res.length) {
        this.setState({listData: res});
      }
    })
  }
  _renderItem = ({item}) => (
    
    <TouchableOpacity disabled = {true}>
      <View
      style={{
        // justifyContent: "center",
        // alignItems: "flex-start",
        backgroundColor: "white",
        width: win.width,
        padding: 10,
        paddingTop: 20,
        flex: 1, flexDirection: 'row',
        marginBottom: scale(20),
      }}>
        <View>
          {/* <Image source={item.image} style={{width: scale(70), height: scale(70)}}></Image> */}
          <Image source={require('../../../../images/logo/quochuy.png')} style={{width: scale(70), height: scale(70)}}></Image>
        </View>
        <View style={{marginLeft: 10,marginRight:70}}>
          <Text>{item.connection_name.toUpperCase()}</Text>
          <View style={styles.hozView}>
            <Image source={require('../../../../assets/images/l2-ket-noi/ico_address.png')} style={styles.itemInfoIcon}></Image>
            <Text style={styles.infoText}>Trụ sở: <Text style={{fontSize: scale(26)}}>{item.address}</Text></Text>
          </View>
          <View style={styles.hozView}>
            <Image source={require('../../../../assets/images/l2-ket-noi/ico_fax.png')} style={styles.itemInfoIcon}></Image>
            <Text style={styles.infoText}>Fax: <Text style={{fontSize: scale(26)}}>{item.fax}</Text></Text>
          </View>
          <View style={styles.hozView}>
            <Image source={require('../../../../assets/images/l2-ket-noi/ico_phone.png')} style={styles.itemInfoIcon}></Image>
            <Text style={styles.infoText}>Điện thoại: <Text style={{color: '#4695eb', fontSize: scale(26)}}>{item.phone}</Text></Text>
          </View>
          <View style={styles.hozView}>
            <Image source={require('../../../../assets/images/l2-ket-noi/ico_mail.png')} style={styles.itemInfoIcon}></Image>
            <Text style={styles.infoText}>Email: <Text style={{color: '#4695eb', fontSize: scale(26)}}>{item.email}</Text></Text>
          </View>
          <View style={styles.hozView}>
            <Image source={require('../../../../assets/images/l2-ket-noi/ico_web.png')} style={styles.itemInfoIcon}></Image>
            <Text style={styles.infoText}>Web: <Text style={{color: '#4695eb', fontSize: scale(26)}}>{item.website}</Text></Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
  render() {
    return (
      
      <Container style={styles.container}>
        <CustomHeader title={this.pageTitle}></CustomHeader>

        <Content style={{marginBottom: footerMargin}}>
          {/* {console.log(this.state.listData)} */}
          <View>
          <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => item.connection_name}
            renderItem={this._renderItem}
            numColumns={1}
          />
          </View>
        </Content>
        {/* <Footer select='0' /> */}
      </Container>
    );
  }
}

