import React, { ReactElement } from "react";
import classes from './styles.module.scss'
import { Link } from "react-router-dom";


interface SideMenuItemProps {
    text: string;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    url: string;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({ text, Icon, url }) => {
    return (
        <div className={classes.side_menu__item_container}>
            <div className={classes.side_menu__icon_container}>
                <Icon />
            </div>
            <Link to={url} className={classes.side_menu__item}>
                {text}
            </Link>
        </div>
    )
}

export default SideMenuItem
