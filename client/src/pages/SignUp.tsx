import Button from "../components/UI/Button/Button";
import loginImage from "../assets/svg/login.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useRegister } from "../api/hooks/useAuth";

type RegisterData = {
    email: string;
    password: string;
};

const SignUp = () => {
    const { mutate: onRegister, isPending, isError } = useRegister();
    const [registerData, setRegisterData] = useState<RegisterData>({
        email: "",
        password: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRegister(registerData);
    };

    return (
        <div className="bg-indigo-200 w-full h-screen">
            <div className="container mx-auto  flex h-full items-center px-5">
                <div className="w-full bg-white rounded-2xl min-h-96 flex gap-10 box-border md:p-10 p-5">
                    <div className="hidden lg:block w-1/2">
                        <div className="rounded-xl bg-gray-700 h-full w-full">
                            <img src={loginImage} />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-6 lg:px-6 px-2">
                        <h1 className="text-4xl font-bold mb-6 text-black text-center">
                            Register
                        </h1>
                        {isError && (
                            <div className="bg-red-100 rounded-lg w-full  py-1 px-2 box-border my-2">
                                <p className="text-red-500">
                                    Email already in use
                                </p>
                            </div>
                        )}

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
                                    value={registerData.email}
                                    onChange={handleInput}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700  border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                                />
                            </div>
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
                                    value={registerData.password}
                                    onChange={handleInput}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700  border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                                />
                            </div>

                            <Button type="submit" loading={isPending}>
                               Register
                            </Button>
                            <div className="w-full flex justify-center">
                                <p className="text-md text-slate-400">
                                    Already have an account?&nbsp;
                                    <Link
                                        to="/sign-in"
                                        className="text-indigo-400 hover:text-indigo-800 underline"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
