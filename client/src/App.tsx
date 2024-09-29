import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const APP_ROUTES = [
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
        id: "profile",
        path: "/profile",
        component: <Profile />,
    },
];

function App() {
    return (
        <Main>
            <Routes>
                {APP_ROUTES.map((route) => (
                    <Route
                        key={route.id}
                        element={route.component}
                        path={route.path}
                    />
                ))}
            </Routes>
        </Main>
    );
}

export default App;
