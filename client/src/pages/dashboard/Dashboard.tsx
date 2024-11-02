import dayjs from "dayjs";
import { useAuth } from "../../api/hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col gap-4">
            {!user?.verified && (
                <div className="bg-yellow-100 rounded-lg w-full p-3 box-border my-2 flex gap-4 items-center">
                    <div>
                        <svg
                            fill="#fdd835"
                            width="32px"
                            height="32px"
                            viewBox="0 0 256 256"
                            id="Flat"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                                <path d="M128,24A104,104,0,1,0,232,128,104.11759,104.11759,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z" />
                            </g>
                        </svg>
                    </div>
                    <p className="text-yellow-500">Email is not verified yet</p>
                </div>
            )}
            <div className="w-full rounded-lg py-6 px-4 bg-gradient-to-r from-indigo-600 to-indigo-400">
                <h1 className="text-white text-4xl">Welcome</h1>
                <p className="text-white my-3">
                    The purpose of this project is to understand to implement
                    authentication with access and refresh token using node and
                    react.
                </p>
            </div>
            <div className="w-full rounded-lg py-6 px-4 bg-transparent border border-indigo-800">
                <h2 className=" text-2xl">Account Detail</h2>
                <p className=" font-bold my-2">{user?.email}</p>
                <p className=" font-bold my-2">
                    Joined on&nbsp;
                    {dayjs(user?.createdAt).format("dddd, MMMM D, YYYY h:mm A")}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
