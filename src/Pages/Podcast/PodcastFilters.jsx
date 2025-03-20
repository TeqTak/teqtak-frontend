// All Videos Header Filters

import React, { Fragment, useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { fetchPodcast } from "../../API";

let categData__ = [
  "All",
  "Tech & Entrepreneurship",
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
let durData = ["15 min", "30 min", "1 hour","+1 hour"];
let revData = ["All", "Top Revies", "Other"];
let subData = ["All", "Popular Podcast", "Subscribed", "Others"];

function PodcastFilters({ data }) {
  let { recentdata, setFilterLoopData } = data;

  // States for Selected Filter Data

  const [catSelectData, setCatSelectData] = useState("Select Categories");
  const [durSelectData, setDurSelectData] = useState("Select Duration");
  const [revSelectData, setRevSelectData] = useState("Select Reviews");
  const [subSelectData, setSubSelectData] = useState("Select Subscribe");

  // States for Open Filter

  const [catDrop, setCatDrop] = useState(false);
  const [durDrop, setDurDrop] = useState(false);
  const [revDrop, setRevDrop] = useState(false);
  const [subDrop, setSubDrop] = useState(false);


  useEffect(() => {
    if (catSelectData !== "Select Categories") {
      let filtered = recentdata.filter(
        (item) => item.podcastType === catSelectData
      );
      setFilterLoopData(filtered);
      // console.log(filtered);
    }
    if (catSelectData == "All") {
      setFilterLoopData(recentdata);
    }
    if (durSelectData !== "Select Duration") {
      // console.log("durSelectData", durSelectData);
      // console.log("fetch from api", recentdata);
      let filtered = recentdata.filter((item) => {
        const durationInMinutes = item.podcastDuration / 60000;
        // console.log("durationInMinutes", durationInMinutes);
        const durationLabel =
          durationInMinutes < 15
            ? "15 min"
            : durationInMinutes < 30
            ? "30 min"
            : durationInMinutes < 60
            ? "1 hour"
            : "+1 hour";
        // console.log("labelduration", durationLabel);
        return durationLabel === durSelectData;
      });
      setFilterLoopData(filtered);
      // console.log("filteredByDuration", filtered);
    }
  }, [catSelectData, durSelectData]);

  const handleFilterClick = (e) => {
    setCatSelectData(e);
  };

  return (
    <Fragment>
      <div className="flex items-center bg-white h-[10%] px-3 py-3 ">
        <Link
          to="/filterpodcast"
          className="px-4 py-1 ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer"
        >
          <LuSettings2 className="text-xl" /> <pre className="text-xl"> |</pre>
        </Link>
        <Link
          to="/filterpodcast"
          className="px-4 py-1 m-0  ms-2 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters"
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
              <div className="bg-white p-3 shadow-lg h-[26rem] scrollbar-hide scrollbar-hide overflow-scroll rounded-lg mt-2">
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
          className="px-4 py-1 ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters"
          onMouseOver={() => setDurDrop(true)}
          onMouseLeave={() => setDurDrop(false)}
        >
          Duration <RiArrowDropDownLine />
          {durDrop && (
            <div
              className="absolute w-[40vh] top-6 z-10 "
              onClick={() => setDurDrop(false)}
            >
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {durSelectData} <RiArrowDropUpLine />
              </p>
              <div className="bg-white p-3 shadow-lg rounded-lg mt-2">
                {durData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setDurSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters"
          onMouseOver={() => setRevDrop(true)}
          onMouseLeave={() => setRevDrop(false)}
        >
          Reviews <RiArrowDropDownLine />
          {revDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {revSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setRevDrop(false)}
              >
                {revData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setRevSelectData(e.target.textContent)}
                  >
                    {elm}
                  </p>
                ))}
              </div>
            </div>
          )}
        </p>
        <p
          className="px-4 py-1 ms-2 m-0 rounded-3xl flex items-center relative cursor-pointer Video_Nav_Filters"
          onMouseOver={() => setSubDrop(true)}
          onMouseLeave={() => setSubDrop(false)}
        >
          Subscribed <RiArrowDropDownLine />
          {subDrop && (
            <div className="absolute w-[40vh] top-6 z-10 ">
              <p className="bg-white p-3 shadow-lg rounded-lg flex justify-between items-center">
                {subSelectData} <RiArrowDropUpLine />
              </p>
              <div
                className="bg-white p-3 shadow-lg rounded-lg mt-2"
                onClick={() => setSubDrop(false)}
              >
                {subData.map((elm, ind) => (
                  <p
                    key={ind}
                    className="py-2"
                    onClick={(e) => setSubSelectData(e.target.textContent)}
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

export default PodcastFilters;
