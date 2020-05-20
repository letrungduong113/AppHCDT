import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class ColumnNoLabel extends Component {
    constructor(props){
        super(props);
        this.state= {
            title:this.props.title,
            data:this.props.data,
            text:this.props.text,
        }
    }
    componentWillReceiveProps(props){
        if(props.data){
            this.setState({data:props.data,text:props.text})
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
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.1f}</b>'
            },
            series: [{
                name: 'Population',
                data: [
                    [this.state.text[0],this.state.data[0]],
                    [this.state.text[1],this.state.data[1]],
                    [this.state.text[2],this.state.data[2]]
                ],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    align: 'center',
                    format: '{point.y:.1f}', // one decimal
                    // y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
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
            <ChartView style={{ height: 300 }} config={conf} options={options} originWhitelist={['']} oneToOne={true} ></ChartView>
        );
    }
}

