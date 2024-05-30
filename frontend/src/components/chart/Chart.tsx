import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponentOption, ToolboxComponentOption, TooltipComponentOption, GridComponentOption, LegendComponentOption, LineSeriesOption } from 'echarts';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

// Register the necessary components
echarts.use(
    [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, SVGRenderer, UniversalTransition]
);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
>;

const commonSeriesOptions = {
    type: 'line',
    symbol: 'circle',
    symbolSize: 10,
};


interface ChartProps {
    dateFrom: string,
    dateTo: string,
}

const Chart: React.FC<ChartProps> = ({ dateFrom, dateTo }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    console.log(dateFrom, dateTo)


    const generateDateList = (dateFrom: string, dateTo: string) => {
        const start = new Date(dateFrom.split('.').reverse().join('-'));
        const end = new Date(dateTo.split('.').reverse().join('-'));
        const dates = [];

        let currentDate = start;
        while (currentDate <= end) {
            const day = currentDate.getDay().toString().padStart(2, '0')
            const month = currentDate.getMonth().toString().padStart(2, '0')
            const year = currentDate.getFullYear().toString()
            dates.push(`${day}-${month}-${year}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log(dates)

        return dates
    };


    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current, null, {
                renderer: 'svg'
            });

            const updateChart = () => {
                const option: EChartsOption = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: generateDateList(dateFrom, dateTo)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: seriesData
                };
                myChart.setOption(option);
            };

            updateChart();

            window.addEventListener('resize', () => {
                myChart.resize();
            });

            return () => {
                window.removeEventListener('resize', () => {
                    myChart.resize();
                });
                myChart.dispose();
            };
        }
    }, [seriesData]);

    const addSeries = () => {
        const newSeries = {
            name: `New Series ${seriesData.length + 1}`,
            type: 'line',
            stack: 'Total',
            symbol: 'circle',
            symbolSize: 10,
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))
        };
        setSeriesData([...seriesData, newSeries]);
    };

    const removeSeries = (seriesName: string) => {
        setSeriesData(seriesData.filter(series => series.name !== seriesName));
    };

    return (
        <div>
            <div>
                <button onClick={addSeries}>Add Series</button>
                {seriesData.map(series => (
                    <button key={series.name} onClick={() => removeSeries(series.name)}>
                        Remove {series.name}
                    </button>
                ))}
            </div>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default Chart;
