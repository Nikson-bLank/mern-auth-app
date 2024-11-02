import dayjs from "dayjs";
import { Link, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const verificationCode: string | null = searchParams.get("code");
    const expiration: number | null = Number(searchParams.get("exp"));
    const expirationTime = dayjs(expiration);
    const isExpired = expirationTime.isBefore(dayjs());
    const isLinkValid = verificationCode && !isExpired;

    return (
        <div className="bg-indigo-200 w-full h-screen">
            <div className="max-w-lg mx-auto  flex h-full items-center px-5">
                <div className="w-full bg-white rounded-2xl box-border md:p-10 p-5">
                    {isLinkValid ? (
                        <ResetPasswordForm code={verificationCode} />
                    ) : (
                        <div className="p-6  md:mx-auto">
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
            </div>
        </div>
    );
};

export default ResetPassword;
