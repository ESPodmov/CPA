import React from "react";
import Header from "../components/header/Header";
import LoginSection from "../components/loginSection/LoginSection";

interface LoginProps {
    isLogin: boolean
}

const Login: React.FC<LoginProps> = ({isLogin}) => {
    document.body.style.backgroundColor = 'white';
    return (
        <>
            <Header isLoginPage={true} />
            <LoginSection isLogin={isLogin} />
        </>
    )
}


export default Login
