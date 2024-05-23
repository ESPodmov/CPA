import React from "react";
import MainPage from "../components/mainPage/MainPage";
import Offer from "../components/offer/Offer";


const OfferPage: React.FC = () => {

    return (
        <MainPage component={<Offer />} />
    )
}

export default OfferPage;