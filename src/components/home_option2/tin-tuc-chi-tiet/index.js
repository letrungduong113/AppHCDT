import React, { Component } from "react";
import {
  WebView,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  View
} from "native-base";

import CustomHeader from "../../user-controls/CustomHeader";
import styles from "./styles";
import AppIndicator from "../../user-controls/AppIndicator";
import SpeakerBox from "../../user-controls/SpeakerBox";

const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.body.innerText); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default class TinTucChiTietHomeScreen extends Component {
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
      isLoading: false,
      link: "http://aicdemo.com/0rikkei/hcdt/public/api/client/tin_tuc_chi_tiet_bn?url=" + this.props.navigation.getParam("news_link"),
      htmlContent: "",
    };
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Nội dung chi tiết" />

        
        <View style={{ flex: 1, backgroundColor:'white', height: '100%', width: '100%', padding: 10}}>
          <WebView
            source = {{uri:this.state.link}} 
            onLoadEnd = {this.webViewLoaded}
            scalesPageToFit={Platform.OS == "android"}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={event => {
              if (Platform.OS =="android") {
                strData = event.nativeEvent.data;
              }
              else {
                strData = decodeURIComponent(event.nativeEvent.data);
                strData = decodeURIComponent(strData);
              }
              
              this.setState({htmlContent:strData}); 
            }}
            injectedJavaScript ={webViewScript}
            renderLoading = {()=>(<AppIndicator/>)}/>
            <SpeakerBox contents = {this.state.htmlContent}/>
        </View>
          {/* <WebView 
                source = {{uri:this.state.link}} 
                style={{width: scale(deviceWidth), height: 650, paddingHorizontal: 10}} 
                scalesPageToFit={Platform.OS =="android"} javaScriptEnabled={true}/> */}
        
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
// )(TinTucChiTietScreen);
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
