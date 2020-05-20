const React = require("react-native");
import {
  scale,
  verticalScale,
  moderateScale
} from "../../user-controls/utilities/Scale";
const { StyleSheet } = React;
import {
    Dimensions
  } from "react-native";
export default {
  container: {
    backgroundColor: "#DADADA"
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
    marginTop: 10,
    width: "100%",
    backgroundColor: "white"
  },
  chuviText: {
    fontSize: scale(24),
    color: "#ef743e",
    fontFamily: "Roboto-Regular"
  },
  textTime: {
    marginTop:3,
    fontSize: scale(24),
    color: "#999999",
    fontFamily: "Roboto-Regular",
  },
  noidungText: {
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
  border: {
    borderColor: "#b4b4b4",
    borderWidth: scale(1)
  },itemts: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: Dimensions.get("window").width,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
},
};
