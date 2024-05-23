import React from "react";
import classes from './styles.module.scss'

interface MainContentProps {
    component: JSX.Element
}

const MainContent: React.FC<MainContentProps> = ({ component }) => {
    return (
        <div className={classes.main_content__container}>
            {component}
        </div>
    )
}


export default MainContent