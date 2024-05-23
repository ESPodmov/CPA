import React from "react";
import MainPage from "../components/mainPage/MainPage";
import Profile from "../components/profile/Profile";


const ProfilePage: React.FC = () => {
    return (
        <MainPage component={<Profile />} />
    )
}

export default ProfilePage