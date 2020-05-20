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

export default class LichVanNien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
        }
    }

    render() {
        const data = this.state.content;
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{flex: 1, flexDirection: 'row',alignItems:'flex-end'}}>
                    <Image source={require("../../../../assets/images/l2-tro-ly-ao/ico_chatbot.png")}
                        style={{ width: scale(64), height: scale(64), marginRight: scale(31) }}></Image>
                    <View style={[styles.leftContentItem,{ marginRight: scale(63) }]}>
                        <Text style={{fontSize:scale(28),color:"#f2291f"}}>Lịch vạn niên hôm nay</Text>
                        <Text style={{fontSize:scale(26),color:"#2a2a2a"}}> - Ngày dương: 
                            <Text style={{fontSize:scale(26),color:"#c1322e"}}>{data.ngay_trong_tuan} {data.ngay} - {data.thang}</Text>
                        </Text>
                        <Text style={{fontSize:scale(26),color:"#2a2a2a"}}> - Ngày âm: 
                            <Text style={{fontSize:scale(26),color:"#c1322e"}}>{data.ngay_am}</Text>
                        </Text>
                        <Text style={{fontSize:scale(26),color:"#2a2a2a"}}> - Ngày hoàng đạo: 
                            <Text style={{fontSize:scale(26),color:"#c1322e"}}>{data.ngay_hoang_dao}</Text>
                        </Text>
                        <Text style={{fontSize:scale(26),color:"#2a2a2a"}}> - Giờ hoàng đạo: 
                            <Text style={{fontSize:scale(26),color:"#c1322e"}}>{data.gio_hoang_dao}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}


