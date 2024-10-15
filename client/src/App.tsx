import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const APP_ROUTES = [
    {
        id: "main",
        path: "/",
        component: <Main />,
        children: [
            {
                id: "about",
                path: "/about",
                component: <About />,
            },
            {
                id: "profile",
                path: "/profile",
                component: <Profile />,
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
                                    path={childRoute.path}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </div>
    );
}

export default App;
