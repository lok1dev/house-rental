import { memo } from "react";

const Select = ({
    type,
    label,
    options,
    value,
    setValue,
    reset,
    name,
    invalidFields,
    setInvalidFields,
}) => {
    const idData = (item) => {
        if (type === "province") return item?.province_id;
        if (type === "district") return item?.district_id;
        if (type === "categories") return item?.code;
        if (type === "target") return item?.value;
        return item?.id;
    };

    const nameData = (item) => {
        if (type === "province") return item?.province_name;
        if (type === "district") return item?.district_name;
        if (type === "categories") return item?.value;
        return item?.value;
    };

    const handleChange = (e) => {
        if (!name) return setValue(e.target.value);
        return setValue((prev) => ({
            ...prev,
            [name]: e.target.value,
        }));
    };

    const handleInvalidAddress = () => {
        const nameInvalid = invalidFields?.find((item) => item?.name === name);
        const addressInvalid = invalidFields?.find((item) => item?.name === "address");

        return (
            `${nameInvalid ? nameInvalid.message : ""}` ||
            `${addressInvalid ? addressInvalid.message : ""}`
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={type} className="font-medium">
                {label}
            </label>
            <select
                value={reset ? "" : value !== null ? value : ""}
                onChange={(e) => handleChange(e)}
                onFocus={() => setInvalidFields([])}
                id={type}
                className="outline-none border border-gray-200 rounded-md p-2"
            >
                <option value="">-- Chọn {label} --</option>
                {options?.map((item) => {
                    return (
                        <option key={idData(item)} value={idData(item)}>
                            {nameData(item)}
                        </option>
                    );
                })}
            </select>
            {invalidFields && (
                <small className="text-red-500">{handleInvalidAddress()}</small>
            )}
        </div>
    );
};

export default memo(Select);
