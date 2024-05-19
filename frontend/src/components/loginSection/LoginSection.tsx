import React, { ChangeEvent, useState } from "react";
import classes from './styles.module.scss'
import { useRegisterUserMutation } from "../../app/services/userApi";

type LoginSectionProps = {
    isLogin: boolean;
}

const LoginSection: React.FC<LoginSectionProps> = ({ isLogin }) => {

    const [tabs, setTabs] = useState({ login: isLogin, register: !isLogin })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("")

    const getTabClassName = (isActive: boolean) => {
        return `${classes.switcher} ` + (isActive ? classes.active : classes.inactive)
    }

    const handleLoginClick = () => {
        setTabs({ login: true, register: false });
    };

    const handleRegisterClick = () => {
        setTabs({ login: false, register: true });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handlePasswordAgainChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(event.target.value)
    }

    const getActiveTabBtnName = () => {
        return tabs.login ? "Зарегистрироваться" : "Войти"
    }

    const handleLogin = () => {

    }


    const handleRegister = () => {
        try {
            const data = {
                email, password
            }
            // const response = useRegisterUserMutation(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        tabs.login ? handleLogin() : handleRegister()
    }


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
                <form className={classes.form_container} onSubmit={handleClick}>
                    <div className={classes.main_input_container}>
                        <div className={classes.input_container}>
                            <input id="email" name="email" onChange={handleEmailChange} />
                            <label className={classes.placeholder} htmlFor="email">Почта</label>
                        </div>
                        <div className={classes.input_container}>
                            <input id="password" name="password" onChange={handlePasswordChange} />
                            <label className={classes.placeholder} htmlFor="password">Пароль</label>
                        </div>
                        {
                            tabs.register &&
                            <div className={classes.input_container}>
                                <input id="password_again" name="password_again" onChange={handlePasswordAgainChange} />
                                <label className={classes.placeholder} htmlFor="password_again">Пароль еще раз</label>
                            </div>
                        }

                    </div>
                    {
                        tabs.register &&
                        <div className={classes.checkbox_container}>
                            <div className={classes.checkbox}>
                                <input id="agreement" type="checkbox" name="agreement" />
                                <span className={classes.checkmark} />
                            </div>
                            <div className={classes.info}>
                                Я соглашаюсь с правилами Партнерской программы, ознакомлен с Политикой в отношении обработки персональных данных.
                            </div>
                        </div>
                    }
                    <div className={classes.btn_container}>
                        <button type="submit" className={classes.big_btn}>{getActiveTabBtnName()}</button>
                    </div>
                    <div className={classes.tooltip_container}>
                        <span>
                            Для восстановления пароля напишите в поддержку:
                            <a>
                                supportpartners@internet.ru
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginSection
