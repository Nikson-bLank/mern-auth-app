import { Link } from "react-router-dom";
import { useAuth } from "../api/hooks/useAuth";

// const NAV_ITEMS = [
//     {
//         id: 1,
//         name: "home",
//         link: "/",
//     },
//     {
//         id: 2,
//         name: "about",
//         link: "/about",
//     },
// ];

// const USER_MENU = [
//     {
//         id: 1,
//         name: "home",
//         link: "/profile",
//     },
//     {
//         id: 2,
//         name: "about",
//         link: "/setting",
//     },
//     {
//         id: 3,
//         name: "logout",
//         link: "/logout",
//     },
// ];

const Navbar = () => {
    const { user, isLoading } = useAuth();
    return (
        <header className="p-4 bg-indigo-900 text-gray-100 ">
            <nav className="container flex justify-between items-center h-16 mx-auto ">
                <Link
                    rel="noopener noreferrer"
                    to="/"
                    aria-label="Back to homepage"
                    className="text-2xl font-semibold whitespace-nowrap"
                >
                    Logo
                </Link>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <Link
                            rel="noopener noreferrer"
                            to="/"
                            className="flex items-center px-4"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="flex">
                        <Link
                            rel="noopener noreferrer"
                            to="/about"
                            className="flex items-center px-4"
                        >
                            About
                        </Link>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {isLoading ? (
                        <div className="animate-pulse">
                            <div className="flex items-center gap-1 justify-center">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                <div className="w-10 h-3 bg-gray-400  me-3" />
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : user ? (
                        <div className="flex items-center gap-1 justify-center">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <Link
                                to={"/user/dashboard"}
                                className="text-lg font-bold"
                            >
                                {user?.email}
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to={"/sign-in"}
                            className="inline-flex items-center tracking-wide font-semibold w-full transition-all duration-300 ease-in-out justify-center focus:shadow-outline focus:outline-none bg-indigo-500 text-gray-100 hover:bg-indigo-700 h-12 px-5 py-4 text-md rounded-lg"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
                <button className="p-4 lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
