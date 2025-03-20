// All Videos Header Filters

import React, { Fragment, useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

let categData_ = [
  "All",
  "Tech & Entrepreneurship",
  "Networking",
  "Tech & Investor",
  "Teamwork",
];
let locData = ["Local", "My country", "International"];
let date = [
"All Upcoming",
"Starting Soon",
"Today",
"This Week",
  "This Weekend",
  "Next Week",
  "Choose a Date",
  
];
let eventFormat = [
  "All",
 "In Person",
 "Virtual",
  "Hybrid",
  "Pre-Recorded-content",
  "Other",
];
let noOfPeople = [
 "less than 20",
 "Less than 50",
 "Above 50",
 "Other",
];
let durData = [
"Half-Day",
 "Full-Day",
 "Multiple Days",
 "Morning Events",
 "Afternoon Events",
 "Evening Events",
 "Quick Sessions (1-2 hours)",
];

const categData = [
  "All",
  "Tech & Entrepreneurship",
  "Art",
  "Tech & Investor",
  "Teamwork",
  "Finance",
  "Networking",
  "Government",
  "Charity",
  "Investors",
  "Language learning",
  "Politics",
  "Fashion",
  "History",
  "Hobbies",
  "Career ,& Business",
  "Travel & Outdoor",
  "News",
  "Technology",
  "True Crime",
  "Comedy",
  "Music & dancing",
  "Sports",
  "Science",
  "Leadership",
  "Education",
  "Sustainability",
  "Fiction",
  "Interviews",
  "Business and Finance ",
  "Health ,and Wellness",
  "Self - Imporvement",
  "Music",
  "Religion & Spirituality",
  "Pop Culture",
  "Environment",
  "Parenting",
  "Gaming",
  "Food and Cooking",
  "Pet & Animal",
  "Relationship & Books",
  "Personal Stories",
  "TV & Film",
  "Social Activities",
  "Subscribes",
  "Language",
  "Others",
];


function JobFilters({data}) {
  const {newcard, setFilterLoopData} = data;
  
// console.log("new card",newcard);
  const [catSelectData, setCatSelectData] = useState("Select Categories");
  const [locSelectData, setLocSelectData] = useState("Select Location");
  const [JobTypeSelectData, setJobTypeSelectData] = useState("Select Date");
  const [expSelectData, setexpSelectData] = useState("Select Format");
  const [salRangeSelectData, setsalRangeSelectData] = useState(
    "Select No of People"
  );
  const [compSelectData, setCompSelectData] = useState("Select Duration");

  

  const [catDrop, setCatDrop] = useState(false);
  const [locDrop, setLocDrop] = useState(false);
  const [JobTypeDrop, setJobTypeDrop] = useState(false);
  const [expDrop, setexpDrop] = useState(false);
  const [salRangeDrop, setsalRangeDrop] = useState(false);
  const [compDrop, setCompDrop] = useState(false);

  useEffect(() => {
    if (catSelectData!== "Select Categories") {
      let filtered = newcard.filter((item) => item.eventCatagory === catSelectData);
      setFilterLoopData(filtered);
      // console.log("event filtered",filtered);
    }
     if(catSelectData === "All"){
      setFilterLoopData(newcard);
    }
    if (expSelectData !== "Select Format") {
      let filtered = newcard.filter((item) => item.eventFormat === expSelectData);
      setFilterLoopData(filtered);
      // console.log("event filtered",filtered);
    }
    if (salRangeSelectData !== "Select No of People") {
      let filtered = newcard.filter((item) =>(item.eventNO_of_People < 20 
        ? "less than 20" 
        : item.eventNO_of_People < 50 
        ? "Less than 50" 
        : "Above 50" ) === salRangeSelectData);
      setFilterLoopData(filtered);
      // console.log("event filter by persons",filtered);
    }

  }, [catSelectData,expSelectData]);
  const handleFilterClick = (e) => {
    setCatSelectData(e);
  };
  return (
    <Fragment>
      <div className="flex items-center  overflow-y-visible JobFilScr bg-white w-full h-full px-3 ">
        <Link to="/filterevent" className="m-0 flex gap-2 items-center">
          <LuSettings2 /> |{" "}
        </Link>
        <Link
          to="/filterevent"
          className="px-4 py-1 ms-2 m-0 rounded-3xl cursor-pointer Video_Nav_Filters"
        >
          All
        </Link>
        <p
          className="px-4 py-1 ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters"
          onMouseOver={() => setCatDrop(true)}
          onMouseLeave={() => setCatDrop(false)}
        >
          Categories <RiArrowDropDownLine />
          {catDrop && (
            <div
              className="absolute w-[40vh] top-6 z-10"
              onClick={() => setCatDrop(false)}
            >
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {catSelectData} <RiArrowDropUpLine />
              </p>
              <div className="bg-white p-3 pb-7 shadow-lg h-[26rem] scrollbar-hide scrollbar-hide overflow-scroll rounded-lg mt-2">
                {categData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      handleFilterClick(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center  cursor-pointer Video_Nav_Filters text-sm relative"
          onMouseOver={() => setLocDrop(true)}
          onMouseLeave={() => setLocDrop(false)}
        >
          Location <RiArrowDropDownLine />
          {locDrop && (
            <div
              className="absolute w-[40vh] top-6 z-10 "
              onClick={() => setLocDrop(false)}
            >
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {locSelectData} <RiArrowDropUpLine />
              </p>
              <div className="bg-white p-3 shadow-lg rounded-lg mt-2">
                {locData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setLocSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setJobTypeDrop(true)}
          onMouseLeave={() => setJobTypeDrop(false)}
        >
          Date <RiArrowDropDownLine />
          {JobTypeDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {JobTypeSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setJobTypeDrop(false)}
              >
                {date.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setJobTypeSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setexpDrop(true)}
          onMouseLeave={() => setexpDrop(false)}
        >
          Event Format <RiArrowDropDownLine />
          {expDrop && (
            <div className="absolute w-[40vh] top-6 z-[110] ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {expSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setexpDrop(false)}
              >
                {eventFormat.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setexpSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setsalRangeDrop(true)}
          onMouseLeave={() => setsalRangeDrop(false)}
        >
          Total Attendees <RiArrowDropDownLine />
          {salRangeDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {salRangeSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setsalRangeDrop(false)}
              >
                {noOfPeople.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setsalRangeSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>

       

        <p
          className="px-4 py-1 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setCompDrop(true)}
          onMouseLeave={() => setCompDrop(false)}
        >
          Duration <RiArrowDropDownLine />
          {compDrop && (
            <div className="absolute w-[40vh] top-6 z-10 right-1 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {compSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setCompDrop(false)}
              >
                {durData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setCompSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
      </div>
    </Fragment>
  );
}

export default JobFilters;
