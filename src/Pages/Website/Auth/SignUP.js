import { useContext, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header";
import "./login.css";
import { User } from "./../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setpasswordConfirmation] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nav = useNavigate();

    //Cookie
    const cookie = new Cookies();
    
    const user = useContext(User);
    console.log(user);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            let res = await axios.post("http://127.0.0.1:8000/api/register", {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetials = res.data.data.user;
            user.setAuth({token , userDetials});
            nav("/dashboard");
        } catch (err) {
            if (err.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
    }

    return (
        <div>
            <Header />
            <div className="parent login">
                <div className="register login">
                    <form onSubmit={Submit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name....."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        {name.length < 2 && accept && (
                            <p className="error">Name must be more than 2 char</p>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email....."
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        {accept && emailError && (
                            <p className="error">Email is already been taken</p>
                        )}
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password....."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        {password.length < 8 && accept && (
                            <p className="error">password must be more than 8 char</p>
                        )}
                        <label htmlFor="passwordCo">Password Confirmation</label>
                        <input
                            id="passwordCo"
                            type="password"
                            placeholder="Password....."
                            value={passwordConfirmation}
                            onChange={(e) => setpasswordConfirmation(e.target.value)}
                        ></input>
                        {passwordConfirmation !== password && accept && (
                            <p className="error">Password dose not match</p>
                        )}
                        <div style={{ textAlign: "center" }}>
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
