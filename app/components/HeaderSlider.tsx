import React, { useState, useEffect } from "react";
import  assets  from "../assets/assets";
import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";
import { sliderData } from "./Objects";

const HeaderSlider = () => {
  

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="items-center grid lg:grid-cols-2 bg-base-300 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="h-full w-full object-cover"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-secondary pb-1">{slide.offer}</p>
              <h1 className="max-w-lg text-2xl md:text-3xl lg:font-bold font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="px-7 py-2 bg-secondary rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2} <ArrowRightCircle className="h-4 w-4 -rotate-45" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-secondary" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
