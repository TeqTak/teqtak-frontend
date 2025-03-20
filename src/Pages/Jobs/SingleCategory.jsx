import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Calendar2() {
  let navigate = useNavigate();
  let location = useLocation();

  const { title, data } = location.state || { title: "Jobs", data: [] }; // Extract title and data from location state
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date"; // Return a message for undefined dates

    // Normalize the date input by replacing dashes with slashes
    const normalizedDateString = dateString.replace(/[-]/g, "/");

    // Split the date parts
    const dateParts = normalizedDateString.split("/");

    let day, month, year;

    // Check for different formats
    if (dateParts.length === 3) {
      if (dateParts[0].length === 4) {
        // Format: YYYY/MM/DD
        year = dateParts[0];
        month = dateParts[1] - 1; // Month is zero-indexed
        day = dateParts[2];
      } else {
        // Format: DD/MM/YYYY
        day = dateParts[0];
        month = dateParts[1] - 1; // Month is zero-indexed
        year = dateParts[2];
      }

      const date = new Date(year, month, day);
      if (
        date.getDate() === parseInt(day) &&
        date.getMonth() === month &&
        date.getFullYear() === parseInt(year)
      ) {
        return `${("0" + day).slice(-2)}/${("0" + (month + 1)).slice(
          -2
        )}/${year}`;
      }
    }

    return "Invalid date format";
  };

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
  const currentUser = getUserId();

  return (
    <div className="h-full w-full bg-white">
      <h4 className="flex items-center gap-3 ms-4 pt-3 h-[10%]">
        <FaAngleLeft
          className="cursor-pointer"
          onClick={() => navigate("/jobs")}
        />
        {title}
      </h4>
      <div className="overflow-y-scroll Podcast_Top_Videos h-[90%] px-4">
        <div>
          <div className="flex gap-1 flex-wrap w-full Podcast_Top_Videos">
            {data.map((elm, ind) => {
              const isLong = elm.jobTitle && elm.jobTitle.length > 20;
              const truncatedDescription = isLong
                ? elm.jobTitle.substring(0, 15) + "..."
                : elm.jobTitle;

              return (
                <div
                  key={ind}
                  className="h-auto md:w-[48%]   flex-shrink-0 shadow rounded-lg border relative max-[766px]:w-[40vw] max-[500px]:w-full max-[766px]:p-2 lg:w-[32.43%]  flex flex-col"
                >
                  <div className="w-full flex-grow">
                    <div className="flex gap-2 mt-2">
                      <img
                        src={elm.logoUrl ? elm.logoUrl : "/placeholder.jpg"}
                        onLoad={(e) => (e.target.style.opacity = 1)}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                        style={{
                          height: "40px",
                          width: "40px",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                        className="rounded-full ml-3"
                        alt="Profile"
                      />
                      <div>
                        <div className="relative inline-block group">
                          <h1 className="font-semibold">
                            {truncatedDescription}
                          </h1>
                          {isLong && (
                            <span className="hidden group-hover:block absolute top-full left-0 bg-white p-2 border border-gray-300 z-10">
                              {elm.jobTitle}
                            </span>
                          )}
                        </div>
                        <p className="font-light text-md">
                          {formatDate(elm.applicationDeadline)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 ps-4 text-md opacity-65 max-[768px]:mt-2 h-12">
                      {elm.location} ({elm.workplaceType})
                    </p>
                    <p className="ps-4 text-sm opacity-65 mt-3">
                      {elm.salaryRange}
                    </p>
                  </div>
                  <div className="mt-auto lg:mb-3 md:mb-3 text-center">
                    {elm.userId === currentUser ? (
                      <Link
                        to={"/mycreatedjob"}
                        state={{ id: elm._id, title: elm.jobTitle }}
                        className="w-[90%] mx-auto block text-xs pt-3 mt-7 bg-[#EEEEEE] h-10 rounded-3xl hover:bg-[#6166f331] hover:text-[#6165F3] max-[768px]:mb-3"
                      >
                        View Details
                      </Link>
                    ) : (
                      <Link
                        to={"/jobdetail"}
                        state={{ id: elm._id, title: elm.jobTitle }}
                        className="w-[90%] mx-auto block text-xs pt-3 mt-7 bg-[#EEEEEE] h-10 rounded-3xl hover:bg-[#6166f331] hover:text-[#6165F3]"
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Calendar2;
