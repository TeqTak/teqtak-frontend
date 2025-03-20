import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDistance } from "geolib";

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([
    { id: 1, lat: 41.730610, lng: -74.935242, image: "/placeholder.jpg" },
    { id: 2, lat: 42.732610, lng: -72.937242, image: "/placeholder.jpg" },
    { id: 3, lat: 40.725610, lng: -73.925242, image: "/placeholder.jpg" },
    { id: 4, lat: 41.741610, lng: -74.925242, image: "/placeholder.jpg" },
    { id: 5, lat: 40.735610, lng: -73.920242, image: "/placeholder.jpg" },
    { id: 6, lat: 42.745610, lng: -72.912242, image: "/placeholder.jpg" },
  ]);

  // Custom icon with round avatar style
  const createUserIcon = (image) =>
    divIcon({
      html: `<div style="
        background-image: url(${image});
        width: 40px; height: 40px;
        background-size: cover;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      "></div>`,
      className: "", // Clear default icon class for custom styling
    });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(currentLocation);
        updateNearbyUsers(currentLocation);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const updateNearbyUsers = (userLocation) => {
    const nearby = dummyUsers.filter((user) => {
      const distance = getDistance(
        { latitude: userLocation.lat, longitude: userLocation.lng },
        { latitude: user.lat, longitude: user.lng }
      );
      return distance <= 5000; // 5000 meters (5 km)
    });
    setNearbyUsers(nearby);
  };

  useEffect(() => {
    getUserLocation();
    const interval = setInterval(() => {
      getUserLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Back Button and Filter Dropdown */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <button className="bg-white p-2 rounded-full shadow-md text-gray-700">
          ← Back
        </button>
        <select className="bg-white p-2 rounded-md shadow-md">
          <option>All</option>
          <option>Nearby</option>
          <option>Friends</option>
        </select>
      </div>

      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User's own marker */}
          <Marker position={userLocation} icon={createUserIcon("/placeholder.jpg")}>
            <Popup>
              <div className="flex flex-col items-center space-y-2">
                <img
                  src="/placeholder.jpg" // User's image URL
                  alt="Current User"
                  className="w-24 h-24 rounded-full"
                />
                <p>Your Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Nearby users' markers */}
          {nearbyUsers.map((user) => (
            <Marker
              key={user.id}
              position={{ lat: user.lat, lng: user.lng }}
              icon={createUserIcon(user.image)}
            >
              <Popup>
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={user.image}
                    alt={`User ${user.id}`}
                    className="w-24 h-24 rounded-full"
                  />
                  <p>Nearby User {user.id}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>Loading location...</p>
        </div>
      )}
    </div>
  );
};

export default Map;
