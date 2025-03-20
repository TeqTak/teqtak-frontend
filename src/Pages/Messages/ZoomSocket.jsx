import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { FaAngleLeft } from "react-icons/fa";
import { useLocation, useNavigate, } from 'react-router-dom';
import { REACT_APP_API_BASE_URL } from '../../ENV'
import { getUserId } from '../../API';

// Adjust to your server URL
const socket = io.connect(REACT_APP_API_BASE_URL); // Adjust to your server URL


const saveRoomId__ = (str) => {
  try {
    const existingValue = localStorage.getItem("teqtak_room_id");

    if (existingValue) {
      console.log(`Updating existing room ID from ${existingValue} to ${str}`);
    } else {
      console.log(`Creating new room ID: ${str}`);
    }
    localStorage.setItem("teqtak_room_id", str);
    console.log("String stored successfully.", str);
  } catch (error) {
    console.error("Error storing string in localStorage:", error);
  }
};


const saveRoomId = (str) => {
  try {
    const existingValue = localStorage.getItem("teqtak_room_id");

    // Check if str is null or undefined
    if (str === null || str === undefined) {
      console.warn("Provided room ID is null or undefined. Returning the existing value.");
      return existingValue; // Return the current value without updating
    }

    // Log whether it's an update or a new entry
    if (existingValue) {
      console.log(`Updating existing room ID from ${existingValue} to ${str}`);
    } else {
      console.log(`Creating new room ID: ${str}`);
    }

    // Save the new room ID
    localStorage.setItem("teqtak_room_id", str);
    console.log("String stored successfully:", str);

    // Return the old value for reference
    return existingValue || null; // Return null if no old value existed
  } catch (error) {
    console.error("Error storing string in localStorage:", error);
    return null;
  }
};




const getRoomId = () => {
  try {
    const roomId = localStorage.getItem("teqtak_room_id");

    if (roomId) {
      console.log(`Retrieved room ID: ${roomId}`);
      return roomId;
    } else {
      console.log("No room ID found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving room ID from localStorage:", error);
    return null;
  }
};







const ZoomSocket = () => {

  const location = useLocation()
  console.log("zoom socket", location?.state?.roomId)
  const navigate = useNavigate()



  const [authUrl, setAuthUrl] = useState("N/A");
  const [roomId, setRoomId] = useState("");
  const [meetingUrls, setMeetingUrls] = useState({ startUrl: '', joinUrl: '' });
  const [accessToken, setAccessToken] = useState('');




  const sendMessage = (roomId, url) => {
    console.log("sending Message")
    socket.emit("sendMessage", { roomId, sender: getUserId(), message: url });

  };



  useEffect(() => {
    saveRoomId(location?.state?.roomId)
    console.log("ruuning getting funcation")
    setRoomId(getRoomId())
    socket.emit('zoomAuth', { roomId });
    socket.on('receiveAuthUrl', (url) => {
      setAuthUrl(url);
      location.search.split("=")[1] && requestMeeting()
    });
    socket.on('receive_url', (data) => {
      console.log("received payload", { data })
      setMeetingUrls({ startUrl: data.sender, joinUrl: data.joiner });
      sendMessage(getRoomId(),`<zoom>=${data.sender}`)
      // console.log("Received Meeting URLs:", {data});
      // window.location.href = data.sender
    });

    return () => {
      socket.off('receiveAuthUrl');
      socket.off('receive_url');
    };
  }, []);






  const requestMeeting = () => {

    socket.emit('sendMeetingUrl', location.search.split("=")[1]);

    // socket.emit('sendMeetingUrl', location.search.split("=")[1],roomId);
    // socket.emit('sendMeetingUrl', accessToken);
  };

  return (
    <Fragment>
      <div className='w-full h-[90vh] bg-white'>
        <div>
          <FaAngleLeft
            className="cursor-pointer absolute top-2 mx-5"
            size={20}
            onClick={() => navigate("/messages")}
          />
          <h1 className='ml-9 pt-2 px-1'>Messages</h1>
        </div>
        <div className='w-full h-[80vh] flex flex-col justify-center text-center items-center '>
          <h1>Zoom Authorization and Meeting <br />{roomId ? roomId : "NONE"}</h1>

          {authUrl ? (
            <div className='px-8 py-3 rounded-3xl bg-blue-600 hover:bg-blue-900 text-white '>
              <a href={authUrl} target="_blank" rel="noopener noreferrer">
                Start metting
              </a>
            </div>
          ) : (
            <p>Loading authorization URL...</p>
          )}

          <button onClick={requestMeeting}>
            Request New Meeting {location.search.split("=")[1]}
          </button>

          {meetingUrls.startUrl || meetingUrls.joinUrl && (
            <div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ZoomSocket;
