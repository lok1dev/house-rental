import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { path } from "../../constants";
import { Header, Sidebar } from "../../components/System";

const System = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    return (
        <div className="w-full flex flex-col items-center ">
            <Header />
            <div className="flex w-full pb-20 ">
                <Sidebar />
                <div className="flex-auto bg-white pt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default System;
