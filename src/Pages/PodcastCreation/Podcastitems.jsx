import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiVideoOn } from "react-icons/ci";
import { LuPodcast } from "react-icons/lu";
import { BsCalendar4Event, BsSuitcaseLg } from "react-icons/bs";
import { myContext } from "../../Context/CreateContext";
import { RxCross2 } from "react-icons/rx";
import { fetchProfile } from "../../API";
const Podcastitems = () => {
  let navigate = useNavigate();
  let { CreationStates } = useContext(myContext);
const [profile ,setProfile ] = useState({})
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


  const fetchProfileData = async () => {
    try {
      const result = await fetchProfile(getUserId());
      setProfile(result.user);
     
    } catch (error) {
      console.error("Fetching profile data error:", error);
    }
  };
  console.log("profile data loaded",profile)
  useEffect(() => {
    fetchProfileData();
  }, []);
 
  const isViewer = profile.role === 'viewer';
  // Navigation Handlers
  const handleInputFile = () => {
    CreationStates.setCreationPodcast(false);
    navigate("/createvideo");
  };

  const handlePodcastChange = () => {
    CreationStates.setCreationPodcast(false);
    navigate("/createpodcast");
  };

  const handleEventChange = () => {
    CreationStates.setCreationPodcast(false);
    navigate("/createevent");
  };

  const handleJobChange = () => {
    CreationStates.setCreationPodcast(false);
    navigate("/createjob");
  };

  // Close Modal
  const handleCloseModal = () => {
    CreationStates.setCreationPodcast(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-40"
        onClick={handleCloseModal} // Close modal on backdrop click
      ></div>

      {/* Modal */}
      <div className="bg-white lg:w-[40%] md:w-[50%] w-[60%] rounded-2xl relative pb-7 shadow-[0px_5px_5px_0px_black] z-50 mx-auto mt-10 ">
        <hr className="bg-black h-[2px] w-[12%] mt-2 rounded-xl mx-auto" />

        {/* Close Icon */}
        <RxCross2
          className="cursor-pointer absolute top-5 right-3"
          onClick={handleCloseModal}
        />
        
        <h1 className="text-center py-2 pb-5">Create</h1>

        {/* List of items */}
        <div>
          <hr className="text-[#dddddd]" />
        {isViewer ? null :   <div
            className="flex py-5 items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={handleInputFile}
          >
            <CiVideoOn className="text-[20px] ms-3 me-2" />
            <p className="text-[17px]">Videos</p>
          </div>}
          <hr className="text-[#dddddd]" />

          <div
            className="flex py-5 items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={handlePodcastChange}
          >
            <LuPodcast className="text-[20px] ms-3 me-2" />
            <p className="text-[17px]">Podcast</p>
          </div>
          <hr className="text-[#dddddd]" />

          <div
            className="flex py-5 items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={handleEventChange}
          >
            <BsCalendar4Event className="text-[20px] ms-3 me-2" />
            <p className="text-[17px]">Events</p>
          </div>
          <hr className="text-[#dddddd]" />

          <div
            className="flex py-5 items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={handleJobChange}
          >
            <BsSuitcaseLg className="text-[20px] ms-3 me-2" />
            <p className="text-[17px]">Jobs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcastitems;
