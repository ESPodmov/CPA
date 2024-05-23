import React from "react";
import classes from './styles.module.scss'
import SideMenuItem from "./sideMenuItem/SideMenuItem";
import { ReactComponent as HomeIcon } from '../../images/homeIcon.svg'
import { ReactComponent as ReportIcon} from '../../images/reportIcon.svg'
import {ReactComponent as UnloadIcon} from '../../images/unloadIcon.svg'
import {ReactComponent as OfferIcon} from '../../images/offerIcon.svg'
import {ReactComponent as LinkIcon} from '../../images/linkIcon.svg'
import { routes } from "../../routes/Routes";

const SideMenu: React.FC = () => {

    return (
        <div className={classes.side_menu_container}>
            <SideMenuItem Icon={HomeIcon} text="Главная" url={routes.home.path}/>
            <SideMenuItem Icon={ReportIcon} text="Отчеты" url={routes.reports.path}/>
            <SideMenuItem Icon={UnloadIcon} text="Выгрузки" url={routes.unload.path}/>
            <SideMenuItem Icon={OfferIcon} text="Офферы" url={routes.offers.path}/>
            <SideMenuItem Icon={LinkIcon} text="Мои ссылки" url={routes.my_links.path}/>
        </div>
    )
}


export default SideMenu

