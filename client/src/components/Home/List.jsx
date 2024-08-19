import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Item } from "../common";
import { getPostsLimit } from "../../store/actions/post";

const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {};
        params?.forEach((i) => {
            if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
            }
        });
        if (categoryCode) searchParamsObject.categoryCode = categoryCode;
        dispatch(getPostsLimit(searchParamsObject));
    }, [searchParams, categoryCode]);

    return (
        <div className="w-full rounded-md p-2 space-y-4 bg-white shadow-md">
            <div>
                <h3 className="text-lg font-semibold">Danh sách tin đăng</h3>
            </div>
            <div className="flex items-center text-sm gap-2">
                <span>Sắp xếp:</span>
                <Button bgColor="bg-gray-300" text="Mặc định" />
                <Button bgColor="bg-gray-300" text="Mới nhất" />
                <Button bgColor="bg-gray-300" text="Có video" />
            </div>
            <div className="item">
                {posts?.length > 0 &&
                    posts.map((item) => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                attributes={item?.attributes}
                                description={JSON.parse(item?.description)}
                                images={JSON.parse(item?.images?.image)}
                                star={+item?.star}
                                title={item?.title}
                                user={item?.user}
                                id={item?.id}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
