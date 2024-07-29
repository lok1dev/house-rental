import { useCallback, useEffect, useRef } from "react";
import logo from "../../assets/Images/home.png";
import { Button } from "../../components";
import icons from "../../utils/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const { CiCirclePlus } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

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
    <div
      ref={headerRef}
      className="w-3/5 flex items-center justify-between py-2"
    >
      <img
        src={logo}
        alt=""
        className="w-[240px] object-container h-[50px] cursor-pointer"
        onClick={goHome}
      />
      <div className="space-x-2 mr-2 flex items-center justify-center">
        {!isLoggedIn && (
          <div className="flex items-center gap-2">
            <p className="text-sm">Phongtro123.com xin chào !</p>
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
          <div className="flex items-center gap-2">
            <p className="text-sm">Tên !</p>
            <Button
              text="Đăng xuất"
              textColor="text-white"
              bgColor="bg-red-700"
              onClick={() => dispatch(actions.logout())}
            />
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
