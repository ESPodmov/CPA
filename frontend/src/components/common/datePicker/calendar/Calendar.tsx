import React, { useEffect, useState } from "react";
import classes from './styles.module.scss'
import { ReactComponent as ArrowIcon } from '../../../../images/arrowIcon.svg'
import DayItem from "../dayItem/DayItem";


interface CalendarProps {
    isStart?: boolean;
    date: Date;
    endDate?: Date,
    startDate?: Date
    onChange: (date: Date) => void
}

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
const monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

interface DayData {
    date: Date,
    isActive: boolean,
    isDummy: boolean,
    isBound: boolean,
}


const Calendar: React.FC<CalendarProps> = ({ date, onChange, isStart, startDate, endDate }) => {
    const [currDate, setCurrDate] = useState<Date>(date)
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const [datesArray, setDatesArray] = useState<DayData[]>([])

    const isActive = (date: Date) => {
        if (isStart) {
            if (endDate) {
                return date < endDate
            }
        } else {
            if (startDate) {
                return date > startDate && date < new Date()
            }
        }
        return true
    }

    const isBounding = (date: Date) => {
        if (isStart) {
            if (endDate) {
                return date == endDate
            }
        } else {
            if (startDate) {
                return date == startDate
            }
        }
        return false
    }

    const getMonthDates = () => {

        const start = new Date(year, month, 1)
        const end = new Date(year, month + 1, 0)
        let curr = new Date(start)

        let dates: DayData[] = []

        while (curr <= end) {
            const newDate = new Date(curr)
            dates.push(
                {
                    date: newDate,
                    isActive: isActive(newDate),
                    isDummy: false,
                    isBound: isBounding(newDate)
                }
            )
            curr.setDate(curr.getDate() + 1)
        }

        let weekIndex = start.getDay() ? start.getDay() - 1 : 6

        for (let i = 0; i < weekIndex; i++) {
            dates.splice(0, 0,
                {
                    date: new Date(),
                    isActive: false,
                    isDummy: true,
                    isBound: false,
                }
            )
        }

        return dates

    }


    useEffect(() => {
        setDatesArray(getMonthDates())
    }, [month, year])


    useEffect(() => {
        setMonth(currDate.getMonth())
        setYear(currDate.getFullYear())
    }, [currDate])


    const getWeeks = () => {
        const weeks: DayData[][] = [];

        for (let i = 0; i < datesArray.length; i += 7) {
            weeks.push(datesArray.slice(i, i + 7));
        }
        return weeks;
    };


    const handleChangeMonth = (monthes: number) => {
        if (monthes < 0 && month + monthes < 0) {
            setMonth(11)
            setYear(year - 1)
        } else if (monthes > 0 && month + monthes > 11) {
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + monthes)
        }
    }


    const handleDayClick = (date: Date) => {
        console.log(date)
        setCurrDate(date)
        onChange(date);
    }

    return (
        <div className={classes.calendar_container}>
            <div className={classes.controls_container}>
                <div className={`${classes.icon_container} ${classes.left}`}>
                    <ArrowIcon className={`${classes.icon} ${classes.left}`} onClick={() => handleChangeMonth(-1)} />
                </div>
                <div className={classes.header_container}>
                    <span>
                        {monthes[month]}
                    </span>
                    <span>
                        {year}
                    </span>
                </div>
                <div className={classes.icon_container}>
                    <ArrowIcon className={classes.icon} onClick={() => handleChangeMonth(1)} />
                </div>
            </div>
            <div className={classes.dates_container}>
                <div className={classes.weeks_container}>
                    {
                        weekDays.map((weekDay, index) => (
                            <div className={classes.item} key={index}>
                                {weekDay}
                            </div>
                        ))
                    }
                </div>
                <div className={classes.days_container}>
                    {datesArray && datesArray.length > 0 && getWeeks().map((week, weekIndex) => (
                        <div className={classes.week} key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <DayItem
                                    key={dayIndex}
                                    date={day.date}
                                    isActive={day.isActive}
                                    isBound={day.isBound}
                                    isDummy={day.isDummy}
                                    onClick={handleDayClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}


export default Calendar;
