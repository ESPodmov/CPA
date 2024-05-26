import React, { MouseEventHandler, useRef } from "react";
import classes from './styles.module.scss'


interface CheckBoxProps {
    caption: JSX.Element
}


const CheckBox: React.FC<CheckBoxProps> = ({ caption }) => {
    const refer = useRef<HTMLInputElement>(null)

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {

        if (refer.current) {
            refer.current.checked = !refer.current.checked
        }
    }

    const handleInputClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation();
    };


    return (
        <div className={classes.checkbox_container} onClick={handleClick}>
            <div className={classes.checkbox}>
                <input id="agreement" type="checkbox" name="agreement" ref={refer} onClick={handleInputClick} />
                <span className={classes.checkmark} />
            </div>
            {caption}
        </div>
    )
}

export default CheckBox
