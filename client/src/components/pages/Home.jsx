import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import * as actions from "../../store/actions";
import { Search, Header, Navigation, Intro, Contact } from "../layout/index";

const Home = () => {
    const dispatch = useDispatch();

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
                <Search />
                <Outlet />
                <Intro />
                <Contact />
            </div>
        </div>
    );
};

export default Home;
