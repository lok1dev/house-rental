import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MiniPost } from "../Home";
import * as actions from "../../store/actions";

const RelatedPost = ({ newPost }) => {
    const { newPosts, outStandingPost } = useSelector((state) => state.post);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        newPost
            ? dispatch(actions.getNewPosts())
            : dispatch(actions.getOutstandingPost());
    }, []);

    useEffect(() => {
        newPost ? setPosts(newPosts) : setPosts(outStandingPost);
    }, [newPosts, outStandingPost]);
    console.log(posts);
    return (
        <div className="w-full p-4 rounded-md shadow bg-white ">
            <h3 className="font-semibold mb-4">
                {newPost ? "Tin mới đăng" : "Tin nổi bật"}
            </h3>
            <div className="flex flex-col gap-4 mt-2">
                {posts?.map((item) => {
                    return (
                        <MiniPost
                            key={item?.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            image={JSON.parse(item?.images?.image)}
                            createAt={item?.createdAt}
                            id={item?.id}
                            star={item?.star}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(RelatedPost);
