import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

import { SearchItem, Modal } from "../common";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";

const {
    MdOutlineNavigateNext,
    TbReportMoney,
    IoLocationOutline,
    FaCropSimple,
    MdApartment,
    FaDeleteLeft,
    FaSearch,
} = icons;

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState("");
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({});
    const [textDefault, setTextDefault] = useState("");

    const { categories, prices, acreage, provinces } = useSelector((state) => state.app);

    useEffect(() => {
        if (!location.pathname.includes(path.SEARCH)) {
            setQueries({});
            setArrMinMax({});
        }
    }, [location]);

    const handleShowModal = (content, name, textDefault) => {
        setTextDefault(textDefault);
        setName(name);
        setContent(content);
        setShowModal(true);
    };

    const handleSubmit = (e, query, arrMinMax) => {
        e.stopPropagation();
        setShowModal(false);
        arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
        setQueries((prev) => ({ ...prev, ...query }));
    };

    const handleSearch = () => {
        const queryCodes = Object.entries(queries)
            .filter((item) => item[0].includes("Code") || item[0].includes("Number"))
            .filter((item) => item[1]);
        let queryCodesObj = {};
        queryCodes.forEach((item) => {
            queryCodesObj[item[0]] = item[1];
        });

        const queryText = Object.entries(queries).filter(
            (item) => !item[0].includes("Code") || !item[0].includes("Number")
        );
        let queryTextObj = {};
        queryText.forEach((item) => {
            queryTextObj[item[0]] = item[1];
        });
        let titleSearch = `${queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"} ${
            queryTextObj.province ? `thành phố ${queryTextObj.province}` : ""
        } ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""} ${
            queryTextObj.acreage ? `diện tích ${queryTextObj.acreage}` : ""
        }`;

        navigate(
            {
                pathname: path.SEARCH,
                search: createSearchParams(queryCodesObj).toString(),
            },
            { state: { titleSearch } }
        );
    };

    return (
        <>
            <div className="w-full  flex-col lg:flex-row bg-yellow-400 rounded-lg flex items-center px-4 py-1 gap-4 mt-2">
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(categories, "category", "Tất cả")}
                >
                    <SearchItem
                        text={queries.category}
                        textDefault={"Tất cả"}
                        iconBefore={<MdApartment />}
                        iconAfter={<FaDeleteLeft />}
                        fontWeight
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
                >
                    <SearchItem
                        text={queries.province}
                        textDefault={"Toàn quốc"}
                        iconBefore={<IoLocationOutline />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(prices, "price", "Chọn giá")}
                >
                    <SearchItem
                        text={queries.price}
                        textDefault={"Chọn giá"}
                        iconBefore={<TbReportMoney />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(acreage, "acreage", "Chọn diện tích")}
                >
                    <SearchItem
                        text={queries.acreage}
                        textDefault={"Chọn diện tích"}
                        iconBefore={<FaCropSimple />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <button
                    type="button"
                    className="text-white outline-none px-4 py-[6px]  bg-secondary rounded-lg min-w-[120px] flex items-center gap-2 "
                >
                    <FaSearch />
                    <p className=" text-sm font-medium text-center" onClick={handleSearch}>
                        Search
                    </p>
                </button>
            </div>
            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    handleSubmit={handleSubmit}
                    content={content}
                    name={name}
                    queries={queries}
                    arrMinMax={arrMinMax}
                    textDefault={textDefault}
                />
            )}
        </>
    );
};

export default memo(Search);
