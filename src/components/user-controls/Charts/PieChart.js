import ChartView from 'react-native-highcharts';
import React, { Component } from "react";
export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            title:this.props.title,
        }
    }
    componentWillReceiveProps(props){
        if(props.data){
            this.setState({data:props.data})
        }
    }

    render() {
        var Highcharts = 'container';
        var conf = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: `Tổng số <br/><b>${isNaN(this.state.data.reduce((a,b)=>Number(a)+Number(b.y),0))?0:this.state.data.reduce((a,b)=>Number(a)+Number(b.y),0)}<b/>`,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: -40
            },
            tooltip: {
                pointFormat: ' {point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors:['#d53939','#eba82d','#3871ca','#34b751','#ed3eae','#7550d5'],
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    innerSize: '70%',
                    data: this.state.data,
                    point:{
                        events:{
                            click: function (event) {
                                // laer(this);
                                //alert(this);
                                // alert(this.x)
                                postMessage(this.x)
                            }
                        }
                    } 
                }], credits: {
                enabled: false,
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
            <ChartView style={[this.props.style,{ height: 300 }]} 
                onMessage={event => {
                try {
                  data = JSON.parse(event.nativeEvent.data);
                    this.props.click(data);
        
                  }
                  catch {}
              }}
               config={conf} options={options} originWhitelist={['']}></ChartView>
        );
    }
}

