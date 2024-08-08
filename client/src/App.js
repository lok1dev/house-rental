import { Routes, Route } from "react-router-dom";

import { Home, Login, Homepage, Rental, DetailPost, SearchDetail } from "./components/pages";
import { path } from "./utils/constant";

function App() {
    return (
        <div className="h-screen w-screen bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path="*" element={<Homepage />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.MAT_BANG} element={<Rental />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rental />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                    <Route path={"chi-tiet/*"} element={<DetailPost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
