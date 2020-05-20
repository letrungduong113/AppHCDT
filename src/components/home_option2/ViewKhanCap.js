import React, { Component } from "react";
import {
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions,
    View
} from "react-native";
import Text from "../custom-view/text";
import {
    scale,
    verticalScale,
    moderateScale
} from "../../components/user-controls/utilities/Scale";
import moment from 'moment';
import KhanCapAPI from "../../services/api-service/khan-cap-api";
import { connect } from "react-redux";

class ViewKhanCap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: {},
            show: this.props.show
        }
    }
    componentWillMount() {
        KhanCapAPI.getLocations().then(res => {
            if (res != null) {
                // alert(JSON.stringify(res[res.length - 1]))
                this.setState({
                    markers: res[res.length - 1]
                })
            }
        })
    }
    render() {
        if (!this.state.show || this.props.markers == null)
            return (null)
        else {
            let markers = this.props.markers[this.props.markers.length-1]
            return (
                <View style={{ width: '100%', height: this.props.heightView, backgroundColor: "#e24444", position: "absolute", bottom: verticalScale(90) }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("KhanCapChiTiet", { id: markers.newsId })}>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <View style={{ flex: 9 }}>
                                <Text line={2} style={{ color: 'white' }}>{markers.title}</Text>
                                <Text style={{ color: 'white' }}>{moment(markers.createdTime).format('L') + " " + moment(markers.createdTime).format('LT')}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ show: false })}>
                                <Text style={{ color: 'white', marginLeft: scale(30), fontSize: scale(30) }}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    markers: state.getMarkers.markers
});

export default connect(
    mapStateToProps,
    null
)(ViewKhanCap);