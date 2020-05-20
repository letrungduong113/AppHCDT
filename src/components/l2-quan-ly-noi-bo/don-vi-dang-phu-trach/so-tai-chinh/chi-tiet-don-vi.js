import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../user-controls/CustomHeader';
import CustomTabs2 from '../../navigation-controls/CustomTabs2';
import Text from '../../../components/custom-view/text';
import { scale, verticalScale } from '../../user-controls/utilities/Scale';
import { Container, Footer, } from "native-base";
const margin = scale(20);
const fontSize22 = scale(22);
const fontSize26 = scale(26);
export default class ChiTietDonViScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            month: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
            // listData: {
            //     idTenSo: "Sở công thương",
            //     muctieu: "Mục tiêu, nhiệm vụ",
            //     noidungmuctieu: " \nBáo cáo định kỳ hoặc đột xuất kết quả thực hiện; kiến nghị giải pháp nhằm thực hiện có hiệu quả chương trình, kế hoạch công tác;\n\ne) Kịp thời báo cáo, điều chỉnh chương trình, kế hoạch công tác, đáp ứng yêu cầu quản lý, chỉ đạo, điều hành của Ủy ban nhân dân, Chủ tịch Ủy ban nhân dân tỉnh.\n\nPhục vụ hoạt động của Ủy ban nhân dân tỉnh:\n\na) Chủ trì, phối hợp với các cơ quan liên quan chuẩn bị chương trình, nội dung, phục vụ các cuộc họp của Ủy ban nhân dân tỉnh;\n\nb) Thực hiện chế độ tổng hợp, báo cáo;\n\nc) Theo dõi, đôn đốc, đánh giá kết quả thực hiện Quy chế làm việc của Ủy ban nhân dân tỉnh;\n\nd) Tổ chức công tác tiếp công dân theo quy định của pháp luật.\n\nTham mưu, giúp Chủ tịch Ủy ban nhân dân tỉnh thực hiện các nhiệm vụ, quyền hạn sau:\n\na) Triệu tập, chủ trì các cuộc họp;\n\nb) Theo dõi, đôn đốc, chỉ đạo, kiểm tra công tác đối với các Sở; Hội đồng nhân dân và Ủy ban nhân dân cấp huyện;\n\nc) Thực hiện nhiệm vụ trước Hội đồng nhân dân tỉnh; tiếp xúc, báo cáo, trả lời kiến nghị của cử tri;\n\nd) Chỉ đạo, áp dụng biện pháp cần thiết giải quyết công việc trong trường hợp đột xuất, khẩn cấp;",
            //     chitieu: "CHỈ TIÊU",
            //     noidungchitieu: "Tốc độ tăng trưởng kinh tế (theo GRDP) từ 7,5-8,0% , trong đó: nông - lâm - ngư nghiệp từ 4,0-4,5%; công nghiệp - xây dựng từ 10,5-11,0%; dịch vụ từ 7,5-8,0%",
            //     ketqua: "KẾT QUẢ THỰC HIỆN",
            //     noidungketqua: "Diễn giải : Tốc độ tăng trưởng GRDP đến tháng 3 đã hoàn thành được 30% chi tiêu so với kế hoạch đề ra. Dự kiến đến tháng 12 sẽ hoàn thành vượt mức kế hoạch 20% ",
            //     donvi: "Sở giáo dục, Sở Y tế, Sở nông nghiệp",
            // }
        }
    }
    renderHeader() {
        return (
            <CustomHeader title="CHI TIẾT ĐƠN VỊ"></CustomHeader>
        )
    }
    render() {
        let data = this.state.listData
        return (
            <Container>
                {this.renderHeader()}
                <ScrollView>
                    <View style={styles.contain}>
                        <View style={{ margin: margin }}>
                            <Text style={{ fontSize: scale(32), color: "#333333", fontFamily: "Roboto-Bold" }}>{data.idTenSo}</Text>
                            <Text style={{ fontSize: scale(32), color: "#333333", fontFamily: "Roboto-Regular", marginTop: 5 }}>{data.muctieu}</Text>
                            <Text style={{ fontSize: fontSize26, color: "#666666" }}>{data.noidungmuctieu}</Text>
                        </View>
                    </View>
                    <View style={styles.contain}>
                        <View style={{ margin: margin }}>
                            <Text style={{ fontSize: scale(26), color: "#454545", fontFamily: "Roboto-Regular", }}>{data.chitieu}</Text>
                            <Text style={{ fontSize: fontSize26, color: "#1f1f1f", fontFamily: "Roboto-Regular" }}>{data.noidungchitieu}</Text>
                        </View>
                    </View>
                    <View style={styles.contain}>
                        <View style={{ margin: margin }}>
                            <Text style={{ fontSize: scale(26), color: "#454545", fontFamily: "Roboto-Regular", }}>{data.ketqua}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                {this.state.month.map((data, i) => {
                                    return (
                                        <View key={i} style={{ flex: 1 }}>
                                            <Text style={{ fontSize: scale(20) }}>{data}</Text>
                                        </View>
                                    )
                                })
                                }
                            </View>
                            <View style={{width: "100%", height: verticalScale(30), backgroundColor: '#cfcfcf'}}>
                                <View style={{height: verticalScale(30), width: scale(142), backgroundColor: '#6c73ff'}}></View>
                            </View>
                            <Text style={{ fontSize: fontSize26, color: "#1f1f1f", fontFamily: "Roboto-Regular", marginTop: 10 }}>{data.noidungketqua}</Text>
                            <Text style={{fontSize: fontSize26, color: "#333333", fontFamily: "Roboto-Regular", marginTop: 5}}>Đơn vị: <Text style={{fontSize: fontSize26, color: "#999999", fontFamily: "Roboto-Regular"}}>{data.donvi}{'\n'}</Text></Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        marginTop: 10,
        backgroundColor: 'white'
    },

})