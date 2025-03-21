import * as echarts from "echarts";
import {useEffect, useRef} from "react";

const BarCharts = ({title, height = '400px'}) => {
    const chartRef = useRef(null)
    useEffect(() => {
        const chartDom = chartRef.current
        const myChart = echarts.init(chartDom)
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [30, 10, 70],
                    type: 'bar'
                },
                {
                    data: [10, 10, 70],
                    type: 'line'
                }
            ]
        }
        option && myChart.setOption(option)
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    }, [title]);
    return (
        <div ref={chartRef} style={{width: '500px', height}}></div>
    )
}
export default BarCharts;