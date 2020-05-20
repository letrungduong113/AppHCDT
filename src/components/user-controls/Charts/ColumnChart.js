import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class ColumnChart extends Component {
    constructor(props){
        super(props);
        this.state= {
            keys:['Năm 2016','Năm 2017','Năm 2018'],
            colors:['#4174c6','#ef7e2e','#a6a6a6'],
            data:[
                [30,30,20,10],
                [10,40,50,20],
                [10,10,10,40],
            ],
            columnName:[
                'Số Quý 1',
                'Số Quý 2',
                'Số Quý 3',
                'Số Quý 4'
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
                name: this.state.keys[0],
                data: this.state.data[0],
                color: this.state.colors[0],
            }, {
                name: this.state.keys[1],
                data: this.state.data[1],
                color: this.state.colors[1],
            }, {
                name: this.state.keys[2],
                data: this.state.data[2],
                color: this.state.colors[2],
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

