import React, { Component } from "react";
import { TouchableOpacity, Image, ImageBackground, Dimensions, FlatList } from "react-native";
import { connect } from "react-redux";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import PropTypes from 'prop-types';
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
  Footer,
  View,

} from "native-base";
import CustomHeader from "../../user-controls/CustomHeader";
import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer";
import styles from "./styles";

const deviceWidth = Dimensions.get('window').width;

export default class CamNangCaNhanScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="CẨM NANG"></CustomHeader>


        <Content style={{ flex: 1,backgroundColor:'#EDECED'}}>
          <View style={{ backgroundColor: 'white', borderBottomColor: 'transparent', borderBottomWidth: 1 }}>
            <View style={[styles.containerRow, { alignItems: 'center', marginLeft: 8, marginRight: 8, padding: 8 }]}>
              <View>
                <Image source={require('../../../../assets/images/canhan/lichvnico.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
              </View>
              <View style={{ flex: 9}}>
                <Text style={{ marginLeft: 8 }} numberOfLines={1} >Lịch vạn niên</Text>
                <Text style={{ marginLeft: 8, color: '#888888' }}  numberOfLines={1}>Tra cứu thông tin ngày tốt xấu</Text>
              </View>
              <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                <Icon active name="ios-arrow-forward" style={{ color: '#bababa' }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: 'white', borderBottomColor: 'transparent', borderBottomWidth: 1 }}>
            <View style={[styles.containerRow, { alignItems: 'center', marginLeft: 8, marginRight: 8, padding: 8 }]}>
              <View>
                <Image source={require('../../../../assets/images/canhan/phongthuyico.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
              </View>
              <View style={{ flex: 9}}>
                <Text style={{ marginLeft: 8 }} numberOfLines={1} >Kiến thức về phong thủy</Text>
                <Text style={{ marginLeft: 8, color: '#888888' }}  numberOfLines={1}>Tra cứu thông tin hữu ích về phong thủy</Text>
              </View>
              <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                <Icon active name="ios-arrow-forward" style={{ color: '#bababa' }} />
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <Footer style={{height: 60, backgroundColor: 'transparent'}}>
          <View>
            <CustomTabs2 active='3'></CustomTabs2>
          </View>
        </Footer>
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

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(CamNangCaNhanScreen);
// const DrawNav = DrawerNavigator(
//   {
//     Announce: { screen: AnnounceSwagger },
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
