import React, { useState, useRef, useEffect } from "react";
import { CiMenuKebab, CiVideoOn } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import { FaAngleLeft } from "react-icons/fa";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { FaCamera, FaPaperclip, FaSmile } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUploadModal from "./FileUploadModel.jsx";
import io from "socket.io-client";
import { deleteChatroom } from "../../DeleteAPI.js";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import { IoMdSend } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";

import CameraCapture from "./CameraCapture.jsx";
import MeetingCall from "./MeetingCall.jsx";
import ImageComp from "./ImageComp.jsx";
import AudioComp from "./AudioComp.jsx";
import VideoComp from "./VideoComp.jsx";

function Message2() {
  const socket = io(REACT_APP_API_BASE_URL);
  const loc = useLocation();
  const [able, setAble] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [meeting, setMeeting] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [chatroom, setChatroom] = useState([]);
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState({});
  const [roomId, setRoomId] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);

  const [file, setFile] = useState(null);

  const cardRef = useRef(null);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const toggleCamera = () => {
    setIsCameraOpen((prev) => !prev);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    console.log("uploading file");
    console.log({ file });
    // // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      data: buffer,
    };

    const tag = file.type ? file.type.split("/")[0] : "unknown"; // Fallback to "unknown" if file.type is unavailable

    const payload = {
      roomId: roomId,
      sender: getUserId(),
      message: { ...fileData, tag },
    };
    socket.emit("sendMedia", { ...payload });
    console.log({ payload });
  };

  const __Time__ = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowCard(false);
      setAble(false);
      setSchedule(false);
      setMeeting(false);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getUserId = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === "user") {
        return value;
      }
    }
    return null;
  };

  const fetchChatroom = async (id) => {
    let url = `${REACT_APP_API_BASE_URL}/chatrooms/room/${id}`;
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const d = await req.json();

    let sender = d.users.filter((e) => e !== getUserId());
    getSenderName(sender[0]);
    setRoomId(id);
  };

  const getSenderName = async (id) => {
    const req = await fetch(`${REACT_APP_API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const d = await req.json();
    setSender(d.user);
    getReceiver();
  };

  const getReceiver = async () => {
    const req = await fetch(`${REACT_APP_API_BASE_URL}/users/${getUserId()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const d = await req.json();
    setReceiver(d.user);
  };

  const joinRoom = (id) => {
    socket.off("connection", "");
    socket.on("connection", (socket_) => {});
    socket.emit("joinRoom", { roomId: id, userId: getUserId() });
    // socket.on("pos", (socket) => {});
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { roomId, sender: getUserId(), message });

      setMessage("");
    } else if (selectedFile) {
      setSelectedFile(null);
    } else if (selectedEmoji) {
      setSelectedEmoji("");
    }
  };

  useEffect(() => {
    fetchChatroom(loc.state.id);
    joinRoom(loc.state.id);
    socket.on("receiveMessage", (message) => {
      setChatroom((prevMessages) => [...prevMessages, message]);
    });

    socket.on("previousMessages", (previousMessages) => {
      setChatroom(previousMessages);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("previousMessages");
    };
  }, [loc.state.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatroom]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  const id = loc.state.id;

  const handleSchedule = () => {
    setSchedule(!schedule);
    setMeeting(false);
    setShowCalendar(false);
  };

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const toggleCard = () => {
    setShowCard(!showCard);
  };
  const handleDelete = async () => {
    await deleteChatroom(roomId);
    window.location.href = "https://teqtak.com/messages";
  };

  const handleFileClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    console.log("setting file");
    setFile(e.target.files[0]);
    if (file) {
      setSelectedFile(file);
      setShowFileUploadModal(true);
      setShowCard(false);
    }
  };
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowCard(false);
  };

  const closeModal = () => {
    setShowFileUploadModal(false);
    setSelectedFile(null);
  };

  const extractZoomUrl = (str) => str.split("<zoom>=")[1];
  const extractImgUrl = (str) => str.split("<image>=")[1];
  const extractAudioUrl = (str) => str.split("<audio>=")[1];
  const extractVideoUrl = (str) => str.split("<video>=")[1];

  return (
    <>
  
      <div className="main h-full w-[100%] ">
        {isCameraOpen && (
          <CameraCapture closeCameraCapture={() => setIsCameraOpen(false)} />
        )}
        <div className="div h-full w-[100%] bg-[#f5f3f3] py-5 px-2 relative">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <FaAngleLeft
                className="cursor-pointer mt-1"
                onClick={() => navigate("/messages")}
              />
              {/* <img src={sender.picUrl || '/placeholder.jpg'} alt=""  className="h-[40px] w-[40px] rounded-full"/> */}
              <Link
                to="/userprofile"
                state={{ id: sender.Users_PK }}
                className="text-xl font-medium whitespace-nowrap"
              >
                {sender ? sender.name : "Unknown"}
              </Link>
            </div>
            <div className="flex gap-5">
              <CiMenuKebab
                className="text-2xl cursor-pointer"
                onClick={() => setAble((prevAble) => !prevAble)}
              />
              {able && (
                <div
                  ref={cardRef}
                  className="absolute w-[200px] cursor-pointer right-4 top-14 px-3 py-2 z-30 bg-white shadow-lg border"
                  onClick={() => setAble(false)}
                >
                  <p className="text-[15px] opacity-75 mb-5">
                    Block and report
                  </p>
                  <p
                    className="text-[15px] opacity-75 text-[red]"
                    onClick={handleDelete}
                  >
                    Delete
                  </p>
                </div>
              )}
              <CiVideoOn
                className="text-2xl cursor-pointer"
                onClick={handleSchedule}
              />
              {schedule && (
                <div
                  className="absolute w-[200px] cursor-pointer right-4 top-14 px-3 py-1 z-30 bg-white shadow-lg border"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <p
                    ref={cardRef}
                    className="text-lg opacity-75"
                    onClick={() =>
                      navigate("/zoom", { state: { roomId, name: "muneeb" } })
                    }
                  >
                    Schedule a meeting
                  </p>
                  {true && (
                    <div
                      ref={cardRef}
                      className="absolute w-[200px] cursor-pointer right-0 top-12 px-3 py-1 text-md z-30 bg-white shadow-lg border"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Link
                        to="/createmeeting"
                        state={{ roomId, receiver, id }}
                        className="pt-1"
                      >
                        Create Zoom Meeting
                      </Link>
                      {/* <p ref={cardRef} onClick={handleCalendar} className="py-2">
                        Schedule Zoom Meeting
                      </p> */}
                      {/* <p>Dial into Zoom Meeting</p> */}
                    </div>
                  )}
                </div>
              )}
              {showCalendar && (
                <div
                  ref={cardRef}
                  className="absolute right-4 top-14 z-30 bg-white shadow-lg border p-2"
                >
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <div className="lg:h-[70%] h-[50vh] overflow-y-scroll Podcast_Top_Videos">
            {chatroom &&
              chatroom.map((e, i) => (
                <div
                  key={i}
                  className="flex  items-end    justify-between py-2"
                >
                  <div className="flex gap-2">
                    <img
                      src={
                        getUserId() !== e.sender
                          ? sender.picUrl || "/placeholder.jpg"
                          : receiver
                          ? receiver.picUrl || "placeholder.jpg"
                          : "/placeholder.jpg"
                      }
                      alt="profile"
                      className={`h-[40px] w-[40px] rounded-full   object-cover    ${
                        sender.role === "investor"
                          ? "border-[2px] border-[#FF3434] p-[2px]"
                          : sender.role === "entrepreneur"
                          ? "border-[2px] border-[#6165F3] p-[2px]"
                          : "border-[#E6E6E6] p-[1px]"
                      }`}
                    />
                    <div className="flex">
                      <div className="max-w-[70%] ">
                        <p className="text-sm font-medium">
                          {e.sender !== getUserId() ? sender.name : "You"}
                        </p>
                        <p className="text-[#686868] text-xs mt-3">
                          {/* {e.message} */}
                          {e.message[0] !== "<" ? e.message : ""}
                          {extractAudioUrl(e.message) && (
                            <AudioComp payload={e.message} />
                          )}
                          {extractZoomUrl(e.message) && (
                            <MeetingCall payload={e.message} />
                          )}
                          {extractImgUrl(e.message) && (
                            <ImageComp payload={e.message} />
                          )}
                          {extractVideoUrl(e.message) && (
                            <VideoComp payload={e.message} />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[gray] text-[10px] break-words">
                    {__Time__(e.timestamp)}
                  </p>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center justify-center w-[98%] relative top-4">
            <GrGallery
              className="text-[#7979ec] text-xl mr-3 cursor-pointer"
              onClick={toggleCard}
            />
            <div className="flex-grow">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Write a message"
                className="h-[5vh] w-full outline-none rounded p-4 bg-transparent border"
              />
            </div>
            {message.trim() || selectedFile || selectedEmoji ? (
              <FaPaperPlane
                onClick={sendMessage}
                className="text-xl text-[gray] ml-3 cursor-pointer"
              />
            ) : (
              <FaMicrophone className="text-xl text-[gray] ml-3" />
            )}

            {file?<BiMailSend
            onClick={uploadFile}
             className="ms-2 text-[1.75rem] text-[gray]" />:""}
          </div>
          {showCard && (
            <div
              ref={cardRef}
              className="absolute bottom-[8vh] left-5 w-[8rem] p-3 bg-white shadow-lg rounded"
            >
              <ul className="space-y-3">
                <li className="flex items-center cursor-pointer"  onClick={toggleCamera}>
                  <FaCamera
                    className="text-[gray]"
                    
                  />
                  <p className="text-[gray] text-sm ms-3">Capture</p>
                </li>
                <li className="flex items-center cursor-pointer"  onClick={() => handleEmojiSelect("😊")}>
                  <span>
                    <FaSmile className="text-[gray]" />
                  </span>
                  <p className="text-[gray] text-sm ms-3">Emoji</p>
                </li>
                <li className="flex items-center  cursor-pointer" onClick={handleFileClick}>
                  <span className="" >
                    <FaPaperclip className="text-[gray] " />
                  </span>
                  <p className="text-[gray] text-sm ms-3">Attachment</p>
                  <input
                    name="file"
                    id="file-input"
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </li>
              </ul>
            </div>
          )}
          {showFileUploadModal && selectedFile && (
            <FileUploadModal
              isOpen={showFileUploadModal}
              onClose={closeModal}
              selectedFiles={[selectedFile]}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Message2;
