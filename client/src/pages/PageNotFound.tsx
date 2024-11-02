import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Sorry, we couldn't find this page.
                    </p>
                    <p className="mt-4 mb-8">
                        But don't worry, you can find plenty of other things on
                        our homepage.
                    </p>
                    <Link
                        to="/"
                        className="rounded-lg inline-flex items-center tracking-wide font-semibold  transition-all duration-300 ease-in-out justify-center focus:shadow-outline focus:outline-none bg-indigo-500 text-white hover:bg-indigo-700 hover:shadow focus:shadow-sm h-14 px-7 py-4 text-lg"
                    >
                        Back to homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;
