import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const SliderComp = () => {
  const images = [
    {
      img: "Media/Rectangle 393.png",
      title: "Entrepreneurs & Investors Videos",
      description:
        "Let's empower investors and entrepreneurs to share top-notch video content, offering expert insights, actionable advice, ",
    },
    {
      img: "Media/Rectangle 393 (1).png",
      title: "Host Podcasts",
      description:
        "Create engaging podcasts for investors and entrepreneurs focusing on startup investing, entrepreneurship, and industry trends. ",
    },
    {
      img: "Media/Rectangle 393 (2).png",
      title: "Create Events",
      description:
        "Host live pitch events on social media for startups to present to investors. Audience engagement through voting and interaction. ",
    },
    {
      img: "Media/Rectangle 393 (3).png",
      title: "Post jobs",
      description:
        "Offer a platform for users to post job openings, fostering a community where entrepreneurs and investors can connect with talent. ",
    },
    {
      img: "Media/recta.png",
      title: "Enable Location-Based Network",
      description:
        "Allow users to view each other's locations on a Google Map interface, enhancing networking opportunities. ",
    },
  ];
  return (
    <div>
            <div className="slider">
        <div className="slider-inner">
          <div className="front">
          <h1>Let Our Features <br />
           Do the Talk</h1>
          <div className="slider-navigation">
            <button className="swiper-button-prev btnslide1"><IoIosArrowRoundBack /></button>
            <button className="swiper-button-next btnslide2"><IoIosArrowRoundForward /></button>
          </div>
          </div>
          <Swiper
          className='mx-auto mt-[1%]'
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            loop={true}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="slide-content">
                 <div className="imgslide">
                 <img
                    src={item.img}
                    alt={item.title}
                    className="slide-image"
                  />
                 </div>
                <div className="datanewhere">
                <h3 className="slide-title">{item.title}</h3>
                <p className="slide-description">{item.description} <span className="read"> Read more</span></p>
                </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SliderComp