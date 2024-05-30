import React, { ChangeEvent, useState } from 'react'
import Chart from '../chart/Chart'
import classes from './styles.module.scss'


const Reports: React.FC = () => {
    const currDate = new Date()
    const basePrevDate = new Date(currDate)
    basePrevDate.setDate(currDate.getDate() - 7)
    const [dateFrom, setDateFrom] = useState<string>(`${basePrevDate.getDay().toString().padStart(2, '0')}.${basePrevDate.getMonth().toString().padStart(2, '0')}.${basePrevDate.getFullYear()}`)
    const [dateTo, setDateTo] = useState(`${currDate.getDay()}.${currDate.getMonth()}.${currDate.getFullYear()}`)
    console.log(dateFrom)

    const handleChangeDateFrom = (event: ChangeEvent<HTMLInputElement>) => {
        setDateFrom(event.target.value)
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
            <input placeholder='dd.mm.yyyy' defaultValue={dateFrom} type='date' onChange={handleChangeDateFrom} onBlur={() => setDateFrom(formatDate(dateFrom))} />
            <Chart dateFrom={dateFrom} dateTo={dateTo} />
        </>
    )
}


export default Reports