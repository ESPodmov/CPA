import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss"
import NewsCard from "./newsCard/NewsCard";
import PageSwitcher from "../common/pageSwitcher/PageSwitcher";
import { useGetAllNewsQuery, useLazyGetAllNewsQuery } from "../../app/services/newsApi";


interface NewsItem {
    pk: number;
    title: string;
    short: string;
    created_at: string;
}

const News: React.FC = () => {
    const [getNews, { error, isLoading }] = useLazyGetAllNewsQuery();
    const { data: mountNews, error: mountError, isLoading: mountIsLoading } = useGetAllNewsQuery({ page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        if (mountNews) {
            setTotalPages(Math.ceil(mountNews.count / mountNews.results.length));
            setNews(mountNews.results)
        }
    }, [mountNews])

    const switchPage = async (page: number) => {
        const response = await getNews({ page }).unwrap();
        setNews(response.results)
    }



    return (
        <>
            <h1 className={classes.content_header}>
                Новости
            </h1>
            <div className={classes.news_content_container}>
                <div className={classes.news_list_container}>
                    {news && news.map((newsItem, index) => (
                        <NewsCard
                            key={index}
                            pk={newsItem.pk}
                            date={newsItem.created_at}
                            title={newsItem.title}
                            short={newsItem.short}
                            isLast={index === news.length - 1}
                            isLink={true}
                        />
                    ))}
                </div>
                <PageSwitcher totalPages={totalPages} performSwitch={switchPage} />
            </div>
        </>
    )
}

export default News
