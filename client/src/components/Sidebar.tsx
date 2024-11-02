import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryClient from "../api/client-config/queryClient";
import { useLogout } from "../api/hooks/useAuth";
import cn from "../utils/cn";

const getActivePath = (currentPath: string, link: string) => {
    return currentPath.includes(link);
};

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { refetch, status } = useLogout();

    useEffect(() => {
        if (status === "success") {
            queryClient.clear();
            navigate("/", {
                replace: true,
            });
        }
    }, [navigate, status]);

    return (
        <aside className=" fixed pb-3 px-6 w-64 flex flex-col justify-between h-screen border-r bg-white ">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link
                        to="/"
                        className="text-2xl font-semibold whitespace-nowrap"
                    >
                        Logo
                    </Link>
                </div>
                <ul className="space-y-2 tracking-wide mt-8">
                    <li>
                        <Link
                            to="/user/dashboard"
                            aria-label="dashboard"
                            className={cn(
                                "relative px-4 py-3 flex items-center space-x-4 hover:bg-indigo-100 rounded-lg",
                                {
                                    "rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-400":
                                        getActivePath(
                                            pathname,
                                            "/user/dashboard"
                                        ),
                                }
                            )}
                        >
                            <svg
                                className={cn("h-6 w-6 text-gray-700", {
                                    "text-white": getActivePath(
                                        pathname,
                                        "/user/dashboard"
                                    ),
                                })}
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg>
                            <span className="-mr-1 font-medium">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/user/sessions"
                            className={cn(
                                "relative px-4 py-3 flex items-center space-x-4 hover:bg-indigo-100 rounded-lg",
                                {
                                    "rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-400":
                                        getActivePath(
                                            pathname,
                                            "/user/sessions"
                                        ),
                                }
                            )}
                        >
                            <svg
                                className={cn("h-6 w-6 text-gray-700", {
                                    "text-white": getActivePath(
                                        pathname,
                                        "/user/sessions"
                                    ),
                                })}
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                <circle cx={12} cy={7} r={4} />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <span>Sessions</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                    onClick={() => refetch()}
                >
                    <svg
                        className="h-6 w-6 text-gray-700"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>
                    <span className="group-hover:text-gray-700">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
