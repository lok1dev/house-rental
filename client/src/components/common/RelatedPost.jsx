import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MiniPost } from "../common";
import * as actions from "../../store/actions";
import { timeAgo } from "../../utils/Common";

const RelatedPost = () => {
    const dispatch = useDispatch();

    const { newPosts } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(actions.getNewPosts());
    }, []);

    return (
        <div className="w-full p-4 rounded-md shadow bg-white ">
            <h3 className="font-semibold mb-4">Tin mới đăng</h3>
            <div className="flex flex-col gap-4 mt-2">
                {newPosts?.map((item) => {
                    return (
                        <MiniPost
                            key={item?.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            image={JSON.parse(item?.images?.image)}
                            createAt={timeAgo(item?.createdAt)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedPost;
