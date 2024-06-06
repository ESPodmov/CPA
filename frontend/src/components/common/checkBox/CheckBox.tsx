import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import classes from './styles.module.scss'


interface CheckBoxProps {
    caption: JSX.Element;
    isChart?: boolean,
    name?: string;
    checked?: boolean;
    toggleCheckBox?: Function;
}


const CheckBox: React.FC<CheckBoxProps> = ({ caption, isChart, name, checked, toggleCheckBox }) => {
    const refer = useRef<HTMLInputElement>(null)
    const [isChecked, setIsChecked] = useState<boolean>(checked || false)


    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked)
        }
    }, [checked])

    const doClick = () => {
        setIsChecked(!isChecked)
        if (toggleCheckBox) {
            toggleCheckBox(name)
        }
    }

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        doClick()
    }


    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation();
        doClick()
    };


    return (
        <div className={`${classes.checkbox_container} ${isChart ? classes.chart : ""}`} onClick={handleClick}>
            <div className={`${classes.checkbox} ${isChart ? classes.chart : ""}`}>
                <input
                    id={name ? name : "agreement"}
                    type="checkbox"
                    name={name ? name : "agreement"}
                    ref={refer}
                    checked={isChecked}
                    onChange={handleInputChange}
                />
                <span className={classes.checkmark} />
            </div>
            {caption}
        </div>
    )
}

export default CheckBox
