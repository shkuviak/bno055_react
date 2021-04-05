import { Line } from 'react-chartjs-2';
import "chartjs-plugin-streaming";
import { useEffect, useState, useRef } from 'react';

export default function RawAxesChart(props) {
    const refChart = useRef(null);

    const options = {
        responsive: true,
        title: {
            display: true,
            text: props.title
        },
        tooltips: {
            enabled: false
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                // display: false,
                // scaleLabel: {
                //     display: false,
                //     labelString: 'Date'
                // },
                realtime: {
                    // onRefresh: function(chart) {    
                    //   chart.data.datasets[0].data.push({    
                    //       x: Date.now(),    
                    //       y: Math.random()
                    //     });      
                    // },    
                    delay: 0,
                    duration: 20000,
                    refresh: 1000
                  }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        },
        animation: false,
        plugins: {
            streaming: {
                frameRate: 20               // chart is drawn 5 times every second
            }
        }
    }

    const data = {
        datasets: [{
            label: 'Angle (degres)',
            backgroundColor: '#FFA9A9',
            borderColor: '#FFA9A9',
            data: [],
            fill: false,
            lineTension: 0
        }]
    }
    
    useEffect(() => {
        if (refChart.current.chartInstance != undefined && props.data != undefined) {
            refChart.current.chartInstance.data.datasets[0].data.push({ x: Date.now(), y: props.data / 60});
            // refChart.current.chartInstance.data.datasets[0].data = [{ x: Date.now(), y: props.data.data}];
            // refChart.current.chartInstance.update();
        }
    }, [props.data]);

    return(
        <Line 
            ref={refChart}
            data={data}
            options={options}
            height={100}
        />
    )
}