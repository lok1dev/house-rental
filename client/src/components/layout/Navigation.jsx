import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { formatVietnameseToString } from "../../utils/Common";
import * as actions from "../../store/actions";

const active = "bg-third py-2 px-3";
const notActive = "py-2 px-3 hover:hover:bg-third";

const Navigation = () => {
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.getCategories());
    }, []);

    return (
        <div className="w-screen  flex items-center justify-center bg-blue-600">
            <div className="w-3/5 flex items-center text-white font-semibold text-sm  ">
                <NavLink className={({ isActive }) => (isActive ? active : notActive)} to={`/`}>
                    Trang chủ
                </NavLink>
                {categories?.length > 0 &&
                    categories.map((item) => {
                        return (
                            <div key={item.code}>
                                <NavLink
                                    className={({ isActive }) => (isActive ? active : notActive)}
                                    to={`${formatVietnameseToString(item.value)}`}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Navigation;
