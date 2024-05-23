import React from "react";
import MainPage from "../components/mainPage/MainPage";
import NewsItem from "../components/news/NewsItem";


const NewsItemPage: React.FC = () => {
    return (
        <MainPage component={<NewsItem />} />
    )
}


export default NewsItemPage
