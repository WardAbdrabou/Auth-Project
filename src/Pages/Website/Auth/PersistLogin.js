import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import LoadingScreen from "../../../Components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
    //Get Cuurent User
    const context = useContext(User);
    const token = context.auth.token;
    const [loading, setLoading] = useState(true);
    // console.log(context);


    //cookie
    const cookie = new Cookies();

    const getToken = cookie.get("Bearer");
    // console.log(getToken);

    //Send Refresh Token
    useEffect(() => {
        async function refresh() {
            try {
                await axios
                    .post(`http://127.0.0.1:8000/api/refresh`, null, {
                        headers: {
                            Authorization: "Bearer " + getToken,
                        },
                    })
                    .then((data) =>
                        {
                        cookie.set("Bearer", data.data.token);
                        // console.log(data);
                        context.setAuth((prev) => {
                            return { userDetails:data.data.user, token: data.data.token };
                        })}
                    );
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        !token ? refresh() : setLoading(false);
    }, []);
    return loading ? <LoadingScreen></LoadingScreen> : <Outlet></Outlet>;
}