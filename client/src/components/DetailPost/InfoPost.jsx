import React from "react";
import SliderCarousel from "./SliderCarousel";
import icons from "../../utils/icons";

const { TbReportMoney, IoLocationOutline, FaCropSimple, MdApartment, FaSearch } = icons;

const InfoPost = ({ info }) => {
    const descriptionText =
        info?.description &&
        (() => {
            try {
                const parsedData = JSON.parse(info.description);
                if (Array.isArray(parsedData)) {
                    return parsedData.map((item, index) => <p key={index}>{item}</p>);
                } else {
                    return <p>{parsedData}</p>;
                }
            } catch (error) {
                return <p>Invalid data</p>;
            }
        })();

    return (
        <div className="w-[70%] space-y-8 bg-white">
            <SliderCarousel images={info && JSON.parse(info?.images?.image)} />
            <div className="mt-8 space-y-4 px-4">
                <h2 className="text-red-500 font-bold text-xl">{info?.title || ""}</h2>
                <div className="flex gap-2 items-center">
                    <p>Chuyên mục: </p>
                    <p className="text-blue-500 font-medium hover:text-orange-500 cursor-pointer underline">
                        {info?.overviews?.area}
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <IoLocationOutline />
                    <p>{info?.address}</p>
                </div>
                <div className="flex items-center flex-wrap gap-6">
                    <div className="flex items-center gap-1">
                        <TbReportMoney />
                        <p className="font-semibold text-lg text-green-500">
                            {info?.attributes?.price}
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCropSimple />
                        <p>{info?.attributes?.acreage}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdApartment />

                        <p>{info?.attributes?.published}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaSearch />
                        <p>#{info?.attributes?.hashtag}</p>
                    </div>
                </div>
                <div className="mt-4 space-y-4">
                    <h3 className="font-semibold text-xl">Thông tin mô tả</h3>
                    <div className=" space-y-4">{descriptionText}</div>
                </div>
                <div className="mt-4  space-y-4">
                    <h3 className="font-semibold text-xl">Đặc điểm mô tả</h3>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Mã tin</td>
                                <td className="px-6 py-4">{info?.overviews?.code}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="px-6 py-4 font-semibold">Khu vực</td>
                                <td className="px-6 py-4">{info?.overviews?.area}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Loại tin rao</td>
                                <td className="px-6 py-4">{info?.overviews?.type}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="px-6 py-4 font-semibold">Đối tượng</td>
                                <td className="px-6 py-4">{info?.overviews?.target}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Gói tin</td>
                                <td className="px-6 py-4">{info?.overviews?.bonus}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="px-6 py-4 font-semibold">Ngày đăng</td>
                                <td className="px-6 py-4">{info?.overviews?.created}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Ngày hết hạn</td>
                                <td className="px-6 py-4">{info?.overviews?.expired}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4  space-y-4">
                    <h3 className="font-semibold text-xl">Thông tin liên hệ</h3>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr>
                                <td className="px-6 py-4 font-semibold">
                                    Tên người đăng
                                </td>
                                <td className="px-6 py-4">{info?.user?.name}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="px-6 py-4 font-semibold">Số điện thoại</td>
                                <td className="px-6 py-4">{info?.user?.phone}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Zalo</td>
                                <td className="px-6 py-4">{info?.user?.zalo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfoPost;
