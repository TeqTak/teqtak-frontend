import React, { Fragment, useEffect, useState } from "react";
import { BsCalendar4Event, BsSuitcaseLg } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile, getUserId } from "../../API";
import PublicProfileVideos from "./PublicProfileVideos";
import PublicProfilePodcats from "./PublicProfilePodcats";
import PublicProfileEvents from "./PublicProfileEvents";
import PublicProfileJobs from "./PublicProfileJobs";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const ProfilePublic = ({ userId }) => {
  const navigate = useNavigate();
  const [data_, setDATA] = useState({ rating: {} });
  const [activeTab, setActiveTab] = useState("Video");
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const token = localStorage.getItem('jwt');
  // const getUserId = () => {
  //   const cookies = document.cookie.split(';'); 
  //   for (let cookie of cookies) {
  //     const [key, value] = cookie.trim().split('='); 
  //     if (key === 'user') { 
  //       return value; 
  //     }
  //   }
  //   return null; 
  // };



  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append('profilePic', file);
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/profilepic/${getUserId()}`, {
        credentials: 'include',
        headers: { 'Authorization': `Bearer ${token}` },
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log('Profile updated:', data);
      await fetchProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchProfileData = async () => {
    try {
      const result = await fetchProfile(getUserId());
      setProfile(result.user);
      setDATA(result.data || { rating: {} });
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
        starsArray.push(<FaStar key={i} className="text-[#FFDD55] text-sm md:text-lg" />);
      } else if (i === filledStars && hasHalfStar) {
        starsArray.push(<FaStarHalf key={i} className="text-[#FFDD55] text-sm md:text-lg" />);
      } else {
        starsArray.push(<FaStar key={i} className="text-gray-400 text-sm md:text-lg" />);
      }
    }

    return starsArray;
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const isCurrentUser = getUserId();
  console.log(`isCurrentUser`, isCurrentUser);
  const isViewer = profile.role === 'viewer';
  return (
    <Fragment>
      <div className="bg-white h-[90vh] w-full">
        <div className="w-full md:w-[25%] h-auto md:h-[6%] flex items-center gap-3 ps-3">
          <p className="text-lg flex items-center px-3">Profile</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center h-auto mt-4 md:mt-0">
          <div className="flex md:flex-row gap-4 w-full md:w-[75%] items-center md:items-center xl:items-center justify-center">
            <div className="rounded-full flex justify-end items-center md:justify-end w-[30%] relative
            ">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer" aria-label="Upload Profile Picture">
                <img
                loading="eager"
                  className={`rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover
                    ${profile.role === 'investor' ? 'border-[3px] border-[#FF3434] p-1' :
                      profile.role === 'entrepreneur' ? 'border-[3px] border-[#6165F3] p-1' : 'border-[#E6E6E6] p-1'}`}

                  src={profile.picUrl ? profile.picUrl : "/placeholder.jpg"} // Fallback URL
                  alt="Profile"
                />
                <FaPlus className="absolute lg:bottom-2 bottom-2 md:bottom-1 text-white text-xl p-1 bg-blue-700 rounded-full" />
              </label>
            </div>
            <div className="py-3 px-4 md:px-6 w-[50%]">
              <h1 className="text-lg md:text-xl">{profile.name || profile.userName}</h1>
              <div className="flex py-1 space-x-2">
                {renderStars(data_.rating?.globalrating || 0)} {/* Render the stars */}
                <h1 className="text-xs md:text-sm">{data_.rating?.globalrating?.toFixed(1) || '0.00'} out of 5</h1>
              </div>
              <p className="text-xs md:text-sm opacity-65">{data_.rating?.totalRatings || 0} global ratings</p>
              <div className="flex text-blue-600 text-xs md:text-sm py-2">
                <Link to='/personaldetails' state={{ id: profile.Users_PK }}>view personal info</Link>
                <MdKeyboardArrowRight className="text-xl md:text-2xl" />
              </div>
              <div className="flex gap-2 sm:flex-nowrap text-nowrap max-[600px]:hidden">
                {isCurrentUser ? (
                  <>
                    <button
                      className={`px-6 py-2 rounded-2xl text-lg ${loading ? 'bg-gray-400' : 'bg-[#F6F6FF]'}`}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => navigate('/personaldetail2')}
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-6 py-2 rounded-2xl text-lg bg-[#F6F6FF]"
                      onClick={createChatRoom}
                    >
                      Message
                    </button>
                    <button
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                    >
                      Subscribe
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden mt-5 mb-2 gap-2 sm:flex-nowrap text-nowrap max-[600px]:flex justify-center">
            {isCurrentUser ? (
              <>
                <button
                  className={`px-5 py-2 rounded-2xl text-[16px] ${loading ? 'bg-gray-400' : 'bg-[#F6F6FF]'}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => navigate('/personaldetail2')}
                  className="px-5 py-2 rounded-2xl text-[16px] text-white bg-[#6165F3]"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-6 py-2 rounded-2xl text-lg bg-[#F6F6FF]"
                  onClick={createChatRoom}
                >
                  Message
                </button>
                <button
                  className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                >
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex text-[25px] items-center justify-center border-t-[2px] h-[13%]">
          <div className="w-[50%] flex justify-between py-2 max-[425px]:w-[80%]">
            {isViewer ? null :
              <CiVideoOn
                className="cursor-pointer opacity-70"
                onClick={() => setActiveTab("Video")}
                size={35}
              />}
            <PiApplePodcastsLogoThin
              size={39}
              className="cursor-pointer opacity-90"
              onClick={() => setActiveTab("Podcast")}
            />
            <BsCalendar4Event
              className="cursor-pointer opacity-60"
              onClick={() => setActiveTab("Event")}
              size={30}
            />
            <BsSuitcaseLg
              className="cursor-pointer opacity-60"
              onClick={() => setActiveTab("Job")}
              size={32}
            />
          </div>
        </div>
        <section className="h-[50%] w-full overflow-y-scroll Podcast_Top_Videos mb-4">
          {activeTab === "Video" && <PublicProfileVideos videos={data_.videos} />}
          {activeTab === "Podcast" && <PublicProfilePodcats podcast={data_.podcast} user={profile} />}
          {activeTab === "Event" && <PublicProfileEvents events={data_.events} />}
          {activeTab === "Job" && <PublicProfileJobs jobs={data_.jobs} />}
        </section>
      </div>
    </Fragment>
  );
};

export default ProfilePublic;
