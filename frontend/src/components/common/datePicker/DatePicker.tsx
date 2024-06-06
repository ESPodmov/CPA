import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { ReactComponent as CalendarIcon } from '../../../images/calendarIcon.svg'
import classes from './styles.module.scss'
import Calendar from "./calendar/Calendar";


interface DatePickerProps {
    dateRange?: boolean,
    isStart?: boolean,
    startDate?: Date,
    endDate?: Date,
    date: Date,
    format: string,
    name: string,
    onChange: (date: Date) => void;
}


const formatDateForInput = (date: Date, format: string) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear().toString()
    return format.replace('dd', day).replace('MM', month).replace('yyyy', year);
};


const getDateFromFormat = (dateString: string, format: string) => {
    const parts = dateString.split(/[-/.]/);
    const formatParts = format.split(/[-/.]/);
    const date = new Date(Number(parts[formatParts.indexOf('yyyy')]), Number(parts[formatParts.indexOf('MM')]) - 1, Number(parts[formatParts.indexOf('dd')]));
    return date
}

const DatePicker: React.FC<DatePickerProps> = ({ isStart, date, format, name, dateRange, endDate, startDate, onChange }) => {
    const [value, setValue] = useState<string>(formatDateForInput(date, format));
    const [showCalendar, setShowCalendar] = useState(false)
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = getDateFromFormat(event.target.value, format)
        console.log(date)
        setValue(event.target.value)
    }

    const selectDate = (date: Date) => {
        setValue(formatDateForInput(date, format))
        onChange(date)
    }

    const handleInputClick = () => {
        setShowCalendar(!showCalendar)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setShowCalendar(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={pickerRef} style={{width: 'fit-content'}}>
            <div className={classes.picker_container} onClick={handleInputClick} >
                <input value={value} name={name} id={name} onChange={handleChange} readOnly/>
                <CalendarIcon className={classes.icon} />
            </div>
            {
                showCalendar && (
                    dateRange ? (
                        isStart ? (
                            <Calendar date={date} onChange={selectDate} isStart={isStart} endDate={endDate} />
                        ) : (
                            <Calendar date={date} onChange={selectDate} isStart={isStart} startDate={startDate} />
                        )
                    ) : (
                        <Calendar date={date} onChange={selectDate} />
                    )
                )

            }

        </div>
    )
}

export default DatePicker;