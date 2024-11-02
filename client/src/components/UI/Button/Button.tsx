import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, useMemo } from "react";
import cn from "../../../utils/cn";
import Loading from "../../svg/Loading";
interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    children: ReactNode;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
    loading?: boolean;
}

export default function Button({
    children,
    className,
    leftIcon,
    rightIcon,
    variant,
    size,
    loading,
    ...props
}: ButtonProps) {
    // determine icon placement
    const { newIcon: icon, iconPlacement } = useMemo(() => {
        const newIcon = rightIcon || leftIcon;

        return {
            newIcon,
            iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
        };
    }, [leftIcon, rightIcon]);

    if (loading)
        return (
            <button
                {...props}
                disabled
                className={cn(buttonVariants({ className, variant, size }))}
            >
                <span className="flex gap-2 items-center">
                    <Loading
                        className={cn(loadingVariants({ variant, size }))}
                    />
                    Loading...
                </span>
            </button>
        );

    return (
        <button
            {...props}
            className={cn(buttonVariants({ className, variant, size }))}
        >
            {icon && iconPlacement === "left" ? (
                <span className={"inline-flex shrink-0 self-center mr-2"}>
                    {icon}
                </span>
            ) : null}

            {/** hide button text during loading state */}
            {children}

            {/** render icon after */}
            {icon && iconPlacement === "right" ? (
                <span className={"inline-flex shrink-0 self-center ml-2"}>
                    {icon}
                </span>
            ) : null}
        </button>
    );
}

const buttonVariants = cva(
    "inline-flex items-center tracking-wide font-semibold  transition-all duration-300 ease-in-out justify-center focus:shadow-outline focus:outline-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-indigo-500 text-white hover:bg-indigo-700 hover:shadow focus:shadow-sm",
                secondary:
                    " bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-100  hover:shadow focus:shadow-sm",
                destructive: "bg-red-500 text-white hover:bg-red-700 hover:shadow focus:shadow-sm",
                link: "text-gray-800 !p-0 !h-fit",
            },
            size: {
                md: "h-12 px-5 py-4 text-md rounded-lg",
                lg: "h-14 px-7 py-4 text-lg rounded-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

const loadingVariants = cva("", {
    variants: {
        variant: {
            primary: "stroke-white",
            secondary: "stroke-indigo-900",
            destructive: "stroke-white",
            link: "stroke-gray-800",
        },
        size: {
            md: "h-8 w-8 ",
            lg: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
