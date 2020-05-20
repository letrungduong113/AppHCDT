import React, { Component } from "react";
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TienIchAPI from "../../../services/api-service/tien-ich-api";
import AppIndicator from "../../user-controls/AppIndicator";
import {
  Container,
  Content,
  Input,
  Button,
  Icon,
  View,
  Text,
  Footer
} from "native-base";
import styles from "./styles";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(24);

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  // if (pw.length > 12) {
  //   error.password = "max 11 characters";
  // }
  // if (pw.length < 5 && pw.length > 0) {
  //   error.password = "Weak";
  // }
  return error;
};

export default class LichSuCaNhanScreen extends Component {
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
      data: [],
      loadMore:false
    };
  }
  componentDidMount() {
    TienIchAPI.getDsLichSu(0, 10).then(res => {
      this.setState({ data: res, isLoading: false });
    });
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }
  loadMore(){
    //   this.setState({loadMore:true})
    //   TienIchAPI.getDsLichSu(this.state.data.length, 10).then(res => {
    //     if(res && !loadMore){
    //         this.setState({ data: this.state.data.concat(res), isLoading: false,loadMore:false });
    //     }
    //   });
  }
  renderItems() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: 400,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <AppIndicator />
        </View>
      );
    }
    else if (this.state.data) {
      return (
        <View style={styles.styleList}>{this.listItems(this.state.data)}</View>
      );
    }
  }
  getIconType(type) {
    switch (type) {
      case 1:
        return require("../../../../assets/images/lich-su/history-type-1.png");
      case 2:
        return require("../../../../assets/images/lich-su/history-type-2.png");
      case 3:
        return require("../../../../assets/images/lich-su/history-type-3.png");
      default:
        return require("../../../../assets/images/lich-su/history-type-1.png");
    }
  }
  getColorType(type) {
    switch (type) {
      case 0:
        return "#8E8E8E";
      case 1:
        return "#F08D68";
      case 2:
        return "#37517D";
      default:
        return "#C14A49";
    }
  }
  listItems(value) {
    return value.map((data, i) => {
      return (
        <TouchableOpacity
          style={{
            width: "100%",
            height: scale(126),
            backgroundColor: "white",
            flex: 1,
            flexDirection: "row",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5
          }}
          key={i}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              width: scale(70), height: scale(70) 
            }}
          >
            <Image
              style={{width:'100%', height:'100%'}}
              source={data.icon}
            />
          </View>

          <View style={{ justifyContent: "center", flex: 1, marginRight:20 }}>
            <Text numberOfLines = {2} style={{ fontSize: FONT_SIZE_MAIN, color: "#333333" }}>
              {data.tieuDe}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                    fontSize: FONT_SIZE_SUB,
                    color: "#999999"
                  }}
                >
                  {data.tenChucNang}
                </Text>
              </View>

              <View
                style={{ marginLeft: 10, height: 15, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: FONT_SIZE_SUB,
                    color: "#919191"
                  }}
                >
                  {data.ngayTacDongText}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }
  isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=contentSize.height - paddingToBottom;
  }
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="HOẠT ĐỘNG" />
        <Content
            onScroll={({nativeEvent}) => {
                if (this.isScrollEnd(nativeEvent) && !this.state.loadMore) {
                    this.loadMore()
                }}}
            >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              this.props.navigation.navigate("TimkiemLichSu");
            }}
          >
            <View
              style={{
                width: scale(682),
                height: scale(72),
                alignItems: "center",
                marginTop: 10,
                borderColor: "lightgray",
                borderWidth: 1,
                flexDirection: "row",
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-search" style={{ color: "gray" }} />
              </View>
              <View
                style={{
                  flex: 9,
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{ fontSize: FONT_SIZE_MAIN, color: "#b7b7b7" }}
                >
                  Tìm kiếm
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {this.renderItems()}
        </Content>

        {/* <Footer style={{ height: 60, backgroundColor: "transparent" }}>
          <View>
            <CustomTabs2 active="3" />
          </View>
        </Footer> */}
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

// const AnnounceSwagger = connect(
//   mapStateToProps,
//   bindAction
// )(LichSuCaNhanScreen);
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
