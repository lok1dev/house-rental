import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../store/actions";
import { Button } from "../../../components/common";
import UpdatePost from "../../../components/System/ManagerPost/UpdatePost";
import { apiDeletePost } from "../../../services";
import Swal from "sweetalert2";

const ManagerPost = () => {
   const dispatch = useDispatch();
   const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
   const [isEdit, setIsEdit] = useState(false);
   const [updateData, setUpdateData] = useState(false);
   const [posts, setPosts] = useState();

   useEffect(() => {
      dispatch(actions.getPostsManager());
   }, [dataEdit, updateData]);

   useEffect(() => {
      setPosts(postOfCurrent);
   }, [postOfCurrent]);

   const parseDate = (dateString) => {
      // Extract date components using regex
      const datePattern = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
      const match = dateString.match(datePattern);

      if (match) {
         const [_, day, month, year] = match;
         return new Date(`${year}-${month}-${day}`); // Use 'YYYY-MM-DD' format for Date constructor
      }

      return null; // Return null if the format is invalid
   };

   const checkDate = (expired) => {
      const expiredDate = parseDate(expired);

      if (!expiredDate) {
         console.error("Invalid Expired Date format");
         return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiredDateOnly = new Date(
         expiredDate.getFullYear(),
         expiredDate.getMonth(),
         expiredDate.getDate()
      );

      if (today > expiredDateOnly) return "Hết hạn";
      return "Đang hoạt động";
   };

   const handleDelete = async (postId) => {
      const response = await apiDeletePost(postId);
      if (response?.err === 0) {
         setUpdateData((prev) => !prev);
         Swal.fire("Success !", "Xóa bài viết thành công !", "success");
      } else {
         Swal.fire("Oops !", "Xóa bài viết thất bại !", "error");
      }
   };

   const handleFilterStatus = (statusCode) => {
      if (statusCode === 1) {
         const activePosts = postOfCurrent?.filter(
            (item) => checkDate(item?.overviews?.expired) === "Đang hoạt động"
         );
         return setPosts(activePosts);
      } else if (statusCode === 0) {
         const expiredPosts = postOfCurrent?.filter(
            (item) => checkDate(item?.overviews?.expired) === "Hết hạn"
         );
         return setPosts(expiredPosts);
      } else {
         return setPosts(postOfCurrent);
      }
   };

   return (
      <div className="px-6 w-full space-y-4 relative">
         <div className="flex justify-between items-center border-b border-gray-200 py-4">
            <h1 className="text-2xl font-medium ">Quản lý tin đăng</h1>
            <select
               name=""
               id=""
               className="outline-none border border-gray-300 cursor-pointer"
               onChange={(e) => handleFilterStatus(+e.target.value)}
            >
               <option value="-1">Lọc theo trạng thái</option>
               <option value="1">Đang hoạt động</option>
               <option value="0">Đã hết hạn</option>
            </select>
         </div>
         <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Mã tin
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Ảnh đại diện
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Tiêu đề
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Giá
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Ngày bắt đầu
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Ngày hết hạn
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Trạng thái
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Tùy chọn
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {posts?.map((item) => {
                     return (
                        <tr
                           className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                           key={item?.id}
                        >
                           <td className="px-6 py-4">{item?.attributes?.hashtag}</td>
                           <td className="px-6 py-4">
                              <img
                                 src={JSON.parse(item?.images?.image)[0]}
                                 alt=""
                                 className="size-10  rounded-lg object-cover"
                              />
                           </td>
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              {item?.title}
                           </th>
                           <td className="px-6 py-4">{item?.attributes?.price}</td>
                           <td className="px-6 py-4">{item?.overviews?.created}</td>
                           <td className="px-6 py-4">{item?.overviews?.expired}</td>
                           <td className="px-6 py-4">
                              {checkDate(item?.overviews?.expired)}
                           </td>

                           <td className="px-4 py-4 flex items-center">
                              <Button
                                 text="Sửa"
                                 textColor="text-blue-500"
                                 onClick={() => {
                                    dispatch(actions.editData(item));
                                    setIsEdit(true);
                                 }}
                              />{" "}
                              /
                              <Button
                                 text="Xóa"
                                 textColor="text-red-500"
                                 onClick={() => handleDelete(item?.id)}
                              />
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
      </div>
   );
};

export default ManagerPost;
