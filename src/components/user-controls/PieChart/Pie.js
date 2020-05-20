import React, { Component } from 'react';
import { Platform, ART, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
const { Surface, Group, Path, Shape, Text } = ART;
import Wedge from './Wedge';

class Pie extends Component {
    getRadius() {
        return this.props.chart_wh / 2;
    }
    handleCover() {
        if (!this.props.doughnut) return;
        const radius = this.getRadius();
        const coverRadius = this.props.chart_wh * this.props.coverRadius;
        const coverPath = new Path()
            .moveTo(radius, radius - (coverRadius / 2))
            .arc(0, coverRadius, 25)
            .arc(0, -coverRadius, 25)
            .close();
        return <Shape d={coverPath} fill={this.props.coverFill} />;
    }
    getPercern(number) {
        if(number==0)
            return "";
        return number + "%";
    }
    getPosX(number, index) {
        var w = this.props.chart_wh;
        if (index == 0) {
            if (number <= 25) {
                return w/2+w/4*(number/25)
            } else if(number<=50){
                return w/4*3
            }else{
                return w/2
            }
        } else {
            if (number <= 25) {
                return w/2-w/4*(number/25)
            } else {
                return w/4
            }
        }
    }
    getPosY(number) {
        var w = this.props.chart_wh;
        if(w<250){
            if(number<=50){
                return w/4 +w/8
            }else{
                return w/2;
            }
        }
        if (number >= 50) {
            return w/4*3
        } else{
            return w/4-w/8
        }
      
    }
    render() {
        const radius = this.getRadius();
        const rotation = Platform.OS === 'ios' ? 0 : -90;
        return (
            <Surface style={this.props.style} width={this.props.chart_wh} height={this.props.chart_wh}>
                <Group rotation={rotation} originX={radius} originY={radius}>
                    {Object.keys(this.props.series).map((key) => {
                        if (this.props.angle[key] != this.props.angle[parseInt(key) + 1]) {
                            return (
                                <Wedge
                                    key={key}
                                    outerRadius={this.getRadius()}
                                    startAngle={this.props.angle[key]}
                                    endAngle={this.props.angle[parseInt(key) + 1]}
                                    fill={this.props.sliceColor[key]}
                                />
                            );
                        }
                    })}
                    {this.handleCover()}

                </Group>

                {Object.keys(this.props.series).map((key) => {
                    if (this.props.angle[key] != this.props.angle[parseInt(key) + 1]) {
                        return (
                            <Text
                                font={`20px "Helvetica Neue", "Helvetica", Arial`}
                                fill="#FFFFFF"
                                alignment="center"
                                x={this.getPosX(this.props.series[key], key)}
                                y={this.getPosY(this.props.series[key])}
                            >
                                {this.getPercern(this.props.series[key])}
                            </Text>
                        );
                    }
                })}
            </Surface>
        );
    }
}

Pie.propTypes = {
    angle: PropTypes.array.isRequired,
    chart_wh: PropTypes.number.isRequired,
    coverFill: PropTypes.string.isRequired,
    coverRadius: PropTypes.number.isRequired,
    doughnut: PropTypes.bool.isRequired,
    series: PropTypes.array.isRequired,
    sliceColor: PropTypes.array.isRequired,
    style: ViewPropTypes.style,
};

export default Pie;