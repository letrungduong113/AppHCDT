import React, { Component } from "react";
import { View, Image, FlatList, StyleSheet, ScrollView } from "react-native";
import {
    Icon
  } from "native-base";
import {scale, verticalScale, moderateScale} from '../../components/user-controls/utilities/Scale'
import CustomHeader from "../user-controls/CustomHeader";
import AppIndicator from '../user-controls/AppIndicator'

var sizeTitle = scale(28)
var sizeAuthor = scale(24)
var sizeIcon = scale(26)
var sizeContent = scale(26)
var khungtinheight = verticalScale(374)
var lineHeight = scale(38)

import NguoiDanAPI from '../../services/api-service/nguoi-dan-api'

import Text from '../custom-view/text'

export default class BaoChi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listData: []
        }
    }
    
    componentDidMount() {
        NguoiDanAPI.getNguoiDan(3).then((res)=>{
        //   alert(JSON.stringify(res));
          this.setState({listData: res,
             isLoading: false
            });
        });
      }

    listItems = ({item}) => (
        <ScrollView key={item.id}>
            <View style={{flex: 1}}>
                <View style={{width: '100%', height: khungtinheight, marginTop: 10, paddingTop: 15, paddingLeft:10, backgroundColor: 'white'}}>
                    <Text style={{fontSize: sizeTitle, color: 'black'}}>{item.tieuDe}</Text>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>
                        <Image source={require('../../../assets/images/l2-du-luan/user.png')} style={styles.iconcalendar} />
                        <Text style={{marginRight: 15, fontSize: sizeAuthor}}>{item.name}</Text>
                        <Image source={require('../../../assets/images/l2-du-luan/calendar.png')} style={styles.iconcalendar} />
                        <Text style={{marginRight: 15, fontSize: sizeAuthor}}>{item.ngayDuyet}</Text>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 5}}>
                        <Image source={require('../../../assets/images/l2-du-luan/linhvuc.png')} style={styles.iconcalendar} />
                        <Text style={{marginRight: 15, fontSize: sizeAuthor}}>{item.linhVuc}</Text>
                    </View>
                    
                    <ScrollView>
                    <Text style={{fontSize: sizeContent, lineHeight:lineHeight}}>
                        {item.noiDung} 
                    </Text>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
    
    render() {
            return(
                <View>
                    <CustomHeader title="Ý KIẾN BÁO CHÍ"></CustomHeader>
                    {this.state.isLoading ? (<AppIndicator />) :
                    (<FlatList
                    data={this.state.listData}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.listItems}
                    numColumns={1}
                    />)
                    }
                </View>
            )
        }
    }

const styles = StyleSheet.create({
    iconcalendar: {
         marginRight: 15, width: sizeIcon, height: sizeIcon
    }
})