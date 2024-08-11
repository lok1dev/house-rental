import { useState } from "react";

import { Address, InputImages, Overview } from "../../../components/System/CreatePost";
import icons from "../../../utils/icons";

const { IoCameraOutline } = icons;

const CreatePost = () => {
    const [payload, setPayload] = useState({
        categoryCode: "",
        title: "",
        priceNumber: 0,
        acreageNumber: 0,
        images: "",
        address: "",
        priceCode: "",
        acreageCode: "",
        description: "",
        target: "",
        province: "",
    });

    console.log(payload);

    return (
        <div className="px-6">
            <h1 className="text-2xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h1>
            <div className="flex">
                <div className="flex flex-col gap-4 flex-auto">
                    <Address setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <InputImages
                        label="Chọn hình ảnh"
                        type="file"
                        name="images"
                        icon={<IoCameraOutline size={80} />}
                        payload={payload}
                        setPayload={setPayload}
                    />
                </div>
                <div className="w-1/3">Map</div>
            </div>
        </div>
    );
};

export default CreatePost;
