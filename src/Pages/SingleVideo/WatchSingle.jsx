import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsInfoSquare } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Model from "../ModalReport/Model";
import Review from "../Podcast/Review";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;
const WatchSingle = () => {
  let navigate = useNavigate();
  const { src } = useParams();
  const location = useLocation();
  const [repModOpen, setRepModOpen] = useState(false);
  const [revModOpen, setRevModOpen] = useState(false);
  const [video, setVideo] = useState();
  const [videos, setVideos] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
 const [watch ,setWatch] = useState(null)
 
const token = localStorage.getItem('jwt')
  const videoId = decodeURIComponent(src);

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

  const getVideo = async () => {
    const req = await fetch(`${REACT_APP_API_BASE_URL}/upload/${videoId}`, {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await req.json();
    setVideo(data);
  };

  

  useEffect(() => {
    
    if (location.state && location.state.id) {
      setVideos(location.state.id); 
      const info = location.state.id.map((elm)=> elm.data )
  
      setWatch(info)
     
      const currentVideo = info.find(v => v._id === videoId);
   
      if (currentVideo) {
        setVideo(currentVideo);
        setVideoIndex(info.findIndex(v => v._id === videoId));
      }
    }
    getVideo();
  }, [videoId, location.state]);
 
  const useDebounce = (callback, delay) => {
    const timerRef = useRef(null);
  
    const debouncedCallback = (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  
    useEffect(() => {
      return () => {
        clearTimeout(timerRef.current); // Clean up on unmount
      };
    }, []);
  
    return debouncedCallback;
  };

  const handleScroll = (direction) => {
    if (direction === "down") {
      if (videoIndex < videos.length - 1) {
        const nextVideoId = videos[videoIndex + 1]._id;
        navigate(`/video/${encodeURIComponent(nextVideoId)}`, { state: { videos } });
      }
    } else {
      if (videoIndex > 0) {
        const prevVideoId = videos[videoIndex - 1]._id;
        navigate(`/video/${encodeURIComponent(prevVideoId)}`, { state: { videos } });
      }
    }
  };
  
  const debouncedHandleScroll = useDebounce(handleScroll, 200);
  
  // Event handler for mouse wheel (desktop)
  const handleWheel = (e) => {
    debouncedHandleScroll(e.deltaY > 0 ? "down" : "up");
  };
  
  // Event handlers for touch (mobile)
  let touchStartY = 0;
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };
  
  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const direction = touchEndY < touchStartY ? "down" : "up";
    debouncedHandleScroll(direction);
  };
  
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [debouncedHandleScroll]);

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video && video.data ? video.data.videoDesc : 'Check this video!',
          text: 'Watch this video!',
          url: window.location.href,
        });
        toast.success('Share successful!'); // Using toast for success
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing the video.'); // Using toast for error
      }
    } else {
      toast.warn('Web Share API is not supported in your browser.'); // Using toast for warning
    }
  };
  const subscribeUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscriberId: getUserId(), subscribedToId: video?.user?.Users_PK }),
      });
      if (response.ok) {
        const result = await response.json();
        setIsSubscribed(true);
      
      } else {
        const error = await response.json();
        console.error('Error subscribing:', error.message);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const unsubscribeUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe/${video?.user?.Users_PK}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        setIsSubscribed(false);
      
      } else {
        const error = await response.json();
        console.error('Error unsubscribing:', error.message);
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const toggleSubscription = () => {
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoId]);

  // Check if the user is already subscribed when the component mounts
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/subscribe/my/${video?.user?.Users_PK}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const subscriptions = await response.json();
          const currentUserId = getUserId();
          const isUserSubscribed = subscriptions.some(sub => sub.subscriberId === currentUserId);
          setIsSubscribed(isUserSubscribed);
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    if (video) {
      checkSubscriptionStatus();
    }
  }, [video]);
  return (
    <Fragment>
      <section className="h-full w-full relative flex items-center bg-white">
        {revModOpen && (
          <div className="h-[95%] left-0 w-full absolute top-0 z-20 flex justify-center items-center">
            <Review videoId={videoId} setRevModOpen={setRevModOpen}  comp={'video'} videoUrl={video?.data?.videoUrl}/>
          </div>
        )}
        {repModOpen && (
          <div className="h-full w-full absolute top-0 z-20 flex justify-center items-center">
            <Model setRepModOpen={setRepModOpen}  comp={'video'} videoUrl={video?.data?.videoUrl}/>
          </div>
        )}
        <div className="w-[80%] sm:w-[65%] md:w-[55%] lg:h-[95%] h-[90%] mx-auto rounded-xl relative">
          <div className="absolute z-10 rounded-lg left-0 top-0 h-full w-full ShadedBG">
            <div
              className="absolute cursor-pointer flex gap-2 items-center ps-4 py-2 text-lg text-white left-0 z-10"
              onClick={() => navigate("/watchhistory")}
            >
              <FaChevronLeft className="text-xs" />
              Videos
            </div>
            <div className="absolute z-10 bottom-3 w-[60%] sm:w-[43%] p-3 text-white">
             <Link to="/userprofile"
              state={{id :video && video.user ? video.user.Users_PK :" "}}
             >
             <p className="text-xl font-semibold">
             {video?.user?.name || video?.user?.userName || 'NO_NAME'}
              </p>
             </Link>
              <p className="py-1 w-[80%] text-sm">
                {video && video.data ? video.data.videoDesc : 'Loading...'}
              </p>
              <p className="py-1 w-[80%] text-sm">
                {video && video.data && video.data.videoTags
                  ? video.data.videoTags.map(tag => `#${tag}`).join(' ')
                  : 'Loading...'}
              </p>
            </div>
            <div className="absolute bottom-3 z-10 right-2 text-white">
              <div className="relative cursor-pointer rounded-full flex justify-center" >
               <Link to="/userprofile"
               state={{id :video && video.user ? video.user.Users_PK :" "}}
               >
               <img
                  src={video && video.user ? video.user.picUrl : "/placeholder.jpg"}
                  style={{ height: "40px", width: "40px" }}
                  className={`rounded-full ${
                    video?.user?.role === 'investor' ? 'border-[2px] border-[#FF3434] p-[1px]' : 
  video?.user?.role === 'entrepreneur' ? 'border-[2px] border-[#6165F3] p-[1px]' : 'border-[#E6E6E6] p-1'
                  }`}
                  alt="User Profile "
                />
               </Link>
               {!isSubscribed && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="absolute -bottom-2 p-1 text-xs bg-blue-700 rounded-full cursor-pointer"
                    onClick={toggleSubscription}
                  />
                )}
              </div>
              <div className="text-center cursor-pointer mt-5" onClick={() => setRepModOpen(true)}>
                <p className="text-xs">
                  <BsInfoSquare className="block text-lg mx-auto" />
                  Report
                </p>
              </div>
              <div className="text-center cursor-pointer mt-5" onClick={() => setRevModOpen(true)}>
                <p className="text-xs">
                  <CiStar className="block text-2xl mx-auto" />
                  Reviews
                </p>
              </div>
              <div className="text-center cursor-pointer mt-5 mb-3" onClick={shareContent}>
                <p className="text-xs m-0">
                  <FaRegShareFromSquare className="block text-lg mx-auto" />
                  Share
                </p>
              </div>
            </div>
          </div>
          <video
            src={video && video.data ? video.data.videoUrl : ''}
            autoPlay
            className="h-full relative z-0 rounded-xl w-full bg-slate-300 object-cover"
           
          ></video>
        </div>
      </section>

      <ToastContainer /> {/* Include ToastContainer for rendering notifications */}
    </Fragment>
  );
};

export default WatchSingle;

