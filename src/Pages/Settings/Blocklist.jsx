import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;
function Blocklist() {
  let navigate = useNavigate();
  const [blockedUsers, setBlockedUsers] = useState([]);
const token = localStorage.getItem('jwt')
  // Function to get the logged-in user ID from cookies
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

  // Fetch blocked users from API
  const fetchBlockedUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/block/${getUserId()}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }  );
      const data = await response.json();
      console.log("Blocked users fetched:", data)
      setBlockedUsers(data.data);

    } catch (error) {
      console.error('Error fetching blocked users:', error);
    }
  };
console.log("blocekit",blockedUsers)
  // Unblock a user
  const unblockUser = async (userId) => {
    try {
     
  
      const response = await fetch(`${API_BASE_URL}/block/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getUserId(),
          blockedId: userId,
        }),
      });
  
      if (response.ok) {
        // Immediately update the state to reflect the unblocking
        setBlockedUsers(prevBlockedUsers => 
          prevBlockedUsers.filter(user => user._id !== userId)
        );
       
      } else {
        const responseData = await response.json();
        console.error('Failed to unblock user:', responseData);
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  useEffect(() => {
    fetchBlockedUsers(); // Fetch blocked users when component loads
  }, []);

  return (
    <div className='bg-white w-full h-full'>
      <h4 className="flex items-center gap-2 ms-4 h-[10%]">
        <FaAngleLeft
          className="cursor-pointer"
          onClick={() => navigate("/settings")}
        />
        Blocked user list
      </h4>
      <div className="main h-[90%] overflow-y-scroll Podcast_Top_Videos w-[90%] m-[auto]">
        <div>
          {blockedUsers.length > 0 ? blockedUsers.map((block) => (
            <div key={block._id}>
              <div className="flex justify-between pb-4 pt-4">
                <div className="flex gap-4">
                  <img
                    src={block.user.picUrl || "/placeholder.jpg"}
                    alt=""
                    className={`h-[50px] w-[50px] rounded-full ${block.user.role === 'investor' ? 'border-[2px] border-[#FF3434] p-[2px]' : 
    block.user.role === 'entrepreneur' ? 'border-[2px] border-[#6165F3] p-[2px]' : 'border-[#E6E6E6] p-1'}`}
                  />
                  <div>
                    <p className='text-base font-medium'>{block.user.name || block.user.userName || "unknown"}</p>
                    <p className='text-gray-400'>{ block.user.userName || block.user.role}</p>
                  </div>
                </div>
                <button
                  className='h-[7vh] md:w-[10%] w-[20%] bg-gray-100 rounded-lg max-[375px]:w-[25%]'
                  onClick={() => unblockUser(block._id)}
                >
                  Unblock
                </button>
              </div>
              <hr className="border-gray-300 w-[90%]" />
            </div>
          )) : <p>No blocked users</p>}
        </div>
      </div>
    </div>
  );
}

export default Blocklist;
