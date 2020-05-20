
const React = require('react-native');
import { moderateScale, scale, verticalScale } from "../user-controls/utilities/Scale";
const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#DADADA',
  },
  containerRow:{
    backgroundColor:'white',
    flexDirection: 'row',
  },
  pickerType: {
    flex:1,
    backgroundColor:'white',
    borderRadius:2,
    borderWidth:2,
    borderColor:'white',
    marginLeft:8,
    marginRight:8,
  },
  item: {
    backgroundColor:'white',
    marginTop: 8
  },
  textBorder:{
    padding:moderateScale(10),
    fontSize:scale(24),
    color:'#343434',
    flex:1,
    textAlign:'center',
  }
};
