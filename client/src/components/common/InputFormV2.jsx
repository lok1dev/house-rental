import React, { memo } from "react";

const InputFormV2 = ({
    label,
    unit,
    small,
    value,
    setValue,
    name,
    invalidFields,
    setInvalidFields,
    isFlexRow,
}) => {
    return (
        <div className={`flex ${!isFlexRow && "flex-col"} gap-2 w-full`}>
            <label htmlFor={name} className="font-medium w-48 flex-none">
                {label}
            </label>
            <div className="flex flex-auto">
                <input
                    type="text"
                    id={name}
                    className="p-2 outline-none border border-gray-200 rounded-tl-md rounded-bl-md flex-auto"
                    value={value}
                    onFocus={() => setInvalidFields && setInvalidFields([])}
                    onChange={(e) => {
                        setValue((prev) => ({
                            ...prev,
                            [name]: e.target.value,
                        }));
                    }}
                />
                {unit && (
                    <span className="p-[9px] bg-gray-200 right-0 rounded-tr-md rounded-br-md">
                        {unit}
                    </span>
                )}
            </div>
            {small && <small>{small}</small>}
            <small className="text-red-500">
                {invalidFields &&
                    invalidFields?.some((item) => item?.name === name) &&
                    invalidFields &&
                    invalidFields?.find((item) => item?.name === name)?.message}
            </small>
        </div>
    );
};

export default memo(InputFormV2);
