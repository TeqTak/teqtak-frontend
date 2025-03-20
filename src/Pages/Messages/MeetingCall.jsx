import { useEffect, useState } from "react";


const MeetingCall = (props) => {
  const [data, setData] = useState({})
  const [time, setTime] = useState({})
  const parseZoomContent = (str) => {
    const content = str.split('=')[1];
    try {
      console.log("in string is",str)
      const data = JSON.parse(content)
      return data

    } catch (error) {
      console.log({ error })
      return {}

    }
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  }

  // const str = '<zoom>={"agenda":"Diccu","receiverId":"10b0da16-76e1-4fba-ab42-cb20a7f704bb","roomId":"c016a7df-28d2-4048-a0b1-f539381be576","senderId":"10b0da16-76e1-4fba-ab42-cb20a7f704bb","time":"2024-11-16T15:11","title":"Good Boy","url":"https://google.com"}'

  // console.log("data is",formatDateTime(data.time))

  //   console.log("meeting call props are",props)



  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const d = parseZoomContent(props.payload)
    console.log({ data: formatDateTime(d.time) })
    setData(d)
    setTime(formatDateTime(d.time))


  }, [])


  return (
    <div className='w-[20rem] max-[480px]:w-[13rem] max-[375px]:w-[10rem] rounded-[1rem] z-30  pb-8 gap-5 flex flex-col  items-center shadow-inner border-solid border-[#a5a5a5] border-[1px] ' >
      <div className="bg-blue-600 h-[4rem] w-full rounded-t-[1rem] flex justify-center items-center text-white font-bold">
        Start  {time.date || "data"}
      </div>
      <div className="flex justify-start flex-col gap-y-2 w-full pl-4">
        <p className='font-bold'>Meeting Invite</p>
        <p className='text-gray-500'>Title: <span className='text-black font-medium'>{data.title || "NaN"}</span></p>
        <p className='text-gray-500'>Date: <span className='text-black font-medium'>{time.time}</span></p>
        <p className='text-gray-500'>Type: <span className='text-black font-medium'>Zoom Meeting</span></p>
      </div>
      <div className="flex flex-row max-[480px]:gap-2  gap-7 justify-center items-center">
        <a className='px-8 py-2 rounded-xl max-[480px]:px-4 font-bold bg-white border border-black border-solid cursor-pointer'>Reject</a>
        <a href={data.url || "#"} className='px-8 py-2 max-[480px]:px-4 rounded-xl font-bold text-white bg-blue-600 border border-black border-solid'>Accept</a>
      </div>
    </div>
  )
}

export default MeetingCall