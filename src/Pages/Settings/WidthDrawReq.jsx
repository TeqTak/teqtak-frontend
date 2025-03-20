import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { getUserId } from '../../API'
import { REACT_APP_API_BASE_URL } from '../../ENV'
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const inputs = [
    { view: "Email", type: "email", placeholder: "example@gmail.com", required: false },
    { view: "Phone", type: "phoneNumber", placeholder: "+1000030483940", required: false },
    { view: "Bank Account No.", type: "bankAccount", placeholder: "Your back account", required: false },
    { view: "Stripe Account No.", type: "stripeId", placeholder: "Your Stripe account", required: false },
    { view: "PayPal Account No.", type: "paypalId", placeholder: "Your PayPal account", required: false },
]

const WidthDrawReq = () => {
    const [state, setState] = useState({})
    const [events, setEvents] = useState([])
const navigate =  useNavigate()


    const __onChange__ = (e) => {
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }



    const __submit__ = async () => {
        const payload = {
            ...state,
            userId: getUserId(),
        }
       
        const res = await fetch(`${REACT_APP_API_BASE_URL}/payreq`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        const data = await res.json()
        console.log({responseData:data})
    }


    const fetchEvents = async () => {
        console.log("user", `${REACT_APP_API_BASE_URL}/users/${getUserId()}`)
        const res = await fetch(`${REACT_APP_API_BASE_URL}/users/${getUserId()}`)
        const data = await res.json()
        const userEvent = data.data.events
        setEvents(userEvent)
        console.log({ userEvent })
    }
    useEffect(() => {
        const data = fetchEvents()
    }, [])



    return (

<Fragment>
<div className='h-[100vh] lg:h-[90vh] flex-col  items-center overflow-y-auto bg-white'  style={{
            WebkitOverflowScrolling: "touch",
            WebkitScrollbar: { display: "none" },
            "-msOverflowStyle": "none",
            scrollbarWidth: "none",
          }}>
<div className='flex'>
        <FaAngleLeft
             className="cursor-pointer mx-1  mt-4 text-[25px] "
             onClick={() => navigate("/settings")}
           />
         <h1 className='mt-4'>  Withdraw Requests</h1>
        </div>
        <div className='flex justify-center h-[80vh]  flex-col gap-1 items-center overflow-y-auto bg-white'>


            {/* Event Select */}
            <select
                onChange={(e) => __onChange__(e)}
                name="eventId">
                {events && events.map((e, i) => (
                    <option
                        key={e._id || i} // Prefer a unique key from the data if available
                        className="w-[30rem] p-5 outline-none"
                        value={e._id}
                    >
                        {e.eventTitle}
                    </option>
                ))
                }
                    <option  className="w-[30rem] p-5 outline-none" value={"null"}>None</option>
            </select>


            {/* input */}

            {inputs.map((e, i) => (
                <div key={i} className="flex flex-col">
                    <label className='my-1' htmlFor={e.type}>{e.view}</label>
                    <input
                        onChange={(e) => __onChange__(e)}
                        placeholder={e.placeholder}
                        name={e.type}
                        id={e.type}
                        required
                        className='w-[19rem] border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline' type="text" />
                </div>
            ))}



            {/* button */}
            <button
                onClick={__submit__}
                className='w-[19rem] mt-3 text-xl font-semibold h-12 border rounded-3xl linear_gradient text-white py-2 px-3 '>Submit</button>


        </div>
</div>
</Fragment>
    )
}


export default WidthDrawReq