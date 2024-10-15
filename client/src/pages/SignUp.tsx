import Button from "../components/UI/Button/Button";
import loginImage from "../assets/svg/login.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

type RegisterData = {
    email: string;
    password: string;
};

const SignUp = () => {
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
    };

    return (
        <div className="bg-indigo-200 w-full h-screen">
            <div className="container mx-auto lg:px-60 px-4 flex h-full items-center ">
                <div className="w-full bg-white rounded-2xl min-h-96 flex gap-10 box-border p-10">
                    <div className="hidden lg:block w-1/2">
                        <div className="rounded-xl bg-gray-700 h-full w-full">
                            <img src={loginImage} />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-6 lg:px-4 px-6">
                        <h1 className="text-4xl font-bold mb-6 text-black text-center">
                            Sign Up
                        </h1>
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
                                    value={registerData.email}
                                    onChange={handleInput}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
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
                                    value={registerData.password}
                                    onChange={handleInput}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <div>
                                    Already have account? &nbsp;
                                    <Link to="/sign-in" className="underline">
                                        Login
                                    </Link>
                                </div>
                            </div>
                            <Button type="submit">Register</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
