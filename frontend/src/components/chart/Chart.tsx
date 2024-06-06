import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponentOption, ToolboxComponentOption, TooltipComponentOption, GridComponentOption, LegendComponentOption, LineSeriesOption } from 'echarts';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { ChartData } from '../reports/Reports';

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
    dateFrom: Date,
    dateTo: Date,
    data?: ChartData[],
}

const Chart: React.FC<ChartProps> = ({ dateFrom, dateTo, data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [seriesData, setSeriesData] = useState<any[]>(data ? data : []);

    useEffect(() => {
        if (data) {
            const newData: ChartData[] = []
            data.map((elem, index) => {
                newData.push({ ...commonSeriesOptions, ...elem })
            })
            setSeriesData(newData)
        }
    }, [data])


    const generateDateList = (dateFrom: Date, dateTo: Date) => {
        const start = dateFrom
        const end = dateTo
        const dates = [];

        let currentDate = new Date(start);
        while (currentDate <= end) {
            const day = currentDate.getDate().toString().padStart(2, '0')
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
            const year = currentDate.getFullYear().toString()
            dates.push(`${day}-${month}-${year}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }

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
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default Chart;
