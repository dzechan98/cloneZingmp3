import React from "react";
import { SecondHeading, Heading, SlideRanking } from "./";
import Slider from "react-slick";

const NewRankingReleased = ({ data }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    cssEase: "linear",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    cssEase: "linear",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    cssEase: "linear",
                },
            },
        ],
    };
    return (
        <div className="w-full mb-10">
            <SecondHeading to="/moi-phat-hanh">
                <Heading>{data?.title}</Heading>
            </SecondHeading>
            <Slider {...settings}>
                {data?.items?.map((item, index) => (
                    <SlideRanking item={item} index={index} key={index} />
                ))}
            </Slider>
        </div>
    );
};

export default NewRankingReleased;
