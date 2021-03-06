import { Right } from 'native-base';

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
    backgroundColor: '#FBFAFA',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',

  },
  bg: {
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12
  }
};
