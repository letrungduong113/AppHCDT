import { TouchableOpacity, Dimensions, Image, FlatList } from "react-native";
import React, { Component } from "react";
import {
    scale,
    verticalScale,
    moderateScale
} from "../../user-controls/utilities/Scale";
import styles from './styles'
import {
    Container,
    Content,
    View,
    Icon,
    Input,
} from "native-base";
import Text from '../../custom-view/text'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import moment from 'moment'
const dayOfWeek=[
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7"
]
export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            type:this.props.type
        }
    }

    convertTemperature(F){
        return parseInt(((F-32)*5/9),10);
    }
    
    _renderItem = ({ item, index }) => (
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>{dayOfWeek[moment.unix(item.time).day()]}</Text>
            <Text style={{color:'red'}}>{this.convertTemperature(item.temperatureHigh)}°C  
                <Text style={{color:'black'}}>    {this.convertTemperature(item.temperatureLow)}°C</Text>
            </Text>
        </View>
    );
    renderItemWeather(title,temp,max,min){
        return(
            <View style={[styles.leftContentItem,{ marginRight: scale(63) }]}>
                <Text style={{color:'black',fontSize:scale(32)}}>{title}</Text>
                <Text style={{color:'black',fontSize:scale(60),fontWeight:'bold'}}>{temp}°C</Text>
                <Text style={{color:'black',fontSize:scale(32)}}>
                    {min} - {max} °C
                </Text>
            </View>
        )
    }
    renderWeek(title,temp,max,min,daily){
        return(
            <View style={[styles.leftContentItem,{ marginRight: scale(63) }]}>
                <Text style={{color:'black',fontSize:scale(32)}}>{title}</Text>
                <Text style={{color:'black',fontSize:scale(60),fontWeight:'bold'}}>{temp}°C</Text>
                <Text style={{color:'black',fontSize:scale(32)}}>
                    {min} - {max} °C
                </Text>
                <View style={{marginTop:5,marginBottom:5,backgroundColor:'#b4b4b4',height:1}}/>
                <FlatList
                    contentContainerStyle={{}}
                    data={daily.slice(1)}
                    extraData={daily}
                    keyExtractor={(item, index) => index+""}
                    renderItem={this._renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }
    renderWeather(){
        const current = this.state.content.currently;
        const daily = this.state.content.daily.data;
        var title ='' ;
        var temp =0;
        var max=0;
        var min =0;
        switch(this.state.type){
            case 'today':
                title ='Hôm nay';
                temp = this.convertTemperature(current.temperature);
                max = this.convertTemperature(daily[1].temperatureHigh);
                min = this.convertTemperature(daily[1].temperatureLow);
                return this.renderItemWeather(title,temp,max,min);
            case 'tomorrow':
                title ='Ngày mai';
                max = this.convertTemperature(daily[1].temperatureHigh);
                min = this.convertTemperature(daily[1].temperatureLow);
                temp =this.convertTemperature((daily[1].temperatureLow+daily[1].temperatureHigh)/2);
                return this.renderItemWeather(title,temp,max,min);
            case 'week':
                title ='Hôm nay';
                temp = this.convertTemperature(current.temperature);
                max = this.convertTemperature(daily[1].temperatureHigh);
                min = this.convertTemperature(daily[1].temperatureLow);
                return this.renderWeek(title,temp,max,min,daily);
        }
    }
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{flex: 1, flexDirection: 'row',alignItems:'flex-end'}}>
                    <Image source={require("../../../../assets/images/l2-tro-ly-ao/ico_chatbot.png")}
                        style={{ width: scale(64), height: scale(64), marginRight: scale(31) }}></Image>
                    {this.renderWeather()}
                </View>
            </View>
        )
    }
}


