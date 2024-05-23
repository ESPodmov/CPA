import React, { ChangeEvent, useEffect, useState } from "react";
import classes from './styles.module.scss'
import { useLoginUserMutation, useRegisterUserMutation, useDeleteUserMutation, useGetCSRFMutation, useLazyGetUserQuery } from "../../app/services/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/futures/user/userSlice";
import { setAuthenticated } from "../../app/futures/user/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";

type LoginSectionProps = {
    isLogin: boolean;
}

const LoginSection: React.FC<LoginSectionProps> = ({ isLogin }) => {
    const dispatch = useDispatch();

    const [tabs, setTabs] = useState({ login: isLogin, register: !isLogin })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("")
    const [registerUser] = useRegisterUserMutation();
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();
    const [getUser, { data, error }] = useLazyGetUserQuery();


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
        return tabs.login ? "Войти" : "Зарегистрироваться"
    }


    const getUserAndRedirect = async () => {
        try {
            const user = await getUser().unwrap()

            dispatch(setUser(user))
            dispatch(setAuthenticated(true))
            navigate(routes.profile.path)
        } catch (error) {
            throw error
        }
    }

    const handleLogin = async () => {
        try {
            const data = {
                email, password
            }

            const response = await loginUser(data).unwrap()
            await getUserAndRedirect()


        } catch (error) {
            console.log(error)
        }
    }


    const handleRegister = async () => {
        try {
            const data = {
                email, password
            }

            try {
                await registerUser(data)
                await loginUser(data).unwrap()
                await getUserAndRedirect();
            } catch (error) {
                console.log(error)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (event: React.FormEvent) => {
        event.preventDefault();
        tabs.login ? handleLogin() : handleRegister()
    }

    return (
        <section>
            <div className={classes.login_container} id="reg-section">
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
                            <input placeholder="" id="email" name="email" onChange={handleEmailChange} />
                            <label className={classes.placeholder} htmlFor="email">Почта</label>
                        </div>
                        <div className={classes.input_container}>
                            <input placeholder="" id="password" name="password" onChange={handlePasswordChange} type="password" />
                            <label className={classes.placeholder} htmlFor="password">Пароль</label>
                        </div>
                        {
                            tabs.register &&
                            <div className={classes.input_container}>
                                <input placeholder="" id="password_again" name="password_again" onChange={handlePasswordAgainChange} type="password" />
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
                                CPAPartnersTron@yandex.ru
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginSection
