import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { convertTime } from "../user-controls/utilities/converter";
import Text from '../../components/custom-view/text';
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import moment from "moment";
import KhanCapAPI from "../../services/api-service/khan-cap-api";
const win = Dimensions.get('window');
imgTaiLieu = require('../../../assets/images/l2-khan-cap/l2-chi-tiet/image_tailieu.png');
sizeImg = scale(60);
imgKhanCap = require('../../../assets/images/l2-khan-cap/l2-chi-tiet/image_khancap.png');
export default class CTKPTienTrinhScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listData: {

            },
            data: {
                // "size": 1,
                // "commentEntity": [
                //     {
                //         "commentId": 8,
                //         "parentCommentId": 0,
                //         "newsId": 21,
                //         "userId": 3,
                //         "orgID": 0,
                //         "title": "title",
                //         "contents": "content",
                //         "createTime": "2019-04-05T13:56:26.220+0000",
                //         "status": 0,
                //         "process": 0,
                //         "referUserID": 0,
                //         "referOrgID": 0
                //     }
                // ]
            }

        }
    }
    componentDidMount() {
        // console.log("Get newID", this.props.newsID, this.props.userID)
        // KhanCapAPI.getComment(1,10,21,3).then((res) => {
        //     if (res != null) {
        //         this.setState({ listData: res, isLoading: false });
        //     }
        //     // alert(JSON.stringify(res));
        //     // console.log("get DS TienTrinh", res)
        // });
        this.reloadData();
    }

    reloadData() {
        //alert("Loading dữ liệu...");
        KhanCapAPI.getComment(1, 10, this.props.id, 3).then((res) => {
            if (res != null) {
                this.setState({ listData: res, isLoading: false });
            }
        });
    }
    renderListTienTrinh(data) {
        if (data == null || data === undefined)
            return (<View></View>)
        else {
            return data.map((data, i) => {
                return (
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }} key={i}>
                        <View style={{ flex: 1 }}>
                            <View style={{ width: sizeImg, height: sizeImg }}>
                                {/* {console.log("Lấy ảnh",data.avatar)} */}
                                <Image source={data.avatar ? data.avatar : require('../../../assets/images/default/avatar_progress.png')} style={{ height: "100%", width: "100%" }} />
                            </View>
                        </View>
                        <View style={{ flex: 8.5, }}>
                            <View style={{ marginLeft: scale(16), backgroundColor: '#f5f5f5' }}>
                                <View style={{ marginLeft: 5 }}>
                                    <View style={[styles.titleView, { height: sizeImg }]}>
                                        <Text style={styles.chuviText}>{data.title}</Text>
                                        <Text style={styles.textTime}>{convertTime(data.createTime)}</Text>
                                        {data.status == 1 ? (
                                            <View style={{ marginLeft: 10 }}>
                                                <Image source={imgKhanCap} style={{ width: scale(30), height: scale(30) }} />
                                            </View>
                                        ) : null}
                                    </View>

                                    <View style={{ marginTop: 5 }}>
                                        <Text style={styles.noidungText}>{data.contents}</Text>
                                    </View>
                                    <View style={styles.bophanthuchienView}>
                                        <Text style={styles.bophanthuchienText}>Bộ phận thực hiện: {data.referUserID}</Text>

                                    </View>

                                    {/* {data.fileDinhKems[0] ? ( */}
                                    {/* // <View style={styles.tailieuView}>
                                    //     <Image source={imgTaiLieu} style={{ width: scale(24), height: scale(24) }} />
                                    //     <Text style={styles.tailieuText}>
                                    //         {/* {console.log("Get Data Name" + i, data.fileDinhKems[0] )} */}
                                    {/* //         {data.fileDinhKems[0].name}
                                    //     </Text>
                                    // </View> */}
                                    {/* ) : null} */}

                                    <View style={{ height: scale(20) }}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })
        }
    }
    render() {
        if (this.state.isLoading && this.state.listData) {
            return (<View><Text>Loading...</Text></View>)
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.dsTienTrinhView}>
                        <View style={{ width: scale(680) }}>
                            {/* {console.log(this.state.listData.tienTrinhs.tienTrinhs)} */}
                            {/* {console.log("Props Tien Trinh",this.props.data)} */}
                            {this.renderListTienTrinh(this.state.listData.commentEntity)}
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: win.width,
        backgroundColor: 'white'
    },
    contain: {
        margin: scale(20),
        backgroundColor: '#f5f5f5'
    },
    body: {
        marginTop: scale(21),
        marginLeft: scale(23),
        //backgroundColor: 'red'
    },
    title: {
        flexDirection: 'row'
    },
    titleImage: {
        width: sizeImg,
        height: sizeImg,
        backgroundColor: 'red'
    },
    titleView: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    chuviText: {
        fontSize: scale(24),
        color: '#ef743e',
        fontFamily: 'Roboto-Regular'
    },
    textTime: {
        fontSize: scale(24),
        color: '#999999',
        fontFamily: 'Roboto-Regular',
        marginLeft: 5
    },
    noidungView: {
        marginTop: 5,
        width: scale(623)
    },
    noidungText: {
        color: '#333333',
        fontSize: scale(26),
        fontFamily: 'Roboto-Regular'
    },
    bophanthuchienView: {
        marginTop: 10,

    },
    bophanthuchienText: {
        width: scale(581),
        fontSize: scale(24),
    },
    tailieuView: {
        marginTop: 5,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    tailieuText: {
        color: '#3c7bd9',
        fontSize: scale(24),
        fontFamily: 'Roboto-Regular',
        marginLeft: 10,
    },

    //ds các tiến trình
    dsTienTrinhView: {
        marginTop: scale(20),
        marginLeft: scale(23),
    }
})