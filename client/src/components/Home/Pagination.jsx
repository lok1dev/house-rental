import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { PageNumber } from "./";
import icons from "../../utils/icons";

const { GrLinkNext } = icons;

const Pagination = () => {
    const { count, posts } = useSelector((state) => state.post);
    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHideEnd, setIsHideEnd] = useState(false);
    const [isHideStart, setIsHideStart] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let page = searchParams.get("page");
        page && +page === currentPage && setCurrentPage(+page);
        !page && setCurrentPage(1);
    }, [searchParams]);

    useEffect(() => {
        let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
        let start = currentPage - 2 <= 0 ? 1 : currentPage - 2;
        let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
        let temp = [];

        for (let i = start; i <= end; i++) temp.push(i);
        setArrPage(temp);
        currentPage < 4 ? setIsHideStart(true) : setIsHideStart(false);
        currentPage >= maxPage - 1 ? setIsHideEnd(true) : setIsHideEnd(false);
    }, [count, posts, currentPage]);

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={"1"} />}
            {!isHideStart && currentPage !== 4 && <PageNumber text={"..."} />}
            {arrPage.length > 0 &&
                arrPage.map((item) => {
                    return (
                        <PageNumber
                            key={item}
                            text={item}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    );
                })}
            {!isHideEnd && <PageNumber text={"..."} />}
            {!isHideEnd && (
                <PageNumber
                    icon={<GrLinkNext />}
                    setCurrentPage={setCurrentPage}
                    text={Math.floor(count / posts.length)}
                />
            )}
        </div>
    );
};

export default Pagination;
