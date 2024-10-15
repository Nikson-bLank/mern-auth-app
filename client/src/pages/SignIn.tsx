import Button from "../components/UI/Button/Button";
import loginImage from "../assets/svg/login.svg";
import { useState } from "react";
import { useLogin } from "../api/hooks/useAuth";

type LoginData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { mutate: onLogin, isPending, isError } = useLogin();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(loginData);
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
                            Login
                        </h1>
                        {isError && (
                            <div className="bg-red-100 rounded-lg w-full  py-1 px-2 box-border my-2">
                                <p className="text-red-500">
                                    Invalid email or password
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
                                    value={loginData.email}
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
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleInput}
                                    className="w-full h-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-indigo-200 rounded-xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-400 hover:border-indigo-400 shadow-sm focus:shadow-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant={"link"}
                                    size={"md"}
                                    className="underline"
                                >
                                    Forgot Password?
                                </Button>
                            </div>
                            <Button type="submit" loading={isPending}>
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
