import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = REACT_APP_API_BASE_URL;
  const location = useLocation();

  const filteredVideoIds = location.state?.id || [];

  // Function to fetch data
  const getData = async (page) => {
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/upload`, {
        params: { page, limit: 20 },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      const updatedData = response.data.data.map((item) => ({
        _id: item.data._id,
        videoUrl: item.data.videoUrl,
        videoName: item.data.videoName,
        videoDesc: item.data.videoDesc,
        videoTags: item.data.videoTags,
        createdAt: item.data.createdAt,
        updatedAt: item.data.updatedAt,
        comments: item.commments || [],
        user: item.user || {},
      }));

      
      setVideos((prevVideos) => {
        const existingIds = new Set(prevVideos.map((video) => video._id));
        const newVideos = updatedData.filter(
          (video) => !existingIds.has(video._id)
        );
        return [...prevVideos, ...newVideos];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (filteredVideoIds && filteredVideoIds.length > 0) {
      getData(page);
    } else {
      getData(page);
    }
  }, [page, filteredVideoIds]);

  
  const filteredVideos = filteredVideoIds.length > 0
    ? videos.filter((video) => filteredVideoIds.includes(video._id))
    : videos;

  const observer = useRef();
  const lastVideoRef = useRef();

 
  useEffect(() => {
    if (loading) return;

    const handleObserver = (entries) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        filteredVideos.length % 20 === 0 &&
        filteredVideos.length > 0
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastVideoRef.current) {
      observer.current.observe(lastVideoRef.current);
    }

    return () => {
      if (observer.current && lastVideoRef.current) {
        observer.current.unobserve(lastVideoRef.current);
      }
    };
  }, [loading, lastVideoRef, filteredVideos]);

  
  const handleVideoClick = (index) => {
    navigate(`/video/${encodeURIComponent(filteredVideos[index]._id)}`, {
      state: { videos: filteredVideos },
    });
  };

  return (
    <div className="bg-white px-2 h-[89%] overflow-y-scroll Podcast_Top_Videos mt-1">
      <h1 className="text-xl font-bold my-3 sm:w-[90%] lg:w-[80%] mx-auto">
        Entrepreneur & Investor Videos
      </h1>
      <div className="flex flex-wrap justify-start gap-1 sm:w-[90%] lg:w-[90%] mx-auto">
        {filteredVideos.slice(0, Math.min(filteredVideos.length, page * 20)).map((video, i) => (
          <div
            key={video._id}
            ref={i === filteredVideos.length - 1 ? lastVideoRef : null}
            className="w-[32%] lg:w-[21vw] cursor-pointer grid place-items-center relative lg:h-[48vh] sm:h-[34vh]"
            onClick={() => handleVideoClick(i)}
          >
            <video
              src={video.videoUrl || '/loading.jpg'}
              className="w-[100%] h-[100%] overflow-y-hidden object-cover"
              muted
              preload="metadata"
            ></video>
            <CiPlay1 className="absolute text-2xl text-white" />
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center py-2">Loading more videos...</div>
      )}
    </div>
  );
};

export default AllVideos;
