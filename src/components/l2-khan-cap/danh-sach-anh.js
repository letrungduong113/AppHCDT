import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
const win = Dimensions.get('window');
export default class DanhSachAnhScreen extends React.Component {
    // static navigationOptions = {
    //     header: null,
    // };
    constructor(props) {
        super(props)
        this.listLink = this.props.navigation.getParam('listLink');
        this.state = {
            index: this.props.navigation.getParam('index'),
        }
    }
    
    onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        this.setState({index: pageNum})
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <View style={{ width: '100%', height: verticalScale(140), flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ flex: 1.5,  }}>
                        <View style={{height: '100%', width:'100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/l2-khan-cap/btnback.png')} style={{ width: scale(41), height: verticalScale(37) }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 6.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: scale(30) }}>{this.state.index + 1}/{this.listLink.length}</Text>
                    </View>
                    <View style={{ flex: 1.5 }}></View>
                </View>
                <FlatList
                    data={this.listLink}
                    initialScrollIndex={this.state.index}
                    onMomentumScrollEnd={this.onScrollEnd}
                    horizontal={true}
                    pagingEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={item.image}
                                style={{ width: win.width, height: verticalScale(500) }} />
                        </View>
                    )}
                />
            </View>
        )
    }
}