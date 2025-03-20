import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { fetchEvent } from "../../API";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const SuggestedEvents = () => {
  const [newcard, setNewCard] = useState([]);
  const location = useLocation();
  const filteredData = location.state?.filteredData;
  const navigate = useNavigate();

  // Fetch events data
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEvent(); 
        console.log(result);
        setNewCard(result.data);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    if (filteredData && filteredData.length > 0) {
      setNewCard(filteredData);
    } else {
      getData();
    }
  }, [filteredData]);

  // Handle Share functionality
  const handleShare = async (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up and triggering scroll to top
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

  // Save event to Wishlist
  const handleSaveToWishlist = async (eventId, e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up and triggering scroll to top
    const user_id = getUserId(); // Function to get user ID from cookies
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'event',
        wishItemId: eventId,
        userId: user_id,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
      });
      console.log('Wishlist item saved:', response.data);
      toast.success('Event saved to wishlist!'); // Notify on success
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Notify on error
    }
  };

  // Function to get the user ID from cookies
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

  // Scroll to top before navigating to event details
  const handleBuyTicketsClick = (eventId) => {
    // Scroll to the top of the page before navigating
    window.scrollTo(0, 0);
    // Navigate to the event detail page
    navigate("/eventdetail", { state: { id: eventId } });
  };

  return (
    <>
      <h3 className="text-xl font-bold my-6 mx-auto">
        Related Events
      </h3>
      <div className="mt-3 flex flex-wrap gap-1 w-full mx-auto">
        <ToastContainer /> {/* Include ToastContainer for notifications */}
        {newcard.map((data, i) => (
          <div key={i} className="m-0 text-white md:w-[32%] w-[48.4%] lg:h-[42vh] h-[37vh] relative rounded-2xl">
            <img
              src={data.eventCoverUrl ? data.eventCoverUrl : "/loading.jpg"}
              alt="Card Img2"
              className="h-full w-full rounded-lg cursor-pointer object-cover"
            />
            <IoBookmarkOutline 
              className="absolute lg:right-2 lg:top-4 lg:text-2xl cursor-pointer top-2 right-1" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering on parent elements
                handleSaveToWishlist(data._id, e); // Pass the event ID
              }} 
            />
            <div className="w-full absolute bottom-1">
              <div className="SVTBottom w-[95%] mx-auto lg:px-3 lg:py-2 rounded-lg px-1">
                <small className="block lg:text-xl  w-[93%] overflow-hidden whitespace-nowrap text-ellipsis">{data.eventTitle}</small>
                <p className="text-xs py-2">{data.eventCatagory}</p>
                <p className="text-sm lg:pb-2  w-[93%] overflow-hidden whitespace-nowrap text-ellipsis">{data.eventLocation}</p>
                <div className="flex items-center mb-1">
                  <button
                    className="me-2 md:px-5 lg:py-2 py-[3px] JobButtonBgBlur md:w-auto w-[70%] text-sm text-white rounded-full text-center"
                    onClick={() => handleBuyTicketsClick(data._id)} // Scroll to top and navigate on "Buy tickets"
                  >
                    Buy tickets
                  </button>
                  <button 
                    className="md:px-7 lg:py-2 py-[3px] flex justify-center w-[30%] md:w-auto JobButtonBgBlur text-xs text-white rounded-full" 
                    onClick={handleShare} // Prevent scroll to top when share button is clicked
                  >
                    <FaRegShareFromSquare className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SuggestedEvents;
