import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Footer,
    View,

} from "native-base";
import AttachmentsBox from '../../user-controls/AttachmentsBox'
import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import CustomHeader from "../../user-controls/CustomHeader";
import AutoHeightImage from "react-native-auto-height-image";
import styles from "./styles";
import LichCongTacAPI from "../../../services/api-service/lich-cong-tac-api";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import AppIndicator from "../../user-controls/AppIndicator";
import moment from 'moment'
import HtmlText from '../../user-controls/HtmlText'
import { scale } from "../../user-controls/utilities/Scale";
import SpeakerBox from "../../user-controls/SpeakerBox";
export default class LichCTChiTietScreen extends Component {
    static navigationOptions = {
        header: null
    };
    static propTypes = {
        name: PropTypes.string,
        setIndex: PropTypes.func,
        list: PropTypes.arrayOf(PropTypes.string),
        openDrawer: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        LichCongTacAPI.getChiTietLichCongTac(this.props.navigation.state.params.id).then((res) => {
            this.setState({ ...this.state, data: res, isLoading: false });
            if(res){
                console.log('datalct',res)
                this.setState({ ...this.state, data: res, isLoading: false });
            }else{
                this.setState({isLoading: false });
            }
        });
    }
    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }
    getLienQuan(data){
        var rs="";
        for (var i = 0; i < data.length-1; i++) {
            rs = rs +data[i].n.trim()+", ";
        }
        if(data.length>0){
            rs = rs + data[i].n.trim();
        }
        return rs;
    }
    renderContent() {
        if (this.state.data) {
            return (
                <View>
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between',marginBottom:8 }]}>
                            <Text style={{ flex: 4, fontSize: scale(32), marginTop: 8, color: '#494949' ,marginRight:8}}>{this.state.data.title}</Text>
                            <View style={{ absolute:'postition',right: 0,top:8}}>
                                <Text style={{ color: 'white',padding:scale(8), fontSize: scale(36), fontWeight: 'bold',backgroundColor:'#3d5e8f' }}>{this.state.data.startDate.substring(0,5)}</Text>
                            </View>
                        </View>
                        <View style={[styles.containerRow, { alignItems: 'center' }]}>
                            <Image style={{ height: 15, width: 15}} source={require('../../../../assets/images/icon/ic_person_grey.png')} />
                            <Text style={{ fontSize: scale(24), marginLeft: 8, color: '#838383' }}>Chủ trì cuộc họp :  {this.state.data.chuTri}</Text>
                        </View>
                        <View style={[styles.containerRow, { alignItems: 'center', marginTop: 5 }]}>
                            <Image style={{ height: 15, width: 15 }} source={require('../../../../assets/images/icon/ic_triangle_grey.png')} />
                            <Text style={{ fontSize: scale(24), marginLeft: 8, color: '#838383' , marginRight:8}}>Thành phần liên quan : {this.getLienQuan(this.state.data.lienQuan)}</Text>
                        </View>
                        <View style={styles.line}></View>
                        <Text style={{ fontSize: scale(26) }}>NỘI DUNG CUỘC HỌP</Text>
                        <HtmlText source={this.state.data.content}></HtmlText>
                        {/* <Text style={{ fontSize: scale(26), marginTop: 8, paddingBottom: 10 }}>{this.state.data.content}</Text> */}
                    </View>
                    <AttachmentsBox itemId={this.props.navigation.state.params.id} callBackFunc={()=>{}}></AttachmentsBox>
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: 10 }}>
                        <View style={[styles.containerRow, { alignItems: 'center', marginLeft: 8, marginRight: 8 }]}>
                            <Image source={require('../../../../assets/images/icon/ic_car_grey.png')} style={{ width: 20, resizeMode: 'contain' }} />
                            <Text style={{ marginLeft: 8,fontSize: scale(24),color:'#333333' }}>{this.state.data.driver} {this.state.data.number_car}</Text>
                            {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon active name="ios-arrow-forward" style={{ color: '#bababa' }} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.line}></View>
                        <View style={[styles.containerRow, { alignItems: 'center', marginLeft: 8, marginRight: 8 }]}>
                            <Image source={require('../../../../assets/images/icon/ic_location_grey.png')} style={{ width: 15, resizeMode: 'contain' }} />
                            <Text style={{ marginLeft: 14 ,fontSize: scale(24),color:'#333333'}}>{this.state.data.address} </Text>
                            {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon active name="ios-arrow-forward" style={{ color: '#bababa' }} />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            );
    
        } else {
            return <View />
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <CustomHeader title="Nội dung chi tiết"></CustomHeader>

                <Content style={{ paddingTop: 10 }}>
                    {this.state.isLoading ? <AppIndicator /> : this.renderContent()}
                    {this.state.data &&<SpeakerBox contents={[this.state.data.title,this.state.data.content]}/>}
                </Content>
            </Container>
        );
    }
}


// function bindAction(dispatch) {
//     return {
//         setIndex: index => dispatch(setIndex(index)),
//         openDrawer: () => dispatch(openDrawer())
//     };
// }
// const mapStateToProps = state => ({
//     name: state.user.name,
//     list: state.list.list
// });

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(LichCTChiTietScreen);
// const DrawNav = DrawerNavigator(
//     {
//         Announce: { screen: AnnounceSwagger },
//     },
//     {
//         contentComponent: props => <DrawBar {...props} />
//     }
// );
// const DrawerNav = null;
// DrawNav.navigationOptions = ({ navigation }) => {
//     DrawerNav = navigation;
//     return {
//         header: null
//     };
// };
// export default DrawNav;
