import { memo } from "react";

const SearchItem = ({ iconBefore, iconAfter, text, fontWeight, textDefault }) => {
    return (
        <div className="w-full h-1/2 bg-white px-3 py-2  my-2 rounded-lg text-xs flex items-center text-gray-400 justify-between ">
            <div className="flex gap-2 items-center">
                {iconBefore}
                <p
                    className={`${fontWeight && `font-bold text-black`} ${
                        text && "font-bold text-black"
                    }  overflow-hidden text-ellipsis `}
                >
                    {text || textDefault}
                </p>
            </div>
            {iconAfter}
        </div>
    );
};

export default memo(SearchItem);
