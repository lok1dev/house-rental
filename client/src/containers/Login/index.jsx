import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Button, InputForm } from "../../components/common";
import * as actions from "../../store/actions";
import { validateFields } from "../../utils";

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);

    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        phone: "",
        name: "",
        password: "",
    });

    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        isLoggedIn && navigate("/");
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        msg && Swal.fire("Oops !", msg, "error");
    }, [msg, update]);

    const handleSubmit = async () => {
        let finalInvalid = isRegister
            ? payload
            : {
                  phone: payload.phone,
                  password: payload.password,
              };
        let invalids = validateFields(finalInvalid, setInvalidFields);
        if (invalids === 0)
            isRegister
                ? dispatch(actions.register(payload))
                : dispatch(actions.login(payload));
    };

    return (
        <div className="bg-white min-w-[600px] p-[30px] pb-[100px] rounded-md border shadow space-y-8 mt-6">
            <h3 className="font-bold text-2xl">
                {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
            </h3>
            <div className="w-full space-y-4">
                {isRegister && (
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={"HỌ TÊN"}
                        value={payload.name}
                        setValue={setPayload}
                        keyPayload={"name"}
                    />
                )}
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={"SỐ ĐIỆN THOẠI"}
                    value={payload.phone}
                    setValue={setPayload}
                    keyPayload={"phone"}
                />
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={"MẬT KHẨU"}
                    setValue={setPayload}
                    keyPayload={"password"}
                    type={"password"}
                />
                <Button
                    text={isRegister ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
                    textColor={"text-white"}
                    bgColor={"bg-blue-600"}
                    widthFull
                    onClick={handleSubmit}
                />
            </div>
            <div className="flex items-center justify-between">
                {isRegister ? (
                    <p>
                        Bạn đã có tài khoản{" "}
                        <span
                            className="text-blue-500 hover:text-orange-500 cursor-pointer hover:underline"
                            onClick={() => {
                                setIsRegister(false);
                                setPayload({
                                    phone: "",
                                    name: "",
                                    password: "",
                                });
                            }}
                        >
                            Đăng nhập ngay
                        </span>
                    </p>
                ) : (
                    <>
                        {" "}
                        <span className="text-blue-500 hover:text-orange-500 cursor-pointer">
                            Bạn quên mật khẩu?
                        </span>
                        <p
                            className="text-blue-500 hover:text-orange-500 cursor-pointer"
                            onClick={() => {
                                setIsRegister(true);
                                setPayload({
                                    phone: "",
                                    name: "",
                                    password: "",
                                });
                            }}
                        >
                            Tạo tài khoản mới
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
