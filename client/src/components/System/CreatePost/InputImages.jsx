import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { apiUpdateImages } from "../../../services/post";
import icons from "../../../utils/icons";

const { MdDeleteOutline } = icons;

const InputImages = ({
    icon,
    label,
    name,
    type,
    payload,
    setPayload,
    invalidFields,
    setInvalidFields,
}) => {
    const { dataEdit } = useSelector((state) => state.post);
    const [loading, setLoading] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (dataEdit) {
            let images = dataEdit?.images?.image && JSON.parse(dataEdit?.images?.image);
            images && setImagesPreview(images);
        }
    }, [dataEdit]);

    const handleFiles = async (e) => {
        e.stopPropagation();
        let images = [...payload.images];
        let files = e.target.files;
        const formData = new FormData();
        setLoading(true);
        for (let i of files) {
            formData.append("file", i);
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
            const response = await apiUpdateImages(formData);
            if (response.status === 200) images = [...images, response?.data?.secure_url];
        }
        setLoading(false);
        setImagesPreview([...images]);
        setPayload((prev) => ({ ...prev, images: [...images] }));

        if (images.length > 0) {
            setInvalidFields([]);
        }
    };

    const handleDeleteImage = (image) => {
        setImagesPreview((prev) => prev?.filter((item) => item !== image));
        setPayload((prev) => ({
            ...prev,
            images: prev?.images?.filter((item) => item !== image),
        }));
    };

    return (
        <div>
            <div className="flex flex-col gap-2 w-full h-40 border-2 border-dashed border-blue-400 mt-6">
                <label
                    htmlFor={name}
                    className="text-xl mt-4 flex justify-center items-center cursor-pointer"
                >
                    {loading ? (
                        <span className="mt-8">
                            <HashLoader color="blue" />
                        </span>
                    ) : (
                        <span className="flex flex-col items-center">
                            {icon}
                            {label}
                        </span>
                    )}
                </label>
                <input id={name} type={type} onChange={handleFiles} hidden multiple />
            </div>
            <small className="text-red-500 ">
                {invalidFields &&
                    invalidFields?.some((item) => item?.name === name) &&
                    invalidFields &&
                    invalidFields?.find((item) => item?.name === name)?.message}
            </small>
            <div className="w-full">
                <h3 className="py-4 font-bold">Preview</h3>
                <div className="flex gap-4 flex-wrap">
                    {imagesPreview?.map((item, index) => {
                        return (
                            <div className="relative" key={index}>
                                <div
                                    className="absolute p-1 bg-black rounded-full bg-opacity-50 right-2 top-2 cursor-pointer"
                                    onClick={() => handleDeleteImage(item)}
                                >
                                    <MdDeleteOutline color="red" />
                                </div>
                                <img
                                    src={item}
                                    alt="preview-images"
                                    className="size-40 object-cover border border-dashed border-gray-600 p-1 "
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InputImages;
