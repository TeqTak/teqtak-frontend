import React, { useEffect, useState } from "react";
import { fetchPodcast } from "../../API";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { REACT_APP_API_BASE_URL } from "../../ENV";

const SuggestedPodcast = () => {
  const API_BASE_URL = REACT_APP_API_BASE_URL;
  const [recentdata, setRecentData] = useState([]);
  const [audio, setAudio] = useState(null);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferingWidth, setBufferingWidth] = useState(0); // Audio object for playback
  const [playingPodcast, setPlayingPodcast] = useState(null);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [clickedElmId, setClickedElmId] = useState(null);
  // Track which podcast is playing
  const navigate = useNavigate();
  const location = useLocation();
  const filteredData = location.state?.filteredData;

  const handleBtnClick = (id) => {
    // setIsUsmanClicked(!isUsmanClicked);
    setClickedElmId(clickedElmId === id ? null : id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPodcast();
        setRecentData(result.data);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    if (filteredData && filteredData.length > 0) {
      setRecentData(filteredData);
    } else {
      getData();
    }
  }, [filteredData]);

  const formatDuration = (duration) => {
    const seconds = Math.floor(duration / 1000);
    return seconds < 60
      ? `${seconds} seconds`
      : `${Math.floor(seconds / 60)} min${seconds > 60 ? "s" : ""}`;
  };

  const getUserId = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === "user") {
        return value;
      }
    }
    return null;
  };
  const user_id = getUserId();

  const handleSaveToWishlist = async (podcastId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: "podcast",
        wishItemId: podcastId,
        userId: user_id,
      });
      toast.success("Podcast saved to wishlist!"); // Show success toast
    } catch (error) {
      console.error("Error saving to wishlist:", error);
      toast.error("Could not save to wishlist. Please try again."); // Show error toast
    }
  };

  // Handle play/pause functionality for audio and stop scroll when play icon clicked
  const handleAudioPlayPause = (elm, e) => {
    e.stopPropagation();
    // Prevent the card click event from triggering scroll-to-top

    // If the clicked podcast is already playing, pause it
    if (playingPodcast === elm._id) {
      audio.pause();
      setPlayingPodcast(null);
      setIsBuffering(false);
      setBufferingWidth(0); // Reset playing podcast state
    } else {
      // Stop any currently playing audio
      setPlayingPodcast(elm._id);
      setIsBuffering(true); // Start buffering animation

      // Simulate buffering based on audio duration
      const audioDuration = elm.audioDuration || 5000; // Default to 5 seconds if no duration provided
      setBufferingWidth(0); // Reset progress

      // Gradually increase the width of the white div
      const interval = 50; // Update every 50ms
      const step = 100 / (audioDuration / interval);
      let currentWidth = 0;
      const progressInterval = setInterval(() => {
        currentWidth += step;
        if (currentWidth >= 100) {
          clearInterval(progressInterval); // Stop when complete
          setIsBuffering(false); // Stop buffering animation
        }
        setBufferingWidth(currentWidth);
      }, interval);

      if (audio) {
        audio.pause();
      }

      // Create new audio object and play the selected podcast
      const newAudio = new Audio(elm.audioUrl);
      setAudio(newAudio);
      newAudio.play();
      setPlayingPodcast(elm._id);

      newAudio.onended = () => setPlayingPodcast(null);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Include the ToastContainer here */}
      <div className="flex justify-start ps-5 gap-1 flex-wrap w-full overflow-x-auto Podcast_Top_Videos mt-2 text-white max-[425px]:mb-3">
        {recentdata.map((elm, ind) => (
          <div
            key={ind}
            className="cursor-pointer lg:h-[42vh] h-[25vh] lg:w-[23vw] md:w-[31.33vw] max-[425px]:w-[43vw] w-[45.33vw] flex-shrink-0 rounded-lg relative"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/podcastdetails`, { state: { id: elm._id } });
            }}
          >
            <div className="absolute h-full w-full ShadedBG rounded-lg">
              <IoBookmarkOutline
                className="absolute right-1 top-1 text-2xl cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onClick of parent div
                  handleSaveToWishlist(elm._id); // Save to wishlist
                }}
              />
              <div className="absolute bottom-1 left-1 w-[93%] SVTBottom rounded-lg ps-3">
                <p className="text-xl lg:py-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {elm.episodeTitle}
                </p>
                <Link
                  to="/userprofile"
                  state={{ id: elm.userID ? elm.userID : "unknown" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-sm text-[#B4B6B7] whitespace-nowrap overflow-hidden text-ellipsis">
                    {elm.user ? elm.user.name : "Unknown"}
                  </p>
                </Link>
                <p className="text-xs lg:text-xl flex gap-1 items-center">
                  <div
                    className={`h-[30px] rounded-3xl ${
                      clickedElmId === elm._id ? "bg-[#ffffff80] w-[40%]" : "w-auto"
                    }`}
                  >
                    <div className="flex">
                      {elm.audioUrl ? (
                        <div>
                          <button onClick={(e) => handleAudioPlayPause(elm, e)}>
                            <span
                              className={` ${
                                clickedElmId === elm._id
                                  ? "text-white"
                                  : "text-white"
                              }`}
                              onClick={() => handleBtnClick(elm._id)} // Pass the elm._id here
                            >
                              {playingPodcast === elm._id ? (
                                <svg
                                  className={`w-7 h-7 ${
                                    clickedElmId === elm._id
                                      ? "text-white"
                                      : "text-white"
                                  } fill-current`}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />{" "}
                                  {/* Pause icon */}
                                </svg>
                              ) : (
                                <svg
                                  className={`w-8 h-8 ${
                                    clickedElmId === elm._id
                                      ? "text-white"
                                      : "text-white"
                                  } fill-current`}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8 5v14l11-7z" /> {/* Play icon */}
                                </svg>
                              )}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <p className="text-red-500 text-center p-4">
                          Audio not available
                        </p>
                      )}

                      {playingPodcast === elm._id && (
                        <div
                          className="h-[5px] bg-white rounded-lg mt-3 me-2 buffering"
                          style={{
                            animationDuration: `${
                              formatDuration(elm.podcastDuration).split(
                                " "
                              )[0] *
                                60 +
                              "s"
                            }`,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>

                  {formatDuration(elm.podcastDuration)}
                </p>
              </div>
            </div>
            <img
              src={elm.picUrl ? elm.picUrl : "/loading.jpg"}
              alt={`Img-${ind}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SuggestedPodcast;
