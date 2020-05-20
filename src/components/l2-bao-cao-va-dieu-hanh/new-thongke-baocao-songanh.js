import React, { Component } from "react";
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import { Platform, StyleSheet, View, TouchableWithoutFeedback, AsyncStorage, ProgressBarAndroid, Dimensions, ScrollView, TouchableOpacity, Image, StatusBar, ImageBackground, PixelRatio } from 'react-native';
import Text from '../../components/custom-view/text';
import Video from 'react-native-video';
import { Container, Header, Title, Icon, Body, Content, Picker} from "native-base";
import Footer, { footerMargin } from '../user-controls/CustomFooter'
import CustomTabs2 from '../navigation-controls/CustomTabs2';
import CustomHeader from '../user-controls/CustomHeader';
import KhanCapAPI from "../../services/api-service/khan-cap-api";
import AppIndicator from "../user-controls/AppIndicator";
import ThongKeBox, { NEW_CATEGORY, PROCESSING_STATUS } from "../user-controls/ThongKeBox";
import { GROBAL_RESOUCE } from "../../../assets/strings/string-bn";
import MapView, { Marker } from 'react-native-maps';
import PieChart from "../user-controls/Charts/PieChart";
import CommonAPI from "../../services/api-service/common-api";

const TAT_CA_LINH_VUC = '0';
var FONT_SIZE_MAIN = scale(26);
var FONT_SIZE_SUB = scale(24);
var margin20 = scale(20);
var margin10 = scale(10);
var IconLocation = scale(40);
const win = Dimensions.get('window');



const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const dataPercent={
    name: 'Tỉ lệ',
    colorByPoint: true,
    data: [{
        name: 'Quá hạn',
        y: 20,
    }, {
        name: 'Đang xử lý',
        y: 20
    }, {
        name: 'Chờ ý kiến',
        y: 20
    }, {
        name: 'Chưa xử lý',
        y: 20
    }, {
        name: 'Hoàn thành',
        y: 20
    }],
}
export default class ThongKeBaoCaoFragment extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.map = null;
        this.state = {
            rate: 1,
            resizeMode: 'contain',
            paused: true,
            pickerValueHolder: '1.0',
            poster: '',
            listLinhVuc: [],
            isLoading: true,
            listData: [],
    
        };

    }

    componentDidMount() {
        // CommonAPI.getThongKe(4, 2019, 0, this.props.token).then(res=> {
        //     // alert(JSON.stringify(res))
        //     if(res!=null){
        //         this.setState({
        //             listData: res,
        //         });
        //     }
        // });

    }

 

   
    // height/width = height_new/width_new
    getHeightRatio(width, width_new, height_new) {
        let height = height_new * width / width_new
        return height
    }

    renderPicker() {
        return (
            <ThongKeBox 
                ref = {ref=>this._thongke = ref}
                title="" 
                token={this.props.token}
                navigation={this.props.navigation}
                catId={NEW_CATEGORY.BAO_CAO} 
                // onFilter={(status, month) => this.onFilterStatus(status, month)}

                />
             
        );
      }

    // renderPicker() {
    //     return (
    //         <View style={{ borderColor: '#d7d7d7', backgroundColor: '#fafafa', margin: 10, borderWidth: 1 }}>
    //             <Picker  mode={"dropdown"}
    //                 itemTextStyle={{ color: "#3f3f3f", textTransform: 'uppercase' }}
    //                 selectedValue={this.state.pickerSelectedItem}
    //                 mode="dropdown"
    //                 iosHeader="Mời bạn chọn"
    //                 headerBackButtonText="Hủy"
    //                 headerBackButtonTextStyle = {{padding:20}}
    //                 headerTitleStyle = {{paddingTop:20}}
    //                 style={{
    //                     height: this.getHeightRatio(win.width, 682, 72),
    //                 }}
    //                 onValueChange={(itemValue, itemIndex) => { this.onFilterLinhVuc(itemValue) }}
    //             >
    //                 <Picker.Item label="Tất cả lĩnh vực khẩn cấp" value={TAT_CA_LINH_VUC} />
    //                 {
    //                     this.state.listLinhVuc.map((item, index) => {
    //                         return (<Picker.Item label={item.name.replace("\n","").replace("\r","")} value={item.id} />)
    //                     })
    //                 }
    //             </Picker>
    //             {
    //                 Platform.OS == 'ios' ? <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 30, justifyContent: 'center' }}>
    //                     <Image source={require('../../../images/logo/sortdown.png')}
    //                         style={{ height: 10, width: 10 }}
    //                     />
    //                 </View> : <View />
    //             }
    //         </View>
    //     );
    // }
    
    render() {
        return (
            <Container>
                {/* {this.renderHeader()} */}
                <Content style={[styles.container, { marginBottom: footerMargin }]}>
                <ThongKeBox 
                    ref = {ref=>this._thongke = ref}
                    title="" 
                    token={this.props.token}
                    navigation={this.props.navigation}
                    catId={NEW_CATEGORY.BAO_CAO} onFilter={(status, month) => this.renderPicker(status, month)}/>
                
                </Content>
                {/* <Footer style={Platform.OS == 'ios' ? styles.footerIos : styles.footerAndroid}>
                    <View>
                        <CustomTabs2 active='0'></CustomTabs2>
                    </View>
                </Footer> */}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
    },
    header: {
        width: win.width,
        height: win.height / 10,
        backgroundColor: 'transparent', borderWidth: 0, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0, elevation: 0
    },
    header_imgBackground: {
        width: win.width,
        height: win.height / 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    controls: {
        backgroundColor: 'white',
        opacity: 0.7,
        borderRadius: 5,
        position: 'absolute',
        //alignItems: 'center',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemts: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: win.width,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
    },

    fullScreen: {
        //position: 'absolute',
        //top: win.height / 10,
        // left: 0,
        // bottom: 0,
        // right: 0,
        backgroundColor: 'black',
        marginTop: scale(10),
        justifyContent: 'center',
        // width: win.width,
        // height: win.width / 2,
        width: scale(720),
        height: verticalScale(375)

    },

    fullScreen1: {
        position: 'absolute',
        // left: 0,
        // bottom: 0,
        // right: 0,
        //backgroundColor: 'red',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    playControl: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerIos: { height: verticalScale(109), backgroundColor: 'transparent', borderTopWidth: 0 },
    footerAndroid: { height: verticalScale(109), backgroundColor: 'transparent', paddingBottom: -10 },
});