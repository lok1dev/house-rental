import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderCarousel = ({ images }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {images &&
                    images?.map((item, index) => {
                        return (
                            <div
                                className="bg-black flex justify-center h-[320px]"
                                key={index}
                            >
                                <img
                                    src={item}
                                    alt="slider"
                                    className="max-h-full m-auto h-full object-contain "
                                />
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};

export default memo(SliderCarousel);
