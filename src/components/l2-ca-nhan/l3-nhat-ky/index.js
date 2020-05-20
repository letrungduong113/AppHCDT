import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, Modal, TextInput } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import TaoNhatKy from './tao-nhat-ky'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Body,
    Right,
    CheckBox,
    Footer,
    View,

} from "native-base";
import CustomHeader from "../../user-controls/CustomHeader";
import CustomTabs2 from "../../navigation-controls/CustomTabs2";
import { setIndex } from "../../../redux/actions/list";
import { openDrawer } from "../../../redux/actions/drawer";
import styles from "./styles";
import Text from '../../custom-view/text'
import NhatKyAPI from "../../../services/api-service/nhat-ky-api";
import  {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale'
import moment from 'moment'
import AppIndicator from "../../user-controls/AppIndicator";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
class NhatKyCaNhanScreen extends Component {
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
            data: [],
            createItem: false
        }
    }
    componentDidMount() {
        this.getNhatKy(0);
    }
    getNhatKy(offset){
        this.setState({isLoading:true})
        NhatKyAPI.getDsNhatKy(offset).then((res) => {
            if(res){
                this.setState({ ...this.state,data: res,isLoading:false })
            }
        });
    }
    setCreateItem(visible) {
        this.setState({ ...this.state, createItem: visible });
    }
    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }
    renderList(value) {
        return value.map((data, i) => {
            return (
               <View>
                    <View style={[styles.containerRow, styles.items]} key={i}>
                    <View style={{ flex: 5 }}>
                        <Text style={{color:'#333333',fontSize:scale(26)}} numberOfLines={2}>{data.noiDung}</Text>
                        <View style={[styles.containerRow, { alignItems: 'center' ,marginTop:moderateScale(8)}]}>
                        <Image style ={{width:scale(30),height:scale(30)}} source={require('../../../../assets/images/icon/ic_clock.png')}
                            />
                            <Text style={{ color: 'grey', fontSize:scale(26), marginLeft: 8 }}>{moment(data.thoiGianTao).format('DD/MM/YYYY HH:mm')}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image 
                            style ={{width:scale(66),height:scale(66)}}
                            source={data.isNoTiFy==1?require('../../../../assets/images/icon/ic_noti_active.png'):require('../../../../assets/images/icon/ic_noti_unactive.png')}
                            />
                    </View>
                </View>
                    <View style={{height:i+1==this.state.data.length?0:1, width:deviceWidth,backgroundColor:'#ebebeb'}}/>
               </View>
            )
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <CustomHeader title="SỔ TAY"></CustomHeader>
                <Content style={{paddingBottom:verticalScale(106)}}>
                    {this.state.isLoading?<AppIndicator/>:this.renderList(this.state.data)}
                </Content>
                <View style={{backgroundColor:'white',width: deviceWidth , height: verticalScale(106),padding:8}}>
                    <TouchableOpacity style={{  backgroundColor: '#3d5f8f', height: verticalScale(106)-16,justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.setCreateItem(true)
                        }}>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Text style={{ fontSize: scale(34), color: 'white' }}>+   </Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: scale(28), fontFamily: 'Roboto-Medium' }}> THÊM</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
               
                {this.state.createItem && <TaoNhatKy onCreateSuccess={()=>this.getNhatKy(0)} visible={this.state.createItem} close={()=>this.setState({createItem:false})}/>}
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

// const AnnounceSwagger = connect(mapStateToProps, bindAction)(NhatKyCaNhanScreen);
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
export default NhatKyCaNhanScreen;
