import React, { Component } from 'react';
import { View, AppRegistry, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ThongKe from './thong-ke';
import YKien from './y-kien';
import Main from './Main';

export default NguoiDan = createMaterialTopTabNavigator(
  {
    ThongKe: {
      screen: ThongKe,
    },
    YKien: {
      screen: YKien,
    }
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