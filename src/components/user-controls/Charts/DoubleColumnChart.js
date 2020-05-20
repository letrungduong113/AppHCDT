import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class DoubleColumnChart extends Component {
    constructor(props){
        super(props);
        this.state= {
            keys:['','','',''],
            colors:['#c1c1c1','#5694e1'],
            data:[
                [30,30,20,10,60,20],
                [40,20,20,35,70,50],
            ],
            columnName:[
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019'
            ]
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
                categories: this.state.columnName,
            },

            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },

            series: [{
                name: 'Năm cũ',
                data: this.state.data[0],
                color: this.state.colors[0],
            }, {
                name: 'Năm nay',
                data: this.state.data[1],
                color: this.state.colors[1],
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
            <ChartView style={{ height: 200 }} config={conf} options={options} originWhitelist={['']}></ChartView>
        );
    }
}

