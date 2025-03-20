import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const MoreInfo = ({ userPk, role, setSelectedAnswers }) => {
  const [selectedindex, setSelectedindex] = useState(null);
  const [selectedAnswersState, setSelectedAnswersState] = useState({});
  const [data, setData] = useState([]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswersState((prev) => ({
      ...prev,
      [questionId]: answer, 
    }));
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer, 
    }));
  };

  
const token = localStorage.getItem('jwt');
  const handleShow = (index) => {
    setSelectedindex(selectedindex === index ? null : index);
  };

  const profileFilters = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/qna/ques/${role}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${token}`
        },
      });
      const d = await response.json();
 
      setData(d);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    profileFilters();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 w-auto overflow-x-hidden">
      {data.map((entrepreneur, index) => (
        <div
          key={entrepreneur._id}
          className={`relative w-full sm:w-[48%] md:w-[31%] lg:w-[29%] mx-2`}
          style={{ margin: "0px", padding: "0px", cursor: "pointer" }}
        >
          <div
            className="flex items-center gap-3 md:gap-5 justify-between"
            onClick={() => handleShow(index)}
          >
            <p className="text-sm md:text-lg font-semibold mb-2 md:mb-3 mt-2 md:mt-3 whitespace-nowrap w-[99%] overflow-hidden text-ellipsis">
              {entrepreneur.question}
            </p>
            <FaAngleDown style={{ fontSize: "20px" }} />
          </div>
          {selectedindex === index && (
            <div className="w-full py-3 md:py-5 mt-2" style={{ left: "0" }}>
              {entrepreneur.options?.map((elm, ind) => (
                <div key={ind} className="flex mt-1 py-1 md:py-2 items-center">
                  <input
                    type="radio"
                    name={`question-${entrepreneur._id}`}
                    value={elm}
                    onChange={() => handleAnswerChange(entrepreneur._id, elm)}
                    checked={selectedAnswersState[entrepreneur._id] === elm}
                    className="me-2"
                  />
                  <p className="text-sm md:text-base whitespace-nowrap">{elm}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoreInfo;
