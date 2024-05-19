import React, { useState } from "react";
import classes from './styles.module.scss'

type LoginSectionProps = {
    isLogin: boolean;
}

const LoginSection: React.FC<LoginSectionProps> = ({ isLogin }) => {

    const [tabs, setTabs] = useState({ login: isLogin, register: !isLogin })

    const getTabClassName = (isActive: boolean) => {
        return `${classes.switcher} ` + (isActive ? classes.active : classes.inactive)
    }

    const handleLoginClick = () => {
        setTabs({ login: true, register: false });
    };

    const handleRegisterClick = () => {
        setTabs({ login: false, register: true });
    };


    const baseSwitcherClassName = `${classes.switcher}`

    return (
        <section>
            <div className={classes.login_container}>
                <div className={classes.header_container}>
                    <h1>Станьте партнером Tronius</h1>
                    <span>Рекламировать Tronius - это выгодно!</span>
                </div>
                <div className={classes.switcher_container}>
                    <button className={getTabClassName(tabs.register)} onClick={handleRegisterClick}>
                        Зарегистрироваться
                    </button>
                    <button className={getTabClassName(tabs.login)} onClick={handleLoginClick}>
                        Вход
                    </button>
                </div>
                <form className={classes.form_container}>
                    <div className={classes.main_input_container}>
                        <div className={classes.input_container}>
                            <input name="email"/>
                            <label className={classes.placeholder}>Почта</label>
                        </div>
                        <div className={classes.input_container}>
                            <input name="password"/>
                            <label className={classes.placeholder}>Пароль</label>
                        </div>
                        <div className={classes.input_container}>
                            <input name="password_again"/>
                            <label className={classes.placeholder}>Пароль еще раз</label>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginSection
