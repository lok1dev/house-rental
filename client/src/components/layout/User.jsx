import { memo } from "react";
import { useSelector } from "react-redux";

const User = () => {
    const { currentData } = useSelector((state) => state.user);
    const id = currentData?.id?.split("-")[0];

    return (
        <div className="flex items-center gap-3 mr-2">
            <img src="/user.png" alt="avatar" className="size-7 object-cover mt-1" />
            <div>
                <p>
                    Xin chào, <strong>{currentData?.name}</strong>
                </p>
                <div>
                    <p className="text-xs">
                        Mã tài khoản: <strong>{id}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(User);
