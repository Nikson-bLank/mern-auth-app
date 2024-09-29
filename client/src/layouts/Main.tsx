import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Props = {
    children: ReactNode;
};

const Main = ({ children }: Props) => {
    return (
        <div className="min-h-screen grid grid-rows-layout">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Main;
