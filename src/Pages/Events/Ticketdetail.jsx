import  { useEffect, useState,useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import { fetchProfile } from "../../API";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function Ticketdetail() {
  const ticketRef = useRef();


  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loc = useLocation();
  const navigate = useNavigate();

  const eventIdFromState = loc.state?.eventId;
  const queryParams = new URLSearchParams(location.search);
  const eventIdFromParams = queryParams.get("eventid");
  const eventId = eventIdFromState || eventIdFromParams;
console.log("eventIdFromParams",eventId);
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

  const fetchProfileData = async () => {
    try {
      const data = await fetchProfile(getUserId());
      setUser(data.user);
    ;
    } catch (error) {
      console.error("Fetching profile data error:", error);
    }
  };
// console.log("user",user)
  const fetchTickets = async (eventId) => {
    try {
      
      
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/tickets/${eventId}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched ticketPayment:", data);
      setTickets(data);
      
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };


  const downloadAsPDF = async () => {
    try {
      console.log("Starting the PDF generation process...");
      const element = ticketRef.current;
      console.log("Captured element reference:", element);
  
      console.log("Capturing the component as an image using html2canvas...");
      const canvas = await html2canvas(element, { scale: 2 });
      console.log("Canvas generated successfully.");
  
      const imgData = canvas.toDataURL("image/png");
      console.log("Converted canvas to image data:", imgData ? "Success" : "Failed");
  
      console.log("Creating a new jsPDF instance...");
      const pdf = new jsPDF("portrait", "mm", "a4");
  
      console.log("Adding image data to the PDF...");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  
      console.log("Saving the PDF as 'ticket-detail.pdf'...");
      pdf.save("ticket-detail.pdf");
  
      console.log("PDF generation and download complete!");
    } catch (error) {
      console.error("An error occurred during the PDF generation process:", error);
    }
  };
  const saveAsImage = async () => {
    try {
      console.log("Starting the image saving process...");
      const element = ticketRef.current;
      console.log("Captured element reference:", element);
  
      console.log("Capturing the component as an image using html2canvas...");
      const canvas = await html2canvas(element, { scale: 2 });
      console.log("Canvas generated successfully.");
  
      console.log("Converting canvas to image data URL...");
      const imgData = canvas.toDataURL("image/png");
      console.log("Image data URL created.");
  
      console.log("Creating a temporary download link...");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "ticket-detail.png"; // File name for the downloaded image
  
      console.log("Triggering download...");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      console.log("Image download complete!");
    } catch (error) {
      console.error("An error occurred during the image saving process:", error);
    }
  };
  const captureScreenshotAndDownload = async () => {
    try {
      console.log("Starting screenshot process...");
      const element = ticketRef.current;
      console.log("Element to capture:", element);
  
      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: false, // Enable cross-origin handling for images
      });
      console.log("Canvas generated successfully.");
  
      // Convert canvas to an image
      const imgData = canvas.toDataURL("image/png");
      console.log("Image data generated.");
  
      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "ticket-screenshot.png";
      console.log("Initiating download...");
  
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      console.log("Screenshot download complete!");
    } catch (error) {
      console.error("An error occurred while capturing the screenshot:", error);
    }
  };
  
  
 // Fetch data on component mount
 useEffect(() => {
  if (eventId) {
    fetchTickets(eventId);
    fetchProfileData();
  } else {
    console.error("No event ID found in state or URL.");
  }
}, [eventId]);
console.log("Event",tickets)
  const selectedTickets = loc.state?.selectedTickets || {};
  const paymentId = tickets._id;
  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <>
      <div className="main h-full w-full bg-white ">
        
      <div className="flex justify-between py-2 pe-2">
      <h4 className="flex items-center gap-3 ms-4 h-[10%]">
          <FaAngleLeft
            className="cursor-pointer"
            onClick={() =>
              navigate("/events", {
                state: { id: tickets._id, selectedTickets },
              })
            }
          />{" "}
          Ticket Details
        </h4>
        <button  onClick={captureScreenshotAndDownload} className="linear_gradient text-white cursor-pointer px-2 py-1" >Downlaod</button>
      </div>
        <div ref={ticketRef} className="w-[90%] this_is_ref overflow-y-scroll Podcast_Top_Videos h-[90%] mx-auto">
          <div className="lg:h-[70%] w-[100%] bg-[#f3f2f2] rounded-xl lg:pb-0 pb-3">
            <div className="flex justify-evenly flex-wrap lg:flex-nowrap">
              <div className="div lg:w-[45%] w-[80%] mx-auto">
                <img
                  src={
                    tickets.event.eventCoverUrl
                      ? tickets.event.eventCoverUrl
                      : "/loading.jpg"
                  }
                  alt=""
                  className="h-[40vh] w-full mt-8"
                  //  crossOrigin="anonymous"
                />
                <p className="text-md font-semibold opacity-55 text-center p-2">
                  {tickets.event.eventTitle}
                </p>
              </div>
              <div className="location lg:w-[50%] w-[80%] mx-auto mt-8">
                <p className="text-xs font-semibold text-[gray]">Location</p>
                <p className="text-sm opacity-70">{tickets.event.eventLocation}</p>
                <div className="flex justify-between mt-5">
                  <div className="name h-[10vh] w-[20%]">
                    <p className="text-xs font-semibold text-[gray]">Name</p>
                    <p className="text-sm font-medium opacity-70 whitespace-nowrap">
                      {tickets ? tickets.buyer.name : "Unknown"}
                    </p>
                  </div>
                  <div className="date h-[10vh] w-[20%]">
                    <p className="text-xs font-semibold text-[gray]">Date</p>
                    <p className="text-sm font-medium opacity-70">
                      {tickets.event?.eventDate}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="name h-[10vh] w-[20%]">
                    <p className="text-xs font-semibold text-[gray]">
                      Start Time
                    </p>
                    <p className="text-sm font-medium opacity-70">
                      {tickets.event.startTime}
                    </p>
                  </div>
                  <div className="date h-[10vh] w-[20%]">
                    <p className="text-xs font-semibold text-[gray]">
                      End Time
                    </p>
                    <p className="text-sm font-medium opacity-70">
                      {tickets.event.endTime}
                    </p>
                  </div>
                </div>
              
              </div>
            </div>
                <div className="h-[1px] w-[100%] border-[1px] border-black opacity-45 border-dashed mt-1"></div>
      {paymentId && (
                  <div className="m-auto mt-3">
                    <Barcode value={paymentId} className="w-[100%] h-[100%]" />
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticketdetail;
