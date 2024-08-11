import icons from "../utils/icons";

const { PiNotePencilLight, PiNotebookDuotone, PiUserCircle } = icons;

const userMenu = [
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
        text: "Thông tin tài khoản",
        path: "/he-thong/tai-khoan",
        icon: <PiUserCircle />,
    },
];

export default userMenu;
