import React from "react";
import classes from './styles.module.scss'
import card_classes from './newsCard/styles.module.scss'
import { ReactComponent as ArrowIcon } from '../../images/arrowIcon.svg'
import NewsCard from "./newsCard/NewsCard";
import { Link, useParams } from "react-router-dom";
import { useGetShortNewsItemQuery } from "../../app/services/newsApi";
import { routes } from "../../routes/Routes";


interface NewsItemParams {
    pk: string;
}


const NewsItem: React.FC = () => {
    const { pk } = useParams()
    const { data: newsData, error, isLoading } = useGetShortNewsItemQuery({ pk: pk ? pk : 1 })



    return newsData && (
        <div className={classes.news_content_container}>
            <Link to={routes.news.path} className={classes.news_item_controls_container}>
                <ArrowIcon className={classes.news_icon} />
                Вернуться к новостям
            </Link >
            <div className={classes.news_item_data_container}>
                <NewsCard
                    pk={newsData.pk}
                    date={newsData.created_at}
                    short={newsData.short}
                    title={newsData.title}
                    isLast={true}
                    isLink={false}
                />
                {newsData.body}
            </div>

        </div>
    )
}

export default NewsItem
