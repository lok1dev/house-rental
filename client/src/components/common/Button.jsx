import { memo } from "react";

const Button = ({
    text,
    textColor,
    bgColor,
    widthFull,
    IcBefore,
    IcAfter,
    onClick,
    size,
}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`${
                widthFull && "w-full"
            } flex items-center justify-center gap-1.5 px-2 py-2 ${textColor} outline-none rounded-md ${bgColor} hover:underline `}
        >
            <span>{IcBefore && <IcBefore size={size} className="mt-[2px]" />}</span>
            <span>{text}</span>
            <span>{IcAfter && <IcAfter size={size} className="mt-[2px]" />}</span>
        </button>
    );
};

export default memo(Button);
