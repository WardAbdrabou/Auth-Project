import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

export default function Dashboard(){
    return (
        <div >
            <TopBar></TopBar>
            <div className="content-flex">
            <SideBar></SideBar>
            <div style={{width :"80%"}}>
                <Outlet></Outlet>
            </div>
            </div>
        </div>
    );
}