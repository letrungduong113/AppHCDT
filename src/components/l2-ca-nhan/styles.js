
const React = require('react-native');
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#DADADA',
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
  buttonGo: {
    color:'#CCCBCC',
    width: 26,
    height: 26,
    marginStart:10
  },
  buttonIcon: {
    width: '100%',
    height: '80%',
  },
  image: {
    marginTop:60,
    height: 80,
    width: 80,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    backgroundColor: 'white'
  },
  header: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textName: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },

  textMajor: {
    color: '#FC9F87',
    fontSize: 13,
    marginBottom:20
  },
  content: {
    flexDỉrection: 'column',
    flex: 3
  },
  item:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    height:50,
    backgroundColor:'white',
    marginTop:1
  },
  textItem:{
    flex:1,
    color:"#5D5D5D",
    marginStart:20
  },
  footerIos:{ height: verticalScale(109), backgroundColor: 'transparent',borderTopWidth:0 },
  footerAndroid:{ height: verticalScale(109), backgroundColor: 'transparent', paddingBottom: -10 },
};
