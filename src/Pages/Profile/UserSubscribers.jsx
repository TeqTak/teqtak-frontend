import React, { useState, useEffect, Fragment } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

function UserSubscribers() {
  const location = useLocation();
  const [subscriber, setSubscriber] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [able, setAble] = useState(null);

  // Get userId from location state
  const userId = location.state?.id;
 const token = localStorage.getItem('jwt');

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

  const fetchSubscribers = async () => {
    if (!userId) return; // Ensure userId is available
    try {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/subscribe/my/${userId}`,{
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
    
      setSubscriber(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/block?userId=${getUserId()}`,{
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer${token}`
          }
        }
      );
      const data = await response.json();
     
      setBlockedUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      setBlockedUsers([]);
    }
  };

 

  useEffect(() => {
    fetchSubscribers();
    fetchBlockedUsers(); // Also fetch blocked users
  }, [userId]); // Run this effect when userId changes

  return (
    <Fragment>
      <div className="h-full w-full bg-white md:h-screen lg:h-screen xl:h-screen">
        <div className="main h-full w-[90%] mx-4 md:w-[80%] lg:w-[60%] xl:w-[70%]">
          <p className="text-lg h-[10%] bg-white font-bold w-full z-10 flex items-center md:text-xl lg:text-xl xl:text-2xl">
            My Subscribers
          </p>
          <div className="flex  justify-between md:flex-row lg:flex-row xl:flex-row text-sm md:text-xl lg:text-lg xl:text-xl font-bold whitespace-nowrap max-[766px]:font-normal">
            <h1>Total Subscribers </h1>
            <h2>{subscriber.length}</h2>
          </div>
          <div className="overflow-y-auto h-[550px]">
            {subscriber.map((subsc) => (
              <div
                key={subsc._id}
                className="flex items-center justify-between py-3 mt-2 border-b"
              >
                <div className="flex items-center gap-3">
                  <Link to="/userprofile">
                    <img
                      src={
                        subsc.user?.picUrl
                          ? subsc.user.picUrl
                          : "/placeholder.jpg"
                      }
                      alt=""
                      className={`h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] rounded-full ${subsc.user.role === 'investor' ? 'border-[3px] border-[#FF3434] p-1' : 
    subsc.user.role === 'entrepreneur' ? 'border-[3px] border-[#6165F3] p-1' : 'border-[#E6E6E6] p-1'}`}
                    />
                  </Link>
                  <div>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl opacity-75">
                      {subsc.user?.name || "Unknown"}
                    </p>
                    <p>
                      <Link
                        to="##"
                        className="text-xs md:text-sm lg:text-base xl:text-lg opacity-75"
                      >
                        {subsc.linkText}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <CiMenuKebab
                    className="text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
                    onClick={() =>
                      setAble(able === subsc._id ? null : subsc._id)
                    }
                  />
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserSubscribers;
