import { Right } from 'native-base';
import { scale, verticalScale } from '../user-controls/utilities/Scale';

const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',

  },
  bg: {
    flex: 1,
    marginTop: verticalScale(134),
    paddingTop: 0,
    // paddingLeft: 10,
    // paddingRight: 10,
    paddingBottom: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    justifyContent: 'center',
    marginLeft: scale(52),
    marginRight: scale(52),
    width: scale(616),
    height: scale(84),
    marginTop: scale(78),
    alignSelf: 'center',
    backgroundColor: '#d64d4a',
  },
};
