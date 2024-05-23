import React from "react";
import Header from "../header/Header";
import classes from "./styles.module.scss"
import SideMenu from "../sideMenu/SideMenu";
import MainContent from "../mainContent/MainContent";

interface MainPageProps {
    component: JSX.Element;
}

const MainPage: React.FC<MainPageProps> = ({component}) => {
    document.body.style.backgroundColor = '#292929'

    return (
        <div className={classes.content_container}>
            <Header isLoginPage={false} />
            <SideMenu />
            <MainContent component={component}/>
        </div>
    )
}


export default MainPage;
