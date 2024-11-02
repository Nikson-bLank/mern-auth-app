import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../api/hooks/useAuth";
import Loading from "../components/svg/Loading";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    const { user, isLoading } = useAuth();
    console.log("🚀 ~ DashboardLayout ~ user:", user);
    if (isLoading) {
        return (
            <div className="bg-gray-100 h-screen flex justify-center items-center">
                <Loading className="stroke-indigo-900 size-16" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/sign-in"
                replace
                state={{
                    redirectUrl: window.location.pathname,
                }}
            />
        );
    }

    return (
        <div className="flex w-full">
            <Sidebar />
            <main className="container mx-auto w-full flex-1 pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
