import React, { useState, useEffect } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import EventFilters from "./EventFilters";
import { fetchEvent } from "../../API";
import RelatedEvent from "./RelatedEvent";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { Link, useLocation } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const CardComponent = ({ title, imgSrc, onSave,navigate }) => (
  <Link to='/eventdetail'
  state={{id:navigate}}
  className="lg:h-[30vh] h-[25vh] lg:w-[12vw] md:w-[20vw] sm:w-[25vw] w-[80%] relative cursor-pointer m-0 text-white  max-[375px]:w-[98rem] max-[320px]:w-[65.4%]" >
  {/* // <div className=" md:h-[20rem] md:w-[19rem] h-[15rem] w-[8rem] bg-black relative cursor-pointer m-0 text-white"> */}
    <img
      className="h-full md:w-[19rem] w-[12rem] rounded-lg object-cover"
      src={imgSrc ? imgSrc : "/loading.jpg"}
      alt="Card Img"
    />
    <div className="absolute inset-0 flex justify-between ShadedBG rounded-lg">
      <h5 className="text-sm ps-2 absolute bottom-2 w-[93%] backdrop-blur-sm py-2 rounded-2xl overflow-hidden whitespace-nowrap text-ellipsis">{title}</h5>
      <IoBookmarkOutline 
        className="absolute lg:right-2 lg:top-4 lg:text-2xl cursor-pointer top-2 right-1" 
        onClick={onSave} // Call the save function passed as prop
      />
    </div>
  </Link>
);

function Event() {
  const [newcard, setNewCard] = useState([]);
  const [filterLoopData, setFilterLoopData] = useState([]);
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

  }, [filteredData]);

  const handleSaveToWishlist = async (eventId) => {
    const user_id = getUserId(); // Function to get user ID from cookies
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'event',
        wishItemId: eventId,
        userId: user_id,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
      });
      toast.success('Event saved to wishlist!'); // Notify on success
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Notify on error
    }
  };

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
    <div className="h-full w-[100%] ">
      <ToastContainer />
      <div className="w-full h-[10%] ">
        <EventFilters data={{newcard ,setFilterLoopData}} />
      </div>
      <div className="h-[89%] bg-white mt-1 w-full overflow-y-scroll Podcast_Top_Videos">
        <h3 className="text-xl font-bold my-3 w-[95%] mx-auto ml-8">
          Suggested Events
        </h3>
        <div className="h-full w-[95%]  mx-auto">
          <div className="py-6 w-full overflow-auto Podcast_Top_Videos ">
          <div className="flex w-max  gap-1  ml-2">
            {filterLoopData.length > 0 ? (
              filterLoopData.map((data, i) => (
                <CardComponent
                  key={i}
                  title={data.eventTitle}
                  navigate={data._id}
                  imgSrc={data.eventCoverUrl || "loading.jpg"}
                  onSave={(e) => {
                    e.stopPropagation();
                    handleSaveToWishlist(data._id);
                  }}
                />
              ))
            ) : "No Filter Result Match"}
          </div>
          </div>
          <h3 className="text-xl font-bold my-3 w-[95%] ml-2">
          Related Events
        </h3>
          <RelatedEvent data={{setNewCard, setFilterLoopData, filterLoopData}} />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Event;
