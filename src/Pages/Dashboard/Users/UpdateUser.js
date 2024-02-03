import { useContext, useEffect, useState } from "react";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setpasswordConfirmation] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const context = useContext(User);
    const token = context.auth.token;

    const nav = useNavigate();

    const id = window.location.pathname.split("/").slice(-1)[0];

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, 
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.json())
        .then((data)=>{
            setName(data[0].name);
            setEmail(data[0].email);
        });
    } , []);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            },{
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
            );
            nav("/dashboard/users");
        } catch (err) {
            if (err.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
    }


    return(
        <>
        <h1>Update Product</h1>
        <div>
            <div >
                <div >
                    <form onSubmit={Submit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
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
                            <button type="submit" className="btn">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}