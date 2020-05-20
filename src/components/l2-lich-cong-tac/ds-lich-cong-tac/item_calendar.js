import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment'
import LichCongTacAPI from "../../../services/api-service/lich-cong-tac-api";
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale';
import Text from '../../custom-view/text'
export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      tab:this.props.tab,
      loading:false,
      navigation:this.props.navigation,
      date:moment().format('YYYY-MM-DD'),
    };
  }
  componentWillReceiveProps({someProp}) {
    if(this.state.tab != this.props.tab){
      this.setState({tab:this.props.tab,items:{}})
      this.state.items={}
      const day ={}
      day.timestamp=moment().unix()*1000;
      this.loadItems(day)
        // this.ref.agenda.loadItemsForMonth()
    }
  }
  render() {
    return (
      <Agenda
        ref={(agenda) => { this.agenda = agenda; }}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.date}
        renderItem={this.renderTouchItem.bind(this)}
        renderDay={this.renderDay.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }
  componentDidMount(){
    //   this.setState({date:moment().format('YYYY-MM-DD'),items: {}})
    //   this.loadItems(this.state.date)
  }
  loadItems(day) {
    
    this.setState({date:moment.unix(day.timestamp/1000).format('YYYY-MM-DD')})
    const startDate = moment.unix(day.timestamp/1000).add(-15, 'days').format('YYYY/MM/DD');
    const endDate = moment.unix(day.timestamp/1000).add(85, 'days').format('YYYY/MM/DD');
    LichCongTacAPI.getDsLichCongTac(startDate, endDate,1,100,this.state.tab+1).then((res) => {
        console.log('dsLichCongTac',res);
        for(var i =-15;i<85;i++){
            const strTime = moment.unix(day.timestamp/1000).add(i,'days').format('YYYY-MM-DD');
            // const strTime = this.timeToString(time);
            if(!this.state.items[strTime])
                this.state.items[strTime] = [];
        }
        if (res == null) {
            this.setState({  isLoading: false ,data:[]});
            return;
        }
        for (var p = 0; p < res.length; p++) {
            const strTime = moment(res[p].ngay,'DD/MM/YYYY').format('YYYY-MM-DD');
            if (!this.state.items[strTime]||this.state.items[strTime].length==0) {
                this.state.items[strTime] = [];
                const numItems = res[p].lichTrongNgay.length;
                for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                        name: res[p].lichTrongNgay[j].title,
                        startDate: res[p].lichTrongNgay[j].startDate,
                        id:res[p].lichTrongNgay[j].id
                    });
                }
            }
           
        }
        // const newItems = {};
        // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        
        this.setState({
            items: this.state.items
        });
    });
  }
  renderTouchItem(item){
      return(
          <TouchableOpacity onPress={()=>this.state.navigation.navigate('LichCongTacChiTiet',{'id':item.id})}>
              {this.renderItem(item) }
          </TouchableOpacity>
      )
  }
  renderItem(item) {
    var now = moment();
    var ms = moment(item.startDate,'HH:mm YYYY/MM/DD').diff(now, 'HH:mm YYYY/MM/DD');
    var d = moment.duration(ms);
    var s = moment.utc(ms).format("HH:mm");
    let timediff = moment(item.startDate, 'HH:mm YYYY/MM/DD').diff(now, 'hours');
    if (timediff < 0 || (timediff == 0 && d < 0)) {
        return (
            <View style={[styles.item, {height: item.height,backgroundColor:'#999999' }]}>
                <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
            </View>
        );
    } else if ((timediff <= 3 && timediff>0)||(timediff==0 && d>0)) {
        return (
            <View style={[styles.item, {height: item.height,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#4695eb'}]}>
                <View style={{flex:5,justifyContent:'space-between'}}>
                    <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
                </View>
                <View style={{flex:1}}>
                    <Image style={{width:scale(58),height:scale(58)}} source={require('../../../../assets/images/icon/ic_timer.png')}/>
                    <Text style={{ color: 'white', fontSize: 12 }}>{s}</Text>
                </View>
            </View>
        );
    } else {
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text line={2} style={{color:'white',fontSize:scale(26),fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{color:'white',fontSize:scale(24)}}>{item.startDate.substring(0,5)}</Text>
            </View>
        );
    }
  }
  

  renderDay(date){
    if(date){  
            var now = moment().format('DD/MM/YYYY');
            var d = moment(`${date.day} ${date.month} ${date.year}`,'DD MM YYYY').format('DD/MM/YYYY');
            return (
                <View style={{width:"15%",margin:scale(8),paddingTop:scale(20),alignItems:'center'}}>
                    <Text style={{color:now==d?'#4695eb':'#333333',fontWeight:now==d?'bold':'normal',fontSize:scale(46)}}>{date.day}</Text>
                    <Text style={{color:now==d?'#4695eb':'#333333',fontWeight:now==d?'bold':'normal',fontSize:scale(26)}}>Th {date.month}</Text>
                </View>
            )
        // }
    }else{
        return <View style={{width:"15%",margin:scale(8),paddingTop:scale(20),alignItems:'center'}}/>
    }
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Không có lịch</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#7fae7e',
    flex: 1,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});