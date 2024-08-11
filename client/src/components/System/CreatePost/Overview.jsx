import { memo } from "react";
import { useSelector } from "react-redux";

import { InputFormV2 } from "./";
import { InputReadOnly, Select } from "../../common";

const target = [
    { id: "male", value: "Nam" },
    { id: "female", value: "Nữ" },
];

const Overview = ({ payload, setPayload }) => {
    const { categories } = useSelector((state) => state.app);
    const { currentData } = useSelector((state) => state.user);

    return (
        <div>
            <h2 className="font-bold text-xl py-4 mt-2">Thông tin mô tả</h2>
            <div className="space-y-6 w-full">
                <div className="w-1/2">
                    <Select
                        label="Loại chuyên mục"
                        name="categoryCode"
                        value={payload.categoryCode}
                        setValue={setPayload}
                        options={categories}
                        type="categories"
                    />
                </div>
                <InputFormV2
                    label="Tiêu đề"
                    value={payload.title}
                    setValue={setPayload}
                    name="title"
                />
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium">
                        Nội dung mô tả
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        rows={10}
                        className="p-2 outline-none border border-gray-200 rounded-md"
                        value={payload.description}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="w-1/2 space-y-6">
                    <InputReadOnly
                        label="Tên người đăng"
                        value={currentData?.name || currentData?.username || ""}
                    />
                    <InputReadOnly label="Số điện thoại" value={currentData?.phone || ""} />
                    <InputFormV2
                        label="Giá cho thuê"
                        unit="đồng"
                        small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                        name="priceNumber"
                        value={payload.priceNumber}
                        setValue={setPayload}
                    />
                    <InputFormV2
                        label="Diện tích"
                        unit="m2"
                        name="acreageNumber"
                        value={payload.acreageNumber}
                        setValue={setPayload}
                    />
                    <Select
                        label="Giới tính"
                        options={target}
                        type="target"
                        name="target"
                        value={payload.target}
                        setValue={setPayload}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(Overview);
