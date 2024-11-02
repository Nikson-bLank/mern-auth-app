import React, { useState } from "react";
import { useResetPassword } from "../../api/hooks/useAuth";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";

type Props = {
    code: string;
};

const ResetPasswordForm = ({ code }: Props) => {
    const { isPending, mutate: onResetPassword, isError } = useResetPassword();
    console.log("🚀 ~ ResetPasswordForm ~ isError:", isError);
    const [password, setPassword] = useState<string>("");
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onResetPassword({ password, verificationCode: code });
    };

    return (
        <div className="bg-white p-6  md:mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-black text-center">
                Reset Password
            </h1>
            {isError && (
                <div className="bg-red-100 rounded-lg w-full  py-1 px-2 box-border my-2">
                    <p className="text-red-500">
                        Invalid or expired verification code
                    </p>
                </div>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-base font-semibold"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700  border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                    />
                </div>

                <Button type="submit" loading={isPending}>
                    Reset Password
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
        </div>
    );
};

export default ResetPasswordForm;
