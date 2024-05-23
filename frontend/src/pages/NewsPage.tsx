import React from "react";
import MainPage from "../components/mainPage/MainPage";
import News from "../components/news/News";


const NewsPage: React.FC = () => {

    return (
        <MainPage component={<News />} />
    )
}

export default NewsPage