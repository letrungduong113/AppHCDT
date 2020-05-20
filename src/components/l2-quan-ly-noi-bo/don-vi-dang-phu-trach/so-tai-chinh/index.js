import React, { Component } from 'react';
import { View, AppRegistry, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import DsNhiemVuSo from './nhiemvuso';
import ChiTietDuAnSo from './du-an-so';
import ChiTietSuKienSo from './su-kien-so'
import QuyetDinhPhanCongSo from './nhan-su-so'
import Main from './Main';
import {scale, verticalScale, moderateScale} from '../../../../components/user-controls/utilities/Scale'

export default SoTaiChinh = createMaterialTopTabNavigator(
  {
    DsNhiemVuSo: {
      screen: DsNhiemVuSo,
    },
    ChiTietDuAnSo: {
      screen: ChiTietDuAnSo,
    },
    ChiTietSuKienSo: {
      screen: ChiTietSuKienSo,
    },
    QuyetDinhPhanCongSo: {
      screen: QuyetDinhPhanCongSo,
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: true,
    },
    tabBarComponent: props =>
      <View style={{}}>
        <View style={{ height: '100%' }}>
          <Main
            {...props}
          />
        </View>
      </View>,
    tabBarPosition: 'top',
    // swipeEnabled: true,
    // animationEnabled: true,
  });

  // AppRegistry.registerComponent('StupidProject', () => HistoryContainer);