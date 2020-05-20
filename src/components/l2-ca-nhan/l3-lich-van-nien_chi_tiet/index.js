import React, { Component } from "react";
import { Platform, WebView } from "react-native";
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  View,

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

export default class LichVanNienChiTietScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    //   url:'https://222.254.35.115',
      url: 'http://aicdemo.com/0rikkei/hcdt/public/api/crawler/lich_van_nien_chi_tiet?ngay=' + this.props.navigation.getParam("ngayHienTai"),
      dataNgay: {},
      htmlContent: ""
    }
  }

 

  componentDidMount() {
  }

  webViewLoaded = (e) => {
    //alert('loaded');
    this.setState({isLoading: false})
  }
  render() {
    console.log(this.state.url);
    return (
      <Container style={styles.container}>
        <CustomHeader title="Nội dung chi tiết"></CustomHeader>
        <View style={{ backgroundColor:'white', height: '100%', width: '100%', padding: 10}}>
          <WebView
            source = {{uri: this.state.url}} 
            onLoadEnd = {this.webViewLoaded}
            scalesPageToFit={Platform.OS == "android"}
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
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderLoading = {()=>(<AppIndicator/>)}/>
            <SpeakerBox contents = {this.state.htmlContent}/>
        </View>
      </Container>
    );
  }
}