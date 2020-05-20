import { Right } from 'native-base';
import { scale, verticalScale } from "../../user-controls/utilities/Scale";

const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

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
  container2: {
    marginLeft: scale(18),
    marginRight: scale(18),
    //backgroundColor: "white",
    flex: 1,
},
content: {
    backgroundColor: "white",
    marginVertical: 10,
},
  buttonIcon: {
    width: 48,
    height: 48
  },
  styleList: {
    marginTop:1,
    width: "100%",
    backgroundColor: "white"
  }
};
