import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import slider_one from "../assets/slider-01.jpg";
import slider_two from "../assets/slider-02.jpg";
import slider_three from "../assets/slider-03.jpg";

const Slider = () => {

    return (
        <>
            <div className="max-w-7xl mx-auto my-16 md:my-0">
                <h3 className="md:text-4xl text-2xl font-bold text-center mt-12 mb-12">Our Activities</h3>
                <div className="max-w-7xl mx-auto my-6">
                    <Swiper

                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={30}
                        breakpoints={{
                            
                            640: {
                                slidesPerView: 1, 
                            },
                        }}
                        slidesPerView={2} 

                        className="mySwiper"

                    >
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-[150px] md:h-[600px] text-white text-xl font-bold md:rounded-lg">
                                <img className="w-[85%] h-full md:rounded-3xl lg:w-full" src={slider_one} alt="" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="flex items-center justify-center h-[150px] md:h-[600px] text-white text-xl font-bold md:rounded-lg">
                                <img className="w-[85%] h-full md:rounded-3xl lg:w-full" src={slider_two} alt="" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="flex items-center justify-center h-[150px] md:h-[600px] text-white text-xl font-bold md:rounded-lg">
                                <img className="w-[85%] h-full md:rounded-3xl lg:w-full" src={slider_three} alt="" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Slider;