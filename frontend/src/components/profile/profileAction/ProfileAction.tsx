import React, { RefObject, useRef } from 'react';
import classes from './styles.module.scss'

interface ProfileActionProps {
    // refer: RefObject<HTMLDivElement>;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
    caption: string;
    onClick: Function;
    // target: HTMLElement | null;
}

const ProfileAction: React.FC<ProfileActionProps> = ({ Icon, text, caption, onClick }) => {
    // const left = target ? target.getBoundingClientRect().left : 16
    // const top = target ? target.getBoundingClientRect().bottom + 10 : 16
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        onClick(ref.current, caption)
    }

    return (
        <div className={classes.action_item_container} onClick={handleClick} ref={ref}>
            <div className={classes.action_icon}>
                <Icon />
            </div>
            {text}
        </div>
    )
}

export default ProfileAction
