import React, { Component } from "react";
import { View, Text, Picker, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { Icon } from 'native-base';

const win = Dimensions.get('window');
export default class TaskAssignment extends Component {
    static navigationOptions = {
        headerTitle: (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: 30, }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>CHỈ ĐẠO ĐIỀU HÀNH</Text>
            </View>
        ),
        headerLeft: (
            <TouchableOpacity style={{ marginLeft: 20, }}>
                <Icon name="arrow-back" style={{ color: "white" }} />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20, }}>
                <Icon name="ios-funnel" style={{ color: "white" }} />
            </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: '#bf312c',
        },
    };
    constructor(props) {
        super(props)
        this.state = {
            data:
                [
                    { number: "45", name: "Lấy ý kiến dự thảo Luật đơn vị hành chính kinh tế...", color: "#fca76c", state: "Mới cập nhật" },
                    { icon: "43", name: "Lấy ý kiến dự thảo Luật đơn vị hành chính kinh tế...", color: "#195c9f", state: "Đang xử lý" },
                    { icon: "41", name: "Lấy ý kiến dự thảo Luật đơn vị hành chính kinh tế...", color: "#f14845", state: "Quá hạn"},
                    { icon: "40", name: "Lấy ý kiến dự thảo Luật đơn vị hành chính kinh tế...", color: "#195c9f", state: "Đang xử lý"},
                    { icon: "38", name: "Lấy ý kiến dự thảo Luật đơn vị hành chính kinh tế...", color: "#9b9b9b", state: "Đã xử lý" },
                ],
        }
    }
    renderHeaderBtn() {
        return (
            <View style={{ margin: 10, width: "100%", flexDirection: "row" }}>
                <TouchableOpacity style={[styles.btnHeader, { backgroundColor: "#3d5f90", flexDirection: "row" }]}>
                    <Text style={styles.text}>NHẬN NHIỆM VỤ</Text>
                    <View style={{ borderRadius: 10, width: 20, height: 20, backgroundColor: "white", marginLeft: 5,justifyContent: "center", alignItems: "center", }}>
                    <Text style={{fontWeight: "bold", fontSize:16}}>9</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnHeader}>
                    <Text style={[styles.text, { color: "black" }]}>GIAO NHIỆM VỤ</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderListTask(){
        return(
            <View style={{marginTop}}></View>
        )
    }
    render() {
        return (
            <View>
                {this.renderHeaderBtn()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnHeader: {
        width: win.width / 2 - 10,
        height: win.height / 16,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 0.5,
    },
    text: {
        color: "white",
        fontSize: 18
    }
})