import moment from "moment";
import React, { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      if (query) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8b1402ce766a224860a9136946539160&units=metric`;

        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        setCity(resJson);
      }
    };
    fetchApi();
  }, [query]);

  const handleSearch = () => {
    setQuery(search);
  };

  const handleToggle = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className="main container mx-auto px-4">
      <div className="app">
        <img
          src="https://wallpapers.com/images/hd/fine-weather-landscape-iq9k6ubn8w9yhhkc.jpg"
          className="w-[100%] h-[100%] object-cover absolute top-0 left-0 z-[-1]"
          alt="background"
        />
        <div className="absolute top-4 right-4">
          <button
            className={`p-2 rounded-full ${
              isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            onClick={handleToggle}
          >
            {isNightMode ? "Day Mode" : "Night Mode"}
          </button>
        </div>
        <div className="top flex-grow flex flex-col items-center justify-center">
          <div className="search flex justify-center mt-14 w-full max-w-lg">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <input
                type="text"
                placeholder="Enter city"
                value={search}
                className={`w-full p-4 rounded-3xl ${
                  isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            <div>
              <button
                className={`ml-1 p-4 rounded-3xl ${
                  isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {!city || city.cod !== 200 ? (
            <div className="flex justify-center mt-8 w-full max-w-lg">
              <div
                className={`border border-b-2 ${
                  isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
                } w-full h-48 sm:h-64 md:h-80 m-6 p-6 rounded-3xl flex items-center justify-center`}
              >
                <p className="text-6xl">No data found</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-8 w-full max-w-lg">
              <div
                className={`border border-b-2 ${
                  isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
                } w-full h-[70vh] m-6 p-6 rounded-3xl`}
              >
                <div className="location flex justify-center ">
                  <img
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    className=" w-[50%] h-[50%] "
                  />
                </div>
                <div className="temp text-5xl  flex justify-center p-2">
                  <p> {city.main.temp} &deg;C</p>
                </div>
                <div className="text-3xl flex justify-center p-2">
                  <p>{city.name}</p>
                </div>

                <div className="flex mt-4 justify-center">
                  <p>{moment().format("dddd")},</p>
                  <p className="ml-2">{moment().format("LL")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
