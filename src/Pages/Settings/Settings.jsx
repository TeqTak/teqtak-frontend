import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { RiContactsBook2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsBagCheck } from "react-icons/bs";
import { PiBasketThin, PiBookOpenText, PiChatCircleSlashLight } from "react-icons/pi";
import { LuScrollText } from "react-icons/lu";
import { SlLock } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";
// import Cookies from 'js-cookie';



const Setting = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      localStorage.removeItem("jwt");
    });
    navigate('/') 
  };
  
  return (
    <div className=" w-full h-full bg-white overflow-y-scroll Podcast_Top_Videos ">
      <div className="flex justify-between items-center h-[11%]  py-3 w-[90%] mx-auto">
        <div className=" text-lg">
          <h1 className="">Settings</h1>
        </div>
     
      </div>
      <div className="w-[90%] h-[89%] mx-auto flex lg:justify-between ">


          <div className="max-[425px]:w-[39%] w-[45%] whitespace-nowrap">
            <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/appliedjobs')}><BsBagCheck className="text-2xl text-gray-500"/> Applied Jobs</p>
            <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/mytickets')}><PiBasketThin className="text-2xl text-gray-500"/> Tickets Bought</p>
            <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/watchhistory')}><GoHistory className="text-2xl text-gray-500"/> Watch History</p>
          
            {/* <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/contactaccess')}><RiContactsBook2Line className="text-2xl text-gray-500"/> Access to your Contacts</p> */}
            {/*  */}
            <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2"  onClick={()=>navigate('/wdr')}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="text-gray-500 text-[16px]"><path fill="currentColor" d="m10.46 6l.54-.59V9a1 1 0 0 0 2 0V5.41l.54.55A1 1 0 0 0 15 6a1 1 0 0 0 0-1.42l-2.29-2.29a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21L9 4.54A1 1 0 0 0 10.46 6M12 12a3 3 0 1 0 3 3a3 3 0 0 0-3-3m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1m-7-1a1 1 0 1 0 1-1a1 1 0 0 0-1 1m14 0a1 1 0 1 0-1 1a1 1 0 0 0 1-1m1-7h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h4a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3"/></svg>WidthDraw Request</p>
            
            
            <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2"  onClick={()=>navigate('/blocklist')}><PiChatCircleSlashLight className="text-2xl text-gray-500"/> Blocked user list</p>
            <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={handleLogout}><FiLogOut className="text-2xl text-gray-500"/> Logout</p>
          </div>


          <div className="max-[425px]:w-[39%] w-[45%] whitespace-nowrap mx-10 ">
          <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/devicepermission')}><HiMiniDevicePhoneMobile className="lg:text-2xl  text-gray-500"/> Device Permissions</p>
          {/* <p className="py-5 border-b border-gray-200 flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/paymentmethod')}><CiCreditCard1 className="text-2xl text-gray-500"/> Cards</p> */}
          {/*  */}
          <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/epr')}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" className="text-gray-500"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8M7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-1.991 5A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.183 17.465 7.53 17.845 9 17.96v-1.003c-1.318-.114-2.468-.457-3.327-1.005C4.623 15.283 4 14.31 4 13c0-.553.448-1 1.009-1h11.723A2 2 0 0 0 15 11zM19 14.5v3a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5m-1 3v-1a1.5 1.5 0 0 0-1.5 1.5h1a.5.5 0 0 1 .5-.5m0-3a.5.5 0 0 1-.5-.5h-1a1.5 1.5 0 0 0 1.5 1.5zm-6.5-.5a.5.5 0 0 1-.5.5v1a1.5 1.5 0 0 0 1.5-1.5zm-.5 3.5a.5.5 0 0 1 .5.5h1a1.5 1.5 0 0 0-1.5-1.5zm3.5-3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/></svg>My Requests</p>
          
          
          <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/privacy')}><LuScrollText className="text-2xl text-gray-500"/> Privacy policy</p>
          <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/terms')}><PiBookOpenText className="text-2xl text-gray-500"/> Terms of Use</p>
          <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/changepassword')}><SlLock className="text-2xl text-gray-500"/> Change Password</p>
          <p className="py-5 border-b border-gray-200 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/wishlist')}><IoBookmarkOutline className="text-2xl text-gray-500"/> WishList</p>
            
          </div>
      </div>
    </div>
  );
};

export default Setting;
