import React from "react";
import Header from "../components/header/Header";
import LoginSection from "../components/loginSection/LoginSection";


const Login: React.FC = () => {
    return (
        <>
            <Header isLoginPage={true} />
            <LoginSection isLogin={true}/>
        </>
    )
}


export default Login
