import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishlistjob, setWishlistJob] = useState([]);
  const [wishlistevent, setWishlistEvent] = useState([]);
  const [wishlistpodcast, setWishlistPodcast] = useState([]);

  const getUserId = () => {
    const cookies = document.cookie.split(';'); 
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('='); 
      if (key === 'user') { 
        return value; 
      }
    }
    return null; 
  };
const token = localStorage.getItem('jwt');
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/wishlist/${getUserId()}`,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const info = response.data;
    

        setWishlistJob(info.job);
        setWishlistEvent(info.event);
        setWishlistPodcast(info.podcast);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const navigate = useNavigate();

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this event!",
          url: window.location.href,
        });
        toast.success("Event link shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Error sharing the event link.");
      }
    } else {
      toast.error("Web Share API is not supported in your browser.");
    }
  };

  const formatDate = (dateString) => {
    // Normalize the date input by replacing dashes with slashes
    const normalizedDateString = dateString.replace(/[-]/g, "/");

    // Split the date parts
    const dateParts = normalizedDateString.split("/");

    let day, month, year;

    // Check for different formats
    if (dateParts.length === 3) {
      // Check if the first part is a year (YYYY/MM/DD) or day (DD/MM/YYYY)
      if (dateParts[0].length === 4) {
        // Format: YYYY/MM/DD
        year = dateParts[0];
        month = dateParts[1] - 1; // Month is zero-indexed
        day = dateParts[2];
      } else {
        // Format: DD/MM/YYYY
        day = dateParts[0];
        month = dateParts[1] - 1; // Month is zero-indexed
        year = dateParts[2];
      }

      // Create a new Date object
      const date = new Date(year, month, day);

      // Ensure the date is valid
      if (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      ) {
        // Format and return the date in DD/MM/YYYY
        return `${("0" + day).slice(-2)}/${("0" + (month + 1)).slice(
          -2
        )}/${year}`;
      }
    }

    return "Invalid date format";
  };

  const formatDuration = (duration) => {
    const seconds = Math.floor(duration / 1000);

    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    }
  };

  const hasItems =
    wishlistjob.length > 0 ||
    wishlistevent.length > 0 ||
    wishlistpodcast.length > 0;

 
  const currentUser = getUserId()

  return (
    <Fragment>
      <div className="overflow-y-scroll h-full w-full p-4 bg-white" style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {!hasItems ? (
              <div className="text-center">No items in your wishlist.</div>
            ) : (
              <div
                className="sm:ps-6 w-full h-full bg-white overflow-y-scroll"
                style={{
                  WebkitOverflowScrolling: "touch",
                  WebkitScrollbar: { display: "none" },
                  "-msOverflowStyle": "none",
                  scrollbarWidth: "none",
                }}
              >
                {" "}
                <h4 className="flex items-center gap-3 ms-4 h-[10%]">
                  <FaAngleLeft
                    className="cursor-pointer"
                    onClick={() => navigate("/settings")}
                  />{" "}
                  Wish List
                </h4>
                <div className="flex flex-wrap gap-4 w-full">
                  <h1>Saved Podcasts</h1>
               <div className="overflow-x-scroll h-auto w-full flex gap-2"  style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
                   {/* Render podcasts */}
                   {wishlistpodcast.map((elm, index) => (
                    <div
                      key={index}
                   className="cursor-pointer lg:h-[42vh] h-[25vh] lg:w-[23vw] md:w-[31.33vw]  max-[425px]:w-[43vw] w-[45.33vw] flex-shrink-0 rounded-lg relative text-white"
                      onClick={() =>
                        navigate(`/podcastdetails`, { state: { id: elm._id } })
                      }
                    >
                        <div className="absolute h-full w-full ShadedBG rounded-lg">
            
              <div className="absolute bottom-1 left-1 w-[93%] SVTBottom rounded-lg ps-3">
                <p className="text-xl lg:py-1 whitespace-nowrap overflow-hidden text-ellipsis">{elm.episodeTitle}</p>
                <Link
                  to="/userprofile"
                  state={{ id: elm.userID ? elm.userID : "unknown" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-sm text-[#B4B6B7] whitespace-nowrap overflow-hidden text-ellipsis">{elm.user ? elm.user.name : ""}</p>
                </Link>
                <p className="text-xs lg:text-xl  flex gap-1 items-center">
                  <CiPlay1 size={25}/> {formatDuration(elm.podcastDuration)}
                </p>
              </div>
            </div>
            <img
              src={elm.picUrl ? elm.picUrl : "loading.jpg"}
              alt={`Img-${elm.user?.name}`}
              className="h-full w-full rounded-lg object-cover"
            />
                    </div>
                  ))}
               </div>
               <h1>Saved Events</h1>
                <div className="overflow-x-scroll h-auto w-full flex gap-2"  style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
                    {/* Render events */}
                    {wishlistevent.map((data, i) => (
                    <div
                      key={i}
                      className="m-0 text-white md:w-[32%] w-[48.4%] lg:h-[42vh] h-[37vh] relative rounded-2xl"
                    >
                      <img
                        src={
                          data.eventCoverUrl
                            ? data.eventCoverUrl
                            : "/loading.jpg"
                        }
                        alt="Card Img2"
                          className="h-full w-full rounded-lg cursor-pointer"
                      />
                    <div className="w-full absolute bottom-1">
            <div className="SVTBottom w-[95%] mx-auto lg:px-3 lg:py-2 rounded-lg px-1">
              <small className="block lg:text-xl  w-[93%] overflow-hidden whitespace-nowrap text-ellipsis">{data.eventTitle}</small>
              <p className="text-xs py-2">{data.eventDate}</p>
              <p className="text-sm lg:pb-2  w-[93%] overflow-hidden whitespace-nowrap text-ellipsis">{data.eventLocation}</p>
              <div className="flex items-center mb-1">
                <Link
                  to="/eventdetail"
                  state={{ id: data._id }}
                  className="me-2 md:px-5 lg:py-2 py-[3px] JobButtonBgBlur md:w-auto w-[70%] text-sm text-white rounded-full text-center"
                >
                  Buy tickets
                </Link>
                <button 
                  className="md:px-7 lg:py-2 py-[3px] flex justify-center w-[30%] md:w-auto JobButtonBgBlur text-xs text-white rounded-full" 
                  onClick={handleShare}
                >
                  <FaRegShareFromSquare className=" text-lg " />
                </button>
              </div>
            </div>
          </div>
                    </div>
                  ))}
                </div>
               <h1>Saved Jobs</h1>
             <div className="overflow-x-scroll h-auto w-full flex gap-2"  style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
                   {/* Render jobs */}
                   {wishlistjob.map((elm, ind) => (
                    <div
                      key={ind}
                          className="h-auto md:w-[33%] sm:w-[40%] w-[50%] flex-shrink-0 shadow rounded-lg border relative max-[766px]:h-auto max-[766px]:w-auto max-[766px]:p-2 lg:w-[32.43%]  flex flex-col"
                    >
                       <div className="w-full flex-grow">
              <div className="flex gap-2 mt-2">
                <img
                  src={elm.logoUrl ? elm.logoUrl : "/placeholder.jpg"}
                  onLoad={(e) => (e.target.style.opacity = 1)}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                  style={{
                    height: "40px",
                    width: "40px",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="rounded-full ml-3"
                  alt="Profile"
                />
                <div>
                  <div className="relative inline-block group">
                    <h1 className="font-semibold">{elm.jobTitle}</h1>
                    {/* {isLong && (
                      <span className="hidden group-hover:block absolute top-full left-0 bg-white p-2 border border-gray-300 z-10">
                        {elm.jobTitle}
                      </span>
                    )} */}
                  </div>
                  <p className="font-light text-md">
                    {formatDate(elm.applicationDeadline)}
                  </p>
                </div>
              </div>
              <p className="mt-3 ps-4 text-md opacity-65 max-[768px]:mt-2 h-12 ">{elm.location} ({elm.workplaceType})</p>
              <p className="ps-4 text-sm opacity-65 mt-3">
                {elm.salaryRange}
              </p>
            </div>
            <div className="mt-auto lg:mb-3 md:mb-3 text-center ">
              {elm.userId === currentUser ? (
                <Link
                to={"/mycreatedjob"}
                state={{ id: elm._id }}
                  className="w-[90%] mx-auto block pt-3  text-xs mt-7 bg-[#EEEEEE] h-10 rounded-3xl hover:bg-[#6166f331] hover:text-[#6165F3] max-[768px]:mb-3 "
                  
                >
                  View Details
                </Link>
              ) : (
                <Link
                to={"/jobdetail"}
                state={{ id: elm._id }}
                  className="w-[90%] mx-auto block text-xs mt-7 pt-3 bg-[#EEEEEE] h-10 rounded-3xl hover:bg-[#6166f331] hover:text-[#6165F3]"
                 
                >
                  Apply Now
                </Link>
              )}
            </div>
                    </div>
                  ))}
             </div>
            
                </div>
              </div>
            )}
          </>
        )}
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default Wishlist;
