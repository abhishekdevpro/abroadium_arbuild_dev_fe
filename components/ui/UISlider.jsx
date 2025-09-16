"use client";

import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

// Custom Arrow (same as ResumeTemplate)
const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`absolute top-1/2 -translate-y-1/2 z-30 cursor-pointer hidden md:flex 
      ${direction === "left" ? "left-4 md:left-10" : "right-4 md:right-10"}
      bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition`}
    onClick={onClick}
  >
    <span className="text-2xl text-white">
      {direction === "left" ? "❮" : "❯"}
    </span>
  </div>
);

CustomArrow.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * UiSlider
 * @param {children} slide items
 * @param {function} renderSlide receives ({child, index, centerSlide}) => JSX
 */
export default function UiSlider({
  children,
  slidesToShow = 3,
  centerPadding = "160px",
  responsive = [],
  speed = 600,
  dots = true,
  infinite = true,
  renderSlide,
}) {
  const [centerSlide, setCenterSlide] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding,
    slidesToShow,
    infinite,
    speed,
    dots,
    appendDots: (dots) => (
      <div style={{ marginTop: "20px" }}>
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`rounded-full transition-all ${
          i === centerSlide
            ? "w-4 h-4 bg-white"
            : "w-3 h-3 bg-white/60 hover:bg-white/80"
        }`}
      ></div>
    ),
    beforeChange: (_, next) => setCenterSlide(next),
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive,
  };

  return (
    <Slider {...settings}>
      {children.map((child, index) =>
        renderSlide ? renderSlide({ child, index, centerSlide }) : child
      )}
    </Slider>
  );
}

UiSlider.propTypes = {
  children: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number,
  centerPadding: PropTypes.string,
  responsive: PropTypes.array,
  speed: PropTypes.number,
  dots: PropTypes.bool,
  infinite: PropTypes.bool,
  renderSlide: PropTypes.func, // callback to control slide style
};
