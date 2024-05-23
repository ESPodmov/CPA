import React, { RefObject } from "react";
import classes from "./styles.module.scss"
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../app/services/userApi";
import { setUser } from "../../app/futures/user/userSlice";
import { setAuthenticated } from "../../app/futures/user/authSlice";

interface ProfileMenuProps {
    email: string | undefined;
    target: HTMLElement | null;
    refer: RefObject<HTMLDivElement>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ email, target, refer }) => {
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const right = target ? window.innerWidth - target.getBoundingClientRect().right : 40
    const top = target ? target.getBoundingClientRect().bottom + 4 : 84


    const logOut = async () => {
        await logoutUser();
        dispatch(setUser(null))
        dispatch(setAuthenticated(false))
        navigate(routes.login.path)
    }

    return (
        <div className={classes.profile_menu_container} style={{ top: top, right: right }}>
            <div className={classes.triangle} />
            <div className={classes.profile_menu} ref={refer}>
                <div className={classes.profile_menu__header_container}>
                    <span className={classes.profile_menu__header}>{email}</span>
                </div>
                <div className={classes.profile_menu__controls_container}>
                    <Link to={routes.profile.path} className={classes.profile_menu__item}>Профиль</Link>
                    <span className={classes.profile_menu__alert} onClick={logOut}>Выход</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu
