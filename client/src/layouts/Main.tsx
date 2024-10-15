import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="min-h-screen grid grid-rows-layout">
            <Navbar />
            <main>{<Outlet />}</main>
            <Footer />
        </div>
    );
};

export default Main;
