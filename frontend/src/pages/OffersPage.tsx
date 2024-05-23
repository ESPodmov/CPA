import React from "react";
import MainPage from "../components/mainPage/MainPage";
import Offers from "../components/offers/Offers";


const OffersPage: React.FC = () => {
    return (
        <MainPage component={<Offers />} />
    )
}


export default OffersPage
