import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import { getUserId } from "../../API";

const SelectedInfo = (props) => {
  const [selectedindex, setSelectedindex] = useState(null);
  const [answerState, setSelectedAnswersState] = useState({})
  const [data, setData] = useState([]);
  const token = localStorage.getItem('jwt');
  const userId = getUserId();

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

  const handleShow = (index) => {
    console.log("clicked", index)
    setSelectedindex(selectedindex === index ? null : index);
  };

  const __onchange__ = async (questionId, answer) => {
    const answers = [{
      userId: getUserId(),
      questionId,
      answer
    }]
    console.log({ answer })
    const response = await fetch(`${REACT_APP_API_BASE_URL}/qna/ans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ answers })
    });
    const d = await response.json();
    console.log({ answers: d })
  }

  const profileFilters = async () => {
    try {
      // console.log(`${REACT_APP_API_BASE_URL}/qna/ques/${props.role}?userid=${getUserId()}`)
      const response = await fetch(`${REACT_APP_API_BASE_URL}/qna/ques/${props.role}?userid=${getUserId()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const d = await response.json();
      console.log("question",{d})
      setData(d);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    profileFilters();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 w-auto">
      {data.map((e, i) => (
        <div
          key={i}
          className={`relative w-full sm:w-[48%] md:w-[31%] lg:w-[29%]`}
          style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
        >
          <div
            className="flex items-center gap-3 md:gap-5 justify-between"
            onClick={() => handleShow(i)}
          >
            <p className="text-sm md:text-lg font-semibold mb- md:mb-3 mt-2 md:mt-3 whitespace-nowrap w-[99%] overflow-hidden text-ellipsis">
              {e.question}
            </p>
            <FaAngleDown style={{ fontSize: "20px" }} />
          </div>
          {/* {selectedindex === i && ( */}

          <div className="w-full" style={{ left: "0" }}>
            <div className="flex flex-col justify-center">
              {e.options.map((op, i) => (
                <div key={i} className=" flex items-center">
                  <input
                    defaultChecked={e.answer === op}
                    onChange={() => __onchange__(e._id, op)}
                    className="w-[20px] h-[20px] "
                    type="radio"
                    name={e.question}
                    value={op}
                    id={`checkbox-q-${op}`}
                  />
                  <label className="mx-3 " htmlFor={`checkbox-q-${op}`}>{op.length > 20 ? op.slice(0, 20) + "..." : op}</label>
                </div>
              ))}
            </div>

          </div>

          {/* )} */}
        </div>
      ))}
    </div>
  );
};

export default SelectedInfo;
