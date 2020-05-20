import React, { Component } from "react";
import { StyleSheet, Platform, PermissionsAndroid } from "react-native";
import CodePush from "react-native-code-push";

import { Container, Content, Text, View } from "native-base";
import Modal from "react-native-modalbox";
import HomeRouter from "./Routers/HomeRouter";
import ProgressBar from "./components/loaders/ProgressBar";
import { SafeAreaView } from 'react-navigation';
import ChatBotService from './services/chat-bot-service';
import NotificationService from '../configPush/NotificationService'
import NavigationService from './services/navigation-service';
import SpeakingService from './services/speaking-service';
import { createAppContainer } from 'react-navigation';
import { updateNotification, updateNotiKhanCap } from './redux/actions/noti';
import { updateMarkers } from './redux/actions/getMarkers';
import { updateLocation } from './redux/actions/location';
import theme from "./themes/base-theme";
import { connect } from 'react-redux';
import KhanCapAPI from "./services/api-service/khan-cap-api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal1: {
    height: 300
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    };
  }

  componentDidMount() {
    // CodePush.sync(
    //   { updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
    //   status => {
    //     switch (status) {
    //       case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
    //         this.setState({ showDownloadingModal: true });
    //         this._modal.open();
    //         break;
    //       case CodePush.SyncStatus.INSTALLING_UPDATE:
    //         this.setState({ showInstalling: true });
    //         break;
    //       case CodePush.SyncStatus.UPDATE_INSTALLED:
    //         this._modal.close();
    //         this.setState({ showDownloadingModal: false });
    //         break;
    //       default:
    //         break;
    //     }
    //   },
    //   ({ receivedBytes, totalBytes }) => {
    //     this.setState({ downloadProgress: receivedBytes / totalBytes * 100 });
    //   }
    // );
    ChatBotService.initService();
    NotificationService.initService();
    SpeakingService.initService();
    NotificationService.onNotify = this.notificationMessageHandler.bind(this);

    if (Platform.OS == 'ios') {
      this.getLocation();
    } else {
      this.requestLocationPermission();
    }
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lấy vị trị ứng dụng',
          message:
            'Ứng dụng xin quyền lấy vị trí ' +
            'để xem thời tiết',
          buttonNegative: 'Huỷ',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  getLocation() {
    //location
    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.props.updateLocation(location);
        // alert(JSON.stringify(location))
      },
      (error) => {
        // alert(error.message)
        // See error code charts below.
        //alert(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  notificationMessageHandler(data) {
    if (data.CateID == "1") {
      this.updateKhanCap()
    }
    this.setBadge(data.badge);
  }
  setBadge(badge) {
    this.props.updateNotification(badge);
  }
  updateKhanCap() {
    this.props.updateNotiKhanCap(true);
    KhanCapAPI.getLocations().then(res => {
      if (res != null) {
        // alert(JSON.stringify(res));
        this.props.updateMarkers(res)
      }
    })
  }
  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container
          theme={theme}
          style={{ backgroundColor: theme.defaultBackgroundColor }}
        >
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={c => {
                this._modal = c;
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  justifyContent: "center",
                  padding: 20
                }}
              >
                {this.state.showInstalling
                  ? <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: "center",
                      marginBottom: 15,
                      fontSize: 15
                    }}
                  >
                    Installing update...
                    </Text>
                  : <View
                    style={{
                      flex: 1,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      padding: 20
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: "center",
                        marginBottom: 15,
                        fontSize: 15
                      }}
                    >
                      Downloading update...
                        {" "}
                      {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar
                      color="theme.brandPrimary"
                      progress={parseInt(this.state.downloadProgress, 10)}
                    />
                  </View>}
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }
    return (
      <HomeRouter style={{ flex: 1 }} ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef); }} />
    );
  }
}


export default connect(null, { updateNotification, updateLocation, updateNotiKhanCap, updateMarkers })(App);