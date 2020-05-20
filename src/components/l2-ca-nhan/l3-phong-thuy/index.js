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

import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'

var iconHeight = scale(80)
var iconWidth = scale(80)
var textSize = scale(25)

export default class PhongThuyScreen extends Component {
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
      isLoading: true,
      listData: [
        {text: 'Kiến thức phong thủy', image: require('../../../../assets/images/canhan/phong_thuy_ngay.png'), screen: 'PhongThuyHangNgay'},
        // {text: 'Xem hướng nhà', image: require('../../../../assets/images/canhan/phong_thuy_huong_nha.png'), screen: ''},
        //{text: 'Tình yêu- hôn nhân', image: require('../../../../assets/images/canhan/phong_thuy_tinh_yeu.png'), screen: ''},
        {text: 'Lãnh đạo nên biết', image: require('../../../../assets/images/canhan/phong_thuy_doanh_nhan.png'), screen: 'PhongThuyHangNgay'},
        //{text: 'Thước Lỗ Ban', image: require('../../../../assets/images/canhan/phong_thuy_lo_ban.png'), screen: ''},
        {text: 'Phong thủy văn phòng', image: require('../../../../assets/images/canhan/phong_thuy_van_phong.png'), screen: 'PhongThuyHangNgay'},
        {text: 'Vật phẩm phong thủy', image: require('../../../../assets/images/canhan/phong_thuy_vat_pham.png'), screen: 'PhongThuyHangNgay'},
        
      ]
    };
  }

  componentDidMount() {
  }
  _renderItem = ({item}) => (

        <TouchableOpacity onPress={() => this.props.navigation.navigate(item.screen)} key={item.id}>
          <View style={{ backgroundColor: "white" }}>
            <View
              style={[
                styles.containerRow,
                {
                  alignItems: "center",
                  marginLeft: 8,
                  marginRight: 8,
                  paddingVertical: 15,
                  paddingHorizontal: 8,
                }
              ]}
            >
              {/* {isRead?<View>} */}
              <View style={[styles.iconItem,]}>
                <Image 
                  source={item.image}
                  style={{ width: iconWidth, height: iconHeight }}
                />
              </View>
              <View style={{ flex: 9 }}>
                <Text style={{ marginLeft: 8, fontSize: textSize, textTransform: 'uppercase' }} numberOfLines={2}>
                  {item.text.toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
                <Icon
                  active
                  name="ios-arrow-forward"
                  style={{ color: "#bababa" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
        </TouchableOpacity>
  )
  render() {
    return (
      
      <Container style={styles.container}>
        <CustomHeader title="PHONG THỦY"></CustomHeader>

        <Content style={{marginBottom: footerMargin}}>
          {/* {console.log(this.state.listData)} */}
          <View>
          <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => item.text}
            renderItem={this._renderItem}
            numColumns={1}
          />
          </View>
        </Content>
        <Footer select='0' />
      </Container>
    );
  }
}

