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

export default class DataSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            screen:this.props.data.screen
        }
    }


    onClickItem(item){
        if(this.state.screen.length>0){
             this.props.navigation.navigate(this.state.screen,{'id':item.id})
         }
    }
    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={()=>this.onClickItem(item)}
            key={item.action}>
            <View style={{borderColor:'#ebebeb',borderWidth:1,borderBottomWidth:0,backgroundColor:'white',paddingRight:8}}>
                <View style={{margin:scale(16)}}>
                    <Text style={{fontSize:scale(25),color:'black',fontWeight:'bold'}}>
                        {item.title}
                    </Text>
                </View>
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
                        {this.state.content &&this.state.content.length>0?
                            <FlatList
                                contentContainerStyle={{}}
                                data={this.state.content}
                                extraData={this.state.content}
                                keyExtractor={(item, index) => index+""}
                                renderItem={this._renderItem}
                                scrollEnabled={false}
                            />
                            :<Text style={styles.leftContentItem}>Không có dữ liệu</Text>
                        }
                    </View>
                </View>
            </View>
        )
    }
}


