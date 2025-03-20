import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserId } from "../../API";
import { REACT_APP_API_BASE_URL } from "../../ENV";


function Zoommeeting() {
  const location = useLocation()
  const navigate = useNavigate()
  const [receiver, setReceiver] = useState({})
  const [roomId, setRoomId] = useState('')
  const [state, setState] = useState({})
  const id = location.state.id
  const createMeeting = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/meetings`, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(state)
      });
      const result = await response.json(); // Parse the JSON response
      console.log("Success:", result);
      if(result.message=='success'){
          navigate('/messages/user1',{state:{id}})
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const __onchange__ = (e) => {
    console.log({ e })
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      roomId,
      senderId: getUserId(),
      receiverId: receiver.Users_PK
    }))
  }



  useEffect(() => {
    console.log("creating zoom meeting")
    console.log({ location })
    console.log({ roomId: location.state.roomId })
    console.log({ receiver: location.state.receiver })
    setRoomId(location.state.roomId)
    setReceiver(location.state.receiver)
    // console.log({roomId:location.state.state.roomId})

  }, [])



  return (
    <>
      <div className="bg-white w-full h-full">
        <div className="main h-full overflow-y-scroll Podcast_Top_Videos w-[90%] m-auto">
          <div className='flex items-center gap-4 px-4 py-4 md:px-8 md:py-8'>
            <Link to='/messages/user1' state={{id}}>
              <FaArrowLeftLong size={30} className='border-2 border-black p-2 rounded-md' />
            </Link>
            <h1 className='text-xl md:text-3xl font-bold whitespace-nowrap'>Create a Zoom Meeting</h1>
          </div>

          <p className="text-lg md:text-xl font-semibold">To:</p>
          <div className="h-auto w-full md:w-[60%] bg-gray-100 rounded-xl py-2 px-4 flex items-center">
            <img
              src={receiver.picUrl || "/placeholder.jpg"}
              alt=""
              className="h-[40px] w-[40px] object-cover rounded-full"
            />
            <p className="font-medium w-full ml-2">{receiver.name || "no name"}</p>
          </div>

          <div className="mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="" className="block text-lg md:text-xl font-medium">
                  Meeting Title *
                </label>
                <input
                  name="title"
                  type="text"
                  onChange={(e) => __onchange__(e)}
                  placeholder="First interview"
                  className="w-full md:w-[60%] border outline-none rounded-lg p-3 mb-4 mt-1"
                />
                

                <label htmlFor="" className="block text-lg md:text-xl font-medium">
                  Select date *
                </label>
                <input
                  name="time"
                  onChange={(e) => __onchange__(e)}
                  type="datetime-local" className="border w-full md:w-[60%] p-3 rounded-lg outline-none mt-1 mb-4" />
              
              </div>

              <div className="flex-1">
                <label htmlFor="" className="block text-lg md:text-xl font-medium">
                  Paste Call Link *
                </label>
                <input
                    onChange={(e) => __onchange__(e)}
                    type="text"
                    required
                    name="url"
                    placeholder="Paste Call Link"
                    className="w-full md:w-[60%] border outline-none rounded-lg p-3 mb-4 mt-1"
                  />
                <div className="">
                

                  <label htmlFor="" className="block text-lg md:text-xl font-medium mt-4">
                    Any Text *
                  </label>
                  <input
                    name="agenda"
                    onChange={(e) => __onchange__(e)}
                    type="text"
                    placeholder="Enter text"
                    className="w-full md:w-[60%] border outline-none rounded-lg p-3 mb-4 mt-1"
                  />

                 
                </div>
                <button
                    onClick={createMeeting}
                    className="h-[7vh] w-full linear_gradient rounded-3xl text-white mt-5 ">
                    Schedule meeting
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Zoommeeting;
