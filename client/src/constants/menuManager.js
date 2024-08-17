import icons from "../utils/icons";

const { PiNotePencilLight, PiNotebookDuotone, PiUserCircle } = icons;

const menuManager = [
   {
      id: 1,
      text: "Đăng tin cho thuê",
      path: "/he-thong/dang-tin",
      icon: <PiNotePencilLight />,
   },
   {
      id: 2,
      text: "Quản lý tin đăng",
      path: "/he-thong/quan-ly-tin-dang",
      icon: <PiNotebookDuotone />,
   },
   {
      id: 3,
      text: "Sửa thông tin tài khoản",
      path: "/he-thong/sua-thong-tin",
      icon: <PiUserCircle />,
   },
   {
      id: 4,
      text: "Liên hệ",
      path: "/lien-he",
      icon: <PiUserCircle />,
   },
];

export default menuManager;
