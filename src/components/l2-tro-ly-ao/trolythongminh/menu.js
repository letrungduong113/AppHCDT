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
    Text,
    View,
    Icon,
    Input,
} from "native-base";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            controls: this.props.data.controls,
        }
    }


    componentDidMount() {
    }
    clickItem(item){
        switch(item.type){
            case 'bot':
                this.props.send(item.title)
                return;
            case 'api':

                return;
            case 'navigate':
                return;
        }
    }
    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={()=>this.clickItem(item)}>
            <View style={{alignItems:'center',padding:5}}>
                <Image source={{uri:`http://aicdemo.com/0rikkei/chatbot/images/menu/${item.action}.png`}} style={{width:scale(150),height:scale(150),alignItems:'center'}}/>
                <Text style={{padding:2,fontSize:scale(22)}}>
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
                        <Text style={styles.leftContentItem}> {this.state.content}</Text>
                        <FlatList
                            contentContainerStyle={{}}
                            data={this.state.controls}
                            extraData={this.state.controls}
                            keyExtractor={(item, index) => index+""}
                            renderItem={this._renderItem}
                            numColumns={3}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </View>
        )
    }
}


