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
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
import { setIndex } from "../../redux/actions/list";
import { openDrawer } from "../../redux/actions/drawer";
import styles from "./styles";
import CustomTabs2 from "../navigation-controls/CustomTabs2";
import CustomHeader from "../user-controls/CustomHeader";
import LinhVucQuanLyAPI from '../../services/api-service/linh-vuc-quan-ly-api'
import AppIndicator from '../user-controls/AppIndicator'
import Text from '../../components/custom-view/text';

import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

var iconHeight = scale(80)
var iconWidth = scale(80)
var textSize = scale(26)
var khungHeight = verticalScale(128)

var khungtinHeight = verticalScale(128)
var iconSize = scale(80)
var fontSize = scale(26)

export default class QuanLyNoiBoScreen extends Component {
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
      listData: []
    };
  }

  componentDidMount() {
    LinhVucQuanLyAPI.getLinhVuc().then((res)=>{
      // alert(JSON.stringify(res));
      this.setState({listData: res, isLoading: false});
    });
    // LinhVucQuanLyAPI.getDonViPhuTrach(1,10).then(res =>{
    //   alert(JSON.stringify(res))
    // })
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  _renderItem = ({item}) => (

        <TouchableOpacity onPress={() => this.props.navigation.navigate(item.screen)} key={item.id}>
            <View
              style={{
                  alignItems: "center",
                  padding: 8,
                  borderBottomColor: 'lightgrey',
                  borderBottomWidth: 0.5,
                  width: '100%',
                  height: khungHeight, flexDirection: "row", backgroundColor: 'white'
                }}>
              {/* {isRead?<View>} */}
              <View
                style={[
                  styles.iconItem,
                ]}
              >
                <Image
                  source={item.image}
                  style={{ width: iconWidth, height: iconHeight }}
                />
              </View>
              <View style={{ flex: 9 }}>
                <Text style={{ marginLeft: 8, fontSize: textSize, color: 'black' }} numberOfLines={2}>
                  {item.text}
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
        </TouchableOpacity>
  )

  // listItems2(value) {
  //   return value.map((data, i) => {
  //     return (
  //       <View key={i}>
  //         <View style={{ backgroundColor: "#f8f8f8" }}>
  //           <View
  //             style={[
  //               styles.containerRow,
  //               {
  //                 alignItems: "center",
  //                 marginLeft: 8,
  //                 marginRight: 8,
  //                 padding: 8
  //               }
  //             ]}
  //           >
  //             <View style={styles.iconItemDisable}>
  //               <Image
  //                 source={require("../../../assets/images/ic_bell.png")}
  //                 style={{ width: 25, height: 25, resizeMode: "contain" }}
  //               />
  //             </View>
  //             <View style={{ flex: 9 }}>
  //               <Text style={{ marginLeft: 8 }} numberOfLines={1}>
  //                 Mật khẩu dùng đã quá 90 ngày. Cảnh báo....
  //               </Text>
  //               <Text
  //                 style={{ marginLeft: 8, color: "#888888" }}
  //                 numberOfLines={1}
  //               >
  //                 Công ty CP và xếp dỡ Quảng Ninh copy
  //               </Text>
  //             </View>
  //             <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
  //               <Icon
  //                 active
  //                 name="ios-arrow-forward"
  //                 style={{ color: "#bababa" }}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   });
  // }

  // renderItems() {
  //   return (
  //     <View>
  //       <View>{this.listItems(this.state.data)}</View>
  //     </View>
  //   );
  // }

  render() {
    return (  
      <Container style={styles.container}>
        <CustomHeader title="LĨNH VỰC QUẢN LÝ"></CustomHeader>

        <Content style={{marginBottom:footerMargin}}>
          <View style={{flex: 1}}>
            {this.state.isLoading ? (<AppIndicator />) :
              (<FlatList
                data={this.state.listData}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={this._renderItem}
                numColumns={1}
              />)
            }
          </View>
        </Content>
        <Footer select='0'/>
      </Container>
    );
  }
}

// function bindAction(dispatch) {
//   return {
//     setIndex: index => dispatch(setIndex(index)),
//     openDrawer: () => dispatch(openDrawer())
//   };
// }
// const mapStateToProps = state => ({
//   name: state.user.name,
//   list: state.list.list
// });

// const AnnounceSwagger = connect(
//   mapStateToProps,
//   bindAction
// )(QuanLyNoiBoScreen);
// const DrawNav = DrawerNavigator(
//   {
//     Announce: { screen: AnnounceSwagger }
//   },
//   {
//     contentComponent: props => <DrawBar {...props} />
//   }
// );
// const DrawerNav = null;
// DrawNav.navigationOptions = ({ navigation }) => {
//   DrawerNav = navigation;
//   return {
//     header: null
//   };
// };
// export default DrawNav;
