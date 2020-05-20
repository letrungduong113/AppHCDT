import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";

const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#fbfbfb'
  },
  bodyContainer: {
    backgroundColor: '#f0f0f0',
    width: "100%", 
    //margin: 10,
  },
  rightContentItem: {
    backgroundColor: '#c1322e',
    borderRadius: 5,
    borderBottomRightRadius: 0,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  rightContentText: {
    color: 'white',
    fontWeight: '100',
  },

  leftContentItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },

  leftContentText: {
    color: '#333333'
  },

  bottomGroup: {
    backgroundColor: 'white', 
    alignItems: 'center', 
    flex: 1, 
    flexDirection: 'row', 
    position: 'absolute',
    bottom: 0,
    left: 0, 
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
};
