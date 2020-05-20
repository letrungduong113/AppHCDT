import React, { Component } from "react";
import { View, ActivityIndicator } from 'react-native';

export default class AppIndicator extends Component {
    render() {
        return (
            <View style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#d60303b3"></ActivityIndicator>
            </View>
        )
    }
}