import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPostsLimit } from "../../store/actions/post";
import BoxInfo from "../../components/DetailPost/BoxInfo";
import InfoPost from "../../components/DetailPost/InfoPost";
import { RelatedPost } from "../../components/common";

const DetailPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }));
    }, [postId]);

    return (
        <div className="w-full flex gap-6 py-4">
            <InfoPost info={posts[0]} />
            <div className="w-[30%] space-y-4 ">
                <BoxInfo userInfo={posts[0]?.user} />
                <RelatedPost />
                <RelatedPost newPost />
            </div>
        </div>
    );
};

export default DetailPost;
