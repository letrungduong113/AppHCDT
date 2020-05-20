import React, { Component } from "react";
import { View, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native";
import {
    Icon, Content, Picker
  } from "native-base";
import {scale, verticalScale, moderateScale} from '../../../components/user-controls/utilities/Scale'
import CustomHeader from "../../user-controls/CustomHeader";
import ThongKeBoxNgDan from "../../user-controls/ThongKeBoxNgDan";
import ThongKeChart from '../../user-controls/ThongkeChart'
const TAT_CA_LINH_VUC = 'Tất cả bộ phận trả lời';
var sizeTitle = scale(28)
var sizeAuthor = scale(24)
var sizeIcon = scale(26)
var sizeContent = scale(26)
var khungtinheight = verticalScale(374)
var lineHeight = scale(38)
const win = Dimensions.get('window');
import {GROBAL_RESOUCE} from "../../../../assets/strings/string-bn"

import NguoiDanAPI from '../../../services/api-service/nguoi-dan-api'

import Text from '../../custom-view/text'
import AppIndicator from "../../user-controls/AppIndicator";

export default class ThongKe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listData: [],
            showAll: [],
            pickerSelectedItem: 1000,
            listLinhVuc: [],
        }
    }
    
    componentDidMount() {
        NguoiDanAPI.getNguoiDan(1).then((res)=>{
            if (res) {
                baseShowAll = [];
                boPhans = [];
                res.map((item)=> {
                    baseShowAll.push(false);
                    if (!boPhans.find(str=>str==item.boPhan)) {
                        boPhans.push(item.boPhan);
                    }
                })
                this.setState({
                    listData: res,
                    isLoading: false,
                    showAll: baseShowAll,
                    listLinhVuc: boPhans,
                });
            }
            
        });
    }

    reloadData() {
        boPhan = this.state.pickerSelectedItem == 1000? "" : this.state.listLinhVuc[this.state.pickerSelectedItem];
        NguoiDanAPI.getNguoiDan(1, boPhan).then((res)=>{
            if (res) {
                baseShowAll = [];
                boPhans = [];
                res.map((item)=> {
                    baseShowAll.push(false);
                })
                this.setState({
                    listData: res,
                    isLoading: false,
                    showAll: baseShowAll,
                });
            }
            
        });
    }
    onFilterLinhVuc(linhvuc) {
        this.filterLinhVuc = linhvuc;
        //this.filterLinhVuc = 0; // Chưa có API nên mặc định chọn bằng 0
        this.setState({ pickerSelectedItem: linhvuc }, ()=>this.reloadData())
        
    }

    listItems (value) {
        var data = value;
        return data.map((data, i) => 
            {
                return (
                    <ScrollView key={i}>
                        <View style={{flex: 1}}>
                            <View style={{width: '100%', marginTop: 10, padding: 10, backgroundColor: 'white'}}>
                                <Text style={{fontSize: sizeTitle, color: 'black', fontWeight: 'bold'}}>{data.tieuDe}</Text>
                                
                                <View style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>
                                    <Image source={require('../../../../assets/images/l2-du-luan/user.png')} style={styles.iconcalendar} />
                                    <Text style={{marginRight: 15, fontSize: sizeAuthor}}>{data.name}</Text>
                                    <Image source={require('../../../../assets/images/l2-du-luan/calendar.png')} style={styles.iconcalendar} />
                                    <Text style={{marginRight: 15, fontSize: sizeAuthor}}>{data.ngayTao}</Text>
                                </View>
                                
                                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 5}}>
                                    <Image source={require('../../../../assets/images/l2-du-luan/linhvuc.png')} style={styles.iconcalendar} />
                                    <Text style={{marginRight: 15, fontSize: sizeAuthor}}>Bộ phận trả lời: {data.boPhan}</Text>
                                </View>
                                
                                <View>
                                    <Text style={{fontSize: sizeContent, lineHeight:lineHeight, color: 'black'}} line={this.state.showAll[i] ? 2000 : 4} >
                                        {data.noiDung} 
                                    </Text>
                                    <TouchableOpacity onPress={() => { this.state.showAll[i] = !this.state.showAll[i]; this.setState({showAll: this.state.showAll})}}>
                                    <Text>{!this.state.showAll[i] ? 'Xem tất cả' : 'Ẩn bớt'}</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            <View style={{width: '100%', height: 10, backgroundColor: '#f6f6f6'}}></View>
                        </View>
                    </ScrollView>
                )
            })
        
        
    }

    renderItems() {
        if (this.state.isLoading) {
          return (
              <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
              <AppIndicator />
              </View>
          );
        }
        if (this.state.listData == ''){
          return (
            <Content style={{marginBottom:footerMargin}}>
            <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400)}}>
              <Image
                source={require("../../../../assets/images/search_not_found.png")}
                style={{ width: scale(198), height: scale(198) }}
              />
              <Text
                style={{ marginTop: 10, fontSize: scale(30), color: "#999999" }}
              >
                Không có dữ liệu
              </Text>
            </View>
            </Content>
          );
        }
        return (
            <ScrollView>
            {this.listItems(this.state.listData)}
            </ScrollView>
        );
    }
    
    getHeightRatio(width, width_new, height_new) {
        let height = height_new * width / width_new
        return height
    }
    renderPicker() {
        return (
            <View style={{ borderColor: '#d7d7d7', backgroundColor: '#fafafa', margin: 10, borderWidth: 1 }}>
                <Picker  mode={"dropdown"}
                    itemTextStyle={{ color: "#3f3f3f", textTransform: 'uppercase' }}
                    selectedValue={this.state.pickerSelectedItem}
                    mode="dropdown"
                    iosHeader="Mời bạn chọn"
                    headerBackButtonText="Hủy"
                    headerBackButtonTextStyle = {{padding:20}}
                    headerTitleStyle = {{paddingTop:20}}
                    style={{
                        height: this.getHeightRatio(win.width, 682, 72),
                        width: Platform.OS == 'ios' ? scale(340) : "100%"
                    }}
                    onValueChange={(itemValue, itemIndex) => { this.onFilterLinhVuc(itemValue) }}
                >
                    <Picker.Item label={TAT_CA_LINH_VUC} value={1000} />
                    {
                        this.state.listLinhVuc.map((item, index) => {
                            return (<Picker.Item label={item} value={index} />)
                        })
                    }
                </Picker>
                {
                    Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, justifyContent: 'center' }}>
                        <Image source={require('../../../../images/logo/sortdown.png')}
                            style={{ height: 10, width: 10 }}
                        />
                    </View> : <View />
                }
            </View>
        );
    }
    render() {
        return(
                <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                    <Content>
                        <ThongKeBoxNgDan></ThongKeBoxNgDan>
                    </Content>
                    
                </View>
        )
    }
}

const styles = StyleSheet.create({
    iconcalendar: {
         marginRight: 15, width: sizeIcon, height: sizeIcon
    }
})