import { useEffect } from "react";
import { Button, Item } from "../../components/index";
import { getPosts } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
