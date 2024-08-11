import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { path } from "./constants";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages";
import DetailPage from "./pages/chi-tiet";
import LoginPage from "./pages/dang-nhap";
import RentalPage from "./pages/rental";
import SearchDetailPage from "./pages/tim-kiem";
import SystemPage from "./pages/he-thong";
import CreatePostPage from "./pages/he-thong/dang-tin";

import * as actions from "./store/actions";

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrent());
        }, 1000);
    }, [isLoggedIn]);

    return (
        <div className="h-screen w-screen bg-primary">
            <Routes>
                <Route path={path.HOME} element={<AppLayout />}>
                    <Route path={"*"} element={<HomePage />} />
                    <Route path={path.LOGIN} element={<LoginPage />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<RentalPage />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalPage />} />
                    <Route path={path.MAT_BANG} element={<RentalPage />} />
                    <Route path={path.NHA_CHO_THUE} element={<RentalPage />} />
                    <Route path={path.SEARCH} element={<SearchDetailPage />} />
                    <Route path={"chi-tiet/*"} element={<DetailPage />} />
                </Route>

                <Route path={path.SYSTEM} element={<SystemPage />}>
                    <Route path={path.CREATE_POST} element={<CreatePostPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
