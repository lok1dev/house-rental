import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import * as actions from "../store/actions";
import { Search, Header, Navigation, Intro, Contact } from "../components/layout/index";

const AppLayout = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAcreage());
        dispatch(actions.getProvinces());
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center ">
            <Header />
            <Navigation />
            <div className="w-3/5 flex justify-center items-center flex-col">
                {isLoggedIn && <Search />}
                <Outlet />
                <Intro />
                <Contact />
            </div>
        </div>
    );
};

export default AppLayout;
