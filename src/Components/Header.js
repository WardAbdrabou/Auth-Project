import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";


export default function Header() {
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    console.log(token);

    async function handleLogOut(){
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove("Bearer")
        window.location.pathname= "/";
    }
    
    return (
        <div className="container shadow">
            <nav className="d-flex p-2">
                <div className="d-flex flex-1 ">
                    <Link to="/">Home</Link>
                    <Link to="/About">About</Link>
                </div>
                <div className="d-flex">
                    {!token ? (
                    <>
                    <Link
                        to="/register"
                        style={{ textAlign: "center" }}
                        className="register-nav"
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        style={{ textAlign: "center" }}
                        className="register-nav"
                    >
                        Login
                    </Link>
                    </>
                    ):(<> <Link
                        to="/dashboard"
                        style={{ textAlign: "center" }}
                        className="register-nav"
                    >
                        Dashboard
                    </Link>
                    <div className="register-nav" onClick={handleLogOut}> Log Out </div> </>)}
                </div>
            </nav>
        </div>
    );
}
