import React from "react";
import classes from './styles.module.scss'
import { ReactComponent as ArrowIcon } from '../../../images/arrowIcon.svg'
import { Link } from "react-router-dom";
import { routes } from "../../../routes/Routes";


interface NewsCardProps {
    pk: number;
    date: string;
    title: string;
    short: string;
    isLast: boolean;
    isLink: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, short, isLast, pk, isLink }) => {
    const isoDate = new Date(date);
    const day = String(isoDate.getDate()).padStart(2, '0');
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const year = isoDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`
    const Container = isLink ? Link : 'div'

    return (
        <Container to={`${routes.news.path}/${pk}`} className={`${classes.news_card_container} ${isLast ? classes.last : ""} ${!isLink ? classes.item : ""}`}>
            <div className={classes.news_crad__text_container}>
                <span className={classes.news_card__text_secondary}>
                    {formattedDate}
                </span>
                <div className={classes.news_main_info_container}>
                    <h1 className={classes.content_header}>
                        {title}
                    </h1>
                    <span className={classes.news_card__text_secondary}>
                        {short}
                    </span>
                </div>
            </div>

            {
                isLink &&
                <div className={classes.arrow_container}>
                    <ArrowIcon className={classes.secondary} />
                </div>
            }
        </Container>
    )
}


export default NewsCard
