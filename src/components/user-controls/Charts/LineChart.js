import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class LineCharChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors:this.props.colors,
            data:this.props.data,
            title:this.props.title
        }
    }
    render() {
        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'spline'
            },
            title: {
                text: this.state.title
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Đơn vị'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} '
            },
        
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
        
            // colors: ['#df7220', '#39F'],
            colors: this.state.colors,
        
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.

            // [{
            //     name: "Lượng đề cập",
            //     data: [
            //         [Date.UTC(2018, 10, 9), 5],
            //         [Date.UTC(2018, 11,  6), 10],
            //         [Date.UTC(2018, 11, 20), 20],
            //         [Date.UTC(2018, 11, 25), 15],
            //         [Date.UTC(2019, 0,  4), 30],
            //         [Date.UTC(2019, 0, 17), 32],
            //     ]
            // }, {
            //     name: "Lương tương tác",
            //     data: [
            //         [Date.UTC(2018, 10, 9), 10],
            //         [Date.UTC(2018, 11,  6), 6],
            //         [Date.UTC(2018, 11, 20), 14],
            //         [Date.UTC(2018, 11, 25), 20],
            //         [Date.UTC(2019, 0,  4), 25],
            //         [Date.UTC(2019, 0, 17), 28],
            //     ]
            // }]
            series: this.state.data, credits: {
                enabled: false
            }, exporting: { enabled: false }
        };

        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.',
                months: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
                weekdays: ['T2', 'T3', 'T4', 'T6', 'T7', 'T8', 'T9']
            }
        };

        return (
            <ChartView style={[this.props.style,{ height: 300 }]} config={conf} options={options} originWhitelist={['']}></ChartView>
        );
    }
}

