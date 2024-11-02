import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Main from "./layouts/Main";
import About from "./pages/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Sessions from "./pages/dashboard/Sessions";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import PageNotFound from "./pages/PageNotFound";

const APP_ROUTES = [
    {
        id: "main",
        path: "/",
        component: <Main />,
        children: [
            {
                id: "home",
                path: "/",
                component: <Home />,
            },
            {
                id: "about",
                path: "/about",
                component: <About />,
            },
        ],
    },

    {
        id: "user",
        path: "/user",
        component: <DashboardLayout />,
        children: [
            {
                id: "dashboard",
                path: "dashboard",
                component: <Dashboard />,
            },

            {
                id: "sessions",
                path: "sessions",
                component: <Sessions />,
            },
        ],
    },

    {
        id: "sign-in",
        path: "/sign-in",
        component: <SignIn />,
    },
    {
        id: "sign-up",
        path: "/sign-up",
        component: <SignUp />,
    },
    {
        id: "forgot-password",
        path: "/forgot-password",
        component: <ForgotPassword />,
    },
    {
        id: "reset-password",
        path: "/reset-password",
        component: <ResetPassword />,
    },
    {
        id: "verify-email",
        path: "/verify-email/:code",
        component: <VerifyEmail />,
    },
    {
        id: "404",
        path: "*",
        component: <PageNotFound />,
    },
];

function App() {
    return (
        <div>
            <Routes>
                {APP_ROUTES.map((route) => (
                    <Route
                        key={route.id}
                        element={route.component}
                        path={route.path}
                    >
                        {route.children &&
                            route.children.map((childRoute) => (
                                <Route
                                    key={childRoute.id}
                                    element={childRoute.component}
                                    // path={childRoute.path}
                                    {...childRoute}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </div>
    );
}

export default App;
