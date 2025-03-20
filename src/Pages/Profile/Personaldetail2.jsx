import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import MoreInfo from "./MoreInfo";

function Personaldetail2() {
  const [user, setUser] = useState({});
  const [subscriber, setSubscriber] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const location = useLocation();
  const userID = location.state?.id;
  const role = location.state?.role;
 const token = localStorage.getItem(`jwt`)

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

  const navigate = useNavigate();

  const _onChange_ = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitUserDetails();

      await submitAnswers();

      navigate("/personaldetails",{state:{id:userID, role:role}});
    } catch (error) {
      console.error("Error during data submission:", error);
    }
  };

  const submitUserDetails = async () => {
    try {
      
      const req = await fetch(
        `${REACT_APP_API_BASE_URL}/users/update/${getUserId()}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization":`Bearer${token}`
          },
          body: JSON.stringify(user),
        }
      );

      const d = await req.json();
    console.log("asd",d)
    } catch (error) {
      console.error("Error submitting user details:", error);
      throw error;
    }
  };
const userPk = getUserId()
  const submitAnswers = async () => {
    try {
      const answersToSubmit = Object.keys(selectedAnswers).map(
        (questionId) => ({
          questionId,
          userId: userPk,
          answer: selectedAnswers[questionId],
        })
      );


      const req = await fetch(`${REACT_APP_API_BASE_URL}/qna/ans`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer${token}`
          
        },
        body: JSON.stringify({
        answers: answersToSubmit,
        }),
      });

      const d = await req.json();
     
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/subscribe/my/${getUserId()}`,{
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer${token}`
          },
        }
      );
      const data = await response.json();
     
      setSubscriber(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    
    fetchSubscribers();
  }, []);

  return (
    <Fragment>
      <div
        className="h-full bg-white w-full px-6 md:h-auto max-[425px]:h-auto lg:h-[99%] 
      overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          WebkitScrollbar: { display: "none" },
          "-msOverflowStyle": "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="flex items-center gap-4 pt-2">
          <Link to="/personaldetails" state={{ id: userID }}>
            <FaArrowLeftLong
              size={30}
              className="border-2 border-black p-1 rounded-md"
            />
          </Link>
          <p className="text-2xl font-semibold pl-4">Personal Details</p>
        </div>

        <p className="text-lg font-semibold mt-5">Total Subscriber</p>
        <p className="text-[gray]">{subscriber.length} Subscribers</p>

        <p className="text-xl font-semibold mt-5">Description</p>
        <input
          type="text"
          id="DES"
          name="description"
          placeholder="Add Your Description Here"
          className="border mt-2 mb-3 w-full md:w-[80%] p-2 rounded-lg"
          onChange={_onChange_}
        />

        <p className="text-xl font-semibold mt-5">Personal info</p>

        <div className="flex flex-wrap mt-5">
          <div className="w-full md:w-[50%]">
            <label htmlFor="name" className="block text-base font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your  Name"
              className="border mt-2 mb-3 w-full md:w-[80%] p-2 rounded-lg"
              onChange={_onChange_}
            />
            <label htmlFor="work" className="block text-base font-medium">
              Work Experience
            </label>
            <input
              type="text"
              id="work"
              name="work_experience"
              placeholder="Enter Your Experience"
              className="border mt-2 mb-5 w-full md:w-[80%] p-2 rounded-lg"
              onChange={_onChange_}
            />
             {/* <label htmlFor="role" className="block text-base font-medium">
              User Role
            </label>
          <select name="role" id="role"  className="border mt-2 mb-5 w-full md:w-[80%] p-2 rounded-lg outline-none " onChange={_onChange_}>
            <option value="investor"> Investor</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="viewer">Viewer</option>
          </select> */}
          </div>

          <div className="w-full md:w-[50%]">
            <label htmlFor="study" className="block text-base font-medium">
              Education
            </label>
            <input
              type="text"
              id="study"
              name="education"
              placeholder="Enter Your Education"
              className="border mt-2 mb-5 w-full md:w-[80%] p-2 rounded-lg"
              onChange={_onChange_}
            />
            <label htmlFor="location" className="block text-base font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter Your Location"
              className="border mt-2 mb-5 w-full md:w-[80%] p-2 rounded-lg"
              onChange={_onChange_}
            />
          </div>

     {role !== "viewer" && (
          <>
           <p className="text-xl font-semibold mt-5">More info</p>
           <MoreInfo
             userPk={userID}
             role={role}
             setSelectedAnswers={setSelectedAnswers}
           />
          </>
     ) }

          <div className="my-8">
            <button
              type="button"
              className="text-white w-[100px]  rounded-md linear_gradient p-1"
              onClick={handleSubmit}
            >
              Save 
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Personaldetail2;
