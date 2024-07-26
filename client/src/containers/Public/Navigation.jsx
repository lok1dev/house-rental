import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";

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
    <div className="w-screen bg-blue-500 flex items-center justify-center">
      <div className="w-4/5 flex items-center text-white font-semibold text-sm">
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
