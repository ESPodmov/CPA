import React from "react";
import Header from "../components/header/Header";
import LoginSection from "../components/loginSection/LoginSection";


const Login: React.FC = () => {
    document.body.style.backgroundColor = 'white';
    return (
        <>
            <Header isLoginPage={true} />
            <LoginSection isLogin={true} />
        </>
    )
}


export default Login
