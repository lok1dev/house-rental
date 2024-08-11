import { memo } from "react";

import { Button } from "../common";
import { dataContact } from "../../constants";

const Contact = () => {
    return (
        <div className="w-full shadow-sm border border-gray-400 rounded-md flex flex-col items-center space-y-6 px-[6%] py-[4%] text-center mt-10">
            <img src={dataContact?.img} alt="images" className="w-[60%]" />
            <p>{dataContact?.description}</p>
            <div className="flex justify-between w-full px-[5%]">
                {dataContact?.contact.map((item) => {
                    return (
                        <div key={item.title} className="flex flex-col">
                            <span className="text-orange-500 font-bold text-sm">
                                {item.title.toUpperCase()}
                            </span>
                            <span className="text-blue-950 font-bold text-lg">{`Điện thoại: ${item.phone}`}</span>
                            <span className="text-blue-950 font-bold text-lg">{`Zalo: ${item.zalo}`}</span>
                        </div>
                    );
                })}
            </div>
            <Button text={"Gửi liên hệ"} textColor={"text-white"} bgColor={"bg-blue-500"} />
        </div>
    );
};

export default memo(Contact);
