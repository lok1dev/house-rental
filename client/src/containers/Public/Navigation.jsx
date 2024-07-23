import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../utils/constant";

const nav = [
  { name: "Trang chủ", path: "/" },
  { name: "Cho thuê phòng trọ", path: "/cho-thue-phong-tro" },
  { name: "Nhà cho thuê", path: "/nha-cho-thue" },
  { name: "Cho thuê căn hộ", path: "/cho-thue-can-ho" },
  { name: "Mặt bằng", path: "/mat-bang" },
];

const active = "bg-third py-2 px-3";
const notActive = "py-2 px-3 hover:hover:bg-third";

const Navigation = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-screen min-h-[40px] bg-blue-500 flex items-center justify-center">
      <div className="w-3/5 flex items-center text-white">
        <NavLink
          className={({ isActive }) => (isActive ? active : notActive)}
          to={`/`}
        >
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
