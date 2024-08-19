import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Button, InputFormV2, InputReadOnly } from "../../../components/common";
import { apiUpdateUser } from "../../../services";
import { fileToBase64, blobToString } from "../../../utils";
import * as actions from "../../../store/actions";

const EditProfile = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);
    const id = currentData?.id?.split("-")[0];
    const [payload, setPayload] = useState({
        name: currentData?.name || "",
        zalo: currentData?.zalo || "",
        avatar: (currentData?.avatar && blobToString(currentData?.avatar)) || "",
        fbUrl: currentData?.fbUrl || "",
    });

    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload);
        if (response?.data.err === 0) {
            Swal.fire("Thành công", "Update tài khoản thành công !", "success").then(
                () => {
                    dispatch(actions.getCurrent());
                }
            );
        } else {
            Swal.fire("Opps!", "Update tài khoản thất bại !", "error");
        }
    };

    const handleUpload = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0]);
        setPayload((prev) => ({
            ...prev,
            avatar: imageBase64,
        }));
    };

    return (
        <div className="px-6">
            <h1 className="text-2xl font-medium py-4 border-b border-gray-200">
                Sửa thông tin cá nhân
            </h1>
            <div className="flex justify-center min-h-screen">
                <div className="w-3/5 mt-10 space-y-6">
                    <InputReadOnly
                        label="Mã thành viên"
                        value={`#${id}` || ""}
                        isFlexRow
                    />
                    <InputReadOnly
                        label="Số điện thoại"
                        value={currentData?.phone || ""}
                        isFlexRow
                    />
                    <InputFormV2
                        label="Tên hiển thị"
                        value={payload.name}
                        setValue={setPayload}
                        name="name"
                        isFlexRow
                    />
                    <InputFormV2
                        label="Zalo"
                        value={payload.zalo}
                        setValue={setPayload}
                        name="zalo"
                        isFlexRow
                    />
                    <InputFormV2
                        label="Facebook"
                        value={payload.fbUrl}
                        setValue={setPayload}
                        name="fbUrl"
                        isFlexRow
                    />
                    <div className="flex items-center gap-2 ">
                        <span className="w-48 flex-none font-medium">Mật khẩu</span>
                        <small className="flex-auto text-blue-400">Đổi mật khẩu</small>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <span className="w-48 flex-none font-medium">Ảnh đại diện</span>
                        <div className="flex-auto">
                            <img
                                src={payload.avatar || "/user.png"}
                                alt=""
                                className="size-20 object-cover rounded-full"
                            />
                            <input
                                type="file"
                                name=""
                                alt="avatar"
                                onChange={handleUpload}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <Button
                        text="Sửa thông tin"
                        textColor="text-white"
                        bgColor="bg-blue-400"
                        widthFull
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
