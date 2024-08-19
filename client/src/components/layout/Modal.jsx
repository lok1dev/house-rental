import { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { getNumbersPrice, getNumbersAcreage } from "../../utils";
const { GrLinkPrevious } = icons;

const Modal = ({
    setShowModal,
    content,
    name,
    handleSubmit,
    queries,
    arrMinMax,
    textDefault,
}) => {
    const [percentStart, setPercentStart] = useState(
        name === "price"
            ? arrMinMax?.priceArr?.[0] ?? 0
            : name === "acreage"
            ? arrMinMax?.acreageArr?.[0] ?? 0
            : 0
    );
    const [percentEnd, setPercentEnd] = useState(
        name === "price"
            ? arrMinMax?.priceArr?.[1] ?? 100
            : name === "acreage"
            ? arrMinMax?.acreageArr?.[1] ?? 100
            : 100
    );
    const [activeEl, setActiveEl] = useState("");

    const convert100toTarget = (percent) => {
        return name === "price"
            ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
            : name === "acreage"
            ? Math.ceil(Math.round((percent * 0.9) / 5) * 5)
            : 0;
    };
    const convertTargetTo100 = (percent) => {
        let target = name === "price" ? 15 : name === "acreage" ? 90 : 0;
        return Math.floor((percent / target) * 100);
    };

    useEffect(() => {
        const trackActiveEl = document.getElementById("track-active");
        if (trackActiveEl) {
            if (percentEnd <= percentStart) {
                trackActiveEl.style.left = `${percentEnd}%`;
                trackActiveEl.style.right = `${100 - percentStart}%`;
            } else {
                trackActiveEl.style.left = `${percentStart}%`;
                trackActiveEl.style.right = `${100 - percentEnd}%`;
            }
        }
    }, [percentStart, percentEnd]);

    const handleClickTrack = (e) => {
        e.stopPropagation();
        const trackEl = document.getElementById("track");
        const stackRect = trackEl.getBoundingClientRect();
        let percent = Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width);
        if (Math.abs(percent - percentStart) <= Math.abs(percent - percentEnd)) {
            setPercentStart(percent);
        } else {
            setPercentEnd(percent);
        }
    };

    const handleActive = (code, value) => {
        setActiveEl(code);
        let arrMinMax =
            name === "price" ? getNumbersPrice(value) : getNumbersAcreage(value);
        if (arrMinMax.length === 1) {
            if (arrMinMax[0] === 1) {
                setPercentStart(0);
                setPercentEnd(convertTargetTo100(1));
            }
            if (arrMinMax[0] === 20) {
                setPercentStart(0);
                setPercentEnd(convertTargetTo100(20));
            }
            if (arrMinMax[0] === 15 || arrMinMax[0] === 90) {
                setPercentStart(100);
                setPercentEnd(100);
            }
        }
        if (arrMinMax.length === 2) {
            setPercentStart(convertTargetTo100(arrMinMax[0]));
            setPercentEnd(convertTargetTo100(arrMinMax[1]));
        }
    };

    const handleBeforeSubmit = (e) => {
        const arrMinMax =
            percentStart < percentEnd
                ? [convert100toTarget(percentStart), convert100toTarget(percentEnd)]
                : [convert100toTarget(percentEnd), convert100toTarget(percentStart)];
        handleSubmit(
            e,
            {
                [`${name}Number`]: arrMinMax,
                [name]: `Từ ${convert100toTarget(
                    percentStart <= percentEnd ? percentStart : percentEnd
                )} đến ${convert100toTarget(
                    percentEnd <= percentStart ? percentStart : percentEnd
                )}${name === "price" ? " triệu" : name === "acreage" ? "m2" : ""}`,
            },
            {
                [`${name}Arr`]: [percentStart, percentEnd],
            }
        );
    };

    return (
        <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-overlay-30 z-10 flex"
            onClick={() => {
                setShowModal(false);
            }}
        >
            <div
                className="w-2/5 m-auto bg-white rounded-md h-[500px] relative"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
            >
                <div className="h-10 relative flex items-center border-b border-gray-400 py-8">
                    <span
                        className="cursor-pointer absolute left-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(false);
                        }}
                    >
                        <GrLinkPrevious size={30} />
                    </span>
                    <h3 className="font-bold text-xl absolute left-[44%]">
                        {name.toUpperCase()}
                    </h3>
                </div>

                {(name === "category" || name === "province") && (
                    <div className="py-6 flex flex-col gap-4 px-6">
                        <div className="flex gap-4 items-center border-b border-gray-300 pb-2">
                            <input
                                type="radio"
                                name={name}
                                id="default"
                                value={textDefault || ""}
                                readOnly
                                checked={!queries[`${name}Code`] ? true : false}
                                onClick={(e) =>
                                    handleSubmit(e, {
                                        [name]: textDefault,
                                        [`${name}Code`]: null,
                                    })
                                }
                            />
                            <label htmlFor="default" className="cursor-pointer">
                                {textDefault}
                            </label>
                        </div>
                        {content.map((item) => {
                            return (
                                <div
                                    key={item.code}
                                    className="flex gap-4 items-center border-b border-gray-300 pb-2"
                                >
                                    <input
                                        type="radio"
                                        name={name}
                                        id={item.code}
                                        value={item.code}
                                        readOnly
                                        checked={
                                            queries[`${name}Code`] === item?.code
                                                ? true
                                                : false
                                        }
                                        onClick={(e) =>
                                            handleSubmit(e, {
                                                [name]: item.value,
                                                [`${name}Code`]: item.code,
                                            })
                                        }
                                    />
                                    <label htmlFor={item.code} className="cursor-pointer">
                                        {item.value}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}

                {(name === "price" || name === "acreage") && (
                    <div className="py-16 flex flex-col gap-4 px-6">
                        <div className="flex flex-col items-center justify-center relative ">
                            <p className="z-20 top-[-40px] absolute text-xl font-bold text-orange-500">
                                {percentStart === 100 && percentEnd === 100
                                    ? `Trên  ${convert100toTarget(
                                          percentEnd <= percentStart
                                              ? percentStart
                                              : percentEnd
                                      )}${
                                          name === "price"
                                              ? " triệu"
                                              : name === "acreage"
                                              ? "m2"
                                              : ""
                                      } +`
                                    : `Từ
                                ${convert100toTarget(
                                    percentStart <= percentEnd ? percentStart : percentEnd
                                )}
                                đến
                                ${convert100toTarget(
                                    percentEnd <= percentStart ? percentStart : percentEnd
                                )}${
                                          name === "price"
                                              ? " triệu"
                                              : name === "acreage"
                                              ? "m2"
                                              : ""
                                      }`}
                            </p>
                            <div
                                id="track"
                                className="slider-track h-[5px] absolute w-full  top-0 bottom-0 bg-gray-400 rounded-full "
                                onClick={(e) => handleClickTrack(e)}
                            ></div>
                            <div
                                id="track-active"
                                className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-400 rounded-full "
                                onClick={(e) => handleClickTrack(e)}
                            ></div>
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={percentStart}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={(e) => {
                                    setActiveEl("");
                                    setPercentStart(+e.target.value);
                                }}
                            />
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={percentEnd}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={(e) => {
                                    setActiveEl("");
                                    setPercentEnd(+e.target.value);
                                }}
                            />
                            <div className="absolute flex justify-between top-4 right-0 bottom-0 left-0 font-bold">
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPercentStart(0);
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPercentEnd(100);
                                    }}
                                >
                                    {name === "price"
                                        ? "15 Triệu +"
                                        : name === "acreage"
                                        ? "Trên 90m2"
                                        : ""}
                                </span>
                            </div>
                        </div>
                        <div className="mt-10 space-y-6">
                            <p className="font-semibold">Chọn nhanh</p>
                            <div className="flex flex-wrap gap-2">
                                {content?.map((item) => {
                                    return (
                                        <div
                                            key={item?.code}
                                            onClick={() =>
                                                handleActive(item?.code, item?.value)
                                            }
                                            className={`flex px-4 py-1 bg-gray-200 cursor-pointer rounded-md ${
                                                item.code === activeEl
                                                    ? "bg-blue-400 text-white"
                                                    : ""
                                            }`}
                                        >
                                            <p>{item?.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {(name === "price" || name === "acreage") && (
                    <button
                        className="w-full bottom-0 absolute text-center py-4 bg-orange-400 font-bold rounded-b-md"
                        onClick={handleBeforeSubmit}
                    >
                        ÁP DỤNG
                    </button>
                )}
            </div>
        </div>
    );
};

export default memo(Modal);
