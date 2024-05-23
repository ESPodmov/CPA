import React, { ChangeEvent } from 'react';
import classes from './styles.module.scss'


interface ProfileInputProps {
    placeholder: string;
    caption?: string;
    changable: boolean;
    value: string | undefined | null;
    setChange: Function;
    name: string;
    error?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ placeholder, caption, value, changable, setChange, name, error }) => {



    const onItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChange(event.target.value)
    }

    return (
        <div className={classes.input_vertical_container}>
            <div className={classes.profile_input_container}>
                <input id={name} name={name} placeholder='' value={value || ''} disabled={!changable} onChange={onItemChange} className={error ? classes.error : ""} />
                <label htmlFor={name} className={`${classes.placeholder} ${error ? classes.error : ""}`}>{placeholder}</label>

            </div>
            {
                error &&
                <span className={`${classes.input_caption} ${classes.error_caption}`}>
                    {error}
                </span>
            }
            {
                !error && caption && changable &&
                <span className={classes.input_caption}>{caption}</span>
            }
        </div >
    )
}

export default ProfileInput
