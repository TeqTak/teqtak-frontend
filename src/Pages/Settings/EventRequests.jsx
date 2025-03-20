import React, { useEffect, useState } from 'react'
import { REACT_APP_API_BASE_URL } from '../../ENV'
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../API';


const painter = (e) => {
    console.log({ e })
    const colorMap = {
        pending: "orange",
        approve: "green",
        denied: "red"
    }
    console.log({ map: colorMap[e] })
    return colorMap[e]

}

const EventRequests = () => {

    const [payReqs, setpayReqs] = useState([])
    const navigate = useNavigate()
    const fetchMyPayReqs = async () => {
        console.log(`${REACT_APP_API_BASE_URL}/payreq/${getUserId()}`)
        // const res = await fetch(`${REACT_APP_API_BASE_URL}/payreq`)
        const res = await fetch(`${REACT_APP_API_BASE_URL}/payreq/${getUserId()}`)
        const data = await res.json()
        setpayReqs(data.data)
        console.log({ data: data.data })
    }
    useEffect(() => {
        fetchMyPayReqs()
    }, [])

    return (
        <div
            className='flex flex-col  h-[90vh] overflow-y-auto bg-white' style={{
                WebkitOverflowScrolling: "touch",
                WebkitScrollbar: { display: "none" },
                "-msOverflowStyle": "none",
                scrollbarWidth: "none",
            }}>
            <div className='flex '>
                <FaAngleLeft
                    className="cursor-pointer mx-1  mt-4 text-[25px] "
                    onClick={() => navigate("/settings")}
                />
                <h1 className='mt-4'>  My Payment Requests</h1>
            </div>
            {/* table head */}

            <div className='flex '>

                <div
                    className="flex w-full  justify-around items-center -fixed top-0 py-5 rounded-sm shadow bg-white">
                    <p className='text-base text-[#3a3939] text-center max-sm:hidden'>Cover</p>
                    <p className='text-base text-[#3a3939] text-center w-[15%]'>Title</p>
                    <p className='text-base text-[#3a3939] text-center w-[10%]'>Amount</p>
                    <p className='text-base text-[#3a3939] text-center w-[15%]'>Status</p>
                </div>
            </div>

            {/* table body */}
            {payReqs && payReqs.map((e, i) => (
                <div
                    key={i}
                    className="flex justify-around items-center rounded-md hover:shadow-xl transition-all">
                    {/* img */}
                    <img
                        className='w-[4rem] h-[4rem] object-contain max-sm:hidden'
                        src={e.event.eventCoverUrl} alt="" />
                    <p className='text-[12px] text-[#4c4c4c] h-full text-center flex justify-center items-center w-[15%] border-solid border-black'>{e.event.eventTitle}</p>
                    <p className='text-[12px] text-[#4c4c4c] h-full text-center flex justify-center items-center w-[10%] border-solid border-black'>$ {e.amount}</p>
                    <p className={` text-center flex justify-center items-center w-[15%] bg-${painter(e.requestStatus)}-600 p-1 rounded-xl text-base text-center text-white `}>{e.requestStatus}</p>
                </div>
            ))}

        </div>
    )
}

export default EventRequests