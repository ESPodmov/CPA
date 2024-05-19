import React from 'react';
import classes from "./styles.module.scss";
import { Link } from 'react-router-dom';
import { routes } from '../../routes/Routes';

interface HeaderProps {
    isLoginPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {

    let logoClassName = `${classes.logo} ${classes.main_text} `;

    logoClassName = logoClassName + (isLoginPage ? classes.dark : classes.light);

    const onClick = () => {
        const regSection = document.getElementById('reg-section')?.offsetTop
        window.scrollTo({
            top: regSection,
            behavior: 'smooth'
        })
    }

    return (
        <header>
            <div className={classes.header_container}>
                <Link to={routes.register.path} className={classes.link}>
                    <div className={logoClassName}>Tronius</div>
                </Link>
                {
                    isLoginPage ?
                        <button onClick={onClick}>
                            Зарегистрироваться
                        </button>
                        :
                        <>
                        </>
                }
            </div>
        </header>
    )

}

export default Header;
