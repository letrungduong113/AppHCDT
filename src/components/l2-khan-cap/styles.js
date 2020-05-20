
const React = require('react-native');

import {
  scale,
  verticalScale,
  moderateScale
} from "../user-controls/utilities/Scale";
const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#f6f6f6',
  },
  textContent:{
    color:'#666666',
    fontSize: scale(24)
  },
  containerRow:{
    marginTop:4,
    backgroundColor:'white',
    flexDirection: 'row',
  },
  line:{
    backgroundColor:'#eaeaea',
    margin:8,
    flex:1,
    height:1
  },
  chuviText: {
    flex: 6,
    fontSize: scale(24),
    color: "#ef743e",
    fontFamily: "Roboto-Regular"
  },
  textTime: {
    flex:2.5,
    fontSize: scale(24),
    color: "#999999",
    fontFamily: "Roboto-Regular",
    marginLeft: 5
  },noidungText: {
    color: "#333333",
    fontSize: scale(26),
    fontFamily: "Roboto-Regular"
  },
  bophanthuchienView: {
    flexDirection: "row",
    width: scale(536),
    marginTop: 5
  },
  bophanthuchienText: {
    fontSize: scale(24),
    color: "#999999"
  },
  text: {
    fontSize: scale(24)
  },
  textModal: {
      color: '#333333',
      fontSize: scale(26)
  },
  border: {
      borderColor: '#b4b4b4',
      borderWidth: scale(1),
  },itemts: {
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#d1d1d1"
  },
};
