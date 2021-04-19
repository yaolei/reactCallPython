import React from 'react'
import ReactECharts from "echarts-for-react";
import './index.css'
class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    initChartData() {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                // feature: {
                //     dataView: {show: true, readOnly: false},
                //     magicType: {show: true, type: ['line', 'bar']},
                //     restore: {show: true},
                //     saveAsImage: {show: true}
                // }
            },
            legend: {
                data: ['New user', 'Update user', 'Average']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'User Number',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} k'
                    }
                },
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} K'
                    }
                }
            ],
            series: [
                {
                    name: 'New user',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: 'Update user',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: 'Average',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        }
        return option;
    }

    render() {
        return(
            <>  
                <div className="epricer_label">Epricer Weekly Report</div>
                <ReactECharts 
                    option ={this.initChartData()}
                />
            </>
        )
    }
}

export default Histogram;