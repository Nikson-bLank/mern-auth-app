import { Link, useParams } from "react-router-dom";
import { useVerifyEmail } from "../api/hooks/useAuth";
import Loading from "../components/svg/Loading";

const VerifyEmail = () => {
    const { code } = useParams();
    const { isLoading, isError, isSuccess } = useVerifyEmail(code || "");
    if (isLoading) {
        return (
            <div className="bg-gray-100 h-screen flex justify-center items-center">
                <Loading className="stroke-indigo-900 size-16" />
            </div>
        );
    }
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            {isSuccess && (
                <div className="bg-white p-6  md:mx-auto">
                    <svg
                        viewBox="0 0 24 24"
                        className="text-green-600 w-16 h-16 mx-auto my-6"
                    >
                        <path
                            fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                        ></path>
                    </svg>

                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                            Verification Done
                        </h3>
                        <p className="text-gray-600 my-2">
                            Thank you for Verifying email.
                        </p>
                        <p> Have a great day!</p>
                        <div className="py-10 text-center">
                            <a
                                href="#"
                                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            >
                                GO BACK TO HOME
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {isError && (
                <div className="bg-white p-6  md:mx-auto">
                    <svg
                        viewBox="0 0 24 24"
                        className="text-red-600 w-16 h-16 mx-auto my-6"
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

                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                            Invalid Link
                        </h3>
                        <p className="text-gray-600 my-2">
                            Invalid or expired link&nbsp;
                            <Link
                                to="/forgot-password"
                                className="text-indigo-400 hover:text-indigo-800 underline"
                            >
                                Get a new link
                            </Link>
                        </p>

                        <div className="py-10 text-center">
                            <a
                                href="#"
                                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            >
                                GO BACK TO HOME
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
