
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FFFFFF',
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
  buttonIcon: {
    width: 48,
    height: 48,
  },
  line:{
    backgroundColor:'#eaeaea',
    flex:1,
    height:1
  },
  containerRow:{
    flexDirection: 'row',
  },
  iconItem:{
    justifyContent:'center',
    alignItems:'center',
  },
  iconItemDisable:{
    backgroundColor:'#bfbfbf',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    width: 40,
    height: 40
  }
};
