import React, { useState } from "react";
import './Page.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import img1 from "./Media/Group 261.png";
import img2 from "./Media/Group 264.png";
import img3 from "./Media/30shots_so 1.png";
import img4 from "./Media/205shots_so 1 (2).png";
import img5 from "./Media/253shots_so 1.png";
import img6 from "./Media/Group 1321314675.png";
import img7 from "./Media/iPhone 14.png";
import img8 from "./Media/Group 1.png";
import img9 from "./Media/image 14.png"
import slide1 from "./Media/Rectangle 393.png";
import slide2 from "./Media/Rectangle 393 (1).png";
import slide3 from "./Media/Rectangle 393 (2).png";
import slide4 from "./Media/Rectangle 393 (3).png";
import slide5 from "./Media/recta.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { MdSlowMotionVideo } from "react-icons/md";
import { PiAppleLogoFill } from "react-icons/pi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Nav() {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "What is the purpose of this App?",
      answer:
        "This app is designed to revolutionize the relationship between investors and entrepreneurs. It provides a platform for networking, sharing educational content, and exploring job opportunities in the investment and entrepreneurial space.",
    },
    {
      question: "How this app can help me get a Job?",
      answer:
        "The app features a dedicated job section where users can explore job listings specifically related to the fields of investment and entrepreneurship, helping you connect with companies and opportunities that match your skills and interests.",
    },
    {
      question: "Can I find Investors In this App?",
      answer:
        "Yes, the app is designed to help entrepreneurs connect with potential investors. By engaging with educational content, sharing insights, and networking, you can discover investors interested in supporting innovative ideas.",
    },
    {
      question: "Can I promote my Startup in this App?",
      answer:
        "Yes, this app is completely free to use! We believe in making valuable content and connections accessible to everyone.",
    },
    {
      question: "Is this App free to use?",
      answer:
        "Users can post only informational and educational content. Videos should focus on topics related to investment, entrepreneurship, and business growth to benefit the community.",
    },
    {
      question: "What kind of Videos I can Post?",
      answer:
        "You can post videos focusing on investment, entrepreneurship, and business growth to benefit the community.",
    },
    {
      question: "Can I share my videos on other platforms?",
      answer:
        "Yes, you are free to share your videos on other platforms! Our goal is to help you spread valuable insights and connect with a broader audience.",
    },
  ];
  const images = [
    {
      img: slide1,
      title: "Entrepreneurs & Investors Videos",
      description:
        "Let's empower investors and entrepreneurs to share top-notch video content, offering expert insights, actionable advice, ",
    },
    {
      img: slide2,
      title: "Host Podcasts",
      description:
        "Create engaging podcasts for investors and entrepreneurs focusing on startup investing, entrepreneurship, and industry trends. ",
    },
    {
      img: slide3,
      title: "Create Events",
      description:
        "Host live pitch events on social media for startups to present to investors. Audience engagement through voting and interaction. ",
    },
    {
      img: slide4,
      title: "Post jobs",
      description:
        "Offer a platform for users to post job openings, fostering a community where entrepreneurs and investors can connect with talent. ",
    },
    {
      img: slide5,
      title: "Enable Location-Based Network",
      description:
        "Allow users to view each other's locations on a Google Map interface, enhancing networking opportunities. ",
    },
  ];
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className="contain">
        <div className="mainnav">
          <div className="dataimg">
            <img src={img2} alt="" className="img1" />
            <img src={img1} alt="" className="img2" />
          </div>
          <div className="navdiv">
            <header>
              <nav>
                <h1>TeqTak</h1>
                <ul>
                  <li>
                    <a href="/" className="active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about">About App</a>
                  </li>
                  <li>
                    <a href="#faq">FAQs</a>
                  </li>
                  <li>
                    <a href="#preview">Preview</a>
                  </li>
                </ul>
                <button>Download</button>
              </nav>
            </header>
            <div className="data">
              <p className="firsth1">
                Revolutionizing solution <br /> media for{" "}
              </p>
              <p className="secondh1">
                Enterpreneurs and <br /> Investors
              </p>
              <p>
                Turn your vision into reality. Join the <br /> exclusive network
                connecting ambitious <br /> entrepreneurs with the investors.
              </p>
              <div className="btns">
                <a href="/" className="btn1">
                  <MdOutlineFileDownload /> Download Now
                </a>
                <Link to="/signup" target="_self" className="btn2">
                  {" "}
                  <MdSlowMotionVideo /> See in Action
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="main2">
          <div className="power">
            <p>
              Let Our Powerful Features Do <br /> the Talking: See How They
              Solve <br />
              Your Problems
            </p>
          </div>
          <img src={img3} alt="" />
        </div>
      </div>
      <div className="vision">
        <div className="vision-a">
          <div className="icon">
            <MdArrowOutward className="i" />
          </div>
          <h3>Share Your Vision. Inspire Others.</h3>
          <p>
            Showcase your expertise, tell your startup story, or offer valuable
            insights. Engaging video content helps you connect and build a
            following.
          </p>
        </div>
        <div className="vision-a vision2">
          <div className="icon">
            <MdArrowOutward className="i icon2" />
          </div>
          <h3>Become a Thought Leader. Share Your Knowledge</h3>
          <p>
            Lead insightful discussions, interview industry experts, and
            establish yourself as a trusted voice. Informative podcasts attract
            investors and potential partners.
          </p>
        </div>
        <div className="vision-a">
          <div className="icon">
            <MdArrowOutward className="i" />
          </div>
          <h3>Connect Face-to-Face. Build Meaningful Relationships.</h3>
          <p>
            Host or attend exclusive events to network, pitch ideas, and foster
            valuable connections. Live events create a dynamic way to grow your
            startup network.
          </p>
        </div>
      </div>
      <div className="post">
        <div className="contentpost">
          <h1>Post a Video Easily. Host a Podcast</h1>
          <p>
            Ditch the Studios, Ditch the Scripts: Create Professional Brand
            Videos & Podcasts on Your Phone. Instantly Showcase Your Startup's
            Passion and Expertise to a Global Network of Investors Seeking the
            Next Big Thing.
          </p>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Captivate Investors:</span> No expensive
              equipment needed. Produce polished videos and clear podcasts that
              showcase your brand story and expertise.
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Share Your Passion & Authenticity:</span>{" "}
              Speak directly to investors with the intimacy and immediacy of
              mobile recording. Let your startup's passion shine through.
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Reach a Global Audience:</span> Distribute
              your videos and podcasts with ease, connecting with a worldwide
              network of investors seeking the next breakthrough.
            </p>
          </div>
        </div>
        <img src={img4} alt="" />
      </div>
      <div className="post">
        <img src={img5} alt="" className="effort" />
        <div className="contentpost">
          <h1>Effortless Event Creation. Streamline Your Job Hunt. </h1>
          <p>
            Network and Land Your Dream Job: Host Exclusive Events & Discover
            Curated Openings on Your Phone. Our Platform Connects You with
            Cutting-Edge Startups and Uses Smart Filters to Match Your Skills
            and Aspirations with the Perfect Role.
          </p>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Connect with Startups:</span> Attend
              exclusive events and network directly with industry leaders,
              fostering valuable connections for your future.
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Smart Job Matching:</span> Our platform
              takes the guesswork out of your job search. Smart filters match
              your skills and aspirations with curated openings at the most
              innovative startups.
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Land Your Dream Role:</span> Never miss a
              perfect opportunity again. Discover high-potential jobs that align
              with your passions and career goals, all accessible through your
              phone.
            </p>
          </div>
        </div>
      </div>
      <div className="Glob-Sect">
        <div className="Glob">
        <img src={img9} alt="" />
          <div className="innerGlob">
            <p className="appName">TeqTak App</p>
            <h1>Join the Worldwide Community of Entrepreneurs and Investors</h1>
            <p className="appPara GreyText">
              If you're a startup or an investor seeking businesses to invest
              in, you'll find everything from inception to fruition right here.
              Even if you're simply curious about the latest in the business
              world, you're welcome to join us as a viewer.
            </p>
            <div className="Counters">
              <div className="counter">
                <h4>50M+</h4>
                <p className="GreyText">
                  Entrepreneurs and Investor on Our App
                </p>
              </div>
              <div className="counter">
                <h4>99.999%</h4>
                <p className="GreyText">Chance of getting your dream Role</p>
              </div>
              <div className="counter">
                <h4>2000+</h4>
                <p className="GreyText">Posted everyday on Our App</p>
              </div>
              <div className="counter">
                <h4>5M+</h4>
                <p className="GreyText">Different Businesses and startups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div className="more" id="about">
        <div className="cont">
          <h1>More than a Social App</h1>
          <p>Beyond Profiles: Building the Future of Startups</p>
        </div>
        <div className="moreimg">
          <div className="morecont">
            <h1>Entrepreneur and Investor Bridge</h1>
            <p>
              Empower entrepreneurs and investors to connect, share insights,
              and showcase ventures through video creation on your app.{" "}
            </p>
            <p>
              Drive collaborative learning and expertise-sharing by enabling
              users to easily create podcasts within your app.
            </p>
            <div className="iconshere">
              <p>Available on</p>
              <PiAppleLogoFill className="iphone" />
              <IoLogoGooglePlaystore className="iphone" />
            </div>
          </div>

          <img src={img6} alt="" />
        </div>
      </div>
      <div className="post enterpre">
        <div className="contentpost">
          <h1 className="postco">
            Entrepreneur-Investor Collaboration Through Location Integration
          </h1>
          <p>
            Integration location features into your app enriches user experience
            and fosters seamless connections, empowering entrepreneurs and
            investors alike. With this integration, users can easily locate each
            other on Google Maps, facilitating direct connections and fostering
            collaboration.
          </p>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Entrepreneurs</span>can identify potential
              investors in their vicinity, streamlining the networking process,
              while
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Investors</span> can pinpoint promising
              startups or businesses nearby, enhancing their investment scouting
              efforts
            </p>
          </div>
          <div className="dot">
            <div className="dotit"></div>
            <p>
              <span className="span">Viewers</span> browsing the platform can
              leverage location data to discover entrepreneurial ventures and
              investment opportunities in their local area
            </p>
          </div>
        </div>
        <img src={img7} alt="" className="inter" />
      </div>
      <div className="post offer" id="preview">
        <div className="contentpost">
          <h1>What we are offering is Outside the world.</h1>
          <p>
            Discover the transformative power of our app, where we're committed
            to turning your darkest future into a shining beacon of opportunity.
            When we say it, we mean it. Download our app now and unlock
            connections with potential entrepreneurs and investors eagerly
            awaiting your ideas.
          </p>
          <li className="active"> Entrepreneurs & Investors Videos</li>
          <li>Business Podcasts</li>
          <li>Hosting Events</li>
          <li>Dream Jobs</li>
        </div>
        <img src={img8} alt="" className="effort" />
      </div>
      <div className="what">
        <div className="contentpost">
          <h1>What we are offering is Outside the world.</h1>
          <p>
            Discover the transformative power of our app, where we're committed
            to turning your darkest future into a shining beacon of opportunity.
            When we say it, we mean it. Download our app now and unlock
            connections with potential entrepreneurs and investors eagerly
            awaiting your ideas.
          </p>
          <li className="active"> Entrepreneurs & Investors Videos</li>
          <li>Business Podcasts</li>
          <li>Hosting Events</li>
          <li>Dream Jobs</li>
        </div>
      </div>
      <div className="faqs" id="faq">
        <div className="cont">
          <h1>Frequently asked questions</h1>
          <p>We`re happy to answer your questions</p>
        </div>
        <section className="faq-sect">
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className={`faq-question ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <p>{faq.question}</p>
                  <span className="faq-toggle-icon">
                    {activeIndex === index ? (
                      <IoIosArrowUp className="faq-icon" />
                    ) : (
                      <IoIosArrowDown className="faq-icon" />
                    )}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="Download-Sect">
        <button>Download</button>
        <h1>
          Download the <span>TeqTak App</span> Now
        </h1>
        <p>
          Download our app and join the community of millions of Entrepreneurs
          and Investors out there.
        </p>
        <div>
          <MdOutlineFileDownload className="i" />
          Download Now
        </div>
      </div>
      <div className="Footer-Sect">
        <div className="Footer-Inner">
          <div className="logo logo2">
            <h1>TeqTak App</h1>
            <p>Revolutionizing Investor-Entrepreneur Social Media</p>
            <button>Download</button>
          </div>

          <div className="logo">
            <h3>TeqTak App</h3>
            <p>About us</p>
            <p>Home</p>
            <p>FAQ's</p>
            <p>Contact us</p>
          </div>
          <div className="logo">
            <h3>Support Us</h3>
            <p>Help center</p>
            <p>FAQ`s</p>
          </div>
          <div className="logo">
            <h3>Resources</h3>
            <p>Privacy Policy</p>
            <p>Contact</p>
            <p>Terms of services</p>
          </div>
          <div className="logo">
            <h3>Address</h3>
            <p>
              101 Marlow Street. #12-05 Clife Parkview. NYC 059020.{" "}
              <span>View on Maps</span>
            </p>
            <p className="p">Inquiries</p>
            <p>
              +12 1214 1211 <br />
              hello@azitadarvishi.com
            </p>
            <div className="social">
              <FaTwitter />
              <FaFacebook />
              <FaLinkedin />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>
        <div className="hr"></div>
        <pre>
          © 2024 Investor. All rights reserved | Cookie Settings, Anti-Spam,
          Privacy, User agreement, Legal Notice and Responsible Disclosure
        </pre>
      </div>
    </>
  );
}
