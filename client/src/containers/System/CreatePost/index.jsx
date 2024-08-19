import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Address, InputImages, Overview } from "../../../components/System/CreatePost";
import icons from "../../../utils/icons";
import { Button } from "../../../components/common";
import { getPriceCode, getAcreageCode } from "../../../utils";
import { apiCreatePost, apiUpdatePost } from "../../../services";
import { validateFields } from "../../../utils";
import * as actions from "../../../store/actions";

const { IoCameraOutline } = icons;

const CreatePost = ({ isEdit, setIsEdit }) => {
    const { dataEdit } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.categoryCode || "",
            title: dataEdit?.title || "",
            priceNumber: dataEdit?.priceNumber * 1000000 || 0,
            acreageNumber: dataEdit?.acreageNumber || 0,
            images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : "",
            address: dataEdit?.address || "",
            priceCode: dataEdit?.priceCode || "",
            acreageCode: dataEdit?.acreageCode || "",
            description: dataEdit?.description ? JSON.parse(dataEdit?.description) : "",
            target: dataEdit?.overviews?.target || "",
            province: dataEdit?.province || "",
        };
        return initData;
    });

    const { currentData } = useSelector((state) => state.user);
    const [invalidFields, setInvalidFields] = useState([]);
    const { prices, acreage, categories, provinces } = useSelector((state) => state.app);

    const initPayload = {
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
        userId: "",
        label: "",
    };

    const handleSubmit = async () => {
        let priceCodeArr = getPriceCode(
            +payload.priceNumber / Math.pow(10, 6),
            prices,
            1,
            15
        );
        let priceCode = priceCodeArr[0]?.code;
        let acreageCodeArr = getAcreageCode(+payload.acreageNumber, acreage, 0, 90);
        let acreageCode = acreageCodeArr[0]?.code;

        const finalPayload = {
            ...payload,
            priceCode,
            acreageCode,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            userId: currentData?.id,
            target: payload.target || "Tất cả",
            description: payload.description,
            label: `${
                categories?.find((item) => item.code === payload?.categoryCode)?.value
            } ${payload?.address?.split(",")[0]}`,
        };

        const result = validateFields(finalPayload, setInvalidFields);
        if (result === 0) {
            if (dataEdit && isEdit) {
                finalPayload.postId = dataEdit?.id;
                finalPayload.attributesId = dataEdit?.attributesId;
                finalPayload.imagesId = dataEdit?.imagesId;
                finalPayload.overviewId = dataEdit?.overviewId;

                const response = await apiUpdatePost(finalPayload);
                if (response?.data.err === 0) {
                    Swal.fire(
                        "Thành công",
                        "Update bài đăng thành công!",
                        "success"
                    ).then(() => {
                        setPayload(initPayload);
                    });
                    setIsEdit(false);
                    dispatch(actions.resetEditData());
                } else {
                    Swal.fire(
                        "Thất bại",
                        "Có lỗi gì đó xảy ra, hãy kiểm tra lại !",
                        "error"
                    );
                }
            } else {
                const response = await apiCreatePost(finalPayload);
                if (response?.data.err === 0) {
                    Swal.fire(
                        "Thành công",
                        "Bài viết đã được đăng thành công !",
                        "success"
                    ).then(() => {
                        setPayload(initPayload);
                    });
                } else {
                    Swal.fire(
                        "Thất bại",
                        "Có lỗi gì đó xảy ra, hãy kiểm tra lại !",
                        "error"
                    );
                }
            }
        }
    };

    return (
        <div className="px-6">
            <h1 className="text-2xl font-medium py-4 border-b border-gray-200">
                {isEdit ? "Chỉnh sửa bài viết" : "Đăng bài viết"}
            </h1>
            <div className="flex">
                <div className="flex flex-col gap-4 flex-auto">
                    <Address
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Overview
                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputImages
                        label="Chọn hình ảnh"
                        type="file"
                        name="images"
                        icon={<IoCameraOutline size={80} />}
                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className="font-bold" onClick={handleSubmit}>
                        <Button
                            widthFull
                            text={isEdit ? "Chỉnh sửa bài viết" : "Đăng bài"}
                            bgColor="bg-green-400"
                            textColor="text-white"
                        />
                    </div>
                </div>
                <div className="w-1/3">Map</div>
            </div>
        </div>
    );
};

export default CreatePost;
