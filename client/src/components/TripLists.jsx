import React, { useState, useEffect } from "react";
import axios from "axios";
import link from "../assets/link.png";

const TripLists = () => {
  const [query, setQuery] = useState("");
  const [trips, setTrips] = useState([]);
  const [copied, setCopied] = useState(null);

  //Function to Fetch Data from Server

  const fetchTrips = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTerm}`
      );

      setTrips(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch trips when the component loads or the query changes
  useEffect(() => {
    if (query) {
      fetchTrips(query);
    }
  }, [query]);

  console.log(query);
  console.log(trips);

  // Function to handle copying the URL to the clipboard
  const handleCopyLink = (link, id) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(id);
      setTimeout(() => {
        setCopied(null);
      }, 15000); // Reset the copied state after 15 seconds
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-2/3">
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2  mb-4 text-center border-b-2 bg-transparent border-gray-600"
      />

      {trips.map((trip) => (
        <div
          key={trip.eid}
          className="mb-8 flex flex-col bg-white p-5 rounded-lg gap-5 border-black border sm:p-8 lg:flex-row"
        >
          <img
            src={trip.photos[0]}
            alt={trip.title}
            className="w-full rounded-lg object-cover h-[300px] object-center  lg:w-1/3 lg:h-auto"
          />
          <div className=" w-full flex flex-col items-start text-left justify-between lg:ml-2">
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
              {trip.title}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {trip.description}
            </p>
            <p className="text-blue-500 mt-2">
              <a
                href={trip.url}
                className="underline underline-offset-4 hover:font-semibold"
              >
                อ่านต่อ
              </a>
            </p>
            <div className="text-gray-500 text-sm mt-4 flex space-x-1">
              <p>{`หมวด:`} </p>
              <a href="#" className="underline ">{`${trip.tags}`}</a>
            </div>
            <div className="flex justify-between mt-2 items-end w-full">
              <div className="flex space-x-2">
                <img
                  key={1}
                  src={trip.photos[1]}
                  alt="photo1"
                  className="w-16 h-16 rounded-lg object-cover sm:w-32 sm:h-32"
                />
                <img
                  key={2}
                  src={trip.photos[2]}
                  alt="photo2"
                  className="w-16 h-16 rounded-lg object-cover sm:w-32 sm:h-32"
                />
                <img
                  key={3}
                  src={trip.photos[3]}
                  alt="photo3"
                  className="w-16 h-16 rounded-lg object-cover sm:w-32 sm:h-32"
                />
              </div>

              <div>
                <button
                  onClick={() => handleCopyLink(trip.url, trip.eid)}
                  className="text-sm text-blue-500 hover:underline flex items-center justify-center  "
                >
                  <img
                    src={link}
                    alt="copy"
                    className="hidden w-8 h-8 rounded-full object-contain border-2 border-black sm:flex"
                  />
                  {copied === trip.eid && (
                    <span className="hidden  ml-2 text-green-500 text-xs sm:flex">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripLists;
