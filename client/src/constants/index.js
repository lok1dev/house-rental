export * from "./dataContact";
export * from "./dataIntro";
export { default as menuManager } from "./menuManager";
export { default as userMenu } from "./userMenu";

export const path = {
    HOME: "/*",
    HOME__PAGE: ":page",
    LOGIN: "dang-nhap",
    CHO_THUE_CAN_HO: "cho-thue-can-ho",
    CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
    MAT_BANG: "mat-bang",
    NHA_CHO_THUE: ":nha-cho-thue",
    SEARCH: "tim-kiem",
    CONTACT: "lien-he",
    DETAIL: "/chi-tiet/",
    DETAIL_ALL: "chi-tiet/*",
    DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",

    // SYSTEM PATH
    SYSTEM: "/he-thong/*",
    CREATE_POST: "dang-tin",
    MANAGER_POST: "quan-ly-tin-dang",
    EDIT_PROFILE: "sua-thong-tin",
};

export const text = {
    HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
    HOME_DESCRIPTION:
        "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
    {
        id: "HCM",
        name: "Hồ Chí Minh",
        image: "https://phongtro123.com/images/location_hcm.jpg",
    },
    {
        id: "HN",
        name: "Hà Nội",
        image: "https://phongtro123.com/images/location_hn.jpg",
    },
    {
        id: "DN",
        name: "Đà Nẵng",
        image: "https://phongtro123.com/images/location_dn.jpg",
    },
];
