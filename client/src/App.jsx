import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "./store/actions";
import { path } from "./constants";
import AppLayout from "./layouts/AppLayout";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Rental from "./containers/Rental";
import SearchDetail from "./containers/SearchDetail";
import DetailPost from "./containers/DetailPost";
import System from "./containers/System";
import CreatePost from "./containers/System/CreatePost";
import ManagerPost from "./containers/System/ManagerPost";
import EditProfile from "./containers/System/EditProfile";

function App() {
   const dispatch = useDispatch();
   const { isLoggedIn } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(actions.getPrices());
      dispatch(actions.getAcreage());
      dispatch(actions.getProvinces());
   }, []);

   useEffect(() => {
      setTimeout(() => {
         isLoggedIn && dispatch(actions.getCurrent());
      }, 1000);
   }, [isLoggedIn]);

   return (
      <div className="h-screen w-screen bg-primary">
         <Routes>
            <Route path={path.HOME} element={<AppLayout />}>
               <Route path={"*"} element={<Home />} />
               <Route path={path.LOGIN} element={<Login />} />
               <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
               <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
               <Route path={path.MAT_BANG} element={<Rental />} />
               <Route path={path.NHA_CHO_THUE} element={<Rental />} />
               <Route path={path.SEARCH} element={<SearchDetail />} />
               <Route path={"chi-tiet/*"} element={<DetailPost />} />
            </Route>

            <Route path={path.SYSTEM} element={<System />}>
               <Route path={path.CREATE_POST} element={<CreatePost />} />
               <Route path={path.MANAGER_POST} element={<ManagerPost />} />
               <Route path={path.EDIT_PROFILE} element={<EditProfile />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
