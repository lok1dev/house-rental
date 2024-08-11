import React, { useState } from "react";
import { apiUpdateImages } from "../../../services/post";

const InputImages = ({ icon, label, name, type, payload, setPayload }) => {
    const [imagesPreview, setImagesPreview] = useState([]);
    const handleFiles = async (e) => {
        e.stopPropagation();
        let images = [...payload.images];
        let files = e.target.files;
        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
            const response = await apiUpdateImages(formData);
            if (response.status === 200) images = [...images, response?.data?.secure_url];
        }
        setImagesPreview(images);
        setPayload({ ...payload, images: JSON.stringify(images) });
    };

    return (
        <div>
            <div className="flex flex-col gap-2 w-full h-40 border-2 border-dashed border-blue-400 mt-6">
                <label
                    htmlFor={name}
                    className="text-xl mt-4 flex flex-col justify-center items-center cursor-pointer"
                >
                    {icon}
                    {label}
                </label>
                <input id={name} type={type} onChange={handleFiles} hidden multiple />
            </div>
            <div>
                <h3 className="p-4 font-bold">Preview</h3>
                <div className=" flex gap-4">
                    {imagesPreview?.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={item}
                                alt="preview-images"
                                className="size-40 object-cover border border-dashed border-gray-600 p-1"
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InputImages;
