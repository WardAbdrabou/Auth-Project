import { Route, Routes } from "react-router-dom";
//Dashboard
import Dashboard from "./Pages/Dashboard/Dashboard";
//users
import Users from "./Pages/Dashboard/Users/Users";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
//website
import Home from "./Pages/Website/Home";
//Auth
import Login from "./Pages/Website/Auth/Login";
import SignUp from "./Pages/Website/Auth/SignUP";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";



export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/register" element={<SignUp></SignUp>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>

                {/* protected Routes */}
                <Route element={<PersistLogin></PersistLogin>}>
                    <Route element={<RequireAuth></RequireAuth>}>
                        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                            <Route path="users" element={<Users></Users>}></Route>
                            <Route path="user/create" element={<CreateUser></CreateUser>}></Route>
                            <Route path="users/:id" element={<UpdateUser></UpdateUser>}></Route>
                            <Route path="products" element={<Products></Products>}></Route>
                            <Route path="products/create" element={<NewProduct></NewProduct>}></Route>
                            <Route path="products/:id" element={<UpdateProduct></UpdateProduct>}></Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
