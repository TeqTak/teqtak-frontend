// All Videos Header Filters

import React, { Fragment, useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

let categData__ = [
  "All",
  "Tech Entrepreneur",
  "Finance",
  "Tech & Investor",
  "Teamwork",
];
const categData = [
  "All",
  "Tech Entrepreneur",
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



let locData = ["Local", "My country", "International"];
let JobTypeData = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Other (Please Specify)",
];
let expData = [
  "Entry-Level",
  "Mid-Level",
  "Senior",
  "Executive",
  "Internship",
  "No Experience required",
  "Other (Please Specify)",
];
let salRangeData = [
  "$300000 - below",
  "$50,000 - $80,000",
  "$80,000 - $120,000",
  "$120,000 and above",
];
let eduData = [
  "High-School",
  "Bachelor's-Degree",
  "Associate-Degree",
  "Master-Degree",
  "Ph.D or Doctorate",
  "Professional Certification",
];
// let compData = ["English", "Hindi", "French", "Spanish"];

function JobFilters({ jobFilter }) {
  const { data, setFilterLoopData } = jobFilter;
  // States for Selected Filter Data

  const [catSelectData, setCatSelectData] = useState("Select Categories");
  const [locSelectData, setLocSelectData] = useState("Select Location");
  const [JobTypeSelectData, setJobTypeSelectData] = useState("Select JobType");
  const [expSelectData, setexpSelectData] = useState("Select Experience");
  const [salRangeSelectData, setsalRangeSelectData] = useState(
    "Select Salary Range"
  );
  const [eduSelectData, setEduSelectData] = useState("Select Education");

  const [catDrop, setCatDrop] = useState(false);
  const [locDrop, setLocDrop] = useState(false);
  const [JobTypeDrop, setJobTypeDrop] = useState(false);
  const [expDrop, setexpDrop] = useState(false);
  const [salRangeDrop, setsalRangeDrop] = useState(false);
  const [eduDrop, setEduDrop] = useState(false);
  useEffect(() => {
    // Start with all the data and apply filters one by one
    let filteredData = data;

    if (catSelectData !== "All" && catSelectData !== "Select Categories") {
      filteredData = data.filter(
        (item) => item.jobCategory === catSelectData
      );
    }

    if (JobTypeSelectData !== "Select JobType") {
      filteredData = data.filter(
        (item) => item.jobType === JobTypeSelectData
      );
    }

    if (expSelectData !== "Select Experience") {
      filteredData = data.filter(
        (item) => item.experienceLevel === expSelectData
      );
    }

    if (salRangeSelectData !== "Select Salary Range") {
      filteredData = data.filter(
        (item) => item.salaryRange === salRangeSelectData
      );
    }

    if (eduSelectData !== "Select Education") {
      filteredData = data.filter(
        (item) => item.educationLevel === eduSelectData
      );
    }

    setFilterLoopData(filteredData);
  }, [
    catSelectData,
    locSelectData,
    JobTypeSelectData,
    expSelectData,
    salRangeSelectData,
    eduSelectData,
  ]);

  // const handleFilterClick = (e) => {
  //   setCatSelectData(e);
  //   setexpSelectData(e);
  //   setsalRangeSelectData(e);
  //   setEduSelectData(e);
  //   setLocSelectData(e);
  //   setJobTypeSelectData(e);

  // };

  return (
    <Fragment>
      <div className="flex items-center  overflow-y-visible  JobFilScr bg-white w-full h-[15%] px-3">
        <Link to="/filterjob" className="m-0 flex gap-2 items-center">
          <LuSettings2 /> |{" "}
        </Link>
        <Link
          to="/filterjob"
          className="px-4 py-1 ms-2 m-0 rounded-3xl cursor-pointer Video_Nav_Filters"
        >
          All
        </Link>
        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center  cursor-pointer Video_Nav_Filters text-sm relative"
          onMouseOver={() => setCatDrop(true)}
          onMouseLeave={() => setCatDrop(false)}
        >
          Categories <RiArrowDropDownLine />
          {catDrop && (
            <div
              className="absolute w-[40vh] top-8 z-10"
              onClick={() => setCatDrop(false)}
            >
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {catSelectData} <RiArrowDropUpLine />
              </p>
              <div className="bg-white p-3 h-[26rem] overflow-scroll scrollbar-hide shadow-lg rounded-lg mt-2">
                {categData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      setCatSelectData(elm);

                      // handleFilterClick(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center  cursor-pointer Video_Nav_Filters text-sm relative"
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
                    onClick={() => {
                      // handleFilterClick(elm);
                      setLocSelectData(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setJobTypeDrop(true)}
          onMouseLeave={() => setJobTypeDrop(false)}
        >
          Job Type <RiArrowDropDownLine />
          {JobTypeDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {JobTypeSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setJobTypeDrop(false)}
              >
                {JobTypeData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      // handleFilterClick(elm);
                      setJobTypeSelectData(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setexpDrop(true)}
          onMouseLeave={() => setexpDrop(false)}
        >
          Experience <RiArrowDropDownLine />
          {expDrop && (
            <div className="absolute w-[40vh] top-6 z-[110] ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {expSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setexpDrop(false)}
              >
                {expData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      // handleFilterClick(elm);
                      setexpSelectData(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setsalRangeDrop(true)}
          onMouseLeave={() => setsalRangeDrop(false)}
        >
          Salary Range <RiArrowDropDownLine />
          {salRangeDrop && (
            <div className="absolute w-[40vh] top-10 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {salRangeSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setsalRangeDrop(false)}
              >
                {salRangeData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      // handleFilterClick(elm);
                      setsalRangeSelectData(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="px-4 py-2 flex-shrink-0 w-auto ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters text-sm"
          onMouseOver={() => setEduDrop(true)}
          onMouseLeave={() => setEduDrop(false)}
        >
          Education <RiArrowDropDownLine />
          {eduDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {eduSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setEduDrop(false)}
              >
                {eduData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={() => {
                      // handleFilterClick(elm);
                      setEduSelectData(elm);
                    }}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default JobFilters;
