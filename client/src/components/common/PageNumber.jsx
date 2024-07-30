import { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const notActive =
    "w-[46px] h-[48px] flex items-center justify-center shadow bg-white hover:bg-gray-400  rounded-md";
const active =
    "w-[46px] h-[48px] flex items-center justify-center shadow bg-[#E13427] hover:opacity-80 text-white rounded-md";

const PageNumber = ({ text, icon, currentPage, setCurrentPage }) => {
    const navigate = useNavigate();

    const handleChangePage = () => {
        if (!(text === "...")) {
            setCurrentPage(+text);
            navigate({
                pathname: "/",
                search: `?${createSearchParams({ page: text }).toString()}`,
            });
        }
    };

    return (
        <div
            className={
                +text === +currentPage
                    ? active
                    : `${notActive} ${!(text === "...") && "cursor-pointer"}`
            }
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    );
};

export default memo(PageNumber);
