import React from 'react';
import classes from "./styles.module.scss"


interface DayItemProps {
    date: Date;
    isActive: boolean;
    isDummy: boolean;
    isBound: boolean;
    onClick: (date: Date) => void;
}

const DayItem: React.FC<DayItemProps> = ({ date, isActive, isDummy, isBound, onClick }) => {

    const handleClick = () => {
        if (isActive && !isDummy && !isBound) {
            onClick(date)
        }
    }

    return isDummy ?
        (
            <div className={`${classes.day} ${classes.dummy}`} />
        ) : (
            <div className={`${classes.day} ${isActive ? "" : classes.disabled} ${isBound ? classes.bound : ""}`} onClick={handleClick}>
                {date?.getDate()}
            </div>
        )
}

export default DayItem