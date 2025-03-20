import React, { useState, Fragment, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import FilterNav from "./FilterNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const Filters = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedValues, setSelectedValues] = useState([]);
  const [recentdata, setRecentData] = useState([]);
  const token = localStorage.getItem("jwt");
  const entrepreneurs = [
    { name: "Tech Entrepreneur" },
    { name: "Biotech Entrepreneur" },
    { name: "Food Entrepreneur" },
    { name: "Fashion Entrepreneur" },
    { name: "Service-Based Entrepreneur" },
    { name: "Social Entrepreneur" },
    { name: "E-Commerce Entrepreneur" },
    { name: "Real Estate Entrepreneur" },
    { name: "Educational Entrepreneur" },
    { name: "Reviews" },
    { name: "Videos" },
    { name: "Duration" },
    { name: "Funds" },
    { name: "Experience" },
    { name: "Strategy" },
    { name: "Exit" },
    { name: "Results" },
    { name: "Market" },
    { name: "Product" },
    { name: "Team" },
    { name: "Timeline" },
  ];

  const entrepreneurs2 = [
    [
      "Software development",
      "Hardware innovation",
      "Artificial intelligence",
      "Cybersecurity",
      "Internet of Things",
      "Other",
    ],
    [
      "Drug development",
      "Medical devices",
      "Genetic engineering",
      "Bioinformatics",
      "Other",
    ],
    [
      "Restaurants",
      "Food manufacturing",
      "Catering services",
      "Specialty foods",
      "Health-focused foods",
      "Other",
    ],
    [
      "Clothing design",
      "Accessories",
      "Sustainable fashion",
      "Apparel manufacturing",
      "Online retail",
    ],
    [
      "Consulting",
      "Marketing services",
      "Event planning",
      "Financial services",
    ],
    [
      "Nonprofit organizations",
      "Social enterprises",
      "Community development",
      "Environmental conservation",
      "Ethical business practices",
      "Other",
    ],
    [
      "Online retail",
      "Dropshipping",
      "Subscription-based services",
      "Digital products",
      "Marketplace platforms",
      "Other",
    ],
    [
      "Property development",
      "Real estate investment",
      "Property management",
      "Real estate technology",
      "Commercial real estate",
      "Other",
    ],
    [
      "Online courses",
      "Educational technology",
      "Tutoring services",
      "Language schools",
      "Educational consulting",
      "Other",
    ],
    ["All", "Top Reviews", "Other"],
    ["Investor", "Entrepreneur", "Viewer", "Other"],
    ["15 Mins", "30 Mins", "1 hour", "+1 hour", "Other"],
    ["$ 1M", "$ 5M", "$ 15M", "$ 20M"],
    ["1 year", "3 years", "5 years", "7 years", "10+ years"],
    ["Expansion", "Marketing", "R&D", "Operations", "Debt repayment"],
    [
      "IPO",
      "Strategic partnership",
      "Merger",
      "No specific exit plan",
      "Other",
    ],
    [
      "Acquisition",
      "IPO",
      "Merger",
      "Strategic partnership",
      "No specific exit plan",
    ],
    ["Local", "Regional", "National", "International", "Global"],
    [
      "Software",
      "Hardware",
      "Services",
      "Subscription-Based",
      "Consumer goods",
    ],
    ["Small", "Medium", "Large", "Experienced", "Specialized"],
    [
      "6 Months",
      "1 year",
      "2 years",
      "3 years",
      "Ongoing",
      "Other (please specify)",
    ],
  ];

  const handleShow = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleCheckboxChange = (item) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(item)) {
        return prevValues.filter((value) => value !== item);
      } else {
        return [...prevValues, item];
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/upload`, {
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const info = result.data.data;
       
        const tag = info.map((item) => ({
          id: item.data._id,
          videoTag: item.data.videoTags,
        }));
        setRecentData(tag);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    getData();
  }, []);
 
  const applyFilter = () => {
    const filteredData = [];

    for (let i = 0; i < selectedValues.length; i++) {
      const selectedFilter = selectedValues[i].toLowerCase();

      for (let j = 0; j < recentdata.length; j++) {
        const backendId = recentdata[j].id;
        const backendTags = recentdata[j].videoTag.map((tag) =>
          tag.toLowerCase()
        );

        if (backendTags.some((tag) => selectedFilter.includes(tag))) {
          if (!filteredData.includes(backendId)) {
            filteredData.push(backendId);
          }
          break;
        }
      }
    }

    return filteredData;
  };

  const handleSearch = () => {
    const result = applyFilter();
 
    navigate("/videos", { state: { id: result } });
  };
  const resetFilter = () => {
    navigate("/videos");
  };

  const filteredEntrepreneurs = entrepreneurs.filter((entrepreneur) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Entrepreneur")
      return !["Reviews", "Videos", "Funds"].includes(entrepreneur.name);
    if (activeFilter === "Investor")
      return ["Reviews", "Funds"].includes(entrepreneur.name);
    if (activeFilter === "Subscribed") {
      navigate("/videos");
      return false;
    }
    return true;
  });

  return (
    <Fragment>
      <FilterNav
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="bg-white px-2 md:px-4 mt-2 overflow-y-auto h-[23.5rem]" 
     style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
        <div className="flex flex-wrap gap-4 justify-between">
          {filteredEntrepreneurs.map((entrepreneur, index) => (
            <div
              key={index}
              className={`relative w-full sm:w-[48%] md:w-[31%] lg:w-[23%] ${
                selectedIndex === index ? "" : ""
              }`}
              style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
            >
              <div
                className="flex items-center gap-3 md:gap-5 justify-between"
                onClick={() => handleShow(index)}
              >
                <p className="text-sm md:text-lg font-semibold mb-2 md:mb-3 mt-2 md:mt-3">
                  {entrepreneur.name}
                </p>
                <FaAngleDown />
              </div>
              {selectedIndex === index && (
                <div className="w-full py-3 md:py-5 mt-2">
                  {entrepreneurs2[index].map((elm, ind) => (
                    <div
                      key={ind}
                      className="flex mt-1 py-1 md:py-2 items-center"
                    >
                      <input
                        type="checkbox"
                        className="me-2"
                        onChange={() => handleCheckboxChange(elm)}
                        checked={selectedValues.includes(elm)}
                      />
                      <p className="text-sm md:text-base">{elm}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed lg:bottom-0 bottom-[3rem] right-2 lg:right-[12rem] p-4  w-full flex justify-end gap-4 max-[425px]:justify-center max-[425px]:bg-white mb-6">
        <button
          className="px-8 py-3 flex-shrink-0 w-auto rounded-2xl border-2 text-[16px] md:text-[18px] linear_gradient_text"
          onClick={resetFilter}
        >
          Reset Filters
        </button>
        <button
          className="px-8 py-3 flex-shrink-0 w-auto rounded-3xl text-white text-[16px] md:text-[18px] linear_gradient"
          onClick={handleSearch}
        >
          Apply Filters
        </button>
      </div>
    </Fragment>
  );
};

export default Filters;
