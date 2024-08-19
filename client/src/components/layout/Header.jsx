import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../common";
import { User } from "./";
import { path, userMenu } from "../../constants";
import icons from "../../utils/icons";
import * as actions from "../../store/actions";

const { CiCirclePlus, CiLogout, FaChevronDown } = icons;

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const headerRef = useRef();

    const { isLoggedIn } = useSelector((state) => state.auth);

    const [searchParams] = useSearchParams();
    const [isShowMenu, setIsShowMenu] = useState(false);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    });
    const goHome = useCallback(() => {
        navigate("/");
    });

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [searchParams.get("page")]);

    return (
        <div ref={headerRef} className="w-3/5 flex items-center justify-between py-2">
            <img
                src="/home.png"
                alt=""
                className="w-[120px] object-container h-[50px] cursor-pointer"
                onClick={goHome}
            />
            <div className="space-x-2 mr-2 flex items-center justify-center">
                {!isLoggedIn && (
                    <div className="flex items-center gap-2">
                        <p className="text-sm">Rent-house xin chào !</p>
                        <Button
                            text="Đăng nhập"
                            textColor="text-white"
                            bgColor="bg-blue-500"
                            onClick={() => goLogin(false)}
                        />
                        <Button
                            text="Đăng ký"
                            textColor="text-white"
                            bgColor="bg-blue-500"
                            onClick={() => goLogin(true)}
                        />
                    </div>
                )}
                {isLoggedIn && (
                    <div className="flex items-center gap-2 relative">
                        <User />
                        <Button
                            text="Quản lý tài khoản"
                            textColor="text-white"
                            bgColor="bg-blue-500"
                            IcAfter={FaChevronDown}
                            size={12}
                            onClick={() => setIsShowMenu((prev) => !prev)}
                        />
                        {isShowMenu && (
                            <div className="absolute top-11 right-0 min-w-44 border bg-white shadow rounded-md flex flex-col px-4 text-blue-500">
                                {userMenu.map((item) => {
                                    return (
                                        <div
                                            key={item?.id}
                                            className="border-b border-gray-200 py-2 hover:text-orange-500 "
                                        >
                                            <Link
                                                to={item?.path}
                                                className="flex items-center gap-2"
                                            >
                                                {item?.icon}
                                                {item?.text}
                                            </Link>
                                        </div>
                                    );
                                })}
                                <span
                                    className="border-b border-gray-200 py-2 cursor-pointer hover:text-orange-500 flex items-center gap-2"
                                    onClick={() => {
                                        dispatch(actions.logout());
                                        setIsShowMenu(false);
                                    }}
                                >
                                    <CiLogout />
                                    Đăng xuất
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <Button
                    text="Đăng tin mới"
                    textColor="text-white"
                    bgColor="bg-red-500"
                    IcAfter={CiCirclePlus}
                />
            </div>
        </div>
    );
};

export default Header;
