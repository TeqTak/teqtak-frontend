import { useEffect, useState } from "react"
import { REACT_APP_API_BASE_URL } from "../../ENV"
import { getUserId } from "../../API"
import { useNavigate } from "react-router-dom"

const data = [
    {
        role: "investor",
        type: "Investor",
        desc: "An investor is an individual that puts money into an entity such as a business for a financial return. The main goal of any investor is to minimize risk and maximize return. It is in contrast with a speculator who is willing to invest in a risky asset with the hopes of getting a higher profit."

    },
    {
        role: "entrepreneur",
        type: "Entrepreneur",
        desc: "An entrepreneur is someone who starts or owns a business. Whether it's in farming, retail, manufacturing or in the service sector, entrepreneurs are who find their success by taking risks. They often become disruptors in established industries."
    }
]



const ChangeRole = () => {
    const navigate = useNavigate()
    const [Role, setRole] = useState('')
    const updateRole = async () => {
        console.log(`${REACT_APP_API_BASE_URL}/users/update/${getUserId()}`)
            const res = await fetch(`${REACT_APP_API_BASE_URL}/users/update/${getUserId()}`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"  
                },
                body:JSON.stringify({role:Role,
                    roleUpdate: String(Date.now() + 7 * 24 * 60 * 60 * 1000)})
            })
            const data = await res.json()

     }
    const changeRole = (data) => {
        console.log({ data })
        setRole(data)
    }


    const checkData=async()=>{

        const res = await fetch(`${REACT_APP_API_BASE_URL}/users/${getUserId()}`)
        const data = await res.json()
        const time= parseInt(data?.user?.roleUpdate )
        console.log({user:time})
        const today = Date.now();
         // Get current timestamp in milliseconds
        console.log(today > time)
        if(today < time){
            alert("Can't change at the moment please try later")
            navigate('/settings')
            
        }
         return today > time;

    }
    useEffect(() => { checkData()},[])
    
    return (
        <div className='flex justify-center flex-col gap-4 items-center h-[100%] w-full'>
            <div className="flex justify-center gap-4 items-center w-full">
            {data.map((e, i) => (<div
                key={i}
                className="flex flex-col hover:scale-[1.02] hover:shadow-lg transition-all justify-between gap-2 rounded-md p-5 border border-solid border-purple-900  items-center w-[17rem]">
                <h2 className='text-2xl text-purple-600 font-bold '>{e.type}</h2>
                <p className='text-center text-gray-500'>{e.desc}</p>
                <button onClick={() => changeRole(e.role)} className="linear_gradient px-4 py-2 rounded-3xl text-white">Be {e.type}</button>
            </div>
            ))}
            </div>
          {Role &&  <button
          onClick={updateRole}
            className="linear_gradient transition-all px-4 py-2 rounded-3xl text-white">My Choice is {Role}</button>}
        </div>
    )
}

export default ChangeRole