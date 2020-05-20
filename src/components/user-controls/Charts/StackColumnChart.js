import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class StackColumnChart extends Component {
    constructor(props){
        super(props);
        this.state= {
            keys:this.props.keys,
            colors:this.props.colors,
            data:this.props.data
        }
    }
    render() {
        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'column'
            },

            title: {
                text: ''
            },

            xAxis: {
                categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',],
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                },
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Tổng cộng: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: this.state.keys[3],
                data: this.state.data[3],
                stack: 'column',
                color: this.state.colors[3]
            }, {
                name: this.state.keys[2],
                data: this.state.data[2],
                stack: 'column',
                color: this.state.colors[2],
            }, {
                name: this.state.keys[1],
                data: this.state.data[1],
                stack: 'column',
                color: this.state.colors[1],
            }, {
                name: this.state.keys[0],
                data: this.state.data[0],
                stack: 'column',
                color: this.state.colors[0],
            }], credits: {
                enabled: false
            }, exporting: { enabled: false }
        };

        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        };

        return (
            <ChartView style={{ height: 300 }} config={conf} options={options} originWhitelist={['']}></ChartView>
        );
    }
}

