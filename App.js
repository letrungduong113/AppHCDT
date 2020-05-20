/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase';
import RNFS from 'react-native-fs';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from 'react-native-datepicker'
import OpenFile from 'react-native-doc-viewer';
import AutoHeightImage from 'react-native-auto-height-image';
import { createStackNavigator } from 'react-navigation';
import Voice from 'react-native-voice';
import Video from 'react-native-video';
import { LocaleConfig } from 'react-native-calendars';
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
});