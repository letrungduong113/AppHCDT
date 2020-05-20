
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#f4f4f4',
  },
  containerRow:{
    backgroundColor:'white',
    flexDirection: 'row',
  },
  line:{
    backgroundColor:'#eaeaea',
    margin:8,
    flex:1,
    height:1
  },items:{
      backgroundColor:'white',
      padding:10
  },iconNotification:{
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    fontSize:30,
    paddingTop:5,
    height:40,
    width:40,
    borderRadius:20,
    borderWidth:1
  },
  item: {
    marginTop: 16
  },
  inputModal:{
    borderColor:'#b4b4b4',
    backgroundColor:'white',
    borderRadius:1,
    padding:8,
    borderWidth:1
  }
};
