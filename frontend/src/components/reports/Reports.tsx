import React, { ChangeEvent, useEffect, useState } from 'react'
import Chart from '../chart/Chart'
import classes from './styles.module.scss'
import DatePicker from '../common/datePicker/DatePicker'
import { ReactComponent as FilterIcon } from '../../images/filterIcon.svg'
import CheckBox from '../common/checkBox/CheckBox'
import { useLazyGetAllClicksQuery } from '../../app/services/clickApi'
import { useLazyGetAllConverionsQuery } from '../../app/services/conversionApi'
import { useLazyGetAllPayoutsQuery } from '../../app/services/payoutsApi'
import { color } from 'echarts'
import { useGetAllConnectedOffersQuery } from '../../app/services/offer/offerApi'
import { FullOfferData } from '../../types/api/offerTypes'


const chartDatas = {
    all: {
        caption: "Все",
        color: "white"
    },
    clicks: {
        caption: "Переходы",
        color: "red"
    },
    conversions: {
        caption: "Целевые действия",
        color: "green"
    },
    payouts: {
        caption: "Выплаты",
        color: "yellow",
    },
}

interface CheckedBoxes {
    all: boolean;
    clicks: boolean;
    conversions: boolean;
    payouts: boolean;
    [key: string]: boolean;
}

interface ChartDataItem {
    day: Date;
    count: number;
}

export interface ChartData {
    name: string;
    data: (number | string)[];
    color: string;
}

interface FilterData {
    offerPk?: number;
    from?: string;
    to?: string;
    partnerName?: string;
}


const Reports: React.FC = () => {
    const currDate = new Date()
    const basePrevDate = new Date(currDate)
    basePrevDate.setDate(currDate.getDate() - 7)
    const [dateFrom, setDateFrom] = useState<Date>(basePrevDate)
    const [dateTo, setDateTo] = useState<Date>(currDate)
    const [chartData, setChartData] = useState<ChartData[]>()
    const [checkedBoxes, setCheckedBoxes] = useState<CheckedBoxes>({
        all: false,
        clicks: false,
        conversions: false,
        payouts: false
    });

    const [getClicks, { error: clicksError, isLoading: clicksIsLoading }] = useLazyGetAllClicksQuery();
    const [getConversions, { error: conversionsError, isLoading: conversionsIsLoading }] = useLazyGetAllConverionsQuery();
    const [getPayouts, { error: payoutsError, isLoading: payoutsIsLoading }] = useLazyGetAllPayoutsQuery();
    const { data: allConnectedOffers } = useGetAllConnectedOffersQuery();
    const [connectedOffers, setConnectedOffers] = useState<FullOfferData[]>([])
    const [selectedOffers, setSelectedOffers] = useState<number[]>([])

    // const [filter, setFilter] = useState<FilterData>({})


    useEffect(() => {
        if (allConnectedOffers) {
            setConnectedOffers(allConnectedOffers)
        }
    }, [allConnectedOffers])

    const handleChangeDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value)
        setDateFrom(date)
    }

    const changeDateFrom = (date: Date) => {
        setDateFrom(date)
    }

    const changeDateTo = (date: Date) => {
        setDateTo(date)
    }

    const toggleAll = () => {
        const allChecked = checkedBoxes.all;
        const newCheckedBoxes = { ...checkedBoxes };
        Object.keys(checkedBoxes).forEach((key) => {
            newCheckedBoxes[key] = !allChecked;
        });
        setCheckedBoxes(newCheckedBoxes);
    };


    const toggleCheckBox = (name: string) => {
        if (name === "all") {
            toggleAll()
            return
        }

        const newCheckedBoxes = {
            ...checkedBoxes,
            [name]: !checkedBoxes[name],
        };

        const allChecked = Object.keys(newCheckedBoxes).filter(key => key !== 'all').every(key => newCheckedBoxes[key] === true);

        newCheckedBoxes.all = allChecked;

        setCheckedBoxes(newCheckedBoxes);
    };


    const fetchData = async () => {
        const promises = [];
        const dateFilter = {
            from: dateFrom.toISOString(),
            to: dateTo.toISOString()
        }

        if (checkedBoxes.clicks) {
            promises.push(getClicks(dateFilter).unwrap());
        }

        if (checkedBoxes.conversions) {
            promises.push(getConversions(dateFilter).unwrap());
        }

        if (checkedBoxes.payouts) {
            promises.push(getPayouts(dateFilter).unwrap());
        }

        try {
            const results = await Promise.all(promises);
            const [clicksData, conversionsData, payoutsData] = results;

            const seriesData: ChartData[] = [];

            const pushNew = (statData: ChartDataItem[], name_item: string) => {
                if (statData) {
                    const name = name_item as keyof typeof chartDatas
                    if (name in chartDatas) {
                        seriesData.push({
                            name: chartDatas[name].caption,
                            data: statData.map(item => item.count ? item.count : 0),
                            color: chartDatas[name].color
                        })
                    }
                }
            }

            pushNew(clicksData, "clicks")
            pushNew(conversionsData, "conversions")
            pushNew(payoutsData, "payouts")

            setChartData(seriesData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };


    return (
        <>
            <h1 className={classes.content_header}>
                Отчеты
            </h1>
            {/* <div className={classes.offers_types_container}>
                {allConnectedOffers.map((offer) => (
                    <button
                        key={offer.pk}
                        className={`${classes.offer_type} ${activeCategory === offer.pk ? classes.active : ''}`}
                        onClick={() => handleCategoryClick(offer.pk)}
                    >
                        {offer.name}
                    </button>
                ))}
            </div> */}
            <div className={classes.controls_container}>
                <div className={classes.dates_controls_container}>
                    <div className={classes.dates_container}>
                        <DatePicker date={dateFrom} format='dd.MM.yyyy' name='dateFrom' startDate={dateFrom} endDate={dateTo} isStart={true} onChange={changeDateFrom} dateRange />
                        <div className={classes.gap_elem} />
                        <DatePicker date={dateTo} format='dd.MM.yyyy' name='dateTo' startDate={dateFrom} endDate={dateTo} isStart={false} onChange={changeDateTo} dateRange />
                    </div>
                    <button onClick={fetchData}>Применить</button>
                </div>
                <button className={classes.filter_button}>
                    <FilterIcon className={classes.icon} />
                    Фильтр
                </button>
            </div>
            <div className={classes.chart_container}>
                <div className={classes.chart_header}>
                    <div className={classes.content_container}>
                        {
                            Object.entries(chartDatas).map(([name, data], index) => (
                                <CheckBox
                                    key={index}
                                    isChart={true}
                                    name={name}
                                    caption={<span>{data.caption}</span>}
                                    checked={checkedBoxes[name]}
                                    toggleCheckBox={toggleCheckBox}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className={classes.chart}>
                    <Chart dateFrom={dateFrom} dateTo={dateTo} data={chartData} />
                </div>
            </div>
        </>
    )
}


export default Reports