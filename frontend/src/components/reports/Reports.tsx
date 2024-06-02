import React, { ChangeEvent, useState } from 'react'
import Chart from '../chart/Chart'
import classes from './styles.module.scss'
import DatePicker from '../common/datePicker/DatePicker'


const Reports: React.FC = () => {
    const currDate = new Date()
    const basePrevDate = new Date(currDate)
    basePrevDate.setDate(currDate.getDate() - 7)
    const [dateFrom, setDateFrom] = useState<Date>(basePrevDate)
    const [dateTo, setDateTo] = useState<Date>(currDate)

    const handleChangeDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value)
        setDateFrom(date)
    }

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${day}.${month}.${year}`;
    };

    return (
        <>
            <h1 className={classes.content_header}>
                Отчеты
            </h1>
            <DatePicker date={dateFrom} format='dd.MM.yyyy' name='dateFrom'/>
            <Chart dateFrom={dateFrom} dateTo={dateTo} />
        </>
    )
}


export default Reports