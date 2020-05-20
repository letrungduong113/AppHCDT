import React, { Component } from "react";
import {
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    WebView,
    Dimensions,
    Platform,
} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

    Picker
} from "native-base";
import CustomHeader from "../../user-controls/CustomHeader";
import { setIndex } from "../../../redux/actions/list";
import { REPORT_CONFIG } from "./data-config";
import styles from "./styles";
import { BarChart, Grid, XAxis, YAxis, PieChart  } from 'react-native-svg-charts';
import AppPieChart from '../../user-controls/Charts/pie-chart';

import {scale, verticalScale, moderateScale} from '../../user-controls/utilities/Scale';
import BaoCaoAPI from "../../../services/api-service/bao-cao-api";
import * as scaled3 from 'd3-scale';
import AppIndicator from "../../user-controls/AppIndicator";
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const IMG_CHECK = require('../../../../assets/images/user-controls/check.png');
const IMG_UNCHECK = require('../../../../assets/images/user-controls/uncheck.png');

    

var titleSize = scale(26)
var content = scale(24)
const chartTitleSize = scale(24)

class BaoCaoThongKeChiTietScreen extends Component {
    static navigationOptions = {
        header: null
    };
    static propTypes = {
        name: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.filterData = JSON.parse(JSON.stringify(REPORT_CONFIG[0].cacCap));

        this.state = {
            isLoading: false,
            isChartSettingVisible: false,
            isOptionSettingVisible: false,
            chartData: [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1],
            chartData2: [0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1],
            chartData3: [{
                key: 1,
                amount: 1,
                svg: { fill: '#21b1a1' },
            },
            {
                key: 2,
                amount: 1,
                svg: { fill: '#0b3d82' }
            },],
            chartData4: [{
                key: 1,
                amount: 1,
                svg: { fill: '#21b1a1' },
            },
            {
                key: 2,
                amount: 1,
                svg: { fill: '#0b3d82' }
            },],
            xAxis: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12" ],

            /* State for filter modal dialog */
            filterOptions:[
                {name: "Phòng giáo dục 1", checked: false},
                {name: "Phòng giáo dục 2", checked: true},
                {name: "Phòng giáo dục 3", checked: false},
            ],
            filterOptionTitle: "Đơn vị cấp dưới",

            chartSettings: this.filterData,
            
            danhMucChiTieu: ["Số giáo viên", "Số học sinh", "Số phòng học"],
            donViTrucThuoc:[],
            donViTrucThuoc2:[],
            selectedDVTH: 0,
            selectedDVTH2: 0,
            selectedChiTieu: 0,
            
        };
        this.pageData = [];
        this.currentFilter = 0;
        this.chiTieuData = this.props.navigation.getParam("data");
        if (!this.chiTieuData) this.chiTieuData ={};
        console.log(this.chiTieuData);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        BaoCaoAPI.getBaoCaoChiTiet(this.state.id).then(res => {
            if (res) {
                donviTH = ["Tất cả các phòng"];
                for (let i = 0; i < res.data.length; i++) {
                    if (donviTH.indexOf(res.data[i].phongGD) < 0) {
                        donviTH.push(res.data[i].phongGD);
                    }
                }
                donviTH2 = ["Tất cả các trường"];
                for (let i = 0; i < res.data.length; i++) {
                    if (donviTH2.indexOf(res.data[i].tenTruong) < 0) {
                        donviTH2.push(res.data[i].tenTruong);
                    }
                }
                this.pageData = res.data;
                this.setState({
                    donViTrucThuoc: donviTH,
                    donViTrucThuoc2: donviTH2,
                }, this.refreshChartData());
            }
            this.setState({isLoading: false});
        })
    }

