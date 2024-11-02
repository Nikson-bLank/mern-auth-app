import { useSessions } from "../../api/hooks/useSession";
import SessionCard from "../../components/card/SessionCard";
import Loading from "../../components/svg/Loading";

const Sessions = () => {
    const { sessions = [], isPending, isError } = useSessions();

    if (isPending) {
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <Loading className="stroke-indigo-900 size-16" />
        </div>;
    }

    if (isError) {
        return (
            <div className="bg-red-100 border border-red-600 rounded-lg w-full p-3 box-border my-2 flex gap-4 items-center">
                <div>
                    <svg
                        viewBox="0 0 24 24"
                        className="text-red-600 size-8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </div>
                <p className="text-red-500">
                    Something went wrong, Please try again later.
                </p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-6">
            {sessions?.map((session) => (
                <SessionCard key={session._id} {...session} />
            ))}
        </div>
    );
};

export default Sessions;
