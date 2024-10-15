import { Link } from "react-router-dom";

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

const Navbar = () => {
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
                            <li key={item.id}>
                                <Link
                                    to={item.link}
                                    className="text-lg font-semibold capitalize"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to={"/sign-in"}
                        className="inline-flex items-center tracking-wide font-semibold w-full transition-all duration-300 ease-in-out justify-center focus:shadow-outline focus:outline-none bg-indigo-500 text-gray-100 hover:bg-indigo-700 h-12 px-5 py-4 text-md rounded-lg"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
