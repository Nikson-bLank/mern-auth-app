import { useState } from "react";
import Button from "../components/UI/Button/Button";
import { useSendForgotPasswordMail } from "../api/hooks/useAuth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const {
        mutate: onSendForgotPasswordMail,
        isSuccess,
        isPending,
    } = useSendForgotPasswordMail();
    const [email, setEmail] = useState<string>("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSendForgotPasswordMail(email);
    };

    return (
        <div className="bg-indigo-200 w-full h-screen">
            <div className="max-w-lg mx-auto  flex h-full items-center px-5">
                <div className="w-full bg-white rounded-2xl    box-border md:p-10 p-5">
                    <h1 className="text-4xl font-bold mb-6 text-black text-center">
                        Forgot Password
                    </h1>
                    {isSuccess ? (
                        <>
                            <div className="bg-green-100 rounded-lg w-full p-3 box-border my-2 flex gap-4 items-center">
                                <div>
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="text-green-600 size-8"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                        ></path>
                                    </svg>
                                </div>
                                <p className="text-green-500">
                                    Email sent! Check your inbox for further
                                    instruction
                                </p>
                            </div>
                            <div className="w-full flex justify-center">
                                <p className="text-md text-slate-400">
                                    Go back to&nbsp;
                                    <Link
                                        to="/sign-in"
                                        className="text-indigo-400 hover:text-indigo-800 underline"
                                    >
                                        Sign In
                                    </Link>
                                    &nbsp;or&nbsp;
                                    <Link
                                        to="/sign-up"
                                        className="text-indigo-400 hover:text-indigo-800 underline"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </>
                    ) : (
                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-base font-semibold "
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="eg. info@gmail.com"
                                    name={"email"}
                                    value={email}
                                    onChange={handleEmail}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700  border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                                />
                            </div>

                            <Button type="submit" loading={isPending}>
                                Send
                            </Button>
                            <div className="w-full flex justify-center">
                                <p className="text-md text-slate-400">
                                    Go back to&nbsp;
                                    <Link
                                        to="/sign-in"
                                        className="text-indigo-400 hover:text-indigo-800 underline"
                                    >
                                        Sign In
                                    </Link>
                                    &nbsp;or&nbsp;
                                    <Link
                                        to="/sign-up"
                                        className="text-indigo-400 hover:text-indigo-800 underline"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
