import React, { Component } from 'react';
import { View, AppRegistry, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import BaoCaoChiTietDuAn from './bao-cao';
import GiaiNganChiTietDuAn from './giai-ngan';
import GiamSatChiTietDuAn from './giam-sat'
import ChiTietDuAnScreen from './thong-tin-chung/chi-tiet-du-an'
import TienDoChiTietDuAn from './tien-do'
import VanBanChiTietDuAn from './van-ban-phap-ly'
import Main from './Main';
import {scale, verticalScale, moderateScale} from '../../../../components/user-controls/utilities/Scale'

export default ChiTietDuAnNew = createMaterialTopTabNavigator(
  {

    ChiTietDuAnScreen: {
        screen: ChiTietDuAnScreen,
    },
    VanBanChiTietDuAn: {
      screen: VanBanChiTietDuAn,
    },
    TienDoChiTietDuAn: {
      screen: TienDoChiTietDuAn,
    },
    GiamSatChiTietDuAn: {
      screen: GiamSatChiTietDuAn,
    },
    GiaiNganChiTietDuAn: {
      screen: GiaiNganChiTietDuAn,
    },
    BaoCaoChiTietDuAn: {
      screen: BaoCaoChiTietDuAn,
    }, 
  },
  {
    navigationOptions: {
      gesturesEnabled: true,
    },
    tabBarComponent: props =>
      <View style={{  }}>
        <View style={{ height: verticalScale(200) }}>
          <Main
            {...props}
          />
        </View>
      </View>,
    tabBarPosition: 'top',
    // swipeEnabled: false,
    animationEnabled: false,
  });

  // AppRegistry.registerComponent('StupidProject', () => HistoryContainer);