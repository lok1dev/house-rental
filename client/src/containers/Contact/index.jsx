import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../components/common";

const Contact = () => {
    const [payload, setPayload] = useState({
        name: "",
        phone: "",
        description: "",
    });

    const handleSubmit = () => {
        Swal.fire(
            "Thành công",
            "Thông tin liên hệ của bạn đã được ghi nhận",
            "success"
        ).then(() => {
            setPayload({
                name: "",
                phone: "",
                description: "",
            });
        });
    };
    return (
        <div className="w-full pt-2 space-y-4">
            <h1 className="font-bold text-2xl">Liên hệ với chúng tôi</h1>
            <div className="flex gap-8">
                <div className="max-w-[50%] text-white bg-gradient-to-br from-blue-700 to-cyan-400 rounded-3xl p-6 space-y-4">
                    <h2 className="font-bold text-xl">Thông tin liên hệ</h2>
                    <p>
                        Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã
                        lựa chọn house-rental.Com
                    </p>
                    <p>
                        <strong>Điện thoại:</strong> 0123 456 789
                    </p>
                    <p>
                        <strong>Email:</strong> cskh.house-rental@gmail.com
                    </p>
                    <p>
                        <strong>Zalo:</strong> 0123 456 789
                    </p>
                    <p>
                        <strong>Viber:</strong> 0123 456 789
                    </p>
                    <p>
                        <strong> Địa chỉ:</strong> Quận 12, Thành phố Hồ Chí Minh, Việt
                        Nam
                    </p>
                </div>
                <div className="max-w-[50%] w-full p-6 border border-gray-600 rounded-lg bg-white">
                    <h2 className="font-bold text-xl">Liên hệ trực tuyến</h2>
                    <div className="space-y-4 mt-6 ">
                        <InputForm
                            label="TÊN CỦA NGƯỜI LIÊN HỆ"
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload="name"
                        />
                        <InputForm
                            label="SỐ ĐIỆN THOẠI LIÊN HỆ"
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload="phone"
                        />
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc" className="text-xs">
                                NỘI DUNG
                            </label>
                            <textarea
                                name="desc"
                                id="desc"
                                className="outline-none bg-[#E8F0FE] p-3 rounded-md"
                                onChange={(e) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                value={payload.description}
                            ></textarea>
                        </div>
                        <Button
                            text="Gửi thông tin"
                            textColor="text-white"
                            bgColor="bg-blue-500"
                            widthFull
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
