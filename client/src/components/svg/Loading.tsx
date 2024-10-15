import cn from "../../utils/cn";

type Props = {
    className?: string;
    height?: number;
    width?: number;
};

const Loading = ({ className, height = 24, width = 24, ...props }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 24 24"
            className={cn("animate-spin", className)}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeWidth={3.556}
                d="M20 12a8 8 0 0 1-11.76 7.061"
            />
        </svg>
    );
};

export default Loading;
