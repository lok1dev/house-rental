import React from "react";
import { Button } from "../common";
import icons from "../../utils/icons";
import { blobToString } from "../../utils";

const { SiZalo, FaRegHeart, FaPhoneVolume } = icons;

const BoxInfo = ({ userInfo }) => {
    const imgAvatar = userInfo?.avatar && blobToString(userInfo?.avatar);

    return (
        <div className="bg-yellow-400 p-4 flex flex-col gap-3 items-center">
            <img src={imgAvatar || "/user.png"} className="rounded-full size-20" alt="" />
            <p className="font-bold text-xl">{userInfo?.name}</p>
            <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <p>Đang hoạt động</p>
            </div>
            <Button
                IcBefore={FaPhoneVolume}
                text={userInfo?.phone}
                widthFull
                textColor="text-white"
                bgColor="bg-green-500"
            />
            <a href={`http://zalo.me/${userInfo?.phone}`} className="w-full">
                <Button text="Nhắn Zalo" IcBefore={SiZalo} widthFull bgColor="bg-white" />
            </a>
            <Button text="Yêu thích" IcBefore={FaRegHeart} widthFull bgColor="bg-white" />
        </div>
    );
};

export default BoxInfo;
