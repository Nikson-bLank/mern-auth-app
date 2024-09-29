import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, useMemo } from "react";
import cn from "../../../utils/cn";
interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    children: ReactNode;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
}

export default function Button({
    children,
    className,
    leftIcon,
    rightIcon,
    variant,
    size,
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
    "inline-flex items-center tracking-wide font-semibold w-full transition-all duration-300 ease-in-out justify-center focus:shadow-outline focus:outline-none",
    {
        variants: {
            variant: {
                primary: "bg-indigo-500 text-gray-100 hover:bg-indigo-700",
                secondary:
                    "bg-indigo-100 text-gray-800 hover:shadow focus:shadow-sm",
                destructive: "bg-red-400 text-white",
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
