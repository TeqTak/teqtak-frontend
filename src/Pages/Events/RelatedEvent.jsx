import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { fetchEvent } from "../../API";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const RelatedEvent = ({ data }) => {
  const { setNewCard, filterLoopData, setFilterLoopData } = data;
  const location = useLocation();
  const filteredData = location.state?.filteredData;

 
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEvent(); // Fetch event data from API
        setFilterLoopData(result.data); // Set the event data in state
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };

    // Check for filteredData passed from location state
    if (filteredData && filteredData.length > 0) {
      setNewCard(filteredData);
    } else {
      getData(); // Fetch event data if no filterData exists
    }

  }, [filteredData,setFilterLoopData, setNewCard]);
  // Handle event sharing
  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this event!",
          url: window.location.href,
        });
        toast.success('Event link shared successfully!'); // Notify on success
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing the event link.'); // Notify on error
      }
    } else {
      toast.error('Web Share API is not supported in your browser.'); // Notify if not supported
    }
  };

  // Handle adding event to wishlist
  const handleSaveToWishlist = async (eventId) => {
    const user_id = getUserId(); // Function to get user ID from cookies
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'event',
        wishItemId: eventId,
        userId: user_id,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      toast.success('Event saved to wishlist!'); // Notify on success
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Notify on error
    }
  };

  // Function to get user ID from cookies
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

  return (
    <div className="mt-3 flex flex-wrap gap-1 lg:gap-2 w-full mx-auto">
      <ToastContainer /> {/* Include ToastContainer for notifications */}
      {filterLoopData.length > 0 ? (
        filterLoopData.map((data, i) => (
          <div key={i} className="m-0 text-white md:w-[32%] w-[48.4%] lg:h-[42vh] h-[37vh] relative rounded-2xl">
            <img
              src={data.eventCoverUrl ? data.eventCoverUrl : "/loading.jpg"}
              alt="Card Img2"
              className="h-full w-full rounded-lg object-cover cursor-pointer"
            />
            <IoBookmarkOutline 
              className="absolute lg:right-2 lg:top-4 lg:text-2xl cursor-pointer top-2 right-1" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleSaveToWishlist(data._id); 
              }} 
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
        ))
      ) : (
        "No Filter Result Match"
      )}
    </div>
  );
}

export default RelatedEvent;
