import React, { useContext, useState ,useEffect} from "react";
import AddSpeaker from "../PodcastCreation/AddSpeaker";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Context/CreateContext";
import { FaAngleLeft, FaTimes } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import { Country, City } from "country-state-city";
const eventCatagory = [
  "Tech & Entrepreneurship",
  "Art",
  "Tech & Investor",
  "Teamwork",
  "Finance",
  "Networking",
  "Government",
  "Charity",
  "Language",
  "Politics",
  "Fashion",
  "History",
  "Hobbies",
  "Career & Business",
  "Travel & Outdoor",
  "Investors",
  "News",
  "Technology",
  "True Crime",
  "Comedy",
  "Music & Dancing",
  "Sports",
  "Science",
  "Leadership",
  "Sustainability",
  "Fiction",
  "Education",
  "Interviews",
  "Business & Finance",
  "Health & Wellness",
  "Self-Improvement",
  "Religion & Spirituality",
  "Pop Culture",
  "Environment",
  "Music",
  "Parenting",
  "Gaming",
  "Food & Cooking",
  "Relationship & Books",
  "Personal Stories",
  "Pets & Animals",
  "TV & Film",
  "Social Activities",
  "Subscribed",
];

const EventForm = () => {
  const navigate = useNavigate();
  const { EventStates } = useContext(myContext);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [state, setState] = useState({});
  const [speakerState, setSpeakerState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [countries, setCountries] = useState(Country.getAllCountries());

  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      // Load all cities for the selected country
      const countryCities = City.getCitiesOfCountry(selectedCountry.isoCode);
      setCities(countryCities);
    } else {
      setCities([]); // Clear cities if no country is selected
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find((c) => c.isoCode === e.target.value);
    setSelectedCountry(selectedCountry);
  };
  
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setState((prev) => ({
      ...prev,
      city: selectedCity,
    }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    
    if (coverImageFile) {
      formData.append("coverImage", coverImageFile);
    }

    // Append all state fields to formData
    Object.keys(state).forEach((key) => {
      formData.append(key, state[key]);
    });
    const location = selectedCountry ? `${state.city}, ${selectedCountry.name}` : '';
    // Set event creator ID
    formData.append("eventCreatedBy", getUserId());
    formData.append("eventCatagory", selectedType);
    formData.append("eventLocation",location)

    const ticketArray = ticketTypes.map(ticket => ({
      ticketType: ticket.ticketType,
      price: ticket.price,
      quantity: ticket.quantity,
    }));


    formData.append("eventTicketArray", JSON.stringify(ticketArray));




    const speakerIds = speakerState.map((speaker) => speaker.id);


    formData.append("eventArray", JSON.stringify(speakerState));
   
    for (let pair of formData.entries()) {
      
    }

    try {

      const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/events/`,
        formData,
        {
          headers: {
            'Content-Type':'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

    
      EventStates.setEventSubmitted(!EventStates.eventSubmitted);
      navigate("/events");
      resetForm();
    } catch (error) {
      console.error("Error submitting the event:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "startTime" || name === "endTime") {
      const [hours, minutes] = value.split(':');
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);


      const formattedTime = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      setState((prev) => ({
        ...prev,
        [name]: formattedTime,
      }));
    } else if (name === "eventDate") {
   
      setState((prev) => ({
        ...prev,
        [name]: formatDate(value),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setCoverImage(null);
    setCoverImageFile(null);
    setState({});
    setSpeakerState([]);
    setTicketTypes([]);
    setSelectedType("");
    setTicketPrice("");
    setTicketQuantity(""); 
  };

  const handleTicketChange = (e) => {
  
    const { value } = e.target;
    if (value && ticketPrice && ticketQuantity) {
      const existingTicket = ticketTypes.find(
        (ticket) => ticket.ticketType === value
      );
      if (!existingTicket) {
        setTicketTypes((prev) => [
          ...prev,
          {
            ticketType: value,
            price: parseFloat(ticketPrice),
            quantity: parseInt(ticketQuantity),
          },
        ]);
        setSelectedType("");
        setTicketPrice(""); 
        setTicketQuantity(""); 
      } else {
        alert("This ticket type has already been added.");
      }
    }
  };

  const removeTicket = (index) => {
    setTicketTypes((prev) => prev.filter((_, i) => i !== index));
  };

  

  const updateSpeakerData = (speakers) => {
    setSpeakerState(speakers);

  };

  return (
    <>
      <h4 className="flex items-center bg-white gap-3 ps-4 h-[10%]">
        <FaAngleLeft
          className="cursor-pointer"
          onClick={() => navigate("/events")}
        />
        Create Event
      </h4>

      {/* Spinner overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="spinner-border text-white" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="w-full h-[90%] bg-white overflow-y-scroll Podcast_Top_Videos">
        <form
          onSubmit={handleSubmit}
          className="flex sm:w-[80%] w-[95%] justify-between mx-auto h-full"
        >
          <div className="sm:w-[40%] w-[45%]">
            <div className="mt-2 mb-2">
              <h1>Customize Cover</h1>
              <div className="bg-[#f0f0fe] w-full h-[25vh] rounded-lg flex items-center justify-center relative overflow-hidden">
                <input
                  required
                  type="file"
                  accept="image/*"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <LuImagePlus className="text-blue-800 ms-8 text-3xl" />
                )}
              </div>
            </div>
            {/* Form fields */}
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Event Title
              </label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventTitle"
                required
                type="text"
                placeholder="Enter Title"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Event Description
              </label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                required
                name="eventDescription"
                type="text"
                placeholder="Enter description"
              />
            </div>

            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Event Category
              </label>
              <select
                className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-xs"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Select a Event Category</option>
                {eventCatagory.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Select Date
              </label>
              <input
                required
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none text-xs focus:shadow-outline"
                type="date"
                onChange={onChange}
                name="eventDate"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Select Location
              </label>
             
                      <select className="w-full p-2 border outline-none border-gray-300 rounded-lg" onChange={handleCountryChange}>
  <option value="">Select Country</option>
  {countries.map((country) => (
    <option key={country.isoCode} value={country.isoCode}>
      {country.name}
    </option>
  ))}
</select>

{/* City Select */}
<select
  disabled={!selectedCountry}
  className="w-full p-2 my-1 outline-none border border-gray-300 rounded-lg"
  onChange={handleCityChange}
>
  <option value="">Select City</option>
  {cities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ))}
</select>
            </div>

            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold my-1">
                Add Tickets Type
              </label>
              <input
                className="w-full border py-2 ps-3 my-2 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="number"
                value={ticketPrice}
                min={0}
                onChange={(e) => setTicketPrice(e.target.value)}
                placeholder="Enter price $35.00"

              />
              <input
                type="number"
                className="w-full border py-2 ps-3 my-2 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(e.target.value)}
                placeholder="Enter Ticket Quantity"
              />
              <select
                className="w-full border py-2 ps-3 mb-6 rounded-lg text-gray-600 leading-tight focus:outline-none text-xs focus:shadow-outline"
                onChange={handleTicketChange}
                value={selectedType}
              >
                <option value="">Select Tickets Type</option>
                <option value="basicTicket">Basic</option>
                <option value="standardTicket">Standard</option>
                <option value="premiumTicket">Premium</option>
              </select>
            </div>

            <div className="mt-4">
              <ul className="w-auto flex flex-wrap">
                {ticketTypes.map((ticket, index) => (
                  <li
                    key={index}
                    className="my-2 flex justify-between items-center bg-slate-300 rounded-lg w-auto ml-1"
                  >
                    {ticket.ticketType === "premiumTicket" &&
                      `Premium - ${ticket.price}$ - ${ticket.quantity}`}
                    {ticket.ticketType === "basicTicket" &&
                      `Basic - ${ticket.price}$ - ${ticket.quantity}`}
                    {ticket.ticketType === "standardTicket" &&
                      `Standard - ${ticket.price}$ - ${ticket.quantity}`}

                    <FaTimes
                      className="text-gray-500 cursor-pointer"
                      onClick={() => removeTicket(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sm:w-[40%] w-[45%]">
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Event Type
              </label>
              
              <select
                name="eventType"
                id="eventType"
                onChange={onChange}
                className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-xs"
              >
                <option value="eventType">Select Event Type</option>
                <option value="eventType">Conference</option>
                <option value="eventType">Seminar</option>
                <option value="eventType">Work Shop</option>
                <option value="eventType">Trade Show</option>
                <option value="eventType">Other</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Start Time
              </label>
              <input
                required
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="time"
                onChange={onChange}
                name="startTime"
                placeholder="Enter Start Time"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                End Time
              </label>
              <input
                required
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="time"
                onChange={onChange}
                name="endTime"
                placeholder="Enter End Time"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Event Format
              </label>
             

              <select
                name="eventFormat"
                id="eventFormat"
                onChange={onChange}
                className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-xs"
              >
                <option value="eventFormat">Select Event Format</option>
                <option value="eventFormat">In-Person</option>
                <option value="eventFormat">Virtual</option>
                <option value="eventFormat">Hybrid</option>
                <option value="eventFormat">Pre-Recorded-content</option>
                <option value="eventFormat">Other</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Network Opportunities
              </label>
            

              <select
                name="eventNetworkOps"
                id="eventNetworkOps"
                onChange={onChange}
                className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-xs"
              >
                <option value="eventNetworkOps">
                  Select Network Opportunities
                </option>
                <option value="eventNetworkOps">Speed Networking</option>
                <option value="eventNetworkOps">RoundTable Discussions</option>
                <option value="eventNetworkOps">Social Mixers</option>
                <option value="eventNetworkOps">Panel Discussions</option>
                <option value="eventNetworkOps">Q&A Sessions</option>
                <option value="eventNetworkOps">Ongoing Registration</option>
                <option value="eventNetworkOps">Other</option>
              </select>
            </div>
            <div className="my-4">
              <AddSpeaker
                updateSpeakerData={updateSpeakerData}
                initialData={speakerState}
              />
            </div>
           
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">
                Number of People
              </label>
              <input
                required
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="number"
                onChange={onChange}
                name="eventNO_of_People"
                placeholder="Enter number of people"
              />
            </div>
            <button
              className="w-full h-12 mt-14 border rounded-3xl linear_gradient text-white py-2 px-3 leading-tight focus:outline-none text-sm focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Publish Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventForm;
