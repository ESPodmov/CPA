import React, { ChangeEventHandler, useState } from "react";
import { ReactComponent as CalendarIcon } from '../../../images/calendarIcon.svg'
import classes from './styles.module.scss'


interface DatePickerProps {
    isStart?: boolean,
    isEnd?: boolean,
    date: Date,
    format: string,
    name: string
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

const DatePicker: React.FC<DatePickerProps> = ({ isEnd, isStart, date, format, name }) => {
    const [value, setValue] = useState<string>(formatDateForInput(date, format));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = getDateFromFormat(event.target.value, format)
        console.log(date)
        setValue(event.target.value)
    }

    return (
        <>
            <div className={classes.picker_container}>
                <input value={value} name={name} id={name} onChange={handleChange} />
                <CalendarIcon className={classes.icon} />
            </div>
            
        </>
    )
}

export default DatePicker;