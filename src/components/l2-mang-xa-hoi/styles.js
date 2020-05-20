
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: 'white',
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
    height: '100%',
  },
  image: {
    marginTop:60,
    height: scale(155),
    width: scale(155),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:scale(77),
    backgroundColor: 'white'
  },
  header: {
    height: scale(461),
    alignItems: 'center',
    justifyContent: 'center'
  },

  textName: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: scale(32),
  },

  textMajor: {
    color: '#ffe3ae',
    fontSize: scale(24),
    marginBottom:20
  },
  content: {
    flexDỉrection: 'column',
    flex: 3
  },
  item:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-end',
    alignItems: 'center',
    height:scale(93),
    backgroundColor:'white',
    marginTop:1
  },
  textItem:{
    fontSize: scale(24),
    flex:1,
    color:"#5D5D5D",
    marginStart:20
  }
};
