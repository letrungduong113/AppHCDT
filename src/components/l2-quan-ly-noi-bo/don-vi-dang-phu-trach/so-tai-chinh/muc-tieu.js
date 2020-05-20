import React, { Component } from "react";
import { View, Platform, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, StatusBar, ImageBackground, SectionList } from "react-native";
import {scale, verticalScale, moderateScale} from "../../../user-controls/utilities/Scale";
import {
    Container,
    Header,
    Title,
    Icon,
    Body,
    Footer,
    Picker,
    Content
} from "native-base";
import CustomTabs2 from '../../../navigation-controls/CustomTabs2';
import CustomHeader from "../../../user-controls/CustomHeader";
import LinhVucQuanLyAPI from "../../../../services/api-service/linh-vuc-quan-ly-api";
import AppIndicator from "../../../user-controls/AppIndicator";
import Text from '../../../../components/custom-view/text';
const win = Dimensions.get('window');

class Control extends Component {
    render() {
        return (
            <View style={{ height: 10, width: 70, backgroundColor: "#d3d3d3", flexDirection: "row" }}>
                <View style={{ height: 10, flex: this.props.ratio, backgroundColor: this.props.color }}></View>
                <View style={{ backgroundColor: "#d3d3d3", flex: 100 - this.props.ratio }}></View>
            </View>
        )
    }
}
export default class MucTieu extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            isLoading1: true,
            isLoading2: true,
            data: 0,
            type: "kinhte",
            listData: [],
            listLinhVuc: [],
            idCategory: "",
            listImage: "",
            token: this.props.navigation.getParam('token'),
            id: this.props.navigation.getParam('id')
        }
    }

    componentDidMount() {
        LinhVucQuanLyAPI.getDanhsachMucTieu(1, 100, this.state.token).then((res)=>{
            if(res){
                this.setState({listData: res, isLoading2: false});
            }else{
                this.setState({isLoading2: false});
            }
            // alert(JSON.stringify(res))
        });

        // MasterAPI.getDsLinhVuc().then((res)=> {
        //     if(res!=null)
        //     this.setState({listLinhVuc: res, isLoading1: false});
        //     //alert(JSON.stringify(this.state.listLinhVuc));
        //   });
      }

    renderItems() {
        
        return (
            <View style={styles.content}>
                <SectionList
                    sections={
                        this.state.listData
                    }
                    renderItem={({item}) => 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MucTieuKTLVQLChiTietScreen', {id: item.id, token: this.state.token})} >
                            <View style={styles.itemts} >
                                <View style={{ width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
                                    <Image 
                                    source={item.icon}
                                    // source={require("../../../images/logo/mt_home.png")}
                                        style={{ width: "70%", height:"70%", resizeMode: "cover",  }}
                                    />
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{item.noiDung}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text line={1} style={{ fontSize: scale(28), color: "red" }}>{item.giaTriKeHoach}</Text>
                                        <Text line={1} style={{ fontSize: scale(28), color: "red" }}>{item.donVi}</Text>
                                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
                                            <Control ratio={item.tiendo} color= {item.tiendo >= 66 ? '#32b81b': (item.tiendo >= 33 ? '#ffc835': '#da3838')}/>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    renderSectionHeader={({ section }) =>
                    <View>
                            <View style={{backgroundColor: '#efefef', height: scale(16)}}>
                                
                            </View>
                            <View style={styles.viewtitle}>
                                <View style={{ margin: 10, }}>
                                    <Text style={styles.titleText}>{section.name}</Text>
                                </View>
                            </View>
                    </View> 
                    }
                    keyExtractor={(item, index) => index}
                />
                
            </View>

        )
    }

    _renderItems() {
        if (this.state.isLoading) {
          return (
              <AppIndicator />
          );
        }
        if (this.state.listData.length == 0){
            {console.log(this.state.listData)}
          return (
            <Content style={{marginBottom:10}}>
            <View style={{justifyContent: "center", alignItems: "center", paddingTop: verticalScale(400)}}>
              <Image
                source={require("../../../../../assets/images/search_not_found.png")}
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
            <View style={styles.container}>
               {this.renderItems()}
            </View>
            </ScrollView>
        );
      }

    renderHeader() {
        return (
            <View style={{ width: win.width, height: win.height / 10 }}>
                <ImageBackground source={require('../../../../../images/headerbg.jpg')} style={{ width: win.width, height: win.height / 10, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrow-back" style={{ color: "white" }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>MỤC TIÊU VÀ CHỈ TIÊU CHỦ YẾU</Text>
                    <TouchableOpacity style={{ position: 'absolute', right: 20 }}>
                        <Icon name="menu" style={{ color: "white" }} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }

    render() {
        return (
                <ScrollView>
                    <View style={styles.container}>
                       {this._renderItems()}
                    </View>
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "#efefef",
        flex: 1,
    },
    container2: {
        marginLeft: scale(18),
        marginRight: scale(18),
        //backgroundColor: "white",
        flex: 1,
    },
    content: {
        backgroundColor: "white",
        marginTop: scale(20),
    },
    viewtitle: {
        borderBottomColor: "gray",
        borderBottomWidth: 0.4,
        justifyContent: "center"
    },
    titleText: {
        fontSize: scale(26),
        color: "black"
    },
    itemts: {
        flexDirection: 'row',
        borderBottomColor: "gray",
        borderBottomWidth: 0.4,
    }
});