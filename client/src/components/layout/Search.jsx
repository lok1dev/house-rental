import { useState } from "react";
import { useSelector } from "react-redux";

import { SearchItem, Modal } from "../common";
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
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState("");
    const { categories, prices, acreage, provinces } = useSelector((state) => state.app);

    const handleShowModal = (content, name) => {
        setName(name);
        setContent(content);
        setShowModal(true);
    };

    return (
        <>
            <div className="w-full  flex-col lg:flex-row bg-yellow-400 rounded-lg flex items-center px-4 py-1 gap-4 mt-2">
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(categories, "categories")}
                >
                    <SearchItem
                        text="Phòng trọ, nhà trọ"
                        iconBefore={<MdApartment />}
                        iconAfter={<FaDeleteLeft />}
                        fontWeight
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(provinces, "provinces")}
                >
                    <SearchItem
                        text="Toàn quốc"
                        iconBefore={<IoLocationOutline />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(prices, "prices")}
                >
                    <SearchItem
                        text="Chọn giá"
                        iconBefore={<TbReportMoney />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal(acreage, "acreage")}
                >
                    <SearchItem
                        text="Chọn diện tích"
                        iconBefore={<FaCropSimple />}
                        iconAfter={<MdOutlineNavigateNext />}
                    />
                </span>
                <button
                    type="button"
                    className="text-white outline-none px-4 py-[6px]  bg-secondary rounded-lg min-w-[120px] flex items-center gap-2 "
                >
                    <FaSearch />
                    <p className=" text-sm font-medium text-center">Search</p>
                </button>
            </div>
            {showModal && <Modal setShowModal={setShowModal} content={content} name={name} />}
        </>
    );
};

export default Search;
