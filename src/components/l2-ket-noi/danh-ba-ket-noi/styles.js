
const React = require('react-native');
import {scale} from "../../user-controls/utilities/Scale";

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#f6f6f6',
  },
  itemStyle: {
    backgroundColor: '#FFFFFF',
    height: 100,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    padding: 10,
    
  },
  hozView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  itemInfoIcon: {width: scale(30), height: scale(30), marginRight: 10},
  infoText: {fontSize: scale(26)},
};
