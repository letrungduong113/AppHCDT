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

export default class BtnChoose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            controls: this.props.data.controls,
        }
    }

    clickItem(item){
        if(item.type == 'bot'){
            this.props.send(item.action);
        }
    }
    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.action}
            onPress={()=>this.clickItem(item)}
            >
            <View style={{alignItems:'center',borderColor:'#ebebeb',borderWidth:0,borderTopWidth:1,backgroundColor:'white'}}>
                <Text style={{padding:scale(8),fontSize:scale(25),color:'#4695eb',fontWeight:'bold'}}>
                    {item.title}
                </Text>
            </View>
            
        </TouchableOpacity>
    );
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{flex: 1, flexDirection: 'row',alignItems:'flex-end'}}>
                    <Image source={require("../../../../assets/images/l2-tro-ly-ao/ico_chatbot.png")}
                        style={{ width: scale(64), height: scale(64), marginRight: scale(31) }}></Image>
                    <View style={{ marginRight: scale(63) }}>
                        <Text style={[styles.leftContentItem,{color:'#666666'}]}> {this.state.content}</Text>
                        <FlatList
                            contentContainerStyle={{}}
                            data={this.state.controls}
                            extraData={this.state.controls}
                            keyExtractor={(item, index) => item+""}
                            renderItem={this._renderItem}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </View>
        )
    }
}


