import React from "react";
import { Link } from "react-router-dom";
import Button from "./UI/Button/Button";

type Props = {};

const NAV_ITEMS = [
    {
        id: 1,
        name: "home",
        link: "/",
    },
    {
        id: 2,
        name: "about",
        link: "/about",
    },
];

const LOGGEDIN_MENU = [
    {
        id: 1,
        name: "home",
        link: "/",
    },
    {
        id: 2,
        name: "about",
        link: "/about",
    },
];

const Navbar = (props: Props) => {
    return (
        <nav className="bg-indigo-100 shadow-lg min-h-20">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    to="/"
                    className="text-2xl font-semibold whitespace-nowrap"
                >
                    Logo
                </Link>
                <div className="flex gap-4 items-center justify-between">
                    <ul className="list-none flex gap-4">
                        {NAV_ITEMS.map((item) => (
                            <li>
                                <Link
                                    key={item.id}
                                    to={item.link}
                                    className="text-lg font-semibold capitalize"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Button variant={"primary"} size={"lg"}>
                        Sign In
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
