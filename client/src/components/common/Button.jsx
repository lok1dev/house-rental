import { memo } from "react";

const Button = ({ text, textColor, bgColor, wfull, IcAfter, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${
                wfull && "w-full"
            } flex items-center justify-center px-4 pt-1 pb-2 ${textColor} outline-none rounded-md ${bgColor} hover:underline`}
        >
            <span>{text}</span>
            <span>{IcAfter && <IcAfter className=" mt-[5px] ml-1" />}</span>
        </button>
    );
};

export default memo(Button);
