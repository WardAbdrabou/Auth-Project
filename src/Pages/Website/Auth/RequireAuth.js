import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../Context/UserContext";

export default function RequireAuth() {
    const user = useContext(User);
    const location = useLocation();

    return user.auth.token ? (
        <Outlet></Outlet>
    ) : (
        <Navigate state={{ form: location }} replace to="/login"></Navigate>
    );
}
