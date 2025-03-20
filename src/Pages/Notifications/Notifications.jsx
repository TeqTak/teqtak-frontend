import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_URL = REACT_APP_API_BASE_URL;

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [visibleId, setVisibleId] = useState(null);

  // Function to fetch notifications directly from the API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/${getUserId()}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setNotifications(response.data.data); // Update state with fetched notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Helper function to get the user ID from cookies
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
  // Toggle the visibility of the delete menu for each notification
  const handleToggleMenu = (id) => {
    setVisibleId(visibleId === id ? null : id);
  };

  // Handle the deletion of a notification
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notifications/${id}`); // Delete specific notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      ); // Update notifications state after delete
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications when the component mounts
  }, []);

  return (
    <Fragment>
      <div className="h-full w-full bg-white">
        <div className="main h-full w-[90%] m-[auto]">
          <p className="text-lg h-[10%] flex items-center">Notification</p>
          <div className="h-[90%] overflow-y-scroll Podcast_Top_Videos">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex justify-between py-3 mt-2 border-b"
                >
                  <div className="flex gap-2">
                    <Link to="/profile">
                      <img
                        src={notification.imgSrc || "/placeholder.jpg"} // Fallback image URL
                        alt={`Notification from user ${notification._id}`}
                        className={`lg:h-[50px] lg:w-[50px] rounded-full h-[30px] w-[30px] ${notification.role === 'investor' ? 'border-[3px] border-[#FF3434] p-1' : 
    notification.role === 'entrepreneur' ? 'border-[3px] border-[#6165F3] p-1' : 'border-[#E6E6E6] p-1'}`}
                      />
                    </Link>
                    <div>
                      <p className="text-[15px] opacity-75">
                        {notification.notiTitle}
                      </p>
                      <p>
                        <Link
                          to="#"
                          className="text-[blue] underline text-[13px] opacity-75 "
                        >
                          {notification.notiDesc}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-[gray] text-[13px] opacity-75">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                    <CiMenuKebab
                      className="mt-2 ms-2 text-lg cursor-pointer"
                      onClick={() => handleToggleMenu(notification._id)}
                    />
                    {visibleId === notification._id && (
                      <div className="absolute w-[200px] cursor-pointer right-0 px-3 py-2 z-30 bg-white shadow-lg border">
                        <p
                          className="text-[15px] opacity-75 text-[red]"
                          onClick={() => handleDelete(notification._id)}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No Notifications Available
              </p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Notification;
