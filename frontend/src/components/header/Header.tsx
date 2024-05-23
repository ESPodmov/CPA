import React, { useEffect, useRef, useState } from 'react';
import classes from "./styles.module.scss";
import { Link } from 'react-router-dom';
import { routes } from '../../routes/Routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ProfileMenu from '../profileMenu/ProfileMenu';

interface HeaderProps {
    isLoginPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    let logoClassName = `${classes.logo} ${classes.main_text} `;
    logoClassName = logoClassName + (isLoginPage ? classes.dark : classes.light);
    const user = useSelector((state: RootState) => state.user.user)

    const containerClassName = classes.header_container + (isLoginPage ? "" : ` ${classes.main_page}`)
    const logoLink = isLoginPage ? routes.register.path : routes.profile.path

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showMenu && profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node) &&
                iconRef.current && !iconRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    })


    const onClick = () => {
        const regSection = document.getElementById('reg-section')?.offsetTop
        window.scrollTo({
            top: regSection,
            behavior: 'smooth'
        })
    }

    const onProfileClick = () => {
        setShowMenu(!showMenu)
        if (iconRef.current) {
            setTarget(iconRef.current)
        }
    }

    return (
        <header>
            <div className={containerClassName}>
                <Link to={logoLink} className={classes.link}>
                    <div className={logoClassName}>Tronius</div>
                </Link>
                {
                    isLoginPage ?
                        <button onClick={onClick}>
                            Зарегистрироваться
                        </button>
                        :
                        <div className={classes.controls_container}>
                            <Link to={routes.support.path} className={`${classes.link} ${classes.item} ${classes.light}`}>
                                Поддержка
                            </Link>
                            <Link to={routes.news.path} className={`${classes.link} ${classes.item} ${classes.light}`}>
                                Новости
                            </Link>
                            <div className={`${classes.profile} ${classes.item}`} ref={iconRef} onClick={onProfileClick}>
                                <span className={classes.light}>
                                    {user?.email[0].toUpperCase()}
                                </span>
                            </div>
                            {
                                showMenu &&
                                <ProfileMenu email={user?.email} target={target} refer={profileMenuRef} />
                            }
                        </div>
                }
            </div>
        </header>
    )

}

export default Header;
