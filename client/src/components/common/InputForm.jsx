import { memo } from "react";

const InputForm = ({
    label,
    value,
    setValue,
    type,
    invalidFields,
    setInvalidFields,
    keyPayload,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs">
                {label}
            </label>
            <input
                type={type || "text"}
                id="phone"
                className="outline-none bg-[#E8F0FE] p-3 rounded-md"
                value={value}
                onChange={(e) => setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some((i) => i.name === keyPayload) && (
                <small className="text-red-500 italic">
                    {invalidFields.find((i) => i.name === keyPayload)?.message}
                </small>
            )}
        </div>
    );
};

export default memo(InputForm);
