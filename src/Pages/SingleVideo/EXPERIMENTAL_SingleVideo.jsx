import { Fragment, useEffect, useRef, useState } from "react";
import { Link, } from "react-router-dom";
import { BsInfoSquare } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlay,  } from "react-icons/fa";
// import { CiPlay1 } from "react-icons/ci";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Model from "../ModalReport/Model";
import Review from "../Podcast/Review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import { getUserId } from "../../API";

const Experimental_Video = (props) => {
  const [repModOpen, setRepModOpen] = useState(false);
  const [revModOpen, setRevModOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [showFull, setShowFull] = useState(false);

  // vid data
  const [videoDesc, set_videoDesc] = useState("N/A")
  const [videoId, set_videoId] = useState("")
  const [videoUrl, set_videoUrl] = useState("N/A")
  const [userId, set_userId] = useState("")
  const [videoTags, set_videoTags] = useState([])
  const [userPic, set_userPic] = useState("")
  const [userName, set_userName] = useState("")
  const [userRole, set_userRole] = useState("viewer")
  const [isSub, set_isSub] = useState(false)
  // vid data

  const handleToggle = () => {
    setShowFull(!showFull);
  };
  const __init__ = () => {

    set_videoDesc(props.videoDesc)
    set_videoUrl(props.videoUrl)
    set_userId(props.userId)
    set_videoTags(props.videoTags)
    set_userPic(props.userPic)
    set_userName(props.userName)
    set_isSub(props.isSub)
    set_userRole(props.userRole)
    set_videoId(props.videoId)
  }


  const API_BASE_URL = REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("jwt");

  const togglePlayPause = () => {
    console.log("clicking")
    if (videoRef.current.paused) {
      console.log("playing")
      videoRef.current.play();
      setIsPlaying(true); 
    } else {
      console.log("pausing")
      videoRef.current.pause();
      setIsPlaying(false); 
    }
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoDesc,
          text: "Watch this video!",
          url: window.location.href,
        });
        toast.success("Share successful!");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Error sharing the video.");
      }
    } else {
      toast.warn("Web Share API is not supported in your browser.");
    }
  };

  // const subscribeUser = async () => {

  //   console.log({
  //     subscriberId: getUserId(),
  //     subscribedToId: userId,
  //   });
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/subscribe`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         subscriberId: getUserId(),
  //         subscribedToId: userId,
  //       }),
  //     });
  //     if (response.ok) {
  //       const result = await response.json();
  //       setIsSubscribed(true);
  //     } else {
  //       const error = await response.json();
  //       console.error("Error subscribing:", error.message);
  //     }
  //   } catch (error) {
  //     console.error("Error subscribing:", error);
  //   }
  // };

  
  // const _Sub_ = () => { }


  useEffect(() => {
    // console.log({ props })
    __init__()
  }, []);

  return (
    <Fragment>
      <section className="h-full w-full relative flex items-center bg-white">
        {/* // Reviews */}
        {revModOpen && (
          <div className="h-[95%] left-0 w-full absolute top-0 z-20 flex justify-center items-center">
            <Review
              comp={"video"}
              videoId={videoId}
              setRevModOpen={setRevModOpen}
              videoUrl={videoUrl}
            />
          </div>
        )}

        {/* //  Report  */}
        {repModOpen && (
          <div className="h-full w-full absolute top-0 z-20 flex justify-center items-center">
            <Model
              reportItemId={videoId}
              setRepModOpen={setRepModOpen}
              comp={"video"}
              videoUrl={videoUrl}
            />
          </div>
        )}


        <div
        onClick={togglePlayPause}
        className="w-[80%] bg-black sm:w-[65%] md:w-[55%] lg:h-[95%] h-[90%] mx-auto rounded-xl relative">

          {/* controls */}
          <div className="absolute z-10 rounded-lg left-0 top-0 h-full w-full ShadedBG">
            <div
              className="absolute cursor-pointer flex gap-2 items-center ps-4 py-2 text-lg text-white left-0 z-10"
              // onClick={() => navigate("/videos") }
            >
              <FaChevronLeft className="text-xs" /> Videos
            </div>
            <div className="absolute z-10 bottom-3 w-[60%] sm:w-[43%] p-3 text-white">
              <Link
                to="/userprofile"
                state={{ id: userId}}
              >
                <p className="text-xl font-semibold max-[525px]:font-normal whitespace-nowrap">
                  {userName}
                </p>
              </Link>
              <p className="py-1 w-[80%] text-sm">
                {showFull ? videoDesc : videoDesc.slice(0, 10)}
                {/* Limit to 10 characters */}
                {videoDesc.length > 10 && !showFull && "..."}
              </p>
              {videoDesc.length > 10 && (
                <button
                  onClick={handleToggle}
                  className="text-white text-sm mt-1 hover:underline"
                >
                  {showFull ? "Show Less" : "Show More..."}
                </button>
              )}
              <p className="py-1 w-[80%] text-sm">
                {videoTags.map((tag) => `#${tag}`).join(" ")}
              </p>
            </div>
            <div className="absolute bottom-3 z-10 right-2 text-white">
              <div className="relative cursor-pointer rounded-full flex justify-center">
                <Link
                  to="/userprofile"
                  state={{ id: userId}}
                >
                  <img
                    src={userPic || "/placeholder.jpg"}
                    style={{ height: "40px", width: "40px" }}
                    className={`rounded-full ${userRole === "investor"
                      ? "border-[2px] border-[#FF3434] p-[1px]"
                      : userRole === "entrepreneur"
                        ? "border-[2px] border-[#6165F3] p-[1px]"
                        : "border-[#E6E6E6] p-1"
                      }`}
                    alt="User Profile"
                  />
                </Link>
                {!isSub && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="absolute -bottom-2 p-1 text-xs bg-blue-700 rounded-full cursor-pointer"
                    // onClick={toggleSubscription}
                  />
                )}
              </div>
              <div
                className="text-center cursor-pointer mt-5"
                onClick={() => setRepModOpen(true)}
              >
                <p className="text-xs">
                  <BsInfoSquare className="block text-lg mx-auto" />
                  Report
                </p>
              </div>
              <div
                className="text-center cursor-pointer mt-5"
                onClick={() => setRevModOpen(true)}
              >
                <p className="text-xs">
                  <CiStar className="block text-2xl mx-auto" />
                  Reviews
                </p>
              </div>
              <div
                className="text-center cursor-pointer mt-5 mb-3"
                onClick={shareContent}
              >
                <p className="text-xs m-0">
                  <FaRegShareFromSquare className="block text-lg mx-auto" />
                  Share
                </p>
              </div>
            </div>
          </div>

          {/* //  video  */}
          <video

            ref={videoRef}
            preload="true"
            loop={true}
            src={videoUrl || ""}
            className="h-full relative z-0 rounded-xl w-full bg-slate-300 object-cover cursor-pointer"
          />
          <button
            className="absolute text-4xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 "
          >
            {isPlaying ? <FaPlay className="hidden" /> : <FaPlay />}
          </button>
        </div>

      </section>


      <ToastContainer />


    </Fragment>
  );
};

export default Experimental_Video;
