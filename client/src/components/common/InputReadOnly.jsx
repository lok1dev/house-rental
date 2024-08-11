import React, { memo } from "react";

const InputReadOnly = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-2 ">
            <label htmlFor="exactly-address" className="font-medium">
                {label}
            </label>
            <input
                id="exactly-address"
                type="text"
                readOnly
                className="border border-gray-200 bg-gray-100 w-full rounded-md outline-none cursor-default p-2"
                value={value}
            />
        </div>
    );
};

export default memo(InputReadOnly);
