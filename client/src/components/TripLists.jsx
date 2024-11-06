import React, { useState, useEffect } from "react";
import axios from "axios";

const TripLists = () => {
  const [query, setQuery] = useState("");
  const [trips, setTrips] = useState([]);

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

  return (
    <div>
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[600px] p-2  mb-4 text-center border-b-2 bg-transparent border-gray-600"
      />

      {trips.map((trip) => (
        <div key={trip.eid} className="mb-8 flex">
          <img
            src={trip.photos[0]}
            alt={trip.title}
            className="w-1/4 rounded-lg"
          />
          <div className="ml-4 w-3/4">
            <h2 className="text-xl font-bold text-gray-800">{trip.title}</h2>
            <p className="text-gray-600 mt-2">{trip.description}</p>
            <p className="text-blue-500 mt-2">
              <a href={trip.url}>อ่านต่อ</a>
            </p>
            <p className="text-gray-500 text-sm mt-4">หมวด: {trip.tags}</p>
            <div className="flex space-x-2 mt-2">
              <img
                key={1}
                src={trip.photos[1]}
                alt="photo1"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <img
                key={2}
                src={trip.photos[2]}
                alt="photo2"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <img
                key={3}
                src={trip.photos[3]}
                alt="photo3"
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripLists;
