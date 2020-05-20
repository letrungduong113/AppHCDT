import { Right } from 'native-base';

const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: "#EDECED"
  },
  itemStyle: {
    backgroundColor: "#FFFFFF",
    height: 100,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  buttonIcon: {
    width: 48,
    height: 48
  },
  styleList: {
    marginTop:10,
    width: "100%",
    backgroundColor: "white"
  }
};
