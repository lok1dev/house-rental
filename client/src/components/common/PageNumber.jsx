import { memo } from "react";
import { createSearchParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";

const notActive =
    "w-[46px] h-[48px] flex items-center justify-center shadow bg-white hover:bg-gray-400  rounded-md";
const active =
    "w-[46px] h-[48px] flex items-center justify-center shadow bg-[#E13427] hover:opacity-80 text-white rounded-md";

const PageNumber = ({ text, icon, currentPage, setCurrentPage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paramsSearch] = useSearchParams();
    let entries = paramsSearch.entries();

    const append = (entries) => {
        let params = [];
        paramsSearch.append("page", +text);
        for (let entry of entries) {
            params.push(entry);
        }

        let a = {};
        params?.map((i) => {
            return (a = { ...a, [i[0]]: i[1] });
        });
        return a;
    };

    const handleChangePage = () => {
        if (!(text === "...")) {
            setCurrentPage(+text);
            navigate({
                pathname: location.pathname,
                search: createSearchParams(append(entries)).toString(),
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
