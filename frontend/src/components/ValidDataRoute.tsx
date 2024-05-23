import { RootState } from "../app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { routes } from "../routes/Routes";


const ValidDataRoute: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user)

    const location = useLocation();

    const isValid = user && user.phone && user.name ? true : false;

    return isValid  ? (
        <Outlet />
    ) : (
        <Navigate to={routes.profile.path} state={{ from: location }} replace />
    )

}

export default ValidDataRoute;