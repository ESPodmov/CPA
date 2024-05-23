import { RootState } from "../app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";


const AuthRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    )

}

export default AuthRoute;

