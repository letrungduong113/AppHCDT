/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, AsyncStorage, TextInput, Dimensions } from 'react-native';
import NavigationService from "../src/services/navigation-service";
import firebase from 'react-native-firebase';
const win = Dimensions.get('window');
import moment from 'moment';

const getJumpPoint = (pointer) => {
  switch (pointer) {
    case 0:
      return "LichCongTacChiTiet";
    case '1':
      return "KhanCapChiTiet";
    case '2':
      return "BaoCaoKTXHChiTiet";
    case '3':
      return "NhiemVuChiTiet";
    // case '4':
    //   return "Mục tiêu";
    // VanbanChiTiet lỗi
    case '5':
      return "VanBanChiTiet";
    // case '6':
    //   return "Quản lý nội bộ";
    // case '7':
    //   return "Dư luận";
    // case '8':
    //   return "Mục tiêu";
    // case '10':
    //   return "Mục tiêu";
    // case '11':
    //   return "Mục tiêu";
    // case '12':
    //   return "Mục tiêu";
    // case '13':
    //   return "Mục tiêu";
    case '14':
      return "ChiTietDuAnScreen";
    default: return "HomeNavigator";
  }
};

class NotificationService {
  constructor() {
    this.onNotify = null;
    console.log("NotificationService : start...")
    this.componentDidMount();
    this.componentWillUnmount();
  }
  initService() {
  };
  async componentDidMount() {
    await this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      console.log('requestPermission');
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    //refresh token
    this.onTokenRefreshListener = await firebase.messaging().onTokenRefresh(fcmToken => {
      //console.log("refresh token:", fcmToken)
      if (fcmToken) {
        AsyncStorage.setItem('fcmToken', fcmToken)
      }

    });
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:', title + body);
      //console.log('========', notification)
      firebase.notifications().setBadge(Number(notification.data.badge));
      //AsyncStorage.setItem('badge', notification.data.badge)
      if (this.onNotify) {
        this.onNotify(notification.data);
      }

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        //.android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);


      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(async (notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      let CateID = notificationOpen.notification.data.CateID;
      console.log('onNotificationOpened:', notificationOpen.notification.data);
      if (notificationOpen.notification.data.NewsID) {
        NavigationService.navigate(getJumpPoint(CateID), { id: notificationOpen.notification.data.NewsID });
      }
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    await firebase.notifications().getInitialNotification().then(notificationOpen => {
      if (notificationOpen) {
        const { title, body, data } = notificationOpen.notification;
        AsyncStorage.setItem('notiData', JSON.stringify({ CateID: data.CateID, NewsID: data.NewsID, badge: data.badge }));
        //console.log('-------getInitialNotification:-------', data);
        //this.showAlert(title, body);
      }
    });

    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      //console.log("getMessage", JSON.stringify(message));
      const ts = moment().format('x');
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(ts)
        //.setNotificationId(notification.notificationId)
        .setTitle(message.data.title)
        .setSubtitle(message.data.message)
        .setBody(message.data.tickerText)
        //.setData(notification.data)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        //.android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);
      //console.log("getMessage", message.data);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));

    });
  }

  //3
  showAlert(title, body) {
    //alert(title)
  }

  async getToken() {
    //console.log("run getToken")
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        //alert(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    // if(reftoken) {

    // }
    console.log('fcmToken:', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
// const mapStateToProps = state => {
//   return {
//     places: state.places.places
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     add: (name) => {
//       dispatch(addPlace(name))
//     }
//   }
// }
export default new NotificationService();

// export default connect(null, actions)(NotificationService);
