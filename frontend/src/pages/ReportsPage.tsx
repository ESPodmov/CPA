import React from "react";
import MainPage from "../components/mainPage/MainPage";
import Reports from "../components/reports/Reports";


const ReportsPage: React.FC = () => {

    return (
        <MainPage component={<Reports />} />
    )
}

export default ReportsPage