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

export default class LichCongTac extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            navigation:this.props.navigation
        }
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('LichCongTacChiTiet',{'id':item.id})}
        >
            <View style={{borderColor:'#ebebeb',borderWidth:1,borderBottomWidth:0,backgroundColor:'white'}}>
                <Text style={{padding:scale(16),fontSize:scale(25),color:'red',marginRight:scale(8)}}>
                    {item.startDate.substring(0,5)} <Text line ={2} style={{color:'grey'}}>{item.title}</Text>
                </Text>
            </View>
            
        </TouchableOpacity>
    );
    _renderList = ({ item, index }) => (
        <View>
            <Text style={[styles.leftContentItem,{paddingLeft:15}]}>Ngày {item.ngay}</Text>
            <FlatList
                contentContainerStyle={styles.leftContentItem}
                data={this.state.content[index].lichTrongNgay}
                extraData={this.state.content[index].lichTrongNgay}
                keyExtractor={(item, index) => index+""}
                renderItem={this._renderItem}
                scrollEnabled={false}
            />
            <View style={{backgroundColor:'#ebebeb',height:1}}></View>
        </View>
    );
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{flex: 1, flexDirection: 'row',alignItems:'flex-end'}}>
                    <Image source={require("../../../../assets/images/l2-tro-ly-ao/ico_chatbot.png")}
                        style={{ width: scale(64), height: scale(64), marginRight: scale(31) }}></Image>
                    <View style={{ marginRight: scale(63), paddingRight: 8}} >
                       {this.state.content && this.state.content.length>0?<FlatList
                            contentContainerStyle={styles.leftContentItem}
                            data={this.state.content}
                            extraData={this.state.content}
                            keyExtractor={(item, index) => index+""}
                            renderItem={this._renderList}
                            scrollEnabled={false}
                        />: <Text style={styles.leftContentItem}>Hiện tại đang không có lịch</Text>
                       }
                    </View>
                </View>
            </View>
        )
    }
} 


