import React from 'react'

const TextComp = ({imgSrc,sender,message,time}) => {
  return (
    <div  className="flex items-start my-2 flex-col justify-between py-2">
    <div className="flex gap-2">
      <img
        src={imgSrc}
        // src={getUserId() !== e.sender ? sender.picUrl || '/placeholder.jpg' : receiver ? receiver.picUrl || 'placeholder.jpg' : '/placeholder.jpg'}
        alt="profile"
        className="h-[40px] w-[40px] rounded-full"
      />

      <div className="flex">
        <div className="max-w-[70%]">
          <p className="text-sm font-medium">{sender}</p>
          {/* <p className="text-sm font-medium">{e.sender !== getUserId() ? sender.name : "You"}</p> */}
          <p className="text-[#686868] text-xs mt-3">{message}</p>
        </div>
      </div>
    </div>
    {/* <button onClick={()=>deleteMessage(e.messageId)} >Delete</button> */}
    <p className="text-[gray] text-[10px] break-words">{time}</p>
    {/* <p className="text-[gray] text-[10px] break-words">{__Time__(e.timestamp)}</p> */}
    {/* <MeetingCall/> */}
  </div>
  
  )
}

export default TextComp