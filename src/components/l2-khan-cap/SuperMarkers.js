import React, { Component } from 'react';
import { View, TouchableOpacity, Image, FlatList, Dimensions, StatusBar, ImageBackground } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { scale, verticalScale, moderateScale } from "../user-controls/utilities/Scale";
import Text from '../../components/custom-view/text';
import { updateMarkers } from "../../redux/actions/getMarkers";
import { connect } from "react-redux";
var IconLocation = scale(40);

class SuperMarkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingMarkers: true,
            supermarkers: [
                // {
                //     "id": 716,
                //     "newsId": 2491,
                //     "latitude": 21.117054,
                //     "longitude": 105.95592,
                //     "title": "Bắc Ninh: Bắt giữ 2 đối tượng, thu giữ gần 1,3kg ma túy",
                //     "isHotFillter": 4,
                //     "createdTime": "2019-05-05T02:35:10.070+0000",
                //     "formatted_address": "Xóm Trúc, Xã Tam Sơn, Thị Xã Từ Sơn, Đình Bảng, Từ Sơn, Bắc Ninh, Việt Nam"
                // }
            ]
        };

        // Toggle the state every second
        setInterval(() => (
            this.setState(previousState => (
                { isShowingMarkers: !previousState.isShowingMarkers }
            ))
        ), 1000);
    }
    componentWillMount() {
        // alert(JSON.stringify(this.props.markers))
        // this.setState({
        //     supermarkers: this.props.navigation.getParam('markers')
        // })
    }
    getIconLocation(capdo) {
        switch (capdo - 1) {
            case 1:
                return require('../../../configUI/imageLocation/Location_Green.png');
            case 2:
                return require('../../../configUI/imageLocation/Location_Orange.png');
            case 3:
                return require('../../../configUI/imageLocation/Location_Red.png');
            default:
                return require('../../../configUI/imageLocation/Location_Red.png');
        }
    }
    getColorEclipse(capdo) {
        switch (capdo - 1) {
            case 1:
                return require('../../../configUI/imageLocation/ellipse_Green.png');
            case 2:
                return require('../../../configUI/imageLocation/ellipse_Orange.png');
            case 3:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
            default:
                return require('../../../configUI/imageLocation/ellipse_Red.png');
        }
    }
    render() {
        if (!this.state.isShowingMarkers) {
            return null;
        }
        let marker = this.props.markers[this.props.markers.length - 1]
        return (
            // this.props.markers.map(marker => (
            <Marker
                coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                }}
                title={marker.title}
                onPress={() => this.props.navigation.navigate('KhanCapChiTiet', { id: marker.newsId })}
            >
                <ImageBackground source={this.getColorEclipse(marker.isHotFillter)} style={{ height: IconLocation * 2, width: IconLocation * 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.getIconLocation(marker.isHotFillter)} style={{ height: IconLocation, width: IconLocation, }} />
                </ImageBackground>
            </Marker>
            // ))
        );
    }
}

const mapStateToProps = state => ({
    markers: state.getMarkers.markers
});

export default connect(
    mapStateToProps,
    { updateMarkers }
)(SuperMarkers);