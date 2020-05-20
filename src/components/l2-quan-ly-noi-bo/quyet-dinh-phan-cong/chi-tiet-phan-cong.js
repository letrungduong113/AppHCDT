import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Container, Footer, } from "native-base";
import CustomHeader from '../../user-controls/CustomHeader';
import CustomTabs2 from '../../navigation-controls/CustomTabs2';
import Text from '../../../components/custom-view/text';
import { scale } from '../../user-controls/utilities/Scale';
import LinhVucQuanLyAPI from '../../../services/api-service/linh-vuc-quan-ly-api'
import AppIndicator from '../../user-controls/AppIndicator'

const margin = scale(30);
const img_call = require('../../../../assets/images/l2-quan-ly-noi-bo/img_call.png');
const img_mail = require('../../../../assets/images/l2-quan-ly-noi-bo/img_mail.png');
const sizeImg = scale(25);
const fontSize22 = scale(22);
const fontSize26 = scale(26);

export default class ChiTietPhanCongScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id") ? this.props.navigation.getParam("id")  : 0,
            token: this.props.navigation.getParam("token") ? this.props.navigation.getParam("token")  : 0,
            listData: [],
            isLoading: true
        }
    }
    componentDidMount() { 
        LinhVucQuanLyAPI.getQuyetDinhPhanCongSoChiTiet(this.state.id, this.state.token).then((res)=>{
        //   alert(JSON.stringify(res));
          this.setState({listData: res, isLoading: false});
        });
      }
    renderHeader() {
        return (
            <CustomHeader title="Nội dung chi tiết"></CustomHeader>
        )
    }
    render() {
        let data = this.state.listData
        return (
            <Container>
                {this.renderHeader()}
                {this.state.isLoading || !data || data.length < 1 ? (<AppIndicator />) :
                (<ScrollView>
                    <View style={styles.contain}>
                        <View style={styles.body}>
                            <View style={{ width: scale(110), height: scale(110) }}>
                                <Image source={data.icon} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.text26}>Ông/Bà {data.hoTen}</Text>
                                <Text style={styles.text22}>{data.chucVu}</Text>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Image source={img_call} style={{ width: sizeImg, height: sizeImg }} />
                                    <Text style={[styles.text22, { marginLeft: 10 }]}>Điện Thoại: {data.dienThoai}</Text>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Image source={img_mail} style={{ width: sizeImg, height: sizeImg }} />
                                    <Text style={[styles.text22, { marginLeft: 10 }]}>Email: {data.email}</Text>
                                </View>
                            </View>


                        </View>
                        {/* <View style={styles.kinang}>
                            <Text style={styles.text22}>Chuyên môn nghiệp vụ: <Text style={[styles.text22, { color: "#333333" }]}>{data.chuyenvien}</Text></Text>
                            <Text style={styles.text22}>Lý luận chính trị: <Text style={[styles.text22, { color: "#333333" }]}>{data.lyluanchinhtri}</Text></Text>
                            <Text style={styles.text22}>Kí hiệu viết tắt: <Text style={[styles.text22, { color: "#333333" }]}>{data.viettat}</Text></Text>
                            <Text>{"\n"}</Text>
                        </View> */}
                    </View>
                    <View style={styles.contain}>
                        <View style={{ margin: margin }}>
                            <Text style={{ fontSize: fontSize26, color: "#494949", marginBottom: 20}}>PHÂN CÔNG NHIỆM VỤ CỦA UBND TỈNH</Text>
                            <Text style={[styles.text26, { color: "#666666", lineHeight: 20 }]}>{data.phanCongNV}</Text>
                        </View>
                    </View>
                </ScrollView>)
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    body: {
        margin: margin,
        flexDirection: 'row'
    },
    info: {
        marginLeft: margin,
        width: '100%'
    },
    text22: {
        fontSize: fontSize22,
        color: "#999999",
    },
    text26: {
        fontSize: fontSize26,
    },
    kinang: {
        marginLeft: margin,
        // marginTop: 10
    }
})