    refreshChartData() {
        //alert(JSON.stringify(this.filterData));
        if (!this.pageData || !this.pageData) return;
        soHocSinh = [];
        soGiaoVien = [];
        soPhongHoc = [];
        
        donviTHDuocChon = this.state.selectedDVTH > 0 ? this.state.donViTrucThuoc[this.state.selectedDVTH]: "";
        donviTHDuocChon2 = this.state.selectedDVTH2 > 0 ? this.state.donViTrucThuoc2[this.state.selectedDVTH2]: "";
        for (let thang = 1; thang <=12; thang ++) {
            //xLabels.push("T" + thang);
            filterThang = this.pageData.filter(item=>
                    item.thangBaoCao == thang && 
                    (this.state.selectedDVTH == 0 || (this.state.selectedDVTH > 0 && item.phongGD == this.state.donViTrucThuoc[this.state.selectedDVTH])) && 
                    (this.state.selectedDVTH2 == 0 || (this.state.selectedDVTH2 > 0 && item.tenTruong == this.state.donViTrucThuoc2[this.state.selectedDVTH2]))
                );
            soHocSinh.push(filterThang.reduce((a,b)=> a + parseInt(b.soHocSinh), 0.1));
            soGiaoVien.push(filterThang.reduce((a,b)=> a + parseInt(b.soGiaoVien), 0.1));
            soPhongHoc.push(filterThang.reduce((a,b)=> a + parseInt(b.soPhongHoc), 0.1));
        }

        chartData2 = [];
        for (let thang = 0; thang < soHocSinh.length; thang ++) {
            chartData2.push(soHocSinh[thang] / soGiaoVien[thang]);
        }
        hocSinhNam = this.pageData.reduce((a,b)=> a + parseInt(b.soHocSinhNam), 0);
        hocSinhNu = this.pageData.reduce((a,b)=> a + parseInt(b.soHocSinhNu), 0);
        hocSinhDantoc = this.pageData.reduce((a,b)=> a + parseInt(b.soHocSinhDanToc), 0);
        totalHocsinh = this.pageData.reduce((a,b)=> a + parseInt(b.soHocSinh), 0);
        chartData = [];
        switch (this.state.selectedChiTieu) {
            case 0: chartData = soGiaoVien; break;
            case 1: chartData = soHocSinh; break;
            case 2: chartData = soPhongHoc; break;
        }
        console.log("============================BEGIN==============================");
        console.log(soHocSinh);
        console.log(soGiaoVien);
        console.log(soPhongHoc);
        this.setState({
            chartData: chartData,
            chartData2: chartData2,
            chartData3: [{
                key: 1,
                amount: hocSinhNam,
                svg: { fill: '#3333ff' },
            },
            {
                key: 2,
                amount: hocSinhNu,
                svg: { fill: '#ea26c4' }
            },],
            chartData4: [{
                key: 1,
                amount: hocSinhDantoc,
                svg: { fill: '#21b1a1' },
            },
            {
                key: 2,
                amount: totalHocsinh - hocSinhDantoc,
                svg: { fill: '#0b3d82' }
            },],
        });
        console.log("============================END==============================");
    }

    _closeModal() {
        this.setState({isChartSettingVisible: false,})
    }

    _openModal() {
        this.setState({isChartSettingVisible: true,})
    }
    _closeFilterModal() {
        this.setState({isOptionSettingVisible: false,})
    }

    _openFilterModal(item) {
        fieldName = item.fieldName;
        this.currentFilter = fieldName;
        
        donviTH = [];
        if (item.fieldName != "$CHI_TIEU") {
            for (let i = 0; i < this.pageData.length; i++) {
                if (!donviTH.find(item=>item.name == this.pageData[i][fieldName])) {
                    donviTH.push({name: this.pageData[i][fieldName], checked: false});
                }
            }
        }
        else {
            data = REPORT_CONFIG[0].cacChiTieu;
            for (let i = 0; i < data.length; i++) {
                donviTH.push({name: data[i].displayedName, checked: false});
            }
        }
        
        this.setState({
            isOptionSettingVisible: true,
            filterOptions: donviTH,
            filterOptionTitle: item.displayedName,
        })
    }
    
