import React, { Component } from "react";
import {
  Dimensions,
  WebView,
  Platform
} from "react-native";
import PropTypes from "prop-types";
// import console = require("console");
const win = Dimensions.get("window");

const DEFAULT_WEB_HEIGHT = 1;
const webViewScript = `
  setTimeout(function() { 
    window.postMessage(JSON.stringify({text: document.body.innerText, height: document.documentElement.scrollHeight})); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default class HtmlText extends Component {
  static propTypes = {
    source: PropTypes.string,
    onLoaded: PropTypes.func,
};

  constructor(props) {
    super(props);
    
    this.state = {
      webheight: DEFAULT_WEB_HEIGHT,
      text: this.formatContent(this.props.source),
    }
  }

  formatContent(htmlText) {
    if (!htmlText) htmlText = "";

    if (htmlText.indexOf("<html") <= 0) {
      htmlText = `
      <html lang="vi" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta charset="utf-8">
        </head>
      <body>
      ${htmlText}
      </body>
      </html>`;
      return htmlText;
    }
    else {
      return htmlText;
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      text: this.formatContent(props.source),
    })
  }
  render() {
    return(
      <WebView 
        originWhitelist={['*']}
        source={{html: this.state.text, baseUrl:''}}
        style={{height: this.state.webheight, backgroundColor: 'white'}}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        scalesPageToFit={Platform.OS == "android"}
        onMessage={event => {
          console.log(event.nativeEvent.data);
          if (Platform.OS == "android") {
            dataStr = event.nativeEvent.data;
          }
          else {
            dataStr = decodeURIComponent(event.nativeEvent.data.toString());
            dataStr = decodeURIComponent(dataStr);
            //dataStr = decodeURI(dataStr);
          }
          
          try {
            data = JSON.parse(dataStr);

            this.setState({webheight: parseInt(data.height)});
            if (this.props.onLoaded) this.props.onLoaded(data.text);
           }
           catch {}
        }}
        javaScriptEnabled={true}
        injectedJavaScript ={webViewScript}
        domStorageEnabled={true}
      ></WebView>
    )
  }

}