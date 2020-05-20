import React, { Component } from "react";
import { View, Text, Platform, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, StatusBar, ImageBackground, FlatList, SectionList } from "react-native";
import {scale, verticalScale, moderateScale} from "../user-controls/utilities/Scale";
import {
    Container,
    Header,
    Title,
    Icon,
    Content,
    Body,
    Picker
} from "native-base";
import Footer ,{footerMargin} from '../user-controls/CustomFooter'
import CustomTabs2 from '../navigation-controls/CustomTabs2';
import CustomHeader from "../user-controls/CustomHeader";
import MucTieuAPI from "../../services/api-service/muc-tieu-api";
import MasterAPI from "../../services/api-service/master-api";
import AppIndicator from "../user-controls/AppIndicator";
import YearMonthPicker from '../user-controls/YearPicker';
import moment from 'moment';
// import NumberFormat from 'react-number-format';
const win = Dimensions.get('window');

class Control extends Component {
    render() {
        return (
            <View style={{ height: 10, width: scale(90), backgroundColor: "#d3d3d3", flexDirection: "row" }}>
                <View style={{ height: 10, flex: this.props.ratio, backgroundColor: this.props.color }}></View>
                <View style={{ backgroundColor: "#d3d3d3", flex: 100 - this.props.ratio }}></View>
            </View>
        )
    }
}
export default class MucTieuKinhTeScreen extends Component {

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
            monthPicker:false,
            listData: [
            //     {
            //     id: '',
            //     name: '',
            //     data: [
            //       {
            //         id: "",
            //         iconLink: "",
            //         ten_chi_tieu: "",
            //         muc_tieu: "",
            //         don_vi: "%",
            //         tiendo: 95,
            //       },
            //     ]
            //   }
            ],
            listChiTieu: [
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
                {id: 0, noiDung: "Tổng sản phẩm trong nước (GDP)", giaTriKeHoach: "Tăng 6,5% - 6,7%"},
            ],
            listLinhVuc: [],
            idCategory: "",
            listImage: "",
            year: moment().format('YYYY'),
            month: moment().format('M'),
        }
    }

    componentDidMount() {
        MucTieuAPI.getDsMucTieu(0, 1, 100, this.state.year).then((res)=>{
            // alert(JSON.stringify(res))
          if(res!=null){
            this.setState({listData: res, isLoading2: false});
            
          }
        });

        MasterAPI.getDsLinhVuc().then((res)=> {
            if(res!=null)
            this.setState({listLinhVuc: res, isLoading1: false});
            // alert(JSON.stringify(this.state.listLinhVuc));
          });
      }


    renderPicker() {
        
        return (
          <View style={styles.content}>
            <View style={{ flexDirection: "row", flex: 10 }}>
              <Picker
                selectedValue={this.state.data}
                style={{ flex: 8, height: scale(64) }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>{
                    this.setState({data: itemValue });
                    MucTieuAPI.getDsMucTieu(itemValue, 1, 100, this.state.year).then((res) => {
                        if (res!=null) {
                            this.setState({ listData: res, isLoading2: false });
                        }else{
                            this.setState({ listData: [], isLoading2: true });
                        }
                        // alert(JSON.stringify(res));
                    });
                    // this.setState({type: itemValue })
                }
                  
                }
              >
                <Picker.Item label="TẤT CẢ LĨNH VỰC" value={0} />
                
                {
                    this.state.listLinhVuc.map((item, index) => {
                        return (<Picker.Item label={item.name.toUpperCase()} value={item.id} />)
                    })
                }
              </Picker>
              {Platform.OS == "ios" ? (
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: 30,
                    backgroundColor: "white",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    source={require("../../../images/logo/sortdown.png")}
                    style={{ height: 10, width: 10 }}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        );
    }
    // listItems(value) {
    //     return value.map((data, i) => {
    //         return (
    //             <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet')}>
    //                 <View style={styles.itemts} >
    //                     <View style={{width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
    //                         <Image source={data.icon}
    //                             style={{ width: 27, resizeMode: "contain" }}
    //                         />
    //                     </View>
    //                     <View style={{ justifyContent: "center" }}>
    //                         <Text style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{data.name}</Text>
    //                         <View style={{ flexDirection: "row" }}>
    //                             <Text style={{ fontSize: scale(28), color: "red" }}>{data.textNum}</Text>
    //                             <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
    //                                 <Control ratio={data.ratio} color={data.color} />
    //                             </View>
    //                         </View>

    //                     </View>
    //                     <View style={{ position: "absolute", right: 0, width: 50, height: 50, justifyContent: "center", alignItems: "center", }}>
    //                         <Icon name="ios-arrow-forward" style={{ color: "#d7d7d7" }} />
    //                     </View>
    //                 </View>
    //             </TouchableOpacity>

    //         )
    //     }
    //     )
    // }
    renderItem2(data){
        return(
            <FlatList
                data= {data}
                renderItem={({item}) => 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet', {id: item.id})} >
                            <View style={styles.itemts} >
                                <View style={{ width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
                                    <Image 
                                    source={item.icon?item.icon: require('../../../assets/images/muctieu/default.png')}
                                    // source={require("../../../images/logo/mt_home.png")}
                                        style={{ width: "70%", height:"70%", resizeMode: "contain",  }}
                                    />
                                </View>
                                <View style={{ justifyContent: "center", width: win.width-scale(102) }}>
                                    <Text numberOfLines={1} style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{item.noiDung?item.noiDung:""}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        {/* <View style={{width: win.width-scale(250)}}> */}
                                        <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red" }}>{item.giaTriKeHoach}</Text>
                                        {/* <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red", marginLeft: 2 }}>{item.donVi?item.donVi:""}</Text> */}
                                        {/* </View> */}
                                        {/* <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
                                            <Control ratio={item.tiendo?item.tiendo:0} color= {item.tiendo >= 66 ? '#32b81b': (item.tiendo >= 33 ? '#ffc835': '#da3838')}/>
                                        </View> */}
                                    </View>

                                </View>
                                {/* <View style={{ position: "absolute", right: 0, width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center", }}>
                                    <Icon name="ios-arrow-forward" style={{ color: "#d7d7d7" }} />
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    }
            />
        );
    }
    renderItems() {
        // if(this.state.listData === undefined || this.state.listData.length <1)
        // return (<View><Text>Ko co du lieu</Text></View>)
        // else
        return (
            <View style={styles.content}>
                {(this.state.isLoading2||this.state.listData==null||this.state.listData===undefined) ? (<AppIndicator></AppIndicator>):
                (
                    <SectionList
                    sections={
                        this.state.listData
                    }
                    renderItem={({item}) => 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BaoCaoKTXHChiTiet', {id: item.id})} >
                            <View style={styles.itemts} >
                                <View style={{ width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center" }}>
                                    <Image 
                                    source={item.icon?item.icon: require('../../../assets/images/muctieu/default.png')}
                                    // source={require("../../../images/logo/mt_home.png")}
                                        style={{ width: "70%", height:"70%", resizeMode: "contain",  }}
                                    />
                                </View>
                                <View style={{ justifyContent: "center", width: win.width-scale(102) }}>
                                    <Text numberOfLines={1} style={{ fontSize: scale(24), color: "black", fontStyle: "normal" }}>{item.noiDung?item.noiDung:""}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        {/* <View style={{width: win.width-scale(250)}}> */}
                                        <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red" }}>{item.giaTriKeHoach?this.addThousandsSeparator(item.giaTriKeHoach.trim()):""}</Text>
                                        <Text numberOfLines={1} style={{ fontSize: scale(28), color: "red", marginLeft: 2 }}>{item.donVi?item.donVi:""}</Text>
                                        {/* </View> */}
                                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
                                            <Control ratio={item.tiendo?item.tiendo:0} color= {item.tiendo >= 66 ? '#32b81b': (item.tiendo >= 33 ? '#ffc835': '#da3838')}/>
                                        </View>
                                    </View>

                                </View>
                                {/* <View style={{ position: "absolute", right: 0, width: scale(102), height: scale(102), justifyContent: "center", alignItems: "center", }}>
                                    <Icon name="ios-arrow-forward" style={{ color: "#d7d7d7" }} />
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    }
                    renderSectionHeader={({ section }) =>
                    <View>
                            <View style={{backgroundColor: '#efefef', height: scale(16)}}>
                                
                            </View>
                            <View style={styles.viewtitle}>
                                <View style={{ margin: 10, }}>
                                    <Text style={styles.titleText}>{section.name?section.name.toUpperCase():""}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('BaoCaoTongHop', {id: section.id})}>
                                    <View style={{ margin: 10}}>
                                        <Text style={{color: "#3173d3", fontSize: scale(22)}}>Xem báo cáo</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    </View> 
                    }
                    keyExtractor={(item, index) => index}
                />)
                }
            </View>

        )
    }
    // renderHeader() {
    //     return (
    //         <View style={{ width: win.width, height: win.height / 10 }}>
    //             <ImageBackground source={require('../../../images/headerbg.jpg')} style={{ width: win.width, height: win.height / 10, justifyContent: 'center', alignItems: 'center', }}>
    //                 <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => this.props.navigation.goBack(null)}>
    //                     <Icon name="arrow-back" style={{ color: "white" }} />
    //                 </TouchableOpacity>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>MỤC TIÊU VÀ CHỈ TIÊU CHỦ YẾU</Text>
    //                 <TouchableOpacity style={{ position: 'absolute', right: 20 }}>
    //                     <Icon name="menu" style={{ color: "white" }} />
    //                 </TouchableOpacity>
    //             </ImageBackground>
    //         </View>
    //     )
    // }
    renderHeader() {
        return (
            <ImageBackground
                source={require("../../../images/headerbg.jpg")}
                style={{ width: win.width }}
                resizeMode="cover"
            >
                <Header style={{ backgroundColor: "transparent", borderWidth: 0, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0, elevation: 0 }}>
                    <Body style={{ flex: 3, alignItems: "center" }}>
                        <TouchableOpacity style={{ position: "absolute", left: 10, paddingLeft: 10, paddingRight: 10 }} onPress={() => this.props.navigation.goBack(null)}>
                            <Icon active name="md-arrow-round-back" style={{ color: 'white' }} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Title style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>
                                CHỈ TIÊU CHỦ YẾU 2019
                            </Title>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 20 }} >
                            <Icon name="ios-calendar" style={{ color: "white" }} />
                        </TouchableOpacity>
                    </Body>
                </Header>
            </ImageBackground>
        )
    }

    addThousandsSeparator(input) {
        var output = input
        if (parseFloat(input)) {
            input = new String(input); // so you can perform string operations
            var parts = input.split("."); // remove the decimal part
            parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
            output = parts.join(".");
        }
    
        return output;
    }

    pickMonthYear(year){
        this.setState({
            year: year,
        });
        MucTieuAPI.getDsMucTieu(0, 1, 100, year).then((res)=>{
            if(res!=null){
              this.setState({listData: res, isLoading2: false});
            //   alert(JSON.stringify(res))
            }
          });
    }
    render() {
        return (
            <Container>

                <CustomHeader title="XEM BÁO CÁO ĐIỀU HÀNH" source={require('../../../assets/images/icon/ic_calendar.png')} goto={()=>this.setState({monthPicker:true})}></CustomHeader>
                <Content style={{marginBottom:footerMargin}}>
                    <View style={styles.container}>
                        {/* <View style={styles.container2}>{this.renderPicker()}</View> */}

                        {/* {this.renderItems()} */}
                        <View style={styles.itemts} >
                                <View style={{height: scale(95), justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{paddingLeft: scale(20), fontSize: scale(30)}}>12 CHỈ TIÊU KINH TẾ XÃ HỘI</Text>
                                </View>
                        </View>
                        {this.renderItem2(this.state.listChiTieu)}
                    </View>
                    <YearMonthPicker
                        visible={this.state.monthPicker}
                        onClose={()=>this.setState({monthPicker:false})}
                        year={this.state.year}
                        selectYear2={(year)=>this.pickMonthYear(year)}
                        // month={this.state.month}
                        // selectMonth ={(month,year)=>this.pickMonthYear(month,year)}
                    />
                </Content>
                {/* <Footer style={{ height: 60, backgroundColor: 'transparent' }}>
                    <View>
                        <CustomTabs2 active='0'></CustomTabs2>
                    </View>
                </Footer> */}
                <Footer select='0'/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "#ffffff",
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
        // marginTop: scale(20),
    },
    viewtitle: {
        borderBottomColor: "gray",
        borderBottomWidth: 0.4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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