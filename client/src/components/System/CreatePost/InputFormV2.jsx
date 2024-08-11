import React, { memo } from "react";

const InputFormV2 = ({ label, unit, small, value, setValue, name }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={name} className="font-medium">
                {label}
            </label>
            <div className="flex">
                <input
                    type="text"
                    id={name}
                    className="p-2 outline-none border border-gray-200 rounded-tl-md rounded-bl-md flex-auto"
                    value={value}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            [name]: e.target.value,
                        }))
                    }
                />
                {unit && (
                    <span className="p-[9px] bg-gray-200 right-0 rounded-tr-md rounded-br-md">
                        {unit}
                    </span>
                )}
            </div>
            {small && <small>{small}</small>}
        </div>
    );
};

export default memo(InputFormV2);
