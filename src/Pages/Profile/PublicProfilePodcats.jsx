import React, { Fragment, useEffect, useState } from "react";
import { CiPlay1, CiTrash } from "react-icons/ci";
// import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { deletePodcast } from "../../DeleteAPI";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const ApplePodcast = (props) => {
  const [podcast, setPodcast] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [visibleId, setVisibleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
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
  const currentUserId = getUserId();

  const handleDeleteConfirm = async () => {
    if (deleteItemId) {
      try {
        // console.log(`Attempting to delete podcast with id: ${deleteItemId}`);
        await deletePodcast(deleteItemId);
        toast.success('Podcast deleted successfully!');
        setPodcast(podcast.filter((item) => item._id !== deleteItemId));
      } catch (error) {
        console.error('Error deleting podcast:', error);
        toast.error('Error deleting podcast.');
      }
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
   

    const fetchedPodcasts = Array.isArray(props.podcast) ? props.podcast : [];
    setLoading(true);
    setTimeout(() => {
      setPodcast(fetchedPodcasts);
      setLoading(false);
      // console.log({ fetchedPodcasts });
    }, 1000);
  }, [props.podcast]);

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this podcast!",
          url: window.location.href,
        });
        toast.success('Share successful!');
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing podcast.');
      }
    } else {
      toast.warn('Web Share API is not supported in your browser.');
    }
  };

  const formatDuration = (duration) => {
    const seconds = Math.floor(duration / 1000);
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };

  const user_id = getUserId();
  
  const handleSaveToWishlist = async (podcastId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'podcast',
        wishItemId: podcastId,
        userId: user_id, 
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer'+ localStorage.getItem('jwt'),
        },
      });
      // console.log('Wishlist item saved:', response.data);
      toast.success('Podcast saved to wishlist!');
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.');
    }
  };

  return (
    <Fragment>
      <div className="overflow-y-scroll Podcast_Top_Videos h-[100%]">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {podcast.length === 0 ? (
              <div className="text-center">No podcasts available.</div>
            ) : (
              <div className="flex flex-wrap gap-1 w-[95%] mx-auto Podcast_Top_Videos pt-2">
                {podcast.map((elm, ind) => (
                  <div
                    key={ind}
                    // className="md:h-[45vh] h-[37vh] w-[32.4%] rounded-lg border relative text-white PPPodcast"
                       className="cursor-pointer text-white lg:h-[42vh] h-[25vh] lg:w-[23vw] md:w-[31.33vw]  max-[425px]:w-[43vw] w-[45.33vw] flex-shrink-0 rounded-lg relative"
                    onMouseEnter={() => setVisibleId(elm._id)}
                    onMouseLeave={() => setVisibleId(null)}
                    onClick={() => navigate(`/mypodcasts`, { state: { id: elm._id } })}
                  >
                    <div className="absolute h-full w-full ShadedBG rounded-lg">
                    <IoBookmarkOutline size={30}
                      className="absolute right-1 top-1 text-2xl md:text-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveToWishlist(elm._id);
                      }}
                    />
                    </div>
                    <div className="absolute bottom-1 left-1 SVTBottom w-[93%] rounded-lg ps-3">
                    <p className="text-lg lg:py-1 whitespace-nowrap overflow-hidden text-ellipsis">{elm.episodeTitle}</p>
                    <Link to="/userprofile" state={{id:props.user ? props.user.Users_PK :"unknown"}}   onClick={(e) => {
                      e.stopPropagation()}}  ><p className="text-[16px] text-[#B4B6B7] whitespace-nowrap text-ellipsis overflow-hidden">{props.user ? props.user.name : ""}</p></Link>
                    <p className="text-xs flex gap-1 items-center lg:text-lg whitespace-nowrap text-ellipsis">
                      <CiPlay1 size={20}/> {formatDuration(elm.podcastDuration)}
                    </p>
                  </div>
                  
                 
                    <img
                      src={elm.picUrl || "placeholder.jpg"}
                      alt={`Img-${ind}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    {visibleId === elm._id &&   elm.userId === currentUserId && (
                      <div className="absolute top-14 right-2 flex flex-col space-y-2 z-10">
                        <CiTrash
                          className="text-red-600 text-3xl cursor-pointer hover:text-red-600"
                          onClick={(e) => handleDeleteClick(e, elm._id)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to delete this podcast?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
                <button
                  className="linear_gradient text-white px-4 py-2 rounded"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default ApplePodcast;
