import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { menuManager } from "../../constants";
import * as actions from "../../store/actions";
import icons from "../../utils/icons";

const { CiLogout } = icons;

const Sidebar = () => {
    const { currentData } = useSelector((state) => state.user);
    const dispatch = useDispatch((state) => state.auth);
    const idUser = currentData?.id?.split("-")[0];
    const activeStyle = "flex items-center gap-2 font-semibold";
    const notActiveStyle = "flex items-center gap-2 hover:bg-gray-200 ";

    return (
        <div className="w-[256px] pl-10 pt-4 space-y-8">
            <div>
                <div className="flex items-center gap-4">
                    <img src="/user.png" alt="" className="size-10 object-contain" />
                    <div>
                        <p className="font-bold">{currentData.name}</p>
                        <p className="text-sm">{currentData.phone}</p>
                    </div>
                </div>
                <p className="mt-2">
                    Mã thành viên: <strong>{idUser}</strong>
                </p>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                {menuManager.map((item) => {
                    return (
                        <div key={item.id}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? activeStyle : notActiveStyle
                                }
                            >
                                {item.icon}
                                {item.text}
                            </NavLink>
                        </div>
                    );
                })}
                <span
                    className={`${notActiveStyle} cursor-pointer`}
                    onClick={() => {
                        dispatch(actions.logout());
                    }}
                >
                    <CiLogout />
                    Đăng xuất
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