    renderchartSettingItem = ({item}) => {
        //alert(JSON.stringify(item))
        return (
            <TouchableOpacity onPress= {()=> this._openFilterModal(item)}>
                <View style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    padding: 10, marginVertical: scale(5), borderColor: '#d8d8d8', borderWidth: 1,
                    height: verticalScale(70), width: "100%"}}>
                    <Text style={{fontSize: scale(26)}}>
                        {item.displayedName}
                    </Text>
                    <Icon name = "ios-arrow-down" style={{fontSize: scale(24), color: "#bbbbbb"}}></Icon>
                </View>
            </TouchableOpacity>
        )
    }

    onPressCheck(item) {
        item.checked = !item.checked;
        this.setState(state => {
            const list = state.filterOptions;
            return {list, value: '', };
        });
    }
    _saveSelection() {
        //alert(this.currentFilter);
        filter = this.filterData.find(item => item.fieldName == this.currentFilter);
        if (filter ) {
            Object.assign(
                filter, 
                { selection: JSON.parse(JSON.stringify(this.state.filterOptions.map(item=>item.checked))) });
            //alert(JSON.stringify(filter.selection));
        }
        
    }

    renderOptionsItem = ({item}) => {
        //alert(JSON.stringify(item))
        return (
            <TouchableOpacity onPress={() => this.onPressCheck(item)}
          style={{
            height: verticalScale(80),
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "#dfdfdf",
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {item.checked ? (

                <Image
                  source={IMG_CHECK}
                  style={{ width: deviceWidth / 20, height: deviceWidth / 20 }}
                />
              ) : (
                  <Image
                    source={IMG_UNCHECK}
                    style={{ width: deviceWidth / 20, height: deviceWidth / 20 }}
                  />

                )}
            </View>
            <View style={{ flex: 9, height: "100%", justifyContent: "center" }}>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )
    }

    renderSelectFilterModal() {
        return (
            <Modal
              transparent={true}
              visible={this.state.isOptionSettingVisible}
              animationType="fade">
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: this.state.isOptionSettingVisible
                    ? "rgba(0,0,0,0.5)"
                    : "transparent"
                }}>
                  <View
                      style={{
                      width: deviceWidth-scale(40),
                      height: verticalScale(680),
                      backgroundColor: "white"
                      }}>
                      <View style={{ margin: scale(20), flex: 1 }}>
                      <View
                            style={{
                            marginTop: 5,
                            borderColor: "#d8d8d8",
                            borderBottomWidth: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            height: verticalScale(70),
                            }}>
                            <Text style={{fontSize: scale(32), fontFamily: "Roboto-Medium", color: "#333333" }}>{this.state.filterOptionTitle.toUpperCase()}</Text>
                            <View
                            style={{
                                position: "absolute",
                                right: 0,
                                justifyContent: "center",
                                alignItems: "center", 
                            }}
                            >
                                <TouchableOpacity onPress={() => {this._closeFilterModal();}}>
                                    <Image
                                    source={require("../../../../assets/images/l2-khan-cap/l2-chi-tiet/image_close.png")}
                                    style={{ width: scale(35), height: scale(35) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                          <FlatList style={{width: '100%', marginTop: 10, maxHeight: scale(80*5)}}
                              data={this.state.filterOptions}
                              keyExtractor={(item, index) => item.name}
                              renderItem={this.renderOptionsItem}
                              numColumns={1}/>
                          <View
                            style={{ justifyContent: "center", alignItems: "center", borderColor: '#d8d8d8', borderTopWidth: 1}}>
                            <TouchableOpacity onPress={() => { this._closeFilterModal(); this._saveSelection()}}
                                style={{
                                    width: deviceWidth - 40,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#3d5e8f",
                                    height: 40,
                                    marginTop: scale(20)
                                }}
                                >
                                <Text style={{ color: "white", fontSize: 20 }}>CHỌN</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                      
                  </View>
              </View>
            </Modal>
        );
    }

    renderChartSettingModal() {
        return (
          <Modal
            transparent={true}
            visible={this.state.isChartSettingVisible}
            animationType="fade">
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.state.isChartSettingVisible
                  ? "rgba(0,0,0,0.5)"
                  : "transparent"
              }}>
                <View
                    style={{
                    width: deviceWidth-scale(40),
                    height: verticalScale(680),
                    backgroundColor: "white"
                    }}>
                    <View style={{ margin: scale(20), flex: 1 }}>
                        <View
                            style={{
                            marginTop: 5,
                            borderColor: "#d8d8d8",
                            borderBottomWidth: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            height: verticalScale(70),
                            }}>
                            <Text style={{fontSize: scale(32), fontFamily: "Roboto-Medium", color: "#333333" }}> LỰA CHỌN DỮ LIỆU HIỂN THỊ</Text>
                            <View
                            style={{
                                position: "absolute",
                                right: 0,
                                justifyContent: "center",
                                alignItems: "center", 
                            }}
                            >
                                <TouchableOpacity onPress={() => this._closeModal()}>
                                    <Image
                                    source={require("../../../../assets/images/l2-khan-cap/l2-chi-tiet/image_close.png")}
                                    style={{ width: scale(35), height: scale(35) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList style={{width: '100%', marginTop: 10,}}
                            data={this.state.chartSettings}
                            keyExtractor={(item, index) => item.name}
                            renderItem={this.renderchartSettingItem}
                            numColumns={1}/>
                        
                        <View
                            style={{ justifyContent: "center", alignItems: "center", borderColor: '#d8d8d8', borderTopWidth: 1}}>
                            <TouchableOpacity onPress={() => { this._closeModal(); this.refreshChartData()}}
                                style={{
                                    width: deviceWidth - 40,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#3d5e8f",
                                    height: 40,
                                    marginTop: scale(20)
                                }}
                                >
                                <Text style={{ color: "white", fontSize: 20 }}>ĐỒNG Ý</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
          </Modal>
        );
    }

    renderBarChart(title, data, fill) {
        return (
            <View style={{padding: 10, backgroundColor: 'white' }}>
                <Text style={{ fontSize: chartTitleSize, color: '#333333', marginTop: 20 }} numberOfLines={2}>
                    {title}
                </Text>
                
                <View style={{marginTop: 10, height: 230, flexDirection: 'row'}}>
                    <YAxis
						data={data}
						style={{ flex: 0.05, marginBottom: 20 }}
						contentInset={verticalContentInset}
						svg={axesSvg}
						numberOfTicks={5}
					/>
                    <View style={{ flex: 0.95, marginLeft: 10 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={data}
                            gridMin={0}
                            spacing={0.5}
                            contentInset = {{left: 3, right: 5}}
							spacingInner={0.5}
                            svg={{ fill: fill }}
                        />
                        <XAxis
                            style={{ marginTop: 10 }}
                            data={ this.state.xAxis }
                            scale={scaled3.scaleBand}
                            spacing={0.5}
                            formatLabel={(_, index) => this.state.xAxis [ index ]}
                            labelStyle={ { color: 'black' } }
                        />
                    </View>
                    
                </View>
            </View>
        )
    }

    renderPieChart() {
        return (
            <View style={{padding: 10, backgroundColor: 'white', borderTopColor: '#d8d8d8', borderTopWidth: 1 }}>
                <Text style={{ fontSize: chartTitleSize, color: '#333333', marginTop: 10 }} numberOfLines={2}>
                    THỐNG KÊ HỌC SINH
                </Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{ fontSize: scale(20), color: '#333333', marginTop: 5 }}>
                            Tỉ lệ nam nữ
                        </Text>
                        <PieChart
                            style={{ height: 100, width: 100 }}
                            valueAccessor={({ item }) => item.amount}
                            data={this.state.chartData3}
                            spacing={0}
                            outerRadius={'95%'}>
                            {/* <Labels/> */}
                        </PieChart>
                        <View style={{alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 5, height: 5, backgroundColor: this.state.chartData3[0].svg.fill}}></View>
                                <Text style={{fontSize: scale(18)}}>&nbsp;{this.state.chartData3[0].amount} học sinh nam</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 5, height: 5, backgroundColor: this.state.chartData3[1].svg.fill}}></View>
                                <Text style={{fontSize: scale(18)}}>&nbsp;{this.state.chartData3[1].amount} học sinh nữ</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: scale(20), color: '#333333', marginTop: 5 }}>
                            Tỉ lệ HS dân tộc thiểu số
                        </Text>
                        <PieChart
                            style={{ height: 100, width: 100 }}
                            valueAccessor={({ item }) => item.amount}
                            data={this.state.chartData4}
                            spacing={0}
                            outerRadius={'95%'}>
                            {/* <Labels/> */}
                        </PieChart>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 5, height: 5, backgroundColor: this.state.chartData4[0].svg.fill}}></View>
                                <Text style={{fontSize: scale(18)}}>&nbsp;{this.state.chartData4[0].amount} học sinh dân tộc thiểu số</Text>
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 5, height: 5, backgroundColor: this.state.chartData4[1].svg.fill}}></View>
                                <Text style={{fontSize: scale(18)}}>&nbsp;{this.state.chartData4chartData4[1].amount} học sinh nữ</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    

    render() {
        return (
            <Container style={styles.container}>
                {this.renderChartSettingModal()}
                {this.renderSelectFilterModal()}
                <CustomHeader title="Nội dung chi tiết" source={require("../../../../assets/images/l2-bao-cao/bao-cao-tong-hop/filter-chart.png")} goto={()=> this._openModal()}></CustomHeader>
                {!this.state.isLoading? (
                <Content>
                    <View style={{ backgroundColor: "white", padding: 10 }}>
                        <View style={[ styles.containerRow, { alignItems: "center" }]}>
                            <View style={[styles.iconItem, { backgroundColor: 'white' }]}>
                                <Image
                                    source={{uri: this.chiTieuData.iconChiTieu}}
                                    style={{ width: 40, height: 40, resizeMode: "contain" }}/>
                            </View>
                            <View style={{ flex: 9 }}>
                                <Text style={{ marginLeft: 8, fontSize: titleSize, color: '#333333' }} numberOfLines={2}>
                                    {this.chiTieuData.tenChiTieuLv}
                                </Text>
                                <Text style={{ marginLeft: 8, color: "#888888", fontSize: content }}numberOfLines={1}>
                                    Báo cáo tới thời điểm hiện tại:&nbsp;{this.chiTieuData.giaTriChiTieu} &nbsp;{this.chiTieuData.tenDonViTinh}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <WebView style={{width: '100%', height: 250}}
                        scalesPageToFit = {Platform.OS == "android"} 
                        originWhitelist={['*']}
                        source={{uri: 'https://222.254.35.115'}}
                        allowUniversalAccessFromFileURLs = {true}
                        />
                    {this.renderBarChart('TỔNG SỐ GIÁO VIÊN', this.state.chartData, 'rgba(0, 65, 244,0.8)')}
                    {this.renderPieChart()}
                    {this.renderBarChart('TỈ LỆ HỌC SINH TRÊN GIÁO VIÊN', this.state.chartData2, 'rgba(251, 134, 22,0.8)')}
                    <View style={{marginBottom: 10}}></View>
                </Content>
                ): (<AppIndicator></AppIndicator>)
                }
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
    };
}
const mapStateToProps = state => ({
    name: state.user.name,
    list: state.list.list
});

export default connect(mapStateToProps, bindAction)(BaoCaoThongKeChiTietScreen);