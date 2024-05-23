import React, { RefObject } from "react";
import classes from './styles.module.scss'
import { ReactComponent as QuestionIcon } from '../../../images/questionIcon.svg'
import { ReactComponent as CloseIcon } from '../../../images/closeIcon.svg'


interface ProfileTooltipProps {
    target: HTMLElement | null,
    caption: string;
    refer: RefObject<HTMLDivElement>;
    close: Function;
}

const ProfileTooltip: React.FC<ProfileTooltipProps> = ({ target, caption, refer, close }) => {
    const left = target ? target.offsetLeft : null
    const top = target ? target.offsetTop + target.offsetHeight + 10 : 16

    const style = left ? { left: left, top: top } : { right: 16, top: top }

    const handleClick = () => {
        close()
    }

    return (
        <div className={classes.profile_tooltip_container} style={style} ref={refer}>
            <div className={`${classes.profile_tooltip__item} ${classes.profile_tooltip_icon} ${classes.first}`}>
                <QuestionIcon />
            </div>
            <div className={classes.profile_tooltip__item}>
                Если вы хотите {caption}, напишите на почту
                <span className={classes.link}>
                    CPAPartnersTron@yandex.ru
                </span>
            </div>
            <div className={`${classes.profile_tooltip__item} ${classes.profile_tooltip_icon} ${classes.close_icon}`} onClick={handleClick}>
                <CloseIcon />
            </div>
        </div>
    )
}

export default ProfileTooltip
