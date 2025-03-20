import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCalendar4Event, BsSuitcaseLg } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { fetchProfile } from "../../API";
import PublicProfileVideos from "./PublicProfileVideos";
import PublicProfilePodcats from "./PublicProfilePodcats";
import PublicProfileEvents from "./PublicProfileEvents";
import PublicProfileJobs from "./PublicProfileJobs";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import UserSub from "./UserSub";

const API_BASE_URL = REACT_APP_API_BASE_URL;
const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.id;

  // Get userId from location state

  const [data_, setDATA] = useState({});
  const [activeTab, setActiveTab] = useState("Video");
  const [profile, setProfile] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [loading, setLoading] = useState(false);

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
  const subscribeUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subscriberId: getUserId(),
          subscribedToId: userId,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        setIsSubscribed(true);
      } else {
        const error = await response.json();
        console.error("Error subscribing:", error.message);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const unsubscribeUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
        },
      });
      if (response.ok) {
        setIsSubscribed(false);
      } else {
        const error = await response.json();
        console.error("Error unsubscribing:", error.message);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/subscribe/my/${userId}`,{
          method: "GET",
          headers: { "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const subscriptions = await response.json();

          const isSubscribed = subscriptions.some(
            (sub) => sub.subscriberId === getUserId()
          );
          setIsSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    if (userId) {
      fetchProfileData(userId);
      checkSubscriptionStatus(); // Check subscription status on mount
    }
  }, [userId]);

  const fetchProfileData = async (id) => {
    try {
      const result = await fetchProfile(id); // Use the userId passed in
      setProfile(result.user);
      setDATA(result.data);
    } catch (error) {
      console.error("Fetching profile data error:", error);
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5; // Total number of stars
    const filledStars = Math.floor(rating); // Whole filled stars
    const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
    const starsArray = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        starsArray.push(
          <FaStar key={i} className="text-[#FFDD55] text-sm md:text-lg" />
        );
      } else if (i === filledStars && hasHalfStar) {
        starsArray.push(
          <FaStarHalf key={i} className="text-[#FFDD55] text-sm md:text-lg" />
        );
      } else {
        starsArray.push(
          <FaStar key={i} className="text-gray-400 text-sm md:text-lg" />
        );
      }
    }

    return starsArray;
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId); // Fetch profile data based on userId from location state
    }
  }, [userId]); // Depend on userId

  const isCurrentUser = getUserId() === userId; // Check if the current user is the same as the profile being viewed
  const __message__ = async (id) => {
    const req = await fetch(
      `${REACT_APP_API_BASE_URL}/chatrooms/${getUserId()}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ user: id }),
      }
    );
    const data = await req.json();

    if (data) {
      navigate("/messages/user1", { state: { id: data._id } });
    } else {
      console.error("Failed to create chat room:", data.error);
    }
  };
  return (
    <Fragment>
      <div className="bg-white h-full w-full overflow-y-hidden">
        <div className="w-full md:w-[25%] h-auto md:h-[6%] flex items-center gap- ps-3">
          <FaChevronLeft
            className="text-ms cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="text-lg flex items-center px-1">Profile</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center h-auto  mt-4 md:mt-0">
          <div className="flex  md:flex-row gap-4 w-full md:w-[75%] items-center md:items-center xl:items-center justify-center">
            <div className="rounded-full flex justify-end items-center md:justify-end w-[30%] relative ">
              <label htmlFor="fileInput" aria-label="Upload Profile Picture">
                <img
                  className={`rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover
                    ${profile.role === 'investor' ? 'border-[3px] border-[#FF3434] p-1' : 
    profile.role === 'entrepreneur' ? 'border-[3px] border-[#6165F3] p-1' : 'border-[#E6E6E6] p-1'}`}
                  src={profile.picUrl || "/placeholder.jpg"} // Fallback URL
                  alt="Profile"
                />
              </label>
            </div>
            <div className="py-3 px-4 md:px-6  w-[50%] ">
              <h1 className="text-lg md:text-xl">
                {profile.name || profile.userName}
              </h1>
              <div className="flex py-1 space-x-2">
                {renderStars(data_.rating?.globalrating || 0)}{" "}
                {/* Render the stars */}
                <h1 className="text-xs md:text-sm">
                  {data_.rating?.globalrating.toFixed(1) || "0.00"} out of 5
                </h1>
              </div>
              <p className="text-xs md:text-sm opacity-65">
                {data_.rating?.totalRatings || 0} global ratings
              </p>
              <div className="flex text-blue-600 text-xs md:text-sm py-2">
                <Link to="/personaldetails" state={{ id: profile.Users_PK }}>
                  view personal info
                </Link>
                <MdKeyboardArrowRight className="text-xl md:text-2xl" />
              </div>
              <div className="flex  gap-2 lg:flex-wrap  sm:flex-nowrap text-nowrap max-[600px]:hidden">
                {isCurrentUser ? (
                  <>
                    <button
                      className={`px-6 py-2 rounded-2xl text-lg ${
                        loading ? "bg-gray-400" : "bg-[#F6F6FF]"
                      }`}
                      disabled={loading}
                    >
                      {loading ? "Uploading..." : "Save Changes"}
                    </button>
                    <button
                      // onClick={() => console.log(profile)}
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-6 py-2 rounded-2xl text-lg bg-[#F6F6FF]"
                      onClick={() => __message__(profile.Users_PK)}
                    >
                      Message
                    </button>
                    <button
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                      onClick={isSubscribed ? unsubscribeUser : subscribeUser}
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden mt-5 mb-2 gap-2 lg:flex-wrap  sm:flex-nowrap text-nowrap max-[600px]:flex justify-center">
            {isCurrentUser ? (
              <>
                <button
                  className={`px-6 py-2 rounded-2xl text-lg ${
                    loading ? "bg-gray-400" : "bg-[#F6F6FF]"
                  }`}
                 
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Save Changes"}
                </button>
                <button
                  onClick={() => navigate("/personaldetail2")}
                  className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-6 py-2 rounded-2xl text-lg bg-[#F6F6FF]"
                  onClick={() => __message__(profile.Users_PK)}
                >
                  Message
                </button>
                <button className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]">
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex text-[25px] items-center justify-center border-t-[2px] h-[8%]">
          <div className="w-[50%] flex justify-between py-2 max-[425px]:w-[80%]">
            <CiVideoOn
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Video")}
            />
            <PiApplePodcastsLogoThin
              size={30}
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Podcast")}
            />
            <BsCalendar4Event
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Event")}
            />
            <BsSuitcaseLg
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Job")}
            />
            <IoPeopleOutline
              size={30}
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Subscribers")}
            />
          </div>
        </div>
        <section className="h-[54%] w-full overflow-y-scroll Podcast_Top_Videos">
          {activeTab === "Video" && (
            <PublicProfileVideos videos={data_.videos} />
          )}
          {activeTab === "Podcast" && (
            <PublicProfilePodcats podcast={data_.podcast} user={profile} />
          )}
          {activeTab === "Event" && (
            <PublicProfileEvents events={data_.events} />
          )}
          {activeTab === "Job" && <PublicProfileJobs jobs={data_.jobs} />}
          {activeTab === "Subscribers" && <UserSub />}
        </section>
      </div>
    </Fragment>
  );
};

export default UserProfile;
